const mongoose = require('mongoose')
const mongoURI ='mongodb://127.0.0.1:27017/inotebook'

const connectToMongo =async ()=>{
    await mongoose.connect(mongoURI).then(()=>{

        console.log('connnected to mongoose successfully')
    }).catch((err)=>{
        console.log('error connecting to mongoose lol')
        console.log(err)
    })
   
}

module.exports = connectToMongo