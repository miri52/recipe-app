export interface Recipe {
  id: string;
  name: string;
  image_url: string;
  hashtag: string;
  servings: number;
  prep_time_mins: number;
  cook_time_mins: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  created_at: string;
}
