export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
] as const;

export type Difficulty = typeof DIFFICULTY_OPTIONS[number]['value'];

export interface Recipe {
  id: string;
  name: string;
  image_url: string;
  hashtag: string;
  servings: number;
  prep_time_mins: number;
  cook_time_mins: number;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];
  created_at: string;
}

export type RecipeListItem = Pick<Recipe, 'id' | 'name' | 'image_url' | 'hashtag' | 'created_at'>;
