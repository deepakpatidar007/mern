import React, {useEffect} from 'react'
import { Link,useLocation, useHistory } from "react-router-dom";
const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
        <div>
        <section className="navbar-sectiom">
        <div className='navbar-topcontroler'>
            <nav className=" navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <div>
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/about' ? 'active' : ''}`} to="/about">About</Link>
                    </li>
                    
                    </ul>
                    </div>
                    <div>
                    { !localStorage.getItem('token') ? 
                    <form className="d-flex">
                        <Link role='button' className='btn btn-primary mx-1' to='/login'>Login</Link>
                        <Link role='button' className='btn btn-primary mx-1' to='/signup'>SignUp</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-primary mr-2">Log Out</button> }
                    </div>
                </div>
                
            </nav>
            </div>
            </section>
        </div>
    )
}

export default Navbar
