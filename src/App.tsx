import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { getPopularMovies, searchMovies } from './services/tmdb';
import type { Movie } from '../src/types/movie';

function App() {
  const [darkMode, setDarkMode] = useState(()=>
    JSON.parse(localStorage.getItem('darkmode')) ?? true
    );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

        <main className="max-w-7xl mx-auto px-6 md:py-10 py-24">
          <h1 className="md:text-5xl text-7xl  font-bold text-center md:mb-4 mb-16">
            {searchQuery ? `Results for "${searchQuery}"` : "Trending Movies"}
          </h1>

          {isLoading ? (
            <div className="text-center py-20">Loading amazing movies...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6 gap-8">
              {movies.map((movie: Movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={setSelectedMovie}
                />
              ))}
            </div>
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