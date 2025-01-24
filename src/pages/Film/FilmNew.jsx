import React, { useState, useEffect } from 'react';
import '../../css/filmNew.css'; // Assuming you have a custom CSS file for additional styles
import  { API_URL } from '../../config/constants';

function FilmNew() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState([]);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ageMini, setAgeMini] = useState('');
    const [label, setLabel] = useState(false);

    useEffect(() => {
        fetchGenres();
    },[]);

    const fetchGenres = () => {
        fetch(API_URL + '/genres', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.member);
                setGenre(data.member);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Ajouter un film</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genre" className="form-label">Genre</label>
                            <select
                                className="form-select"
                                id="genre"
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            >
                                <option value="">Choisir un genre</option>
                                {genre.map((g, index) => (
                                    <option key={index} value={g.id}>{g.libelle}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ageMini" className="form-label">Age minimum</label>
                            <input
                                type="number"
                                className="form-control"
                                id="ageMini"
                                value={ageMini}
                                onChange={(e) => setAgeMini(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="label"
                                checked={label}
                                onChange={(e) => setLabel(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="label">Label</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default FilmNew;