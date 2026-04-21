import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useStringList } from "./hooks/useStringList";
import NavBar from "./NavBar";
import { Difficulty } from "./types";
import { DIFFICULTY_OPTIONS, DEFAULT_DIFFICULTY, DEFAULT_SERVINGS, RECIPES_TABLE, RECIPE_IMAGES_BUCKET } from "./constants";

function parseNumericInput(value: string): number | "" {
  return value === "" ? "" : Number(value);
}

const isNonEmpty = (s: string) => s.trim() !== "";

function AddRecipe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hashtags, updateHashtag, addHashtag, removeHashtag, hashtagFocus] = useStringList();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [servings, setServings] = useState<number | "">(DEFAULT_SERVINGS);
  const [prepTime, setPrepTime] = useState<number | "">("");
  const [cookTime, setCookTime] = useState<number | "">("");
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [ingredients, updateIngredient, addIngredient, removeIngredient, ingredientFocus] = useStringList();
  const [instructions, updateInstruction, addInstruction, removeInstruction, instructionFocus] = useStringList();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hashtagRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLLabelElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!hashtags.some(isNonEmpty)) {
      setError("Please add at least one hashtag.");
      setSubmitting(false);
      hashtagRef.current?.focus();
      return;
    }
    if (!imageFile) {
      setError("Please select an image.");
      setSubmitting(false);
      imageRef.current?.focus();
      return;
    }
    if (!ingredients.some(isNonEmpty)) {
      setError("Please add at least one ingredient.");
      setSubmitting(false);
      ingredientRef.current?.focus();
      return;
    }
    if (!instructions.some(isNonEmpty)) {
      setError("Please add at least one instruction.");
      setSubmitting(false);
      instructionRef.current?.focus();
      return;
    }

    try {
      let image_url = "";

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(RECIPE_IMAGES_BUCKET)
          .upload(fileName, imageFile);

        if (uploadError) {
          setError("Image upload failed: " + uploadError.message);
          return;
        }

        const { data: urlData } = supabase.storage
          .from(RECIPE_IMAGES_BUCKET)
          .getPublicUrl(fileName);

        image_url = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from(RECIPES_TABLE).insert([
        {
          name,
          hashtag: hashtags
            .filter(isNonEmpty)
            .map((t) => (t.startsWith("#") ? t : `#${t}`))
            .join(" "),
          image_url,
          servings: Number(servings),
          prep_time_mins: Number(prepTime),
          cook_time_mins: Number(cookTime),
          difficulty,
          ingredients: ingredients.filter(isNonEmpty),
          instructions: instructions.filter(isNonEmpty),
        },
      ]);

      if (insertError) {
        setError("Failed to save recipe: " + insertError.message);
        return;
      }

      navigate("/");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEnterToAdd(e: React.KeyboardEvent<HTMLInputElement>, addFn: () => void) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value.trim()) addFn();
    }
  }

  const inputClasses = "border border-border rounded px-2.5 py-2 text-sm font-[inherit] w-full box-border";
  const labelClasses = "text-sm font-semibold mb-1.5 text-primary";

  return (
    <div>
      <NavBar>
        <Link to="/" className="text-sm text-white!">← Back to home</Link>
      </NavBar>
      <div className="wireframe max-w-[960px] mx-auto text-left">
        <h2 className="text-2xl font-bold uppercase mb-8">
          Add New Recipe
        </h2>
        {error && <p className="text-error mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className={labelClasses}>Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className={labelClasses}>Hashtags</label>
            {hashtags.map((tag, i) => (
              <div key={i} className="flex gap-2 items-start mb-2">
                <input
                  ref={i === 0 ? hashtagRef : undefined}
                  type="text"
                  value={tag}
                  onChange={(e) => updateHashtag(i, e.target.value)}
                  onKeyDown={(e) => handleEnterToAdd(e, addHashtag)}
                  autoFocus={i === hashtagFocus}
                  placeholder="e.g. italian"
                  className={`${inputClasses} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeHashtag(i)}
                  disabled={hashtags.length === 1}
                  className="px-2.5 py-1.5 bg-transparent border border-border rounded text-xs cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHashtag}
              className="mt-1 px-3 py-1.5 bg-transparent border border-primary rounded text-primary text-[13px] cursor-pointer self-start hover:bg-primary hover:text-white"
            >
              + Add hashtag
            </button>
          </div>

          <div className="flex flex-col mb-5">
            <span className={labelClasses}>Image</span>
            <label
              ref={imageRef}
              htmlFor="image"
              tabIndex={0}
              className="border border-border rounded px-2.5 py-2 text-sm font-normal cursor-pointer focus:outline-2 focus:outline-primary focus:outline-offset-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("image")?.click();
                }
              }}
            >
              {imageFile ? imageFile.name : "Choose file"}
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <div className="flex flex-col">
              <label htmlFor="servings" className={labelClasses}>Servings</label>
              <input
                id="servings"
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(parseNumericInput(e.target.value))}
                required
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="prepTime" className={labelClasses}>Prep time (mins)</label>
              <input
                id="prepTime"
                type="number"
                min={0}
                value={prepTime}
                onChange={(e) => setPrepTime(parseNumericInput(e.target.value))}
                required
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="cookTime" className={labelClasses}>Cook time (mins)</label>
              <input
                id="cookTime"
                type="number"
                min={0}
                value={cookTime}
                onChange={(e) => setCookTime(parseNumericInput(e.target.value))}
                required
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="difficulty" className={labelClasses}>Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className={inputClasses}
              >
                {DIFFICULTY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <label className={labelClasses}>Ingredients</label>
            {ingredients.map((item, i) => (
              <div key={i} className="flex gap-2 items-start mb-2">
                <input
                  ref={i === 0 ? ingredientRef : undefined}
                  type="text"
                  value={item}
                  onChange={(e) => updateIngredient(i, e.target.value)}
                  onKeyDown={(e) => handleEnterToAdd(e, addIngredient)}
                  autoFocus={i === ingredientFocus}
                  placeholder="e.g. 2 cups flour"
                  className={`${inputClasses} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  disabled={ingredients.length === 1}
                  className="px-2.5 py-1.5 bg-transparent border border-border rounded text-xs cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-1 px-3 py-1.5 bg-transparent border border-primary rounded text-primary text-[13px] cursor-pointer self-start hover:bg-primary hover:text-white"
            >
              + Add ingredient
            </button>
          </div>

          <div className="flex flex-col mb-5">
            <label className={labelClasses}>Instructions</label>
            {instructions.map((step, i) => (
              <div key={i} className="flex gap-2 items-start mb-2">
                <input
                  ref={i === 0 ? instructionRef : undefined}
                  type="text"
                  value={step}
                  onChange={(e) => updateInstruction(i, e.target.value)}
                  onKeyDown={(e) => handleEnterToAdd(e, addInstruction)}
                  autoFocus={i === instructionFocus}
                  placeholder={`Step ${i + 1}`}
                  className={`${inputClasses} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(i)}
                  disabled={instructions.length === 1}
                  className="px-2.5 py-1.5 bg-transparent border border-border rounded text-xs cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="mt-1 px-3 py-1.5 bg-transparent border border-primary rounded text-primary text-[13px] cursor-pointer self-start hover:bg-primary hover:text-white"
            >
              + Add step
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-2.5 bg-accent text-white border-none rounded text-[15px] font-semibold cursor-pointer font-[inherit] hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving…" : "Save Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
