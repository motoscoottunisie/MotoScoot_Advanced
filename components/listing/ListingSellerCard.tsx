import React, { useState } from 'react';
import { Phone, ShieldCheck, Star, Store, ChevronRight, Facebook, Instagram, User, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { monitoring } from '../../utils/monitoring';
import { useAppNavigation } from '../../context/NavigationContext';
import { Listing } from '../../types';
import { formatWhatsAppLink } from '../../utils/formatUtils';
import { getOptimizedImageUrl } from '../../utils/urlUtils';

interface ListingSellerCardProps {
  listing: Listing;
  onShare?: () => void;
  className?: string;
}

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/icons/tiktok-icon-normal.svg" 
    alt="TikTok" 
    width={size} 
    height={size}
    className="brightness-0 invert-[0.5] group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 object-contain"
  />
);

const S = {
  SidebarCard: (isPro: boolean, className: string = "") => `bg-white rounded-[24px] border ${isPro ? 'border-primary-100 border-t-4 border-t-primary-600' : 'border-gray-100'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col ${className}`,
  PriceSection: "hidden md:block px-6 py-4 bg-gray-50/50 border-b border-gray-100",
  PriceLabel: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
  PriceValue: "text-[28px] md:text-[30px] font-black text-[#e6580b] tracking-tighter leading-none",
  
  SellerContent: "p-6 space-y-4 flex-1 flex flex-col",
  ProfileHeader: "flex items-center gap-4",
  LogoBox: "w-14 h-14 rounded-[100px] bg-white border border-gray-100 shadow-sm flex items-center justify-center p-1 overflow-hidden shrink-0 group-hover:border-primary-200 transition-colors",
  Avatar: "w-14 h-14 rounded-[100px] bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center text-xl font-black shadow-inner border-2 border-white shrink-0 overflow-hidden",
  AvatarImg: "w-full h-full object-cover rounded-[100px]",
  
  SellerName: "font-sans font-[800] text-[18px] text-[#262626] leading-tight tracking-[0px] block mb-0.5 truncate",
  VerifiedMention: "text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5",
  
  ProStats: "flex items-center justify-between py-3 border-y border-gray-50",
  StatItem: "flex flex-col",
  StatLabel: "text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5",
  StatValue: "text-[12px] font-extrabold text-gray-800 flex items-center gap-1",
  
  ActionStack: "hidden md:block flex flex-col gap-3 pt-2 mt-auto",
  
  ParticularLabel: "font-sans font-semibold text-[12px] text-[#4b5563] leading-[14px] tracking-[0px]",
  ParticularIcon: "text-gray-400 md:text-[#e65100]",
  
  CallBtn: "h-14 !bg-[#e65100] !text-white border !border-[#e65100] !rounded-[10px] hover:!bg-[#ea580c] !font-extrabold !text-[11px] !tracking-[0px] !normal-case shadow-none transition-all duration-200",
  WhatsAppBtn: "h-14 !bg-[#fff7ed] !text-[#e65100] border !border-[#e65100] !rounded-[10px] hover:!bg-[#ffedd5] !font-extrabold !text-[11px] !tracking-[0px] !normal-case shadow-none transition-all duration-200",
  
  StoreAccessRow: "flex items-center justify-between p-3 bg-primary-50/50 rounded-xl border border-primary-100/50 hover:bg-primary-100 transition-all cursor-pointer group",
  SocialGrid: "grid grid-cols-3 gap-2",
  SocialBtn: (color: string) => `flex items-center justify-center h-11 bg-gray-50 rounded-xl border border-gray-100 text-gray-400 hover:text-white transition-all active:scale-95 group ${color}`
};

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const ListingSellerCard: React.FC<ListingSellerCardProps> = ({ 
  listing,
  className,
  onShare
}) => {
  const { triggerLogin, isLoggedIn, navigateTo } = useAppNavigation();
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const isPro = listing.sellerType === 'Pro';

  const handlePhoneClick = () => {
    monitoring.trackEvent('ListingCallInitiated', { 
        seller: listing.seller, 
        listingId: listing.id,
        sellerType: listing.sellerType
    });

    if (!phoneRevealed) {
      setPhoneRevealed(true);
    } else {
      window.location.href = `tel:${listing.phone}`;
    }
  };

  const whatsappLink = formatWhatsAppLink(listing.phone, `Bonjour, je suis intéressé par votre annonce ${listing.title} sur MotoScoot.tn`);

  return (
    <div className={S.SidebarCard(isPro, className)}>
      {/* SECTION PRIX */}
      <div className={S.PriceSection}>
        <span className={S.PriceLabel}>Prix de vente</span>
        <h2 className={S.PriceValue}>{listing.price}</h2>
      </div>

      {/* CONTENU VENDEUR */}
      <div className={S.SellerContent}>
        <div className="space-y-4">
            <div className={S.ProfileHeader}>
              {isPro ? (
                <div className={S.LogoBox}>
                   {listing.sellerImage ? (
                     <img 
                        src={getOptimizedImageUrl(listing.sellerImage, 64, 64)} 
                        alt={listing.seller} 
                        className={S.AvatarImg} 
                     />
                   ) : (
                     <div className="w-full h-full bg-gray-900 rounded-[100px] flex items-center justify-center text-white font-black text-xl">
                       {listing.seller.charAt(0)}
                     </div>
                   )}
                </div>
              ) : (
                <div className={S.Avatar}>
                  {listing.sellerImage ? (
                    <img 
                      src={getOptimizedImageUrl(listing.sellerImage, 64, 64)} 
                      alt={listing.seller} 
                      className={S.AvatarImg} 
                    />
                  ) : (
                    listing.seller.charAt(0)
                  )}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <span className={S.VerifiedMention}>Profil vérifié</span>
                <h3 className={S.SellerName}>{listing.seller}</h3>
                <div className="flex items-center gap-2">
                    {isPro && (
                        <Badge variant="primary" size="xs" className="font-extrabold px-2 py-0.5">
                            PRO
                        </Badge>
                    )}
                </div>
              </div>
            </div>

            {/* INDICATEURS PRO / PARTICULIER */}
            {isPro ? (
              <div className={S.ProStats}>
                  <div className={S.StatItem}>
                      <span className={S.StatLabel}>Évaluation</span>
                      <span className={S.StatValue}><Star size={12} className="text-warning-400 fill-warning-400" /> 4.9 <span className="text-[10px] text-gray-400 font-medium">(42 avis)</span></span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className={S.StatItem}>
                      <span className={S.StatLabel}>En Boutique</span>
                      <span className={S.StatValue}><Store size={12} className="text-primary-600" /> 12 annonces</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className={S.StatItem}>
                      <span className={S.StatLabel}>Vérification</span>
                      <span className={S.StatValue}><ShieldCheck size={12} className="text-emerald-600" strokeWidth={3} /> <span className="text-emerald-600">Vérifiée</span></span>
                  </div>
              </div>
            ) : (
              <div className="py-2.5 border-y border-gray-50 space-y-2">
                 <div className="flex items-center gap-2">
                    <User size={14} className={S.ParticularIcon} />
                    <span className={S.ParticularLabel}>Particulier</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={14} className={S.ParticularIcon} />
                    <span className={S.ParticularLabel}>Membre depuis 2024</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <MapPin size={14} className={S.ParticularIcon} />
                    <span className={S.ParticularLabel}>{listing.location}</span>
                 </div>
              </div>
            )}

            {/* ACTIONS PRO : ACCÈS BOUTIQUE + RÉSEAUX SOCIAUX */}
            {isPro && (
              <div className="space-y-3">
                <div 
                  onClick={() => navigateTo('search', { seller: listing.seller })}
                  className={S.StoreAccessRow}
                >
                  <div className="flex items-center gap-3">
                    <Store size={16} className="text-primary-600" />
                    <span className="text-[11px] font-black text-primary-900 uppercase tracking-tight">Accéder à la boutique</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border border-primary-100 flex items-center justify-center text-primary-600 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
                </div>

                {/* Boutons Réseaux Sociaux */}
                <div className={S.SocialGrid}>
                   <a href="#" target="_blank" rel="noopener noreferrer" className={S.SocialBtn('hover:bg-[#1877F2] hover:border-[#1877F2]')} aria-label="Facebook">
                      <Facebook size={20} />
                   </a>
                   <a href="#" target="_blank" rel="noopener noreferrer" className={S.SocialBtn('hover:bg-[#E4405F] hover:border-[#E4405F]')} aria-label="Instagram">
                      <Instagram size={20} />
                   </a>
                   <a href="#" target="_blank" rel="noopener noreferrer" className={S.SocialBtn('hover:bg-black hover:border-black')} aria-label="TikTok">
                      <TikTokIcon size={20} />
                   </a>
                </div>
              </div>
            )}
        </div>

        {/* ACTIONS BOUTONS */}
        <div className={S.ActionStack}>
          <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="primary" 
                className={S.CallBtn} 
                onClick={handlePhoneClick}
                leftIcon={<Phone size={18} fill="currentColor" />}
                disabled={!listing.phone}
              >
                <span className="truncate">
                  {phoneRevealed ? listing.phone : "Appeler"}
                </span>
              </Button>

              <a 
                href={isLoggedIn ? whatsappLink : '#'} 
                target={isLoggedIn ? "_blank" : undefined}
                rel="noreferrer"
                className="block"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    triggerLogin();
                    return;
                  }
                }}
              >
                <Button 
                  variant="outline" 
                  fullWidth 
                  className={S.WhatsAppBtn}
                  leftIcon={<WhatsAppIcon size={18}/>}
                >
                  WhatsApp
                </Button>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};