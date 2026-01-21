import React, { useState, useMemo } from 'react';
import { Clock, Search, ArrowRight, Calendar, Lightbulb } from 'lucide-react';
import { mockTips } from '../data/mockData';
import { Badge } from './ui/Badge';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { BasePageProps } from '../types';

const S = {
  Wrapper: "min-h-screen bg-[#F9FAFB] font-sans",
  Hero: "relative w-full h-[40vh] md:h-[50vh] flex flex-col items-start justify-center overflow-hidden bg-gradient-to-br from-[#E65100] to-[#DD2C14]",
  HeroContent: "relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mt-10 md:mt-16 animate-fade-in-up h-full flex flex-col justify-center",
  FilterBar: "bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-gray-100 mb-20 flex flex-col lg:flex-row items-center justify-between gap-6",
  Grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20",
  TipCard: "group cursor-pointer flex flex-col h-full",
  ImageWrapper: "relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 mb-8 border border-gray-100 shadow-sm transition-all group-hover:shadow-xl duration-500",
};

const Tips: React.FC<BasePageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['Tout', 'Entretien', 'Sécurité', 'Équipement', 'Conduite', 'Législation'];

  const filteredTips = useMemo(() => {
    return mockTips.filter(t => {
      const matchesCat = activeCategory === 'Tout' || t.category === activeCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getDiffVariant = (diff: string): any => {
    if (diff === 'Débutant') return 'success';
    if (diff === 'Expert') return 'error';
    return 'warning';
  };

  return (
    <div className={S.Wrapper}>
      <section className={S.Hero}>
        <div className={S.HeroContent}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 mb-6 w-fit">
              <Lightbulb size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">GUIDE & CONSEILS</span>
            </div>
            <h1 className="text-[2.25rem] md:text-5xl lg:text-6xl font-[900] text-white leading-[1.1] tracking-[-0.04em] mb-4">
              Roulez mieux, <br /> <span className="text-white">entretenez plus intelligemment.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Astuces d'entretien, guides de sécurité et conseils de pilotage pour prolonger la vie de votre deux-roues.
            </p>
        </div>
      </section>

      <Section variant="gray" className="-mt-10 relative z-20 pb-24">
        <div className={S.FilterBar}>
            <div className="flex gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Chercher un conseil..." 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:bg-white outline-none" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
        </div>

        <div className={S.Grid}>
          {filteredTips.map((tip, idx) => (
            <Reveal key={tip.id} animation="fade-in-up" delay={idx * 100}>
              <article onClick={() => onNavigate?.('tip-details', { id: tip.id, title: tip.title })} className={S.TipCard}>
                <div className={S.ImageWrapper}>
                  <img src={tip.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={tip.title} />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <Badge variant="default" size="xs" className="bg-white/95 border-none shadow-sm">{tip.category}</Badge>
                    <Badge variant={getDiffVariant(tip.difficulty)} size="xs" className="border-none shadow-sm">{tip.difficulty}</Badge>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase mb-4">
                    <Calendar size={12} className="text-[#E65100]" /> {tip.date}
                    <Clock size={12} /> {tip.readTime}
                  </div>
                  <h3 className="text-xl font-[900] text-[#0F172A] leading-[1.2] mb-4 group-hover:text-[#E65100] transition-colors line-clamp-2">{tip.title}</h3>
                  <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-8">{tip.summary}</p>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-[#0F172A] group-hover:text-[#E65100] transition-colors">
                    Lire le guide <ArrowRight size={14} className="text-[#E65100]" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Tips;