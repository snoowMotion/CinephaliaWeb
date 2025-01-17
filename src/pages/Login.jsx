import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import  { API_URL } from '../config/constants';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ajaxLogin(email, password, navigate);
    };

    const navigateToSubscribe = () => {
        navigate('/subscribe');
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className="alert alert-danger py-2" id="badPassword" hidden>Email ou mot de passe incorrect</p>
                <a href="#" className="forgot-password py-2">Mot de passe oublié ?</a>
                <a href="#" className="forgot-password py-2" onClick={navigateToSubscribe}>Créer un compte</a>
                <button type="submit" className="btn-log btn-primary" onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    );
}

function ajaxLogin(email, password,navigate) {
    // Code to send the login request
    fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(response => response.json())
        .then(data => handleJwtToken(data, navigate))
        .catch(error => badPass());

}

function handleJwtToken(data, navigate) {
    localStorage.setItem('token', data.token);
    navigate("/")
}

function badPass() {
    document.getElementById("badPassword").removeAttribute("hidden");
}

export default Login;