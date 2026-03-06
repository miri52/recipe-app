import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import AddRecipe from "./AddRecipe";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <section className="wireframe">
            <Routes>
              <Route path="/" element={<Recipes />} />
              <Route path="/recipes/new" element={<AddRecipe />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
