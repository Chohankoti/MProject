import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Bookings() {
    let username = sessionStorage.getItem('username');
    const [book, setbook] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8003/booking')
        .then(res => {
          const fil = res.data.filter(booking => booking.user === username);
          setbook(fil);
          console.log("check feedback filter data",book)
        })
    }, [username]);


    const LoadFeed = (id) => {
        navigate("../feedback/" + id)
    }

    const LoadRemove = (id) => {
        if (window.confirm('Do you want to remove this booking?')) {
    
          axios.delete(`http://localhost:8003/booking/${id}`)
          .then(res =>{
            toast.success('booking deleted successfully.');
            window.location.reload();
          })
    
        }
      };

    return (
        <div className='container' style={{marginTop:"25px"}}>
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h1>Booking Detail</h1>
                </div>
                <div className="card-body">
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>Hotel name</th>
                                <th>Facility</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {book &&
                                book.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.hotelname}</td>
                                        <td>{item.facility} Room</td>
                                        <td>{item.noofdays * item.price}</td>
                                        <td>
                                            <a onClick={() => { LoadFeed(item.id) }} className="btn btn-primary">Feedback</a>
                                            <a onClick={() => { LoadRemove(item.id) }} className="btn btn-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
                <div className="card-footer" style={{ textAlign: "center" }}>
                    <Link to='/customer' className='btn btn-primary'>Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Bookings;
