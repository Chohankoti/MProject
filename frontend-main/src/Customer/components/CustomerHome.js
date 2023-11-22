import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const OwnerHome = () => {

    let username
    const navigate = useNavigate();
    useEffect(() => {
        username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login');
        }
    }, []);

    // Function to handle the filter


    return (
        <div>
            <Navbar collapseOnSelect expand="lg"  data-bs-theme="dark" className="bg-pink">
                <Container>
                    <Navbar.Brand as={Link} to="">Hotel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="">Home</Nav.Link>
                            <Nav.Link as={Link} to="profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="bookings">Booking</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/login">LogOut</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
}

export default OwnerHome;
