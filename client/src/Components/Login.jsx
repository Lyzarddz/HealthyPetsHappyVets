import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({ loginUser, addErrors, clearErrors , loadPets}) => {
  
  
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

    fetch('/login', {
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
            //  loadPets
              navigate((`/pets/`))
              
          })
      }else {

        res.json().then(json => setErrors(json.errors))
      }
  })
}   




const obj = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))

console.log(obj)


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
      <h1>{errors}</h1>
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