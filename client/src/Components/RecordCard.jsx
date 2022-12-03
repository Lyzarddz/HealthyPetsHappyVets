import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const RecordCard = ( ) => {

  return (

    <Card variant="outlined">
        
        <div className="content" >
        </div>
        <h3>
         Record Date:
        <div className="extra content" >
       
            <ul>
         <br/>
          Vaccine(s):
              <br/>
            Prevention:
            <br></br>
            Altered?:
           <br></br>
           Notes:
           <br/>
           <br/>
           <DeleteIcon />
            </ul>
        </div>
    
        </h3>
    </Card>
  )
}

export default RecordCard;