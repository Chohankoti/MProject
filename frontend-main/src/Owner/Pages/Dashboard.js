import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto'

function Dashboard() {
 
  const [data, setdata] = useState([])
  const [averageRatings, setAverageRatings] = useState({});

  let username = sessionStorage.getItem('username');


  useEffect(() => {

    fetch("http://localhost:8000/booking")
      .then((res) => res.json())
      .then((resp) => {
        const fil = resp.filter((hotel) => hotel.owner === username);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; 
        const filteredData = fil.filter((booking) => {
          if (booking.checkin) {
            const checkinDate = new Date(booking.checkin);
            return checkinDate.getMonth() === currentMonth - 1; 
          }
          return false; 
        });

        setdata(filteredData);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch("http://localhost:8000/feedback")
      .then((res) => res.json())
      .then((resp) => {
        // Calculate average ratings by owner
        const ownerRatings = {};
        resp.forEach((feedback) => {
          const hotel = feedback.hotelName;
          const rating = feedback.rating;

          if (ownerRatings[hotel]) {
            ownerRatings[hotel].push(rating);
          } else {
            ownerRatings[hotel] = [rating];
          }
        });

        const averageRatings = {};
        for (const hotel in ownerRatings) {
          const ratings = ownerRatings[hotel];
          const averageRating =
            ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
          averageRatings[hotel] = averageRating;
        }

        setAverageRatings(averageRatings);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const checkInDates = {};
  data.forEach(booking => {
    if (booking.checkin) {
      const date = booking.checkin;
      if (checkInDates[date]) {
        checkInDates[date]++;
      } else {
        checkInDates[date] = 1;
      }
    }
  });

  // Extract the dates and counts
  const dates = Object.keys(checkInDates);
  const counts = Object.values(checkInDates);

  const chartDataBooking = {
    labels: dates,
    datasets: [
      {
        label: 'Monthly Bookings',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: counts,
      },
    ],
  };

  const chartOptionsBooking = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Bookings',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };


  const owners = Object.keys(averageRatings);
  const ratings = Object.values(averageRatings);

  const chartDataRating = {
    labels: owners,
    datasets: [
      {
        label: 'Average Rating',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: ratings,
      },
    ],
  };

  const chartOptionsRating = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hotels',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Rating',
        },
      },
    },
  };
  
  return (
    <div style={{ marginLeft: '240px', padding: '20px' }}>
  <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '700px', height: '400px', margin: '10px' }}>
      <h2 style={{textAlign:"center"}}>Monthly Bookings</h2>
      <Bar data={chartDataBooking} options={chartOptionsBooking} />
    </div>
    <div style={{ width: '700px', height: '400px', margin: '10px' }}>
      <h2 style={{textAlign:"center"}}>Average Rating for each Hotel</h2>
      <Bar data={chartDataRating} options={chartOptionsRating} />
    </div>
  </div>
</div>

  );
}

export default Dashboard;
