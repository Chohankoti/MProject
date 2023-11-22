import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import axios from 'axios';

function AddHotel() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  let username = sessionStorage.getItem('username');
  
  const LoadDetail = (id) => {
    navigate("../ownerdetail/"+id)
  }

  const LoadRemove = (id, name) => {
    if (window.confirm('Do you want to remove this hotel?')) {
      
      axios.delete(`http://localhost:8003/hotels/${id}`)
      .then(res =>{
        toast.success('Hotel deleted successfully.');
        window.location.reload();
      })
      
      
      // fetch(`http://localhost:8000/hotel/${id}`, {
      //   method: 'DELETE',
      // })
      //   .then((res) => {
      //     toast.success('Hotel deleted successfully.');
      //     window.location.reload();
      //   })
      //   .catch((err) => {
      //     toast.error('Failed to delete hotel: ' + err.message);
      //   });
    }
  }


  const LoadEdit = (id) => {
    navigate(`../edithotel/${id}`);
  }

  useEffect(() => {

    axios.get(`http://localhost:8003/hotels`)
    .then(res => {
      const fil = res.data.filter(hotel => hotel.owner === username);
      setdata(fil);
    })
    .catch((err) => {
      console.log(err.message);
    });

  }, [username]); 


  return (
    <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
      <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Hotels List</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to='../createhotel' className='btn btn-success'>Add (+)</Link> ||  <CSVLink
              data={data.map((item) => ({
                Id:item.id,
                owner: item.owner,
                hotel: item.hotelname,
                location: item.location,
                verified_status:item.status  ? "Verified" : "Not verified",                
                description: item.description,
                hotel_image: item.hotelimage
              }))}
              filename={"Hotel_list.csv"}
              className='btn btn-primary'
            >
              Download CSV
            </CSVLink>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Description</th>
                <th>Hotel Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.hotelname}</td>
                    <td>{item.location}</td>
                    <td>{item.status  ? "Verified" : "Not verified"}</td>
                    <td>{item.description}</td>
                    <td><img src={item.hotelimage} alt="Hotel" width="100" /></td>
                    <td>
                      <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                      <a onClick={() => { LoadRemove(item.id, item.name) }} className="btn btn-danger">Remove</a>
                      <a onClick={()=>{LoadDetail(item.id)}} className="btn btn-primary">Details</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddHotel;
