const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route1: Get all the notes using GET "/api/auth/getallnotes". Login required
router.get('/getallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
    res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
    
})

// Route2: Add a new note using POST "/api/auth/addnote". Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    const {title,description,tag} = req.body;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const note = new Note ({
            title,description,tag,user:req.user.id
        })
        await note.save();
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
    

})


module.exports = router