import "./RecipeInstructions.css";

function RecipeInstructions() {
  return (
    <div className="RecipeInstructions">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="instructions-col" id="with-border">
            <h4 className="text-lg font-semibold">Ingredients</h4>
          </div>
          <div className="instructions-col">
            <h4 className="text-lg font-semibold">Instructions</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeInstructions;
