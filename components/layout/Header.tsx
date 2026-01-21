import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  Plus, 
  Heart, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  LogIn,
  UserPlus,
  List,
  User,
  Bell,
  Settings,
  HelpCircle,
  Newspaper,
  Wrench,
  Info,
  ChevronRight,
  UserCircle,
  // Added missing Search icon import
  Search
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { throttle } from '../../utils/perfUtils';
import { useAppNavigation } from '../../context/NavigationContext';

interface HeaderProps {
  variant?: 'transparent' | 'white';
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'transparent'
}) => {
  const { navigateTo, isLoggedIn, triggerLogin, logout, currentView } = useAppNavigation();

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNewsMenuOpen, setIsNewsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileSheetOpen) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
    return () => document.body.classList.remove('lock-scroll');
  }, [isMobileSheetOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (newsMenuRef.current && !newsMenuRef.current.contains(event.target as Node)) {
        setIsNewsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = useCallback((view: any, params?: any) => {
    setIsMobileSheetOpen(false);
    setIsNewsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigateTo(view, params);
  }, [navigateTo]);

  const isSolid = variant === 'white' || isScrolled;
  
  const linkBaseClasses = `font-bold text-sm transition-all duration-300 focus:outline-none ${
    !isSolid ? 'text-white hover:text-white/70' : 'text-gray-700 hover:text-primary-600'
  }`;

  const headerIconButtonClasses = `flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
    !isSolid ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
  }`;

  const LOGO_COLOR = "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-color.svg";
  const LOGO_WHITE = "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-white.svg";

  const MenuLink = ({ icon: Icon, label, subLabel, onClick, badge, variant = 'default' }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 transition-colors border-b border-gray-50 active:bg-gray-50 ${variant === 'primary' ? 'bg-orange-50/30' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'primary' ? 'bg-[#E65100] text-white shadow-sm' : 'bg-gray-100 text-gray-500'}`}>
          <Icon size={20} strokeWidth={variant === 'primary' ? 2.5 : 2} />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${variant === 'primary' ? 'text-[#E65100]' : 'text-gray-900'}`}>{label}</span>
            {badge && <span className="bg-[#E65100] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">{badge}</span>}
          </div>
          {subLabel && <span className="text-[11px] text-gray-400 font-medium">{subLabel}</span>}
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </button>
  );

  return (
    <>
      <header 
        className={`w-full z-[100] fixed top-0 left-0 transition-all duration-300 ease-in-out flex items-center ${
          isScrolled ? 'h-[56px]' : 'h-[72px]'
        } ${
          isSolid 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' 
            : 'bg-transparent border-transparent'
        }`} 
        role="banner"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-32 flex justify-between items-center h-full">
          
          <button 
            className="flex items-center cursor-pointer group transition-transform active:scale-95" 
            onClick={() => handleNavClick('home')}
            aria-label="Retour à l'accueil"
          >
            <img 
              src={isSolid ? LOGO_COLOR : LOGO_WHITE} 
              alt="MotoScoot.tn" 
              className="h-6 md:h-7 w-auto object-contain transition-all duration-300"
            />
          </button>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8 h-full lg:ml-12">
            <div className="flex items-center gap-8 h-full">
              <button onClick={() => handleNavClick('search')} className={linkBaseClasses}>Annonces</button>
              <div className="relative h-full flex items-center" ref={newsMenuRef}>
                  <button onClick={() => setIsNewsMenuOpen(!isNewsMenuOpen)} className={`flex items-center gap-1 ${linkBaseClasses}`}>
                      Actualités <ChevronDown size={14} className={`transition-transform duration-300 ${isNewsMenuOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                  </button>
                  {isNewsMenuOpen && (
                      <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-left overflow-hidden z-[110]">
                          <button onClick={() => handleNavClick('news')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block">Actualités & Essais</button>
                          <button onClick={() => handleNavClick('tech-specs-brands')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors block">Fiches Techniques</button>
                      </div>
                  )}
              </div>
              <button onClick={() => handleNavClick('garages')} className={linkBaseClasses}>Garages</button>
              <button onClick={() => handleNavClick('tips')} className={linkBaseClasses}>Conseils</button>
              <button onClick={() => handleNavClick('contact')} className={linkBaseClasses}>Contact</button>
            </div>
            
            <div className={`h-6 w-px transition-colors duration-300 ${!isSolid ? 'bg-white/30' : 'bg-gray-200'}`}></div>
            
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <button onClick={() => handleNavClick('dashboard', { tab: 'favorites' })} className={headerIconButtonClasses} aria-label="Favoris">
                      <div className="relative">
                          <Heart size={20} className={favoritesCount > 0 ? "fill-current text-red-500" : ""} />
                          {favoritesCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">{favoritesCount}</span>}
                      </div>
                  </button>
                  <div className="relative" ref={userMenuRef}>
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`flex items-center gap-3 p-1 rounded-full transition-all focus:outline-none ${!isSolid ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                      <div className={`rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md text-[10px] transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}`}>JD</div>
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 animate-fade-in-up origin-top-right z-[110] overflow-hidden">
                        <div className="px-4 py-2 border-b border-gray-50 mb-2">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Ma Session</span>
                        </div>
                        <button onClick={() => handleNavClick('dashboard', { tab: 'overview' })} className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <LayoutDashboard size={16} className="text-gray-400" /> Tableau de bord
                        </button>
                        <button onClick={() => handleNavClick('dashboard', { tab: 'favorites' })} className="w-full text-left px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <Heart size={16} className="text-gray-400" /> Favoris
                        </button>
                        <div className="mx-4 my-2 border-t border-gray-50"></div>
                        <button onClick={() => { setIsUserMenuOpen(false); logout(); }} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                          <LogOut size={16} /> Se Déconnecter
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <button onClick={triggerLogin} className={headerIconButtonClasses} title="Connexion"><LogIn size={20} /></button>
                  <button onClick={triggerLogin} className={headerIconButtonClasses} title="Inscription"><UserPlus size={20} /></button>
                </div>
              )}
              
              <button 
                onClick={() => isLoggedIn ? handleNavClick('deposit') : triggerLogin()} 
                className={`flex items-center justify-center gap-2 px-6 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${
                  isScrolled ? 'h-9 px-5' : 'h-11'
                } ${
                  !isScrolled && variant === 'transparent'
                    ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                <Plus className={isScrolled ? "w-3.5 h-3.5" : "w-4 h-4"} />
                <span className="whitespace-nowrap">Déposer une annonce</span>
              </button>
            </div>
          </nav>

          <div className="lg:hidden flex items-center gap-3">
             <button 
                onClick={() => setIsMobileSheetOpen(true)}
                className={`flex flex-col items-center justify-center w-11 h-11 rounded-xl transition-all group active:scale-90 ${
                  !isSolid ? 'text-white' : 'text-gray-900 bg-gray-50'
                }`}
                aria-label="Ouvrir le menu"
             >
                <div className="w-6 h-[15px] flex flex-col justify-between items-end overflow-hidden">
                   <span className="w-6 h-[2px] bg-current rounded-full transition-all duration-300"></span>
                   <span className="w-4 h-[2px] bg-current rounded-full transition-all duration-300 group-hover:w-6"></span>
                   <span className="w-6 h-[2px] bg-current rounded-full transition-all duration-300"></span>
                </div>
             </button>
          </div>
        </div>
      </header>

      {isMobileSheetOpen && (
        <div 
          ref={mobileSheetRef}
          className="fixed inset-0 z-[200] bg-white flex flex-col h-[100dvh] w-screen overflow-hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
             <button onClick={() => handleNavClick('home')}>
               <img src={LOGO_COLOR} alt="MotoScoot.tn" className="h-5 w-auto" />
             </button>
             <button 
               onClick={() => setIsMobileSheetOpen(false)}
               className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full transition-colors active:scale-90"
             >
               <X size={24} strokeWidth={2.5} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#E65100] text-white flex items-center justify-center text-xl font-black">JD</div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900">Mehdi Jeliti</h4>
                      <span className="text-xs text-gray-500 font-medium">Particulier</span>
                    </div>
                  </div>
                  <button onClick={() => handleNavClick('dashboard', { tab: 'overview' })} className="p-3 bg-white rounded-xl border border-gray-200">
                    <LayoutDashboard size={20} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">
                      <UserCircle size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">Votre compte</span>
                      <span className="text-[11px] text-gray-400 font-medium">Gérez vos annonces et favoris</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setIsMobileSheetOpen(false); triggerLogin(); }}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 shadow-lg"
                  >
                    Connexion / Inscription
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6">
              <span className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Marché</span>
              <MenuLink icon={Search} label="Acheter une moto" onClick={() => handleNavClick('search')} />
              <MenuLink icon={Plus} label="Vendre ma moto" badge="Gratuit" variant="primary" onClick={() => isLoggedIn ? handleNavClick('deposit') : triggerLogin()} />
              {isLoggedIn && <MenuLink icon={Heart} label="Mes favoris" onClick={() => handleNavClick('dashboard', { tab: 'favorites' })} />}
            </div>

            <div className="mt-6">
              <span className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Services</span>
              <MenuLink icon={Newspaper} label="Actualités & Essais" onClick={() => handleNavClick('news')} />
              <MenuLink icon={Wrench} label="Garages & Experts" onClick={() => handleNavClick('garages')} />
              <MenuLink icon={Settings} label="Conseils & Guides" onClick={() => handleNavClick('tips')} />
            </div>

            <div className="mt-8 px-6 pb-6">
              {isLoggedIn && (
                <button 
                  onClick={() => { setIsMobileSheetOpen(false); logout(); }}
                  className="w-full py-4 flex items-center justify-center gap-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm border border-red-100"
                >
                  <LogOut size={18} /> Se déconnecter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;