import React from 'react'
import Notes from './Notes'


function Home(props) {
  const {showAlert} = props   // destructuring se bahar nikaal lo
  return (
   <div>
    <Notes showAlert={showAlert}/>   {/* or can direct use by  showAlert={props.showAlert}*/}    
   </div>
  )
}

export default Home
