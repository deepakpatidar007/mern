import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const {note} = props;
    const context = useContext(NoteContext);
    const {deletenote} = context;
    const deleteNote = (id)=>{
        deletenote(id);
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3 ">
                <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <i class="fas fa-trash-alt mx-2" onClick={()=>deleteNote(note._id)}></i>
                <i class="fas fa-edit"></i>
                <p className="card-text">{note.description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                
            </div>
        </div>
    )
}

export default Noteitem
