import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { API_URL } from '../config/constants';
function Subscribe() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setName] = useState('');
    const [prenom, setSubname] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ajaxSubscribe(email, password, nom, prenom);
    };
    return (
        <div className="login-container">
            <h2>Inscription</h2>
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
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        className="form-control"
                        value={nom}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        className="form-control"
                        value={prenom}
                        onChange={(e) => setSubname(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="confirm">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirm"
                        className="form-control"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                </div>
                <p className="alert alert-danger py-2" id="badPassword" hidden>Les mots de passe ne correspondent pas</p>
                <button type="submit" className="btn-log btn-primary" onClick={handleSubmit}>S'inscrire</button>
            </form>
        </div>
    )

}

function ajaxSubscribe(email, password, nom, prenom) {
    // Code to send the login request
    fetch(API_URL + '/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, nom, prenom })
    })
        .then(response => response.json())
        .then(alert("création de compte réussie"))
        .catch(alert("erreur lors de la création de compte"));

}
export default Subscribe;