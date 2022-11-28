import React from 'react'
import { Card } from "semantic-ui-react";
import PetCard from './PetCard';

const PetList = ( { pet } ) => {




    const cards= pet.map((p)=> {
        return(
            <PetCard
            key={p.id}
            pet={p}
          />
        )
    })  
  
    return (
      <Card>

<h1 className='primary'>My Pets</h1>
          {cards}

         
      </Card>
    )
  }
  
  export default PetList;