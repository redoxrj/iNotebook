import './App.css';
import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Getdetails from './components/Getdetails';





function App() {
  const[alert,setAlert]= useState(null)
const showAlert =(type,message)=>{
  setAlert({
    type:type,
    msg:message
  })
  setTimeout(() => {
    setAlert(null)
    
  }, 2000);

}
  return (
    <>
  <NoteState>
 <BrowserRouter>
    <Navbar/>
    <Alert alert={alert} />
      <div className="container ">
    <Routes>
        <Route  exact path="/" element={<Home showAlert={showAlert} />} />
        <Route  exact path="/about" element={<About />} />
        <Route  exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route  exact path="/signup" element={<Signup showAlert={showAlert} />} />
        <Route  exact path="/getdetails" element={<Getdetails />} />
      
        
        </Routes>
        </div>
      
   </BrowserRouter>
   </NoteState>

    </>
  );
}

export default App;
