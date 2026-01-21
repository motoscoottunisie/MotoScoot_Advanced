
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageLayout } from './components/ui/Layout';
import LoginModal from './components/auth/LoginModal';
import { FavoritesProvider } from './context/FavoritesContext';
import { AdsProvider } from './context/AdsContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import { NavigationProvider, useAppNavigation } from './context/NavigationContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { ROUTES } from './config/routes';
import SEO from './components/common/SEO';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { SearchFilters, BasePageProps } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false
    },
  },
});

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
    <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Chargement...</p>
  </div>
);

const AppContent: React.FC = () => {
  const { 
    currentView, 
    params, 
    isLoggedIn, 
    setIsLoggedIn, 
    isLoginModalOpen, 
    closeLoginModal,
    navigateTo,
    triggerLogin,
    logout,
    goBack
  } = useAppNavigation();

  const route = ROUTES[currentView] || ROUTES['home'];

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('motoscoot_auth_session', 'true');
    closeLoginModal();
  };

  // Préparation des props pour les composants de page (Restauration des actions)
  const pageProps: BasePageProps = {
    onNavigate: navigateTo,
    onSearch: (filters: SearchFilters) => navigateTo('search', filters as any),
    onGoHome: () => navigateTo('home'),
    onBack: goBack,
    onTriggerLogin: triggerLogin,
    onLogout: logout,
    isLoggedIn,
    initialFilters: currentView === 'search' ? (params as unknown as SearchFilters) : null,
    listingId: params.id,
    articleId: params.id,
    tipId: params.id,
    garageId: params.id,
    specId: params.id,
    brand: params.brand,
    initialTab: params.tab,
  };

  return (
    <UserProvider isLoggedIn={isLoggedIn}>
      <SEO title={currentView === 'home' ? 'Achetez et vendez votre moto' : undefined} />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        onLogin={handleLoginSuccess} 
      />

      <PageLayout 
        variant={route.layoutVariant} 
        hideFooter={route.hideFooter}
        onNavigate={navigateTo}
        onGoHome={pageProps.onGoHome}
        isLoggedIn={isLoggedIn}
        onTriggerLogin={triggerLogin}
        onLogout={logout}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <route.component {...pageProps} />
        </Suspense>
      </PageLayout>
      
      <ToastContainer />
    </UserProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NavigationProvider>
          <ToastProvider>
            <FavoritesProvider>
              <AdsProvider>
                <AppContent />
              </AdsProvider>
            </FavoritesProvider>
          </ToastProvider>
        </NavigationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
