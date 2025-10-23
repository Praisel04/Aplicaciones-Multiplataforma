import React, { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error leyendo favoritos del localStorage:", error);
      return [];
    }
  });

  const [toast, setToast] = useState(null); // ✅ nuevo estado para el mensaje

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error guardando favoritos en localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
      showToast(`Eliminado de favoritos 🤍`);
    } else {
      setFavorites([...favorites, movie]);
      showToast(`Añadido a favoritos ❤️`);
    }
  };

  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  // 🔹 Función para mostrar el mensaje durante 2 segundos
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <MovieContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, toast }}
    >
      {children}
      {toast && <Toast message={toast} />} {/* 🔥 muestra el mensaje */}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);

// ✅ Componente interno para el mensaje visual
function Toast({ message }) {
  return <div className="toast">{message}</div>;
}
