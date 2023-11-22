import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Addroom() {

  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  let username = sessionStorage.getItem('username');
  
  const LoadDetail = (id) => {
    // navigate("/ownerdetail/"+id)
  }

  const LoadRemove = (id, name) => {
    if (window.confirm('Do you want to remove this room?')) {
      
      axios.delete(`http://localhost:8003/room/${id}`)
      .then(res =>{
        toast.success('Room deleted successfully.');
        window.location.reload();
      })
    }
  }


  const LoadEdit = (id) => {
    console.log("check id from manage room", id)
    navigate(`../editroom/${id}`);
  }

  useEffect(() => {

    axios.get(`http://localhost:8003/room`)
    .then(res => {
      const fil = res.data.filter(room => room.ownername === username);
      setdata(fil);
    })
    .catch((err) => {
      console.log(err.message);
    });

  }, [username]); // Add 'username' as a dependency

  return (
    <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
      <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Rooms List</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to='../createroom' className='btn btn-success'>Add (+)</Link> 
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>ID</th>
                <th>Hotel Name</th>
                <th>Facility</th>
                <th>Room Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.hotelname}</td>
                    <td>{item.facility}</td>
                    <td><img src={item.roomimage} alt="Hotel" width="100" /></td>
                    <td>
                      <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                      <a onClick={() => { LoadRemove(item.id, item.name) }} className="btn btn-danger">Remove</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
