const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'iamwebdevelope$r';

// Route1: Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter minimum 5 character').isLength({min:5})
],async (req,res)=>{
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // Check weather the user with this email exist already
    try{
    let user = await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).json({error:"sory a user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
       })

       const data = {
           user:{
               id:user.id
           }
       }
       const authtoken = jwt.sign(data,JWT_SECRET);
       console.log(authtoken); 

    res.json({authtoken});
    }catch(error){
        console.log(error);
        res.status(500).send("internal server error");
    }
 
})
//Route2: Authenticate a user using: POST "api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({errors:"please try to login with correct credential"})
    }

    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error:'please try to login with correct credential'})
    }
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    console.log(authtoken);
    res.json({authtoken})
}catch(error){
    console.log(error);
    res.status(500).send("internal server error");
}
})

//Route3: Get loggedin user Details using: POST "api/auth/getuser". login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }catch(error){
        console.log(error);
        res.status(500).send("internal server error");
    }
})

module.exports = router;