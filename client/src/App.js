import NavBar from './Components/NavBar';
import CreatePet from './Components/CreatePet';
import MainPg from './Components/MainPg';
import CreateRecord from './Components/CreateRecord';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Errors from './Components/Errors';
import StyleSheet from './Components/StyleSheet';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PetList from './Components/PetList';
import RecordList from './Components/RecordList';
import MenuItem from '@mui/material/MenuItem';


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn]  = useState(false);
  const [errors, setErrors] = useState([]);
  const [petLoad, setPetLoad] = useState([]);
  const [recordLoad, setRecordLoad] = useState([]);


  const [loadVet, setLoadVet] = useState([]);
  const [chosenVet, setChosenVet] = useState("none");


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      console.log(r);
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
        setLoggedIn(true);
      }
    });
  }, []);


  // console.log(currentUser)





//   function loadVetsData() {
//     fetch("/vets")
//     .then((resp) => resp.json())
//     .then((data)=> {
//       setLoadVet(data); 
//     })
// }

const vets = loadVet.map((v,idx) => {   
  return (
    <MenuItem key={idx} value={JSON.stringify(v)}>
      {v.name} 
      </MenuItem>
  )
})


function loadPets() {
fetch("/pets", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json", 
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include"
})
.then(res => {
  if(res.ok){
      res.json().then(pets => {
          setPetLoad(Object.keys(pets))
      })
  }else {
    console.log(res)
    res.json().then(json => setErrors(json.errors))
  }
})
}

    // useEffect(() => {
  //   fetch("/records")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setRecordLoad(data)
  //   })
     
  // } , [])

 
  function addPet(pet){
    setPetLoad([pet,...petLoad])
  }

  function addRecord(record){
    setRecordLoad([record,...recordLoad])
  }

  // function updateRecord(updatedRecord){
  //    setRecordLoad(current => {
  //     return current.map(record => {
  //       if (record.id === updatedRecord.id) {
  //         return updatedRecord
  //       } else {
  //           return record
  //         }
  //   })
  // })


  function loginUser (user) {
    setCurrentUser(user); 
    setLoggedIn(true);
  }
  
  function logoutUser() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        setLoggedIn(false)
      }
    });
  }

  // function logoutUser () {
  //   setCurrentUser({});
  //   setLoggedIn(false);
  // }

  function addErrors (errors) {
    setErrors(errors);
 }
 
 const clearErrors = () => {
   setErrors([]);
 }

 const deleteRecord = (id) => {setRecordLoad(current => current.filter(r => r.id !== id))}


  return (
    <Router>
    <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} logoutUser={logoutUser}/>
    <Errors errors= {errors} />
    <Routes>
     <Route path="/" element= {<MainPg loggedIn={loggedIn }/>} />
     <Route path="/login" element= {<Login onLogin={setCurrentUser} loginUser={loginUser} setLoggedIn={setLoggedIn} clearErrors={ clearErrors } loadPets={loadPets}  addErrors= {addErrors}/>} />
     <Route path="/signup"  element= {<Signup clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors} />} />
     <Route path="/createRecord"  element= {<CreateRecord user={currentUser}  clearErrors={ clearErrors } addErrors= {addErrors} addRecord={addRecord} pet={petLoad}/>} />
     <Route path="/createPet"  element= {<CreatePet  user={currentUser} chosenVet={chosenVet} setChosenVet={setChosenVet} vets={vets}loadVet={loadVet} setLoadVet={setLoadVet} clearErrors={ clearErrors } addErrors= {addErrors} addPet={addPet}/>} />
     <Route path="/pets"  element= {<PetList  chosenVet={chosenVet} user={currentUser}  pet={petLoad} />} />
     <Route path="/records"  element= {<RecordList  user={currentUser}  record={recordLoad} />} />
    </Routes>
    </Router> 
  
  );
}

export default App;
