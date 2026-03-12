'use client'

import { History, User, TrendingUp } from 'lucide-react'

interface Bid {
    id: string
    amount: number
    created_at: string
    user_nickname?: string // ex: "Jean-Pierre" -> "J***R"
}

export default function BidHistory({ bids }: { bids: Bid[] }) {
    const recentBids = bids?.slice(0, 5) || [] // On affiche les 5 dernières

    return (
        <div className="space-y-4">
            {/* Header avec compteur */}
            <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <History size={14} style={{ color: 'var(--accent-gold)' }} /> 
                    Historique des offres
                </h3>
                <span className="text-[9px] font-semibold py-0.5 px-2 rounded-full uppercase tracking-widest" style={{ backgroundColor: 'var(--accent-gold)', color: 'white', opacity: 0.9 }}>
                    Live
                </span>
            </div>

            {/* Liste des enchères */}
            <div className="space-y-2 relative">
                {/* Ligne verticale de connexion */}
                <div 
                    className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-opacity-30 to-transparent" 
                    style={{ background: `linear-gradient(to bottom, var(--accent-gold) 30%, transparent)`, opacity: 0.3 }}
                />

                {recentBids.length > 0 ? (
                    recentBids.map((bid, i) => (
                        <div 
                            key={bid.id} 
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 relative z-10 ${
                                i === 0 ? 'scale-[1.02] shadow-md' : 'opacity-70 hover:opacity-100'
                            }`}
                            style={{
                                backgroundColor: i === 0 ? 'rgba(251, 191, 36, 0.05)' : 'transparent',
                                borderColor: i === 0 ? 'rgba(251, 191, 36, 0.2)' : 'var(--border-primary)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center border"
                                    style={{
                                        backgroundColor: i === 0 ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                                        borderColor: i === 0 ? 'var(--accent-gold)' : 'var(--border-primary)',
                                        color: i === 0 ? 'black' : 'var(--text-secondary)',
                                    }}
                                >
                                    <User size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                                        {bid.user_nickname ? anonymizeName(bid.user_nickname) : "Enchérisseur"}
                                    </span>
                                    <span className="text-[8px] font-medium uppercase italic" style={{ color: 'var(--text-secondary)' }}>
                                        {formatRelativeTime(bid.created_at)}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right flex flex-col items-end">
                                <span 
                                    className="text-sm font-bold italic tabular-nums"
                                    style={{ color: i === 0 ? 'var(--accent-gold)' : 'var(--text-secondary)' }}
                                >
                                    {bid.amount}€
                                </span>
                                {i === 0 && (
                                    <div className="flex items-center gap-1 text-[7px] font-semibold uppercase tracking-tighter animate-pulse" style={{ color: 'var(--accent-gold)' }}>
                                        <TrendingUp size={8} /> Leader
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center border-2 border-dashed rounded-lg" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-tertiary)' }}>
                        <p className="text-[9px] font-semibold uppercase tracking-widest italic" style={{ color: 'var(--text-secondary)' }}>
                            Aucune offre pour le moment.<br/>Soyez le premier à miser !
                        </p>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <p className="text-[8px] font-medium uppercase tracking-widest text-center italic" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                Mises sécurisées et certifiées par Loisirs-Privé
            </p>
        </div>
    )
}

// --- UTILS ---
function anonymizeName(name: string) {
    if (!name) return "A***R";
    const first = name[0];
    const last = name[name.length - 1];
    return `${first}***${last}`.toUpperCase();
}

function formatRelativeTime(dateStr: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "À l'instant";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `Il y a ${hours}h`;
}