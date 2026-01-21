import React, { useState, useMemo, useEffect } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Calendar, 
  Newspaper, 
  Home,
  ChevronRight,
  ArrowUpDown,
  Check,
  X,
  Search
} from 'lucide-react';
import { mockArticles } from '../data/mockData';
import { Badge } from './ui/Badge';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { BasePageProps } from '../types';

const S = {
  Wrapper: "min-h-screen bg-white md:bg-[#F9FAFB] font-sans overflow-x-hidden",
  Hero: "relative w-full h-[35vh] md:h-[45vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#E65100] to-[#DD2C14]",
  HeroContent: "relative z-10 w-full max-w-7xl mx-auto px-6 text-center animate-fade-in-up flex flex-col items-center justify-center h-full pt-12 md:pt-0",
  DesktopGrid: "hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10",
  ArticleCard: "group cursor-pointer flex flex-col h-full bg-white p-3.5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-100 border border-gray-100 transition-all duration-500",
  ImageWrapper: "relative aspect-[16/10] overflow-hidden rounded-t-[14px] -mt-3.5 -mx-3.5 bg-gray-100 mb-6 p-0",
  ArticleTitle: "text-xl font-[900] text-[#0F172A] leading-[1.2] tracking-tight mb-4 group-hover:text-[#E65100] transition-colors line-clamp-2",
  ArticleSummary: "text-gray-500 text-sm font-medium line-clamp-3 leading-relaxed mb-8",
  MobileControlContainer: "md:hidden px-6 mb-8 -mt-7 relative z-40",
  MobileControlBar: "bg-white rounded-2xl border border-gray-100 shadow-lg flex items-center justify-between px-4 py-3.5",
  SortButton: "flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-[11px] font-black text-gray-700 uppercase tracking-wider active:scale-95 transition-all border border-gray-100",
  Breadcrumb: "flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tight",
  RecCard: "flex items-center gap-4 mb-6 group active:scale-[0.98] transition-transform",
  RecImage: "w-24 h-24 rounded-[18px] object-cover bg-gray-100 shrink-0 shadow-sm",
  RecContent: "flex-1 min-w-0"
};

