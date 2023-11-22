import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Viewmessage() {
  const [data, setdata] = useState([]);
  let username = sessionStorage.getItem('username');

  const LoadRemove = (id) => {
    if (window.confirm('Do you want to remove this message?')) {

        axios.delete(`http://localhost:8003/adminmessage/${id}`)
        .then(res =>{
          toast.success('Message deleted successfully.');
          window.location.reload();
        })
    }
  }

  useEffect(() => {

    axios.get('http://localhost:8003/adminmessage')
    .then(res =>{
        const fil = res.data.filter((message) => message.recipient === username);
        setdata(fil);
    })

    // fetch('http://localhost:8000/sendmessage')
    //   .then((res) => res.json())
    //   .then((resp) => {
    //     const fil = resp.filter((sendmessage) => sendmessage.recipient === username);
    //     setdata(fil);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [username]);

  return (
    <div style={{ marginLeft: '240px', padding: '20px' }} className="container">
      <div className='card'>
        <div className="card-header bg-dark text-white">
          <h2>Admin Message</h2>
        </div>
        <div className='card-body'>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>ID</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.message}</td>
                  <td>{item.date}</td>
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
  );
}

export default Viewmessage;
