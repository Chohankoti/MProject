import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function CreateRoom() {
    const owner = sessionStorage.getItem('username');
    const [facilities, setFacilities] = useState([]);
    const [name, setName] = useState([]);

    let [data, setdata] = useState({
        ownername: owner,
        hotelname: '',
        facility: '',
        description: '',
        roomimage: ''
    })

    const navigate = useNavigate();

    
    useEffect(() => {

        axios.get('http://localhost:8003/facility')
            .then(res => {
                setFacilities(res.data)
            })
            .catch((err) => {
                console.log(err.message);
            });


        axios.get(`http://localhost:8003/hotels`)
            .then(res => {
                const fil = res.data.filter(hotel => hotel.owner === owner);
                setName(fil);
            })
            .catch((err) => {
                console.log(err.message);
            });


        // axios.get(`http://localhost:8003/room/${id}`)
        //     .then(res => {
        //         setdata(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8003/room`, data)
            .then(res => {
                toast.success('Room created successfully.');
                navigate(`../addroom`);
            })
    };

    const handleFacilityChange = (selectedFacility) => {
        const facilityObject = facilities.find((facility) => facility.type === selectedFacility);
        
        if (facilityObject) {
            setdata({ ...data, facility: selectedFacility, description: facilityObject.provides });
        } else {
            setdata({ ...data, facility: selectedFacility, description: '' });
        }
    };

    return (
        <div style={{ marginLeft: '240px', padding: '20px' }}>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit} style={{ alignItems: "center", marginTop: "100px" }}>
                    <div className="card" >
                        <div className="card-header bg-dark text-white">
                            <h1>Create Room</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hotel name<span className="errmsg">*</span></label>
                                        <select
                                            className="form-control"
                                            value={data.hotelname}
                                            onChange={(e) => setdata({ ...data, hotelname: e.target.value })}
                                        >
                                            <option>--Select Hotel--</option>
                                            {name.map((item) => (
                                                <option key={item.id} value={item.hotelname}>
                                                    {item.hotelname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hotel facility<span className="errmsg">*</span></label>
                                        <select
                                            className="form-control"
                                            value={data.facility}
                                            onChange={(e) => handleFacilityChange(e.target.value)}
                                        >
                                            <option>--Select Facility--</option>
                                            {facilities.map((facility) => (
                                                <option key={facility.id} value={facility.type}>
                                                    {facility.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <input value={data.description} onChange={(e) => setdata({ ...data, description: e.target.value })} placeholder='Enter description' className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Room Image URL<span className="errmsg">*</span></label>
                                        <input
                                            value={data.roomimage}
                                            onChange={(e) => setdata({ ...data, roomimage: e.target.value })}
                                            placeholder="Enter room image URL"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success">Save</button>
                            <Link to={`../addroom`} className='btn btn-primary'>Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;
