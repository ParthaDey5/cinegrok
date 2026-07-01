import type { Movie } from '../types/movie';
import { X } from 'lucide-react';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 dark:bg-black/60 bg-black/50  z-100 flex items-center justify-center p-4">
      <div className="dark:bg-gray-900 bg-gray-200 rounded-3xl max-w-2xl w-full h-[99%] overflow-hidden">
        <div className="relative">
          <img 
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} 
            alt={movie.title}
            className="w-full h-75 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 dark:text-red-600 text-red-100 hover:rotate-90 bg-black/50 hover:bg-black rounded-full transition ease-in-out duration-200"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="dark:text-gray-400 mb-4">{movie.release_date}</p>
          
          <p className="text-md leading-relaxed dark:text-gray-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}