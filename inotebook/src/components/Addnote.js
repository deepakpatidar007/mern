import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/noteContext'


const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote, showAlert} = context;
    
    const [note,setNote] = useState({title:'',description:'',tag:''})

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:'',description:'',tag:''});
        showAlert('New Note added successfully','success');
    }
    return (
        <div className='container my-2'>
            <form className='my-3'>
                <div className="form-group my-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title}
                    onChange={onChange} placeholder="Enter title"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="title">Description</label>
                    <input type="text" className="form-control" id="desc" name='description' value={note.description}
                    onChange={onChange} placeholder="Enter description"/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="titl">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag}
                    onChange={onChange} placeholder="Enter tag"/>
                </div>
                <button disabled={ note.title.length <5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
            </form>
        </div>
    )
}

export default Addnote
