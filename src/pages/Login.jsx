import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ajaxLogin(email, password);
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Se connecter</button>
            </form>
        </div>
    );
}

function ajaxLogin(email, password) {
    // Code to send the login request
    fetch('https://cinephaliaapi-misty-sun-5560.fly.dev/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => handleJwtToken(data))
        .catch(error => badPass());

}

function handleJwtToken(data)
{
    localStorage.setItem('token', data.token);
}

function badPass()
{
    document.getElementById("badPassword").removeAttribute("hidden");
}
export default Login;