export type Difficulty = 'easy' | 'medium' | 'hard';

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
