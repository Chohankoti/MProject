import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink} from "react-csv";
import axios from 'axios';

function FacilityList() {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  const LoadRemove = (id) => {
    if (window.confirm('Do you want to remove this facility?')) {

      axios.delete(`http://localhost:8003/facility/${id}`)
      .then(res =>{
        toast.success('Facility deleted successfully.');
        window.location.reload();
      })

    }
  };

  const LoadEdit = (id) => {
    navigate("/facilityedit/" + id);
  };

  useEffect(() => {

    axios.get('http://localhost:8003/facility')
    .then(res =>{
      console.log("check axios",res)
      setFacilities(res.data)
    })
    .catch((err) => {
          console.log(err.message);
        });
  }, []); 

  return (
    <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h2>Facility List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to={`/facilitycreate`} className="btn btn-success">
              Add (+)
            </Link> ||  <CSVLink
              data={facilities.map((item) => ({
                Facility_name: item.id,
                Type: item.type,
                Description: item.provides,
                Price: item.price,
              }))}
              filename={"facility.csv"}
              className='btn btn-primary'
            >
              Download CSV
            </CSVLink>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price (per 6 hours)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {facilities &&
                facilities.map((item) => (
                  <tr >
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.provides}</td>
                    <td>{item.price}</td>
                    <td>
                      <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">
                        Edit
                      </a>
                      <a onClick={() => { LoadRemove(item.id) }} className="btn btn-danger">
                        Remove
                      </a>
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

export default FacilityList;
