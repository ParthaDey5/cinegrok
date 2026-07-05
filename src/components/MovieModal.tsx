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
    <div className="fixed inset-0 dark:bg-black/60 bg-black/50  z-100 flex items-center justify-center ">
      <div className="dark:bg-gray-900 bg-gray-200 rounded-3xl md:w-[45%] w-[90%] md:h-[34rem] flex flex-col overflow-hidden outline-gray-400 outline-4">
        <div className="relative h-[50%] overflow-hidden">
          <img 
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} 
            alt={movie.title}
            className="w-full  object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-[5%] right-[3%] p-2 dark:text-red-600 text-red-100 hover:rotate-90 bg-black/50 hover:bg-black rounded-full transition ease-in-out duration-200"
          >
            <X size={28} />
          </button>
        </div>

        <div className="md:px-8 px-16 md:py-7 py-16 h-[50%]">
          <h2 className="md:text-3xl text-7xl font-bold md:mb-2 mb-10">{movie.title}</h2>
          <p className="dark:text-gray-400 md:text-sm text-5xl md:mb-4 mb-14">{movie.release_date}</p>
          
          <p className="md:text-lg text-5xl leading-relaxed dark:text-gray-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}