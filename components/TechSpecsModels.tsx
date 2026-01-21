import React, { useState, useMemo } from 'react';
import { Search, Layers, ArrowRight, Zap, Gauge } from 'lucide-react';
import { mockTechSpecs } from '../data/mockData';

interface TechSpecsModelsProps {
  brand: string;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const TechSpecsModels: React.FC<TechSpecsModelsProps> = ({ brand, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("Tout");

  const brandModels = useMemo(() => mockTechSpecs.filter(spec => spec.brand === brand), [brand]);
  
  const availableYears = useMemo(() => {
    const years = (Array.from(new Set(brandModels.map(m => m.year.toString()))) as string[]).sort((a, b) => b.localeCompare(a));
    return ["Tout", ...years];
  }, [brandModels]);

  const filteredModels = useMemo(() => {
    return brandModels.filter(model => {
      const matchesSearch = model.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === "Tout" || model.year.toString() === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [brandModels, searchQuery, yearFilter]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <section className="relative w-full h-[55vh] md:h-[50vh] lg:h-[52vh] flex flex-col items-start justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#AF2E13] to-[#E65100] opacity-95 mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 mt-10 md:mt-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 mb-6">
              <Layers size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Fiches Techniques • {brand}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-6">La gamme <br /><span className="text-white">{brand} en détail.</span></h1>
            <p className="text-white/80 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">Spécifications techniques complètes de tous les modèles {brand}.</p>
        </div>
      </section>

      <main className="max-w-[1280px] mx-auto px-6 -mt-10 relative z-20 pb-24">
        <div className="bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-gray-100 mb-20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
                {availableYears.map(year => (
                    <button key={year} onClick={() => setYearFilter(year)} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${yearFilter === year ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:bg-gray-50'}`}>{year === 'Tout' ? 'Toutes années' : year}</button>
                ))}
            </div>
            <div className="relative w-full lg:w-96 group">
                <input type="text" placeholder={`Modèle ${brand}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:bg-white outline-none transition-all" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredModels.map((spec, idx) => (
                <article key={spec.id} onClick={() => onNavigate?.('tech-specs-details', { id: spec.id })} className="group cursor-pointer flex flex-col animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 mb-8 border border-gray-100 shadow-sm transition-all group-hover:shadow-xl duration-500">
                        <img src={spec.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={spec.model} />
                        <div className="absolute top-6 left-6"><span className="px-4 py-1.5 bg-white/95 rounded-xl text-[9px] font-black uppercase shadow-sm">{spec.year}</span></div>
                    </div>
                    <div className="px-2">
                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                            <div className="flex items-center gap-1.5"><Zap size={12} className="text-[#E65100]" /><span>{spec.engine.cc}</span></div>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <div className="flex items-center gap-1.5"><Gauge size={12} /><span>{spec.category}</span></div>
                        </div>
                        <h3 className="text-xl font-[900] text-[#0F172A] leading-[1.2] mb-4 group-hover:text-[#E65100] transition-colors">{spec.model}</h3>
                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-[#0F172A]">Détails <ArrowRight size={14} className="text-[#E65100]" /></div>
                            <span className="text-sm font-black text-[#E65100]">{spec.priceNew}</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
      </main>
    </div>
  );
};

export default TechSpecsModels;