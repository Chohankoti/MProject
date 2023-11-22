import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import axios from 'axios';

function Managecustomer() {
  const [empdata, setEmpdata] = useState([]);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/customerdetail/" + id)

  }

  const LoadRemove = (id) => {
    if (window.confirm('Do you want to remove?')) {

      axios.delete(`http://localhost:8003/users/${id}`)
      .then(res =>{
        toast.success('Customer deleted successfully.');
        window.location.reload();
      })


      // fetch("http://localhost:8000/user/" + id, {
      //   method: "DELETE",
      // }).then((res) => {
      //   toast.success('DELETED successfully.');
      //   window.location.reload();
      // }).catch((err) => {
      //   toast.error('Failed :' + err.message);

      // });
    }

  }

  const LoadEdit = (id) => {

    navigate("/customeredit/" + id)

  }


  useEffect(() => {

    axios.get('http://localhost:8003/users')
    .then(res =>{
      const filteredFacilities = res.data.filter(facility => facility.role === "customer");
      setEmpdata(filteredFacilities)
    })
  }, []);

  return (
    <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
      <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Customer List</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to='/customercreate' className='btn btn-success'>Add (+)</Link> ||  <CSVLink
              data={empdata.map((item) => ({
                ID: item.id,
                Name: item.username,
                FirstName: item.firstname,
                LastName: item.lastname,
                Email: item.email,
                Phone: item.phone,
                Gender: item.gender,
                DateOfBirth: item.dob
              }))}
              filename={"customer.csv"}
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
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                      <a onClick={() => { LoadRemove(item.id) }} className="btn btn-danger">Remove</a>
                      <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
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

export default Managecustomer