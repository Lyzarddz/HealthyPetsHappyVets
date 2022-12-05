import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({ loginUser, addErrors, clearErrors }) => {
  
  
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
      username:'',
      password:''
  })

  const [errors, setErrors] = useState([])

  const {username, password} = formData;

  
  
  function handleSubmit(e){
    e.preventDefault();

    const owner = {
      username,
      password
    }

  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(owner)
    }) 
    .then(res => {
      if(res.ok){
          res.json().then(owner => {
              loginUser(owner)
              navigate((`/pets`))
          })
      }else {
        console.log(res)
        res.json().then(json => setErrors(json.errors))
    
      }
  })
 
}   


  const handleChange = (e) => {
  const { name, value } = e.target
  setFormData({ ...formData, [name]: value })
}

    useEffect(() => {
        return () => {
          clearErrors();
        }
      }, [])

  
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
        <input type="text" name="password" id="password" value={password} onChange={handleChange} />
        </div> 
          <br></br>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
  
  export default Login