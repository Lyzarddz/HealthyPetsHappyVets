import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const CreatePet = () => {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
  });

    return (
        <h1>CreatePet</h1>
    )
}

export default CreatePet;