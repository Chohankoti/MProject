import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function ViewBooking() {
  const [data, setData] = useState([]);
  let username = sessionStorage.getItem('username');
  
  const LoadRemove = (id) => {
    if (window.confirm('Do you want to remove this facility?')) {
      fetch(`http://localhost:8000/booking/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          toast.success('booking deleted successfully.');
          window.location.reload();
        })
        .catch((err) => {
          toast.error('Failed to delete room: ' + err.message);
        });
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/booking")
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
    <div style={{ marginLeft: '230px', padding: '20px' }}>
       <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Booking List</h2>
        </div>
        <div className='card-body'>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Hotel name</th>
                <th>Facility</th>
                <th>Check-in -&gt; Check-out</th>
                <th>Total price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.user}</td>
                    <td>{item.hotelName}</td>
                    <td>{item.facility}</td>
                    <td>{item.checkin} -&gt; {item.checkout}</td>
                    <td>{item.price * item.noofdays}</td>
                    <td>
                      <a onClick={() => { LoadRemove(item.id) }} className="btn btn-danger">Remove</a>
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

export default ViewBooking;
