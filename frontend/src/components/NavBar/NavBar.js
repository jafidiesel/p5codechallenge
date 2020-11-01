import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.scss';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-general">
        <Navbar.Brand >p5-codechallenge</Navbar.Brand>
        <Nav className="navbar-buttons">
            <Link className="nav-link" to="/">Passenger list</Link>
            <Link className="nav-link" to="/new-passenger">New Passenger</Link>
            <Link className="nav-link" to="/new-package">New Package</Link>
        </Nav>
    </Navbar>
)

export default NavBar;