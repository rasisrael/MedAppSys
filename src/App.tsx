import React from 'react';
import './App.css';
import Header from './components/header/header';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
}

export default App;
