import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router';
import NoteContext from '../context/notes/noteContext';

const Login = () => {
    const context = useContext(NoteContext);
    const {showAlert} = context;
    const [credential, setCredential] = useState({ email: '', password: '' });
    let history = useHistory();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const handleClick = async(e) => {
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': credential.email,
                'password': credential.password
            })
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history.push('/');
            showAlert('Loged in successfully','success');
        }else{
            showAlert('Incorrect credentials','danger');
            return history.push('/login')
        }
    }catch(error){
        console.log(error);
    }
    }
    
    return (
        <div>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name='email' id="inputEmail" onChange={onChange} value={credential.email} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name='password' id="inputPassword" onChange={onChange} value={credential.password} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Sign in</button>
            </form>
        </div>
    )
}

export default Login
