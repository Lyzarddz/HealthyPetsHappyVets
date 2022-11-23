import NavBar from './Components/NavBar';
import MainPg from './Components/MainPg';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StyleSheet from './Components/StyleSheet';

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


  return (
    <Router>
    <NavBar loggedIn={loggedIn} logoutUser={logoutUser}/>
    <Routes>
     <Route path="/" element= {<MainPg/>} />
    </Routes>
    </Router> 
  
  );
}

export default App;
