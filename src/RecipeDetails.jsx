import React from "react";
import { useParams } from "react-router-dom";
import recipeData from "./recipeData";
import RecipeInstructions from "./RecipeInstructions";
import "./RecipeDetails.css";

function RecipeDetails(props) {
  const { recipeId } = useParams();
  const thisRecipe = recipeData.find((recipe) => recipeId === recipe.id);
  return (
    <div className="RecipeDetails">
      <h1>{thisRecipe.name}</h1>
      {/*real data to be obtained from API */}
      <div className="container">
        <div className="row cooking-info">
          <div className="col-sm-6">
            Preparation time: <strong>20 mins</strong>
          </div>
          <div className="col-sm-6">
            Portions: <strong>4</strong>{" "}
          </div>
          <div className="col-sm-6">
            Cooking time: <strong> 30 mins</strong>{" "}
          </div>
          <div className="col-sm-6">
            Difficulty: <strong>easy</strong>
          </div>
        </div>
      </div>
      <img
        className="img-fluid"
        src={thisRecipe.src}
        alt={thisRecipe.name}
        style={{ maxWidth: "30%" }}
      />
      <RecipeInstructions />
    </div>
  );
}

export default RecipeDetails;
