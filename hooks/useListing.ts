
import { useQuery } from '@tanstack/react-query';
import { mockListings } from '../data/mockData';
import { Listing } from '../types';

/**
 * Hook useListing - Récupère une annonce spécifique par son ID.
 * Utilise React Query pour le caching et la gestion d'état asynchrone.
 */
export const useListing = (id?: number) => {
  return useQuery<Listing | null>({
    queryKey: ['listing', id],
    queryFn: async () => {
      if (!id) return null;
      
      // Simulation d'un délai réseau réaliste pour l'expérience utilisateur (Skeleton)
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const found = mockListings.find(l => l.id === id);
      if (!found) {
        throw new Error("Annonce introuvable");
      }
      return found;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache valide pendant 5 minutes
    gcTime: 1000 * 60 * 30,    // Rétention du cache pendant 30 minutes
    retry: 1,                 // Une seule tentative en cas d'erreur 404 simulée
  });
};
