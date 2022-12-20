import React from 'react'
import { Card } from "semantic-ui-react";
import RecordCard from './RecordCard';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RecordList = ( { record, loadRecords, deleteRecord } ) => {
  

// console.log(loadRecords)

// useEffect(()=>{
//   loadRecords()
// },[])


    const cards= record.map((r, idx)=> {
        return(
          <div key={idx}>
            <RecordCard
            key={r.id}
            record={r}
            deleteRecord ={deleteRecord}
          />
          </div>
        )
    })  
  
    return (
      <Card>
        <h1 className='primary'>My Records</h1>
          {cards}

<br/>
<br/>
  <Button  className="primary" variant="contained" to="/createRecord" component={ Link } disableElevation>
     Add New Record
    </Button>

      </Card>
    )
  }
  
  export default RecordList;