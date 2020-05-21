import React from "react";
import "./RecipeCard.css";

function RecipeCard(props) {
  return (
    <div className=" RecipeCard col sm-3">
      <div className="card h-100">
        <img
          src={props.recipe.src}
          className="card-img-top"
          alt={props.recipe.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.recipe.name}</h5>
          <p className="card-text">Some amazing comment</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">emoji + count</small>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
