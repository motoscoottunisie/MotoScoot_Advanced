import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton - Atome pour créer des états de chargement fluides.
 * Utilise une animation de pulsation subtile.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`bg-gray-200 animate-pulse rounded-lg ${className}`} 
      aria-hidden="true"
    />
  );
};