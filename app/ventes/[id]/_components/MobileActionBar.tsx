import { Gavel, ShoppingBag, Lock } from 'lucide-react'
import { Auction, AuctionAttributes } from '@/types'

interface MobileActionBarProps {
  auction: Auction
  attr: AuctionAttributes
  isFixedPrice: boolean
  isConnected: boolean // Remplacé user par isConnected pour plus de clarté
  onPlaceBid: (amount: number) => void
  isBidding?: boolean
}

export function MobileActionBar({
  auction,
  attr,
  isFixedPrice,
  isConnected,
  onPlaceBid,
  isBidding = false
}: MobileActionBarProps) {

  // --- LOGIQUE DE CALCUL ---
  const currentPrice = Number(auction.current_price);
  const stepValue = Number(auction.min_bid_increment || 10);

  const minIncrement = auction.bid_step_type === "fixed"
    ? stepValue
    : Math.ceil(currentPrice * (stepValue / 100));

  const nextMinAmount = currentPrice + minIncrement;

  // Formatage monétaire
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);

  // --- RENDU DU BOUTON (ACTION PRINCIPALE) ---
  const renderActionButton = () => {
    if (!isConnected) {
      return (
        <button
          onClick={() => onPlaceBid(0)} // Déclenchera la modal de connexion
          className="flex-grow h-14 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Lock size={14} />
          S'inscrire
        </button>
      );
    }

    if (isFixedPrice) {
      return (
        <button
          onClick={() => onPlaceBid(Number(auction.buy_now_price))}
          disabled={isBidding}
          className="flex-grow h-14 bg-[var(--accent-gold)] text-black rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <ShoppingBag size={18} strokeWidth={2.5} />
          Réserver
        </button>
      );
    }

    return (
      <button
        onClick={() => onPlaceBid(nextMinAmount)}
        disabled={isBidding}
        className="group relative flex-grow h-14 bg-[var(--accent-gold)] text-black rounded-xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 overflow-hidden flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-2">
          <Gavel size={16} strokeWidth={3} className={isBidding ? 'animate-bounce' : ''} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {isBidding ? 'Envoi...' : 'Enchérir'}
          </span>
        </div>
        {!isBidding && (
          <span className="text-[13px] font-[1000] tracking-tight">
            {formatCurrency(nextMinAmount)}
          </span>
        )}
        {/* Effet Shimmer Luxe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </button>
    );
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 pb-8 border-t z-50 lg:hidden backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(var(--bg-primary-rgb), 0.95)',
        borderColor: 'var(--border-primary)'
      }}
    >
      <div className="max-w-md mx-auto flex items-center gap-5">

        {/* SECTION PRIX (GAUCHE) */}
        <div className="flex flex-col min-w-[100px]">
          {isConnected ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-[1000] tabular-nums tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                  {currentPrice}€
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-50">
                Valeur {attr?.value_real || '---'}€
              </p>
            </>
          ) : (
            <>
              <span className="text-xl font-[1000] tracking-tighter uppercase italic opacity-30">Privé</span>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-40 leading-tight">Membres uniquement</p>
            </>
          )}
        </div>

        {/* SECTION BOUTON (DROITE) */}
        {renderActionButton()}

      </div>
    </div>
  )
}