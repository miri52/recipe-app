import React from "react";
import { useParams } from "react-router-dom";
import recipeData from "./recipeData";

function RecipeDetails(props) {
  const { recipeId } = useParams();
  const thisRecipe = recipeData.find((recipe) => recipeId === recipe.id);
  return (
    <div>
      <h1>{thisRecipe.name}</h1>
      <img
        src={thisRecipe.src}
        alt={thisRecipe.name}
        style={{ width: "50%" }}
      />
    </div>
  );
}

export default RecipeDetails;
