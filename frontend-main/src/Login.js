import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
const Login = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    
    const usenavigate = useNavigate()
    
    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();

        if(validate())
        {
            axios.get(`http://localhost:8003/users`)
            .then(res =>{
                const resp = res.data.filter(user => user.username === username);
                console.log("check credentials: ",resp[0].username)
                if(Object.keys(resp).length===0){
                    toast.error('Please Enter valid username');
                }
                else {
                    if(resp[0].password===password){
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        if(resp[0].role==='admin')
                        usenavigate('/');
                        if(resp[0].role==='owner')
                        usenavigate('/owner');
                        if(resp[0].role==='customer')
                        usenavigate('/customer');
                    }
                    else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err)=>{
                toast.error('Login Failed due to :'+err.message)
            }) 
        }

    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={ProceedLogin} className="container">
                        <div className="card" style={{marginTop:"100px"}}>
                            <div className="card-header bg-dark text-white">
                                <h1>User Login</h1>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name <span className="errmsg">*</span></label>
                                    <input value={username} onChange={e=>setusername(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password <span className="errmsg">*</span></label>
                                    <input type="password" value={password} onChange={e=>setpassword(e.target.value)} className="form-control" ></input>
                                </div>
                            </div>
                            <div className="card-footer" >
                                <button type="submit" className="btn btn-primary">Login</button>
                                <Link className="btn btn-success" to={'/register'}>New User</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;