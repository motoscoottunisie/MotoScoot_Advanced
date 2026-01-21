import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
  placeholder: string;
  isOpen: boolean;
  onToggle: () => void;
  isCombobox?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onFocus?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  icon: Icon,
  label,
  value,
  placeholder,
  isOpen,
  onToggle,
  isCombobox = false,
  searchValue = "",
  onSearchChange,
  onFocus,
  isDisabled = false,
  isLoading = false,
  children,
  innerRef
}) => {
  const isActive = !!value || (isCombobox && !!searchValue);

  const POPUP_CLASSES = "absolute top-[calc(100%+1rem)] left-0 w-full md:w-[calc(100%+2rem)] md:-ml-4 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-60 overflow-y-auto z-[100] animate-scale-in origin-top";

  return (
    <div 
      className={`flex-1 flex items-center px-4 md:px-6 py-5 md:py-5 border-b md:border-b-0 md:border-r border-gray-100 relative group transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`} 
      ref={innerRef}
    >
      {/* Couleur de l'icône : #e6580b (toujours appliquée sur mobile selon spécification) */}
      <Icon className="w-5 h-5 mr-3 flex-shrink-0 transition-colors text-[#e6580b]" />
      
      <div className="flex-1 relative">
        {isCombobox ? (
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue || value}
            autoComplete="off"
            disabled={isDisabled}
            onFocus={onFocus}
            onChange={(e) => onSearchChange?.(e.target.value)}
            // Taille de police 16px (text-base) et graisse 700 (font-bold)
            className="w-full bg-transparent outline-none font-bold placeholder:text-[#374151] border-none p-0 focus:ring-0 transition-colors disabled:cursor-not-allowed text-base text-[#374151]"
          />
        ) : (
          <button
            onClick={onToggle}
            disabled={isDisabled}
            // Taille de police 16px (text-base) et graisse 700 (font-bold)
            className="w-full text-left bg-transparent outline-none font-bold cursor-pointer pr-8 truncate transition-colors disabled:cursor-not-allowed text-base text-[#374151]"
          >
            {value || placeholder}
          </button>
        )}

        {isLoading ? (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ChevronDown 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        )}

        {isOpen && !isDisabled && (
          <div className={POPUP_CLASSES}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};