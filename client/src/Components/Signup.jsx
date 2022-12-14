import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


 const Signup = ({loginUser, clearErrors, addErrors }) => {
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    username:'',
    password:''
})

const {username, password} = formData;


  function handleSubmit(e){
    e.preventDefault();

    const owner = {
      username,
      password
    }

    fetch('/owners', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({owner})
    }) 
    .then(res => {
      if(res.ok){
          res.json().then(owner => {
            loginUser(owner)
            navigate((`/pets`))
          })
      }else {
        res.json().then(json => setErrors(json.errors))
      }
  })
 
}

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData({ ...formData, [name]: value })
}


// useEffect(() => {
//   return () => {
//     clearErrors();
//   }
// }, [])
 
  return ( 
    <div className='primary'>
      <h1>{errors}</h1>
    <h1> Create Account </h1> 
    <form onSubmit={ handleSubmit}>
      <div>
        <label htmlFor="username ">Username: </label>
        <input type="text" name="username" id="username" value={username} onChange={handleChange} />
        </div>   
        <div>
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" id="password" value={password} onChange={handleChange} />
        </div> 
        <br></br>
        <input type="submit" value="Create Account"/>
    </form>
   
    </div>
    
  
  )
} 

export default Signup