import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';


const CreateRecord = ({ addRecord , loadPets }) => {

// console.log(pet)

// const {id, name} = pet

// useEffect(()=>{
//   loadPets()
// },[])

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


const {vaccine, prevention, altered, notes, date, pet_id} = formData;


function handleSubmit(e) {
  e.preventDefault();

  const newRecord = {
    vaccine,
    prevention,
    altered,
    notes,
    date,
    pet_id
 };

 fetch("/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newRecord),
  }).then((r) => r.json())
    .then(addRecord);
    navigate("/pets");
}



    return (
         <div className='primary'>
      <h1 >Add new Record!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
        <br></br>
          <Form.Input
            label="Pet Name"
            placeholder="Pet Name"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleChange}
          />
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