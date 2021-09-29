import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [alert,setAlert] = useState(null);
    // Get all Notes
    const getNotes = async () => {
        // API Call    
        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json()
            setNotes(json);
        } catch (error) {
            console.log(error);
        }
    }
    // Add a Note
    const addNote = async (note) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag })
            });
            const data = await response.json();
            console.log(data);
            getNotes();

        } catch (error) {
            console.log(error);
        }
    }

    // Delete a Note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const data = response.json();
            console.log(data);
            const newNote = notes.filter((note) => {
                return note._id !== id;
            })
            setNotes(newNote);
        } catch (error) {
            console.log(error);
        }
    }

    // Delete Note
    const editNote = async(note)=>{
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title: note.title, description: note.description, tag: note.tag })
            })
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }
    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert();
        }, 1500);
    }

    return (

        <NoteContext.Provider value={{ notes, alert, getNotes, addNote, deleteNote, editNote, showAlert }}>
            {props.children}
        </NoteContext.Provider>

    )

}

export default NoteState;