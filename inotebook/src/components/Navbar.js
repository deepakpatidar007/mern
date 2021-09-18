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
            <nav class=" navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <div>
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link className={`nav-link ${location.pathname==='/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className={`nav-link ${location.pathname==='/about' ? 'active' : ''}`} to="/about">About</Link>
                    </li>
                    
                    </ul>
                    </div>
                    <div>
                    <form class="d-flex mr-0">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
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
