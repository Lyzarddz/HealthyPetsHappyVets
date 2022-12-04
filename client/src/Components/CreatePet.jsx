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
    name: '',
    species: "",
    age: "",
    vet_id: "",    
    newVet: "",
  });

  const [vet, setVet] = useState("");
  const [errors, setErrors] = useState([])
  const [value, setValue] = useState('');

  const handleChangeAge = event => {
    const result = event.target.value.replace(/\D/g, '');

    setValue(result);
  };

  //   useEffect(() => {
  //   fetch("http://localhost:3000/vet")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setVet(data)
  //   })
     
  // } , [])

   
 
  function addVet(vet){
    setVet([vet,...vet])
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const {name, species, age} = formData;


  function handleSubmitVet(){

    const newVet = {
        name: vet.name
    }
    fetch("http://localhost:3000/vets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVet),
      })
        .then((r) => r.json())
        .then(addVet);
        window.location.reload(false)
    }
    

function handleSubmit(e) {
e.preventDefault();

  const newPet = {
    name,
    species,
    age,
 };


 fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPet),
  })
  .then(res => {
    if(res.ok){
        res.json().then(newPet => {
            addPet(newPet)
            navigate((`/pets`))
        })
    }else {
      console.log(res)
      res.json().then(json => setErrors(json.errors))
    }
})
}



//     .then((r) => r.json())
//     .then(addPet);
//     navigate("/pets");
// }

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
            value={value}
            onChange={handleChangeAge}
          />
           <br></br>

           <Box sx={{ maxWidth: 150 }} paddingLeft="850px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Vet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.vet_id}
          label="Vet"
          onChange={handleChange}
        >
          <MenuItem value={vet.name}>first vet</MenuItem>
          <MenuItem value={vet.name}>second vet</MenuItem>
          <MenuItem value={vet.name}>Third vet</MenuItem>
        </Select>
      </FormControl>
    </Box>
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