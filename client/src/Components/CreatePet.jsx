import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CreatePet = ({ addPet }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    vet: "",    
  });

  const [vet, setVet] = useState("");

    // useEffect(() => {
  //   fetch("http://localhost:3000/vet")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setVet(data)
  //   })
     
  // } , [])
  


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


function handleSubmit() {

  const newPet = {
    name: formData.name,
    species: formData.species,
    age: formData.age,
    vet: formData.vet
 };


 fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPet),
  })
    .then((r) => r.json())
    .then(addPet);
    navigate("/pets");
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
            value={formData.age}
            onChange={handleChange}
          />
           <br></br>

           <Box sx={{ maxWidth: 150 }} paddingLeft="835px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Vet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vet}
          label="Vet"
          onChange={handleChange}
        >
          <MenuItem value={vet.name}>first vet</MenuItem>
          <MenuItem value={vet.name}>second vet</MenuItem>
          <MenuItem value={vet.name}>Third vet</MenuItem>
        </Select>
      </FormControl>
    </Box>


          {/* <Form.Input
            label="Vet"
            placeholder="Vet"
            name="vet"
            value={formData.vet}
            onChange={handleChange}
          /> */}
           <br></br>
        </Form.Group>
        <Form.Button className="btn">Submit</Form.Button>
      </Form>
    </div>



    )
    }


export default CreatePet;