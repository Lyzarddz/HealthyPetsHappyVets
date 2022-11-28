import React from 'react';
import { Card } from "semantic-ui-react";



const PetCard = ( { pet } ) => {

  return (
    <Card>
        
        <div className="content">
        <h1>  <div className="header"> {pet.name}</div> </h1>
        </div>
        <h3>
        <div className="extra content">
            <ul>
            Species: {pet.species}
            <br></br>
             Age: {pet.age}    
           <br></br>
            Vet: {pet.vet}
            </ul>
            <br></br>
            <br></br>
        </div>
        </h3>
    </Card>
  )
}

export default PetCard;