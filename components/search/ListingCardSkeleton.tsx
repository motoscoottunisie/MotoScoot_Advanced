
import React from 'react';
import { Skeleton } from '../ui/Skeleton';

interface ListingCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

/**
 * ListingCardSkeleton - Version haute fidélité.
 * Mimique la structure exacte de ListingCard, ListingThumbnail et ListingInfo
 * pour supprimer le Cumulative Layout Shift (CLS).
 */
export const ListingCardSkeleton: React.FC<ListingCardSkeletonProps> = ({ viewMode = 'grid' }) => {
  const isGrid = viewMode === 'grid';

  return (
    <div 
      className={`bg-white rounded-[14px] border border-gray-100 overflow-hidden flex shadow-sm [contain:content] ${
        isGrid ? 'flex-col h-full' : 'flex-col md:flex-row min-h-[220px]'
      }`}
    >
      {/* 1. THUMBNAIL SKELETON */}
      <div className={`relative flex-shrink-0 bg-gray-100 overflow-hidden ${
        isGrid 
          ? 'w-full aspect-[4/3]' 
          : 'w-full aspect-[16/9] md:aspect-[4/3] lg:w-72'
      }`}>
        <Skeleton className="w-full h-full rounded-none" />
        
        {/* Badge Proximité fantôme */}
        <div className="absolute left-0 top-0 w-20 h-8 bg-white/90 rounded-br-2xl border-b border-r border-gray-50" />
        
        {/* Pagination Dots fantôme */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1.5 bg-black/10 backdrop-blur-md rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Favorite Button fantôme */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border border-gray-50" />
      </div>

      {/* 2. CONTENT AREA SKELETON */}
      <div className={`flex flex-1 flex-col ${isGrid ? 'p-5 pt-4' : 'p-4 md:p-5'}`}>
        
        {/* Title (matches 17px font + mb-1) */}
        <Skeleton className="h-[20px] w-3/4 mb-1" />

        {/* Price (matches 15px/30px font + mb-6) */}
        <Skeleton className={`${isGrid ? 'h-[18px] w-1/3 mb-6' : 'h-[36px] w-1/2 mb-4 md:hidden'}`} />

        {/* Technical Specs Row (matches 12px font + mb-3) */}
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>

        {/* Location & Condition Row (matches 12px font + mb-5) */}
        <div className="flex items-center gap-4 mb-5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Footer / Seller area (matches pt-4 border-t) */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100/80">
          <div className="flex items-center gap-3 min-w-0">
             <Skeleton className="w-9 h-9 rounded-full shrink-0" />
             <div className="flex flex-col gap-1.5">
                <Skeleton className="h-2 w-20" />
                <Skeleton className="h-2 w-24" />
             </div>
          </div>
          
          {/* Action Buttons Icons Placeholder */}
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="w-14 h-11 md:w-10 md:h-10 rounded-xl" />
            <Skeleton className="w-14 h-11 md:w-10 md:h-10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 3. PRICE ACTIONS SIDEBAR (List mode only - matches w-[210px]) */}
      {!isGrid && (
        <div className="hidden md:flex flex-col justify-between items-end p-5 w-[210px] lg:w-[230px] border-l border-gray-50 shrink-0">
          <div className="text-right w-full space-y-2">
            <Skeleton className="h-2 w-16 ml-auto" />
            <Skeleton className="h-9 w-full ml-auto" />
          </div>
          <div className="w-full space-y-2">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
