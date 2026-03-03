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
    <div className="RecipeCard">
      <Link
        to={`/recipes/${recipe.id}`}
        className="flex flex-col h-full min-w-37.5 rounded border border-[#dfdfdf] bg-white overflow-hidden"
      >
        <img src={recipe.image_url} className="w-full" alt={recipe.name} />
        <div className="flex-1 p-4">
          <h5 className="text-base font-semibold mb-1">{recipe.name}</h5>
          <p className="text-xs text-muted uppercase font-normal">{recipe.hashtag}</p>
        </div>
        <div className="px-4 py-3 bg-white">
          <small className="text-muted">
            <button
              onClick={(e) => {
                e.preventDefault();
                setLikes(likes + 1);
              }}
            >
              <span role="img" aria-label="love-emoji">
                😍
              </span>
              {` ${likes}`}
            </button>
          </small>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
