import React from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface HeaderProps {
    toggleAppointmentForm: () => void;
    showAppForm: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleAppointmentForm, showAppForm }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username || '';
    const role = user.role || '';
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };
    const welcomeMessage = role === 'doctor' ? `Hi, welcome to Doctor's dashboard ${username}` : `Hi, welcome to Patient's profile ${username}`;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Medical Appointment System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/home">Appointments</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {token && <div className="welcome-message">{welcomeMessage}</div>}
        </Navbar>
    );
};

export default Header;
