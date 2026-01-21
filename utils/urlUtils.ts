export const slugify = (text: string): string => {
  if (!text) return 'details';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const getOptimizedImageUrl = (url: string, width = 800, height = 600, quality = 80): string => {
  if (!url || typeof url !== 'string') return 'https://placehold.co/800x600/f3f4f6/9ca3af?text=MotoScoot';
  
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;
  
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`;
  }

  if (url.includes('placehold.co')) {
    return url;
  }
  
  const isInternal = url.includes('magma-studio.tn');
  if (isInternal) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}tr=w-${width},h-${height},q-${quality},c-cover`;
  }

  return url;
};

interface RouteMapping {
  view: string;
  path: string;
  pattern: RegExp;
}

const ROUTE_MAP: RouteMapping[] = [
  { view: 'home', path: '/', pattern: /^\/$/ },
  { view: 'search', path: '/annonces', pattern: /^\/annonces/ },
  { view: 'news', path: '/actualites', pattern: /^\/actualites/ },
  { view: 'garages', path: '/garages', pattern: /^\/garages/ },
  { view: 'tips', path: '/conseils', pattern: /^\/conseils/ },
  { view: 'contact', path: '/contact', pattern: /^\/contact/ },
  { view: 'faq', path: '/faq', pattern: /^\/faq/ },
  { view: 'about', path: '/a-propos', pattern: /^\/a-propos/ },
  { view: 'favorites', path: '/mes-favoris', pattern: /^\/mes-favoris/ },
  { view: 'deposit', path: '/deposer-une-annonce', pattern: /^\/deposer-une-annonce/ },
  { view: 'dashboard', path: '/mon-compte', pattern: /^\/mon-compte/ },
  { view: 'dashboard-pro', path: '/espace-pro', pattern: /^\/espace-pro/ },
  { view: 'tech-specs-brands', path: '/fiches-techniques', pattern: /^\/fiches-techniques$/ },
  { view: 'listing-details', path: '/annonce', pattern: /^\/annonce\/[a-z0-9-]+-(\d+)$/ },
  { view: 'article-details', path: '/article', pattern: /^\/article\/[a-z0-9-]+-(\d+)$/ },
  { view: 'tip-details', path: '/guide', pattern: /^\/guide\/[a-z0-9-]+-(\d+)$/ },
  { view: 'garage-details', path: '/garage', pattern: /^\/garage\/[a-z0-9-]+-(\d+)$/ },
  { view: 'tech-specs-details', path: '/fiche-technique', pattern: /^\/fiche-technique\/[a-z0-9-]+-(\d+)$/ },
  { view: 'tech-specs-models', path: '/fiches-techniques', pattern: /^\/fiches-techniques\/([a-z0-9-]+)$/ },
];

export const encodeQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null && key !== 'view' && key !== 'id' && key !== 'title' && key !== 'brand' && key !== 'name') {
      if (Array.isArray(value)) {
        if (value.length > 0) searchParams.set(key, value.join(','));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });
  const str = searchParams.toString();
  return str ? `?${str}` : '';
};

export const decodeQueryParams = (queryString: string): Record<string, any> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, any> = {};
  
  params.forEach((value, key) => {
    if (['minPrice', 'maxPrice', 'minYear', 'maxYear', 'minKm', 'maxKm', 'minCC', 'maxCC', 'id'].includes(key)) {
      result[key] = Number(value);
    } else if (key === 'aroundMe' || key === 'onlyPro') {
      result[key] = value === 'true';
    } else if (key === 'conditions') {
      result[key] = value.split(',');
    } else {
      result[key] = value;
    }
  });
  
  return result;
};

export const getUrlFromState = (view: string, params: any = {}): string => {
  const slug = params.title || params.name || params.model || 'details';
  const id = params.id;
  const brand = params.brand;

  let path = '/';
  switch (view) {
    case 'home': path = '/'; break;
    case 'search': path = '/annonces'; break;
    case 'news': path = '/actualites'; break;
    case 'garages': path = '/garages'; break;
    case 'tips': path = '/conseils'; break;
    case 'contact': path = '/contact'; break;
    case 'faq': path = '/faq'; break;
    case 'about': path = '/a-propos'; break;
    case 'favorites': path = '/mes-favoris'; break;
    case 'deposit': path = '/deposer-une-annonce'; break;
    case 'dashboard': path = '/mon-compte'; break;
    case 'dashboard-pro': path = '/espace-pro'; break;
    case 'tech-specs-brands': path = '/fiches-techniques'; break;
    case 'listing-details': path = `/annonce/${slugify(slug)}-${id}`; break;
    case 'article-details': path = `/article/${slugify(slug)}-${id}`; break;
    case 'tip-details': path = `/guide/${slugify(slug)}-${id}`; break;
    case 'garage-details': path = `/garage/${slugify(slug)}-${id}`; break;
    case 'tech-specs-details': path = `/fiche-technique/${slugify(slug)}-${id}`; break;
    case 'tech-specs-models': path = `/fiches-techniques/${slugify(brand)}`; break;
    default: path = '/';
  }

  // On ajoute les paramètres de requête pour les vues qui en dépendent (filtres ou onglets)
  if (['search', 'dashboard', 'dashboard-pro'].includes(view)) {
    return `${path}${encodeQueryParams(params)}`;
  }

  return path;
};

export const getStateFromUrl = () => {
  const hash = window.location.hash.slice(1);
  const [path, queryString] = hash.split('?');
  const normalizedPath = path || '/';
  
  const queryParams = queryString ? decodeQueryParams(`?${queryString}`) : {};
  
  for (const route of ROUTE_MAP) {
    const match = normalizedPath.match(route.pattern);
    if (match) {
      const state: any = { ...queryParams, view: route.view };
      if (match[1]) {
        if (route.view === 'tech-specs-models') {
          state.brand = match[1];
        } else {
          const parsedId = parseInt(match[1], 10);
          if (!isNaN(parsedId)) {
            state.id = parsedId;
          }
        }
      }
      return state;
    }
  }
  
  return { view: 'home' };
};