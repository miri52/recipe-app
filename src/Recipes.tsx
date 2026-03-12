import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import "./Recipes.css";
import Search from "./Search";
import RecipeCard from "./RecipeCard";
import { supabase } from "./supabaseClient";
import { RecipeListItem } from "./types";
import NavBar from "./NavBar";

function Recipes() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

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

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="Recipes">
      <NavBar />
      <div className="wireframe">
        <div className="add-recipe-bar">
          <Link to="/recipes/new" className="add-recipe-link">
            + Add Recipe
          </Link>
        </div>
        <Search value={query} onChange={setQuery} />
        <h2 className="text-3xl font-normal uppercase mb-8">
          All time flavourite
        </h2>
        {loading ? (
          <p>Loading recipes…</p>
        ) : filtered.length === 0 ? (
          <p>{query ? "No recipes match your search." : "No recipes yet. Add one!"}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {filtered.map((item) => (
              <RecipeCard key={item.id} recipe={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
