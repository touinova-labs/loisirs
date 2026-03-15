import { ShieldCheck, CheckCircle2, Star } from 'lucide-react'

export function TrustBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
      {/* Paiement Sécurisé */}
      <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent-gold)' }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>
          Paiement Sécurisé
        </span>
        <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Transactions SSL & Séquestre
        </p>
      </div>

      {/* Annulation Zen */}
      <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80 border-x" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--accent-gold)' }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>
          Annulation Zen
        </span>
        <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Flexible jusqu'à 48h
        </p>
      </div>

      {/* Service Premium */}
      <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
          <Star size={20} style={{ color: 'var(--accent-gold)' }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>
          Service Premium
        </span>
        <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Conciergerie dédiée 7j/7
        </p>
      </div>
    </div>
  )
}
