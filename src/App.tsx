import { useEffect, useState } from "react";
import "./App.css";
import ToggleColorMode from "./components/ToggleColorMode";
import axios from "axios";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState("");
  const apiKey = "16c7375a4b0c45e7f95053f83c77ad14";
  const popular = "https://api.themoviedb.orgvie/popular";

  // title as a string
  // poster_path as a string
  // id as a number
  // release_date as a string

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${popular}?api_key=${apiKey}`)
      .then((response) => {
        const result = response.data.results;
        setMovies(result);
        console.log(result);
      })
      .catch((err) => setError(err.message));
    console.log(error);
  };

  return (
    <div>
      <ToggleColorMode />
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
      ))}
    </div>
  );
}

export default App;
