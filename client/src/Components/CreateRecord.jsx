import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const CreateRecord = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vaccine: "",
        prevention: "",
        altered: "",
      });

    return (
        <h1>Create Record</h1>

    )
}

export default CreateRecord;