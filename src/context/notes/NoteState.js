import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    let host = 'http://localhost:5000'
    const notesInitial =[ ]
    const [notes, setNotes] = useState(notesInitial)
    const [details, setDetails] = useState([])


    // get all note
    const getNotes= async ()=>{
       // API call
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('auth-token')
        },
        
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json)
    

    }


    // Add a note
    const addNote= async (title,description,tag)=>{
       // API call
       const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('auth-token')
        },
        body: JSON.stringify({title,description,tag})
      });
      // console.log('adding a new note')
      const note = await response.json()
      setNotes(notes.concat(note))
      // .concat returns an array while .push updates an aaray

    }

    // Upadte/edit a note
    const editNote= async (id,title,description,tag)=>{
      // API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('auth-token')
        },
        body: JSON.stringify({title,description,tag})
      });
      // const json= response.json()
    
      let newNotes =JSON.parse(JSON.stringify(notes))   // to get copy
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes);

    }

    // DElete a note
    const deleteNote=async (id)=>{
      // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('auth-token')
        },
       
      });
      const json= response.json()
      // console.log('delted note with id '+id);
      let newNote = notes.filter((note)=>{return note._id !== id})
      setNotes(newNote)
    }


    // get user details
    const getDetails=async ()=>{
      // API call
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('auth-token')
        },
       
      });
      const json=  await response.json()
      // console.log(json)
      setDetails(json)
     
    }

    
    return (
     <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote,details,getDetails}}> 
            {props.children}

        </NoteContext.Provider>
    )

    // const v ={
    //     "name" : "rajnish",
    //     "age" : 23
    // }
    // const [state, setState] = useState(v)
    // const update=()=>{
    //     setTimeout(()=>{
    //         setState({'name':'yoyo','age':45})

    //     },3000)

    // }
    // return (
    //     // state or function dono pass krdie
    //     // no need to write full : state:state ,update : update
    //     <NoteContext.Provider value={{state,update}}> 
    //         {props.children}

    //     </NoteContext.Provider>
    // )
}
export default NoteState
