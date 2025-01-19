import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { faker } from '@faker-js/faker';


function FilmList()
{
    const movies = [];
    for(let i = 0; i < 10; i++)
    {
        movies.push({
            title: faker.book.title(),
            genre: faker.book.genre(),
        });
    }


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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
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