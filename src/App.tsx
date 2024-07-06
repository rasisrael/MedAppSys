import React from 'react';
import './App.css';
import Header from './components/header/header';
import ErrorBoundary from '../src/components/appointments/ErrorBoundary';

import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <ErrorBoundary>

        <div>
            <Header />
            <Home />
        </div>
        </ErrorBoundary>

    );
}

export default App;
