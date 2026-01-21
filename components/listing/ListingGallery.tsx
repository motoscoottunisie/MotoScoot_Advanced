import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, ArrowLeft, Share2 } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/urlUtils';
import { useAppNavigation } from '../../context/NavigationContext';

interface ListingGalleryProps {
  images: string[];
  title: string;
  brand?: string;
  model?: string;
  favorited: boolean;
  onFavoriteToggle: (e?: React.MouseEvent) => void;
  onShare?: () => void;
}

const S = {
  GalleryMain: "relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden bg-gray-900 group shadow-md select-none md:cursor-zoom-in transition-transform active:scale-[0.99] touch-pan-y",
  GalleryNav: "absolute inset-y-0 flex items-center justify-between px-3 w-full pointer-events-none z-20",
  GalleryBtn: "w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full text-gray-900 shadow-xl pointer-events-auto active:scale-90 transition-all hover:bg-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100",
  ThumbsWrapper: "hidden md:flex gap-2.5 mt-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory",
  Thumb: (active: boolean) => `
    relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer snap-start
    ${active 
      ? 'border-[#E65100] ring-2 ring-orange-50 scale-[0.98]' 
      : 'border-transparent opacity-60 hover:opacity-100'}
  `,
  Counter: "absolute bottom-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg text-white text-[10px] font-extrabold uppercase tracking-widest border border-white/10 z-20",
  DotPagination: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 md:hidden",
  Dot: (active: boolean) => `w-1.5 h-1.5 rounded-full transition-all duration-300 ${active ? 'bg-white w-4' : 'bg-white/40'}`,
  
  OverlayActionBtn: "w-11 h-11 md:w-12 md:h-12 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-full transition-all duration-300 active:scale-90 flex items-center justify-center group/btn",
  
  FullscreenWrapper: "fixed inset-0 z-[500] bg-neutral-950 flex flex-col items-center justify-center animate-fade-in touch-none select-none",
  TheaterHeader: "absolute top-0 left-0 right-0 z-[520] p-6 md:p-8 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent",
  HeaderInfo: "flex flex-col gap-1 pr-4 hidden md:flex",
  TheaterTitle: "text-[#E6580B] text-lg md:text-2xl font-black tracking-tight drop-shadow-sm",
  TheaterCounter: "text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest",
  CloseBtn: "w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all active:scale-90 border border-white/10 shadow-xl",
  ImageContainer: "relative w-full h-full flex items-center justify-center overflow-hidden p-4 md:p-12",
  TheaterImg: "w-full h-full object-contain transition-all duration-500 animate-scale-in",
  NavArrow: (side: 'left' | 'right') => `absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-6' : 'right-6'} z-[530] hidden md:flex w-16 h-16 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white transition-all active:scale-90 border border-white/5 backdrop-blur-sm group`,

  MobileTitleCard: "absolute bottom-0 left-0 right-0 z-[520] p-6 md:hidden bg-white/95 backdrop-blur-md rounded-t-[2rem] flex flex-col items-start shadow-[0_-10px_30px_rgba(0,0,0,0.1)] border-t border-gray-100",
  MobileBrand: "text-[#e6580b] font-bold text-[14px] leading-none mb-1 tracking-[0px] font-sans",
  MobileModel: "text-[#111827] font-extrabold text-[24px] leading-tight tracking-[0px] font-sans",
  BottomRail: "absolute bottom-8 left-0 right-0 z-[520] hidden md:flex flex-col items-center gap-4 animate-fade-in"
};

