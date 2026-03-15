'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auction } from '@/types'
import AuctionCard from '@/components/AuctionCard'
import AuthModal from '@/components/AuthModal'
import Navbar from '@/components/Navbar'
import Toast, { ToastType } from '@/components/Toast'
import StructuredData, { organizationSchema } from '@/components/StructuredData'
import {
    Gavel as GavelIcon,
    ArrowRight,
    Globe,
    User} from 'lucide-react'
import { useBidApi } from '@/hooks/useBid'
import { useUser } from '@/hooks/UserContext'
import SearchBar from './_components/SearchBar'

export default function Home() {
    // --- ÉTATS & HOOKS ---
    const [auctions, setAuctions] = useState<Auction[]>([])
    const [loading, setLoading] = useState(true)
    const { user, loading: loadingUser } = useUser()

    // --- FIX HYDRATION ERROR ---
    const [isClient, setIsClient] = useState(false)
    const [membersOnline, setMembersOnline] = useState(0)

    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [filter, setFilter] = useState<'all' | 'auction' | 'fixed'>('all')
    const [toast, setToast] = useState<{ msg: string | null; type: ToastType }>({ msg: null, type: null })

    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: null, type: null }), 5000)
    }

    useEffect(() => {
        setIsClient(true)
        setMembersOnline(Math.floor(Math.random() * 50) + 20)

        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/auctions')
                const result = await response.json()
                if (result.success && result.data) {
                    setAuctions(result.data)
                }
            } catch (error) {
                showToast("Erreur de connexion au serveur", "error")
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        const channel = supabase
            .channel('live-updates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'auctions' },
                (payload) => {
                    const updated = payload.new as Auction
                    setAuctions(current => current.map(a => a.id === updated.id ? updated : a))
                }
            ).subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    const filteredAuctions = auctions.filter(a => filter === 'all' || a.type === filter)

    // Éviter le rendu flash des éléments aléatoires avant l'hydratation
    if (!isClient) return <div className="min-h-screen bg-black" />

    return (
        <main className="min-h-screen text-base selection:opacity-30 pb-24"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

            <StructuredData schema={organizationSchema} />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: null, type: null })} />
            <Navbar user={user} onAuthClick={() => setIsAuthOpen(true)} />

            {/* --- HERO SECTION OPTIMISÉE MOBILE --- */}
            <section className="relative h-[55vh] md:h-[70vh] flex items-end pb-8 md:pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
                        className="w-full h-full object-cover brightness-[0.4] md:brightness-[0.6]"
                        alt="Luxury Hotel"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto space-y-4 md:space-y-6">
                    {/* Badge d'audience live */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-gold)] bg-black/40 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">
                            Cercle Privé : {membersOnline} membres actifs
                        </span>
                    </div>

                    {/* Titre & Ton nouveau texte thématique */}
                    <div className="space-y-3 md:space-y-4">
                        <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
                            L'Exception <br /> <span style={{ color: 'var(--accent-gold)' }}>Hors-Radar.</span>
                        </h1>

                        <p className="text-[10px] md:text-lg font-bold italic text-gray-400 max-w-sm md:max-w-xl leading-relaxed">
                            Accédez aux disponibilités confidentielles des plus beaux établissements, <span className="text-white">hors de portée du grand public.</span>
                        </p>
                    </div>

                    {/* Bouton d'action direct */}
                    <button
                        onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
                        className="h-12 md:h-16 px-8 md:px-12 bg-[var(--accent-gold)] text-white text-[10px] md:text-sm font-black uppercase tracking-widest rounded-xl shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all w-fit"
                    >
                        Explorer les ventes
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>


            <div id="catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">

                <header className="mb-8 md:mb-10"> {/* Réduit un peu pour garder la barre proche du titre */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl lg:text-6xl font-black italic uppercase tracking-tight leading-none">
                                LE <span style={{ color: 'var(--accent-gold)' }}>CERCLE</span>
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <p className="font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50">
                                    Accès exclusif aux nuitées d'exception
                                </p>
                                <span className="h-1 w-1 rounded-full bg-[var(--accent-gold)] animate-pulse" />
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                                Disponibilités : {auctions.length} hôtels
                            </span>
                        </div>
                    </div>
                </header>

                {/* CONTENEUR DE LA BARRE : On enlève les my-12 et on gère proprement l'assise */}
                <div className="mb-16 md:mb-24">
                    <SearchBar />
                </div>

                {/* GRILLE VOYAGEUR */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {loading ? (
                        // SKELETON LUXE AVEC SHIMMER
                        Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-[2.5rem] aspect-[4/5] border animate-shimmer"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-primary)'
                                }}
                            />
                        ))
                    ) : (
                        filteredAuctions.map((auction, index) => (
                            <div
                                key={auction.id}
                                className="animate-card-entry"
                                style={{
                                    // Décalage de 100ms entre chaque carte pour l'effet cascade
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <AuctionCard
                                    auction={auction}
                                    isConnected={!!user}
                                    onAuthClick={() => setIsAuthOpen(true)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- BARRE MOBILE --- */}
            <nav
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md h-16 backdrop-blur-2xl rounded-[2rem] border flex items-center justify-around px-4 shadow-2xl md:hidden transition-colors duration-300"
                style={{
                    // backgroundColor: 'rgba(var(--bg-secondary), 0.8)', // Semi-transparent selon le thème
                    borderColor: 'var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)', // Fallback si le rgba ne passe pas en style inline
                    boxShadow: 'var(--shadow-lg)'
                }}
            >
                {/* BOUTON CERCLE / EXPLORE */}
                <button
                    className="flex flex-col items-center gap-1 transition-all active:scale-90"
                    onClick={() => {
                        setFilter('all');
                        document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ color: filter === 'all' ? 'var(--accent-gold)' : 'var(--text-tertiary)' }}
                >
                    <Globe size={20} />
                    <span className="text-[7px] font-black uppercase tracking-[0.15em]">Cercle</span>
                </button>

                {/* BOUTON CENTRAL (ENCHÈRES) */}
                <button
                    className="relative w-14 h-14 -mt-12 rounded-full flex items-center justify-center border-4 shadow-xl transition-all hover:scale-105 active:scale-90"
                    onClick={() => {
                        setFilter('auction');
                        document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                        backgroundColor: 'var(--accent-gold)',
                        borderColor: 'var(--bg-primary)',
                        color: 'var(--bg-primary)' // Le texte/icône prend la couleur du fond pour le contraste
                    }}
                >
                    <GavelIcon size={22} />
                    {/* Petit indicateur de live si des enchères existent */}
                    {auctions.some(a => a.type === 'auction') && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                </button>

                {/* BOUTON PROFIL / LOGIN */}
                <button
                    className="flex flex-col items-center gap-1 transition-all active:scale-90"
                    onClick={() => user ? (window.location.href = '/profile') : setIsAuthOpen(true)}
                    style={{ color: user ? 'var(--accent-gold)' : 'var(--text-tertiary)' }}
                >
                    <User size={20} />
                    <span className="text-[7px] font-black uppercase tracking-[0.15em]">
                        {user ? 'Profil' : 'Login'}
                    </span>
                </button>
            </nav>
        </main>
    )
}