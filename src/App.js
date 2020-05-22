import React from "react";
import "./App.css";
import Search from "./Search";
import Recipes from "./Recipes";

function App() {
  return (
    <div className="App">
      <div className="container">
        <section className="wireframe">
          <Search />
          <Recipes />
        </section>
      </div>
    </div>
  );
}

export default App;
