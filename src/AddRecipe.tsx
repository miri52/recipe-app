import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useStringList } from "./hooks/useStringList";
import { Difficulty } from "./types";
import "./AddRecipe.css";

function AddRecipe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [servings, setServings] = useState<number | "">(4);
  const [prepTime, setPrepTime] = useState<number | "">("");
  const [cookTime, setCookTime] = useState<number | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [ingredients, updateIngredient, addIngredient, removeIngredient] = useStringList();
  const [instructions, updateInstruction, addInstruction, removeInstruction] = useStringList();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let image_url = "";

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("recipe-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setError("Image upload failed: " + uploadError.message);
        setSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("recipe-images")
        .getPublicUrl(fileName);

      image_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("recipes").insert([
      {
        name,
        hashtag,
        image_url,
        servings: Number(servings),
        prep_time_mins: Number(prepTime),
        cook_time_mins: Number(cookTime),
        difficulty,
        ingredients: ingredients.filter((s) => s.trim() !== ""),
        instructions: instructions.filter((s) => s.trim() !== ""),
      },
    ]);

    if (insertError) {
      setError("Failed to save recipe: " + insertError.message);
      setSubmitting(false);
      return;
    }

    navigate("/");
  }

  return (
    <div className="AddRecipe">
      <h2 className="text-2xl font-bold uppercase mb-8">
        Add New Recipe
      </h2>
      {error && <p className="add-recipe-error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hashtag">Hashtag</label>
          <input
            id="hashtag"
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            placeholder="#italian"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              id="servings"
              type="number"
              min={1}
              value={servings}
              onChange={(e) => setServings(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prepTime">Prep time (mins)</label>
            <input
              id="prepTime"
              type="number"
              min={0}
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime">Cook time (mins)</label>
            <input
              id="cookTime"
              type="number"
              min={0}
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {ingredients.map((item, i) => (
            <div key={i} className="dynamic-row">
              <input
                type="text"
                value={item}
                onChange={(e) => updateIngredient(i, e.target.value)}
                placeholder="e.g. 2 cups flour"
              />
              <button
                type="button"
                onClick={() => removeIngredient(i)}
                disabled={ingredients.length === 1}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-btn">
            + Add ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          {instructions.map((step, i) => (
            <div key={i} className="dynamic-row">
              <textarea
                value={step}
                onChange={(e) => updateInstruction(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeInstruction(i)}
                disabled={instructions.length === 1}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="add-btn">
            + Add step
          </button>
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? "Saving…" : "Save Recipe"}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
