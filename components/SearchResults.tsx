import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SlidersHorizontal, LayoutGrid, List as ListIcon, Home, ChevronRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useListingFilters, FilterState } from '../hooks/useListingFilters';
import { useListings } from '../hooks/useListings';
import { useSearchSEO } from '../hooks/useSearchSEO';
import { ListingCard } from './search/ListingCard';
import { FilterSidebar } from './search/FilterSidebar';
import { SortDropdown } from './search/SortDropdown';
import { MobileFilters } from './search/MobileFilters';
import { SearchPagination } from './search/SearchPagination';
import { ListingCardSkeleton } from './search/ListingCardSkeleton';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { BasePageProps } from '../types';
import SEO from './common/SEO';

const S = {
  Page: "min-h-screen bg-[#f9fafb] font-sans pb-20",
  Container: "max-w-[1360px] mx-auto px-6 md:px-16 lg:px-24 w-full",
  Header: "flex flex-col md:flex-row md:items-end justify-between pt-10 pb-10 md:pt-14 md:pb-12 gap-6",
  Title: "text-[30px] md:text-[46px] font-bold text-[#374151] tracking-tighter mb-0",
  Count: "text-[#e6580b] text-[18px] font-semibold leading-normal tracking-normal font-sans",
  MainLayout: "flex flex-col lg:flex-row gap-10 items-start",
  SidebarWrapper: "hidden lg:block w-[267px] flex-shrink-0 pb-10 lg:sticky lg:top-24 [contain:layout_style]",
  GridWrapper: "flex-1 w-full min-w-0 [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-transform",
  ViewSwitcher: "flex items-center bg-gray-100 p-1 rounded-xl",
  ViewBtn: (active: boolean) => `p-2 rounded-lg transition-all ${active ? 'bg-white text-[#E65100] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`,
  Empty: "flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 text-center",
  Breadcrumb: "hidden md:flex items-center gap-2 text-[14px] font-semibold tracking-normal text-gray-400",
  BreadcrumbItem: "flex items-center gap-1.5 hover:text-[#E65100] transition-colors whitespace-nowrap",
  BreadcrumbSeparator: "text-gray-300 shrink-0",
  BreadcrumbCurrent: "text-gray-900 whitespace-nowrap",
  BreadcrumbActive: "text-[#E65100] whitespace-nowrap",
  MobileActions: "grid grid-cols-2 gap-3 w-full md:hidden mt-6"
};

