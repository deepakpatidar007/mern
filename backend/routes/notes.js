const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route1: Get all the notes using GET "/api/notes/getallnotes". Login required
router.get('/getallnotes',fetchuser,[],async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
       res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
    
})

// Route2: Add a new note using POST "/api/notes/addnote". Login required
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
//// Route3: Update an existing note using POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag}

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found 1")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed 2")
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});
})

//// Route4: Delete an existing note using DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    const deletenote = await Note.findByIdAndDelete(req.params.id);
    if(!deletenote){
        return res.status(401).json({error:"somthing went wrong"})
    }
    res.json({delete:"deleted successfully", note:note});
})




module.exports = router