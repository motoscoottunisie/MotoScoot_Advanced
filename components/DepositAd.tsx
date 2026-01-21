
import React, { useState } from 'react';
import { 
  Bike, Zap, ShoppingBag, FileText, ChevronLeft, ChevronRight, CheckCircle2, Info, MapPin, Tag, Calendar, Gauge, BadgeEuro, Camera
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { StepProgress } from './deposit/StepProgress';
import { MediaUploader } from './deposit/MediaUploader';
import { PriceEstimator } from './deposit/PriceEstimator';
import { brandsMoto, mockModels, governoratesList, conditions } from '../data/mockData';

const listingSchema = z.object({
  category: z.enum(['Moto', 'Scooter', 'Accessoires', '']),
  brand: z.string().min(1, "Veuillez choisir une marque"),
  model: z.string().min(1, "Veuillez choisir un modèle"),
  year: z.string().regex(/^\d{4}$/, "Année invalide").optional().or(z.literal('')),
  mileage: z.string().min(1, "Kilométrage requis").optional().or(z.literal('')),
  cc: z.string().min(1, "Cylindrée requise").optional().or(z.literal('')),
  condition: z.string().min(1, "État requis"),
  title: z.string().min(10, "Le titre doit faire au moins 10 caractères").max(70),
  price: z.string().min(1, "Le prix est requis"),
  city: z.string().min(1, "La ville est requise"),
  description: z.string().min(30, "La description doit faire au moins 30 caractères"),
  images: z.array(z.string()).min(1, "Ajoutez au moins une photo"),
});

type ListingFormData = z.infer<typeof listingSchema>;

const S = {
  Container: "max-w-[1280px] mx-auto px-6 py-12 md:py-24 pb-8",
  MainCard: "bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-none",
  StepWrapper: "p-8 md:p-12 min-h-[500px]",
  HeaderSection: "text-center md:text-left mb-10",
  Title: "text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight",
  Subtitle: "text-gray-500 font-medium",
  GridCategory: "grid grid-cols-1 md:grid-cols-3 gap-4",
  CategoryCard: (active: boolean, hasError: boolean) => `group p-8 rounded-[2.5rem] border-2 transition-all text-left flex flex-col gap-4 active:scale-[0.98] ${active ? 'border-primary-600 bg-primary-50' : hasError ? 'border-red-200 bg-red-50' : 'border-neutral-100 bg-white hover:border-primary-200'}`,
  IconBox: (active: boolean) => `w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`,
  ActionNav: "flex justify-between items-center px-10 py-8 bg-neutral-50 border-t border-neutral-100",
  GridFields: "grid grid-cols-1 md:grid-cols-2 gap-6"
};

const DepositAd: React.FC<any> = ({ onNavigate, onGoHome }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      category: '', brand: '', model: '', year: '', mileage: '', cc: '', condition: '', title: '', price: '', city: 'Tunis', description: '', images: [],
    }
  });

  const category = watch('category');
  const images = watch('images');

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger('category');
    if (step === 2) isValid = await trigger(['brand', 'model', 'condition', 'year', 'mileage', 'cc']);
    if (step === 3) isValid = await trigger('images');
    if (isValid) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onNavigate?.('dashboard', { tab: 'listings', success: true });
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className={S.HeaderSection}>
        <h2 className={S.Title}>Choisir une catégorie</h2>
        <p className={S.Subtitle}>Sélectionnez le type de bien à mettre en vente.</p>
      </div>
      <div className={S.GridCategory}>
        {[
          { id: 'Moto', label: 'Moto', icon: Bike, desc: 'Sportive, Trail, Roadster...' },
          { id: 'Scooter', label: 'Scooter', icon: Zap, desc: 'Urbain, Maxi, 50cc...' },
          { id: 'Accessoires', label: 'Accessoires', icon: ShoppingBag, desc: 'Casques, Gants, Vestes...' }
        ].map((item) => (
          <button key={item.id} type="button" onClick={() => { setValue('category', item.id as any); handleNext(); }} className={S.CategoryCard(category === item.id, !!errors.category)}>
            <div className={S.IconBox(category === item.id)}><item.icon size={28} /></div>
            <div><span className="block font-black text-xl text-gray-900">{item.label}</span><span className="text-sm text-gray-500 font-medium">{item.desc}</span></div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className={S.HeaderSection}>
        <h2 className={S.Title}>Détails techniques</h2>
        <p className={S.Subtitle}>Renseignez les caractéristiques principales du véhicule.</p>
      </div>
      <div className={S.GridFields}>
        <Select label="MARQUE" {...register('brand')} error={errors.brand?.message}>
          <option value="">Sélectionner</option>
          {brandsMoto.map(b => <option key={b} value={b}>{b}</option>)}
        </Select>
        <Input label="MODÈLE" placeholder="Ex: TMAX 560" {...register('model')} error={errors.model?.message} />
        <Select label="ÉTAT" {...register('condition')} error={errors.condition?.message}>
          <option value="">Choisir l'état</option>
          {conditions.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Input label="ANNÉE" placeholder="2024" type="number" {...register('year')} error={errors.year?.message} />
        <Input label="KILOMÉTRAGE" placeholder="Ex: 5000" {...register('mileage')} error={errors.mileage?.message} />
        <Input label="CYLINDRÉE (CC)" placeholder="Ex: 560" {...register('cc')} error={errors.cc?.message} />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in-up">
      <MediaUploader 
        images={images} 
        onImageChange={(e) => {
          if (e.target.files) {
            // Fix: Cast 'f' to 'File' to satisfy URL.createObjectURL requirements as FileList items might be inferred as unknown in some environments
            const newImages = Array.from(e.target.files).map(f => URL.createObjectURL(f as File));
            setValue('images', [...images, ...newImages]);
          }
        }}
        onRemoveImage={(idx) => setValue('images', images.filter((_, i) => i !== idx))}
        onCropImage={() => {}}
      />
      {errors.images && <p className="text-red-500 text-xs font-bold mt-4">{errors.images.message}</p>}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className={S.HeaderSection}>
        <h2 className={S.Title}>Informations de l'annonce</h2>
        <p className={S.Subtitle}>Donnez envie aux acheteurs avec un titre percutant.</p>
      </div>
      <div className="space-y-6">
        <Input label="TITRE DE L'ANNONCE" placeholder="Ex: Yamaha TMAX Tech MAX 2024 - État Neuf" {...register('title')} error={errors.title?.message} />
        <div className={S.GridFields}>
          <Input label="PRIX (DT)" placeholder="Ex: 48500" type="number" {...register('price')} error={errors.price?.message} leftIcon={<BadgeEuro size={18} />} />
          <Select label="VILLE" {...register('city')} error={errors.city?.message}>
            {governoratesList.map(city => <option key={city} value={city}>{city}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">DESCRIPTION</label>
          <textarea 
            rows={5} 
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-primary-600 transition-all font-medium"
            placeholder="Détaillez l'entretien, les options, les éventuels défauts..."
            {...register('description')}
          />
          {errors.description && <p className="text-red-500 text-[10px] font-bold">{errors.description.message}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className={S.Container}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <div className={S.MainCard}>
              <StepProgress step={step} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={S.StepWrapper}>
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                </div>
                <div className={S.ActionNav}>
                  <Button type="button" variant="ghost" onClick={handleBack} disabled={step === 1} leftIcon={<ChevronLeft size={20}/>}>Retour</Button>
                  {step < 4 ? (
                    <Button type="button" variant="dark" onClick={handleNext} rightIcon={<ChevronRight size={20}/>}>Suivant</Button>
                  ) : (
                    <Button type="submit" variant="primary" isLoading={isSubmitting} rightIcon={<CheckCircle2 size={20}/>}>Publier l'annonce</Button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 sticky top-32">
             <div className="bg-primary-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                   <h3 className="text-xl font-black mb-2 flex items-center gap-2"><Info size={20}/> Estimation Live</h3>
                   <p className="text-primary-50 text-sm leading-relaxed opacity-90 mb-6">Analyse du marché basée sur 10 000+ annonces.</p>
                   <PriceEstimator estimation={category === 'Scooter' ? 12500 : 34000} hasEnoughData={true} />
                   <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                      <div className="flex items-start gap-3"><CheckCircle2 className="shrink-0 text-white/50" size={18} /><p className="text-xs font-medium text-white/80 leading-relaxed">Votre annonce sera validée en moins de 2h par nos experts.</p></div>
                      <div className="flex items-start gap-3"><Camera className="shrink-0 text-white/50" size={18} /><p className="text-xs font-medium text-white/80 leading-relaxed">Les annonces avec plus de 5 photos vendent 3x plus vite.</p></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositAd;
