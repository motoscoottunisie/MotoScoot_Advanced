import { useState, useMemo } from 'react';
import { mockListings } from '../data/mockData';

export type Category = 'Moto' | 'Scooter' | 'Accessoires' | '';

export const useDepositForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '' as Category,
    brand: '',
    model: '',
    year: '',
    mileage: '',
    cc: '',
    condition: '',
    price: '',
    city: 'Tunis',
    description: '',
    images: [] as string[],
    equipment: [] as string[]
  });

  const marketEstimation = useMemo(() => {
    if (!formData.brand || formData.category === 'Accessoires') return null;
    
    // Logique simplifiée d'estimation pour la prod
    const basePrice = formData.category === 'Scooter' ? 12000 : 25000;
    const yearFactor = Math.pow(0.92, 2025 - (parseInt(formData.year) || 2025));
    return Math.round((basePrice * yearFactor) / 100) * 100;
  }, [formData.brand, formData.year, formData.category]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    step,
    setStep,
    formData,
    updateField,
    marketEstimation
  };
};