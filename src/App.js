import React from "react";
import "./App.css";
import Recipes from "./Recipes";

function App() {
  return (
    <div className="App">
      <div className="container">
        <section className="wireframe">
          <Recipes />
        </section>
      </div>
    </div>
  );
}

export default App;
