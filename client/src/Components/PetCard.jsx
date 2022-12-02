import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';

const PetCard = ( { pet } ) => {

  console.log(pet)

  return (
    <Card variant="outlined">
        
        <div className="content" >
        <h1>  <div className="header"> {pet.name}</div> </h1>
        </div>
        <h3>
        <div className="extra content" >
       
            <ul>
            Name: {pet.name}
              <br/>
            Species: {pet.species}
            <br></br>
             Age: {pet.age}    
           <br></br>
            Vet: {pet.vet}
            </ul>
            <Button variant="outlined" color="inherit" to="/Records" component={ Link } >All Records</Button>
            <Button variant="outlined" color="inherit" to="/createRecord" component={ Link } >Create Record</Button> 
            <br></br>
            <br></br>
        </div>
        </h3>
    </Card>
  )
}

export default PetCard;





