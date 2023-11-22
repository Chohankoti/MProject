import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';


const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

function CumFeedback() {
  const { id } = useParams();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [owner, setOwner] = useState("");
  const [hotelname, sethotelname]=useState("");
  const [feedback, setFeedback] = useState("");
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:8003/booking/'+id)
      .then(res => {
        setOwner(res.data.owner)
        sethotelname(res.data.hotelname)
      })
  }, [id]);
  
  
  

  const FB = () => {
    const regobj = {
      user: sessionStorage.getItem('username'),
      owner: owner,
      hotelname: hotelname,
      rating: currentValue,
      feedback,
    };


      axios.post(`http://localhost:8003/feedback`, regobj)
      .then(res => {
        toast.success('Thank you.');
        navigate("../bookings");
        })
        .catch((err) => {
          toast.error('Failed: ' + err.message);
        });
    
  }

  return (
    <div style={{ ...styles.container, margin: '50px' }}>
      <h2>Your Rating is crucial</h2>
      <div style={styles.stars}>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={feedback} // Fixed this line
        onChange={(e) => setFeedback(e.target.value)} // Fixed this line
      />
      <button className='btn btn-primary' onClick={() => FB()}>Submit</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  textarea: {
    border: '1px solid #a9a9a9',
    borderRadius: 5,
    padding: 10,
    margin: '20px 0',
    minHeight: 100,
    width: 300,
  },
  button: {
    border: '1px solid #a9a9a9',
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default CumFeedback;
