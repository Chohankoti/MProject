import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function OwnerDetail() {
    const { id } = useParams();
    const [data, setdata] = useState({});
    const [hotel, sethotel] = useState([]);


    const LoadEdit = (item) => {

    item.status=!item.status  

    axios.put(`http://localhost:8003/hotels/${item.id}`, item)
        .then(res => {
            toast.success('Hotel status updated successfully.');
            window.location.reload();
        })
        .catch((err) => {
            toast.error('Failed to update hotel status: ' + err.message);
        });
    }
 

useEffect(() => {

    axios.get('http://localhost:8003/users/' + id)
        .then(res => {
            setdata(res.data)
        })
        .catch((err) => {
            console.log(err.message);
        });

    axios.get(`http://localhost:8003/hotels`)
        .then(res => {
            console.log("check owner name", data.username)
            const fil = res.data.filter(hotel => hotel.owner === data.username)
            sethotel(fil);
        })
        .catch((err) => {
            console.log(err.message);
        });

}, [id, data.username]);

return (
    <div style={{ marginLeft: '240px', padding: '20px' }}>
        <div className="card">
            <div className="card-header bg-dark text-white">
                <h1>Owner Detail</h1>
            </div>
            <div className="card-body">
                <h2>Owner Bio-data</h2>
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
                            <td>{data.email}</td> {/* Corrected the display */}
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
                <h2>Owner's Hotel List</h2>
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>hotel name</th>
                            <th>location</th>
                            <th>status</th>
                            <th>Description</th>
                            <th>image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotel &&
                            hotel.map((item) => (
                                <tr>
                                    <td>{item.hotelname}</td>
                                    <td>{item.location}</td>
                                    <td>{item.status === true ? "Verified" : "Not verified"}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.hotelimage} alt="Hotel" width="100" /></td>
                                    <td>
                                        {item.status === true ? <a onClick={() => { LoadEdit(item) }} className="btn btn-success">verified</a> :
                                            <a onClick={() => { LoadEdit(item) }} className="btn btn-danger">UnVerified</a>}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="card-footer" style={{ textAlign: "center" }}>
                <Link to='/managehotel' className='btn btn-primary'>Back</Link>
            </div>
        </div>
    </div>
)
}

export default OwnerDetail;
