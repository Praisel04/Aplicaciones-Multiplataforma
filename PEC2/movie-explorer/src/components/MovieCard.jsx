import React from "react";
import { useMovies } from "../context/MovieContext";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useMovies();
  const fav = isFavorite(movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sin+Imagen";

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={imageUrl} alt={movie.title} />
        <button
          className={`fav-btn ${fav ? "active" : ""}`}
          onClick={() => toggleFavorite(movie)}
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
    </div>
  );
}

export default MovieCard;
