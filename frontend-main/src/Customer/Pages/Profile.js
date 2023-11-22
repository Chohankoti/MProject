import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
    let username = sessionStorage.getItem('username');
    const [data, setData] = useState(null); // Initialize as null

    const navigate = useNavigate();

    useEffect(() => {
        const userData = [
            {
                "id": 14,
                "firstname": "nallamothu",
                "lastname": "navya",
                "username": "navya",
                "email": "navya@gmail.com",
                "phone": "1234512369",
                "gender": "Female",
                "dob": "2023-09-15",
                "password": "navyaCUSTOMER@1",
                "role": "customer"
            }
        ];

        const fil = userData.find(user => user.username === username);

        if (fil) {
            setData(fil); // Set data as an object
        } else {
            toast.error('User not found'); // Display an error message if user is not found
            navigate('/customer'); // Redirect to the customer page or handle it as needed
        }
    }, [username, navigate]);

    const LoadFeed = (id) => {
        navigate("../feedback/" + id);
    }

    return (
        <div className='container' style={{ marginTop: "50px" }}>
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h1>User Detail</h1>
                </div>
                <div className="card-body">
                    {data && (
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>{data.firstname}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{data.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{data.gender}</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{data.dob}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="card-footer" style={{ textAlign: "center" }}>
                    <Link to='/customer' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
