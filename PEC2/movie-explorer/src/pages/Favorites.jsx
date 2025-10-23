import React from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favorites } = useMovies();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <h2 style={styles.title}>❤️ Mis Películas Favoritas</h2>

        {favorites.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyText}>Aún no tienes películas en favoritos.</p>
            <button onClick={handleGoHome} style={styles.button}>
              🔍 Explorar películas
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // 🎨 Fondo con gradiente cinematográfico
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #141e30 0%, #0f0f0f 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "2rem",
    paddingBottom: "3rem",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04), transparent 70%)",
    zIndex: 0,
  },

  container: {
    position: "relative",
    zIndex: 1,
    width: "90%",
    maxWidth: "1200px",
    textAlign: "center",
  },

  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#ff3b3b",
    textShadow: "0 0 10px rgba(255, 0, 0, 0.3)",
    letterSpacing: "1px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    justifyItems: "center",
    padding: "1rem 0",
  },

  emptyBox: {
    backgroundColor: "rgba(28, 28, 28, 0.8)",
    borderRadius: "15px",
    padding: "2rem 2.5rem",
    width: "fit-content",
    margin: "4rem auto",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(6px)",
    animation: "fadeIn 0.6s ease forwards",
  },

  emptyText: {
    fontSize: "1.3rem",
    marginBottom: "1.2rem",
    color: "#ddd",
  },

  button: {
    background: "linear-gradient(90deg, #e50914, #ff4040)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "0.7rem 1.4rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(229, 9, 20, 0.5)",
  },
};

// 🎬 Animaciones CSS en línea
const fadeIn = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Insertar animaciones globalmente
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);

export default Favorites;
