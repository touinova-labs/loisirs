'use client'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

export type ToastType = 'error' | 'success' | null;

interface ToastProps {
  message: string | null;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[90%] sm:max-w-md pointer-events-none">
      <div 
        className="pointer-events-auto flex items-center gap-4 p-4 rounded-lg shadow-lg border backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-10 duration-500 relative"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: isError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)',
        }}
      >
        {/* Barre d'accentuation latérale */}
        <div 
          className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full" 
          style={{ backgroundColor: isError ? '#EF4444' : 'var(--accent-gold)' }} 
        />

        {/* Icône avec cercle de fond */}
        <div 
          className="shrink-0 p-2 rounded-lg"
          style={{ backgroundColor: isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)' }}
        >
          {isError 
            ? <AlertCircle style={{ color: '#EF4444' }} size={20} /> 
            : <CheckCircle2 style={{ color: 'var(--accent-gold)' }} size={20} />
          }
        </div>
        
        {/* Texte */}
        <div className="flex-grow">
          <p className="text-xs uppercase font-semibold tracking-widest mb-0.5" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
            {isError ? 'Erreur' : 'Succès'}
          </p>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {message}
          </p>
        </div>

        {/* Bouton fermeture */}
        <button 
          onClick={onClose} 
          className="p-2 rounded-lg transition-colors shrink-0 hover:bg-white/10"
        >
          <X size={18} style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </div>
  );
}