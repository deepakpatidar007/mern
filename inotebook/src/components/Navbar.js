import React, {useEffect} from 'react'
import { Link,useLocation } from "react-router-dom";
const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location])
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
                    <form className="d-flex mr-0">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
                
            </nav>
            </div>
            </section>
        </div>
    )
}

export default Navbar
