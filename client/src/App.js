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

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn]  = useState(true);
  const [errors, setErrors] = useState([]);
  const [petLoad, setPetLoad] = useState([]);


  // useEffect(() => {
  //   fetch("http://localhost:3000/pet")
  //   .then((resp) => resp.json())
  //   .then((data)=> {
  //     setPetLoad(data)
  //   })
     
  // } , [])

 

  function loginUser (user) {
    setCurrentUser(user);
    setLoggedIn(true);
    localStorage.setItem('user_id', user.id);
  }
  
  function logoutUser () {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem('user_id');
  }

  function addErrors (errors) {
    setErrors(errors);
 }
 
 const clearErrors = () => {
   setErrors([]);
 }

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    if (userId && !loggedIn) {
      fetch('http://localhost:3000/users/' + userId )
      .then(resp => resp.json())
      .then(data => loginUser(data))
  
    }
  
  }, [loggedIn])

  return (
    <Router>
    <NavBar loggedIn={loggedIn} logoutUser={logoutUser}/>
    <Errors errors= {errors} />
    <Routes>
     <Route path="/" element= {<MainPg loggedIn={loggedIn}/>} />
     <Route path="/login" element= {<Login clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors}/>} />
     <Route path="/signup"  element= {<Signup clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors} />} />
     <Route path="/createRecord"  element= {<CreateRecord clearErrors={ clearErrors } addErrors= {addErrors} />} />
     <Route path="/createPet"  element= {<CreatePet clearErrors={ clearErrors } addErrors= {addErrors} />} />
     <Route path="/pets"  element= {<PetList pet={petLoad} />} />
    </Routes>
    </Router> 
  
  );
}

export default App;
