import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CreatePet = ({ addPet , user }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: "",
    age: "",
    vet_id: "",    
    owner_id: "",
  });


  const [loadVet, setloadVet] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState([]);



    useEffect(() => {
    fetch("http://localhost:3000/vets")
    .then((resp) => resp.json())
    .then((data)=> {
      setloadVet((data))
    })
     
  } , [])


  const vetSearch = loadVet.filter((vet) =>
  vet.name.toLowerCase().includes(search.toLowerCase())
  )



  const vets = vetSearch.map((v,idx) => {
    return (
      <div key={idx}>
        <ul>
          {v.name}
          <br/>
        </ul>
      </div>
    )
  })


  //  const {id, pets, owners} = loadVet


  function loadVetToForm(vet){
    setloadVet([vet,...vet])
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

  const newPet = {
    name,
    species,
    age,
    owner_id, 
    vet_id
 };

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

function handleSearchChange(e){
  setSearch(e.target.value)
}

function handleVetChange(event){
  setloadVet(event.targe.value);
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
            value={formData.age}
            onChange={handleChange}
          />
           <br></br>
      
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Vet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="loadVet"
              value={""}
              label="Vet"
              onChange={handleVetChange}
            >
              {vets.map(v => {
                return(
                  <MenuItem value={v}>{v}</MenuItem>
                )
              })}
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
            class="options"
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