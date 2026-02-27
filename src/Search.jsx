import React from "react";
import "./Search.css";

export default function Search() {
  return (
    <div className="Search">
      <form>
        <input
          type="text"
          placeholder="Search recipes ..."
          autoComplete="off"
        />

        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
