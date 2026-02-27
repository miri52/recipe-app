import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <section className="wireframe">
            <Search />
            <Routes>
              <Route path="/" element={<Recipes />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
