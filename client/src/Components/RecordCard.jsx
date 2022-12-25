import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";


const RecordCard = ({ record , deleteRecord, loadPets, updateRecord } ) => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    vaccine: "",
    prevention: "",
    altered: "",
    notes: "",
    date: "",
  });

  const {id} = record;

  function handleDeleteRecordClick(e){
    e.preventDefault();
  
    fetch(`/records/${id}`, { 
      method: 'DELETE',
    })
    deleteRecord(id);
    loadPets(); 
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleEditRecordClick(e) {
    e.preventDefault();
  
   fetch(`/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json().then(updateRecord(id))
        alert("Record updated successfully");
        navigate((`/records`))
      } else {
        res.json().then(json => setErrors(json.errors))
      }
    })
  }

  return (
    <div>
    <Card variant="outlined">  
    {errors}
        <div className="content" >
        </div>
        <h1>Pet: {record.pet.name}</h1>
        <h3>
        <Form.Input
            label="Date"
            placeholder={record.date}
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        <div className="extra content" >
          <ul>
         <br/>
         <Form.Input
            label="Vaccine:"
            placeholder={record.vaccine}
            name="vaccine"
            value={formData.vaccine}
            onChange={handleChange}
          />
              <br/>
              <Form.Input
            label="Prevention:"
            placeholder={record.prevention}
            name="prevention"
            value={formData.prevention}
            onChange={handleChange}
          />
            <br></br>
            <Form.Input
            label="Altered Information:"
            placeholder={record.altered}
            name="altered"
            value={formData.altered}
            onChange={handleChange}
          />
           <br></br>
           <Form.Input 
            label="Notes:"
            placeholder={record.notes}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
           <br/>
           <br/>
           <Button  className="primary" variant="contained" onClick={handleEditRecordClick} disableElevation>
              Save</Button>
              <br/>
              <br></br>
              <Button variant="outlined" color="inherit" onClick={handleDeleteRecordClick} disableElevation > 
            <DeleteIcon /> Delete Record</Button> 
           <br/>
            </ul>
        </div>
        </h3>
    </Card>
    </div>
  )
}

export default RecordCard;
