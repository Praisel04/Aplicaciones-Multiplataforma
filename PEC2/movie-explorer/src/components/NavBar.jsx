import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar({ onHomeClick }) {
  return (
    <nav className="navbar">
      <h1 className="logo">🎞️ Movie Explorer</h1>
      <div className="nav-links">
        <Link to="/" onClick={onHomeClick}>Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;
