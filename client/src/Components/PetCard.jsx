import React from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const PetCard = ( { pet , chosenVet, deletePet, currentUser, setCurrentUser} ) => {

  const [errors, setErrors] = useState([]);


const vetParse =  pet.vet

const vetName = vetParse.name 

const {id} = pet;


// useEffect(()=>{
//   fetch(`/owners/${id}`)
//   .then(res => {
//       if(res.ok){
//           res.json().then(user => {
//               setCurrentUser(user)
//           })
//       }else {
//           res.json().then(data => setErrors(data.error))
//       }
//   })
 
// },[])



function handleDeletePetClick(e){
  e.preventDefault();
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





