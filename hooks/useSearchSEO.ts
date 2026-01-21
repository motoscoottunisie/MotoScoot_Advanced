
import { useMemo } from 'react';
import { FilterState } from './useListingFilters';
import { Listing } from '../types';
import { slugify } from '../utils/urlUtils';

export interface SEOData {
  displayTitle: string;
  metaDescription: string;
  canonicalPath: string;
  schemas: any[];
}

/**
 * Hook useSearchSEO - Orchestre la logique de métadonnées pour la page de recherche.
 * Centralise la génération sémantique des titres et des données structurées.
 */
export const useSearchSEO = (
  filters: FilterState,
  results: (Listing & { distance: number | null })[],
  userLocation: { lat: number; lng: number } | null
): SEOData => {
  return useMemo(() => {
    const brand = filters.brand && filters.brand !== 'Toutes les marques' ? filters.brand : '';
    const model = filters.model && filters.model !== 'Tous les modèles' ? filters.model : '';
    const location = filters.location ? filters.location : (userLocation ? 'Autour de moi' : 'Tunisie');
    const type = filters.type && filters.type !== 'Tous les types' ? filters.type : 'Moto & Scooter';

    // Construction du titre H1 et Meta Title sémantique
    const displayTitle = brand 
      ? `${brand} ${model} d'occasion à ${location}`
      : `${type} d'occasion en Tunisie`;

    const metaDescription = `Découvrez ${results.length} annonces de ${brand} ${model} disponibles à ${location}. MotoScoot.tn : la référence pour votre achat moto en Tunisie.`;

    // URL Canonique basée sur les filtres pour éviter le duplicate content
    let canonicalPath = '/annonces';
    if (brand) canonicalPath += `/${slugify(brand)}`;
    if (model) canonicalPath += `/${slugify(model)}`;

    // Données structurées : ItemList (Résultats) + Breadcrumbs (Navigation)
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://motoscoot.tn/" },
        { "@type": "ListItem", "position": 2, "name": "Annonces", "item": "https://motoscoot.tn/#/annonces" },
        brand ? { "@type": "ListItem", "position": 3, "name": brand, "item": `https://motoscoot.tn/#/annonces/${slugify(brand)}` } : null
      ].filter(Boolean)
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": displayTitle,
      "numberOfItems": results.length,
      "itemListElement": results.slice(0, 10).map((l, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://motoscoot.tn/#/annonce/${slugify(l.title)}-${l.id}`,
        "name": l.title
      }))
    };

    return { 
      displayTitle, 
      metaDescription, 
      canonicalPath, 
      schemas: [breadcrumbSchema, itemListSchema] 
    };
  }, [filters, results, userLocation]);
};
