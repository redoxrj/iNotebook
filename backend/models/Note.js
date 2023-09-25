const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
 // yha ye isliye add kiya taaki user ko sirf uskihi notes ke ssath limnk krskey
   user:{ // basically yha User.js se aarhien user {id : ObjectId} ko store krengey
      type : mongoose.Schema.Types.ObjectId, // kind of forign key in SQL
      ref : 'user'  // reference model
   },
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true,
   },
   tag:{
    type: String,
    default : "general"
   },
   date:{
    type: Date,
    default : Date.now
   },
  });

  module.exports = mongoose.model('note',noteSchema)