import React from "react";
import "./RecipeCard.css";
import recipeData from "./recipeData";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const recipeComponents = recipeData.map((item) => (
    <RecipeCard key={item.id} recipe={item} />
  ));

  return <div className="Recipes row">{recipeComponents}</div>;
}

export default Recipes;
