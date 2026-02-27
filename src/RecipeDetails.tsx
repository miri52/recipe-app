import { useParams } from "react-router-dom";
import recipeData from "./recipeData";
import RecipeInstructions from "./RecipeInstructions";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { recipeId } = useParams();
  const thisRecipe = recipeData.find((recipe) => recipeId === recipe.id);
  if (!thisRecipe) return <p>Recipe not found.</p>;
  return (
    <div className="RecipeDetails">
      <h1 className="text-3xl font-bold mb-4">{thisRecipe.name}</h1>
      {/*real data to be obtained from API */}
      <div className="mx-auto max-w-2xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 cooking-info">
          <div>
            Preparation time: <strong>20 mins</strong>
          </div>
          <div>
            Portions: <strong>4</strong>{" "}
          </div>
          <div>
            Cooking time: <strong> 30 mins</strong>{" "}
          </div>
          <div>
            Difficulty: <strong>easy</strong>
          </div>
        </div>
      </div>
      <img
        className="h-auto"
        src={thisRecipe.src}
        alt={thisRecipe.name}
        style={{ maxWidth: "30%" }}
      />
      <RecipeInstructions />
    </div>
  );
}

export default RecipeDetails;
