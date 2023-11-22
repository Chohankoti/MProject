import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Star } from '@mui/icons-material';
import axios from 'axios';


function BookRoom() {
  const { owner } = useParams();
  const [id, setid] = useState(1);
  const [data, setData] = useState([]);
  const [facilityprice, setfacilityprice] = useState({});
  const [uniquefacility, setUniquefacility] = useState([]);
  const [checkin, setcheckin] = useState("");
  const [checkout, setcheckout] = useState("");
  const [feedbackdata, setfeedbackdata] = useState("");

  const [booking, setbooking] = useState({
        user: sessionStorage.getItem('username'),
        owner: '',
        hotelname: '',
        facility: '',
        price: 0,
        noofdays: 0,
        checkin: '',
        checkout: ''
  });


  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      navigate('/login');
    }
  }, []); 

  useEffect(() => {

    axios.get(`http://localhost:8003/room`)
    .then(res => {
      const fil = res.data.filter(room => room.hotelname === owner);
      setData(fil);
      console.log("check rooms: ", fil)
      const fac = [...new Set(fil.map((room) => room.facility))];
      setUniquefacility(fac);
    })
    .catch((err) => {
      console.log(err.message);
    });

    axios.get('http://localhost:8003/facility')
    .then(res =>{
      const facilitypriceMap = {};
        res.data.forEach((fac) => {
          facilitypriceMap[fac.type] = fac.price;
        });
        setfacilityprice(facilitypriceMap);
    })
    .catch((err) => {
          console.log(err.message);
    });

    fetch(`http://localhost:8000/feedback`)
      .then((res) => res.json())
      .then((resp) => {
        const fil = resp.filter((feeback) => feeback.owner === owner);
        setfeedbackdata(fil)
      })
      .catch((err) => {
        console.log(err.message);
      });


  }, [id]);


  const handleTypeFilter = (filter) => {
    axios.get(`http://localhost:8003/room`)
    .then(res => {
      if (filter !== '') {
        const fil = res.data.filter(room => room.facility === filter && room.hotelname === owner);
        setData(fil);
      }
      else {
        const fil = res.data.filter(room =>  room.hotelname === owner);
        setData(fil);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  const bookRoom = (item) => {
    
    let numberOfNights = 0;
    if (checkin && checkout) {
      const checkInDateObj = new Date(checkin);
      const checkOutDateObj = new Date(checkout);
  
      if (checkOutDateObj > checkInDateObj) {
        const timeDifference = checkOutDateObj - checkInDateObj;
        numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      }
    }

    let cin = checkin;
    let cout = checkout;
  
    setbooking({
      ...booking,
      owner: item.ownername,
      hotelname: item.hotelname,
      facility: item.facility,
      price: facilityprice[item.facility],
      noofdays: numberOfNights,
      checkin: cin,
      checkout: cout,
    });
   
    console.log("check book",booking)    
  };
  
  useEffect(() => {
    if (booking.owner && booking.hotelname && booking.facility) {
      axios.post('http://localhost:8003/booking', booking)
        .then((res) => {
          toast.success('Processed successfully.');
          setcheckin("");
          setcheckout("");
          navigate("../priceroom/" + booking.noofdays);
        })
        .catch((err) => {
          toast.error('Failed to process the booking: ' + err.message);
        });
    }
  }, [booking]);




  return (
    <div className="box">
      <div className="row">
        <div className="col-md-1" >
          <div className="column" style={{ marginLeft: "10px" }}>
            <h4>Filter by Facility</h4>
            <div>
              <input
                type="radio"
                name="filter"
                id="filter3"
                value="filter3"
                onChange={() => handleTypeFilter("")}
              />
              <label htmlFor="filter3">All</label>
            </div>
            <div>
              {uniquefacility && (
                <>
                  {uniquefacility.map((location) => (
                    <div key={location}>
                      <input
                        type="radio"
                        name="filter"
                        id={`filter-${location}`}
                        value={location}
                        onChange={() => handleTypeFilter(location)}
                      />
                      <label htmlFor={`filter-${location}`}>{location}</label>
                    </div>
                  ))}
                </>
              )}
            </div>       


          </div>
        </div>
        <div className="col-md-1">
          <hr className="vertical-line" />
        </div>
        <div className="col-md-9">
          <div className="card" style={{ margin: "10px" }}>
            <div className="card-body">
              <div className='row'>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Check In<span className="errmsg">*</span></label>
                    <input value={checkin} onChange={e => setcheckin(e.target.value)} placeholder='Enter checkin date' type="date" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Check Out<span className="errmsg">*</span></label>
                    <input value={checkout} onChange={e => setcheckout(e.target.value)} placeholder='Enter checkout date' type="date" className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {data &&
              data.map((item) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12" key={item.id}>
                  <Card className="custom-card">
                    <Card.Img variant="top" src={item.roomimage} alt="Card" />
                    <Card.Body>
                      <Card.Text className="custom-description">{item.description}</Card.Text>
                      <Card.Text className="custom-price">Rs.{facilityprice[item.facility]}</Card.Text>
                      
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" className="btn btn-success" onClick={() => bookRoom(item)}>
                          Book Now
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                
              ))}
          </div>
          <hr style={{ margin: '20px 0' }} />
          <div className="row">
        <div className="col-md-12">
          <div className="box">
            <h4>Feedbacks</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {feedbackdata &&
                feedbackdata.map((item) => (
                  <div key={item.id} style={{ margin: '10px' }}>
                    <div style={{margin:"5px", padding:"0px"}}>
                      <h6>User: {item.user}</h6>
                      <p> {item.feedback}</p>
                      <p>{item.rating}<Star style={{color:"gold"}}/></p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default BookRoom;
