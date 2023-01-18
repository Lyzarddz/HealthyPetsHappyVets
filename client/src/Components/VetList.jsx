import React from 'react'
import { Form } from "semantic-ui-react";



const VetList = ( { vets, handleSubmitVet, handleVetFormChange, newVetId} ) => {
  
    return (
        <div className='primary'>
        <h1 >Available Vets</h1>
     <br/>
      {vets} 
    <br/>
    <br/>
    <Form onSubmit={handleSubmitVet}>
          <h3>Don't see your Vet? Add below</h3>
          <Form.Input
            placeholder="Vet Name"
            name="name"
            id="checkFix"
            value={newVetId.name}
            onChange={handleVetFormChange}
          />
          <br />
          <Form.Button className="btn">Submit</Form.Button>
        </Form>
      </div>
    )
  }
  
  export default VetList;