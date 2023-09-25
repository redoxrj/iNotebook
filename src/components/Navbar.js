import React from 'react'
import {Link,useLocation}  from "react-router-dom";

function Navbar() {
  let location = useLocation();

  // React.useEffect(() => {
  // //  console.log(location)
  // // eslint-disable-next-line
  // }, [location]);

 const handleLogout =()=>{
  localStorage.removeItem('auth-token')
  // since unique auth-tokens are given to a particular user only at sign up therrfore notes retrive from that unique auth-token are unique and distnat and usi user ke fetch hotey hai
 }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className= {`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/about">About</Link>
        </li>
       
      </ul>
      {!localStorage.getItem('auth-token')?<form className="d-flex" role="search">
      <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-danger mx-1" to="/signup" role="button">Sign Up</Link>
      
      </form> : <> <Link  onClick={handleLogout}className="btn btn-warning mx-1" to="/login" role="button">Log Out</Link > <Link  className="btn btn-primary mx-1" to="/getdetails" role="button">View Account Details</Link > </>
      
       }
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar
