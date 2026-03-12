'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { RefreshCw, Play, Square, CreditCard, Clock } from 'lucide-react';
import { AdminAuction } from '@/types';
import { useRouter } from 'next/navigation';

// --- CONFIGURATION DES LABELS ---
const STATUS_LABELS: Record<string, { label: string, styles: { backgroundColor: string, color: string, borderColor: string } }> = {
    upcoming: { 
        label: 'À venir', 
        styles: { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--text-secondary)', borderColor: 'var(--border-primary)' }
    },
    active: { 
        label: 'En cours', 
        styles: { backgroundColor: 'rgba(251, 191, 36, 0.1)', color: 'var(--accent-gold)', borderColor: 'rgba(251, 191, 36, 0.3)' }
    },
    finished_unpaid: { 
        label: 'Attente Paiement', 
        styles: { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }
    },
    finished_paid: { 
        label: 'Payé', 
        styles: { backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', borderColor: 'rgba(99, 102, 241, 0.3)' }
    },
    finished_reserve_not_met: { 
        label: 'Réserve non atteinte', 
        styles: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }
    },
    completed: { 
        label: 'Terminé', 
        styles: { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }
    }
};

export default function AdminDashboard() {
    const [auctions, setAuctions] = useState<AdminAuction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // --- MISE À JOUR VIA API BACKEND (SERVICE ROLE) ---
    const updateAuctionStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch('/api/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, newStatus }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            console.log(`✅ ${id} passé en ${newStatus}`);
        } catch (err) {
            console.error("Erreur update:", err);
            alert("Erreur lors de la mise à jour");
        }
    };

    const fetchAuctions = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('admin_auction_monitor').select('*');
        if (error) console.error(error);
        if (data) setAuctions(data as AdminAuction[]);
        setLoading(false);
    }, []);

    // --- REALTIME & INITIAL FETCH ---
    useEffect(() => {
        fetchAuctions();
        const channel = supabase.channel('admin-db')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'auctions' }, () => fetchAuctions())
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [fetchAuctions]);

    // --- AUTO-MONITORING (Toutes les 10s) ---
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            auctions.forEach(auc => {
                const startAt = new Date(auc.start_at).getTime();
                const endAt = new Date(auc.end_at).getTime();

                if (auc.status === 'upcoming' && now >= startAt && now < endAt) {
                    updateAuctionStatus(auc.id, 'active');
                } else if ((auc.status === 'active' || auc.status === 'upcoming') && now >= endAt) {
                    const finalStatus = Number(auc.current_price) >= Number(auc.reserve_price)
                        ? 'finished_unpaid' : 'finished_reserve_not_met';
                    updateAuctionStatus(auc.id, finalStatus);
                }
            });
        }, 10_000);
        return () => clearInterval(timer);
    }, [auctions]);

    return (
        <div className="min-h-screen p-4 md:p-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <div className="max-w-6xl mx-auto">

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Live Monitor</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight italic uppercase" style={{ color: 'var(--text-primary)' }}>
                            Control<span style={{ color: 'var(--text-secondary)' }}>Center</span>
                        </h1>
                    </div>
                    <button
                        onClick={fetchAuctions}
                        className="group flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                    >
                        <RefreshCw size={16} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        {loading ? 'Synchro...' : 'Rafraîchir'}
                    </button>
                </div>

                {/* TABLE CARD */}
                <div className="border rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: `1px solid var(--border-primary)` }}>
                                    <th className="p-8 text-left">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Détails de l'enchère</span>
                                            <span className="text-[9px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>Période • Engagement • Valorisation</span>
                                        </div>
                                    </th>
                                    <th className="p-8 text-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Statut</span>
                                    </th>
                                    <th className="p-8 text-right">
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ borderTop: `1px solid var(--border-primary)` }}>
                                {auctions.map(auc => (
                                    <tr key={auc.id} className="group hover:opacity-80 transition-opacity" style={{ borderBottom: `1px solid var(--border-primary)` }}>
                                        <td className="p-8">
                                            <div className="flex flex-col gap-3">
                                                <span className="font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>{auc.title}</span>

                                                {/* Dates DD/MM/YYYY HH:MM */}
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider self-start px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                                                    <Clock size={10} />
                                                    <span>{new Date(auc.start_at).toLocaleString('fr-FR')}</span>
                                                    <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>→</span>
                                                    <span>{new Date(auc.end_at).toLocaleString('fr-FR')}</span>
                                                </div>

                                                {/* Stats: Bids & Prices */}
                                                <div className="flex items-center gap-6 mt-1">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Offres</span>
                                                        <span className="text-sm font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{auc.total_bids || 0} bids</span>
                                                    </div>
                                                    <div className="w-px h-6" style={{ backgroundColor: 'var(--border-primary)' }} />
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Prix Actuel</span>
                                                        <span className="text-sm font-mono font-bold" style={{ color: 'var(--accent-gold)' }}>{auc.current_price}€</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Réserve</span>
                                                        <span className="text-sm font-mono font-bold" style={{ color: Number(auc.current_price) >= Number(auc.reserve_price) ? 'var(--text-secondary)' : '#f59e0b' }}>
                                                            {auc.reserve_price}€
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-center text-center">
                                            <span className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border" style={STATUS_LABELS[auc.status]?.styles}>
                                                {STATUS_LABELS[auc.status]?.label}
                                            </span>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex justify-end items-center">
                                                <AdminButtons status={auc.status} onAction={(s) => updateAuctionStatus(auc.id, s)} />
                                                <button
                                                    onClick={() => router.push(`/admin/auction?id=${auc.id}`)}
                                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-sm text-white border"
                                                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                                                >
                                                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} />
                                                    Modifier
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SOUS-COMPOSANT BOUTONS ---
function AdminButtons({ status, onAction }: { status: string, onAction: (s: string) => void }) {
    const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transition: 'all 200ms',
        cursor: 'pointer',
        border: 'none',
        color: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    };

    if (status === 'upcoming') return (
        <button onClick={() => onAction('active')} style={{ ...baseStyle, backgroundColor: 'var(--accent-gold)' }}>
            <Play size={14} fill="currentColor" /> Lancer la vente
        </button>
    );
    if (status === 'active') return (
        <button onClick={() => onAction('finished_unpaid')} style={{ ...baseStyle, backgroundColor: '#f59e0b' }}>
            <Square size={14} fill="currentColor" /> Clôturer
        </button>
    );
    if (status === 'finished_unpaid') return (
        <button onClick={() => onAction('finished_paid')} style={{ ...baseStyle, backgroundColor: '#6366f1' }}>
            <CreditCard size={14} /> Valider Paiement
        </button>
    );
    return <span className="text-[10px] font-bold uppercase italic pr-4" style={{ color: 'var(--text-secondary)' }}>Archivé</span>;
}