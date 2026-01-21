
import React, { memo, useCallback } from 'react';
import { Listing } from '../../types';
import { Reveal } from '../ui/Reveal';
import { ListingThumbnail } from './ListingThumbnail';
import { ListingInfo } from './ListingInfo';
import { ListingPriceActions } from './ListingPriceActions';

interface ListingCardProps {
  listing: Listing & { distance: number | null };
  viewMode: 'grid' | 'list';
  favorited: boolean;
  onFavoriteToggle: (id: number) => void;
  onClick: (id: number, title: string) => void;
  priority?: boolean;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
}

export const ListingCard = memo(({ 
  listing, 
  viewMode,
  favorited, 
  onFavoriteToggle, 
  onClick,
  priority = false,
  isLoggedIn = false,
  onTriggerLogin
}: ListingCardProps) => {
  const isGrid = viewMode === 'grid';

  const handleItemClick = useCallback(() => {
    onClick(listing.id, listing.title);
  }, [onClick, listing.id, listing.title]);

  const handleFavClick = useCallback(() => {
    onFavoriteToggle(listing.id);
  }, [onFavoriteToggle, listing.id]);

  return (
    <Reveal animation="fade-in-up" className={isGrid ? "h-full" : "w-full"}>
      <article 
        onClick={handleItemClick} 
        className={`group bg-white rounded-[14px] border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer flex shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-primary-100 active:scale-[0.98] ${
          isGrid ? 'flex-col h-full' : 'flex-col md:flex-row min-h-[220px]'
        }`}
        style={{ 
          contentVisibility: 'auto', 
          containIntrinsicSize: isGrid ? '0 400px' : '0 220px' 
        }}
      >
        <ListingThumbnail 
          image={listing.image}
          title={listing.title}
          distance={listing.distance}
          isNear={listing.distance !== null && listing.distance < 20}
          favorited={favorited}
          onFavoriteToggle={handleFavClick}
          viewMode={viewMode}
          condition={listing.condition}
          priority={priority}
          isLoggedIn={isLoggedIn}
          onTriggerLogin={onTriggerLogin}
        />

        <div className={`flex flex-1 flex-col ${isGrid ? 'p-5 pt-4' : 'p-4 md:p-0 md:flex-row md:gap-4'}`}>
          <ListingInfo 
            brand={listing.brand}
            model={listing.model}
            price={listing.price}
            location={listing.location}
            date={listing.date}
            year={listing.year}
            mileage={listing.mileage}
            cc={listing.cc}
            condition={listing.condition}
            type={listing.type}
            seller={listing.seller}
            sellerType={listing.sellerType}
            sellerPhone={listing.phone}
            viewMode={viewMode}
            favorited={favorited}
            onFavoriteToggle={handleFavClick}
          />
          
          {!isGrid && (
            <ListingPriceActions 
              price={listing.price}
              sellerPhone={listing.phone}
              favorited={favorited}
              onFavoriteToggle={handleFavClick}
            />
          )}
        </div>
      </article>
    </Reveal>
  );
}, (prev, next) => {
  return prev.listing.id === next.listing.id && 
         prev.listing.distance === next.listing.distance &&
         prev.favorited === next.favorited && 
         prev.isLoggedIn === next.isLoggedIn &&
         prev.viewMode === next.viewMode;
});
