import React, { useCallback, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useAppNavigation } from '../context/NavigationContext';
import { Listing } from '../types';
import { monitoring } from '../utils/monitoring';

interface UseListingActionsProps {
  listing?: Listing | null;
}

export const useListingActions = ({ listing }: UseListingActionsProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const { isLoggedIn, triggerLogin } = useAppNavigation();
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handleFavoriteToggle = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isLoggedIn) {
      triggerLogin();
      return;
    }
    if (listing) {
      const currentlyFavorite = isFavorite('listing', listing.id);
      toggleFavorite('listing', listing.id);
      
      if (!currentlyFavorite) {
        addToast("Annonce ajoutée à vos favoris", "success", 3000);
      } else {
        addToast("Annonce retirée de vos favoris", "info", 2000);
      }
    }
  }, [isLoggedIn, triggerLogin, toggleFavorite, isFavorite, listing, addToast]);

  const handlePhoneAction = useCallback(() => {
    if (listing) {
      monitoring.trackEvent('ListingCallInitiated', { 
        listingId: listing.id, 
        brand: listing.brand,
        model: listing.model,
        price: listing.price,
        context: 'action_handler'
      });

      if (!phoneRevealed) {
        setPhoneRevealed(true);
        // Notification supprimée selon la demande utilisateur
      } else {
        window.location.href = `tel:${listing.phone}`;
      }
    }
  }, [listing, phoneRevealed]);

  const handleWhatsAppAction = useCallback((e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      e?.preventDefault();
      triggerLogin();
      return;
    }

    if (listing) {
      monitoring.trackEvent('ListingWhatsAppInitiated', { 
        listingId: listing.id, 
        brand: listing.brand,
        model: listing.model,
        context: 'action_handler'
      });
    }
  }, [isLoggedIn, triggerLogin, listing]);

  const handleShare = useCallback(async () => {
    if (!listing) return;
    
    const shareData = {
      title: `${listing.brand} ${listing.model} • MotoScoot.tn`,
      text: `Regardez cette annonce sur MotoScoot.tn : ${listing.brand} ${listing.model}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        monitoring.trackEvent('ListingShared', { listingId: listing.id, method: 'native_api' });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        addToast("Lien de l'annonce copié !", "info", 2000);
        monitoring.trackEvent('ListingShared', { listingId: listing.id, method: 'clipboard' });
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }, [listing, addToast]);

  const isFavorited = listing ? isFavorite('listing', listing.id) : false;

  return {
    handleFavoriteToggle,
    handlePhoneAction,
    handleWhatsAppAction,
    handleShare,
    phoneRevealed,
    isFavorited
  };
};