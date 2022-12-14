import React from 'react'
import { Card } from "semantic-ui-react";
import RecordCard from './RecordCard';
import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RecordList = ( { deleteRecord, pet, loadPets, updateRecord } ) => {

useEffect(()=>{
  loadPets()
},[])

const petClone = JSON.parse(JSON.stringify(pet));

let recordsList = []

petClone.forEach((e) => {      //reverses order of data so Record is top level
  e.records.forEach((record) => {
    record.pet = e                
    recordsList.push(record)
  })
})

    const cards= recordsList.map((r, idx)=> {
        return (
          <div key={r.id}>
            <RecordCard
            key={r.id}
            record={r}
            updateRecord={updateRecord}
            deleteRecord ={deleteRecord}
            loadPets = {loadPets}
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