import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";

function ViewFeedback() {
  const [data, setData] = useState([]);
  let username = sessionStorage.getItem('username');
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:8000/feedback")
      .then((res) => res.json())
      .then((resp) => {
        const fil = resp.filter((feedback) => feedback.owner === username);
        setData(fil);
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
                <th>User</th>
                <th>Hotel</th>
                <th>Rating</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user}</td>
                  <td>{item.hotelName}</td>
                  <td>{item.rating}</td>
                  <td>{item.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedback;
