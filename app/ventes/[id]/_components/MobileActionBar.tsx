import { Gavel } from 'lucide-react'
import { Auction, AuctionAttributes } from '@/types'

interface MobileActionBarProps {
  auction: Auction
  attr: AuctionAttributes
  isFixedPrice: boolean
  user?: any
  onPlaceBid: () => void
}

export function MobileActionBar({ auction, attr, isFixedPrice, user, onPlaceBid }: MobileActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 border-t z-50 lg:hidden backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', opacity: 0.98 }}>
      <div className="max-w-md mx-auto flex items-center justify-between gap-6">
        {/* Prix et Valeur */}
        {user ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold tabular-nums tracking-tighter" style={{ color: 'var(--accent-gold)' }}>
                {auction.current_price}€
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
            </div>
            <p className="text-[10px] font-medium uppercase tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>
              Valeur {attr.value_real}€
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tighter" style={{ color: 'var(--accent-gold)' }}>Privé</span>
            <p className="text-[10px] font-medium uppercase tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>Connexion requise</p>
          </div>
        )}

        {/* Bouton */}
        <button
          onClick={onPlaceBid}
          className="flex-grow h-14 rounded-lg font-bold uppercase text-xs tracking-widest shadow-md active:scale-95 transition-transform text-white"
          style={{ backgroundColor: 'var(--accent-gold)' }}
        >
          {isFixedPrice ? 'Réserver maintenant' : 'Enchérir'}
        </button>
      </div>
    </div>
  )
}