const SearchResults: React.FC<BasePageProps> = ({ initialFilters, onNavigate, isLoggedIn, onTriggerLogin }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: rawListings, isLoading } = useListings();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const handleFiltersUpdate = useCallback((nextFilters: FilterState) => {
    requestIdleCallback(() => {
      onNavigate?.('search', nextFilters as any);
    });
  }, [onNavigate]);

  const {
    filters, searchInputValue, handleFilterChange, resetFilters, sortBy, setSortBy,
    locationStatus, handleLocationDetect, filteredAndSortedListings, userLocation,
    isFiltering
  } = useListingFilters(rawListings, initialFilters, {
    onFiltersChange: handleFiltersUpdate
  });

  const seoInfo = useSearchSEO(filters, filteredAndSortedListings, userLocation);

  // BEST-IN-CLASS UX: Reset page when filters or sorting changes
  useEffect(() => { 
    setCurrentPage(1); 
  }, [filters, sortBy]);

  // BEST-IN-CLASS UX: Scroll to top on page change
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentPage, isLoading]);

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedListings.slice(start, start + itemsPerPage);
  }, [filteredAndSortedListings, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);

  const handleCardClick = useCallback((id: number, title: string) => {
    onNavigate?.('listing-details', { id, title });
  }, [onNavigate]);

  const handleFavoriteToggle = useCallback((id: number) => {
    const currentlyFavorite = isFavorite('listing', id);
    toggleFavorite('listing', id);
    
    if (!currentlyFavorite) {
      addToast("Annonce ajoutée à vos favoris", "success", 3000);
    } else {
      addToast("Annonce retirée de vos favoris", "info", 2000);
    }
  }, [toggleFavorite, isFavorite, addToast]);

  return (
    <div className={S.Page}>
      <SEO title={seoInfo.displayTitle} description={seoInfo.metaDescription} url={seoInfo.canonicalPath} schema={seoInfo.schemas} />
      
      <div className={S.Container}>
        <header className={S.Header}>
          <div className="flex flex-col w-full">
            <h1 className={S.Title}>{seoInfo.displayTitle}</h1>
            <p className={S.Count}>{isLoading ? 'Chargement...' : `${filteredAndSortedListings.length} annonces disponibles`}</p>
            
            <div className="mt-6 md:mt-9">
              <nav className={S.Breadcrumb} aria-label="Breadcrumb">
                 <button onClick={() => onNavigate?.('home')} className={S.BreadcrumbItem}><Home size={14} strokeWidth={2.5} /> Accueil</button>
                 <ChevronRight size={12} className={S.BreadcrumbSeparator} />
                 <div className={S.BreadcrumbCurrent}>Annonces</div>
              </nav>

              <div className={S.MobileActions}>
                <div className="w-full">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} userLocation={userLocation} />
                </div>
                <button 
                  onClick={() => setIsMobileFilterOpen(true)} 
                  className="flex items-center justify-center gap-2 h-11 bg-gray-900 text-white rounded-xl shadow-md active:scale-95 transition-all w-full font-bold text-sm"
                >
                  <SlidersHorizontal size={18} />
                  <span>Filtres</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className={S.ViewSwitcher}>
              <button onClick={() => setViewMode('grid')} className={S.ViewBtn(viewMode === 'grid')} aria-label="Vue grille"><LayoutGrid size={20} /></button>
              <button onClick={() => setViewMode('list')} className={S.ViewBtn(viewMode === 'list')} aria-label="Vue liste"><ListIcon size={20} /></button>
            </div>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} userLocation={userLocation} />
            <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-5 h-11 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all"><SlidersHorizontal size={18} /> Filtres</button>
          </div>
        </header>

        <div className={S.MainLayout}>
          <aside className={S.SidebarWrapper}>
            <FilterSidebar filters={filters} searchInputValue={searchInputValue} onFilterChange={handleFilterChange} onReset={resetFilters} locationStatus={locationStatus} onLocationDetect={handleLocationDetect} />
          </aside>

          <main className={`${S.GridWrapper} transition-opacity duration-300 ${isFiltering || isLoading ? 'opacity-70' : 'opacity-100'}`}>
            <ErrorBoundary>
              {isLoading ? (
                <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} viewMode={viewMode} />)}
                </div>
              ) : filteredAndSortedListings.length === 0 ? (
                <div className={S.Empty}>
                  <p className="text-gray-500 font-medium text-lg mb-2">Aucune annonce trouvée</p>
                  <button onClick={resetFilters} className="px-8 py-4 bg-[#E65100] text-white font-black rounded-xl text-[10px] uppercase tracking-widest">Réinitialiser les filtres</button>
                </div>
              ) : (
                <>
                  <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {paginatedListings.map((listing, index) => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        viewMode={viewMode} 
                        favorited={isFavorite('listing', listing.id)} 
                        onFavoriteToggle={handleFavoriteToggle} 
                        onClick={handleCardClick} 
                        priority={index < 4}
                        isLoggedIn={isLoggedIn}
                        onTriggerLogin={onTriggerLogin}
                      />
                    ))}
                  </div>
                  <SearchPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              )}
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {isMobileFilterOpen && (
        <MobileFilters filters={filters} searchInputValue={searchInputValue} onFilterChange={handleFilterChange} onReset={resetFilters} onClose={() => setIsMobileFilterOpen(false)} onLocationDetect={handleLocationDetect} resultsCount={filteredAndSortedListings.length} />
      )}
    </div>
  );
};

export default SearchResults;