import { useEffect, useState } from "react";
import "./App.css";
import ToggleColorMode from "./components/ToggleColorMode";
import axios from "axios";

import GenreFetch from "./components/GenreFetch";

function App() {
  return (
    <div>
      <GenreFetch />
      {/* <ToggleColorMode />
      {movies.map((items) => (
        <div className="movieContainer" key={items.id}>
          <h1>{items.title}</h1>
          {items.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${items.poster_path}`}
              alt={`${items.title} Poster`}
            />
          )}

          <p>{items.release_date}</p>
        </div>
      ))} */}
    </div>
  );
}

export default App;
