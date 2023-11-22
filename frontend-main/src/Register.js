import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {


    const [id, setid] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [gender, setgender] = useState("male");
    const [dob, setdob] = useState("");
    const [role, setrole] = useState("customer");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (firstname === null || firstname === '') {
            isproceed = false;
            errormessage += ' firstname';
        }
        if (lastname === null || lastname === '') {
            isproceed = false;
            errormessage += ' lastname';
        }
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' username';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        if (phone === null || phone === '') {
            isproceed = false;
            errormessage += ' phone';
        }
        if (gender === null || gender === '') {
            isproceed = false;
            errormessage += ' gender';
        }
        if (dob === null || dob === '') {
            isproceed = false;
            errormessage += ' date of birth';
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isproceed = false;
                toast.warning('Please enter a valid email');
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                isproceed = false;
                toast.warning(' a strong password (at least 8 characters, one lowercase letter, one uppercase letter, one special character, and one number)');
            }
        }

        return isproceed;
    };





        const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { firstname, lastname, id, password, email, phone, gender, dob, role };

            if (IsValidate()) {
                fetch("http://localhost:8000/Data", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(regobj)
                }).then((res) => {
                    toast.success('Registered successfully.')
                    navigate('/login');
                }).catch((err) => {
                    toast.error('Failed :' + err.message);
                });
            }
        };



        return (
            <div>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{marginTop:"100px"}}>
                            <div className="card-header bg-dark text-white">
                                <h1>User Registeration</h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name <span className="errmsg">*</span></label>
                                            <input value={firstname} onChange={e => setfirstname(e.target.value)} placeholder='Enter first name' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name <span className="errmsg">*</span></label>
                                            <input value={lastname} onChange={e => setlastname(e.target.value)} placeholder='Enter second name' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>User Name <span className="errmsg">*</span></label>
                                            <input value={id} onChange={e => setid(e.target.value)} placeholder='Enter user name' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Password <span className="errmsg">*</span></label>
                                            <input value={password} onChange={e => setpassword(e.target.value)} placeholder='Enter password' type="password" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Email <span className="errmsg">*</span></label>
                                            <input value={email} onChange={e => setemail(e.target.value)} placeholder='Enter Email' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Phone No <span className="errmsg">*</span></label>
                                            <input value={phone} onChange={e => setphone(e.target.value)} placeholder='Enter phone number' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Gender <span className="errmsg">*</span></label>
                                            <select value={gender} onChange={e => setgender(e.target.value)} className="form-control">
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Date of birth<span className="errmsg">*</span></label>
                                            <input value={dob} onChange={e => setdob(e.target.value)} placeholder='Enter you data of birth' type="date" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer" style={{textAlign:"center"}}>
                                <button type="submit" className="btn btn-primary" >Register</button> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

    export default Register;