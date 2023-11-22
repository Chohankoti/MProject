import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function DetailHotel() {
    const { id } = useParams();
    const [data, setdata] = useState({});
    let hotel;
    const [rooms, setRooms] = useState([]);
    const owner = sessionStorage.getItem('username');

    useEffect(() => {
        axios.get(`http://localhost:8003/hotels/${id}`)
        .then(res => {
          setdata(res.data);
          hotel = res.data.hotelname
        })
        .catch((err) => {
          console.log(err.message);
        });
        
       
        console.log("check hotel name ",hotel)

        axios.get(`http://localhost:8003/room`)
            .then(res => {
                const fil = res.data.filter((room) => room.hotelname === hotel &  room.ownername === owner)
                setRooms(fil);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    // useEffect(() => {
    //     fetch(`http://localhost:8000/rooms`)
    //         .then((res) => res.json())
    //         .then((resp) => {
    //             const filteredRooms = resp.filter((room) => room.name === name);
    //             setRooms(filteredRooms);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, [name]);

    return (
        <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
            <div className='card'>
                <div className="card-header bg-dark text-white">
                    <h2>Hotel Details</h2>
                </div>
                <div className='card-body'>
                    {/* Hotel Info Table */}
                    <h2>Hotel Info</h2>
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.hotelname}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{data.location}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{data.status ? "Verified" : "Not verified"}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{data.description}</td>
                            </tr>
                            <tr>
                                <td>Hotel Image</td>
                                <td><img src={data.hotelimage} alt="Hotel" width="100" /></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Rooms Table */}
                    <h2>Rooms of the Hotel</h2>
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>ID</th>
                                <th>Facility</th>
                                <th>Description</th>
                                <th>Room Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.facility}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.roomimage} alt="Room" width="100" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer" style={{ textAlign: "center" }}>
                    <Link to='../addhotel' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    )
}

export default DetailHotel;
