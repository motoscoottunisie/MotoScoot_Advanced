import React from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/mockData';
import { ReviewCard } from './home/ReviewCard';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Container contraint à 1280px avec paddings progressifs */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 relative z-10">
        
        {/* Header Section with Trust Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div className="max-w-2xl">
            <h2 className="text-[#E65100] text-[36px] font-extrabold tracking-normal mb-6 leading-tight animate-fade-in-up">
              Ce qu'ils disent de nous
            </h2>
            <p className="text-gray-500 text-[17px] font-normal tracking-normal leading-relaxed animate-fade-in-up">
              La communauté MotoScoot grandit chaque jour. Des milliers de motards nous font confiance.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end animate-fade-in-up">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-3xl font-black text-gray-900">4.9</span>
              <span className="text-gray-400 text-lg font-bold">/5</span>
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-warning-400 fill-warning-400" />
              ))}
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Basé sur 1200+ avis vérifiés</span>
          </div>
        </div>

        {/* Reviews Grid - 3 colonnes Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;