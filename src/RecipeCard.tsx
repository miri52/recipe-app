import { useState } from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { Recipe } from "./types";

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <div className=" RecipeCard col sm-3">
      <div className="card h-100">
        <img src={recipe.src} className="card-img-top" alt={recipe.name} />
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </h5>
          <p className="card-text">{recipe.hashtag}</p>
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
