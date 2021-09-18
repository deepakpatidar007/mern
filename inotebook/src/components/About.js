import React, {useContext,useEffect} from 'react'
import NoteContext from '../context/notes/noteContext'


const About = () => {
    const context = useContext(NoteContext);
    useEffect(() => {
        context.update();
    }, [])
    return (
        <div>
            <h1>this is about {context.state.name} and class is {context.state.class} </h1>
        </div>
    )
}

export default About
