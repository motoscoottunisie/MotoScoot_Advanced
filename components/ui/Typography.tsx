import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TitleXL - Typographie Fluide
 * S'adapte dynamiquement entre 32px (mobile) et 60px (desktop) sans saut de breakpoint.
 */
export const TitleXL: React.FC<TextProps> = ({ children, className = '' }) => (
  <h1 className={`text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-[1.1] tracking-tighter text-[#111827] ${className}`}>
    {children}
  </h1>
);

/**
 * TitleL - Titres secondaires fluides
 */
export const TitleL: React.FC<TextProps> = ({ children, className = '' }) => (
  <h2 className={`text-[clamp(1.75rem,4vw,2.875rem)] font-extrabold tracking-tight lg:tracking-tighter leading-tight text-[#111827] ${className}`}>
    {children}
  </h2>
);

/**
 * TitleM - Titres de cartes
 */
export const TitleM: React.FC<TextProps> = ({ children, className = '' }) => (
  <h3 className={`text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold tracking-tight leading-snug text-[#111827] ${className}`}>
    {children}
  </h3>
);

/**
 * SectionLabel - Metadata techniques (Accessibilité renforcée)
 * Utilisation de gray-600 pour garantir un contraste AA sur fond blanc.
 */
export const SectionLabel: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`text-[11px] font-[800] uppercase tracking-[0.1em] text-gray-600 antialiased ${className}`}>
    {children}
  </span>
);

/**
 * Price - Signature visuelle MotoScoot
 */
export const Price: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`font-[900] text-[#E6580B] tracking-tighter tabular-nums ${className}`}>
    {children}
  </span>
);