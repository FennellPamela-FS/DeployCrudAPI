import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Series Home Page</h1>
                <Link to="/dashboard">Dashboard</Link>
            </header>
        </div>
    )
}

export default Home