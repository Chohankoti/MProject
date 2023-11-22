import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateFacility() {
  const [facility, setFacility] = useState({
    type: '',
    provides: '',
    price: 0,
  });

  const navigate = useNavigate();

  

  const handlesubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8003/facility', facility)
    .then(res=>{
      toast.success('Facility created successfully.');
        navigate('/addfacility');
    })


    // let facility = {  id, desc, price };
    // fetch("http://localhost:8000/facility", {
    //   method: "POST",
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(facility)
    // }).then((res) => {
    //   toast.success('Facility created successfully.');
    //   navigate('/addfacility');
    // }).catch((err) => {
    //   toast.error('Failed to create facility: ' + err.message);
    // });
  }

  return (
    <div style={{ marginLeft: '240px', padding: '20px' }}>
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={handlesubmit} style={{ alignItems: "center", marginTop: "100px" }}>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h2>Create Facility</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Facility Type:</label>
              <input value={facility.type} onChange={(e) => setFacility({ ...facility, type: e.target.value })} placeholder='Enter facility type' className="form-control"></input>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input value={facility.provides} onChange={(e) => setFacility({ ...facility, provides: e.target.value })} placeholder='Enter description' className="form-control"></input>
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input value={facility.price} onChange={(e) => setFacility({ ...facility, price: e.target.value })} placeholder='Enter price' className="form-control"></input>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-success">Save</button>
            <Link to='/addfacility' className='btn btn-primary'>Back</Link>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default CreateFacility;
