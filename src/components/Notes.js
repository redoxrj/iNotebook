import React ,{useContext,useEffect,useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'



function Notes(props) {
  let navigate = useNavigate()

  const {notes,getNotes,editNote} = useContext(NoteContext)
  useEffect(() => {
    if(localStorage.getItem('auth-token')){

      getNotes()
      // eslint-disable-next-line
    }
    else{
      navigate('/login')

    }
  
  },[]);
  // sirf ek baar chlani hai
  const ref = useRef(null)
   const refClose =  useRef(null)
  const [note, setNote] = useState({id:"",etitle : "", edescription: "",etag : ""})
  const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})

  }

  const handleClick =(e)=>{
    // console.log('upadting notes ...' ,note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
    props.showAlert('success','Note Updated successfully')



  }
  const onChange =(e)=>{
                    //jo bhi chnage ho rha hai uska name uski value ke braber ho jaye
    setNote({...note,[e.target.name]:e.target.value})  // spread operator
    // add ya overrrite krdo (usmiem) note + ...
  }

  return (
    <>
    <Addnote showAlert={props.showAlert}/>
  

    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
<div className="mb-3">
  <label htmlFor="etitle" className="form-label">Title</label>
  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}/>
  
</div>
<div className="mb-3">
  <label htmlFor="edescription" className="form-label">Description</label>
  <input type="text" className="form-control" id="edescription" name='edescription'   value={note.edescription} onChange={onChange} />
</div>
<div className="mb-3">
  <label htmlFor="etag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="etag" name='etag'  value={note.etag} onChange={onChange}/>
</div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<3 } type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="my-3 row">

    <h1>Your Notes</h1>
    <div className="container">
    {notes.length===0 && 'nothing to show  you can add one here'} 
    </div>
      {notes.map((note)=>{
        return <Noteitem note={note}  key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
    
      })}
     </div>
     </>
  )
}

export default Notes
