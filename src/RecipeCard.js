import React, { useState } from "react";
import "./RecipeCard.css";

function RecipeCard(props) {
  const [likes, setLikes] = useState(0);

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
          <p className="card-text">{props.recipe.hashtag}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <button onClick={() => setLikes(likes + 1)}>
              <span role="img" aria-label="love-emoji">
                😍
              </span>
              {` ${likes}`}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
