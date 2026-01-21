import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  ChevronDown, 
  Home, 
  ChevronRight, 
  ChevronLeft,
  SlidersHorizontal,
  ShieldCheck,
  Star,
  X,
  Check,
  Clock,
  Wrench,
  Settings2,
  Navigation
} from 'lucide-react';
import { mockGarages, tunisianCities } from '../data/mockData';
import { calculateDistance } from '../utils/geoUtils';
import { BasePageProps } from '../types';
import { Badge } from './ui/Badge';
import { Section } from './ui/Section';
import { GarageCard } from './home/GarageCard';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { Reveal } from './ui/Reveal';

const S = {
  Page: "min-h-screen bg-[#f9fafb] font-sans pb-20",
  Container: "max-w-[1360px] mx-auto px-6 md:px-16 lg:px-24 w-full",
  Header: "flex flex-col md:flex-row md:items-end justify-between pt-10 pb-10 md:pt-14 md:pb-12 gap-6",
  Title: "text-[30px] md:text-[46px] font-bold text-[#374151] tracking-tighter mb-0",
  Count: "text-[#e6580b] text-[18px] font-semibold leading-normal tracking-normal font-sans",
  MainLayout: "flex flex-col lg:flex-row gap-10 items-start",
  SidebarWrapper: "hidden lg:block w-[267px] flex-shrink-0 pb-10",
  GridWrapper: "flex-1 w-full min-w-0",
  Empty: "flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 text-center",
  Pagination: "flex items-center justify-center gap-2 mt-16 pb-10",
  PageBtn: (active: boolean) => `w-11 h-11 flex items-center justify-center rounded-xl font-bold transition-all ${active ? 'bg-[#E65100] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
  
  Breadcrumb: "flex items-center gap-2 text-[14px] font-semibold tracking-normal text-gray-400",
  BreadcrumbItem: "flex items-center gap-1.5 hover:text-[#E65100] transition-colors whitespace-nowrap",
  BreadcrumbSeparator: "text-gray-300 shrink-0",
  BreadcrumbCurrent: "text-gray-900 whitespace-nowrap",

  FilterBox: "bg-white rounded-2xl border border-gray-100 p-4 xl:p-5 shadow-sm",
  Select: "w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[14px] font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer transition-all"
};

const specialistOptions = ["Moto", "Scooter", "Quad"];
const serviceOptions = [
  "Entretien courant (Vidange, filtres)",
  "Pneumatiques (Montage, équilibrage)",
  "Freinage (Plaquettes, disques, liquide)",
  "Kit chaîne / Transmission (Courroie, galets)",
  "Révision constructeur (Garantie préservée)",
  "Diagnostic électronique / Passage à la valise",
  "Électricité et Batterie",
  "Suspensions (Joints spi, vidange fourche)",
  "Moteur (Embrayage, soupapes, distribution)",
  "Carburation / Injection",
  "Bridage / Débridage (Permis A2)",
  "Pose d'accessoires et équipements",
  "Préparation contrôle technique",
  "Nettoyage et entretien esthétique"
];

const Garages: React.FC<BasePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'recent' | 'proximity'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'denied' | 'error'>('idle');

  const itemsPerPage = 12;

  const handleLocationDetect = useCallback(() => {
    if (locationStatus === 'success') {
      setLocationStatus('idle');
      setUserLocation(null);
      if (sortBy === 'proximity') setSortBy('rating');
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus('success');
        setSortBy('proximity');
      },
      (error) => {
        setLocationStatus(error.code === 1 ? 'denied' : 'error');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [locationStatus, sortBy]);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCity, selectedSpecialist, selectedService, onlyVerified, sortBy, userLocation]);

  const filteredAndSortedGarages = useMemo(() => {
    let result = mockGarages.map(g => {
      let distance = null;
      if (userLocation && g.coordinates) {
        distance = calculateDistance(userLocation.lat, userLocation.lng, g.coordinates.lat, g.coordinates.lng);
      }
      return { ...g, distance };
    });

    result = result.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = !selectedCity || selectedCity === "Toutes les villes" || g.address?.includes(selectedCity) || g.location === selectedCity;
      const matchesVerified = !onlyVerified || g.isVerified;
      
      const specialistLower = selectedSpecialist.toLowerCase();
      const matchesSpecialist = !selectedSpecialist || 
        g.specialties?.some(s => s.toLowerCase().includes(specialistLower)) || 
        g.specialty?.toLowerCase().includes(specialistLower) ||
        g.description?.toLowerCase().includes(specialistLower);

      const serviceBaseName = selectedService.split(' (')[0].toLowerCase();
      const matchesService = !selectedService || 
        g.specialties?.some(s => s.toLowerCase().includes(serviceBaseName)) || 
        g.services?.some(s => s.name.toLowerCase().includes(serviceBaseName)) ||
        g.description?.toLowerCase().includes(serviceBaseName);

      return matchesSearch && matchesCity && matchesVerified && matchesSpecialist && matchesService;
    });

    result.sort((a, b) => {
      if (sortBy === 'proximity' && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.id - a.id;
    });

    return result;
  }, [searchQuery, selectedCity, selectedSpecialist, selectedService, onlyVerified, sortBy, userLocation]);

  const totalPages = Math.ceil(filteredAndSortedGarages.length / itemsPerPage);
  const paginatedGarages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedGarages.slice(start, start + itemsPerPage);
  }, [filteredAndSortedGarages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedSpecialist("");
    setSelectedService("");
    setOnlyVerified(false);
    setSortBy('rating');
    setCurrentPage(1);
    setUserLocation(null);
    setLocationStatus('idle');
  };

  return (
    <div className={S.Page}>
      <div className={S.Container}>
        <header className={S.Header}>
          <div className="flex flex-col w-full">
            <h1 className={S.Title}>Garages & Experts</h1>
            <p className={S.Count}>
              {isFiltering ? 'Calcul en cours...' : `${filteredAndSortedGarages.length} ${filteredAndSortedGarages.length > 1 ? 'experts disponibles' : 'expert disponible'}`}
            </p>
            
            <div className="flex items-center justify-between mt-6 md:mt-9 gap-4">
              <nav className={S.Breadcrumb} aria-label="Fil d'ariane">
                 <button onClick={() => onNavigate?.('home')} className={S.BreadcrumbItem}>
                    <Home size={14} strokeWidth={2.5} /> Accueil
                 </button>
                 <ChevronRight size={12} className={S.BreadcrumbSeparator} />
                 <div className={S.BreadcrumbCurrent}>Garages</div>
              </nav>

              <div className="flex items-center gap-2 md:hidden">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)} 
                  className="flex items-center justify-center w-11 h-11 bg-gray-900 text-white rounded-xl shadow-md active:scale-95 transition-all"
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-10 pr-10 h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 outline-none appearance-none focus:border-primary-600 transition-all cursor-pointer shadow-sm"
              >
                <option value="rating">Mieux notés</option>
                <option value="proximity" disabled={locationStatus !== 'success'}>Plus proches</option>
                <option value="name">Nom (A-Z)</option>
                <option value="recent">Plus récents</option>
              </select>
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-5 h-11 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all">
              <SlidersHorizontal size={18} /> Filtres
            </button>
          </div>
        </header>

        <div className={S.MainLayout}>
          <aside className={S.SidebarWrapper}>
            <div className={S.FilterBox}>
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
                <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-600" /> Filtrer
                </h3>
                <button onClick={handleReset} className="text-[10px] font-black text-gray-400 uppercase hover:text-primary-600 transition-colors">Reset</button>
              </div>

              <div className="space-y-4">
                <div className="mb-2">
                   <label className={`flex items-center justify-between cursor-pointer p-4 rounded-xl border transition-all ${locationStatus === 'success' ? 'bg-success-50 border-success-100' : 'bg-gray-50 border-gray-100 hover:border-primary-200'}`}>
                      <div className="flex items-center gap-3">
                         {locationStatus === 'loading' ? (
                            <Navigation size={18} className="text-primary-600 animate-spin" />
                         ) : (
                            <MapPin size={18} className={locationStatus === 'success' ? 'text-success-600' : 'text-gray-400'} />
                         )}
                         <span className={`text-sm font-bold ${locationStatus === 'success' ? 'text-success-700' : 'text-[#6b7280]'}`}>
                            {locationStatus === 'loading' ? 'Chargement...' : locationStatus === 'success' ? 'Actif' : 'Proximité'}
                         </span>
                      </div>
                      <div className="relative">
                         <input 
                            type="checkbox" 
                            checked={locationStatus === 'success'} 
                            onChange={handleLocationDetect} 
                            className="sr-only" 
                         />
                         <div className={`w-11 h-6 rounded-full transition-colors ${locationStatus === 'success' ? 'bg-success-500' : 'bg-gray-200'}`}></div>
                         <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${locationStatus === 'success' ? 'translate-x-5' : ''}`}></div>
                      </div>
                   </label>
                </div>

                <label className={`flex items-center justify-between cursor-pointer p-4 rounded-xl border transition-all ${onlyVerified ? 'bg-primary-50 border-primary-100' : 'bg-gray-50 border-gray-100 hover:border-primary-200'}`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className={onlyVerified ? 'text-primary-600' : 'text-gray-400'} />
                    <span className={`text-sm font-bold ${onlyVerified ? 'text-primary-700' : 'text-[#6b7280]'}`}>Vérifiés</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="sr-only" />
                    <div className={`w-11 h-6 rounded-full transition-colors ${onlyVerified ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${onlyVerified ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>

                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Nom du garage..." 
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[14px] font-bold text-[#374151] caret-primary-600 outline-none transition-all focus:bg-white focus:border-primary-600" 
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)} 
                    className={S.Select}
                  >
                    <option value="">Toutes les villes</option>
                    {tunisianCities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedSpecialist} 
                    onChange={(e) => setSelectedSpecialist(e.target.value)} 
                    className={S.Select}
                  >
                    <option value="">Spécialiste</option>
                    {specialistOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)} 
                    className={S.Select}
                  >
                    <option value="">Prestations</option>
                    {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </aside>

          <main className={S.GridWrapper}>
            <ErrorBoundary>
              {isFiltering ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-[14px] h-[320px] animate-pulse border border-gray-100 shadow-sm" />
                  ))}
                </div>
              ) : filteredAndSortedGarages.length === 0 ? (
                <div className={S.Empty}>
                  <p className="text-gray-500 font-medium text-lg mb-2">Aucun expert trouvé</p>
                  <p className="text-gray-500 text-sm mb-8">Essayez de modifier vos critères.</p>
                  <button onClick={handleReset} className="px-8 py-4 bg-[#E65100] text-white font-black rounded-xl text-[10px] uppercase tracking-widest">Voir tous les garages</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedGarages.map((garage, index) => (
                      <Reveal key={garage.id} animation="fade-in-up" delay={index % 12 * 50} className="h-full">
                        <GarageCard 
                          garage={garage} 
                          onClick={() => onNavigate?.('garage-details', { id: garage.id, name: garage.name })} 
                        />
                      </Reveal>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <nav className={S.Pagination} aria-label="Pagination">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-200 active:scale-90'}`}
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx + 1}
                          onClick={() => handlePageChange(idx + 1)}
                          className={S.PageBtn(currentPage === idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      ))}

                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-200 active:scale-90'}`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[150] bg-white flex flex-col animate-fade-in-up">
           <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-20">
            <div className="flex flex-col">
              <h3 className="font-black text-xl text-gray-900 tracking-tight">Filtres Experts</h3>
              <button onClick={handleReset} className="text-[10px] font-black text-primary-600 uppercase tracking-widest text-left">Réinitialiser</button>
            </div>
            <button onClick={() => setIsMobileFilterOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-900 rounded-full active:scale-90 transition-all"><X size={22} strokeWidth={2.5} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100">
               <button onClick={() => { handleLocationDetect(); setIsMobileFilterOpen(false); }} className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                        <Navigation size={20} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-base font-bold text-primary-900">Autour de moi</span>
                        <span className="text-[10px] font-black text-primary-600 uppercase">Utiliser le GPS</span>
                      </div>
                  </div>
                  <ChevronRight size={18} className="text-primary-300" />
               </button>
            </div>

            <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100">
               <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-primary-600" />
                    <span className="text-base font-bold text-primary-900">Garages Vérifiés</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="sr-only" />
                    <div className={`w-12 h-7 rounded-full transition-colors ${onlyVerified ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${onlyVerified ? 'translate-x-5' : ''}`}></div>
                  </div>
               </label>
            </div>

            <div className="space-y-6">
               <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 text-base font-bold text-[#111827] outline-none focus:bg-white" 
                    placeholder="Nom du garage..." 
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
               </div>

               <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Ville / Gouvernorat</label>
                <div className="relative">
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)} 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[#111827] appearance-none"
                  >
                    <option value="">Toutes les villes</option>
                    {tunisianCities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
               </div>

               <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Spécialiste</label>
                <div className="relative">
                  <select 
                    value={selectedSpecialist} 
                    onChange={(e) => setSelectedSpecialist(e.target.value)} 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[#111827] appearance-none"
                  >
                    <option value="">Tous les types</option>
                    {specialistOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
               </div>

               <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Prestations</label>
                <div className="relative">
                  <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)} 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[#111827] appearance-none"
                  >
                    <option value="">Tous les services</option>
                    {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
               </div>

               <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Trier par</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'rating', label: 'Mieux notés', icon: Star },
                    { id: 'proximity', label: 'Plus proches', icon: Navigation, disabled: locationStatus !== 'success' },
                    { id: 'name', label: 'Ordre alphabétique', icon: Check },
                    { id: 'recent', label: 'Plus récents', icon: Clock }
                  ].map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => !opt.disabled && setSortBy(opt.id as any)}
                      disabled={opt.disabled}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold border transition-all ${sortBy === opt.id ? 'bg-gray-900 text-white border-gray-900' : opt.disabled ? 'opacity-40 bg-gray-50 text-gray-400 border-transparent' : 'bg-gray-50 text-gray-600 border-transparent'}`}
                    >
                      <div className="flex items-center gap-2">
                        <opt.icon size={16} />
                        {opt.label}
                      </div>
                      {sortBy === opt.id && <Check size={16} />}
                    </button>
                  ))}
                </div>
               </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-20 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-[#E65100] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest active:scale-[0.98]">
               Voir les résultats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Garages;