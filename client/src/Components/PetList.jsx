import React from 'react'
import { Card } from "semantic-ui-react";
import PetCard from './PetCard';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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

  <Button  className="primary" variant="contained" to="/createPet" component={ Link } disableElevation>
     Add New Pet
    </Button>

      </Card>
    )
  }
  
  export default PetList;