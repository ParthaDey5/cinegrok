import { useMovieStore } from '../store/useMovieStore';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

export default function Watchlist() {
  const { watchlist } = useMovieStore();

  return (
    <div className="md:mt-16 mt-24">
      <h2 className="md:text-3xl text-5xl font-bold mb-8 flex items-center gap-3">
        My Watchlist 
        <span className="md:text-xl text-4xl text-gray-500">({watchlist.length})</span>
      </h2>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 dbg-gray-900/50 rounded-3xl">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl dark:text-gray-400 text-gray-600">Your watchlist is empty</p>
          <p className="dark:text-gray-500 text-gray-400 mt-2">Add movies from the home page</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6 gap-8">
          {watchlist.map((movie: Movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => {}} 
            />
          ))}
        </div>
      )}
    </div>
  );
}