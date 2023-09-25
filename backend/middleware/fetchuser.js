// middleware is nothing but fuctions if we want to use directly in any routes (endpoint) wherrverr required ,it can be passed as second argument to that route

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rajnish$123'

const fetchuser =(req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error: 'please authenticate using valid token'});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET) // ismien whi data aayega jo humney create/login ke time bheja tha yaani only user id
        req.user = data.user   // ye user whi data ke ander ek obj h
        next(); // at the last hum last argument ko as function call krdenegy

        
    } catch (error) {
        return res.status(401).json({error: 'please authenticate using valid token'});
        
    }

}
module.exports = fetchuser