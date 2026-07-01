import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;   // We'll add this later
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const getPopularMovies = () => tmdb.get('/movie/popular');
export const searchMovies = (query: string) => 
  tmdb.get('/search/movie', { params: { query } });

export default tmdb;