import React from "react";
import { Link } from "react-router-dom";

function Landingpage() {
  return  (
        <div className="landing">
          <div className="containt" id="filt">
            <div>
              <h1>Recipes&Diets</h1>
              <div>
                <Link to="/home">
                  <button>Go Home!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    

    
}
export default Landingpage