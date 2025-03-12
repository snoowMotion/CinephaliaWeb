import React, { useState, useEffect } from 'react';
import '../../css/filmNew.css'; // Assuming you have a custom CSS file for additional styles
import { API_URL, UPLOADS_URL } from '../../config/constants';
import { useNavigate, useParams } from "react-router-dom";

function FilmEdit() {
    const [title, setTitle] = useState('');
    const [genres, setGenres] = useState([]); // Liste des genres
    const [selectedGenre, setSelectedGenre] = useState(''); // Genre sélectionné
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null); // Fichier pour l'affiche
    const [ageMini, setAgeMini] = useState('');
    const [label, setLabel] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchGenres();
        fetchFilm();
    }, []);

    const fetchGenres = () => {
        fetch(`${API_URL}/genres`, {
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

    const fetchFilm = () => {
        fetch(`${API_URL}/films/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setTitle(data.titre);
                setSelectedGenre(data.genre.id);
                setDescription(data.synopsis);
                setAgeMini(data.ageMini);
                setLabel(data.label);
                setImageFile(`${UPLOADS_URL}${data.afficheUrl}`);
            })
            .catch(error => {
                console.error('Error fetching film:', error);
            });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Stocker le fichier sélectionné
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Créer un objet pour envoyer les données
        const filmData = {
            titre: title,
            genre: "api/genres/"  + selectedGenre,
            synopsis: description,
            age_mini: ageMini,
            label: label,
            afficheUrl: imageFile ? imageFile.name : '' // Envoyer seulement le nom du fichier
        };

        // Envoyer les données via fetch
        fetch(`${API_URL}/films/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(filmData)
        })
            .then(response => response.json())
            .then(data => {
                if (imageFile) {
                    // Si le fichier est présent, envoyer le fichier via une autre requête AJAX
                    const formData = new FormData();
                    formData.append('file', imageFile);

                    fetch(`${API_URL}/upload`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        },
                        body: formData
                    })
                        .then(response => response.json())
                        .then(uploadData => {
                            alert('Film modifié avec succès et fichier uploadé !');
                            navigate('/');
                        })
                        .catch(error => {
                            console.error('Error uploading file:', error);
                        });
                } else {
                    alert('Film modifié avec succès !');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Modifier un film</h1>
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
                                {genres.map((g) => (
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
                            />
                        </div>
                        <div className="mb-3">
                            {imageFile && (typeof imageFile === 'string' ? (
                                <img src={imageFile} alt="Affiche du film" className="img-fluid" style={{ width: '200px', height: '200px' }} />
                            ) : (
                                <img src={URL.createObjectURL(imageFile)} alt="Affiche du film" className="img-fluid" style={{ width: '200px', height: '200px' }} />
                            ))}
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
                        <button type="submit" className="btn btn-primary">Modifier</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FilmEdit;