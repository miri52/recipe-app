import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            <Switch>
              <Route exact path="/">
                <Recipes />
              </Route>
              <Route path="/recipes/:recipeId">
                <RecipeDetails />
              </Route>
            </Switch>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
