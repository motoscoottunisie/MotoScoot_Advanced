
import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { ViewStateName, NavigationParams, SearchFilters } from '../types';
import { getUrlFromState, getStateFromUrl } from '../utils/urlUtils';
import { ROUTES } from '../config/routes';

interface NavigationContextType {
  currentView: ViewStateName;
  params: NavigationParams;
  isLoggedIn: boolean;
  navigateTo: (view: ViewStateName, params?: NavigationParams) => void;
  goBack: () => void;
  triggerLogin: () => void;
  logout: () => Promise<void>;
  setIsLoggedIn: (val: boolean) => void;
  isLoginModalOpen: boolean;
  closeLoginModal: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewState, setViewState] = useState<NavigationParams & { view: ViewStateName }>(() => {
    try {
      const state = getStateFromUrl();
      return (state as any) || { view: 'home' };
    } catch (e) {
      return { view: 'home' };
    }
  });

  const prevViewRef = useRef<ViewStateName>(viewState.view);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('motoscoot_auth_session') === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const stateFromUrl = getStateFromUrl();
      if (stateFromUrl?.view) {
        const nextView = stateFromUrl.view;
        const currentView = prevViewRef.current;
        
        setViewState(stateFromUrl as any);
        
        // On ne scrolle que si on change réellement de page/vue
        if (nextView !== currentView) {
          window.scrollTo({ top: 0, behavior: 'auto' });
          prevViewRef.current = nextView;
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = useCallback((view: ViewStateName, params: NavigationParams = {}) => {
    const nextView = ROUTES[view] ? view : 'home';
    const currentView = prevViewRef.current;
    const urlPath = getUrlFromState(nextView, params);
    
    // Important: replace hash first to trigger listeners
    window.location.hash = urlPath;
    
    // Si la vue change, on force le scroll. 
    // Si c'est juste des filtres (même vue), on laisse l'utilisateur où il est.
    if (nextView !== currentView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      prevViewRef.current = nextView;
    }
  }, []);

  const goBack = useCallback(() => {
    const backMap: Partial<Record<ViewStateName, ViewStateName>> = {
      'listing-details': 'search',
      'article-details': 'news',
      'tip-details': 'tips',
      'garage-details': 'garages'
    };
    navigateTo(backMap[viewState.view] || 'home');
  }, [viewState.view, navigateTo]);

  // Fix: Error in file context/NavigationContext.tsx on line 89: An expression of type 'void' cannot be tested for truthiness.
  // Using a block statement instead of logical OR to call multiple void-returning functions.
  const triggerLogin = useCallback(() => {
    setIsMobileSheetOpen(false);
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  const logout = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoggedIn(false);
    localStorage.removeItem('motoscoot_auth_session');
    navigateTo('home');
  }, [navigateTo]);

  // Temporary fix for variable used in MenuLink but not defined
  const setIsMobileSheetOpen = (val: boolean) => {};

  const value = {
    currentView: viewState.view,
    params: viewState,
    isLoggedIn,
    navigateTo,
    goBack,
    triggerLogin,
    logout,
    setIsLoggedIn,
    isLoginModalOpen,
    closeLoginModal
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useAppNavigation must be used within a NavigationProvider');
  }
  return context;
};
