import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { mockArticles } from '../data/mockData';
import SEO from './common/SEO';
import { useNativeShare } from '../hooks/useNativeShare';

interface ArticleDetailsProps {
  articleId: number;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ articleId, onNavigate, onBack }) => {
  const article = mockArticles.find(a => a.id === articleId) || mockArticles[0];
  const share = useNativeShare();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const handleShare = () => {
    share({
      title: article.title,
      text: article.summary,
      url: window.location.href
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-12">
      <SEO title={article.title} description={article.summary} image={article.image} />

      <div className="relative w-full h-[30vh] bg-gradient-to-br from-[#E65100] to-[#DD2C14] flex items-end pb-8">
        <div className="max-w-4xl mx-auto px-6 w-full">
           <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={18} /> Retour
            </button>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight line-clamp-2">{article.title}</h1>
        </div>
      </div>

      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">{article.author.charAt(0)}</div><span className="font-bold text-gray-900">{article.author}</span></div>
                    <div className="flex items-center gap-1.5"><Calendar size={16} /><span>{article.date}</span></div>
                    <div className="flex items-center gap-1.5"><Clock size={16} /><span>{article.readTime}</span></div>
                </div>
                <button 
                  onClick={handleShare}
                  className="p-2.5 bg-gray-50 rounded-xl text-gray-600 hover:text-primary-600 transition-colors active:scale-95"
                  aria-label="Partager"
                >
                  <Share2 size={20} />
                </button>
            </div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-6 mb-12">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-sm">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
            <article className="prose prose-lg prose-gray max-w-none">
                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-10 border-l-4 border-primary-600 pl-6">{article.summary}</p>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || "") }} />
            </article>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetails;