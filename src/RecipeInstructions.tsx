interface Props {
  instructions: string[];
}

function RecipeInstructions({ instructions }: Props) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Instructions</h4>
      <ol className="space-y-3 list-decimal list-inside">
        {instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeInstructions;
