import type { Movie } from '../types/movie';
import { Plus, Check } from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';
import { useEffect } from 'react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieStore();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  useEffect(() => {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}, [addToWatchlist, removeFromWatchlist, watchlist]);

  return (
    <div 
      onClick={() => onClick(movie)}
      className="movie-card group dark:bg-gray-900 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full aspect-2/3 object-cover"
          loading="lazy"
        />
        
        <button
          onClick={handleWatchlist}
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full transition"
        >
          {inWatchlist ? 
            <Check size={18} className="text-green-500" /> : 
            <Plus size={18} className="text-white" />
          }
        </button>
      </div>

      <div className="md:p-4 p-10">
        <h3 className="font-semibold md:text-lg text-5xl line-clamp-2">{movie.title}</h3>
        <div className="flex justify-between items-center md:mt-2 mt-8">
          <p className="md:text-sm text-4xl dark:text-gray-400 text-gray-600">{movie.release_date?.slice(0, 4)}</p>
          <p className="md:text-sm text-4xl font-medium">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}

