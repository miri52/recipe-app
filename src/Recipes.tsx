import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import "./Recipes.css";
import Search from "./Search";
import RecipeCard from "./RecipeCard";
import { supabase } from "./supabaseClient";
import { RecipeListItem } from "./types";

function Recipes() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("recipes")
      .select("id, name, image_url, hashtag, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRecipes(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Recipes">
      <div className="add-recipe-bar">
        <Link to="/recipes/new" className="add-recipe-link">
          + Add Recipe
        </Link>
      </div>
      <Search />
      <h2 className="text-3xl font-normal uppercase mb-8">
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
