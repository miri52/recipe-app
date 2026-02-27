import React from "react";
import "./RecipeInstructions.css";

function RecipeInstructions() {
  return (
    <div className="RecipeInstructions">
      <div className="container">
        <div className="row">
          <div className="col-sm-6" id="with-border">
            <h4>Ingredients</h4>
          </div>
          <div className="col-sm-6">
            <h4>Instructions</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeInstructions;
