import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({name:'',email: '', password: '', cpassword: ''})
  const {name,email,password,cpassword} = credentials;
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success) {
      localStorage.setItem("auth-token",json.authToken)
      navigate('/')
      props.showAlert('success','Acccount Created Successfully')

    }
    else{
      props.showAlert('danger','User already Exits')

    }
  
  }
  const onChange =(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})  // spread operator
// add ya overrrite krdo (usmiem) note + ...
}
  return (
    <div className="container mt-3">
    <h1>Create a Account Now to use iNotebook</h1>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Enter Your Name</label>
      <input type="text" className="form-control" id="name"  name='name' onChange={onChange} value={name}/>
      

    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email"  name='email'aria-describedby="emailHelp" onChange={onChange} value={email}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Enter Password</label>
      <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={password} autoComplete="password" required minLength={5}/>
    </div>
  
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm your Password</label>
      <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={cpassword} autoComplete="cpassword" required minLength={5}/>
    </div>
  
    <button  type="submit" className="btn btn-primary">Create Account</button>
  </form>
  </div>
  )
}

export default Signup
