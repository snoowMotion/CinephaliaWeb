import React from 'react';
import '../css/filmCard.css';


function FilmCard({ title, description, imageUrl, releaseDate }) {
    return (
        <div className="film-card">
            <img src={imageUrl} alt={title} className="film-card-image" />
            <div className="film-card-content">
                <h3 className="film-card-title">{title}</h3>
            </div>
        </div>
    );
}

export default FilmCard;