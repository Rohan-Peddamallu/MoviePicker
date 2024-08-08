import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

function App() {
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: TMDB_API_KEY,
            with_genres: genre,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Select Genre</FormLabel>
            <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Fetch Movies
          </Button>
        </VStack>
      </form>

      <SimpleGrid columns={[2, 3, 4]} spacing={4} mt={8}>
        {movies.map((movie) => (
          <Box key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <Text mt={2}>{movie.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
