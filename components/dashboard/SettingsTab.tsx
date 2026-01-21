import React, { memo, useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Smartphone, 
  Lock, 
  Save, 
  Trash2, 
  Check, 
  UserCircle,
  Camera,
  Calendar,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../ui/Badge';
import { Reveal } from '../ui/Reveal';
import { tunisianCities } from '../../data/mockData';

const profileSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  whatsapp: z.string().min(8, "WhatsApp requis"),
  city: z.string().min(1, "Ville requise"),
  oldPassword: z.string().optional(),
  newPassword: z.string().min(6, "6 caractères minimum").optional().or(z.literal('')),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type ProfileFormData = z.infer<typeof profileSchema>;

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SettingsTab: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const { user, updateProfile, isUpdating } = useUser();
  const { addToast } = useToast();

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || 'John',
      lastName: user?.lastName || 'Doe',
      email: user?.email || 'john.doe@email.com',
      phone: user?.phone || '22 123 456',
      whatsapp: user?.whatsapp || '22 123 456',
      city: user?.city || 'Tunis',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile(data);
    addToast("Profil mis à jour avec succès", "success");
  };

  const S = {
    FullCard: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full",
    SectionHeader: "px-6 md:px-10 py-5 border-b border-gray-50 bg-gray-50/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
    SectionTitle: "text-lg font-bold text-gray-900 flex items-center gap-3",
    ContentGrid: "p-6 md:p-10",
    HeaderWrapper: "relative bg-white px-6 md:px-10 py-6 border-b border-gray-100 flex flex-row items-center gap-6",
    PhotoContainer: "flex flex-col items-center gap-1.5 shrink-0",
    InfoGroup: "flex-1 flex flex-col justify-center min-w-0",
    MainHeading: "text-2xl md:text-3xl font-black text-gray-900 leading-none",
    SubInfo: "flex flex-col items-start gap-1.5 mt-2",
    SubInfoItem: "flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase",
  };

  return (
    <div className="animate-fade-in font-['Inter'] max-w-6xl mx-auto pb-20 flex flex-col gap-[21px]" style={{ letterSpacing: '0px' }}>
      
      {/* SECTION 1 : EN-TÊTE PROFIL COMPACT */}
      <div className={S.FullCard}>
        <div className={S.HeaderWrapper}>
          <div className={S.PhotoContainer}>
            <div className="relative group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[6px] bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center text-[#E65100] overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <UserCircle size={40} strokeWidth={1.5} />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="text-white" size={18} />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-1 shadow-sm border border-gray-50">
                 <ShieldCheck size={14} className="text-emerald-500" strokeWidth={3} />
              </div>
            </div>
          </div>

          <div className={S.InfoGroup}>
            <div className="flex items-center gap-2">
              <h1 className={S.MainHeading}>{user?.firstName} {user?.lastName}</h1>
              <Badge variant="success" size="xs" className="px-2 py-0.5 rounded-md font-extrabold tracking-[1px] text-[8px] hidden sm:inline-flex">
                VÉRIFIÉ
              </Badge>
            </div>
            
            <div className={S.SubInfo}>
              <div className={S.SubInfoItem}>
                <UserCheck size={12} className="text-orange-50" strokeWidth={2} />
                <span>{user?.memberType}</span>
              </div>
              <div className={S.SubInfoItem}>
                <Calendar size={12} className="text-orange-50" strokeWidth={2} />
                <span>Membre depuis Jan 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[21px]">
        
        {/* SECTION 2 : INFORMATIONS PERSONNELLES */}
        <Reveal animation="fade-in-up" delay={50}>
          <div className={S.FullCard}>
            <div className={S.SectionHeader}>
              <h2 className={S.SectionTitle}>
                <div className="p-2 bg-orange-50 text-[#E65100] rounded-lg"><User size={18} /></div>
                Informations Personnelles
              </h2>
            </div>
            <div className={S.ContentGrid}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Input 
                  label="PRÉNOM" 
                  {...register('firstName')} 
                  error={errors.firstName?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                />
                <Input 
                  label="NOM" 
                  {...register('lastName')} 
                  error={errors.lastName?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                />
                <Select 
                  label="VILLE / GOUVERNORAT" 
                  {...register('city')} 
                  error={errors.city?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm pr-10"
                >
                  <option value="" disabled>Choisir votre ville</option>
                  {tunisianCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </Reveal>

        {/* SECTION 3 : COORDONNÉES & SÉCURITÉ */}
        <Reveal animation="fade-in-up" delay={100}>
          <div className={S.FullCard}>
            <div className={S.SectionHeader}>
              <h2 className={S.SectionTitle}>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail size={18} /></div>
                Coordonnées & Sécurité
              </h2>
            </div>
            <div className={S.ContentGrid}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative">
                  <Input 
                    label="ADRESSE EMAIL" 
                    {...register('email')} 
                    error={errors.email?.message} 
                    className="bg-gray-50/30 border-gray-100 pr-12 font-bold opacity-60 text-sm" 
                    leftIcon={<Mail size={16} className="text-gray-400" />} 
                    readOnly
                  />
                  <div className="absolute right-4 top-[40px] text-emerald-500" title="Email vérifié">
                    <CheckCircle2 size={14} />
                  </div>
                </div>
                <Input 
                  label="TÉLÉPHONE" 
                  {...register('phone')} 
                  error={errors.phone?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                  leftIcon={<Smartphone size={16} className="text-gray-400" />} 
                />
                <Input 
                  label="NUMÉRO WHATSAPP" 
                  {...register('whatsapp')} 
                  error={errors.whatsapp?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                  leftIcon={<WhatsAppIcon className="w-4 h-4 text-gray-400" />} 
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* SECTION 4 : MODIFIER LE MOT DE PASSE */}
        <Reveal animation="fade-in-up" delay={125}>
          <div className={S.FullCard}>
            <div className={S.SectionHeader}>
              <h2 className={S.SectionTitle}>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Lock size={18} /></div>
                Modifier le mot de passe
              </h2>
            </div>
            <div className={S.ContentGrid}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Input 
                  label="ANCIEN MOT DE PASSE" 
                  type="password"
                  {...register('oldPassword')} 
                  error={errors.oldPassword?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                  leftIcon={<Lock size={16} className="text-gray-400" />} 
                />
                <Input 
                  label="NOUVEAU MOT DE PASSE" 
                  type="password"
                  {...register('newPassword')} 
                  error={errors.newPassword?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                  leftIcon={<KeyRound size={16} className="text-gray-400" />} 
                />
                <Input 
                  label="CONFIRMER LE MOT DE PASSE" 
                  type="password"
                  {...register('confirmPassword')} 
                  error={errors.confirmPassword?.message} 
                  className="bg-gray-50/50 border-gray-100 font-bold text-sm" 
                  leftIcon={<CheckCircle2 size={16} className="text-gray-400" />} 
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* SECTION DE VALIDATION FINALE */}
        <div className="pb-12 flex flex-col items-start px-2 md:px-0">
            <Button 
                variant="primary" 
                type="submit"
                isLoading={isUpdating} 
                disabled={!isDirty}
                className="px-12 rounded-2xl h-14 shadow-xl min-w-[280px]"
                leftIcon={<Save size={20} />}
            >
                Enregistrer
            </Button>
            {!isDirty && (
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-4 ml-1">
                    Aucune modification en attente
                </p>
            )}
        </div>
      </form>
    </div>
  );
};

export default memo(SettingsTab);