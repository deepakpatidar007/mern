import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useHistory } from 'react-router';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote, showAlert } = context;
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        }else history.push('/login');
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:'', title:'',description:'',tag:''})

    const updateNote = (currentNote) => {
        setNote(currentNote);
        ref.current.click();
        console.log(currentNote);
        
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        refClose.current.click();
        editNote(note);
        showAlert('updated successfully','success');
    }

    return (
        <>
            <Addnote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='container my-2'>
                                <form className='my-3'>
                                    <div className="form-group my-2">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" name='title'
                                            value={note.title} onChange={onChange} placeholder="Enter title" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="title">Description</label>
                                        <input type="text" className="form-control" id="desc" name='description'
                                            value={note.description} onChange={onChange} placeholder="Enter description" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="titl">Tag</label>
                                        <input type="text" className="form-control" id="tag" name='tag'
                                            value={note.tag} onChange={onChange} placeholder="Enter tag" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h2>Your notes</h2>
                { notes.length !==0 ? notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                }) : <div className='container'>
                        'you dont have a note to display'
                    </div>
                }
                
            </div>
        </>
    )
}

export default Notes
