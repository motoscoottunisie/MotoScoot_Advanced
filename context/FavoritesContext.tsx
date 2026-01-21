import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type FavoriteType = 'listing' | 'garage';

interface FavoritesData {
  listings: number[];
  garages: number[];
}

interface FavoritesContextType {
  favorites: FavoritesData;
  toggleFavorite: (type: FavoriteType, id: number) => void;
  isFavorite: (type: FavoriteType, id: number) => boolean;
  favoritesCount: number;
}

const CACHE_KEY = 'motoscoot_favorites_v1.1';
const OLD_CACHE_KEY = 'motoscoot_favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesData>(() => {
    try {
      const oldSaved = localStorage.getItem(OLD_CACHE_KEY);
      if (oldSaved) {
        localStorage.removeItem(OLD_CACHE_KEY);
      }

      const saved = localStorage.getItem(CACHE_KEY);
      const parsed = saved ? JSON.parse(saved) : { listings: [], garages: [] };
      
      // Sécurité : assurer que les tableaux existent
      return {
        listings: Array.isArray(parsed.listings) ? parsed.listings : [],
        garages: Array.isArray(parsed.garages) ? parsed.garages : []
      };
    } catch (e) {
      console.warn("Défaut de lecture du cache favoris:", e);
      return { listings: [], garages: [] };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Erreur d'écriture cache favoris:", e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((type: FavoriteType, id: number) => {
    setFavorites(prev => {
      const key = type === 'listing' ? 'listings' : 'garages';
      const list = prev[key] || [];
      const exists = list.includes(id);
      
      return {
        ...prev,
        [key]: exists ? list.filter(itemId => itemId !== id) : [...list, id]
      };
    });
  }, []);

  const isFavorite = useCallback((type: FavoriteType, id: number) => {
    const list = type === 'listing' ? favorites.listings : favorites.garages;
    return (list || []).includes(id);
  }, [favorites]);

  const favoritesCount = useMemo(() => {
    return (favorites.listings?.length || 0) + (favorites.garages?.length || 0);
  }, [favorites]);

  const contextValue = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount
  }), [favorites, toggleFavorite, isFavorite, favoritesCount]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};