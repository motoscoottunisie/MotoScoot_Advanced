import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { monitoring } from '../utils/monitoring';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const useNativeShare = () => {
  const { addToast } = useToast();

  const share = useCallback(async (data: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        monitoring.trackEvent('ContentShared', { method: 'native_api', url: data.url });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(data.url);
        addToast("Lien copié !", "info", 2000);
        monitoring.trackEvent('ContentShared', { method: 'clipboard', url: data.url });
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }, [addToast]);

  return share;
};