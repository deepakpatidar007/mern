import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const inotes = [
            {
              "_id": "61440ac9bb1e76d565344d16",
              "user": "613d9ccbfaf7403e3f156620",
              "title": "sankalp",
              "description": "please remember your sankalp",
              "tag": "Must to",
              "date": "2021-09-17T03:26:01.850Z",
              "__v": 0
            },
            {
              "_id": "61440ad7bb1e76d565344d18",
              "user": "613d9ccbfaf7403e3f156620",
              "title": "sankalp with update 1",
              "description": "please remember your sankalp",
              "tag": "Must to",
              "date": "2021-09-17T03:26:15.193Z",
              "__v": 0
            },
            {
              "_id": "61440adebb1e76d565344d1a",
              "user": "613d9ccbfaf7403e3f156620",
              "title": "sankalp with update 2",
              "description": "please remember your sankalp",
              "tag": "Must to",
              "date": "2021-09-17T03:26:22.951Z",
              "__v": 0
            },
            {
              "_id": "61440ae4bb1e76d565344d1c",
              "user": "613d9ccbfaf7403e3f156620",
              "title": "sankalp with update 3",
              "description": "please remember your sankalp",
              "tag": "Must to",
              "date": "2021-09-17T03:26:28.444Z",
              "__v": 0
            },
            {
              "_id": "61440ae9bb1e76d565344d1e",
              "user": "613d9ccbfaf7403e3f156620",
              "title": "sankalp with update 4",
              "description": "please remember your sankalp",
              "tag": "Must to",
              "date": "2021-09-17T03:26:33.742Z",
              "__v": 0
            }
        ]
    const [notes,setNotes] = useState(inotes);
    return(
            <NoteContext.Provider value={{notes,setNotes}}>
                {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;