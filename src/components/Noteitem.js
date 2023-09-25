import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'


function Noteitem(props) {
    const {note ,updateNote} = props
  const {deleteNote} = useContext(NoteContext)


  return (
    <div className='col-md-3'>
     <div className="card my-2" >
     <div className="card-body">
        <div className="d-flex align-items-center ">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square ms-4" onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash mx-3 " onClick={()=>{deleteNote(note._id);      props.showAlert('success','Note Deleted successfully')
}}></i>
    </div>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag.length===0?'default':note.tag}</p>
    
    
  </div>
</div>
      
    </div>
  )
}

export default Noteitem
