
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BasePageProps } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Section } from './ui/Section';

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const S = {
  Page: "min-h-screen bg-white font-sans pb-12",
  HeaderTitle: "text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2",
  Grid: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start",
  Sidebar: "lg:col-span-4 space-y-6",
  FormArea: "lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm",
  InfoCard: "bg-gray-50 rounded-2xl p-8 border border-gray-100",
  BadgePro: "bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl"
};

const Contact: React.FC<BasePageProps> = ({ onNavigate }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className={S.Page}>
      <Section className="pt-12">
        <div className="mb-12 animate-fade-in-up text-center md:text-left">
          <h1 className={S.HeaderTitle}>Contactez-nous</h1>
          <p className="text-gray-500 font-medium text-lg">Support utilisateur ou partenariat professionnel.</p>
        </div>

        <div className={S.Grid}>
          <aside className={S.Sidebar}>
            <div className={S.InfoCard}>
               <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest mb-8">Coordonnées</h3>
               <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-primary-600 shrink-0" size={20} /> 
                    <p className="text-sm font-bold text-gray-700">Berges du Lac 1, Tunis</p>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-primary-600 shrink-0" size={20} /> 
                    <p className="text-sm font-bold text-gray-700">+216 71 123 456</p>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="text-primary-600 shrink-0" size={20} /> 
                    <p className="text-sm font-bold text-gray-700">contact@motoscoot.tn</p>
                  </div>
               </div>
            </div>

            <div className={S.BadgePro}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[80px] opacity-20 rounded-full" />
               <h3 className="text-lg font-black mb-6 flex items-center gap-2"><Building2 className="text-primary-500" /> Espace Pro</h3>
               <p className="text-xs text-gray-300 leading-relaxed mb-6 font-medium">Rejoignez le premier réseau moto de Tunisie et boostez votre activité.</p>
               <Button variant="primary" size="sm" fullWidth onClick={() => onNavigate?.('dashboard-pro')}>Accéder à l'espace</Button>
            </div>
          </aside>

          <main className={S.FormArea}>
            {isSubmitted ? (
              <div className="text-center py-20 animate-scale-in">
                <CheckCircle2 size={64} className="text-success-500 mx-auto mb-6" />
                <h2 className="text-2xl font-black text-gray-900 mb-2">Message envoyé !</h2>
                <p className="text-gray-500 font-medium">Nous vous répondrons sous 24h ouvrées.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Nom complet" 
                    placeholder="Votre nom" 
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input 
                    label="Email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows={6} 
                    className={`w-full px-5 py-4 rounded-xl bg-gray-50 border outline-none font-medium text-gray-700 resize-none transition-all focus:bg-white ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-100 focus:border-primary-600'}`}
                    placeholder="Comment pouvons-nous vous aider ?"
                    {...register('message')}
                  />
                  {errors.message && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.message.message}</p>}
                </div>
                <Button 
                  variant="dark" 
                  fullWidth 
                  size="xl" 
                  type="submit" 
                  isLoading={isSubmitting}
                  rightIcon={!isSubmitting && <Send size={18}/>}
                >
                  Envoyer le message
                </Button>
              </form>
            )}
          </main>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
