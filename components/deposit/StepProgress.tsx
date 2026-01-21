import React from 'react';

interface StepProgressProps {
  step: number;
  totalSteps?: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ step, totalSteps = 4 }) => {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="px-8 md:px-10 pt-10 pb-4 bg-neutral-50 border-b border-neutral-100 shadow-none">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em]">
          Étape {step} / {totalSteps}
        </span>
        <span className="text-xl font-black text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-200 rounded-full shadow-none">
        <div 
          className="h-full bg-primary-600 transition-all duration-700 ease-out rounded-full shadow-none" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};