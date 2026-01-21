import React, { useState, useEffect, useRef } from 'react';
import { Bike, Tag, ShoppingBag, Layers, MapPin, Navigation, Check } from 'lucide-react';
import { SearchField } from './SearchField';
import { tunisianCities, brandsMoto, mockModels, accessoryTypes, modelsByBrand } from '../../data/mockData';

interface SearchBarProps {
  onSearch?: (filters: any) => void;
}

type Category = 'Moto' | 'Scooter' | 'Quad' | 'Accessoires' | '';

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [type, setType] = useState<Category>("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [accessoryCategory, setAccessoryCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // States pour l'ouverture des menus
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Filtres de recherche internes
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [accessorySearch, setAccessorySearch] = useState("");

  const refs = {
    type: useRef<HTMLDivElement>(null),
    brand: useRef<HTMLDivElement>(null),
    model: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    setBrand("");
    setBrandSearch("");
    setModel("");
    setModelSearch("");
    setAccessoryCategory("");
    setAccessorySearch("");
  }, [type]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      let found = false;
      Object.values(refs).forEach(ref => {
        if (ref.current?.contains(target)) found = true;
      });
      if (!found) setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationRequest = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setIsLocating(false);
        setLocation("Ma position");
        setOpenMenu(null);
      },
      () => {
        setIsLocating(false);
        setLocation("");
        setOpenMenu(null);
      }
    );
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({
        type,
        search: type === 'Accessoires' ? accessoryCategory : "",
        brand: type === 'Accessoires' ? "" : brand,
        model: type === 'Accessoires' ? "" : model,
        location: location === "Ma position" ? "" : location,
        aroundMe: location === "Ma position"
      });
    }
  };

  // Restreindre la liste des modèles à la marque sélectionnée
  const availableModels = type !== 'Accessoires' && brand ? (modelsByBrand[brand] || []) : mockModels;

  // text-base (16px) sur toutes les versions, font-bold (700)
  const ITEM_CLASSES = "w-full text-left px-5 py-3 text-base font-bold transition-colors";
  const ACTIVE_CLASSES = "bg-primary-50 text-primary-600";
  const DEFAULT_CLASSES = "text-gray-600 hover:bg-gray-50";

  return (
    <div className="w-full max-w-6xl bg-white rounded-xl p-2.5 flex flex-col md:flex-row items-stretch md:items-center shadow-2xl relative overflow-visible z-20">
      
      {/* 1. TYPE */}
      <SearchField
        innerRef={refs.type}
        icon={Bike}
        label="Type"
        value={type}
        placeholder="Que cherchez-vous ?"
        isOpen={openMenu === 'type'}
        onToggle={() => setOpenMenu(openMenu === 'type' ? null : 'type')}
      >
        {["Moto", "Scooter", "Quad", "Accessoires"].map((item) => (
          <button key={item} onClick={() => { setType(item as Category); setOpenMenu(null); }} className={`${ITEM_CLASSES} ${type === item ? ACTIVE_CLASSES : DEFAULT_CLASSES}`}>
            {item}
          </button>
        ))}
      </SearchField>

      {/* 2. MARQUE / ARTICLES */}
      <SearchField
        innerRef={refs.brand}
        icon={type === 'Accessoires' ? ShoppingBag : Tag}
        label={type === 'Accessoires' ? "Articles" : "Marque"}
        value={type === 'Accessoires' ? accessoryCategory : brand}
        placeholder={type === 'Accessoires' ? "Articles" : "Marque"}
        isOpen={openMenu === 'brand'}
        onToggle={() => setOpenMenu('brand')}
        isCombobox={true}
        searchValue={type === 'Accessoires' ? accessorySearch : brandSearch}
        onSearchChange={(val) => {
          if (type === 'Accessoires') { setAccessorySearch(val); setOpenMenu('brand'); }
          else { setBrandSearch(val); setOpenMenu('brand'); }
        }}
        onFocus={() => {
            setOpenMenu('brand');
            if (type === 'Accessoires') setAccessorySearch(""); else setBrandSearch("");
        }}
      >
        {type === 'Accessoires' ? (
          accessoryTypes.filter(a => a.toLowerCase().includes(accessorySearch.toLowerCase())).map(acc => (
            <button key={acc} onClick={() => { setAccessoryCategory(acc); setAccessorySearch(acc); setOpenMenu(null); }} className={`${ITEM_CLASSES} ${accessoryCategory === acc ? ACTIVE_CLASSES : DEFAULT_CLASSES}`}>{acc}</button>
          ))
        ) : (
          brandsMoto.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).map(b => (
            <button key={b} onClick={() => { setBrand(b); setBrandSearch(b); setOpenMenu(null); setModel(""); setModelSearch(""); }} className={`${ITEM_CLASSES} ${brand === b ? ACTIVE_CLASSES : DEFAULT_CLASSES}`}>{b}</button>
          ))
        )}
      </SearchField>

      {/* 3. MODELE */}
      <SearchField
        innerRef={refs.model}
        icon={Layers}
        label="Modèle"
        value={model}
        placeholder={type === 'Accessoires' ? "-" : "Modèle"}
        isOpen={openMenu === 'model'}
        onToggle={() => setOpenMenu('model')}
        isCombobox={true}
        isDisabled={type === 'Accessoires'}
        searchValue={modelSearch}
        onSearchChange={(val) => { setModelSearch(val); setOpenMenu('model'); }}
        onFocus={() => { setOpenMenu('model'); setModelSearch(""); }}
      >
        {availableModels.filter(m => m.toLowerCase().includes(modelSearch.toLowerCase())).map(m => (
          <button key={m} onClick={() => { setModel(m); setModelSearch(m); setOpenMenu(null); }} className={`${ITEM_CLASSES} ${model === m ? ACTIVE_CLASSES : DEFAULT_CLASSES}`}>{m}</button>
        ))}
      </SearchField>

      {/* 4. LOCATION */}
      <SearchField
        innerRef={refs.location}
        icon={MapPin}
        label="Lieu"
        value={location}
        placeholder="Où ça ?"
        isOpen={openMenu === 'location'}
        onToggle={() => setOpenMenu(openMenu === 'location' ? null : 'location')}
        isLoading={isLocating}
      >
        <button onClick={handleLocationRequest} className={`${ITEM_CLASSES} text-primary-600 flex items-center gap-2 hover:bg-primary-50`}>
          <Navigation size={14} className="fill-current" /> Autour de moi
        </button>
        <div className="mx-5 my-2 border-t border-gray-100"></div>
        {tunisianCities.map((city) => (
          <button key={city} onClick={() => { setLocation(city); setOpenMenu(null); }} className={`${ITEM_CLASSES} ${location === city ? ACTIVE_CLASSES : DEFAULT_CLASSES}`}>{city}</button>
        ))}
      </SearchField>

      {/* SEARCH BUTTON - Mise à jour font-weight 700 et font-size 16px sur desktop/tablette */}
      <button
        onClick={handleSearchClick}
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 px-10 rounded-lg transition-transform transform active:scale-95 md:ml-2 mt-2 md:mt-0 flex-shrink-0 uppercase tracking-widest text-base"
      >
        Rechercher
      </button>
    </div>
  );
};
