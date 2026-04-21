import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Recipe } from "./types";
import RecipeInstructions from "./RecipeInstructions";
import NavBar from "./NavBar";
import { PLACEHOLDER_IMAGE } from "./placeholder";
import { RECIPES_TABLE } from "./constants";

function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(!!recipeId);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!recipeId) return;
    supabase
      .from(RECIPES_TABLE)
      .select("*")
      .eq("id", recipeId)
      .single()
      .then(({ data }) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [recipeId]);

  async function handleDelete() {
    if (!recipeId || !confirm("Are you sure you want to delete this recipe?")) return;
    setDeleting(true);
    const { error, count } = await supabase
      .from(RECIPES_TABLE)
      .delete({ count: "exact" })
      .eq("id", recipeId);
    if (error) {
      alert("Failed to delete recipe: " + error.message);
      setDeleting(false);
      return;
    }
    if (count === 0) {
      alert("Could not delete recipe. Check Supabase permissions.");
      setDeleting(false);
      return;
    }
    navigate("/");
  }

  if (loading) return <><NavBar /><p className="wireframe">Loading…</p></>;
  if (!recipe) return (
    <>
      <NavBar>
        <Link to="/" className="text-sm text-white!">← Back to recipes</Link>
      </NavBar>
      <p className="wireframe">Recipe not found.</p>
    </>
  );

  return (
    <div className="RecipeDetails text-left">
      <NavBar>
        <Link to="/" className="text-sm text-white!">
          ← Back to recipes
        </Link>
      </NavBar>

      <div className="wireframe max-w-5xl 2xl:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
          <img
            src={recipe.image_url || PLACEHOLDER_IMAGE}
            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
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

        <hr className="border-t border-border" />

        <div className="py-6">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-muted bg-transparent border-none cursor-pointer underline hover:text-error disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {deleting ? "Deleting…" : "Delete recipe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
