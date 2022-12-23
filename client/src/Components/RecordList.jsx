import React from 'react'
import { Card } from "semantic-ui-react";
import RecordCard from './RecordCard';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RecordList = ( { deleteRecord, handleDeleteRecordClick } ) => {

const [recordLoad, setRecordLoad] = useState([]);
const [errors, setErrors] = useState([]);

useEffect(()=>{
  fetch(`/records/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json", 
    },
  })
  .then(res => {
    if(res.ok){
        res.json().then(records => {
            setRecordLoad(records)
        })
    }else {
      console.log(res)
      res.json().then(json => setErrors(json.errors))
    }
  })
},[])


    const cards= recordLoad?.map((r, idx)=> {
        return(
          <div key={idx}>
            <RecordCard
            key={r.id}
            record={r}
            deleteRecord ={deleteRecord}
            handleDeleteRecordClick={handleDeleteRecordClick}
          />
          </div>
        )
    })  
  
    return (
      <Card>
        <h1 className='primary'>My Records</h1>
            <br/>
            <br/>
  <Button  className="primary" variant="contained" to="/createRecord" component={ Link } disableElevation>
     Add New Record
    </Button>
    <br></br>
    {cards}
      </Card>
    )
  }
  
  export default RecordList;