
import React, { useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  Zap, 
  Gauge, 
  Ruler, 
  Settings, 
  Share2, 
  Activity,
  Bike
} from 'lucide-react';
import { mockTechSpecs } from '../data/mockData';
import SEO from './common/SEO';
import { slugify } from '../utils/urlUtils';

interface TechSpecsDetailsProps {
  specId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const SpecRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 group">
    <span className="text-gray-500 text-sm font-medium group-hover:text-gray-900 transition-colors">{label}</span>
    <span className="text-gray-900 font-bold text-sm text-right">{value}</span>
  </div>
);

const TechSpecsDetails: React.FC<TechSpecsDetailsProps> = ({ specId, onNavigate }) => {
  const spec = useMemo(() => mockTechSpecs.find(s => s.id === specId) || mockTechSpecs[0], [specId]);

  useEffect(() => { window.scrollTo(0, 0); }, [specId]);

  // SEO: Schema spécifique pour fiche technique
  const specSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${spec.brand} ${spec.model} ${spec.year}`,
    "image": spec.image,
    "description": `Fiche technique complète de la ${spec.brand} ${spec.model} : puissance, poids, dimensions et performances.`,
    "brand": {
      "@type": "Brand",
      "name": spec.brand
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Cylindrée", "value": spec.engine.cc },
      { "@type": "PropertyValue", "name": "Puissance", "value": spec.engine.power }
    ]
  }), [spec]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <SEO 
        title={`Fiche Technique ${spec.brand} ${spec.model} ${spec.year}`}
        description={`Découvrez les caractéristiques de la ${spec.brand} ${spec.model} (${spec.year}). ${spec.engine.power}, ${spec.engine.cc}, ${spec.dimensions.weight}.`}
        image={spec.image}
        url={`/fiche-technique/${slugify(spec.model)}-${spec.id}`}
        schema={specSchema}
      />

      <main className="max-w-[1280px] mx-auto px-6 pt-28 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <button onClick={() => onNavigate?.('tech-specs-models', { brand: spec.brand })} className="flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 group">
                <div className="p-1.5 bg-primary-50 rounded-lg group-hover:bg-primary-100"><ChevronLeft size={18} /></div>
                Retour modèles {spec.brand}
            </button>
            <div className="flex items-center gap-3">
                <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 shadow-sm"><Share2 size={18} /></button>
                <button onClick={() => onNavigate?.('search', { brand: spec.brand, model: spec.model })} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 shadow-md active:scale-95"><Bike size={18} /> Chercher occasion</button>
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto bg-gray-100 overflow-hidden relative">
                    <img src={spec.image} alt={`${spec.brand} ${spec.model}`} className="w-full h-full object-cover" />
                    <div className="absolute top-6 left-6"><span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-black shadow-sm">{spec.year}</span></div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <span className="text-primary-600 font-black text-xs uppercase tracking-widest mb-2 block">{spec.brand}</span>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{spec.model}</h1>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg border border-gray-200">{spec.category}</span>
                            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg border border-primary-100">Neuf : {spec.priceNew}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
                        <div className="space-y-1"><div className="flex items-center gap-2 text-gray-400"><Zap size={16} /><span className="text-[10px] font-black uppercase">Puissance</span></div><p className="font-bold text-gray-900 text-sm">{spec.engine.power.split(' ')[0]} ch</p></div>
                        <div className="space-y-1"><div className="flex items-center gap-2 text-gray-400"><Activity size={16} /><span className="text-[10px] font-black uppercase">Cylindrée</span></div><p className="font-bold text-gray-900 text-sm">{spec.engine.cc}</p></div>
                        <div className="space-y-1"><div className="flex items-center gap-2 text-gray-400"><Gauge size={16} /><span className="text-[10px] font-black uppercase tracking-widest">V-Max</span></div><p className="font-bold text-gray-900 text-sm">{spec.topSpeed || 'N/A'}</p></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100"><Zap size={20} /></div><h3 className="text-xl font-black text-gray-900">Moteur</h3></div>
                <div className="space-y-0">
                    <SpecRow label="Type" value={spec.engine.type} /><SpecRow label="Puissance" value={spec.engine.power} /><SpecRow label="Transmission" value={spec.engine.transmission} />
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"><Settings size={20} /></div><h3 className="text-xl font-black text-gray-900">Partie Cycle</h3></div>
                <div className="space-y-0">
                    <SpecRow label="Cadre" value={spec.chassis.frame} /><SpecRow label="Frein Avant" value={spec.chassis.brakesFront} /><SpecRow label="Pneu Arrière" value={spec.chassis.tireRear} />
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100"><Ruler size={20} /></div><h3 className="text-xl font-black text-gray-900">Dimensions</h3></div>
                <div className="space-y-0">
                    <SpecRow label="Poids" value={spec.dimensions.weight} /><SpecRow label="Selle" value={spec.dimensions.seatHeight} /><SpecRow label="Réservoir" value={spec.dimensions.tank} />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default TechSpecsDetails;
