import { useState } from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { RecipeListItem } from "./types";
import { PLACEHOLDER_IMAGE } from "./placeholder";

interface RecipeCardProps {
  recipe: RecipeListItem;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <Link
      className="RecipeCard flex flex-col h-full min-w-37.5 rounded border border-border bg-white overflow-hidden"
      to={`/recipes/${recipe.id}`}
    >
        <img src={recipe.image_url || PLACEHOLDER_IMAGE} className="w-full" alt={recipe.name} />
        <div className="flex-1 p-4">
          <h5 className="text-2xl font-medium mb-3">{recipe.name}</h5>
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
  );
}

export default RecipeCard;
