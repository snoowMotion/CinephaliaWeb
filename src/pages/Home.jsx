import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../css/login.css';
//import  { API_URL } from '../config/constants';
import FilmCard from "../Components/FilmCard";
import '../css/home.css';
import { faker } from '@faker-js/faker';
function Home()
{
    const movies = [];
    for(let i = 0; i < 10; i++)
    {
        movies.push({
            title: faker.book.title(),
            imageUrl: faker.image.urlPicsumPhotos({ blur: 1, height: 150, width: 300 })
        });
    }

    return (
        <div className="film-card-container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Nouveautés</h2>
                </div>
            </div>
            <div className="row">
                {movies.map((movie, index) => (
                    <div className="col-2">
                        <FilmCard
                            key={index}
                            title={movie.title}
                            imageUrl={movie.imageUrl}
                        />
                    </div>
                ))}
            </div>


        </div>)
}

export default Home;