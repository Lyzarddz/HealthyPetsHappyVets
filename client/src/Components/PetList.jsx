import React from 'react'
import { Card } from "semantic-ui-react";
import PetCard from './PetCard';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const PetList = ( { pet , chosenVet, deletePet , clearErrors, addErrors, currentUser, setCurrentUser, loadPets} ) => {
  
console.log(loadPets)


  useEffect(()=>{
    loadPets()
  },[])


    const cards= pet.map((p, idx)=> {
        return(
          <div key={idx}>
            <PetCard
            key={idx}
            pet={p}
            chosenVet= {chosenVet}
            deletePet={deletePet}
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser}
            loadPets={loadPets}
          />
          </div>
        )
    })  
  
    return (
      <Card>
        <h1 className='primary'>My Pets</h1>
        <Button  className="primary" variant="contained" to="/createPet" component={ Link } disableElevation>
     Add New Pet
    </Button>
    <br></br>
    <br></br>
    <br></br>
        {/* <Button variant="outlined" color="inherit" to="/createRecord" component={ Link } >Create Record</Button> */}
        <Button variant="outlined" color="inherit" to={"/records"} component={ Link } >Records</Button>
        <br></br>
        <br></br>
        <br></br>
          {cards}
    <br/>
    <br/>
      </Card>
    )
  }
  
  export default PetList;