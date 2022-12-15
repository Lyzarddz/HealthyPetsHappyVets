import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const PetCard = ( { pet , chosenVet, deletePet} ) => {

  console.log(pet)

const vetParse = JSON.parse(chosenVet[0]);

const vetName = vetParse.name 

const {id} = pet;

console.log(id)


function handleDeletePetClick(e){
  e.preventDefault();
  fetch(`/pets/${id}`, {
    method: 'DELETE',
  })
  // deletePet()
  window.location.reload();
}


  return (
    <Card variant="outlined">
        
        <div className="content" >
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
            Vet: {vetName}
            </ul>
            <Button variant="outlined" color="inherit" to="/Records" component={ Link } >All Records</Button>
            <Button variant="outlined" color="inherit" to="/createRecord" component={ Link } >Create Record</Button> 
            <br></br>
            <br></br>

            <Button variant="outlined" color="inherit" onClick={handleDeletePetClick} > 
            <DeleteIcon /> Delete Pet</Button> 
        </div>
        </h3>
    </Card>
  )
}

export default PetCard;





