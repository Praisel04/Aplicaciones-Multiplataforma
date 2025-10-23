import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { API_KEY, BASE_URL } from "../config";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

const Home = forwardRef((props, ref) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleNotify = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // duración 2s
  };


  // 🔹 Cargar populares y géneros al inicio
  useEffect(() => {
    loadPopularMovies();
    fetchGenres();
  }, []);

  // 🔹 Obtener géneros
  const fetchGenres = async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
      const data = await res.json();
      setGenres(data.genres);
    } catch (err) {
      console.error("Error cargando géneros:", err);
    }
  };

  // 🔹 Función general para cargar películas
  const fetchMovies = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener las películas");
      const data = await response.json();
      setMovies(data.results.slice(0, 18)); // mostramos solo 18
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar populares
  const loadPopularMovies = (page = 1) => {
    setIsSearching(false);
    setCurrentPage(page);
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
    fetchMovies(url);

  };

  // 🔹 Exponer función al App.jsx (para el botón Home)
  useImperativeHandle(ref, () => ({
    loadPopularMovies,
  }));

  // 🔹 Búsqueda avanzada (usa discover o search según los filtros)
  const handleSearch = (e, page = 1) => {
    e?.preventDefault();
    if (!searchQuery.trim() && !year && !genre) return;

    setIsSearching(true);
    setCurrentPage(page);

    let url = "";

    // 🎞️ Caso: solo año
    if (year && !searchQuery.trim() && !genre) {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=${page}&primary_release_year=${year}`;
    }
    // 🎭 Caso: solo género (con o sin año)
    else if (genre && !searchQuery.trim()) {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=${page}&with_genres=${genre}`;
      if (year) url += `&primary_release_year=${year}`;
    }
    // 🎬 Caso: búsqueda por texto
    else {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&page=${page}`;
      if (searchQuery) url += `&query=${encodeURIComponent(searchQuery)}`;
      if (year) url += `&year=${year}`;
      if (genre) url += `&with_genres=${genre}`;
    }

    fetchMovies(url);
  };


  // 🔹 Cambiar página (funcional y sin errores)
  const handlePageChange = (direction) => {
    const nextPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (nextPage < 1 || nextPage > totalPages) return;

    if (isSearching) {
      handleSearch(null, nextPage);
    } else {
      loadPopularMovies(nextPage);
    }
  };

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>🎬 Explorador de Películas</h2>

      {/* Formulario de búsqueda avanzada */}
      <form onSubmit={(e) => handleSearch(e)} style={styles.form}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Buscar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={styles.inputSmall}
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={styles.select}
          >
            <option value="">Todos los géneros</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.searchButton}>
            Buscar
          </button>
        </div>
      </form>
      {showNotification && (
        <div style={styles.toast}>
          {notification}
        </div>
      )}


      {/* Grid o mensaje */}
      {movies.length === 0 ? (
        <div style={styles.noResults}>
          <p>No hay películas que mostrar 😢</p>
          <button style={styles.homeButton} onClick={() => loadPopularMovies()}>
            Volver a inicio
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onNotify={handleNotify} />

          ))}
        </div>
      )}


      {/* Paginación */}
      <div style={styles.pagination}>
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          ⬅️ Anterior
        </button>

        <span style={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
});

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    margin: "1.5rem 0",
  },

  searchContainer: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    backgroundColor: "#1c1c1c",
    padding: "0.8rem 1rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    width: "90%",
    maxWidth: "700px",
    justifyContent: "center",
  },

  input: {
    flex: "1",
    minWidth: "180px",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2b2b2b",
    color: "white",
    fontSize: "1rem",
    outline: "none",
  },

  inputSmall: {
    width: "100px",
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2b2b2b",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center",
  },

  select: {
    width: "150px",
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2b2b2b",
    color: "white",
    fontSize: "1rem",
    outline: "none",
  },

  searchButton: {
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#e50914",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.1s ease",
  },

  searchButtonHover: {
    backgroundColor: "#ff1f25",
    transform: "scale(1.03)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    justifyItems: "center",
    padding: "1rem 0",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    gap: "1rem",
  },
  pageButton: {
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  pageInfo: {
    fontWeight: "bold",
  },
  noResults: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: "1.2rem",
    minHeight: "60vh", // centra verticalmente
  },
  homeButton: {
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#e50914",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.1s ease",
  },
  toast: {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(92, 98, 184, 0.8)",
    color: "rgba(255, 255, 255, 1)",
    padding: "0.8rem 1.5rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    fontWeight: "bold",
    animation: "fadeInOut 2s ease",
    zIndex: 1000,
  },


};

export default Home;
