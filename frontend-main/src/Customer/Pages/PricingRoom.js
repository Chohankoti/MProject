import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PricingRoom() {
    const { uid } = useParams()
    let username = sessionStorage.getItem('username');
    const [hotelName, sethotetName] = useState("")
    const [facility, setfacility] = useState("")
    const [price, setprice] = useState("")
    const [noofdays, setnoofdays] = useState("")
    const [data, setdata] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8003/booking`)
            .then(res => {
                const uidNumber = parseFloat(uid);
                const fil = res.data.filter(booking => booking.user === username && booking.noofdays === uidNumber);
                sethotetName(fil[0].hotelname)
                setfacility(fil[0].facility)
                setprice(fil[0].price)
                setnoofdays(fil[0].noofdays)
                setprice(fil[0].price)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
  
    const handleApprove = (orderID) => {
      setPaidFor(true);
    };
  
    if (paidFor) {
        toast.success('Thank you for your purchase');
        navigate('..')
    }
  
    if (error) {
      alert("An error occurred. Please check.");
    }




    return (
        <div style={{ margin: "30px" }}>
            <div className="offset-lg-3 col-lg-6" >
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h1>Payment</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{username}</td>
                                </tr>
                                <tr>
                                    <td>hotel name</td>
                                    <td>{hotelName}</td>
                                </tr>
                                <tr>
                                    <td>Facility</td>
                                    <td>{facility}</td>
                                </tr>
                                <tr>
                                    <td>days want to stay</td>
                                    <td>{noofdays}</td> {/* Corrected the display */}
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{price}</td>
                                </tr>
                                <tr>
                                    <td>Total price</td>
                                    <td>{noofdays * price}</td>
                                </tr>
                                <tr>
                                    <td>Payment Options</td>
                                    <td>
                                        <PayPalScriptProvider
                                            options={{
                                                "client-id":
                                                    "AVoPCi_6YGWPXvQ_1jAP0vHyC-Pi5MwBvpX6shyHulnCyzIOVAqGEIrjrxLADGSSXzbo2iQdn0uEfPcu"
                                            }}
                                        >
                                            <div>
                                                <PayPalButtons
                                                    style={{
                                                        color: "silver",
                                                        layout: "horizontal",
                                                        height: 40,
                                                        tagline: false,
                                                        shape: "pill"
                                                    }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    description: facility,
                                                                    amount: {
                                                                        value: noofdays * price
                                                                    }
                                                                }
                                                            ]
                                                        });
                                                    }}
                                                    onCancel={() => {
                                                        // Handle cancel action here
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                        const order = await actions.order.capture();
                                                        handleApprove(data.orderID);
                                                    }}
                                                    onError={(err) => {
                                                        setError(err);
                                                        console.log("PayPal checkout error", err);
                                                    }}
                                                />
                                            </div>
                                        </PayPalScriptProvider>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="card-footer" style={{ textAlign: "center" }}>
                        <Link to={`../bookroom/${hotelName}`} className='btn btn-primary'>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingRoom