import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const PetCard = ( { pet , chosenVet, deletePet, currentUser, setCurrentUser, loadPets} ) => {

  const [errors, setErrors] = useState([]);


console.log(pet)


  // useEffect(()=>{
  //   loadPets()
  // },[])

console.log(pet)

const vetParse =  pet ? pet.vet : ""

const vetName = pet ? vetParse.name : ""



function handleDeletePetClick(e){
  e.preventDefault();

  const {id} = pet;

  fetch(`/pets/${id}`, {
    method: 'DELETE',
  })
  deletePet(id)
}






  return (
    <Card variant="outlined">
        
        <div className="content" >
        </div>
        <h3>
        <div className="extra content" >
       
            <ul>
            Name: {pet ? pet.name : "" }
              <br/>
            Species: {pet ? pet.species : ""}
            <br></br>
             Age: {pet ? pet.age : ""}    
           <br></br>
            Vet: {vetName}
            </ul>
            <Button variant="outlined" color="inherit" to="/records/" component={ Link } >Records</Button>
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





