import React from 'react';
import { ArrowRight } from 'lucide-react';
import { popularModels } from '../data/mockData';
import { ModelCard } from './home/ModelCard';
import { Button } from './ui/Button';

interface PopularModelsProps {
  onNavigate?: (view: string, params?: any) => void;
}

const PopularModels: React.FC<PopularModelsProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-[36px] font-extrabold text-gray-900 tracking-normal">
              Les modèles les plus consultés
            </h2>
            <p className="text-gray-500 mt-2 text-[17px] font-normal tracking-normal">
              Découvrez les motos qui font vibrer la communauté.
            </p>
          </div>
          <Button 
            variant="ghost"
            onClick={() => onNavigate?.('search')}
            className="hidden md:flex text-primary-600 hover:bg-primary-50"
            rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
          >
            Tout voir
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {popularModels.slice(0, 3).map((model) => (
            <div key={model.id} className="animate-fade-in-up">
              <ModelCard 
                model={model} 
                onClick={() => onNavigate?.('tech-specs-details', { id: model.id, model: model.name })} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularModels;