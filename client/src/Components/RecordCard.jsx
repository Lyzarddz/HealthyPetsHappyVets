import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const RecordCard = ({ record , pet, deleteRecord} ) => {

  const vetParse =  pet ? pet.vet : ""

  const vetName = pet ? vetParse.name : ""

console.log(record)

function handleDeleteRecordClick(e){
  e.preventDefault();

  const {id} = pet;

  fetch(`/records/pets/${id}`, {
    method: 'DELETE',
  })
  deleteRecord(id)
}


  return (

    <Card variant="outlined">
        
        <div className="content" >
        </div>
        <h1>Pet: {pet}</h1>
        <h3>
         Record Date: {record.date}
        <div className="extra content" >
       
            <ul>
         <br/>
          Vaccine(s): {record.vaccine}
              <br/>
            Prevention: {record.prevention}
            <br></br>
            Altered Info: {record.altered}
           <br></br>
           Notes: {record.notes}
           <br/>
           <br/>
           <DeleteIcon onClick={handleDeleteRecordClick}/>
            </ul>
        </div>
    
        </h3>
    </Card>
  )
}

export default RecordCard;
