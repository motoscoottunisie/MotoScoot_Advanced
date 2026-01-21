
import React from 'react';
import { Heart, MapPin, ShieldCheck, User, ArrowRight, Home, ChevronRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { mockListings } from '../data/mockData';
import { BasePageProps } from '../types';

const Favorites: React.FC<BasePageProps> = ({ onGoHome, onNavigate }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const savedListings = mockListings.filter(listing => favorites.listings.includes(listing.id));

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 pt-28 pb-8">
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors"><Home className="w-4 h-4 mr-1" /><span>Accueil</span></button>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
          <span className="font-semibold text-gray-900">Mes Favoris</span>
        </div>

        <div className="flex items-end justify-between mb-8">
           <div><h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Ma sélection</h1><p className="text-gray-500 font-medium">Toutes vos annonces sauvegardées.</p></div>
           <div className="hidden md:block"><span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl font-bold border border-primary-100">{savedListings.length} annonces</span></div>
        </div>

        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedListings.map((listing, index) => (
                <article key={listing.id} onClick={() => onNavigate?.('listing-details', { id: listing.id, title: listing.title })} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 cursor-pointer flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite('listing', listing.id); }} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 shadow-sm z-10 animate-heartbeat"><Heart size={18} fill="currentColor" /></button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                      <div className="flex flex-col mb-2"><h3 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 leading-tight">{listing.title}</h3><span className="text-lg font-black text-primary-600 uppercase tracking-tighter mt-1">{listing.price}</span></div>
                      <div className="flex items-center text-xs text-gray-500 font-medium mb-4"><MapPin size={12} className="mr-1 text-primary-500" />{listing.location}</div>
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              {listing.sellerType === 'Pro' ? <ShieldCheck size={14} className="text-primary-600" /> : <User size={14} className="text-gray-400" />}
                              <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{listing.seller}</span>
                          </div>
                          <span className="text-primary-600 text-xs font-bold flex items-center gap-1 uppercase tracking-widest">Voir <ArrowRight size={12} /></span>
                      </div>
                  </div>
                </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 text-center shadow-sm">
             <Heart className="w-16 h-16 text-gray-200 mb-6" />
             <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun favori</h2>
             <button onClick={() => onNavigate?.('search')} className="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg mt-6">Explorer les annonces</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
