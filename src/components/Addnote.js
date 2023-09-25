import React ,{useContext,useState} from 'react'

import NoteContext from '../context/notes/noteContext'


function Addnote(props) {
  const [note, setNote] = useState({title : "", description: "",tag : ""})
  const {addNote} = useContext(NoteContext)
  const handleClick =(e)=>{
    e.preventDefault()

    addNote(note.title,note.description,note.tag)
    setNote({title : "", description: "",tag : ""}) 
    props.showAlert('success','Note Added successfully')

  }
  const onChange =(e)=>{
                    //jo bhi chnage ho rha hai uska name uski value ke braber ho jaye
    setNote({...note,[e.target.name]:e.target.value})  // spread operator
    // add ya overrrite krdo (usmiem) note + ...
  }

  return (
    <div className="container">
    <div className="my-3">
  <h1>Add a Note</h1>
  </div>
  <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title"  value={note.title}aria-describedby="emailHelp" onChange={onChange}/>
  
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name='tag'  value={note.tag}onChange={onChange}/>
</div>

<button disabled={note.title.length<3 || note.description.length<3 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}

export default Addnote
