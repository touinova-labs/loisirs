'use client'
import { Gavel, ShoppingBag, ShieldCheck, Zap } from 'lucide-react'

interface ProductActionsProps {
    auction: any;
    isBidding: boolean;
    onBid: () => void;
    onBuy: () => void;
    error: string | null;
}

export function ProductActions({ auction, isBidding, onBid, onBuy, error }: ProductActionsProps) {
    const isFixed = auction.type === 'fixed';

    return (
        <div className="space-y-4">
            {error && (
                <div className="p-3 border text-xs rounded-lg flex items-center gap-2 italic" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#EF4444' }}>
                    <Zap size={14} /> {error}
                </div>
            )}

            {isFixed ? (
                /* --- MODE VENTE PRIVÉE --- */
                <div className="space-y-4">
                    <div className="border p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                        <span className="text-[10px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--text-secondary)' }}>Prix de vente</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{auction.buy_now_price} €</span>
                            <span className="text-sm italic font-medium" style={{ color: 'var(--text-secondary)' }}>TVA incluse</span>
                        </div>
                    </div>
                    <button
                        onClick={onBuy}
                        className="w-full h-16 rounded-lg font-bold text-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tight text-white"
                        style={{ backgroundColor: 'var(--accent-gold)' }}
                    >
                        <ShoppingBag size={22} />
                        Acheter maintenant
                    </button>
                </div>
            ) : (
                /* --- MODE ENCHÈRE LIVE --- */
                <div className="space-y-4">
                    <div className="border p-4 rounded-lg flex justify-between items-end" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest block mb-1" style={{ color: 'var(--accent-gold)', opacity: 0.7 }}>Offre actuelle</span>
                            <span className="text-4xl font-bold tabular-nums" style={{ color: 'var(--accent-gold)' }}>{auction.current_price} €</span>
                        </div>
                        <div className="text-right pb-1">
                            <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>Prochaine mise</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{(auction.current_price + 1)} €</span>
                        </div>
                    </div>
                    <button
                        onClick={onBid}
                        disabled={isBidding}
                        className="w-full h-16 rounded-lg font-bold text-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tight text-white"
                        style={{ 
                            backgroundColor: isBidding ? 'var(--bg-tertiary)' : 'var(--accent-gold)',
                            color: isBidding ? 'var(--text-secondary)' : 'white',
                        }}
                    >
                        {isBidding ? (
                            <div className="w-6 h-6 border-3 rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.3)', borderTopColor: 'currentColor' }} />
                        ) : (
                            <>
                                <Gavel size={22} />
                                Placer une offre
                            </>
                        )}
                    </button>
                </div>
            )}

            <p className="text-[10px] text-center font-medium uppercase tracking-widest pt-2 flex items-center justify-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <ShieldCheck size={12} /> Paiement sécurisé par Stripe
            </p>
        </div>
    )
}