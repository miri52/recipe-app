import "./RecipeInstructions.css";

interface Props {
  ingredients: string[];
  instructions: string[];
}

function RecipeInstructions({ ingredients, instructions }: Props) {
  return (
    <div className="RecipeInstructions">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="instructions-col" id="with-border">
            <h4 className="text-lg font-semibold">Ingredients</h4>
            <ul>
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="instructions-col">
            <h4 className="text-lg font-semibold">Instructions</h4>
            <ol>
              {instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeInstructions;
