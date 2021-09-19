import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/noteContext'


const Addnote = () => {
    const context = useContext(NoteContext);
    const {addnote} = context;
    const [note,setNote] = useState({title:'',description:'',tag:'default'})
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        addnote(note);  
    }
    return (
        <div className='container my-2'>
            <form className='my-3'>
                <div className="form-group my-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title'  
                    onChange={onChange} placeholder="Enter title"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="title">Description</label>
                    <input type="text" className="form-control" id="desc" name='description'
                    onChange={onChange} placeholder="Enter description"/>
                </div>
                <div className="form-check my-2">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
            </form>
        </div>
    )
}

export default Addnote
