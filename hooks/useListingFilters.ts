import { useState, useMemo, useCallback, useEffect, useTransition, useRef } from 'react';
import { Listing, SearchFilters } from '../types';
import { calculateDistance } from '../utils/geoUtils';

export type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'year_desc' | 'km_asc' | 'proximity';

export interface FilterState {
  search: string;
  seller: string;
  type: string;
  brand: string;
  model: string; 
  location: string;
  onlyPro: boolean;
  conditions: string[];
  minYear: number;
  maxYear: number;
  minKm: number;
  maxKm: number;
  minPrice: number;
  maxPrice: number;
  minCC: number;
  maxCC: number;
}

interface UseListingFiltersOptions {
  onFiltersChange?: (filters: FilterState) => void;
}

export const useListingFilters = (
  data: Listing[] = [], 
  initialFilters?: SearchFilters | null,
  options?: UseListingFiltersOptions
) => {
  const [sortBy, setSortBy] = useState<SortOption[]>(['recent']);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'denied' | 'error'>('idle');
  
  const [isPending, startTransition] = useTransition();
  const commitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (commitTimeoutRef.current) clearTimeout(commitTimeoutRef.current);
    };
  }, []);

  const [searchInputValue, setSearchInputValue] = useState(initialFilters?.search ?? '');

  const [filters, setFilters] = useState<FilterState>({
    search: initialFilters?.search ?? '',
    seller: initialFilters?.seller ?? '',
    type: initialFilters?.type ?? '',
    brand: initialFilters?.brand ?? '',
    model: initialFilters?.model ?? '',
    location: initialFilters?.location ?? '',
    onlyPro: initialFilters?.onlyPro ?? false,
    conditions: initialFilters?.conditions ?? [],
    minYear: initialFilters?.minYear ?? 2000,
    maxYear: initialFilters?.maxYear ?? 2026,
    minKm: initialFilters?.minKm ?? 0,
    maxKm: initialFilters?.maxKm ?? 300000,
    minPrice: initialFilters?.minPrice ?? 0,
    maxPrice: initialFilters?.maxPrice ?? 200000,
    minCC: initialFilters?.minCC ?? 50,
    maxCC: initialFilters?.maxCC ?? 1650
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInputValue) {
        startTransition(() => {
          setFilters(prev => ({ ...prev, search: searchInputValue }));
        });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInputValue, filters.search]);

  // Synchronisation dépriorisée vers l'URL
  useEffect(() => {
    if (commitTimeoutRef.current) clearTimeout(commitTimeoutRef.current);
    
    commitTimeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        options?.onFiltersChange?.(filters);
      }
    }, 1000);

    return () => { 
      if (commitTimeoutRef.current) clearTimeout(commitTimeoutRef.current); 
    };
  }, [filters, options]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    if (key === 'search') {
      setSearchInputValue(value);
    } else {
      startTransition(() => {
        setFilters(prev => ({ ...prev, [key]: value }));
      });
    }
  }, []);

  const handleSortChange = useCallback((nextSort: SortOption[]) => {
    startTransition(() => {
      setSortBy(nextSort);
    });
  }, []);

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setSearchInputValue('');
      setFilters({
        search: '',
        seller: '',
        type: '', brand: '', model: '', location: '', onlyPro: false,
        conditions: [],
        minYear: 2000, maxYear: 2026, minKm: 0, maxKm: 300000,
        minPrice: 0, maxPrice: 200000, minCC: 50, maxCC: 1650
      });
      setLocationStatus('idle');
      setUserLocation(null);
      setSortBy(['recent']);
    });
  }, []);

  const handleLocationDetect = useCallback(() => {
    if (locationStatus === 'success') {
      startTransition(() => {
        setLocationStatus('idle');
        setUserLocation(null);
        setSortBy(prev => prev.filter(s => s !== 'proximity'));
      });
      return;
    }
    if (!navigator.geolocation) { setLocationStatus('error'); return; }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!isMounted.current) return;
        startTransition(() => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(coords);
          setLocationStatus('success');
          setSortBy(prev => ['proximity', ...prev.filter(s => s !== 'proximity')]);
        });
      },
      (err) => {
        if (!isMounted.current) return;
        setLocationStatus(err.code === 1 ? 'denied' : 'error');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [locationStatus]);

  useEffect(() => {
    if (initialFilters?.aroundMe && locationStatus === 'idle') {
      handleLocationDetect();
    }
  }, [initialFilters, locationStatus, handleLocationDetect]);

  const indexedListings = useMemo(() => {
    return data.map(listing => {
        let distance = null;
        if (userLocation && listing.coordinates) {
            distance = calculateDistance(userLocation.lat, userLocation.lng, listing.coordinates.lat, listing.coordinates.lng);
        }
        return { 
          ...listing, 
          distance,
          _searchTitle: listing.title.toLowerCase(),
          _brandLower: listing.brand.toLowerCase(),
          _modelLower: listing.model.toLowerCase(),
          _numericPrice: parseInt(listing.price.replace(/\D/g, ''), 10) || 0,
          _numericYear: parseInt(listing.year, 10) || 2000,
          _numericMileage: parseInt(listing.mileage.replace(/\D/g, ''), 10) || 0
        };
    });
  }, [data, userLocation]);

  const filteredAndSortedListings = useMemo(() => {
    const filtered = indexedListings.filter(l => {
      if (filters.seller && l.seller !== filters.seller) return false;
      if (filters.search && !l._searchTitle.includes(filters.search.toLowerCase())) return false;
      if (filters.type && filters.type !== 'Tous les types' && l.type !== filters.type) return false;
      if (filters.brand && filters.brand !== 'Toutes les marques') {
        if (l._brandLower !== filters.brand.toLowerCase() && !l._searchTitle.includes(filters.brand.toLowerCase())) return false;
      }
      if (filters.model && filters.model !== 'Tous les modèles') {
        if (l._modelLower !== filters.model.toLowerCase() && !l._searchTitle.includes(filters.model.toLowerCase())) return false;
      }
      if (filters.location && filters.location !== 'Toutes les villes' && l.location !== filters.location) return false;
      if (filters.onlyPro && l.sellerType !== 'Pro') return false;
      if (filters.conditions.includes('Neuf') && (l.condition !== 'Neuf' || l._numericMileage !== 0)) return false;
      if (l._numericPrice < filters.minPrice || l._numericPrice > filters.maxPrice) return false;
      if (l.type !== 'Accessoires') {
        if (l._numericYear < filters.minYear || l._numericYear > filters.maxYear) return false;
        if (l._numericMileage < filters.minKm || l._numericMileage > filters.maxKm) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      for (const opt of sortBy) {
        let d = 0;
        switch (opt) {
          case 'proximity': d = (a.distance ?? 999) - (b.distance ?? 999); break;
          case 'price_asc': d = a._numericPrice - b._numericPrice; break;
          case 'price_desc': d = b._numericPrice - a._numericPrice; break;
          case 'year_desc': d = b._numericYear - a._numericYear; break;
          case 'km_asc': d = a._numericMileage - b._numericMileage; break;
          case 'recent': d = b.id - a.id; break;
        }
        if (d !== 0) return d;
      }
      return 0;
    });
  }, [indexedListings, filters, sortBy]);

  return {
    filters, searchInputValue, handleFilterChange, resetFilters,
    sortBy, setSortBy: handleSortChange, locationStatus, handleLocationDetect,
    filteredAndSortedListings, userLocation,
    isFiltering: isPending
  };
};