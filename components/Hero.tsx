
import React from 'react';
import { SearchBar } from './search/SearchBar';
import { CategoryNav } from './search/CategoryNav';

// --- STYLES (Pattern "S") ---
const S = {
  // Mobile: 100dvh (Dynamic Viewport Height) pour un plein écran sans scroll
  // Tablette: 50vh | Desktop: 80vh
  Wrapper: "relative w-full flex flex-col font-sans bg-primary-50 overflow-hidden h-[100dvh] md:h-[50vh] lg:h-[80vh]",
  BgContainer: "absolute inset-0 overflow-hidden z-0",
  Overlay: "absolute inset-0 bg-gradient-to-b from-[#AF2E13] to-[#E65100] opacity-95 mix-blend-multiply",
  BgImage: "absolute inset-0 w-full h-full object-cover",
  
  // ContentWrapper : h-full pour permettre la distribution verticale
  // Padding latéral constant pour l'alignement gauche
  ContentWrapper: "relative z-10 flex flex-col w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 h-full",
  
  // TextSection : Ancrage en bas (justify-end) et alignement gauche (items-start) sur mobile
  // pb-14 : Marge moyenne de sécurité sous la barre de recherche
  TextSection: "w-full flex-1 flex flex-col justify-end items-start pb-14 md:pb-0 md:justify-center md:space-y-10",
  
  // TitleGroup : Bloc regroupé avec espacement vertical minimal
  TitleGroup: "w-full flex flex-col items-start text-left gap-1.5 md:gap-4",
  
  // Badge : Taille fixée à 11px pour mobile
  Badge: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[11px] md:text-sm font-bold uppercase tracking-wide mb-1 animate-fade-in-up",
  
  // H1: Taille ajustée pour mobile à 37px (text-[2.313rem]), titre sur deux lignes
  // Desktop/Tablette : font-800 (extrabold) et 48px
  MainTitle: "font-extrabold text-[2.313rem] md:text-[48px] tracking-tight leading-[1.05] drop-shadow-sm text-white",
  
  // Subtitle: Taille ajustée à 15px sur mobile (text-[15px])
  // Desktop/Tablette : font-500 (medium), 20px
  // Légère réduction de l'espacement avec la barre de recherche : md:mb-6
  Subtitle: "text-[15px] md:text-[20px] font-medium opacity-90 text-white/90 max-w-[280px] sm:max-w-sm md:max-w-none leading-snug md:mb-6",
  
  // SearchBarContainer : Espacement significatif pour isoler la zone d'action
  // mt-20 : Spacing mobile
  // md:mt-0 : On se repose sur le margin-bottom du sous-titre pour l'espace sur desktop
  SearchBarContainer: "w-full mt-20 md:mt-0"
};

interface HeroProps {
  onSearch?: (filters: any) => void;
  onNavigate?: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onNavigate }) => {
  
  const handleCategoryClick = (categoryLabel: string) => {
    if (onSearch) {
      const isAccessorySub = ["Casques", "Vestes", "Gants"].includes(categoryLabel);
      onSearch({
        type: isAccessorySub || categoryLabel === "Accessoires" ? "Accessoires" : categoryLabel,
        search: isAccessorySub ? categoryLabel.slice(0, -1) : "",
        brand: "",
        model: "",
        location: ""
      });
    }
  };

  return (
    <div className={S.Wrapper}>
      <div className={S.BgContainer}>
        <img 
          src="https://www.magma-studio.tn/portfolio2/hero_section-background_mobile.webp"
          className={`${S.BgImage} md:hidden`}
          alt=""
          // @ts-ignore
          fetchPriority="high"
          loading="eager"
        />
        <img 
          src="https://magma-studio.tn/portfolio2/-hero-background.webp"
          className={`${S.BgImage} hidden md:block`}
          alt=""
          // @ts-ignore
          fetchPriority="high"
          loading="eager"
        />
        <div className={S.Overlay} />
      </div>

      <div className={S.ContentWrapper}>
        <div className={S.TextSection}>
          <div className={S.TitleGroup}>
            <div className={S.Badge}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500"></span>
              </span>
              + 500 annonces en ligne
            </div>

            <h1 className={S.MainTitle}>
              Achetez ou vendez <br className="md:hidden" />
              votre moto d'occasion
            </h1>
            
            <p className={S.Subtitle}>
              La référence en Tunisie pour acheter ou vendre votre moto d’occasion en quelques clics.
            </p>
          </div>

          <div className={S.SearchBarContainer}>
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Version Desktop/Tablette : Icônes directement sous la barre de recherche */}
          {/* Augmentation de l'espace vertical : md:mt-44 (au lieu de md:mt-32) */}
          <div className="hidden md:block w-full mt-8 md:mt-44">
            <CategoryNav onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
