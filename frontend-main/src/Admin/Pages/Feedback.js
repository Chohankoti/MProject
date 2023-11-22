import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";

function Feedback() {

  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  

  const LoadRemove=(id)=>{
    if(window.confirm('Do you want to remove?'))
    {
      fetch("http://localhost:8000/feedback/"+id, {
        method: "DELETE",
    }).then((res) => {
        toast.success('DELETED successfully.');
        window.location.reload();
    }).catch((err) => {
        toast.error('Failed :' + err.message);

    });
    }

  }


  useEffect(() => {
    fetch("http://localhost:8000/feedback")
      .then((res) => res.json())
      .then((resp) => {
        setdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div style={{ marginLeft: '230px', padding: '20px' }} className="container">
      <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Feedback List</h2>
        </div>
        <div className='card-body'>
        <div className='divbtn'>
        <CSVLink
              data={data.map((item) => ({
                Id:item.id,
                user: item.user,
                Given_for_hotel: item.hotelName,
                hotel_owner: item.owner,
                rating: item.rating,
                feedback: item.feedback
              }))}
              filename={"feedback.csv"}
              className='btn btn-primary'
            >
              Download CSV
            </CSVLink>
            </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>ID</th>
                <th>user</th>
                <th>hotel</th>
                <th>Owner</th>
                <th>rating</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data &&
                data.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.user}</td>
                    <td>{item.hotelName}</td>
                    <td>{item.owner}</td>
                    <td>{item.rating}</td>
                    <td>{item.feedback}</td>
                    <td> 
                      <a onClick={()=>{LoadRemove(item.id)}} className="btn btn-danger">Remove</a> 
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

export default Feedback;
