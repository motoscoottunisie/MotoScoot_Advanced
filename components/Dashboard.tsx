
import React, { useState, useEffect, useCallback, useMemo, memo, Suspense, lazy } from 'react';
import { 
  Eye, 
  Settings, 
  LogOut, 
  List,
  User as UserIcon,
  Bell,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { Skeleton } from './ui/Skeleton';
import { BasePageProps } from '../types';
import { useUser } from '../context/UserContext';
import { useFavorites } from '../context/FavoritesContext';
import { mockListings } from '../data/mockData';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { monitoring } from '../utils/monitoring';

// --- TABS LAZY LOADING ---
const OverviewTab = lazy(() => import('./dashboard/OverviewTab'));
const MyAdsTab = lazy(() => import('./dashboard/MyAdsTab'));
const SettingsTab = lazy(() => import('./dashboard/SettingsTab'));
const FavoritesTab = lazy(() => import('./dashboard/FavoritesTab'));

// --- TYPES ---
type DashboardTab = 'overview' | 'my-ads' | 'favorites' | 'settings';

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: "Aperçu", icon: Eye },
  { id: 'my-ads', label: "Annonces", icon: List },
  { id: 'favorites', label: "Favoris", icon: Heart },
  { id: 'settings', label: "Profil", icon: UserIcon },
];

const S = {
  Wrapper: "min-h-screen bg-[#F9FAFB] font-sans selection:bg-orange-100 pb-24 md:pb-0",
  MainContainer: "max-w-7xl mx-auto px-4 md:px-8 pt-2 md:pt-4 pb-12 flex flex-col md:flex-row gap-8 items-start",
  
  Sidebar: "hidden md:flex w-[280px] h-[75vh] bg-white rounded-2xl border border-gray-100 flex-shrink-0 flex-col sticky top-28 z-40 shadow-sm overflow-hidden",
  NavSection: "px-4 py-6",
  NavBtn: (active: boolean) => `
    w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group outline-none
    ${active 
      ? 'bg-[#E65100] text-white shadow-lg shadow-orange-600/20' 
      : 'text-[#4b5563] hover:text-[#E65100] hover:bg-orange-50/50'}
  `,
  
  MobileNav: "fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 py-3 md:hidden flex justify-around items-center safe-area-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.08)]",
  MobileNavBtn: (active: boolean) => `
    flex flex-col items-center gap-1 transition-all active:scale-90 flex-1 py-1
    ${active ? 'text-[#E65100]' : 'text-gray-300'}
  `,
  
  Content: "flex-1 w-full min-w-0 transition-all duration-300",
};

const SidebarNavItem = memo(({ item, active, onClick }: { item: NavItem, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className={S.NavBtn(active)} 
    type="button"
    role="tab"
    aria-selected={active}
  >
    <item.icon size={16} strokeWidth={2} />
    <span className="uppercase">{item.label}</span>
  </button>
));

const UserProfileSidebar = memo(() => {
  const { user, isLoading } = useUser();
  
  if (isLoading || !user) {
    return (
      <div className="p-8 border-b border-gray-50 animate-pulse">
        <div className="w-14 h-14 rounded-[6px] bg-gray-100 mb-4" />
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>
    );
  }

  return (
    <div className="p-8 border-b border-gray-50 bg-gradient-to-br from-white to-gray-50/50">
      <div className="flex items-center gap-4 mb-2">
        <div className="relative">
          <div className="w-14 h-14 rounded-[6px] bg-gradient-to-br from-[#E65100] to-[#DD2C14] flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
            <ShieldCheck size={14} className="text-emerald-500" strokeWidth={2} />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-gray-900 text-base truncate leading-tight">
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-gray-400 text-[9px] font-bold uppercase bg-white px-2 py-0.5 rounded-full border border-gray-100 w-fit mt-1">
            {user.memberType}
          </span>
        </div>
      </div>
    </div>
  );
});

const Dashboard: React.FC<BasePageProps> = ({ onNavigate, onLogout, isLoggedIn, initialTab }) => {
  const [activeMenu, setActiveMenu] = useState<DashboardTab>((initialTab as DashboardTab) || 'overview');
  const { user } = useUser();
  const { favorites, toggleFavorite } = useFavorites();
  
  useEffect(() => {
    const tabFromUrl = (initialTab as DashboardTab) || 'overview';
    if (tabFromUrl !== activeMenu) {
      setActiveMenu(tabFromUrl);
    }
  }, [initialTab]);

  useEffect(() => {
    if (isLoggedIn === false) onNavigate?.('home');
  }, [isLoggedIn, onNavigate]);

  const handleLogoutClick = useCallback(async () => {
    if (window.confirm("Souhaitez-vous vraiment vous déconnecter ?")) {
      monitoring.trackEvent('UserLogoutInitiated', { userId: user?.id });
      await onLogout?.();
    }
  }, [onLogout, user?.id]);

  const handleDeleteAccountClick = useCallback(() => {
    if (window.confirm("ALERTE CRITIQUE : Souhaitez-vous vraiment supprimer définitivement votre compte ? Cette action est irréversible et supprimera toutes vos annonces.")) {
      monitoring.trackEvent('UserAccountDeletionInitiated', { userId: user?.id });
      alert("Votre demande a été prise en compte.");
    }
  }, [user?.id]);

  const savedListings = useMemo(() => {
    return mockListings.filter(l => favorites.listings.includes(l.id));
  }, [favorites.listings]);

  if (!isLoggedIn) return null;

  return (
    <div className={S.Wrapper} style={{ letterSpacing: '0px' }}>
      <div className={S.MainContainer}>
        <aside className={S.Sidebar}>
          <UserProfileSidebar />
          
          <nav className={S.NavSection} role="tablist">
            <div className="space-y-2">
              {NAV_ITEMS.map(item => (
                <SidebarNavItem 
                  key={item.id} 
                  item={item} 
                  active={activeMenu === item.id} 
                  onClick={() => {
                    setActiveMenu(item.id);
                    onNavigate?.('dashboard', { tab: item.id });
                  }} 
                />
              ))}
            </div>
          </nav>

          <div className="p-8 mt-auto border-t border-gray-50 bg-gray-50/20 space-y-4">
            <button 
              onClick={handleDeleteAccountClick} 
              className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors group"
            >
              <Trash2 size={16} className="group-hover:scale-110 transition-transform" /> 
              <span>Supprimer le compte</span>
            </button>
            <button 
              onClick={handleLogoutClick} 
              className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        <nav className={S.MobileNav}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                onNavigate?.('dashboard', { tab: item.id });
              }}
              className={S.MobileNavBtn(activeMenu === item.id)}
            >
              <item.icon size={22} strokeWidth={2} />
              <span className="text-[9px] font-bold uppercase text-[#111827]">{item.label}</span>
            </button>
          ))}
        </nav>

        <main className={S.Content} key={activeMenu}>
          <ErrorBoundary>
            <Suspense fallback={
              <div className="p-12 text-center flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Chargement...</span>
              </div>
            }>
              <div className="animate-fade-in outline-none">
                {activeMenu === 'overview' && <OverviewTab onNavigate={onNavigate as any} />}
                {activeMenu === 'my-ads' && <MyAdsTab onNavigate={onNavigate as any} />}
                {activeMenu === 'favorites' && (
                  <FavoritesTab 
                    listings={savedListings} 
                    onToggleFavorite={toggleFavorite} 
                    onNavigate={onNavigate as any} 
                  />
                )}
                {activeMenu === 'settings' && <SettingsTab onUpdate={() => {}} />}
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default memo(Dashboard);
