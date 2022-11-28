import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const CreatePet = ({ addPet }) => {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    vet: "",    
  });

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
          <Form.Input
            label="Vet"
            placeholder="Vet"
            name="vet"
            value={formData.vet}
            onChange={handleChange}
          />
           <br></br>
        </Form.Group>
        <Form.Button className="btn">Submit</Form.Button>
      </Form>
    </div>
    )
    }


export default CreatePet;