import React from 'react';
import './App.css';
import Header from './components/header/header';
import ErrorBoundary from './components/appointments/ErrorBoundary';
import Home from './components/home/home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <Router>
            <ErrorBoundary>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                </div>
            </ErrorBoundary>
        </Router>
    );
}
export default App;