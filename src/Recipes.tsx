import "./RecipeCard.css";
import recipeData from "./recipeData";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const recipeComponents = recipeData.map((item) => (
    <RecipeCard key={item.id} recipe={item} />
  ));
  return (
    <div className="Recipes">
      <h2
        className="text-2xl font-bold"
        style={{
          textTransform: "uppercase",
          marginBottom: 30,
        }}
      >
        All time flavourite
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">{recipeComponents}</div>
    </div>
  );
}

export default Recipes;
