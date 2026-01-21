import React from 'react';

// --- TYPES DE NAVIGATION ---
export type ViewStateName = 
  | 'home' | 'search' | 'news' | 'garages' | 'tips' | 'contact' | 'faq' 
  | 'about' | 'sitemap' | 'legal' | 'security' | 'terms' | 'cookies' 
  | 'listing-details' | 'article-details' | 'tip-details' | 'deposit' 
  | 'garage-details' | 'favorites' | 'dashboard' | 'dashboard-pro' 
  | 'tech-specs-brands' | 'tech-specs-models' | 'tech-specs-details';

export interface NavigationParams {
  id?: number;
  brand?: string;
  model?: string;
  tab?: string;
  title?: string;
  name?: string;
  success?: boolean;
  seller?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SearchFilters {
  search?: string;
  seller?: string;
  type?: string;
  brand?: string;
  model?: string; 
  location?: string;
  aroundMe?: boolean;
  onlyPro?: boolean;
  conditions?: string[];
  minYear?: number;
  maxYear?: number;
  minKm?: number;
  maxKm?: number;
  minPrice?: number;
  maxPrice?: number;
  minCC?: number;
  maxCC?: number;
}

/**
 * Interface BasePageProps - Propriétés communes injectées dans tous les composants de page.
 * Utilisée pour harmoniser la navigation et les actions utilisateur.
 */
export interface BasePageProps {
  onNavigate?: (view: ViewStateName, params?: NavigationParams) => void;
  onSearch?: (filters: SearchFilters) => void;
  onGoHome?: () => void;
  onBack?: () => void;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  initialFilters?: SearchFilters | null;
  listingId?: number;
  articleId?: number;
  tipId?: number;
  garageId?: number;
  specId?: number;
  brand?: string;
  initialTab?: string;
}

// --- DOMAINE MODELS ---
export interface Listing {
  id: number;
  title: string;
  brand: string;
  model: string;
  price: string;
  image: string;
  images?: string[]; 
  year: string;
  mileage: string;
  cc: string;
  location: string;
  date: string;
  seller: string;
  sellerType: 'Particulier' | 'Pro';
  sellerImage?: string;
  phone?: string;
  condition: 'Excellent' | 'Très bon' | 'Bon' | 'Neuf' | 'État neuf' | 'Correct' | 'À réparer' | 'Pour pièces';
  dealRating?: 1 | 2 | 3; 
  equipment?: string[];
  type: 'Moto' | 'Scooter' | 'Quad' | 'Accessoires'; 
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface GarageService {
  name: string;
  price?: string;
  icon?: React.ReactNode;
}

export interface GarageReview {
  id: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  isVerifiedOwner?: boolean;
}

export interface Garage {
  id: number;
  name: string;
  image: string;
  rating: number;
  description?: string;
  address?: string;
  location?: string; 
  hours?: string;
  reviewsCount?: number;
  specialties?: string[];
  specialty?: string; 
  isVerified?: boolean;
  images?: string[];
  phone?: string;
  website?: string;
  email?: string;
  coordinates?: { lat: number; lng: number };
  services?: GarageService[];
  reviewsList?: GarageReview[]; 
}

export interface Article {
  id: number;
  title: string;
  category: 'Nouveautés' | 'Essais' | 'Tech' | 'Scooters' | 'Électrique';
  image: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content?: string; 
  tags?: string[];
  isFeatured?: boolean;
}

export interface Tip {
  id: number;
  title: string;
  category: 'Entretien' | 'Sécurité' | 'Équipement' | 'Conduite' | 'Législation';
  summary: string;
  content?: string; 
  tools?: string[]; 
  image: string;
  date: string;
  author: string;
  readTime: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Expert';
}

export interface BikeModel {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: string;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  date: string;
}

export interface CategoryItem {
  icon: React.ElementType;
  label: string;
}

export interface TechSpec {
  id: number;
  brand: string;
  model: string;
  year: number;
  category: 'Roadster' | 'Sportive' | 'Trail' | 'Scooter' | 'Custom' | 'Off-road';
  priceNew: string;
  image: string;
  gallery?: string[];
  engine: {
    type: string;
    cc: string;
    power: string;
    torque: string;
    fuelSystem: string;
    cooling: string;
    transmission: string;
  };
  chassis: {
    frame: string;
    suspensionFront: string;
    suspensionRear: string;
    brakesFront: string;
    brakesRear: string;
    tireFront: string;
    tireRear: string;
  };
  dimensions: {
    weight: string;
    seatHeight: string;
    tank: string;
    length: string;
    wheelbase: string;
  };
  consumption?: string;
  topSpeed?: string;
}

export interface AdCampaign {
  id: number;
  title: string;
  client: string;
  zone: 'news_top' | 'search_feed' | 'garage_sidebar' | 'listing_sidebar' | 'search_sidebar';
  location: string;
  startDate: string;
  endDate: string;
  mediaType: 'Image' | 'Script';
  mediaUrl: string; 
  linkUrl: string; 
  ctaText?: string; 
  description?: string; 
  isActive: boolean;
  views: number;
  clicks: number;
}