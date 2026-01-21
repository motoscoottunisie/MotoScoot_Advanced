
import { useQuery } from '@tanstack/react-query';
import { mockListings } from '../data/mockData';
import { Listing } from '../types';

/**
 * Hook de production pour récupérer les annonces.
 * Implémente une stratégie de résilience avec Exponential Backoff
 * pour gérer les instabilités réseau (4G/5G).
 */
export const useListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      // Simulation d'un délai réseau réaliste
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulation d'une erreur réseau aléatoire (optionnel pour test de robustesse)
      // if (Math.random() < 0.1) throw new Error("Network failure simulation");
      
      return mockListings;
    },
    // STRATÉGIE DE RÉSILIENCE : RETRY WITH EXPONENTIAL BACKOFF
    // On tente 4 fois avant d'afficher l'état d'erreur final
    retry: 4,
    // Calcul du délai entre les tentatives : 1s, 2s, 4s, 8s, 16s...
    // Limité à 30 secondes pour ne pas bloquer l'interface indéfiniment
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Optimisation du cache
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30,    // 30 minutes de rétention inactive
  });
};
