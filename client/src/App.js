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


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn]  = useState(false);
  const [errors, setErrors] = useState([]);
  const [petLoad, setPetLoad] = useState([]);
  const [recordLoad, setRecordLoad] = useState([]);




function loadPets() {
 
fetch("http://localhost:3000/pets", {
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

  // function loadPets(){
  //   fetch("http://localhost:3000/pets")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setPetLoad(Object.keys(data))
  //   })
  // }
  

    // useEffect(() => {
  //   fetch("http://localhost:3000/records")
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
  
  function logoutUser () {
    setCurrentUser({});
    setLoggedIn(false);
  }

  function addErrors (errors) {
    setErrors(errors);
 }

 
 const clearErrors = () => {
   setErrors([]);
 }

 const deleteRecord = (id) => {setRecordLoad(current => current.filter(r => r.id !== id))}

  // useEffect(() => {
  //   const userId = localStorage.getItem('user_id')
  //   if (userId && !loggedIn) {
  //     fetch('http://localhost:3000/owners/' + userId )
  //     .then(resp => resp.json())
  //     .then(data => loginUser(data))
  //   }
  
  // }, [loggedIn])



  return (
    <Router>
    <NavBar loggedIn={loggedIn} logoutUser={logoutUser}/>
    <Errors errors= {errors} />
    <Routes>
     <Route path="/" element= {<MainPg loggedIn={loggedIn }/>} />
     <Route path="/login" element= {<Login clearErrors={ clearErrors } loadPets={loadPets} loginUser={loginUser} addErrors= {addErrors}/>} />
     <Route path="/signup"  element= {<Signup clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors} />} />
     <Route path="/createRecord"  element= {<CreateRecord user={currentUser}  clearErrors={ clearErrors } addErrors= {addErrors} addRecord={addRecord} pet={petLoad}/>} />
     <Route path="/createPet"  element= {<CreatePet  user={currentUser}  clearErrors={ clearErrors } addErrors= {addErrors} addPet={addPet}/>} />
     <Route path="/pets"  element= {<PetList  user={currentUser}  pet={petLoad} />} />
     <Route path="/records"  element= {<RecordList  user={currentUser}  record={recordLoad} />} />
    </Routes>
    </Router> 
  
  );
}

export default App;
