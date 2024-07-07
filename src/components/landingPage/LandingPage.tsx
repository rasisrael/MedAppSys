import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './landingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1>Welcome to the Medical Appointment System</h1>
                        <p>
                            Schedule your medical appointments with ease. Whether you're a patient or a doctor,
                            our system simplifies the appointment process for you.
                        </p>
                        <Link to="/register">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                        <Link to="/login" className="ms-2">
                            <Button variant="outline-primary">Login</Button>
                        </Link>
                    </Col>
                    <Col md={6}>
                        <img src="../../../public/images/home_image.jpg" alt="Doctor with patient" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
