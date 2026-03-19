import { Auction, AuctionAttributes } from '@/types'
import { Clock, ShieldCheck, Star, Truck, Users, Utensils } from 'lucide-react'

interface OfferDetailsSectionProps {
  auction: Auction
  attr: AuctionAttributes
}

export function OfferDetailsSection({ auction, attr }: OfferDetailsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold italic uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
          <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> L'offre en détail
        </h2>
        <span className="text-[10px] font-semibold py-1 px-3 border rounded-full uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
          ID: #{auction.id.slice(0, 6)}
        </span>
      </div>
      <InclusionsSection attr={attr} />
      <p className="text-[9px] italic uppercase tracking-widest text-center text-[var(--text-secondary)]">
        Offres exclusives et sélectionnées avec soin, disponibles uniquement pour nos membres.
      </p>
    </section>
  )
}



interface InclusionItem {
  icon: React.ReactNode
  text: string
}

interface InclusionsSectionProps {
  attr: AuctionAttributes
}
export function InclusionsSection({ attr }: InclusionsSectionProps) {
  const inclusions: InclusionItem[] = []

  if (attr.guests) inclusions.push({ icon: <Users size={18} />, text: `${attr.guests} Personne${attr.guests > 1 ? 's' : ''}` })
  if (attr.duration) inclusions.push({ icon: <Clock size={18} />, text: `${attr.duration} de séjour` })
  if (attr.breakfast) inclusions.push({ icon: <Utensils size={18} />, text: 'Petit-déjeuner gourmet inclus' })
  if (attr.spa_access) inclusions.push({ icon: <ShieldCheck size={18} />, text: 'Accès à l’espace Spa' })
  if (attr.menu) inclusions.push({ icon: <Utensils size={18} />, text: attr.menu })
  if (attr.is_private) inclusions.push({ icon: <Star size={18} />, text: 'Expérience Privée' })
  if (attr.has_delivery) inclusions.push({ icon: <Truck size={18} />, text: 'Service inclus sur place' })

  return (
    <div className="grid grid-cols-2 gap-3">
      {inclusions.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 border rounded-lg hover:opacity-90 transition-all shadow-sm"
          style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
        >
          <div style={{ color: 'var(--accent-gold)' }} className="shrink-0">
            {item.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.text}</span>
        </div>
      ))}
    </div>
  )
}