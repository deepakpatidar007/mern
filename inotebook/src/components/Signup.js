import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router'
import NoteContext from '../context/notes/noteContext'

const Signup = () => {
    let history = useHistory();
    const context = useContext(NoteContext);
    const {showAlert} = context;
    const icredentials = {name:'',email:'',password:''}
    const [credentials,setCredentials] = useState(icredentials);
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value });
    }
    const handleClick = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/createuser',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    name:credentials.name,
                    email:credentials.email,
                    password:credentials.password
                })
            })
            const json = await response.json();
            if(json.success){
                showAlert('Registration successfully','success');
                history.push('/login');
            }else{
                return showAlert('An error occured','danger');
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" name='name' id="inputName" onChange={onChange} value={credentials.name} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-5">
                        <input type="email" className="form-control" name='email' id="inputEmail" onChange={onChange} value={credentials.email} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-5">
                        <input type="password" className="form-control" name='password' id="inputPassword" onChange={onChange} value={credentials.password} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
