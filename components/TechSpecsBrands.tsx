import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { brandsMoto } from '../data/mockData';

interface TechSpecsBrandsProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const BrandCard: React.FC<{ brand: string, onClick: () => void }> = ({ brand, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-500 transition-all duration-300 flex flex-col items-center justify-center h-32 w-full relative overflow-hidden active:scale-95"
    >
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-primary-500" />
        </div>
        <div className="w-10 h-10 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
            <Layers size={20} />
        </div>
        <span className="text-sm md:text-base font-[900] text-[#0F172A] group-hover:text-primary-600 transition-colors text-center truncate w-full px-2 uppercase tracking-tight">
          {brand}
        </span>
    </button>
  );
};

const TechSpecsBrands: React.FC<TechSpecsBrandsProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brandsMoto.filter(brand => 
    brand.toLowerCase().includes(searchQuery.toLowerCase()) && brand !== "Autre"
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <section className="relative w-full h-[55vh] md:h-[50vh] lg:h-[52vh] flex flex-col items-start justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: "url('https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp')" }} />
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#AF2E13] to-[#E65100] opacity-95 mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 mt-10 md:mt-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 mb-6">
              <Layers size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Fiches Techniques</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-6">Toutes les données, <br /><span className="text-white">en un seul endroit.</span></h1>
            <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">Consultez les caractéristiques détaillées, performances et dimensions de plus de 200 modèles disponibles sur le marché.</p>
        </div>
      </section>

      <main className="max-w-[1280px] mx-auto px-6 -mt-10 relative z-20 pb-24">
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-gray-100 mb-20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                <button className="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-[#0F172A] text-white shadow-lg">Toutes les marques</button>
            </div>
            <div className="relative w-full lg:w-96 group">
                <input type="text" placeholder="Rechercher une marque..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white outline-none transition-all" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E65100]" size={18} />
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBrands.map((brand, idx) => (
                <div key={brand} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <BrandCard brand={brand} onClick={() => onNavigate?.('tech-specs-models', { brand })} />
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default TechSpecsBrands;