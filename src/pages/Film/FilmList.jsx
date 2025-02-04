import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../../css/login.css';
import { faker } from '@faker-js/faker';
import { API_URL } from '../../config/constants';

function FilmList()
{
    const [movies, setMovies] = useState([]);

    useEffect(() =>{
        // Fonction pour récupérer les films
        const fetchMovies = async () => {
            try {
                const response = await fetch(API_URL + '/films', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                const data = await response.json();
                setMovies(data.member || []); // Mettre à jour l'état avec les films
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchMovies();
    }, []); // Le tableau vide signifie que l'effet se déclenche une seule fois après le montage


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary">Ajouter un film</button>
                </div>
            </div>
            <div className="row py-4">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Genre</th>
                                <th>Age mini</th>
                                <th>Label</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.titre}</td>
                                    <td>{movie.genre.libelle}</td>
                                    <td>{movie.ageMini}</td>
                                    <td>{movie.label ? "Oui" : "Non"}</td>
                                    <td>
                                        <button className="btn btn-primary">Modifier</button>
                                        <button className="btn btn-danger ms-2">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FilmList;