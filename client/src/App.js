import NavBar from './Components/NavBar';
import CreatePet from './Components/CreatePet';
import MainPg from './Components/MainPg';
import CreateRecord from './Components/CreateRecord';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StyleSheet from './Components/StyleSheet';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PetList from './Components/PetList';
import RecordList from './Components/RecordList';
import MenuItem from '@mui/material/MenuItem';
import EditRecord from './Components/EditRecord';


function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [errors, setErrors] = useState([]);
  const [userPets, setuserPets] = useState([]);
  const [recordLoad, setRecordLoad] = useState([]);
  const [vetLoad, setVetLoad] = useState([]);


  useEffect(() => {
    // auto-login
    fetch('api/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

const vets = vetLoad.map((v,idx) => {   
  return (
    <MenuItem key={idx} value={JSON.stringify(v)}>
      {v.name} 
      </MenuItem>
  )
})


const pets = userPets.map((p,idx) => {   
  return (
    <MenuItem key={idx} value={JSON.stringify(p)}>
      {p.name} 
      </MenuItem>
  )
})

function loadPets() {
 
const {id} = currentUser

fetch(`/api/owners/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})
.then(res => {
  if(res.ok){
      res.json().then(pets => {
          setuserPets(pets.pets)
      })
  } else {
    res.json().then(json => setErrors(json.errors))
  }
})
}

function loadRecords() {

  fetch(`/api/records/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json", 
    },
  })
  .then(res => {
    if(res.ok){
        res.json().then(records => {
          console.log(records)
            setRecordLoad(records)
        })
    }else {
      console.log(res)
      res.json().then(json => setErrors(json.errors))
    }
  })
  }

  function addPet(pet){
    setuserPets([pet,...userPets])
  }

  function addRecord(record){
    setRecordLoad([record,...recordLoad])
  }

  function updateRecord(updatedRecord){
     setRecordLoad(current => {
      return current.map(record => {
        if (record.id === updatedRecord.id) {
          return updatedRecord
        } else {
            return record
          }
    })
  })
}

  function loginUser (user) {
    setCurrentUser(user); 
  }

 const deleteRecord = (id) => {setRecordLoad(current => current.filter(r => r.id !== id))}

 const deletePet = (id) => {setuserPets(current => current.filter(p => p.id !== id))}

  return (
    <Router>
    <NavBar currentUser={currentUser}  setCurrentUser={setCurrentUser}/>
    <Routes>
     <Route path="/" element= {<MainPg currentUser={currentUser}/>} />
     <Route path="/login" element= {<Login onLogin={setCurrentUser} loginUser={loginUser} loadPets={loadPets} />} />
     <Route path="/signup"  element= {<Signup pet={userPets} loginUser={loginUser} />} />
     <Route path="/createRecord"  element= {<CreateRecord pets={pets}  loadPets={loadPets} user={currentUser} addRecord={addRecord} pet={userPets}/>} />
     <Route path="/createPet"  element= {<CreatePet user={currentUser} vets={vets} vetLoad={vetLoad} setVetLoad={setVetLoad}  addPet={addPet}/>} />
     <Route path="/pets"  element= {<PetList loadPets={loadPets} deletePet={deletePet} currentUser={currentUser} setCurrentUser={setCurrentUser} pet={userPets} />} />
     <Route path='/records'  element= {<RecordList updateRecord={updateRecord} loadPets={loadPets} user={currentUser} pet={userPets} deleteRecord={deleteRecord} loadRecords={loadRecords} record={recordLoad} />} />
     <Route path="/editRecord"  element= {<EditRecord loadPets={loadPets} updateRecord={updateRecord} user={currentUser} pet={userPets} deleteRecord={deleteRecord} loadRecords={loadRecords} record={recordLoad} />} />
    </Routes>
    </Router> 
  
  );
}

export default App;