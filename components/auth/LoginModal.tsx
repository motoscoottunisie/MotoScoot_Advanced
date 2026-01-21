import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  Building2, 
  MapPin, 
  Upload, 
  CheckCircle2, 
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { governoratesList } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role?: 'user' | 'admin') => void;
}

type UserType = 'individual' | 'pro';

const AppleIcon = () => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/Logo/apple.svg" 
    className="w-5 h-5 object-contain" 
    alt="Apple" 
  />
);

const GoogleIcon = () => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/Logo/googleColored.svg" 
    className="w-5 h-5 object-contain" 
    alt="Google" 
  />
);

const FacebookIcon = () => (
  <img 
    src="https://www.magma-studio.tn/portfolio2/moto/Logo/facebookColored.svg" 
    className="w-5 h-5 object-contain" 
    alt="Facebook" 
  />
);

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<UserType>('individual');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verrouillage du scroll quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin('user');
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin('user');
    }, 1500);
  };

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  // Classe utilitaire pour réduire la taille des inputs localement dans le modal
  const inputCompactClass = "!py-3 !rounded-xl";

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in transition-all"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white w-full h-[100dvh] md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-3xl overflow-hidden relative shadow-2xl animate-fade-in-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Positioned Top Right for both Mobile and Desktop */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-100 rounded-full transition-all z-20 active:scale-90"
          aria-label="Fermer"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="p-6 md:p-10 overflow-y-auto no-scrollbar flex-1 pt-16 md:pt-10">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-4 border border-primary-100 overflow-hidden">
               <img 
                 src="https://www.magma-studio.tn/portfolio2/moto/Logo/embleme_logo.svg" 
                 className="w-8 h-8 object-contain" 
                 alt="MotoScoot" 
               />
             </div>
             <h2 className={`text-gray-900 mb-2 ${isSignUp ? 'text-2xl md:text-3xl font-black tracking-tight' : 'text-[24px] font-extrabold tracking-normal font-sans'}`}>
               {isSignUp ? 'Créer un compte' : 'Bienvenue sur MotoScoot.tn'}
             </h2>
             <p className="text-gray-500 text-sm font-medium">
               {isSignUp ? 'Rejoignez la communauté MotoScoot.tn' : 'Connectez-vous pour gérer vos annonces.'}
             </p>
          </div>

          {/* Social Logins */}
          <div className="flex items-center justify-center gap-[4px] mb-8">
              <button 
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="flex items-center justify-center gap-[4px] w-[118px] h-[40px] min-h-[40px] border border-[#eaeaf0] rounded-[8px] text-[#2a292f] font-bold text-[11px] md:text-[12px] font-sans hover:bg-gray-50 transition-colors"
              >
                  <AppleIcon />
                  <span>Apple</span>
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-[4px] w-[118px] h-[40px] min-h-[40px] border border-[#eaeaf0] rounded-[8px] text-[#2a292f] font-bold text-[11px] md:text-[12px] font-sans hover:bg-gray-50 transition-colors"
              >
                  <GoogleIcon />
                  <span>Google</span>
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-[4px] w-[118px] h-[40px] min-h-[40px] border border-[#eaeaf0] rounded-[8px] text-[#2a292f] font-bold text-[11px] md:text-[12px] font-sans hover:bg-gray-50 transition-colors"
              >
                  <FacebookIcon />
                  <span>Facebook</span>
              </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative px-4 bg-white text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">OU EMAIL</span>
          </div>

          {isSignUp && (
            <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 border border-gray-200">
                <button 
                  type="button"
                  onClick={() => setUserType('individual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${userType === 'individual' ? 'bg-white text-[#E65100] border border-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <User size={16} />
                    Particulier
                </button>
                <button 
                  type="button"
                  onClick={() => setUserType('pro')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${userType === 'pro' ? 'bg-white text-[#E65100] border border-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Briefcase size={16} />
                    Professionnel
                </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
             {isSignUp && (
               <div className="space-y-4 animate-scale-in">
                 {userType === 'individual' ? (
                   <>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Prénom" placeholder="Prénom" required className={inputCompactClass} />
                        <Input label="Nom" placeholder="Nom" required className={inputCompactClass} />
                     </div>
                     <Select label="Gouvernorat" required className={inputCompactClass}>
                        <option value="" disabled selected>Choisir mon gouvernorat</option>
                        {governoratesList.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                     </Select>
                   </>
                 ) : (
                   <>
                      <Input label="Nom de la boutique" placeholder="Ex: Tunis Moto Shop" leftIcon={<Building2 size={18} />} required className={inputCompactClass} />
                      <Input label="Nom du gérant" placeholder="Nom et Prénom" leftIcon={<User size={18} />} required className={inputCompactClass} />
                      <Input label="Adresse boutique" placeholder="Rue, Ville..." leftIcon={<MapPin size={18} />} required className={inputCompactClass} />
                      
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Logo de la boutique</label>
                        <div 
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer group ${isDragging ? 'border-primary-600 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-primary-300'}`}
                        >
                          {logoPreview ? (
                            <div className="flex items-center gap-3">
                                <img src={logoPreview} alt="Preview" className="h-20 w-20 object-contain rounded-lg" />
                                <span className="text-xs font-bold text-gray-400">Cliquez pour modifier</span>
                            </div>
                          ) : (
                            <>
                              <Upload className={`mb-1 ${isDragging ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}`} size={24} />
                              <span className="text-[11px] font-bold text-gray-500">Logo (JPG, PNG)</span>
                            </>
                          )}
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])} />
                        </div>
                      </div>
                   </>
                 )}
               </div>
             )}

             <div className="space-y-4 pt-2">
                <Input type="email" placeholder="votre@email.com" leftIcon={<Mail size={18} />} required className={inputCompactClass} />
                <div className="space-y-2">
                   <Input type="password" placeholder="mot de passe" leftIcon={<Lock size={18} />} required className={inputCompactClass} />
                   {!isSignUp && (
                     <div className="flex justify-end px-1">
                       <button type="button" className="text-[11px] font-bold text-primary-600 hover:underline focus:outline-none">
                         Mot de passe oublié
                       </button>
                     </div>
                   )}
                </div>
             </div>

             <Button 
               type="submit" 
               fullWidth
               className="py-5 mt-6 h-14"
               disabled={loading}
             >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isSignUp ? 'Création...' : 'Connexion...'}
                  </span>
                ) : (
                  <>
                    {isSignUp ? "Créer mon compte" : 'Me connecter'}
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
             </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center pb-10">
             <p className="text-gray-500 text-sm font-medium">
                {isSignUp ? 'Déjà membre ?' : 'Pas encore de compte ?'}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-black text-primary-600 hover:text-primary-700 ml-2 focus:outline-none"
                >
                  {isSignUp ? 'Se connecter' : "S'inscrire gratuitement"}
                </button>
             </p>
             
             <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-success-600" />
                Connexion sécurisée SSL
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;