import React from 'react';
import { Calendar, Gauge, Zap, Info, ShieldCheck, User, MapPin, Phone, SearchCheck, Clock } from 'lucide-react';

interface ListingInfoProps {
  brand: string;
  model: string;
  price: string;
  location: string;
  date?: string;
  year: string;
  mileage: string;
  cc: string;
  condition: string;
  type: string;
  seller: string;
  sellerType: string;
  sellerPhone?: string;
  viewMode: 'grid' | 'list';
  favorited?: boolean;
  onFavoriteToggle?: () => void;
}

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const ListingInfo: React.FC<ListingInfoProps> = ({
  brand,
  model,
  price,
  location,
  date = "Récemment",
  year,
  mileage,
  cc,
  condition,
  type,
  seller,
  sellerType,
  sellerPhone,
  viewMode,
  favorited,
  onFavoriteToggle
}) => {
  const isGrid = viewMode === 'grid';
  const isAccessory = type === 'Accessoires';
  const isPro = sellerType === 'Pro';

  const cleanPhone = sellerPhone?.replace(/\s/g, '') || '';
  const cleanLocation = location.split(',')[0];

  if (isGrid) {
    return (
      <div className="flex flex-col flex-1 w-full h-full font-sans">
        <h3 className="text-[17px] font-extrabold text-gray-900 line-clamp-1 leading-snug tracking-tight mb-1">
          {brand} {model}
        </h3>

        <p className="text-[16px] font-[900] text-primary-600 leading-none mb-6 tracking-tighter">
          {price}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold text-gray-500 leading-none mb-3 tracking-tight">
          {!isAccessory ? (
            <>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gray-400" />
                <span>{year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge size={13} className="text-gray-400" />
                <span>{mileage}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={13} className="text-gray-400" />
                <span>{cc}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-gray-400">
               <Info size={13} />
               <span>Accessoire</span>
            </div>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-5 text-[12px] font-semibold text-gray-500 leading-none tracking-tight">
           <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-400" />
              <span className="truncate">{cleanLocation}</span>
           </div>
           <div className="flex items-center gap-1.5">
              <SearchCheck size={13} className="text-gray-400" />
              <span className="truncate">{condition}</span>
           </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100/80">
          <div className="flex items-center gap-3 min-w-0">
             <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 overflow-hidden shrink-0">
                <User size={18} />
             </div>
             <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-extrabold text-gray-700 truncate uppercase leading-tight tracking-wider">
                   {seller}
                </span>
                <span className="text-[10px] font-medium text-gray-400 leading-tight mt-0.5 whitespace-nowrap">
                   {isPro ? 'Vendeur Pro' : 'Vendeur Particulier'}
                </span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-2 shrink-0">
            <a 
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); }}
              className="w-14 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-[#F3FFF6] border border-[#25D366] text-[#25D366] transition-all hover:bg-[#e8f9ed] active:scale-95 shadow-sm"
            >
              <WhatsAppIcon size={18} />
            </a>
            
            <a 
              href={`tel:${cleanPhone}`}
              onClick={(e) => { e.stopPropagation(); }}
              className="w-14 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-primary-50 border border-primary-600 text-primary-600 transition-all duration-300 hover:bg-primary-100 active:scale-95 shadow-sm"
            >
              <Phone size={16} fill="currentColor" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow min-w-0 md:p-3 lg:p-5 gap-4 font-sans">
      <div className="md:hidden space-y-1">
        <h3 className="text-xl font-extrabold text-gray-900 leading-snug tracking-tight line-clamp-1">
          {brand} {model}
        </h3>
        <span className="font-black text-primary-600 tracking-tighter leading-none text-xl block mb-4">
          {price}
        </span>
      </div>

      <div className="hidden md:flex flex-col gap-1.5">
        <h3 className="text-[22px] font-extrabold text-gray-900 leading-tight tracking-tighter">
          {brand} {model}
        </h3>

        <div className="flex items-center gap-3 text-[12px] font-semibold text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin size={13} strokeWidth={2.5} />
            <span>{cleanLocation}</span>
          </div>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <div className="flex items-center gap-1">
            <Clock size={13} strokeWidth={2.5} />
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-extrabold text-gray-500 uppercase tracking-widest my-1">
        {!isAccessory ? (
          <>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><Calendar size={13} className="text-gray-400" /> <span>{year}</span></div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><Gauge size={13} className="text-gray-400" /> <span>{mileage}</span></div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><Zap size={13} className="text-gray-400" /> <span>{cc}</span></div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100/50"><SearchCheck size={13} className="text-gray-400" /> <span>{condition}</span></div>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-gray-400"><Info size={14} /> <span>Accessoire</span></div>
        )}
      </div>

      <div className="md:hidden flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest my-1.5">
        {!isAccessory ? (
          <>
            <div className="flex items-center gap-1.5 text-gray-500"><Calendar size={14} /> <span>{year}</span></div>
            <div className="flex items-center gap-1.5 text-gray-500"><Gauge size={14} /> <span>{mileage}</span></div>
            <div className="flex items-center gap-1.5 text-gray-500"><Zap size={14} /> <span>{cc}</span></div>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-gray-400"><Info size={14} /> <span>Accessoire</span></div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-3 mt-auto pt-3 border-t border-gray-50">
        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
          <User size={18} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-extrabold text-gray-700 truncate uppercase leading-tight tracking-wider">
            {seller}
          </span>
          <span className="text-[10px] font-medium text-gray-400 leading-tight mt-0.5 whitespace-nowrap">
            {isPro ? 'Vendeur Pro' : 'Vendeur Particulier'}
          </span>
        </div>
      </div>
    </div>
  );
};