const News: React.FC<BasePageProps> = ({ onNavigate, onGoHome }) => {
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  const categories = ['Tout', 'Nouveautés', 'Essais', 'Tech', 'Scooters'];

  const parseDate = (dateStr: string) => {
    const months: Record<string, number> = { 
      'Jan': 0, 'Fév': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Juin': 5, 
      'Juil': 6, 'Août': 7, 'Sept': 8, 'Oct': 9, 'Nov': 10, 'Déc': 11 
    };
    const parts = dateStr.split(' ');
    if (parts.length < 3) return 0;
    const day = parseInt(parts[0]);
    const month = months[parts[1].substring(0, 3)] || 0;
    const year = parseInt(parts[2]);
    return new Date(year, month, day).getTime();
  };

  const filteredAndSortedArticles = useMemo(() => {
    let result = mockArticles.filter(a => {
      const matchesCategory = activeCategory === 'Tout' || a.category === activeCategory;
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      const timeA = parseDate(a.date);
      const timeB = parseDate(b.date);
      return sortBy === 'recent' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  useEffect(() => {
    if (isSortMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSortMenuOpen]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setIsSortMenuOpen(false);
  };

  return (
    <div className={S.Wrapper}>
      <section className={S.Hero}>
        <div className={S.HeroContent}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30 mb-4 w-fit">
              <Newspaper size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Actus & Essais</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
              L'actu moto <br className="md:hidden" /> en accès privilégié.
            </h1>
            <p className="hidden md:block text-white/90 text-lg font-medium max-w-xl opacity-90">
              Essais privés, nouveautés et guides d'achat par nos experts.
            </p>
        </div>
      </section>

      <div className="md:hidden flex flex-col w-full">
        <div className={S.MobileControlContainer}>
          <div className={S.MobileControlBar}>
            <nav className={S.Breadcrumb} aria-label="Breadcrumb">
              <button onClick={onGoHome} className="hover:text-[#E65100] transition-colors flex items-center gap-1">
                <Home size={10} />
              </button>
              <ChevronRight size={8} className="text-gray-300" />
              <span className="text-gray-900 font-black">Accueil</span>
              <ChevronRight size={8} className="text-gray-300" />
              <span className="text-gray-400 font-black">Actualités</span>
            </nav>

            <button 
              onClick={() => setIsSortMenuOpen(true)}
              className={`${S.SortButton} ${activeCategory !== 'Tout' ? 'border-[#E65100] bg-orange-50' : ''}`}
            >
              <ArrowUpDown size={14} className={activeCategory !== 'Tout' ? "text-[#E65100]" : "text-gray-400"} />
              <span>{activeCategory === 'Tout' ? 'Trier' : activeCategory}</span>
            </button>
          </div>
        </div>

        {isSortMenuOpen && (
          <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="w-full bg-white rounded-t-[32px] p-8 pb-12 shadow-2xl animate-fade-in-up border-t border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Trier et Filtrer</h3>
                <button onClick={() => setIsSortMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500"><X size={20}/></button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Catégories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border ${activeCategory === cat ? 'bg-[#E65100] text-white border-[#E65100] shadow-md' : 'bg-white text-gray-600 border-gray-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Ordre d'affichage</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSortBy('recent')}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all border ${sortBy === 'recent' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-transparent'}`}
                    >
                      Plus récents {sortBy === 'recent' && <Check size={14} />}
                    </button>
                    <button 
                      onClick={() => setSortBy('oldest')}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all border ${sortBy === 'oldest' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-transparent'}`}
                    >
                      Plus anciens {sortBy === 'oldest' && <Check size={14} />}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSortMenuOpen(false)}
                  className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl mt-4"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-6 pb-20 w-full">
          {filteredAndSortedArticles.length > 0 ? (
            <div className="space-y-1 mt-4">
              {filteredAndSortedArticles.map((article, idx) => (
                <Reveal key={article.id} animation="fade-in-up" delay={idx * 50}>
                  <div className={S.RecCard} onClick={() => onNavigate?.('article-details', { id: article.id, title: article.title })}>
                    <img src={article.image} className={S.RecImage} alt="" />
                    <div className={S.RecContent}>
                      <div className="flex items-center justify-between mb-1.5">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleCategoryChange(article.category); }}
                          className="text-[9px] font-[900] text-[#E65100] uppercase tracking-widest"
                        >
                          {article.category}
                        </button>
                        <span className="text-[9px] font-black text-gray-300 uppercase">{article.date}</span>
                      </div>
                      <h4 className="text-[14px] font-[800] text-gray-900 leading-[1.3] mb-2 line-clamp-2 tracking-tight">{article.title}</h4>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                        <Clock size={11} className="text-gray-300" />
                        <span>{article.readTime} de lecture</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-bold">Aucun article trouvé.</p>
              <button onClick={() => { setActiveCategory('Tout'); setSearchQuery(''); }} className="mt-4 text-[#E65100] font-black text-xs uppercase underline">Afficher tout</button>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="px-6 md:px-20 lg:px-32 relative z-20">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 flex items-center w-full md:max-w-4xl mx-auto -mt-8 relative z-30">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 px-1">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)} 
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-[900] uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#0F172A] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="h-8 w-px bg-gray-100 mx-3 hidden md:block"></div>

              <div className="relative hidden md:block w-64 mr-2 group">
                 <input 
                   type="text" 
                   placeholder="Rechercher un article..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[11px] font-bold text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-primary-100 transition-all" 
                 />
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E65100] w-4 h-4 transition-colors" />
              </div>
          </div>
        </div>

        <Section variant="gray" className="pb-24 pt-16">
          <div className={S.DesktopGrid}>
            {filteredAndSortedArticles.map((article, idx) => (
              <Reveal key={article.id} animation="fade-in-up" delay={idx * 100}>
                <article onClick={() => onNavigate?.('article-details', { id: article.id, title: article.title })} className={S.ArticleCard}>
                  <div className={S.ImageWrapper}>
                    <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                  </div>
                  <div className="px-3">
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase mb-4">
                      <div className="flex items-center gap-1.5"><Calendar size={12} className="text-[#E65100]" /> {article.date}</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveCategory(article.category); }}
                        className="transition-transform active:scale-95"
                      >
                        <Badge variant="primary" size="xs" className="bg-white/95 border-none shadow-sm hover:bg-primary-100">{article.category}</Badge>
                      </button>
                    </div>
                    <h3 className={S.ArticleTitle}>{article.title}</h3>
                    <p className={S.ArticleSummary}>{article.summary}</p>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase text-[#0F172A] group-hover:text-[#E65100] transition-colors">Découvrir <ArrowRight size={14} className="text-[#E65100]" /></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {filteredAndSortedArticles.length === 0 && (
            <div className="py-32 text-center">
              <h3 className="text-2xl font-black text-gray-300 italic">Aucun article trouvé.</h3>
              <button onClick={() => { setActiveCategory('Tout'); setSearchQuery(''); }} className="mt-4 text-[#E65100] font-black uppercase underline">Réinitialiser</button>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
};

export default News;