import React, { useMemo } from 'react';
import { mockListings } from '../../data/mockData';
import { useFavorites } from '../../context/FavoritesContext';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { getOptimizedImageUrl } from '../../utils/urlUtils';

interface ListingSimilarAdsProps {
  currentListingId: number;
  brand: string;
  type: string;
  price: string;
  onNavigate?: (view: string, params?: any) => void;
  isLoading?: boolean;
}

const S = {
  Section: "mt-12 md:mt-16 bg-[#F9FAFB] border-t border-gray-100 py-12 md:py-12 -mx-6 md:-mx-16 lg:-mx-32 px-6 md:px-16 lg:px-32",
  Header: "flex justify-between items-end mb-10",
  Title: "text-2xl md:text-[28px] font-black text-[#111827] tracking-tight",
  Grid: "flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0",
  Card: "flex-shrink-0 w-[280px] md:w-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 snap-center group cursor-pointer",
  ImgWrapper: "relative aspect-[4/3] overflow-hidden bg-gray-50",
  PriceTag: "text-lg font-black text-[#E65100] mt-1",
  Meta: "flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-3",
  CTA: "mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em] text-gray-900 group-hover:text-[#E65100] transition-colors"
};

const SimilarCard = ({ listing, onClick }: { listing: any, onClick: () => void }) => (
  <div className={S.Card} onClick={onClick}>
    <div className={S.ImgWrapper}>
      <img 
        src={getOptimizedImageUrl(listing.image, 500, 375)} 
        alt={listing.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{listing.brand}</span>
      <h3 className="text-base font-bold text-gray-900 line-clamp-1 mt-0.5">{listing.model}</h3>
      <div className={S.PriceTag}>{listing.price}</div>
      
      <div className={S.Meta}>
        <span>{listing.year}</span>
        <span className="w-1 h-1 rounded-full bg-gray-200"></span>
        <span>{listing.mileage}</span>
      </div>

      <div className={S.CTA}>
        Voir l'annonce
        <div className="p-1.5 bg-gray-50 rounded-full group-hover:bg-[#E65100] group-hover:text-white transition-all">
          <ChevronRight size={14} strokeWidth={3} />
        </div>
      </div>
    </div>
  </div>
);

export const ListingSimilarAds: React.FC<ListingSimilarAdsProps> = ({ 
  currentListingId, 
  brand, 
  type,
  price,
  onNavigate,
  isLoading = false
}) => {
  const similarListings = useMemo(() => {
    return mockListings
      .filter(l => l.id !== currentListingId)
      .map(l => {
        let score = 0;
        if (l.brand.toLowerCase() === brand.toLowerCase()) score += 10;
        if (l.type === type) score += 5;
        return { ...l, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [currentListingId, brand, type]);

  if (similarListings.length === 0) return null;

  return (
    <section className={S.Section}>
      <Reveal animation="fade-in-up">
        <div className={S.Header}>
          <div>
            <h2 className={S.Title}>Annonces similaires</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Sélectionnées selon vos préférences.</p>
          </div>
          <button 
            onClick={() => onNavigate?.('search', { brand })}
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#E65100] transition-colors"
          >
            Tout voir <ArrowRight size={14} />
          </button>
        </div>
      </Reveal>

      <div className={S.Grid}>
        {similarListings.map((l, idx) => (
          <Reveal key={l.id} animation="fade-in-up" delay={idx * 50} className="md:w-full">
            <SimilarCard 
              listing={l} 
              onClick={() => onNavigate?.('listing-details', { id: l.id, title: l.title })} 
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 md:hidden flex justify-center">
        <button 
          onClick={() => onNavigate?.('search', { brand })}
          className="px-8 py-3 border border-gray-200 rounded-full text-[11px] font-black uppercase tracking-widest text-gray-600 active:bg-gray-50"
        >
          Voir plus d'annonces
        </button>
      </div>
    </section>
  );
};