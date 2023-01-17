import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const CreateRecord = ({ addRecord , pets, loadPets }) => {

  useEffect(()=>{
    loadPets()
  },[])

  const [chosenPet, setChosenPet] = useState("");
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vaccine: "",
    prevention: "",
    altered: "",
    notes: "",
    date: "",
    pet_id: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

const {vaccine, prevention, altered, notes, date} = formData;

function handleSubmit(e) {
  e.preventDefault();

  if (!chosenPet){
    setErrors("Must select a Pet");
    return;
  }

const pet_id = JSON.parse(chosenPet[0])["id"];

  const newRecord = {
    vaccine,
    prevention,
    altered,
    notes,
    date,
    pet_id
 };

 fetch("/api/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newRecord),
  })
  .then((res) => {
    if (res.ok){
      res.json().then(r => {
        addRecord(r)
        navigate("/records/");
      })
    } else {
      res.json().then(json => setErrors(json.errors))
    }
  })
}

function handlePetChange(event) {
  setChosenPet([event.target.value]);
}

    return (
         <div className='primary'>
         <p style={{color: "red"}}>{errors}</p>
          <br/>
      <h1 >Add new Record!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
        <br></br>
      <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Pet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="chosenPet"
              value={chosenPet}
              label="Pet"
              onChange={handlePetChange} >
              {pets}
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          <Form.Input
            label="Vaccine(s)"
            placeholder="Vaccine(s)"
            name="vaccine"
            value={formData.vaccine}
            onChange={handleChange}
          />
          <br></br>
          <Form.Input
            label="Prevention"
            placeholder="Prevention"
            name="prevention"
            value={formData.prevention}
            onChange={handleChange}
          />
          <br/>  
          <Form.Input
            label="Altered"
            placeholder="Altered"
            name="altered"
            value={formData.altered}
            onChange={handleChange}
          />
           <br></br>
          <Form.Input 
            label="Notes"
            placeholder="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
           <br></br>
           <Form.Input
            label="Date"
            placeholder="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
           <br></br>
        </Form.Group>
        <Form.Button className="btn">Submit</Form.Button>
          <br/>
          <br/>
          <br/>
          </Form>
    </div>
    )
    }

export default CreateRecord;