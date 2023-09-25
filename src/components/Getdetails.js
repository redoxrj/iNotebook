import React ,{useContext,useEffect} from 'react'
import NoteContext from '../context/notes/noteContext'

const Getdetails = () => {
    const {details,getDetails} = useContext(NoteContext)
    useEffect(() => {
        getDetails()
      
      },[]);
  return (
    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Account ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>{details._id}</td>
        <td>{details.name}</td>
        <td>{details.email}</td>
      </tr>
      
    </tbody>
  </table>
  )
}

export default Getdetails
