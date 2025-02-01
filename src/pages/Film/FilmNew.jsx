import React, { useState, useEffect } from 'react';
import '../../css/filmNew.css'; // Assuming you have a custom CSS file for additional styles
import { API_URL } from '../../config/constants';
import {useNavigate} from "react-router-dom";

function FilmNew() {
    const [title, setTitle] = useState('');
    const [genre, setGenres] = useState([]); // Liste des genres
    const [selectedGenre, setSelectedGenre] = useState(''); // Genre sélectionné
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null); // Fichier pour l'affiche
    const [ageMini, setAgeMini] = useState('');
    const [label, setLabel] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres();
    }, []);

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
                setGenres(data.member || []); // Assurez-vous que `data.member` est un tableau
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });
    };
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Stocker le fichier sélectionné
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Créer un FormData pour envoyer les données
        const formData = new FormData();
        formData.append('titre', title);
        formData.append('genre', selectedGenre);
        formData.append('synopsis', description);
        if (imageFile) {
            formData.append('afficheUrl', imageFile); // Ajouter le fichier
        }
        formData.append('age_mini', ageMini);
        formData.append('label', label);


        // Envoyer les données via fetch
        fetch(API_URL + '/films', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Pas de 'Content-Type', car FormData le définit automatiquement
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // On affiche une alerte ou on redirige l'utilisateur
                alert('Film ajouté avec succès !');
                navigate('/');
                // Réinitialiser le formulaire ou rediriger l'utilisateur
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)} // Stocke l'id sélectionné
                                required
                            >
                                <option value="">Choisir un genre</option>
                                {genre.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.libelle}
                                    </option>
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
                            <label htmlFor="imageFile" className="form-label">Affiche du film</label>
                            <input
                                type="file"
                                className="form-control"
                                id="imageFile"
                                onChange={handleFileChange} // Gestion du fichier
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
