import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">
      <div className="containt" id="filt">
        <div>
          <h1>Recetas y Dietas</h1>
          <div>
            <Link to="/home">
              <button>Home!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
