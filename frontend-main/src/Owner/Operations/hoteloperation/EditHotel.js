import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function EditHotel() {
    const owner = sessionStorage.getItem('username');
    const status = false
    const {id} = useParams()
    const [data, setdata] = useState({})
    
    const navigate = useNavigate();

    // const IsValidate = () => {
    //     let isproceed = true;
    //     let errormessage = 'Please enter the value in ';
    //     if (name === null || name === '') {
    //         isproceed = false;
    //         errormessage += ' hotel name';
    //     }
    //     if (room === null || room === '') {
    //         isproceed = false;
    //         errormessage += ' room';
    //     }
    //     if (location === null || location === '') {
    //         isproceed = false;
    //         errormessage += ' location';
    //     }
    //     return isproceed;
    // };

    useEffect(() => {

    axios.get(`http://localhost:8003/hotels/${id}`)
    .then(res => {
      setdata(res.data);
      console.log("check hotel: ",data)
    })
    .catch((err) => {
      console.log(err.message);
    });

      }, []); 


    const handlesubmit = (e) => {
        e.preventDefault();

        // if (IsValidate()) 
        {
            console.log("check after submit ",data)
            axios.put(`http://localhost:8003/hotels/${id}`, data)
            .then(res =>{
                toast.success('Hotel edited successfully.')
                navigate(`../addhotel`);
            })
            
        }
    };


    return (
        <div style={{ marginLeft: '240px', padding: '20px' }}>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit} style={{ alignItems: "center", marginTop: "100px" }}>
                    <div className="card" >
                        <div className="card-header bg-dark text-white">
                            <h1>Edit Hotel</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hotel name<span className="errmsg">*</span></label>
                                        <input value={data.hotelname} onChange={(e) => setdata({ ...data, hotelname: e.target.value })}  placeholder='Enter hotel name' className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Location <span className="errmsg">*</span></label>
                                        <select value={data.location} onChange={(e) => setdata({ ...data, location: e.target.value })} className="form-control">
                                                <option value="">--Select the State--</option>
                                                <option value="AP">AP</option>
                                                <option value="TS">TS</option>
                                                <option value="MP">MP</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description <span className="errmsg">*</span></label>
                                        <input value={data.description} onChange={(e) => setdata({ ...data, description: e.target.value })} placeholder='Enter location' className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Image<span className="errmsg">*</span></label>
                                        <input value={data.hotelimage} onChange={(e) => setdata({ ...data, hotelimage: e.target.value })} placeholder='Enter location' className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <Link to={`../addhotel`}  className='btn btn-primary'>Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditHotel