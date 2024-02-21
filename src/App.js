import { useEffect, useState } from "react";
import "./App.css";
import { getGenreList, getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
    getGenreList();
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-rating">{movie.vote_average}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="image-movie"
          />
          <div className="Movie-title">{movie.title}</div>
          <div className="Movie-genre">{movie.genres}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    } else {
      // Jika input pencarian kosong, kembalikan daftar film ke daftar aslinya
      const movieList = await getMovieList();
      setPopularMovies(movieList);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-container">
          <input
            className="Movie-search"
            type="text"
            placeholder="Type to search your favorite movie..."
            onChange={({ target }) => search(target.value)}
          />
        </div>
        <i class="fa-solid fa-magnifying-glass suffix-icon"></i>
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
