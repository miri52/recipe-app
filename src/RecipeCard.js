import React from "react";

function RecipeCard(props) {
  return (
    <div className="RecipeCard card ">
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
  );
}

export default RecipeCard;
