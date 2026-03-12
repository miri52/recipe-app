import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Recipe } from "./types";
import RecipeInstructions from "./RecipeInstructions";
import NavBar from "./NavBar";

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
    <div className="RecipeDetails text-left">
      <NavBar>
        <Link to="/" className="text-sm text-white!">
          ← Back to recipes
        </Link>
      </NavBar>

      <div className="wireframe max-w-5xl 2xl:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
          {recipe.image_url && (
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="py-6 md:px-8">
            <h1 className="text-3xl font-bold mb-1">{recipe.name}</h1>
            <p className="text-muted text-sm uppercase mb-6">
              {recipe.hashtag}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "Prep time", value: `${recipe.prep_time_mins} mins` },
                { label: "Cook time", value: `${recipe.cook_time_mins} mins` },
                { label: "Servings", value: `${recipe.servings} people` },
                { label: "Difficulty", value: recipe.difficulty },
              ].map(({ label, value }) => (
                <div key={label} className="border border-border rounded-md p-3">
                  <p className="text-xs text-muted mb-1">{label}</p>
                  <p className="text-primary font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>
            <h4 className="text-lg font-semibold mb-3">Ingredients</h4>
            <ul className="columns-1 sm:columns-2 gap-x-4 space-y-1 list-disc list-inside">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="marker:text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-border md:mt-8" />

        <div className="py-6">
          <RecipeInstructions instructions={recipe.instructions} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
