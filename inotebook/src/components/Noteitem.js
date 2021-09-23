import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;


    return (
        <div className='col-md-3'>
            <div className="card my-3 ">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fas fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
                    <i className="fas fa-edit" onClick={() => updateNote(note)} ></i>
                    <p className="card-text">{note.description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h6>{note.tag}</h6>
                </div>

            </div>
        </div>
    )
}

export default Noteitem
