import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Twitter } from 'lucide-react';
import { SectionLabel } from './ui/Typography';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

const FooterHeading = ({ children }: React.PropsWithChildren<{}>) => (
  <h3 className="font-black text-lg mb-6 text-white tracking-tight uppercase">{children}</h3>
);

const FooterLink = ({ onClick, children, isPrimary = false, icon }: React.PropsWithChildren<{ onClick?: () => void, isPrimary?: boolean, icon?: React.ReactNode }>) => (
  <li>
    <button 
      onClick={onClick} 
      className={`transition-colors flex items-center gap-2 focus:outline-none hover:underline text-left ${isPrimary ? 'text-[#E65100] font-black' : 'text-gray-400 hover:text-white font-medium'}`}
    >
      {!isPrimary && !icon && <span className="w-1 h-1 rounded-full bg-gray-600"></span>}
      {icon}
      {children}
    </button>
  </li>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const LOGO_WHITE = "https://www.magma-studio.tn/portfolio2/moto/Logo/logo-white.svg";

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-900" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-8">
            <button 
              className="flex flex-col items-start gap-4 cursor-pointer group focus:outline-none text-left" 
              onClick={() => onNavigate?.('home')}
              aria-label="Retour à l'accueil"
            >
               <img 
                 src={LOGO_WHITE} 
                 alt="MotoScoot.tn" 
                 className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
               />
               <SectionLabel className="text-[#E65100]">La référence moto</SectionLabel>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
              La référence en Tunisie pour l'achat et la vente de motos d'occasion et neuves. Trouvez votre liberté sur deux roues.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-gray-500 hover:bg-[#E65100] hover:text-white transition-all duration-300 border border-neutral-800" aria-label="Social link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterHeading>Navigation</FooterHeading>
            <ul className="space-y-4 text-sm">
              <FooterLink onClick={() => onNavigate?.('home')}>Accueil</FooterLink>
              <FooterLink onClick={() => onNavigate?.('search')}>Annonces</FooterLink>
              <FooterLink onClick={() => onNavigate?.('news')}>Actualités</FooterLink>
              <FooterLink onClick={() => onNavigate?.('garages')}>Garages</FooterLink>
              <FooterLink onClick={() => onNavigate?.('contact')}>Contact</FooterLink>
              <li className="pt-2 border-t border-neutral-900">
                <FooterLink onClick={() => onNavigate?.('dashboard-pro')} isPrimary>Espace Pro</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <FooterHeading>Informations</FooterHeading>
            <ul className="space-y-4 text-sm">
              <FooterLink onClick={() => onNavigate?.('about')}>À propos de nous</FooterLink>
              <FooterLink onClick={() => onNavigate?.('terms')}>Conditions Générales</FooterLink>
              <FooterLink onClick={() => onNavigate?.('legal')}>Confidentialité</FooterLink>
              <FooterLink onClick={() => onNavigate?.('cookies')}>Cookies</FooterLink>
              <FooterLink onClick={() => onNavigate?.('faq')}>FAQ</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#E65100] group-hover:bg-[#E65100] group-hover:text-white transition-colors">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <span className="leading-relaxed text-gray-400 font-medium pt-1">Les Berges du Lac 1,<br />1053 Tunis, Tunisie</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#E65100] group-hover:bg-[#E65100] group-hover:text-white transition-colors">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <a href="tel:+21621719109" className="font-bold text-gray-400 hover:text-white transition-colors">+216 21 719 109</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[#E65100] group-hover:bg-[#E65100] group-hover:text-white transition-colors">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <a href="mailto:contact@motoscoot.tn" className="font-bold text-gray-400 hover:text-white transition-colors">contact@motoscoot.tn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <p>© {new Date().getFullYear()} MotoScoot. Tous droits réservés.</p>
            <p className="md:border-l md:border-neutral-900 md:pl-8">
              Réalisé par <a href="https://magma-studio.tn" target="_blank" rel="noopener noreferrer" className="text-[#E65100] hover:underline">magma-studio.tn</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;