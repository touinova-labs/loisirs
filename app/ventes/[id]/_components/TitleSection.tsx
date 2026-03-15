import { MapPin, Star } from 'lucide-react'
import { Auction, AuctionAttributes } from '@/types'

interface TitleSectionProps {
  auction: Auction
  attr: AuctionAttributes
}

export function TitleSection({ auction, attr }: TitleSectionProps) {
  return (
    <div className="lg:hidden space-y-4">
      <h1 className="text-3xl font-bold italic uppercase tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
        {auction.title}
      </h1>
      <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
        <span className="flex items-center gap-1">
          <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
          {auction.location_name}
        </span>
        {attr.rating && attr.reviews_count && (
          <span className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500" />
            {attr.rating} ({attr.reviews_count} avis)
          </span>
        )}
      </div>
    </div>
  )
}
