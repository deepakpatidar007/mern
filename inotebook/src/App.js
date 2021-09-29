import React, {useContext} from 'react'
import Navbar from './components/Navbar'
import './index.css'
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import { useHistory } from 'react-router';


const App = () => {
  const history = useHistory();

  return (
    <>
      <div>
      
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <Switch>
            
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route> 
            
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </Router>
        </NoteState>
        
      </div> 
    </>
  )
}

export default App
