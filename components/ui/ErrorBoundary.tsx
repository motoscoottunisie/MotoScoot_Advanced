import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';
import { monitoring } from '../../utils/monitoring';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Reporting automatique en production
    monitoring.captureException(error, {
      componentStack: errorInfo.componentStack,
      boundary: 'Global/Local Boundary'
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-red-50 rounded-[2.5rem] border border-red-100 text-center animate-fade-in">
          <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Erreur Système isolée</h2>
          <p className="text-gray-600 mb-8 max-w-md font-medium">Une anomalie a été détectée et signalée automatiquement à nos ingénieurs. Le reste du site reste accessible.</p>
          <Button 
            variant="dark" 
            onClick={() => window.location.reload()} 
            leftIcon={<RefreshCcw size={18}/>}
          >
            Redémarrer le module
          </Button>
        </div>
      );
    }
    
    return (this as any).props.children;
  }
}
