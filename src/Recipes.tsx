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
        style={{
          textTransform: "uppercase",
          marginBottom: 30,
        }}
      >
        All time flavourite
      </h2>
      <div className="row row-cols-1 row-cols-md-4 g-3">{recipeComponents}</div>
    </div>
  );
}

export default Recipes;
