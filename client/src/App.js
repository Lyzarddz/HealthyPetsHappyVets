import NavBar from './Components/NavBar';
import MainPg from './Components/MainPg';
import CreateRecord from './Components/CreateRecord';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Errors from './Components/Errors';
import StyleSheet from './Components/StyleSheet';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn]  = useState(false);
  const [errors, setErrors] = useState([]);

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
     <Route path="/" element= {<MainPg loginUser={loginUser}/>} />
     <Route path="/login" element= {<Login clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors}/>} />
     <Route path="/signup"  element= {<Signup clearErrors={ clearErrors } loginUser={loginUser} addErrors= {addErrors} />} />
     <Route path="/createRecord"  element= {<CreateRecord clearErrors={ clearErrors } addErrors= {addErrors} />} />
    </Routes>
    </Router> 
  
  );
}

export default App;
