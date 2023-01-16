import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="Navbar">
      <div className="logoAndName">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3123/3123321.png"
            alt="logo-food"
            className="logo"
          />
        </Link>
        <span className="nav-logo">Recetas y Dietas</span>
      </div>
      <div className="social-logo">
      </div>
      <div className={`nav-items ${open && "open"}`}>
        <a href="/home" className="color-specified">
          <Link to="/home">Home</Link>
        </a>
        <a href="/createrecipe" className="color-specified">
          <Link to="/create/recipe">Create Recipe</Link>
        </a>
        
      </div>
      <div
        className={`nav-toggle ${open && "open"}`}
        onClick={() => setOpen(!open)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
}

export default Navbar;
