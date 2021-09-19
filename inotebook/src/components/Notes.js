import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes,getnotes} = context;

    useEffect(() => {
        getnotes();
    }, [])

    return (
        <>
        <Addnote />
        <div className='row'>
            { notes.map((note)=>{
                    return <Noteitem key={note._id} note={note} />
                }) 
            }
        </div>
        </>
    )
}

export default Notes
