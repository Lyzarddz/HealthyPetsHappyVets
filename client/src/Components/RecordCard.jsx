import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';



const RecordCard = ({ record , pet, handleDeleteRecordClick} ) => {

  // const vetParse =  pet ? pet.vet : ""

  // const vetName = pet ? vetParse.name : ""



  return (
    <Card variant="outlined">
        
        <div className="content" >
        </div>
        <h1>Pet: {record.pet.name}</h1>
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
           <Button  className="primary" variant="contained" to="/editRecord" component={ Link } disableElevation>
              Edit</Button>
              <br/>
              <br></br>
              <Button  onClick={handleDeleteRecordClick} className="primary" variant="contained"  disableElevation>
              Delete</Button>
           <br/>

            </ul>
        </div>
    
        </h3>
    </Card>
  )
}

export default RecordCard;
