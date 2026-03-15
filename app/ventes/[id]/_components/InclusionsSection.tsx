import { Users, Clock, Utensils, ShieldCheck, Star, Truck } from 'lucide-react'
import { AuctionAttributes } from '@/types'

interface InclusionItem {
  icon: React.ReactNode
  text: string
}

interface InclusionsSectionProps {
  attr: AuctionAttributes
}

export function InclusionsSection({ attr }: InclusionsSectionProps) {
  const inclusions: InclusionItem[] = []

  if (attr.guests) inclusions.push({ icon: <Users size={18} />, text: `${attr.guests} Personnes` })
  if (attr.duration) inclusions.push({ icon: <Clock size={18} />, text: attr.duration })
  if (attr.breakfast) inclusions.push({ icon: <Utensils size={18} />, text: 'Petit-déjeuner' })
  if (attr.spa_access) inclusions.push({ icon: <ShieldCheck size={18} />, text: 'Espace Spa' })
  if (attr.menu) inclusions.push({ icon: <Utensils size={18} />, text: attr.menu })
  if (attr.is_private) inclusions.push({ icon: <Star size={18} />, text: 'Privé' })
  if (attr.has_delivery) inclusions.push({ icon: <Truck size={18} />, text: 'Livraison incluse' })

  return (
    <div className="grid grid-cols-2 gap-3">
      {inclusions.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 border rounded-lg hover:opacity-80 transition-colors"
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
