import { useMovieStore } from '../store/useMovieStore';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

export default function Watchlist() {
  const { watchlist } = useMovieStore();

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        My Watchlist 
        <span className="text-xl text-gray-500">({watchlist.length})</span>
      </h2>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-3xl">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl text-gray-400">Your watchlist is empty</p>
          <p className="text-gray-500 mt-2">Add movies from the home page</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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