
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteStation {
  id: string;
  name: string;
  country: string;
}

interface FavoritesContextType {
  favoriteStations: FavoriteStation[];
  addFavoriteStation: (station: FavoriteStation) => void;
  removeFavoriteStation: (stationId: string, country: string) => void;
  isFavoriteStation: (stationId: string, country: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteStations, setFavoriteStations] = useState<FavoriteStation[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favoriteStations');
    if (stored) {
      try {
        setFavoriteStations(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load favorite stations:', error);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoriteStations', JSON.stringify(favoriteStations));
  }, [favoriteStations]);

  const addFavoriteStation = (station: FavoriteStation) => {
    setFavoriteStations(prev => {
      const exists = prev.some(fav => fav.id === station.id && fav.country === station.country);
      if (exists) return prev;
      return [...prev, station];
    });
  };

  const removeFavoriteStation = (stationId: string, country: string) => {
    setFavoriteStations(prev => 
      prev.filter(fav => !(fav.id === stationId && fav.country === country))
    );
  };

  const isFavoriteStation = (stationId: string, country: string) => {
    return favoriteStations.some(fav => fav.id === stationId && fav.country === country);
  };

  const value: FavoritesContextType = {
    favoriteStations,
    addFavoriteStation,
    removeFavoriteStation,
    isFavoriteStation
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
