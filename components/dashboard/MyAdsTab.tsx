import React, { useMemo, useState, memo, useCallback, useRef, useEffect } from 'react';
import { 
  Eye, 
  EyeOff,
  Clock, 
  Trash2, 
  Search, 
  Filter,
  Handshake,
  Pencil,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  DollarSign,
  Bell,
  Check,
  ChevronDown
} from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

const INITIAL_ADS = [
  { id: 1, title: "Yamaha TMAX 560 Tech Max 2024", status: 'Actif', views: 1250, date: "15 Jan 2025", price: "54 000 DT", image: "https://www.magma-studio.tn/portfolio2/moto/tmax.jpg" },
  { id: 2, title: "SYM Fiddle 4 - État Neuf Garantie 2 ans", status: 'Actif', views: 450, date: "12 Jan 2025", price: "8 200 DT", image: "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg" },
  { id: 3, title: "Casque Shoei GT-Air II Insignia", status: 'Vendu', views: 890, date: "05 Jan 2025", price: "1 800 DT", image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/04/7d/9e/047d9edc33c9e26f7c717cac7b77be769b98218d.jpg?rule=ad-large" },
  { id: 4, title: "Kawasaki Z900 Full Black Edition Spéciale", status: 'Inactif', views: 2100, date: "02 Jan 2025", price: "42 500 DT", image: "https://blog.3as-racing.com/wp-content/uploads/2024/12/mt-07-2025-1024x683.jpg" },
  { id: 5, title: "Honda PCX 125 2023 Grise", status: 'Actif', views: 320, date: "20 Jan 2025", price: "12 900 DT", image: "https://listing-images.autoscout24.ch/396/11570396/2107650484.jpg?w=1920&q=90" },
];

const MyAdsTab: React.FC<any> = ({ onNavigate }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [tempPrice, setTempPrice] = useState("");
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: ads = [] } = useQuery({
    queryKey: ['dashboard_ads'],
    queryFn: async () => INITIAL_ADS,
    staleTime: Infinity,
  });

  const handleEditPriceClick = useCallback((ad: any) => {
    setEditingAd(ad);
    setTempPrice(ad.price.replace(/\D/g, ''));
    setIsPriceModalOpen(true);
  }, []);

  const handleSavePrice = () => {
    if (!tempPrice || isNaN(Number(tempPrice))) return;
    queryClient.setQueryData(['dashboard_ads'], (old: any) => 
      old.map((ad: any) => ad.id === editingAd.id ? { ...ad, price: `${parseInt(tempPrice).toLocaleString()} DT` } : ad)
    );
    setIsPriceModalOpen(false);
    addToast("Prix mis à jour avec succès", "success");
  };

  const handleToggleStatus = useCallback((id: number, currentStatus: string) => {
    if (currentStatus === 'Vendu') return;
    const nextStatus = currentStatus === 'Actif' ? 'Inactif' : 'Actif';
    queryClient.setQueryData(['dashboard_ads'], (old: any) => 
      old.map((ad: any) => ad.id === id ? { ...ad, status: nextStatus } : ad)
    );
    addToast(`Visibilité modifiée : ${nextStatus}`, "info");
  }, [queryClient, addToast]);

  const handleMarkAsSold = useCallback((id: number) => {
    if (window.confirm("Marquer cet article comme vendu ?")) {
      queryClient.setQueryData(['dashboard_ads'], (old: any) => 
        old.map((ad: any) => ad.id === id ? { ...ad, status: 'Vendu' } : ad)
      );
      addToast("Vente enregistrée !", "success");
    }
  }, [queryClient, addToast]);

  const handleDelete = useCallback((id: number) => {
    if (window.confirm("Supprimer définitivement cette annonce ?")) {
      queryClient.setQueryData(['dashboard_ads'], (old: any) => old.filter((ad: any) => ad.id !== id));
      addToast("Annonce supprimée.", "info");
    }
  }, [queryClient, addToast]);

  const filteredAds = useMemo(() => {
    return ads.filter(ad => {
      const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Tous" || ad.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [ads, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const paginatedAds = filteredAds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statusOptions = [
    { id: 'Tous', label: 'Toutes les annonces', color: 'bg-gray-400' },
    { id: 'Actif', label: 'Annonces en ligne', color: 'bg-emerald-500' },
    { id: 'Inactif', label: 'Annonces masquées', color: 'bg-amber-500' },
    { id: 'Vendu', label: 'Ventes terminées', color: 'bg-blue-500' }
  ];

  return (
    <div className="space-y-6 md:space-y-8 font-['Inter'] relative animate-fade-in">
      
      {/* Header Harmonisé */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-extrabold text-[#171717]">Mes Annonces</h2>
          <p className="text-sm text-gray-500 font-medium mt-1 truncate">Gérez vos publications et suivez leur impact sur le marché.</p>
        </div>
        
        {/* Recherche + Filtre Desktop (Regroupés à droite) */}
        <div className="hidden md:flex items-center gap-3 w-full max-w-[340px] relative" ref={dropdownRef}>
          <div className="flex-1">
            <Input 
              placeholder="Rechercher..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              leftIcon={<Search size={18} className="text-gray-400" />}
              className="bg-white border-gray-100 rounded-xl h-11 text-sm font-medium shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
            className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all shadow-sm shrink-0 ${
              isStatusMenuOpen || statusFilter !== 'Tous'
                ? 'bg-orange-50 border-orange-500 text-orange-600' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-600'
            }`}
            title="Filtrer par état"
          >
            <Filter size={18} strokeWidth={2} />
          </button>

          {/* Menu de Filtrage Desktop (Positionné par rapport au groupe) */}
          {isStatusMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[200] animate-scale-in origin-top-right overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Filtrer par statut</span>
              </div>
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { 
                    setStatusFilter(opt.id); 
                    setCurrentPage(1); 
                    setIsStatusMenuOpen(false); 
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-colors ${
                    statusFilter === opt.id ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${opt.color} shadow-sm`}></div>
                    <span>{opt.label}</span>
                  </div>
                  {statusFilter === opt.id && <Check size={16} strokeWidth={2} className="text-orange-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Prix */}
      {isPriceModalOpen && editingAd && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-10 shadow-2xl border border-gray-100 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 uppercase">Nouveau Prix</h3>
              <button onClick={() => setIsPriceModalOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={18}/></button>
            </div>
            <Input label="MONTANT (DT)" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} type="number" leftIcon={<DollarSign size={18} />} className="mb-10" />
            <div className="grid grid-cols-2 gap-4">
              <Button variant="ghost" onClick={() => setIsPriceModalOpen(false)} className="rounded-2xl">Annuler</Button>
              <Button variant="primary" onClick={handleSavePrice} className="rounded-2xl">Valider</Button>
            </div>
          </div>
        </div>
      )}

      {/* Barre de Recherche Mobile avec Nouveau Filtre Optimisé */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
            <Input 
              placeholder="Chercher une annonce..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              leftIcon={<Search size={18} className="text-gray-400" />}
              className="border-none bg-gray-50/50 text-sm font-bold h-10 rounded-xl"
            />
          </div>
        </div>

        {/* Nouveau Bouton de Filtre Mobile (Select Native pour une meilleure ergonomie tactile) */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full h-12 pl-12 pr-10 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-700 shadow-sm appearance-none outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          >
            <option value="Tous">Toutes les annonces</option>
            <option value="Actif">Annonces En ligne</option>
            <option value="Inactif">Annonces Masquées</option>
            <option value="Vendu">Ventes terminées</option>
          </select>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none">
            <Filter size={18} strokeWidth={2.5} />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Table Desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-50">
            <tr>
              <th className="px-8 py-6 text-[13px] font-bold text-[#212121] tracking-normal">Annonce</th>
              <th className="px-8 py-6 text-[13px] font-bold text-[#212121] tracking-normal">Statut</th>
              <th className="px-8 py-6 text-[13px] font-bold text-[#212121] tracking-normal">Vues</th>
              <th className="px-8 py-6 text-[13px] font-bold text-[#212121] tracking-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedAds.map(ad => (
              <tr key={ad.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-50 shadow-sm">
                      <img src={ad.image} className="w-full h-full object-cover" alt={ad.title} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-[14px] text-[#111827] leading-[21px] tracking-[0px] line-clamp-1">{ad.title}</span>
                      <span className="text-[11px] font-bold text-orange-600 uppercase mt-1">{ad.price}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={ad.status === 'Actif' ? 'success' : ad.status === 'Vendu' ? 'info' : 'default'} size="xs" className="font-bold px-3 py-1">
                    {ad.status === 'Actif' ? 'EN LIGNE' : ad.status === 'Inactif' ? 'MASQUÉ' : 'VENDU'}
                  </Badge>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                    <Eye size={16} className="text-gray-200" strokeWidth={2} /> {ad.views.toLocaleString()}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2.5">
                    <button onClick={() => handleEditPriceClick(ad)} className="p-3 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-90" title="Prix"><Pencil size={16} strokeWidth={2}/></button>
                    <button onClick={() => handleToggleStatus(ad.id, ad.status)} disabled={ad.status === 'Vendu'} className="p-3 rounded-2xl bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white disabled:opacity-20 transition-all active:scale-90" title="Visibilité">{ad.status === 'Actif' ? <EyeOff size={16} strokeWidth={2}/> : <Eye size={16} strokeWidth={2}/></button>
                    <button onClick={() => handleMarkAsSold(ad.id)} disabled={ad.status === 'Vendu'} className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white disabled:opacity-50 transition-all active:scale-90" title="Marquer Vendu"><Handshake size={16} strokeWidth={2}/></button>
                    <button onClick={() => handleDelete(ad.id)} className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all active:scale-90" title="Supprimer"><Trash2 size={16} strokeWidth={2}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Liste Mobile */}
      <div className="md:hidden space-y-4">
        {paginatedAds.map((ad, idx) => (
          <Reveal key={ad.id} delay={idx * 50} animation="fade-in-up">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col min-w-0">
                  <h4 className="font-bold text-gray-900 leading-tight line-clamp-2 text-lg">{ad.title}</h4>
                  <p className="text-orange-600 font-bold text-xl mt-1">{ad.price}</p>
                </div>
                <Badge variant={ad.status === 'Actif' ? 'success' : ad.status === 'Vendu' ? 'info' : 'default'} size="xs" className="font-bold shrink-0 px-3 py-1">
                  {ad.status === 'Actif' ? 'EN LIGNE' : 'VENDU'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-gray-400 text-[10px] font-bold uppercase border-t border-gray-50 pt-5">
                <div className="flex items-center gap-1.5"><Clock size={14} strokeWidth={2} /> {ad.date}</div>
                <div className="flex items-center gap-1.5"><Eye size={14} strokeWidth={2} /> {ad.views} VUES</div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleEditPriceClick(ad)} className="flex items-center justify-center h-12 bg-gray-50 text-blue-600 border border-gray-100 rounded-2xl active:scale-95 transition-all"><Pencil size={20} strokeWidth={2}/></button>
                <button onClick={() => handleToggleStatus(ad.id, ad.status)} disabled={ad.status === 'Vendu'} className="flex items-center justify-center h-12 bg-gray-50 text-orange-600 border border-gray-100 rounded-2xl active:scale-95 transition-all disabled:opacity-30"><EyeOff size={20} strokeWidth={2}/></button>
                <button onClick={() => handleMarkAsSold(ad.id)} disabled={ad.status === 'Vendu'} className="flex items-center justify-center h-12 bg-gray-50 text-emerald-600 border border-gray-100 rounded-2xl active:scale-95 transition-all disabled:opacity-30"><Handshake size={20} strokeWidth={2}/></button>
                <button onClick={() => handleDelete(ad.id)} className="flex items-center justify-center h-12 bg-red-50 text-red-600 border border-red-100 rounded-2xl active:scale-95 transition-all"><Trash2 size={20} strokeWidth={2}/></button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[10px] font-bold text-gray-300 uppercase">Page {currentPage} / {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 rounded-xl bg-gray-50 text-gray-500 disabled:opacity-30 active:scale-90 transition-all"><ChevronLeft size={18} strokeWidth={2} /></button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-3 rounded-xl bg-gray-50 text-gray-500 disabled:opacity-30 active:scale-90 transition-all"><ChevronRight size={18} strokeWidth={2} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MyAdsTab);