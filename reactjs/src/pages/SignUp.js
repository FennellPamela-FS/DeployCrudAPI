import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

import AuthService from '../services/auth.service';

function SignUp() {
    // capture email
    const [email, setEmail] = useState("");

    // capture password
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // function to handle signup
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await AuthService.signup(email, password).then(
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
                <h1>Students Sign Up page </h1>
                <Link to="/dashboard">Dashboard</Link>
                <section>
                    <form onSubmit={handleSignUp}>
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
                            Sign Up
                        </button>
                    </form>
                </section>
            </header>
        </div>
    );
}

export default SignUp;
