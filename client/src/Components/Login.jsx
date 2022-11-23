import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser, addErrors, clearErrors }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
  
    const navigate = useNavigate();
  
    const handleChange = e => {
      setUsername(e.target.value);
    }
  
    const handleSubmit = e => {
      e.preventDefault();
  
      const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
      if(user) {
        loginUser(user);
        navigate("/")
      } else {
        addErrors(["Username did not match anything in the database"])
      }
    }

  
    return (
      <div className='primary'>
      <h1> Log In </h1> 
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" onChange={ handleChange } value={ username } />
          </div>
          <div>
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" id="password" value={password} onChange={(e) => setUsername(e.target.value)} />
        </div> 
          <br></br>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
  
  export default Login