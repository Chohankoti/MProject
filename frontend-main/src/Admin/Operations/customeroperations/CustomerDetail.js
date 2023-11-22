import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OwnerDetail() {
    const { id } = useParams();
    const [data, setdata] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8003/users/${id}`)
        .then(res => { 
          setdata(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

   

    return (
        <div style={{ marginLeft: '240px', padding: '20px' }}>
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h1>Customer Detail</h1>
                </div>
                <div className="card-body">
                    <h2>Customer Bio-data</h2>
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
                                <td>Username</td>
                                <td>{data.username}</td>
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
                </div>
                <div className="card-footer" style={{ textAlign: "center" }}>
                    <Link to='/managecustomer' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetail;
