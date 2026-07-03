import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import Watchlist from './components/Watchlist';
import MovieSkeleton from './components/MovieSkeleton';
import { getPopularMovies, searchMovies } from './services/tmdb';
import type { Movie } from '../src/types/movie';

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem('darkmode')) ?? true
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showWatchlist, setShowWatchlist] = useState(false);
  useEffect(() => {
    localStorage.setItem("darkmode", darkMode)
  }, [darkMode])


  const { data: movies = [], isLoading } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () =>
      searchQuery.length > 2
        ? searchMovies(searchQuery).then(res => res.data.results)
        : getPopularMovies().then(res => res.data.results),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen dark:bg-gray-950 dark:text-white bg-gray-100 text-black `}>
        <Navbar
          onSearch={handleSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-bold">
              {showWatchlist ? "My Watchlist" :
                searchQuery ? `Results for "${searchQuery}"` : "Trending Movies"}
            </h1>

            <button
              onClick={() => setShowWatchlist(!showWatchlist)}
              className="px-6 py-3 dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300 rounded-full transition"
            >
              {showWatchlist ? "Browse Movies" : "View Watchlist"}
            </button>
          </div>

          {showWatchlist ? (
            <Watchlist />
          ) : (
            <>
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => <MovieSkeleton key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie: Movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={setSelectedMovie}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>


        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      </div>
    </div>
  );
}

export default App;