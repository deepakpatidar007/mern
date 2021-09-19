import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const inotes = []
    const [notes, setNotes] = useState(inotes);

    const getnotes = async() => {
        const response = await fetch('http://localhost:5000/api/notes/getallnotes', {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZDljY2JmYWY3NDAzZTNmMTU2NjIwIn0sImlhdCI6MTYzMjAzMzU2M30.j6UI2zzqlcDDQ7c8eKJqHpESAAbcemSKmojppXNrhN0'

            }
        })
        const json = await response.json()
        console.log(json);


    }

    // Add a note

    const addnote = (props) => {
        const note = {
            "_id": "61440ae9bb1e76d565344d1e",
            "user": "613d9ccbfaf7403e3f156620",
            "title": props.title,
            "description": props.description,
            "tag": props.tag,
            "date": "2021-09-17T03:26:33.742Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }
    // Delete a note
    const deletenote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes);
    }
    // Edit a note
    const editnote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;