import React, { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../Footer';
import { throttle } from '../../utils/perfUtils';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: 'white' | 'transparent';
  onNavigate?: (view: string, params?: any) => void;
  onGoHome?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
  hideFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  variant = 'white',
  onNavigate,
  onGoHome,
  isLoggedIn,
  onTriggerLogin,
  onLogout,
  hideFooter = false
}) => {
  const isOnline = useOnlineStatus();
  
  useEffect(() => {
    const handleResize = throttle(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white py-2 px-4 z-[110] flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest animate-fade-in">
          <WifiOff size={14} /> Mode hors-ligne - Vérifiez votre connexion
        </div>
      )}
      
      {/* 
          Fix: Header uses useAppNavigation internally, so passing navigation props here 
          is redundant and causes TypeScript errors based on Header's defined props.
      */}
      <Header 
        variant={variant}
      />
      
      {/* 
          Désormais on revient à un pb-0 par défaut car la Bottom Bar a été supprimée.
          L'ergonomie est maintenant concentrée dans la Bottom Sheet déclenchée par le Hamburger.
          Modification : pt-[3.75rem] -> pt-[4.75rem] sur desktop.
      */}
      <main className={`flex-grow outline-none pb-0 ${variant === 'white' ? 'pt-24 md:pt-[4.75rem]' : ''}`}>
        {children}
      </main>

      {!hideFooter && (
        <Footer 
          onNavigate={(view) => onNavigate?.(view)} 
        />
      )}
    </div>
  );
};