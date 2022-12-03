import React from 'react'
import { Card } from "semantic-ui-react";
import RecordCard from './PetCard';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RecordList = ( { record } ) => {
  


    const cards= record.map((r)=> {
        return(
            <RecordCard
            key={r.id}
            record={r}
          />
        )
    })  
  
    return (
      <Card>
        <h1 className='primary'>My Records</h1>
          {cards}

<br/>
<br/>
  <Button  className="primary" variant="contained" to="/createRecord" component={ Link } disableElevation>
     Add New Record
    </Button>

      </Card>
    )
  }
  
  export default RecordList;