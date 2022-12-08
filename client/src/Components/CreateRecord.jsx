import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const CreateRecord = ({ addRecord }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vaccine: "",
    prevention: "",
    altered: "",
    notes: ""
  });


  const [value, setValue] = useState('');


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


function handleSubmit() {

  const newRecord = {
    name: formData.vaccine,
    species: formData.prevention,
    age: formData.altered,
    notes: formData.notes
 };


 fetch("http://localhost:3000/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecord),
  })
    .then((r) => r.json())
    .then(addRecord);
    navigate("/records");
}

    return (
         <div className='primary'>
      <h1 >Add new Record!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
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
            value={formData.species}
            onChange={handleChange}
          />
<br/>   
<Box sx={{ maxWidth: 150 }} paddingLeft="850px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Altered?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Altered"
          onChange={handleChange}
        >
          <MenuItem value={value}>Yes</MenuItem>
          <MenuItem value={value}>No</MenuItem>

        </Select>
      </FormControl>
    </Box>
           <br></br>
          <Form.Input
            label="Notes"
            placeholder="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
           <br></br>
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