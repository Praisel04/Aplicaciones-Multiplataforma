import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieModal from "./MovieModal";
import "../styles/MovieCard.css";

function MovieCard({ movie, onNotify }) {
  const { toggleFavorite, isFavorite } = useMovies();
  const [showModal, setShowModal] = useState(false);
  const fav = isFavorite(movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sin+Imagen";

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // evita abrir el modal al hacer clic en el corazón
    toggleFavorite(movie);
    if (onNotify) {
      if (!fav) onNotify("Película añadida a favoritos ❤️");
      else onNotify("Película eliminada de favoritos ❌");
    }
  };

  return (
    <>
      <div className="movie-card" onClick={() => setShowModal(true)}>
        <img src={imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.slice(0, 4)}</p>

        <button
          className={`fav-btn ${fav ? "active" : ""}`}
          onClick={handleFavoriteClick}
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>

      {showModal && (
        <MovieModal movieId={movie.id} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default MovieCard;
