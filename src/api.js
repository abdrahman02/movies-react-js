import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
// const token = process.env.REACT_APP_TOKEN;
const baseUrl = process.env.REACT_APP_BASEURL;

// * GET MOVIE LIST
export const getMovieList = async () => {
  // Dapatkan daftar genre
  const genres = await getGenreList();

  // Dapatkan daftar film
  const responseMovies = await axios.get(
    `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
  );
  const movies = responseMovies.data.results;

  // Ubah genre_ids menjadi array nama genre
  const moviesWithGenres = movies.map((movie) => {
    const movieGenres = movie.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : null; // Jika genre ditemukan, kembalikan nama genre
    });
    return {
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      genres: movieGenres.join(", "), // Menggabungkan nama genre menjadi satu string
    };
  });

  return moviesWithGenres;
};

// * GET GENRE LIST
export const getGenreList = async () => {
  const genres = await axios.get(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`
  );

  return genres.data.genres;
};

// * SEARCH MOVIE
export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
  );
  return search.data;
};
