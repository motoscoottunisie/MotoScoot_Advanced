import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  return (
    <div 
      className="group flex flex-col h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 relative opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${400 + (index * 150)}ms`, animationFillMode: 'forwards' }}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-8 right-8 text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
        <Quote size={48} className="fill-current transform rotate-12" />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={review.image}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-success-500 fill-success-50" />
          </div>
        </div>
        <div>
          <h4 className="font-black text-gray-900 text-lg tracking-tight">{review.name}</h4>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{review.role}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < review.rating ? 'text-warning-400 fill-warning-400' : 'text-gray-200 fill-gray-200'}`}
          />
        ))}
        <span className="text-[10px] text-gray-400 ml-2 font-black uppercase tracking-widest">{review.date}</span>
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed font-medium relative z-10 flex-grow italic">
        "{review.content}"
      </p>

      {/* Verified Badge */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary-600" />
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Achat vérifié</span>
      </div>
    </div>
  );
};