import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Recipe } from "./types";
import RecipeInstructions from "./RecipeInstructions";

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
      <nav className="bg-primary">
        <div className="px-8 h-12 flex items-center">
          <Link to="/" className="text-sm" style={{ color: "#ffffff" }}>
            ← Back to recipes
          </Link>
        </div>
      </nav>

      <div className="px-8 md:px-16">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
          {recipe.image_url && (
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full"
            />
          )}
          <div className="py-6 md:px-8">
            <h1 className="text-3xl font-bold mb-1">{recipe.name}</h1>
            <p className="text-muted text-sm uppercase mb-6">{recipe.hashtag}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted mb-1">Prep time</p>
                <p className="text-primary font-medium">{recipe.prep_time_mins} mins</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted mb-1">Cook time</p>
                <p className="text-primary font-medium">{recipe.cook_time_mins} mins</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted mb-1">Servings</p>
                <p className="text-primary font-medium">{recipe.servings} people</p>
              </div>
              <div className="border border-border rounded-md p-3">
                <p className="text-xs text-muted mb-1">Difficulty</p>
                <p className="text-primary font-medium capitalize">{recipe.difficulty}</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-3">Ingredients</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-border" />

        <div className="py-6">
          <RecipeInstructions instructions={recipe.instructions} />
        </div>

      </div>
    </div>
  );
}

export default RecipeDetails;
