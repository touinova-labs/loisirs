import { Calendar, Info, CheckCircle2 } from 'lucide-react'
import { AuctionAttributes } from '@/types'

interface ConditionsSectionProps {
  attr: AuctionAttributes
}

export function ConditionsSection({ attr }: ConditionsSectionProps) {
  return (
    <section className="p-8 border rounded-lg space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
      <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--accent-gold)' }}>
        <CheckCircle2 size={16} /> Détails & conditions de réservation
      </h3>
      <ul className="space-y-4">
        <li className="flex gap-4 text-xs font-bold italic" style={{ color: 'var(--text-secondary)' }}>
          <Calendar size={16} className="shrink-0" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
          <span>
            Valable jusqu'au{' '}
            {new Date(new Date().setMonth(new Date().getMonth() + (attr.validity_months || 0))).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            .
          </span>
        </li>
        <li className="flex gap-4 text-xs font-bold italic" style={{ color: 'var(--text-secondary)' }}>
          <Info size={16} className="shrink-0" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
          <span>{attr.booking_info}</span>
        </li>
      </ul>
    </section>
  )
}
