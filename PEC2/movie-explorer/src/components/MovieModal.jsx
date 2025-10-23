import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../config";
import "../styles/MovieModal.css";

function MovieModal({ movieId, onClose }) {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);

    // Cargar detalles y reparto al abrir
    useEffect(() => {
        const fetchDetails = async () => {
            const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`);
            const data = await res.json();
            setMovie(data);

            const creditsRes = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`);
            const creditsData = await creditsRes.json();
            setCast(creditsData.cast.slice(0, 5)); // los 5 primeros actores
        };

        fetchDetails();
    }, [movieId]);

    if (!movie) return null;

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=Sin+Imagen";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>

                <div className="modal-body">
                    <img src={imageUrl} alt={movie.title} className="modal-poster" />

                    <div className="modal-info">
                        <h2>{movie.title}</h2>
                        <p className="year">📅 {movie.release_date?.slice(0, 4)}</p>
                        <p className="overview">{movie.overview || "Sin descripción disponible."}</p>

                        <h4>🎭 Reparto principal:</h4>
                        <ul className="cast-list">
                            {cast.map((actor) => (
                                <li key={actor.id}>{actor.name} como {actor.character}</li>
                            ))}
                        </ul>
                        <p>Duración: {movie.runtime} min</p>
                        <p>⭐ Valoración: {movie.vote_average}</p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
