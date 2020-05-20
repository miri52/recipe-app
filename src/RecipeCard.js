import React from "react";

function RecipeCard(props) {
  console.log(props.recipe.src);
  return (
    <div className="RecipeCard col-4">
      <h3>{props.recipe.name}</h3>
      <p>emoji + number</p>
    </div>
  );
}

export default RecipeCard;
