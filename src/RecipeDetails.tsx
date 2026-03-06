import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Recipe } from "./types";
import RecipeInstructions from "./RecipeInstructions";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(!!recipeId);

  useEffect(() => {
    if (!recipeId) return;
    supabase
      .from("recipes")
      .select("*")
      .eq("id", recipeId)
      .single()
      .then(({ data }) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) return <p>Loading…</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="RecipeDetails">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <div className="mx-auto max-w-2xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 cooking-info">
          <div>
            Preparation time: <strong>{recipe.prep_time_mins} mins</strong>
          </div>
          <div>
            Portions: <strong>{recipe.servings}</strong>
          </div>
          <div>
            Cooking time: <strong>{recipe.cook_time_mins} mins</strong>
          </div>
          <div>
            Difficulty: <strong>{recipe.difficulty}</strong>
          </div>
        </div>
      </div>
      <img
        className="h-auto"
        src={recipe.image_url}
        alt={recipe.name}
        style={{ maxWidth: "30%" }}
      />
      <RecipeInstructions
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
    </div>
  );
}

export default RecipeDetails;
