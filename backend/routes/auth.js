const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'rajnish$123'   // can store as local env variable

// ROUTE 1 : create a User using: POST "/api/auth/createuser"  no login required
router.post('/createuser', [
    body('name','enter name with min 3 char').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be of 5 char').isLength({ min: 5 })

],async (req,res)=>{
    // console.log(req.body)
    // const user = User(req.body)
    // user.save()
    // res.json('hello !')
    let success = false

const result = validationResult(req);  // eroors here if any
  if (result.isEmpty()) {  // agar ssare validators check ok hai toh ye karo
    // return res.send(`Hello, ${req.body.name}!`);
    try {
        // fund krega exisiting db mein same email hia ki nhi
        let user =  await User.findOne({email : req.body.email})
        if(user){
            res.status(400).json({success,error: 'User already exists with same email'})
        }
        else{
            // both methods returns a promise thats why we have to await them first
            const salt = await bcrypt.genSalt(10) 
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data ={ // authToken mein hum ye data bhej rhien hai
                user :{
                    id : user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET); // authorizre that user only witnh its id (best method to authroize that unique user)
            // authorizing a particular user corresponding to a data and auth_key (JWT_SECRET here) which is our own
            // console.log(jwtToken)
            success = true;
            res.json({success,authToken}); // no neeed to write full {authToken : authToken}
            // the authToken generated here will be different each time
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('some error occurred')
        
    }

    // .then(user => res.json(user))
    // // return res.send(req.body);
    // .catch(err=>{console.log(err)
    // res.json({messsage : 'please enter unique email address', error : err.message});});
  }

  else{ // if there are eroors return error
    res.status(400).json({ errors: result.array() });
    // res.json(req.body)
  }
})



// ROUTE 2 : Authenticate a User using: POST "/api/auth/login"  no login required
router.post('/login', [
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').notEmpty()

],async (req,res)=>{
    let success = false
 const result = validationResult(req);  // eroors here if any
  if (result.isEmpty()) {  // agar ssare validators check ok hai toh ye karo
    const {email, password} = req.body // destrucuting to get values
    try {
        let user = await User.findOne({email}) // again no need to write full //poora user ismine aajyeaga means wo user find krke selceted ho jayega with its data
        if(!user){
            return res.status(400).json({success,message: 'please enter correct credentials'})
        }
        const passCompare = await bcrypt.compare(password, user.password)
        if(!passCompare){
           return res.status(400).json({success,message: 'please enter correct credentials'})
        }
        const data ={
            user :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true; 
        res.json({success,authToken});

        


    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error occurred') 
        
    }

  }

  else{ // if there are eroors return error
    res.status(400).json({ errors: result.array() });
  }

})



// ROUTE 3 : get loged-in user details using: POST "/api/auth/getuser"  login required
router.post('/getuser',fetchuser,async (req,res)=>{

    try {
        // note : authToken ke ander hum already user ki id bhej rhien hai
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password') // password ko deselect krida(except)
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error occurred') 
        
    }

  }

)





module.exports = router