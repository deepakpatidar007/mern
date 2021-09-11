const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
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
       const authtoken = jwt.sign(data,'JWT_SECRET');
       console.log(authtoken); 

    res.json({authtoken});
    }catch(error){
        console.log(error);
        res.status(500).send("some error occured");
    }

})

module.exports = router;