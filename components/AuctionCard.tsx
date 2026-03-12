'use client'
import { Auction } from '@/types'
import { Gavel, ShoppingBag, Clock } from 'lucide-react'
import Link from 'next/link'

const getTimeLeft = (status: string, startDate: string, endDate: string): string => {
  const now = Date.now();
  
  // 1. Gestion des états terminés (Sécurité)
  if (status !== 'active' && status !== 'upcoming') return "Terminé";

  const targetDate = status === 'active' ? Date.parse(endDate) : Date.parse(startDate);
  const diff = targetDate - now;

  // 2. Gestion des expirations de temps
  if (diff <= 0) {
    return status === 'active' ? "Terminé" : "Commence bientôt";
  }

  // 3. Calcul des unités
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const MS_PER_HOUR = 1000 * 60 * 60;
  
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);

  // 4. Formatage du message
  const timeStr = days > 0 ? `${days}j ${hours}h` : `${hours}h`;

  return status === 'active' ? `${timeStr} restant` : `Dans ${timeStr}`;
};

interface AuctionCardProps {
  auction: Auction;
  onBid: (amount: number) => void;
}


export default function AuctionCard({ auction, onBid }: AuctionCardProps) {

  const isFixedPrice = auction.type === 'fixed';

  return (
    <div 
      className="group border rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-primary)',
      }}
    >

      {/* 1. ZONE IMAGE */}
      <Link href={`/auctions/${auction.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={auction.main_image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
          alt={auction.title}
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {/* Badge de Mode */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border shadow-md backdrop-blur-sm font-semibold text-xs uppercase tracking-wider"
            style={{
              backgroundColor: isFixedPrice ? 'rgba(59, 130, 246, 0.1)' : 'rgba(251, 191, 36, 0.1)',
              borderColor: isFixedPrice ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)',
              color: isFixedPrice ? '#3b82f6' : 'var(--accent-gold)',
            }}
          >
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: isFixedPrice ? '#3b82f6' : 'var(--accent-gold)' }} />
            <span>{isFixedPrice ? '✦ Vente Privée' : '⚡ Enchère Live'}</span>
          </div>
        </div>
      </Link>

      {/* 2. ZONE INFOS */}
      <div className="p-5 flex flex-col flex-grow space-y-4">

        {/* Prix */}
        <div className="flex justify-between items-end gap-3">
          <div className="flex flex-col">
            <span 
              className="text-2xl font-bold tabular-nums"
              style={{ color: isFixedPrice ? 'var(--text-primary)' : 'var(--accent-gold)' }}
            >
              {isFixedPrice
                ? `${auction.buy_now_price?.toLocaleString('fr-FR')} €`
                : `${auction.current_price?.toLocaleString('fr-FR')} €`
              }
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              {isFixedPrice ? 'Prix fixe' : 'Offre actuelle'}
            </span>
          </div>

          {/* Indicateur de temps */}
          {!isFixedPrice && (
            <div 
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border uppercase tracking-wide"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-secondary)',
              }}
            >
              <Clock size={12} style={{ color: 'var(--accent-gold)' }} />
              <span>{getTimeLeft(auction.status, auction.start_at, auction.end_at)}</span>
            </div>
          )}
        </div>

        {/* Titre & Description */}
        <div className="space-y-2 flex-grow">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>
            {auction.title}
          </h3>
          <p className="text-xs line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
            {isFixedPrice ? 'Disponible immédiatement' : 'Enchère de départ accessible'}
          </p>
        </div>

        <div 
          className="h-px w-full"
          style={{ backgroundColor: 'var(--border-primary)' }}
        />

        {/* Boutons d'action */}
        {isFixedPrice ? (
          <button
            className="w-full h-11 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-primary)',
            }}
          >
            <ShoppingBag size={16} />
            Acheter maintenant
          </button>
        ) : (
          <button
            onClick={(e) => { e.preventDefault(); onBid(auction.current_price + 1); }}
            className="w-full h-11 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-white"
            style={{ backgroundColor: 'var(--accent-gold)' }}
          >
            <Gavel size={16} />
            Placer une offre
          </button>
        )}
      </div>
    </div>
  )
}