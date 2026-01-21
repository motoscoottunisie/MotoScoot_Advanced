import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  HelpCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Wrench,
  Zap,
  MessageCircle,
  Plus
} from 'lucide-react';

interface FAQProps {
  onGoHome?: () => void;
  onNavigate?: (view: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Acheteurs",
    question: "Comment contacter un vendeur ?",
    answer: "Pour contacter un vendeur, cliquez sur le bouton 'Appeler' présent sur chaque annonce. Si vous êtes sur mobile, cela ouvrira directement votre composeur. Pour certains vendeurs, une option WhatsApp peut également être disponible."
  },
  {
    category: "Acheteurs",
    question: "Les prix sont-ils négociables ?",
    answer: "La négociation dépend entièrement du vendeur. Certains précisent 'Prix ferme' dans leur description, d'autres sont ouverts à la discussion. Nous vous conseillons de rester courtois lors de vos échanges."
  },
  {
    category: "Acheteurs",
    question: "Est-ce que MotoScoot propose des crédits ?",
    answer: "MotoScoot est une plateforme de mise en relation. Cependant, nous avons des partenaires bancaires qui proposent des solutions de financement spécifiques au monde du deux-roues. Consultez nos bannières publicitaires dédiées."
  },
  {
    category: "Vendeurs",
    question: "Est-ce gratuit de déposer une annonce ?",
    answer: "Oui, le dépôt d'une annonce standard est entièrement gratuit pour les particuliers. Nous proposons des options de 'Boost' payantes pour ceux qui souhaitent vendre plus rapidement en restant en tête de liste."
  },
  {
    category: "Vendeurs",
    question: "Combien de temps mon annonce reste-t-elle en ligne ?",
    answer: "Une annonce reste active pendant 60 jours. Vous recevrez un email quelques jours avant son expiration pour vous proposer de la prolonger gratuitement si votre bien n'est pas encore vendu."
  },
  {
    category: "Vendeurs",
    question: "Comment booster la visibilité de mon annonce ?",
    answer: "Depuis votre tableau de bord, vous pouvez choisir l'option 'Booster'. Cela placera votre annonce dans des zones privilégiées du site et la fera remonter régulièrement en tête des résultats de recherche."
  },
  {
    category: "Garages",
    question: "Comment référencer mon garage sur MotoScoot ?",
    answer: "C'est très simple ! Rendez-vous sur la page 'Contact' et remplissez le formulaire dédié aux professionnels. Un membre de notre équipe vous contactera pour valider vos informations et créer votre fiche garage."
  },
  {
    category: "Garages",
    question: "Qu'est-ce que le badge 'Garage Vérifié' ?",
    answer: "Ce badge est attribué aux garages dont nous avons vérifié l'existence légale et la qualité des services. Il rassure les utilisateurs et augmente significativement le nombre de demandes de rendez-vous."
  },
  {
    category: "Sécurité",
    question: "Comment éviter les arnaques ?",
    answer: "Ne versez jamais d'acompte avant d'avoir vu le véhicule et vérifié les papiers originaux. Méfiez-vous des offres trop alléchantes et privilégiez les rencontres physiques dans des lieux publics."
  },
  {
    category: "Sécurité",
    question: "Mes données personnelles sont-elles protégées ?",
    answer: "Absolument. Nous ne partageons vos données qu'avec votre accord explicite. Votre numéro de téléphone n'est visible que par les personnes intéressées qui cliquent sur 'Afficher le numéro'."
  }
];

const FAQ: React.FC<FAQProps> = ({ onGoHome, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = ["Tous", "Acheteurs", "Vendeurs", "Garages", "Sécurité"];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Acheteurs': return <ShoppingBag size={18} />;
      case 'Vendeurs': return <Zap size={18} />;
      case 'Garages': return <Wrench size={18} />;
      case 'Sécurité': return <ShieldCheck size={18} />;
      default: return <HelpCircle size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <div className="relative w-full h-[35vh] md:h-[30vh] lg:h-[45vh] flex flex-col md:items-center md:justify-center px-6 font-sans overflow-hidden bg-primary-50">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://magma-studio.tn/portfolio2/-hero-background.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#AF2E13] to-[#E65100] opacity-95 mix-blend-multiply" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto h-full pt-12">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up">
              Foire Aux Questions
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <nav className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap no-scrollbar">
              <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
                <Home className="w-4 h-4 mr-1" /> Accueil
              </button>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
              <span className="font-semibold text-gray-900">FAQ</span>
          </nav>
          <div className="relative w-full md:w-80">
             <input type="text" placeholder="Chercher une réponse..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none" />
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" size={16} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3">
             <div className="bg-white rounded-3xl border border-gray-100 p-4 sticky top-24 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Catégories</h3>
                <nav className="space-y-1">
                   {categories.map((cat) => (
                     <button key={cat} onClick={() => setActiveCategory(cat)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
                        {getCategoryIcon(cat)} {cat}
                     </button>
                   ))}
                </nav>
             </div>
          </aside>

          <div className="lg:col-span-9 space-y-4">
             {filteredFaqs.map((item, index) => (
               <div key={index} className={`bg-white rounded-3xl border transition-all ${expandedIndex === index ? 'border-primary-200 shadow-lg' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleAccordion(index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                     <span className="text-lg font-bold text-gray-900">{item.question}</span>
                     <Plus size={16} className={`${expandedIndex === index ? 'rotate-45' : ''} transition-transform`} />
                  </button>
                  {expandedIndex === index && (
                    <div className="px-6 pb-6 pt-0 animate-fade-in-up">
                       <p className="text-gray-600 leading-relaxed font-medium pl-4 border-l-2 border-primary-100">{item.answer}</p>
                    </div>
                  )}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;