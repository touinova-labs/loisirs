import { Auction, AuctionAttributes } from '@/types'
import { InclusionsSection } from './InclusionsSection'

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
    </section>
  )
}
