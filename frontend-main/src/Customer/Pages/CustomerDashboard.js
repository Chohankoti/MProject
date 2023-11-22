import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function CustomerDashboard() {
  const [data, setData] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("bookroom/" + id);
  };

  useEffect(() => {
    axios.get("http://localhost:8003/hotels").then((res) => {
      const fil = res.data.filter((hotel) => hotel.status === true);
      setData(fil);
      const locations = [...new Set(fil.map((hotel) => hotel.location))];
      setUniqueLocations(locations);
    });
  }, []);

  const calculateAverageRatings = () => {
    axios.get("http://localhost:8003/feedback").then((res) => {
      const ratings = {};

      res.data.forEach((feedback) => {
        const hotelName = feedback.hotelname; // Use 'hotelname'
        const rating = parseInt(feedback.rating); // Convert 'rating' to an integer

        if (!isNaN(rating)) {
          if (!ratings[hotelName]) {
            ratings[hotelName] = {
              totalRating: rating,
              count: 1,
            };
          } else {
            ratings[hotelName].totalRating += rating;
            ratings[hotelName].count++;
          }
        }
      });

      const avgRatings = {};

      for (const hotelName in ratings) {
        const { totalRating, count } = ratings[hotelName];
        avgRatings[hotelName] = totalRating / count;
      }

      setAverageRatings(avgRatings);
    });
  };

  useEffect(() => {
    calculateAverageRatings();
  }, []);

  const handleLocationFilter = (filter) => {
    axios.get("http://localhost:8003/hotels").then((res) => {
      if (filter !== "") {
        const fil = res.data.filter(
          (hotel) => hotel.status === true && hotel.location === filter
        );
        setData(fil);
      } else {
        const fil = res.data.filter((hotel) => hotel.status === true);
        setData(fil);
      }
    });
  };

  const handleSortByRating = () => {
    const sortedData = [...data];
    if (sortOrder === "asc") {
      sortedData.sort((a, b) =>
        (averageRatings[a.hotelname] || 0) - (averageRatings[b.hotelname] || 0)
      );
      setSortOrder("desc");
    } else {
      sortedData.sort((a, b) =>
        (averageRatings[b.hotelname] || 0) - (averageRatings[a.hotelname] || 0)
      );
      setSortOrder("asc");
    }
    setData(sortedData);
  };

  return (
    <div className="box">
      <div className="row">
        <div className="col-md-1">
          <div className="column" style={{ marginLeft: "10px" }}>
            <h4>Filter by Location</h4>
            <div>
              <input
                type="radio"
                name="filter"
                id="filter3"
                value="filter3"
                onChange={() => handleLocationFilter("")}
              />
              <label htmlFor="filter3">All</label>
            </div>
            <div>
              {uniqueLocations && (
                <>
                  {uniqueLocations.map((location) => (
                    <div key={location}>
                      <input
                        type="radio"
                        name="filter"
                        id={`filter-${location}`}
                        value={location}
                        onChange={() => handleLocationFilter(location)}
                      />
                      <label htmlFor={`filter-${location}`}>{location}</label>
                    </div>
                  ))}
                </>
              )}
            </div>
            <br></br>
            <h4>Sort by Rating</h4>
            <div className="column">
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-secondary"
                  className="mr-2"
                  onClick={handleSortByRating}
                >
                  {sortOrder === "asc"
                    ? "Sort by Rating (Low to High)"
                    : "Sort by Rating (High to Low"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1">
          <hr className="vertical-line" />
        </div>
        <div className="col-md-9">
          <div className="row">
            {data &&
              data.map((item) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                  key={item.id}
                >
                  <Card className="custom-card">
                    <Card.Img variant="top" src={item.hotelimage} alt="Card" />
                    <Card.Body>
                      <Card.Text className="custom-heading">
                        {item.hotelname}
                      </Card.Text>
                      <Card.Text className="custom-description">
                        {item.description}
                      </Card.Text>
                      <div className="rating">
                        Avg Rating: {averageRatings[item.hotelname] ? averageRatings[item.hotelname].toFixed(1) : "N/A"}
                      </div>


                      <div className="d-flex justify-content-center" style={{ marginTop: "5px" }}>
                        <Button
                          variant="primary"
                          className="btn btn-success"
                          onClick={() => LoadDetail(item.hotelname)}
                        >
                          Book Rooms
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
