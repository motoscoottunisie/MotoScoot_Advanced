
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BikeModel } from '../../types';
import { Badge } from '../ui/Badge';
import { getOptimizedImageUrl } from '../../utils/urlUtils';

interface ModelCardProps {
  model: BikeModel;
  onClick: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  // Image optimisée pour les cartes de la home
  const optimizedSrc = imgError
    ? getOptimizedImageUrl('', 500, 375, 75)
    : getOptimizedImageUrl(model.image, 500, 375, 75);

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/5 z-10" />
        <img 
          src={optimizedSrc} 
          alt={model.name} 
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-3 right-3 z-20">
          <Badge variant="primary" className="bg-white/90 backdrop-blur-sm border-none shadow-sm">
            Populaire
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="text-[10px] font-black text-[#E65100] uppercase tracking-[0.2em] mb-1.5">
          {model.brand}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors tracking-tight">
          {model.name}
        </h3>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
          <span className="text-sm text-gray-500 font-bold">
            {model.price}
          </span>
          <span className="p-2 bg-primary-50 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
            <ArrowRight size={16} strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  );
};
