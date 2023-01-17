import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CreatePet = ({
  addPet,
  user,
  setVetLoad,
  vets,
  loadVet

}) => {
  const navigate = useNavigate();
  const [chosenVet, setChosenVet] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    vet_id: "",
    owner_id: ""
  });

  const [errors, setErrors] = useState([]);
  const [newVetId, setNewVetId] = useState({
    name: ""
  });


  useEffect(() => {
    fetch("/api/vets")
      .then((resp) => resp.json())
      .then((data) => {
        setVetLoad(data);
      });
  }, []);

  function loadVetToForm(vet) {
    setVetLoad([vet, ...loadVet]);
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleVetFormChange(event) {
    setNewVetId({
      ...newVetId,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmitVet(e) {
    e.preventDefault();

    const newVet = newVetId;

    fetch("/api/vets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newVet)
    }).then((res) => {
      if (res.ok) {
        res.json().then((newVet) => {
          loadVetToForm(newVet);
          document.getElementById("checkFix").value = "";
          alert("Vet has been added successfully");
        });
      } else {
        document.getElementById("checkFix").value = "";
        res.json().then((json) => setErrors(json.errors));
      }
    });
  }

  const { name, species, age } = formData;

  function handleSubmit(e) {
    e.preventDefault();

    const owner_id = user["id"];

    if (!chosenVet){
      setErrors("Must select a vet");
      return;
    }


    const vet_id = JSON.parse(chosenVet[0])["id"];

    const newPet = {
      name,
      species,
      age,
      owner_id,
      vet_id
    };

    fetch("/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include",
      body: JSON.stringify(newPet)
    }).then((res) => {
      if (res.ok) {
         res.json().then((newPet) => {
          addPet(newPet);
          navigate(`/pets`);
        });
      } else {
        res.json().then((json) => setErrors(json.errors));
      }
    });
  }



  function handleVetChange(event) {
    setChosenVet([event.target.value]);
  }

  return (
    <div className="primary">
      <h1>Add a Pet!</h1>
      <p style={{color: "red"}}>{errors}</p>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br></br>
          <Form.Input
            label="Species"
            placeholder="Species"
            name="species"
            value={formData.species}
            onChange={handleChange}
          />
          <br></br>
          <Form.Input
            label="Age"
            placeholder="Age"
            name="age"
            type="text"
            value={formData.age}
            onChange={handleChange}
          />
          <br></br>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Vet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="chosenVet"
              value={chosenVet}
              label="Vet"
              onChange={handleVetChange}
            >
              {vets}
            </Select>
          </FormControl>
          <br></br>
          <br></br>
        </Form.Group>
        <Form.Button className="btn">Submit</Form.Button>
        <br />
        <br />
        <br />
      </Form>
      <div>
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
    </div>
  );
};

export default CreatePet;