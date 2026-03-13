'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auction } from '@/types'
import AuctionCard from '@/components/AuctionCard'
import AuthModal from '@/components/AuthModal'
import Navbar from '@/components/Navbar'
import Toast, { ToastType } from '@/components/Toast'
import StructuredData, { organizationSchema } from '@/components/StructuredData'
import { LayoutGrid, Zap, ShoppingBag, Gavel as GavelIcon } from 'lucide-react'
import { useBidApi } from '@/hooks/useBid'
import { useUser } from '@/hooks/UserContext'

export default function Home() {
    // --- ÉTATS ---
    const [auctions, setAuctions] = useState<Auction[]>([])
    const [loading, setLoading] = useState(true)

    const { user, loading: loadingUser } = useUser()

    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [filter, setFilter] = useState<'all' | 'auction' | 'fixed'>('all')
    const [toast, setToast] = useState<{ msg: string | null; type: ToastType }>({ msg: null, type: null })

    // --- LOGIQUE MÉTIER ---
    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: null, type: null }), 5000)
    }

    // Hook pour les mises
    const { bid, loading: bidLoading } = useBidApi(showToast)

    // --- INITIALISATION & REALTIME ---
    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/auctions')
                const result = await response.json()

                if (result.success && result.data) {
                    setAuctions(result.data)
                } else {
                    showToast("Erreur lors du chargement des données", "error")
                }
            } catch (error) {
                showToast("Erreur lors du chargement des données", "error")
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        // Subscription temps réel pour les mises à jour des enchères
        const channel = supabase
            .channel('live-updates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'auctions' },
                (payload) => {
                    const updated = payload.new as Auction
                    setAuctions(current => current.map(a => a.id === updated.id ? updated : a))
                }
            ).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const handleBid = async (auctionId: string, amount: number) => {
        if (!user) {
            setIsAuthOpen(true)
            return
        }

        await bid(user.id, auctionId, amount)
    }

    // Filtrage dynamique des données
    const filteredAuctions = auctions.filter(a => {
        if (filter === 'all') return true
        return a.type === filter
    })

    return (
        <main className="min-h-screen text-base selection:opacity-30"
            style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
            }}
        >
            {/* STRUCTURED DATA FOR SEO */}
            <StructuredData schema={organizationSchema} />

            {/* COMPOSANTS GLOBAUX */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <Toast
                message={toast.msg}
                type={toast.type}
                onClose={() => setToast({ msg: null, type: null })}
            />
            <Navbar user={user} onAuthClick={() => setIsAuthOpen(true)} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">

                {/* HEADER HYBRIDE */}
                <header className="mb-12 pb-10 space-y-8" style={{ borderBottom: `1px solid var(--border-primary)` }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-6xl font-bold italic uppercase tracking-tight leading-none">
                                LE <span style={{ color: 'var(--accent-gold)' }}>CATALOGUE</span>
                            </h1>
                            <p className="font-medium text-sm sm:text-base italic max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                                Découvrez une sélection exclusive d'objets rares, disponibles en adjudication directe ou vente privée.
                            </p>
                        </div>

                        {/* STATS RAPIDES */}
                        <div className="hidden sm:flex items-center gap-4 border p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                            <div className="px-4 py-2 rounded-lg shadow-sm text-center min-w-[100px]" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                <span className="block text-[9px] uppercase font-semibold tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Lots Actifs</span>
                                <span className="text-xl font-bold italic" style={{ color: 'var(--accent-gold)' }}>{auctions.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* SÉLECTEUR DE MODE (TABS) */}
                    <div className="flex flex-wrap items-center gap-2 p-1.5 border rounded-lg w-fit" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                        {[
                            { id: 'all', label: 'Tout voir', icon: LayoutGrid },
                            { id: 'auction', label: 'Enchères', icon: GavelIcon },
                            { id: 'fixed', label: 'Ventes Privées', icon: ShoppingBag }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${filter === tab.id
                                    ? 'text-white shadow-md'
                                    : 'hover:opacity-80'
                                    }`}
                                style={{
                                    backgroundColor: filter === tab.id ? 'var(--accent-gold)' : 'transparent',
                                    color: filter === tab.id ? 'white' : 'var(--text-secondary)',
                                }}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </header>

                {/* GRILLE D'AFFICHAGE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rounded-lg aspect-[16/14] animate-pulse border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }} />
                        ))
                    ) : (
                        filteredAuctions.map(auction => (
                            <AuctionCard
                                key={auction.id}
                                auction={auction}
                                isConnected={!!user}
                                onAuthClick={() => setIsAuthOpen(true)}
                                onBid={(amt) => handleBid(auction.id, amt)}
                            />
                        ))
                    )}
                </div>

                {/* EMPTY STATE */}
                {!loading && filteredAuctions.length === 0 && (
                    <div className="py-40 text-center border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--border-primary)', backgroundColor: `var(--bg-secondary)` }}>
                        <Zap className="mx-auto mb-4" size={48} style={{ color: 'var(--border-primary)' }} />
                        <h3 className="text-xl font-bold italic uppercase tracking-tight" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>Aucun lot correspondant</h3>
                        <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>Revenez plus tard pour de nouvelles opportunités.</p>
                        <button
                            onClick={() => setFilter('all')}
                            className="mt-6 text-xs font-semibold uppercase tracking-widest border px-6 py-3 rounded-full hover:opacity-80 transition-all"
                            style={{ color: 'var(--accent-gold)', borderColor: 'var(--accent-gold)' }}
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}