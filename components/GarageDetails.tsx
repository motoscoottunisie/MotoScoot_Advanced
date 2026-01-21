import React, { useEffect, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Wrench,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { mockGarages } from '../data/mockData';
import SEO from './common/SEO';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import AdBanner from './common/AdBanner';
import { useNativeShare } from '../hooks/useNativeShare';

const GarageDetails: React.FC<any> = ({ garageId, onNavigate }) => {
  const garage = useMemo(() => mockGarages.find(g => g.id === garageId) || mockGarages[0], [garageId]);
  const share = useNativeShare();

  useEffect(() => { window.scrollTo(0, 0); }, [garageId]);

  const handleShare = () => {
    share({
      title: `${garage.name} - Expert Moto`,
      text: garage.description || `Découvrez ${garage.name} sur MotoScoot.tn`,
      url: window.location.href
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <SEO title={`${garage.name} - Expert Moto`} image={garage.image} />
      
      <div className="relative w-full h-[25vh] bg-gradient-to-br from-[#E65100] to-[#DD2C14] flex items-end pb-8 pt-20">
        <div className="max-w-[1280px] mx-auto px-6 w-full flex justify-between items-end">
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">{garage.name}</h1>
            <button 
              onClick={handleShare}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all active:scale-95"
              aria-label="Partager"
            >
              <Share2 size={22} />
            </button>
        </div>
      </div>

      <main className="pt-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative h-64 md:h-96 bg-gray-100">
                  <img src={garage.image} alt={garage.name} className="w-full h-full object-cover" />
                  {garage.isVerified && <div className="absolute top-6 left-6"><Badge variant="success" size="md" icon={<ShieldCheck size={16} />}>Vérifié MotoScoot</Badge></div>}
                </div>
                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 font-bold"><MapPin size={18} className="text-primary-600" /><span>{garage.address || garage.location}</span></div>
                    </div>
                    <div className="flex items-center gap-1 bg-warning-50 px-4 py-2 rounded-2xl border border-warning-100">
                      <Star className="text-warning-500 fill-warning-400" size={20} /><span className="font-black text-xl text-warning-700">{garage.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium mb-10">{garage.description || "Expert moto à votre service."}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(garage.specialties || [garage.specialty]).filter(Boolean).map((s: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"><CheckCircle2 size={16} className="text-primary-600" /><span className="text-sm font-black text-gray-700 uppercase">{s}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-8"><Wrench size={20} className="text-primary-600" /> Services & Tarifs</h3>
                 <div className="space-y-4">
                    {(garage.services || [{ name: "Entretien complet", price: "À partir de 60 DT" }]).map((service: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-4 rounded-2xl border border-gray-50"><span className="font-bold text-gray-700">{service.name}</span><span className="font-black text-primary-600">{service.price}</span></div>
                    ))}
                 </div>
              </div>
            </div>
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32">
                <div className="mb-8"><h3 className="text-xs font-black text-gray-400 uppercase mb-4">Disponibilités</h3><div className="text-gray-900 font-bold bg-gray-50 p-4 rounded-2xl">{garage.hours || "Lundi - Samedi : 08h-18h"}</div></div>
                <div className="space-y-4"><Button variant="primary" fullWidth size="lg" leftIcon={<Phone size={18} />}>Appeler {garage.phone || ""}</Button></div>
              </div>
              <AdBanner zone="garage_sidebar" variant="native" />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GarageDetails;