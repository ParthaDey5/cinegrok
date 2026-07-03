import type { Movie } from '../types/movie';
import { Plus, Check } from 'lucide-react';
import { useMovieStore } from '../store/useMovieStore';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovieStore();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

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

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm dark:text-gray-400 text-gray-600">{movie.release_date?.slice(0, 4)}</p>
          <p className="text-sm font-medium">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}

