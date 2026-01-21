import React, { useMemo, memo } from 'react';
import { BarChart3, TrendingUp, Package, Heart } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useFavorites } from '../../context/FavoritesContext';

const S = {
  HeaderContainer: "mb-10",
  Title: "text-2xl font-extrabold text-[#171717]",
  Subtitle: "text-sm text-gray-500 font-medium mt-1",
  StatCard: "bg-white p-3.5 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[110px] md:min-h-[190px] relative overflow-hidden group transition-all hover:shadow-lg hover:border-orange-100",
  CardIcon: (color: string, bg: string) => `w-7 h-7 md:w-14 md:h-14 rounded-lg md:rounded-2xl ${bg} ${color} flex items-center justify-center mb-1 md:mb-8 transition-transform group-hover:scale-110 duration-500`,
};

const StatCard = memo(({ label, value, icon: Icon, color, bg }: any) => (
  <div className={S.StatCard}>
    <div className="flex justify-between items-start">
      <div className={S.CardIcon(color, bg)}>
        <Icon className="w-4 h-4 md:w-7 md:h-7" strokeWidth={2.5} />
      </div>
    </div>
    <div className="space-y-0.5">
      <h4 className="text-[32px] md:text-4xl font-black text-gray-900 leading-none">{value}</h4>
      <p className="text-[12px] md:text-[10px] text-gray-500 font-bold uppercase tracking-tight">{label}</p>
    </div>
  </div>
));

const OverviewTab: React.FC<any> = () => {
  const { favoritesCount } = useFavorites();
  
  const stats = {
    totalAds: 5,
    totalViews: 2590
  };

  return (
    <div className="space-y-6 md:space-y-12 animate-fade-in" style={{ letterSpacing: '0px' }}>
      <div className={S.HeaderContainer}>
        <h2 className={S.Title}>Tableau de bord</h2>
        <p className={S.Subtitle}>Retrouvez les statistiques de votre activité et vos performances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <Reveal animation="fade-in-up" delay={100}>
          <StatCard 
            label="Annonces en ligne" 
            value={stats.totalAds} 
            icon={Package} 
            color="text-orange-600" 
            bg="bg-orange-50" 
          />
        </Reveal>
        
        <Reveal animation="fade-in-up" delay={200}>
          <StatCard 
            label="Vues cumulées" 
            value={stats.totalViews.toLocaleString()} 
            icon={BarChart3} 
            color="text-blue-600" 
            bg="bg-blue-50" 
          />
        </Reveal>

        <Reveal animation="fade-in-up" delay={300}>
          <StatCard 
            label="Annonces favorites" 
            value={favoritesCount} 
            icon={Heart} 
            color="text-red-600" 
            bg="bg-red-50" 
          />
        </Reveal>
      </div>

      <Reveal animation="fade-in-up" delay={400}>
        <div className="bg-white rounded-2xl p-6 md:py-8 md:px-10 border border-gray-100 relative overflow-hidden shadow-sm">
           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-[#e65100]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                  <div className="flex flex-col mb-1 md:mb-1.5">
                    <h3 className="font-bold text-lg md:text-xl uppercase text-[#121826]">Conseil Performance</h3>
                  </div>
                  <p className="text-[#6d727f] text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                    Les annonces avec plus de <strong className="text-[#121826]">5 photos HD</strong> reçoivent en moyenne <strong className="text-[#e65100] font-bold">2.5x plus de messages</strong>.
                  </p>
              </div>
           </div>
        </div>
      </Reveal>
    </div>
  );
};

export default memo(OverviewTab);