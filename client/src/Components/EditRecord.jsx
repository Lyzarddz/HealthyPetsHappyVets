import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';



const EditRecord = ({ loadPets, updateRecord, pet }) => {

 console.log(pet)

const [errors, setErrors] = useState([])
const navigate = useNavigate();
const [formData, setFormData] = useState({
  vaccine: "",
  prevention: "",
  altered: "",
  notes: "",
  date: "",
});

useEffect(() => {
  loadPets()
},[])

const petClone = JSON.parse(JSON.stringify(pet));

let recordsList = []

petClone.forEach((e) => {      //reverses order of data so Record is top level
  e.records.forEach((record) => {
    record.pet = e                
    recordsList.push(record)
  })
})

// console.log(recordsList[0].id)

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

console.log(recordsList)

  const record = recordsList.map((r, idx) => {
     const properRecord = r
  })



  // recordsList.map(r => {
  //   const record = r
  //   const {id} = record;
  //   console.log(id)
  // })


const {vaccine, prevention, altered, notes, date} = formData;

function handleSubmit(e) {
  e.preventDefault();

  const id = record.get();

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
      navigate((`/records`))
    } else {
      res.json().then(json => setErrors(json.errors))
    }
  })
}

    return (
         <div className='primary'>
          <h1>{errors}</h1>
      <h1 >Edit Record</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
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

export default EditRecord;