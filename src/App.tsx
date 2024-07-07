import React, { useState } from 'react'; // Ensure useState is imported
import './App.css';
import Header from './components/header/Header';
import ErrorBoundary from './components/appointments/ErrorBoundary';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LandingPage from './components/landingPage/LandingPage'; // Ensure LandingPage is imported
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [showAppForm, setShowAppForm] = useState(false);

    return (
        <Router>
            <ErrorBoundary>
                <div>
                    <Header toggleAppointmentForm={() => setShowAppForm(!showAppForm)} showAppForm={showAppForm} />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Home showAppForm={showAppForm} setShowAppForm={setShowAppForm} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
