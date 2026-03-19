'use client'
import { useState, useEffect, useMemo } from 'react'
import { Auction } from '@/types'
import { Lock, ArrowRight, Gavel, Star, Users, Coffee, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'
import { getPriceLabel } from '@/app/ventes/[id]/_components/PricingSidebar';

interface AuctionCardProps {
  auction: Auction;
  isConnected?: boolean;
  onAuthClick?: () => void;
}

export default function AuctionCard({ auction, isConnected = false, onAuthClick }: AuctionCardProps) {
  const [timerText, setTimerText] = useState<string>("");
  const isFixed = auction.type === 'fixed';
  const attr = auction.attributes;
  const isHotel = attr?.type === "hotel";

  // 1. Calcul du Timer (Active ou Upcoming)
  useEffect(() => {
    if (isFixed || !['active', 'upcoming'].includes(auction.status)) return;

    const updateTimer = () => {
      const targetDate = auction.status === 'active' ? auction.end_at : auction.start_at;
      const diff = new Date(targetDate).getTime() - Date.now();

      if (diff <= 0) {
        setTimerText(auction.status === 'active' ? "Clôturé" : "En cours...");
        return;
      }

      const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5),
        m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1000);

      const parts = [];
      if (d > 0) parts.push(`${d}j`);
      if (h > 0 || d > 0) parts.push(`${h}h`);
      if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`);
      parts.push(`${s}s`);

      setTimerText(parts.join(" "));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction, isFixed]);

  // 2. Mémos pour les libellés et styles

  const statusConfig = useMemo(() => {
    switch (auction.status) {
      case 'active':
        return {
          label: isFixed ? 'Accès immédiat' : 'En cours de sélection',
          style: isFixed ? 'bg-blue-600/30 border-blue-400/40 text-blue-100' : 'bg-[var(--accent-gold)]/20 border-[var(--accent-gold)]/50 text-white',
          dot: 'animate-pulse bg-current'
        };
      case 'upcoming':
        return { label: 'Prochainement ouvert', style: 'bg-black/40 border-white/20 text-white/70', dot: 'bg-blue-400' };
      default:
        return { label: 'Sélection finalisée', style: 'bg-black/40 border-white/20 text-white/50', dot: 'bg-gray-500' };
    }
  }, [auction.status, isFixed]);

  return (
    <div className="group flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">

      {/* ZONE IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)]">
        <img src={auction.main_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />

        {/* Badges Flottants */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <div className={`backdrop-blur-xl px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-lg ${statusConfig.style}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
            {statusConfig.label}
          </div>

          {isHotel && attr?.rating && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 w-fit">
              <Star size={8} fill="var(--accent-gold)" className="text-[var(--accent-gold)]" />
              <span className="text-[9px] font-bold text-white">{Math.floor(attr.rating)}*</span>
            </div>
          )}
        </div>

        {/* Timer : Design Précision Horlogère */}
        {!isFixed && ['active', 'upcoming'].includes(auction.status) && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 p-2.5 rounded-xl flex items-center gap-3 shadow-2xl overflow-hidden group/timer">

              {/* Icône animée */}
              <div className="relative flex items-center justify-center">
                <Clock size={14} className={`transition-colors duration-500 ${auction.status === 'active' ? 'text-[var(--accent-gold)]' : 'text-blue-400'}`} />
                {auction.status === 'active' && (
                  <span className="absolute inset-0 rounded-full bg-[var(--accent-gold)]/20 animate-ping" />
                )}
              </div>

              <div className="flex flex-col flex-grow min-w-0">
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/50 leading-none mb-1">
                  {auction.status === 'active' ? 'Clôture dans' : 'Ouverture dans'}
                </span>

                <div className="flex items-baseline gap-1">
                  <span className={`text-[11px] font-mono font-bold tabular-nums tracking-wider ${auction.status === 'active' ? 'text-[var(--accent-gold)]' : 'text-white'
                    }`}>
                    {timerText}
                  </span>

                  {/* Indicateur visuel discret de seconde */}
                  {auction.status === 'active' && (
                    <span className="h-1 w-1 rounded-full bg-[var(--accent-gold)] animate-pulse" />
                  )}
                </div>
              </div>

              {/* Progress Bar subtile en fond (Optionnel : nécessite un calcul de % restant) */}
              <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-30 w-full" />
            </div>
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-6 group/title">
          <h3 className="text-xl font-black italic uppercase tracking-tighter leading-[1.1] mb-2 
                 transition-colors duration-300 group-hover/title:text-[var(--accent-gold)]">
            <span className="line-clamp-2 min-h-[2.2em] block">
              {auction.title}
            </span>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              Expérience sélectionnée
            </p>
          </h3>

          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-[2px] h-3 bg-[var(--accent-gold)] scale-y-0 group-hover/title:scale-y-100 transition-transform duration-500 origin-bottom" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] font-bold italic truncate">
              {auction.location_name || "Destination Confidentielle"}
            </p>
          </div>
        </div>

        {/* Atouts */}
        <div className="flex flex-wrap items-center gap-y-2.5 gap-x-4 mb-5 border-y border-[var(--border-primary)]/30 py-3">
          {isHotel && attr?.rating && (
            <div className="flex items-center gap-1">
              <Star size={10} fill="var(--accent-gold)" className="text-[var(--accent-gold)]" />
              <span className="text-[10px] font-black tracking-tighter">{Math.floor(attr.rating)}*</span>
            </div>
          )}
          {attr?.guests && <Feature icon={<Users size={12} />} text={`${attr.guests} pers.`} />}
          {attr?.breakfast && <Feature icon={<Coffee size={12} />} text="Inclus" />}
          {attr?.spa_access && <Feature icon={<Sparkles size={11} />} text="Spa" highlight />}
        </div>

        {/* Pricing Section */}
        <div className="mt-auto pt-2">
          {/* TOP ROW: Labels & Preuve Sociale */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-black uppercase tracking-[0.25em] text-[var(--text-tertiary)] leading-none">
                {getPriceLabel(isFixed, auction.status, auction.total_bids)}
              </span>
              {/* Petite ligne de soulignement design */}
              <div className="h-[1.5px] w-5 bg-[var(--accent-gold)]/30 rounded-full" />
            </div>

            {!isFixed && isConnected && auction.status === 'active' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 rounded-md">
                <Gavel size={10} className="text-[var(--accent-gold)] animate-pulse" strokeWidth={3} />
                <span className="text-[9px] font-black text-[var(--accent-gold)] uppercase tracking-tight">
                  {auction.total_bids || 0} {auction.total_bids > 1 ? 'positions' : 'position'}
                </span>
              </div>
            )}
          </div>

          {/* MIDDLE ROW: Prix ou Accès Privé */}
          <div className="mb-5">
            {isConnected ? (
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2.5">
                  <span className={`text-3xl font-black italic tracking-tighter tabular-nums leading-none ${auction.status !== 'active' ? 'text-gray-500/50' : 'text-[var(--text-primary)]'
                    }`}>
                    {(isFixed ? auction.buy_now_price : auction.current_price)?.toLocaleString('fr-FR')}€
                  </span>
                  {attr?.value_real && (
                    <span className="text-[11px] line-through text-[var(--text-tertiary)] opacity-40 font-bold italic decoration-[1.5px]">
                      {attr.value_real.toLocaleString('fr-FR')}€
                    </span>
                  )}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[var(--accent-gold)] mt-1">
                  Accès confidentiel
                </span>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full h-14 flex items-center justify-between bg-[var(--bg-tertiary)] px-5 rounded-xl border border-dashed border-[var(--border-primary)] hover:border-[var(--accent-gold)] transition-all duration-300 group/lock"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xl font-black italic blur-[5px] opacity-20 tracking-tighter select-none">888 888€</span>
                  <span className="text-[6px] font-black uppercase tracking-[0.3em] text-[var(--accent-gold)] opacity-0 group-hover/lock:opacity-100 transition-opacity">Accès réservé</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase text-[var(--accent-gold)] border border-white/5 group-hover/lock:scale-105 transition-transform">
                  <Lock size={10} strokeWidth={3} /> Accès privé
                </div>
              </button>
            )}
          </div>

          {/* BOTTOM ROW: Action Button */}
          <AuctionAction auction={auction} isConnected={isConnected} onAuthClick={onAuthClick} />
        </div>
      </div>
    </div>
  )
}

// Sous-composant pour les atouts
function Feature({ icon, text, highlight = false, opacity = "opacity-60" }: { icon: React.ReactNode, text: string, highlight?: boolean, opacity?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${highlight ? 'text-[var(--accent-gold)]' : opacity}`}>
      <span className="flex-shrink-0">{icon}</span>
      <span className={`text-[10px] font-bold ${!highlight && 'tracking-tight'} ${highlight && 'uppercase text-[9px] font-black tracking-widest'}`}>
        {text}
      </span>
    </div>
  );
}

const AuctionAction = ({ auction, isConnected, onAuthClick }: AuctionCardProps) => {
  // 1. Cas : Vente clôturée (Désactivé)
  if (auction.status !== 'active' && auction.status !== 'upcoming') {
    return (
      <button disabled className="w-full h-12 flex items-center justify-between px-6 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed opacity-50 font-black text-[9px] uppercase tracking-[0.2em]">
        <span>Vente Clôturée</span>
        <ArrowRight size={14} strokeWidth={3} />
      </button>
    );
  }

  // 2. Cas : Non connecté (Déclenche la Modal)
  if (!isConnected) {
    return (
      <button
        onClick={onAuthClick}
        className="w-full h-12 flex items-center justify-between px-6 rounded-lg transition-all duration-500 font-black text-[9px] uppercase tracking-[0.2em] shadow-sm bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] hover:text-white"
      >
        <span>Accéder au cercle</span>
        <ArrowRight size={14} strokeWidth={3} className="hover:translate-x-1 transition-transform" />
      </button>
    );
  }

  // 3. Cas : Connecté (Lien vers la vente ou l'aperçu)
  return (
    <Link
      href={`/ventes/${auction.id}`}
      className="w-full h-12 flex items-center justify-between px-6 rounded-lg transition-all duration-500 font-black text-[9px] uppercase tracking-[0.2em] shadow-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:shadow-lg hover:-translate-y-0.5"
    >
      <span>{auction.status === 'upcoming' ? 'Voir en avant-première' : 'Découvrir la sélection'}</span>
      <ArrowRight size={14} strokeWidth={3} className="hover:translate-x-1 transition-transform" />
    </Link>
  );
};