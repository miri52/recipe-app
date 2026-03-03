import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import Search from "./Search";
import RecipeCard from "./RecipeCard";
import { supabase } from "./supabaseClient";
import { Recipe } from "./types";

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRecipes(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Recipes">
      <div className="app-header">
        <Search />
        <Link to="/recipes/new" className="add-recipe-link">
          + Add Recipe
        </Link>
      </div>
      <h2
        className="text-2xl font-bold"
        style={{
          textTransform: "uppercase",
          marginBottom: "1.875em",
        }}
      >
        All time flavourite
      </h2>
      {loading ? (
        <p>Loading recipes…</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {recipes.map((item) => (
            <RecipeCard key={item.id} recipe={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
