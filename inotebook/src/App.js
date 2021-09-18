import React from 'react'
import Navbar from './components/Navbar'
import './index.css'
import {
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';

const App = () => {
  return (
    <div>
    <NoteState>
      <Navbar />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        </NoteState>
    </div>
  )
}

export default App
