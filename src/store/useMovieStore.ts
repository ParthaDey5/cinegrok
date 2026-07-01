import { create } from 'zustand';

interface WatchlistItem extends Movie {
  addedAt: string;
}

interface MovieStore {
  watchlist: WatchlistItem[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  watchlist: [],
  
  addToWatchlist: (movie) => {
    if (get().isInWatchlist(movie.id)) return;
    
    set((state) => ({
      watchlist: [...state.watchlist, { ...movie, addedAt: new Date().toISOString() }]
    }));
  },

  removeFromWatchlist: (id) => {
    set((state) => ({
      watchlist: state.watchlist.filter((m) => m.id !== id)
    }));
  },

  isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),
}));