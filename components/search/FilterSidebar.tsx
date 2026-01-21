import React from 'react';
import { Filter, Search, Building2, ChevronDown, Navigation, Store, MapPin } from 'lucide-react';
import { DualRangeSlider } from './DualRangeSlider';
import { brandsMoto, mockModels, modelsByBrand } from '../../data/mockData';
import { FilterState } from '../../hooks/useListingFilters';

interface FilterSidebarProps {
  filters: FilterState;
  searchInputValue?: string;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onReset: () => void;
  locationStatus: string;
  onLocationDetect: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, searchInputValue, onFilterChange, onReset, locationStatus, onLocationDetect 
}) => {
  const selectClass = "w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[14px] font-bold text-gray-700 focus:bg-white focus:border-primary-600 outline-none cursor-pointer transition-all";

  const isNewOnly = filters.conditions.includes('Neuf');

  const handleNewToggle = (checked: boolean) => {
    onFilterChange('conditions', checked ? ['Neuf'] : []);
  };

  // Déterminer les modèles disponibles selon la marque
  const availableModels = filters.brand && filters.brand !== 'Toutes les marques' 
    ? (modelsByBrand[filters.brand] || []) 
    : mockModels;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 xl:p-5 shadow-sm">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
          <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary-600" /> Filtrer
          </h3>
          <button onClick={onReset} className="text-[10px] font-black text-gray-400 uppercase hover:text-primary-600 transition-colors">Reset</button>
        </div>

        {/* Toggle Proximité */}
        <div className="mb-4">
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
                    onChange={onLocationDetect} 
                    className="sr-only" 
                 />
                 <div className={`w-11 h-6 rounded-full transition-colors ${locationStatus === 'success' ? 'bg-success-500' : 'bg-gray-200'}`}></div>
                 <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${locationStatus === 'success' ? 'translate-x-5' : ''}`}></div>
              </div>
           </label>
        </div>

        {/* Toggle Vendeur Pro */}
        <div className="mb-4">
           <label className={`flex items-center justify-between cursor-pointer p-4 rounded-xl border transition-all ${filters.onlyPro ? 'bg-primary-50 border-primary-100' : 'bg-gray-50 border-gray-100 hover:border-primary-200'}`}>
              <div className="flex items-center gap-3">
                 <Building2 size={18} className={filters.onlyPro ? 'text-primary-600' : 'text-gray-400'} />
                 <span className={`text-sm font-bold ${filters.onlyPro ? 'text-primary-700' : 'text-[#6b7280]'}`}>Vendeur pro</span>
              </div>
              <div className="relative">
                 <input type="checkbox" checked={filters.onlyPro} onChange={(e) => onFilterChange('onlyPro', e.target.checked)} className="sr-only" />
                 <div className={`w-11 h-6 rounded-full transition-colors ${filters.onlyPro ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                 <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${filters.onlyPro ? 'translate-x-5' : ''}`}></div>
              </div>
           </label>
        </div>

        {/* Toggle Articles Neufs */}
        <div className="mb-6">
           <label className={`flex items-center justify-between cursor-pointer p-4 rounded-xl border transition-all ${isNewOnly ? 'bg-primary-50 border-primary-100' : 'bg-gray-50 border-gray-100 hover:border-primary-200'}`}>
              <div className="flex items-center gap-3">
                 <Store size={18} className={isNewOnly ? 'text-primary-600' : 'text-gray-400'} />
                 <span className={`text-sm font-bold ${isNewOnly ? 'text-primary-700' : 'text-[#6b7280]'}`}>Articles neufs</span>
              </div>
              <div className="relative">
                 <input type="checkbox" checked={isNewOnly} onChange={(e) => handleNewToggle(e.target.checked)} className="sr-only" />
                 <div className={`w-11 h-6 rounded-full transition-colors ${isNewOnly ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                 <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${isNewOnly ? 'translate-x-5' : ''}`}></div>
              </div>
           </label>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input 
              type="text" 
              value={searchInputValue !== undefined ? searchInputValue : filters.search} 
              onChange={(e) => onFilterChange('search', e.target.value)} 
              placeholder="Rechercher..." 
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[14px] font-bold text-[#374151] caret-primary-600 outline-none transition-all focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50" 
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
          </div>
          
          {[
            { key: 'type', label: 'Type', options: ['Tous les types', 'Moto', 'Scooter', 'Accessoires'] },
            { key: 'brand', label: 'Marque', options: ['Toutes les marques', ...brandsMoto] },
            { key: 'model', label: 'Modèle', options: ['Tous les modèles', ...availableModels] }
          ].map((sel) => (
            <div key={sel.key} className="relative">
              <select 
                value={filters[sel.key as keyof FilterState] as string} 
                onChange={(e) => {
                  onFilterChange(sel.key as keyof FilterState, e.target.value);
                  // Réinitialiser le modèle si la marque change
                  if (sel.key === 'brand') {
                    onFilterChange('model', 'Tous les modèles');
                  }
                }} 
                className={selectClass}
              >
                {sel.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="my-6 h-px bg-gray-50"></div>

        <div className="space-y-6">
          <DualRangeSlider label="Prix" min={0} max={200000} step={500} unit="DT" valueMin={filters.minPrice} valueMax={filters.maxPrice} onChange={(min, max) => { onFilterChange('minPrice', min); onFilterChange('maxPrice', max); }} />

          {filters.type !== 'Accessoires' && (
            <>
              <DualRangeSlider label="Année" min={2000} max={2026} valueMin={filters.minYear} valueMax={filters.maxYear} onChange={(min, max) => { onFilterChange('minYear', min); onFilterChange('maxYear', max); }} />
              <DualRangeSlider label="Cylindrée" min={50} max={1650} step={50} unit="cc" valueMin={filters.minCC} valueMax={filters.maxCC} onChange={(min, max) => { onFilterChange('minCC', min); onFilterChange('maxCC', max); }} />
              <DualRangeSlider label="Kilométrage" min={0} max={300000} step={1000} unit="km" valueMin={filters.minKm} valueMax={filters.maxKm} onChange={(min, max) => { onFilterChange('minKm', min); onFilterChange('maxKm', max); }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
