const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');



// ROUTE 1 : get all notes of a logged-in user using: GET "/api/notes/fetchallnotes"  login required

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id}) // find all notes of paarticular user id
         res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error occurred') 
    }
})


// ROUTE 2 : to add a new note using: POST "/api/notes/addnote"  login required

router.post('/addnote',fetchuser,[
    body('title','title min 3 char').isLength({ min: 3 }),
    body('description','description min 5 char').isLength({ min: 5 })
] ,async (req,res)=>{
    const {title,description,tag} =req.body
    const result = validationResult(req);  // eroors here if any
   if(!result.isEmpty()){
     return res.status(400).json({ errors: result.array() });

   }
   try {
    let note = new Note ({
        title,description,tag,user: req.user.id   // again no need to write full : {title:title}
       })
       let savedNote = await note.save()  // db models ke sabbhi methods promise return krtrey hai hence we have to use await them
       res.json(savedNote)
    
   } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error occurred') 

    
   }
  

})

// ROUTE 3 : upadte an exiisting note using: PUT "/api/notes/updatenote/:id'"  login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
  const  {title,description,tag} = req.body
  try {
    const newNote ={}
    if(title) {newNote.title = title}
    if(description) {newNote.description = description}
    if(tag) {newNote.tag = tag}

    // find thr note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note) {  // note hi ni mila wo toh us id ka db mien afc
       return res.status(404).send('note not found')
    }
    // not allow to update the note if its not belong to that logged in user
    if(note.user.toString() !== req.user.id){
       return res.status(401).send('not authorized')

    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new: true})
    res.json({note})

    
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error occurred')
    
  }
    



})
// ROUTE 4 : delete an exiisting note using: DELETE "/api/notes/updatenote/:id'"  login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  
    try {
        // find thr note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if(!note) {  // note hi ni mila wo toh us id ka db mien afc
       return res.status(404).send('note not found')
    }
    // not allow to update the note if its not belong to that logged in user
    if(note.user.toString() !== req.user.id){
       return res.status(401).send('not authorized')

    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({'succes' : 'note has been deleted',note:note})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error occurred')
        
    }
   
    




})



module.exports = router