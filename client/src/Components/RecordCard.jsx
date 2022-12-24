import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';



const RecordCard = ({ record , deleteRecord } ) => {

  function handleDeleteRecordClick(e){
    e.preventDefault();

    const {id} = record;
  
    fetch(`/records/${id}`, {
      method: 'DELETE',
    })
    deleteRecord(id);
  }


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
              <Button variant="outlined" color="inherit" onClick={handleDeleteRecordClick} disableElevation > 
            <DeleteIcon /> Delete Record</Button> 
           <br/>
            </ul>
        </div>
        </h3>
    </Card>
  )
}

export default RecordCard;
