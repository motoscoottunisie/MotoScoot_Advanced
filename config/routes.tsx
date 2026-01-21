
import React, { lazy } from 'react';
import { ViewStateName, BasePageProps } from '../types';

// Composants critiques chargés statiquement
import Hero from '../components/Hero';
import PopularModels from '../components/PopularModels';
import PopularGarages from '../components/PopularGarages';
import Reviews from '../components/Reviews';
import SearchResults from '../components/SearchResults';

// Vues secondaires chargées de manière différée (Lazy Loading)
const News = lazy(() => import('../components/News'));
const Garages = lazy(() => import('../components/Garages'));
const Tips = lazy(() => import('../components/Tips'));
const Contact = lazy(() => import('../components/Contact'));
const FAQ = lazy(() => import('../components/FAQ'));
const About = lazy(() => import('../components/About'));
const Sitemap = lazy(() => import('../components/Sitemap'));
const Legal = lazy(() => import('../components/Legal'));
const Security = lazy(() => import('../components/Security'));
const Terms = lazy(() => import('../components/Terms'));
const Cookies = lazy(() => import('../components/Cookies'));
const ListingDetails = lazy(() => import('../components/ListingDetails'));
const ArticleDetails = lazy(() => import('../components/ArticleDetails'));
const TipDetails = lazy(() => import('../components/TipDetails'));
const DepositAd = lazy(() => import('../components/DepositAd'));
const GarageDetails = lazy(() => import('../components/GarageDetails'));
const Favorites = lazy(() => import('../components/Favorites'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const DashboardPro = lazy(() => import('../components/DashboardPro'));
const TechSpecsBrands = lazy(() => import('../components/TechSpecsBrands'));
const TechSpecsModels = lazy(() => import('../components/TechSpecsModels'));
const TechSpecsDetails = lazy(() => import('../components/TechSpecsDetails'));

export interface RouteConfig {
  component: React.ComponentType<BasePageProps>;
  layoutVariant: 'white' | 'transparent';
  hideFooter?: boolean;
  isProtected?: boolean;
  isAdminOnly?: boolean;
}

export const ROUTES: Record<ViewStateName, RouteConfig> = {
  'home': {
    component: (props: BasePageProps) => (
      <>
        <Hero onSearch={props.onSearch} onNavigate={props.onNavigate} />
        <PopularModels onNavigate={props.onNavigate} />
        <PopularGarages onNavigate={props.onNavigate} />
        <Reviews />
      </>
    ),
    layoutVariant: 'transparent'
  },
  'search': { component: SearchResults, layoutVariant: 'white' },
  'news': { component: News, layoutVariant: 'transparent' },
  'tips': { component: Tips, layoutVariant: 'transparent' },
  'tech-specs-brands': { component: TechSpecsBrands, layoutVariant: 'transparent' },
  'tech-specs-models': { component: TechSpecsModels, layoutVariant: 'transparent' },
  'sitemap': { component: Sitemap, layoutVariant: 'transparent' },
  'legal': { component: Legal, layoutVariant: 'transparent' },
  'security': { component: Security, layoutVariant: 'transparent' },
  'terms': { component: Terms, layoutVariant: 'transparent' },
  'cookies': { component: Cookies, layoutVariant: 'transparent' },
  'garages': { component: Garages, layoutVariant: 'white' },
  'contact': { component: Contact, layoutVariant: 'white' },
  'faq': { component: FAQ, layoutVariant: 'white' },
  'about': { component: About, layoutVariant: 'transparent' },
  'listing-details': { component: ListingDetails, layoutVariant: 'white' },
  'article-details': { component: ArticleDetails, layoutVariant: 'white' },
  'tip-details': { component: TipDetails, layoutVariant: 'white' },
  'deposit': { component: DepositAd, layoutVariant: 'white', hideFooter: true },
  'garage-details': { component: GarageDetails, layoutVariant: 'white' },
  'favorites': { component: Favorites, layoutVariant: 'white' },
  'dashboard': { component: Dashboard, layoutVariant: 'white', isProtected: true },
  'dashboard-pro': { component: DashboardPro, layoutVariant: 'white', isProtected: true },
  'tech-specs-details': { component: TechSpecsDetails, layoutVariant: 'white' }
};
