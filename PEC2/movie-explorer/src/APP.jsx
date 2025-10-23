import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./context/MovieContext";
import "./styles/App.css";

function App() {
  const homeRef = useRef(null);

  const handleHomeClick = () => {
    if (homeRef.current) {
      homeRef.current.loadPopularMovies();
    }
  };

  return (
    <MovieProvider>
      <Router>
        <NavBar onHomeClick={handleHomeClick} />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Home ref={homeRef} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer>
          © {new Date().getFullYear()} Created by Iván Seco Martín — Movie Explorer — Powered by TMDB API |
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"> TMDB </a> |
          <a href="https://github.com/Praisel04/Aplicaciones-Multiplataforma/tree/main/PEC2/movie-explorer" target="_blank" rel="noreferrer"> GitHub </a>
        </footer>

      </Router>
    </MovieProvider>
  );
}



export default App;
