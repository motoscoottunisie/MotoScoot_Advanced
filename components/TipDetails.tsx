import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, ThumbsUp, ThumbsDown, CheckCircle2, Wrench, Lightbulb, Share2, AlertTriangle } from 'lucide-react';
import DOMPurify from 'dompurify';
import { mockTips } from '../data/mockData';
import { useNativeShare } from '../hooks/useNativeShare';

interface TipDetailsProps {
  tipId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
}

const TipDetails: React.FC<TipDetailsProps> = ({ tipId, onNavigate, onBack }) => {
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);
  const tip = mockTips.find(t => t.id === tipId) || mockTips[0];
  const share = useNativeShare();

  useEffect(() => { window.scrollTo(0, 0); setHelpful(null); }, [tipId]);

  const handleShare = () => {
    share({
      title: tip.title,
      text: tip.summary,
      url: window.location.href
    });
  };

  const getDifficultyColor = (diff: string) => {
      switch(diff) {
          case 'Débutant': return 'text-success-700 bg-success-50 border-success-200';
          case 'Intermédiaire': return 'text-warning-700 bg-warning-50 border-warning-200';
          case 'Expert': return 'text-red-700 bg-red-50 border-red-200';
          default: return 'text-gray-700 bg-gray-50 border-gray-200';
      }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-12">
      <div className="relative w-full h-[30vh] bg-gradient-to-br from-[#E65100] to-[#DD2C14] flex items-end pb-8 pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
           <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={18} /> Retour
            </button>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{tip.title}</h1>
        </div>
      </div>

      <main className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getDifficultyColor(tip.difficulty)}`}>{tip.difficulty}</span>
                        <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-[10px] font-black uppercase border border-gray-200">{tip.category}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-bold uppercase">
                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black">{tip.author.charAt(0)}</div><span className="text-gray-900">{tip.author}</span></div>
                        <div className="flex items-center gap-1.5"><Clock size={16} /><span>{tip.readTime}</span></div>
                        <div className="flex items-center gap-1.5"><Calendar size={16} /><span>{tip.date}</span></div>
                    </div>
                </div>
                <div className="hidden lg:flex lg:col-span-4 justify-end pt-2">
                   <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:text-primary-600 shadow-sm transition-all active:scale-95"
                   >
                     <Share2 size={18} /> Partager
                   </button>
                </div>
                <div className="lg:hidden">
                   <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-100 text-gray-700 font-bold w-full justify-center shadow-sm active:scale-95"
                   >
                     <Share2 size={18} /> Partager l'astuce
                   </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                 <div className="rounded-3xl overflow-hidden shadow-lg mb-10 aspect-video relative border border-gray-100 bg-white">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
                     <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold italic">{tip.summary}</p>
                 </div>
                 <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm mb-12">
                    <div className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tip.content || "") }} />
                 </div>
                 <div className="bg-gray-100/50 border border-gray-200 rounded-3xl p-8 text-center mb-16">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Utile ?</h3>
                    <div className="flex justify-center gap-4">
                       <button onClick={() => setHelpful('yes')} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border uppercase text-xs ${helpful === 'yes' ? 'bg-success-600 text-white' : 'bg-white text-gray-600'}`}><ThumbsUp size={18} /> Oui</button>
                       <button onClick={() => setHelpful('no')} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border uppercase text-xs ${helpful === 'no' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}><ThumbsDown size={18} /> Non</button>
                    </div>
                 </div>
              </div>
              <aside className="lg:col-span-4 space-y-8">
                 <div className="sticky top-28 space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                       <div className="bg-gray-900 px-6 py-5 flex items-center gap-3"><Wrench className="text-white" size={20} /><h3 className="font-black text-white text-base uppercase tracking-wider">Matériel</h3></div>
                       <div className="p-6">
                          <ul className="space-y-4">
                             {tip.tools?.map((tool, idx) => (
                                <li key={idx} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-primary-600 shrink-0 mt-0.5" /><span className="text-gray-700 font-bold text-sm">{tool}</span></li>
                             ))}
                          </ul>
                       </div>
                    </div>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                       <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 uppercase text-xs tracking-widest"><Lightbulb className="text-warning-500" size={18} /> En bref</h3>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-400 text-[10px] font-black uppercase">Difficulté</span><span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border ${getDifficultyColor(tip.difficulty)}`}>{tip.difficulty}</span></div>
                          <div className="flex justify-between items-center"><span className="text-gray-400 text-[10px] font-black uppercase">Temps</span><span className="font-black text-gray-900 text-xs">{tip.readTime}</span></div>
                       </div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex gap-3"><AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={18} /><p className="text-[10px] text-orange-900 font-bold uppercase">La mécanique comporte des risques.</p></div>
                 </div>
              </aside>
           </div>
        </div>
      </main>
    </div>
  );
};

export default TipDetails;