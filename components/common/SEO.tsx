
import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  schema
}) => {
  const siteName = "MotoScoot.tn";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Vente Moto & Scooter d'occasion en Tunisie`;
  const defaultDescription = "La référence en Tunisie pour l'achat et la vente de motos d'occasion et neuves. Plus de 500 annonces vérifiées à Tunis, Sousse, Sfax.";
  const finalDescription = description || defaultDescription;
  const siteUrl = "https://motoscoot.tn";
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const finalImage = image || "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-color.svg";

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (selector: string, attr: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        const head = document.getElementsByTagName('head')[0];
        if (selector.startsWith('meta')) {
          element = document.createElement('meta');
          const parts = selector.replace('meta[', '').replace(']', '').split('=');
          element.setAttribute(parts[0], parts[1].replace(/"/g, ''));
        } else if (selector.startsWith('link')) {
          element = document.createElement('link');
          const relMatch = selector.match(/rel="([^"]+)"/);
          if (relMatch) element.setAttribute('rel', relMatch[1]);
        }
        if (element) head.appendChild(element);
      }
      if (element) element.setAttribute(attr, content);
    };

    updateMeta('meta[name="description"]', 'content', finalDescription);
    updateMeta('meta[property="og:title"]', 'content', fullTitle);
    updateMeta('meta[property="og:description"]', 'content', finalDescription);
    updateMeta('meta[property="og:image"]', 'content', finalImage);
    updateMeta('meta[property="og:url"]', 'content', finalUrl);
    updateMeta('meta[property="og:type"]', 'content', type);
    updateMeta('link[rel="canonical"]', 'href', finalUrl);

    // Optimisation LCP : Preload de l'image principale si présente
    if (image) {
      let preloadLink = document.querySelector('link[rel="preload"][as="image"]') as HTMLLinkElement;
      if (!preloadLink) {
        preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        document.head.appendChild(preloadLink);
      }
      preloadLink.href = image;
      // Optionnel : on peut ajouter imageSizes pour aider le navigateur avant l'exécution du JS complet
      // @ts-ignore
      preloadLink.imageSizes = "(max-width: 767px) 100vw, (max-width: 1023px) 900px, 850px";
    }

    // Schémas Globaux (Toujours présents pour l'identité)
    const globalSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MotoScoot Tunisie",
        "url": siteUrl,
        "logo": "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-color.svg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+216-21-719-109",
          "contactType": "customer service",
          "areaServed": "TN",
          "availableLanguage": ["French", "Arabic"]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": siteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/#/annonces?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ];

    const existingScript = document.getElementById('schema-jsonld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    
    // Fusion des schémas globaux avec le schéma spécifique à la page
    const combinedSchema = schema 
      ? [...globalSchemas, ...(Array.isArray(schema) ? schema : [schema])]
      : globalSchemas;

    script.text = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

    // Cleanup sur désengagement du composant SEO
    return () => {
       const preloadLink = document.querySelector('link[rel="preload"][as="image"]');
       if (preloadLink) preloadLink.remove();
    };

  }, [fullTitle, finalDescription, finalImage, type, finalUrl, schema, image]);

  return null;
};

export default SEO;
