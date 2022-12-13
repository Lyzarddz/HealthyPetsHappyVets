import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreatePet = ({ addPet , user, setLoadVet , vets, loadVet, chosenVet, setChosenVet}) => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    vet_id: "",    
    owner_id: "",
  });

  // const [loadVet, setLoadVet] = useState([]);
  // const [chosenVet, setChosenVet] = useState("none");
  const [errors, setErrors] = useState([]);
  
  function loadVetsData() {
    fetch("http://localhost:3000/vets")
    .then((resp) => resp.json())
    .then((data)=> {
      setLoadVet(data); 
    })
}

  // useEffect(() => {
  //   fetch("http://localhost:3000/vets")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setLoadVet(data);  
  //   })
  // } , [])


  // const vets = loadVet.map((v,idx) => {   
  //   return (
  //     <MenuItem key={idx} value={JSON.stringify(v)}>
  //       {v.name} 
  //       </MenuItem>
  //   )
  // })


  function loadVetToForm(vet){
    setLoadVet([vet,...vet])
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const {name, species, age, vet_id } = formData;


  function handleSubmitVet(e){
    e.preventDefault();

    const newVet = {
        name: vet_id
    }

    fetch("http://localhost:3000/vets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(newVet),
      })
      .then(res => {
        if(res.ok){
            res.json().then(newVet => {
                loadVetToForm(newVet)
            })
        } else {
          console.log(res)
          res.json().then(json => setErrors(json.errors))
        }
    })
  }

function handleSubmit(e) {
e.preventDefault();

  const owner_id = user["id"];

  const vet_id = JSON.parse(chosenVet[0])["id"];

  const newPet = {
    name,
    species,
    age,
    owner_id, 
    vet_id 
  }


 fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json", 
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    credentials: "include",
    body: JSON.stringify(newPet),
  })
  .then(res => {
    if(res.ok){
        res.json().then(newPet => {
            addPet(newPet)
        })
    }else {
      console.log(res)
      res.json().then(json => setErrors(json.errors))
    }
})
// handleSubmitVet()
navigate((`/pets`))
}


function handleVetChange(event){
  setChosenVet([event.target.value]);
}


    return (
         <div className='primary'>
      <h1 >Add a Pet!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br></br>
          <Form.Input
            label="Species"
            placeholder="Species"
            name="species"
            value={formData.species}
            onChange={handleChange}
          />
           <br></br>
          <Form.Input
            label="Age"
            placeholder="Age"
            name="age"
            type='text'
            value={formData.age}
            onChange={handleChange}
          />
           <br></br>
      
          <FormControl sx={{ minWidth: 120 }} onClick={loadVetsData} >
            <InputLabel id="demo-simple-select-label">Vet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="chosenVet"
              value={chosenVet}
              label="Vet"
              onChange={handleVetChange}
            >
            <MenuItem key={-1} value={"none"}>
          Please Select Vet
              </MenuItem>
              {vets}
            </Select>
          </FormControl>
           <br></br>
           <br></br>
        </Form.Group>
        <Form.Button className="btn">Submit</Form.Button>
          <br/>
          <br/>
          <br/>
          </Form>
          <div>
          <Form onSubmit={handleSubmitVet}>
        <h3>Don't see your Vet? Add below</h3>
          <Form.Input
            className="options"
            placeholder="Vet Name"
            name="newVet"
            value={formData.newVet}
            onChange={handleChange}
          />
          <br/>
          <Form.Button className="btn">Submit</Form.Button>
          </Form>
          </div>
    </div>
    )
    }


export default CreatePet;