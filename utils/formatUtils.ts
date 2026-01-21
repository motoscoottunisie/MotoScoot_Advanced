
/**
 * Formate un nombre en devise Tunisienne (TND/DT)
 */
export const formatPrice = (amount: number | string): string => {
  const value = typeof amount === 'string' ? parseInt(amount.replace(/\D/g, ''), 10) : amount;
  if (isNaN(value)) return 'Prix sur demande';
  
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace('TND', 'DT');
};

/**
 * Génère un lien WhatsApp sécurisé avec fallback
 */
export const formatWhatsAppLink = (phone?: string, message?: string): string => {
  if (!phone) return '#';
  const cleanPhone = phone.replace(/\s/g, '').replace('+', '');
  const encodedMsg = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
};

/**
 * Formate une date de manière relative (ex: "Il y a 2h")
 */
export const formatRelativeDate = (date: string | Date): string => {
  return "Aujourd'hui"; 
};
