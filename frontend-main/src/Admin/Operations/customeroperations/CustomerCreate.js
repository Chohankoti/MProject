import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function OwnerCreate() {

    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        phone: '',
        gender: 'male',
        dob: '',
        role: 'customer',
    });

    const navigate = useNavigate();

    // const IsValidate = () => {
    //     let isproceed = true;
    //     let errormessage = 'Please enter the value in ';
    //     if (firstname === null || firstname === '') {
    //         isproceed = false;
    //         errormessage += ' firstname';
    //     }
    //     if (lastname === null || lastname === '') {
    //         isproceed = false;
    //         errormessage += ' lastname';
    //     }
    //     if (id === null || id === '') {
    //         isproceed = false;
    //         errormessage += ' username';
    //     }
    //     if (password === null || password === '') {
    //         isproceed = false;
    //         errormessage += ' password';
    //     }
    //     if (email === null || email === '') {
    //         isproceed = false;
    //         errormessage += ' Email';
    //     }
    //     if (phone === null || phone === '') {
    //         isproceed = false;
    //         errormessage += ' phone';
    //     }
    //     if (gender === null || gender === '') {
    //         isproceed = false;
    //         errormessage += ' gender';
    //     }
    //     if (dob === null || dob === '') {
    //         isproceed = false;
    //         errormessage += ' date of birth';
    //     }

    //     if (!isproceed) {
    //         toast.warning(errormessage);
    //     } else {
    //         if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    //             isproceed = false;
    //             toast.warning('Please enter a valid email');
    //         }

    //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //         if (!passwordRegex.test(password)) {
    //             isproceed = false;
    //             toast.warning(' a strong password (at least 8 characters, one lowercase letter, one uppercase letter, one special character, and one number)');
    //         }
    //     }

    //     return isproceed;
    // };





    const handlesubmit = (e) => {
        e.preventDefault();


        //  if (IsValidate()) 

        axios.post(`http://localhost:8003/users`, formData)
            .then(res => {
                toast.success('Customer created successfully.');
                navigate('/managecustomer');
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div style={{ marginLeft: '240px', padding: '20px' }}>
            <div className='row' style={{ margin: "100px" }}>
                <div className='offset-lg-3 col-lg-6'>
                    <form className="container" onSubmit={handlesubmit}>
                        <div className='card' >
                            <div className='card-header bg-dark text-white'>
                                <h2>Create Owner</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name <span className="errmsg">*</span></label>
                                            <input name="firstname" value={formData.firstname} onChange={handleInputChange} placeholder='Enter first name' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name <span className="errmsg">*</span></label>
                                            <input name="lastname" value={formData.lastname} onChange={handleInputChange} placeholder='Enter last name' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input name="username" value={formData.username} onChange={handleInputChange} placeholder='Enter username' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Email <span className="errmsg">*</span></label>
                                            <input name="email" value={formData.email} onChange={handleInputChange} placeholder='Enter email' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Phone No <span className="errmsg">*</span></label>
                                            <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder='Enter phone number' className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Gender <span className="errmsg">*</span></label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-control">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Date of Birth <span className="errmsg">*</span></label>
                                            <input name="dob" value={formData.dob} onChange={handleInputChange} placeholder='Enter date of birth' type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label> Password <span className="errmsg">*</span></label>
                                            <input name="password" value={formData.password} onChange={handleInputChange} placeholder='Enter password' className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <Link to='/managecustomer' className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OwnerCreate;