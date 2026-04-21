import { Difficulty } from "./types";

// Supabase resource names
export const RECIPES_TABLE = "recipes";
export const RECIPE_IMAGES_BUCKET = "recipe-images";

// Form defaults
export const DEFAULT_SERVINGS = 4;
export const DEFAULT_DIFFICULTY: Difficulty = "easy";

export const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];
