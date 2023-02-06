import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

import AuthService from '../services/auth.service';

function Login() {
    // capture email
    const [email, setEmail] = useState("");

    // capture password
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // function to handle signup
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await AuthService.login(email, password).then(
                response => {
                    navigate("/dashboard")
                },
                error => { console.log(error) }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Students Login page </h1>
                <Link to="/dashboard">Dashboard</Link>
                <section>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>
                </section>
            </header>
        </div>
    );
}

export default Login;