export const ListingGallery: React.FC<ListingGalleryProps> = ({ 
  images, 
  title, 
  brand,
  model,
  favorited, 
  onFavoriteToggle, 
  onShare
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { goBack } = useAppNavigation();
  
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextImg();
    if (isRightSwipe) prevImg();
  };

  const nextImg = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImg = useCallback(() => {
    setActiveImg((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, nextImg, prevImg]);

  return (
    <div className="relative font-sans">
      <div className="w-full">
        <div 
          className={S.GalleryMain} 
          onClick={() => setIsFullscreen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img 
            src={getOptimizedImageUrl(images[activeImg], 1200, 900, 90)} 
            className="w-full h-full object-cover animate-fade-in pointer-events-none" 
            alt={title}
            loading="eager"
          />
          
          <div className={S.Counter}>{activeImg + 1} / {images.length}</div>
          
          {images.length > 1 && (
            <div className={S.DotPagination}>
              {images.map((_, idx) => (
                <div key={idx} className={S.Dot(activeImg === idx)} />
              ))}
            </div>
          )}
          
          <div className="md:hidden absolute top-4 left-4 z-30">
            <button onClick={(e) => { e.stopPropagation(); goBack(); }} className={S.OverlayActionBtn}>
              <ArrowLeft size={20} strokeWidth={2.5} className="text-gray-900" />
            </button>
          </div>

          <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); onShare?.(); }} 
              className={`${S.OverlayActionBtn} hover:bg-white/90`}
              aria-label="Partager l'annonce"
            >
              <Share2 size={20} strokeWidth={2.5} className="text-gray-900 group-hover/btn:text-primary-600 transition-colors" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); onFavoriteToggle(e); }} 
              className={`${S.OverlayActionBtn} hover:bg-white/90`}
              aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart 
                size={20} 
                strokeWidth={2.5} 
                fill={favorited ? "#EF4444" : "none"} 
                className={`transition-all duration-300 ${favorited ? 'text-red-500 scale-110 animate-heartbeat' : 'text-gray-900 group-hover/btn:text-red-500'}`} 
              />
            </button>
          </div>
        </div>

        {images.length > 1 && !isFullscreen && (
          <div className={S.ThumbsWrapper}>
            {images.map((img, idx) => (
              <button key={idx} className={S.Thumb(activeImg === idx)} onClick={() => setActiveImg(idx)}>
                <img src={getOptimizedImageUrl(img, 200, 150, 70)} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div 
          className={S.FullscreenWrapper}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={S.TheaterHeader}>
             <div className={S.HeaderInfo}>
                <h2 className={S.TheaterTitle}>{title}</h2>
                <div className={S.TheaterCounter}>
                  Photo {activeImg + 1} / {images.length}
                </div>
             </div>
             <button 
               onClick={() => setIsFullscreen(false)} 
               className={S.CloseBtn}
               aria-label="Fermer"
             >
                <X className="w-5 h-5 md:w-7 md:h-7" strokeWidth={3} />
             </button>
          </div>

          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className={S.NavArrow('left')}>
                <ChevronLeft size={40} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className={S.NavArrow('right')}>
                <ChevronRight size={40} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          <div className={S.ImageContainer} onClick={() => setIsFullscreen(false)}>
            <img key={`fs-${activeImg}`} src={images[activeImg]} className={S.TheaterImg} alt={title} loading="eager" />
          </div>

          {images.length > 1 && (
            <div className={S.BottomRail}>
               <div className="flex gap-2.5 max-w-[80vw] overflow-x-auto no-scrollbar px-10 py-4">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImg(idx); }} className={`w-16 h-12 md:w-20 md:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === idx ? 'border-orange-500 scale-110 shadow-2xl' : 'border-white/10 opacity-30 hover:opacity-100 hover:scale-105'}`}>
                      <img src={getOptimizedImageUrl(img, 200, 150)} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
               </div>
            </div>
          )}

          <div className={S.MobileTitleCard}>
             <span className={S.MobileBrand}>{brand}</span>
             <h2 className={S.MobileModel}>{model}</h2>
             <div className="flex items-center justify-between w-full mt-4">
                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Photo {activeImg + 1} / {images.length}</span>
                <span className="text-gray-300 text-[9px] font-bold uppercase tracking-[0.2em] animate-pulse">Glissez pour naviguer</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
