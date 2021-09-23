const jwt =  require('jsonwebtoken');
const JWT_SECRET = 'iamwebdevelope$r';

const fetchuser = (req,res ,next)=>{
    // Get the user from the jwt token and add id to request object
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Internal server error"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token token"})
        console.log(error);
    }
    
}
module.exports =  fetchuser;