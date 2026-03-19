'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auction } from '@/types'
import AuctionCard from '@/components/AuctionCard'
import AuthModal from '@/components/AuthModal'
import Navbar from '@/components/Navbar'
import Toast, { ToastType } from '@/components/Toast'
import {
    Gavel as GavelIcon,
    ArrowRight,
    Globe,
    User,
    CheckCircle,
    Zap,
    ShieldCheck,
    Lock
} from 'lucide-react'
import { useUser } from '@/hooks/UserContext'
import SearchBar from './_components/SearchBar'
import { EmptyState } from './_components/EmptyState'

export default function Home() {
    // --- ÉTATS & HOOKS ---
    const [auctions, setAuctions] = useState<Auction[]>([])
    const [loading, setLoading] = useState(true)
    const { user, loading: loadingUser } = useUser()

    // --- FIX HYDRATION ERROR ---
    const [isClient, setIsClient] = useState(false)

    const [authMode, setAuthMode] = useState<"login" | "alert">()
    const [filter, setFilter] = useState<'all' | 'auction' | 'fixed'>('all')
    const [toast, setToast] = useState<{ msg: string | null; type: ToastType }>({ msg: null, type: null })

    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: null, type: null }), 5000)
    }

    useEffect(() => {
        setIsClient(true)

        const fetchData = async () => {
            try {
                setLoading(true)
                const { data: { session } } = await supabase.auth.getSession();
                const response = await fetch('/api/auctions', {
                    headers: session?.user ? {
                        'Authorization': `Bearer ${session?.access_token || session?.user?.id}`,
                    } : {},
                })
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

            <AuthModal isOpen={!!authMode} onClose={() => setAuthMode(undefined)} mode={authMode} />
            <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: null, type: null })} />
            <Navbar user={user} onAuthClick={() => setAuthMode("login")} />

            {/* SECTION 1 : HERO */}
            <section className="relative h-[65vh] md:h-[80vh] flex items-center md:items-end pb-12 md:pb-24 px-6 overflow-hidden">

                {/* Background & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/imgs/img3.png"
                        className="w-full h-full object-cover brightness-[0.4] md:brightness-[0.6]"
                        alt="Exclusive Luxury Stay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                </div>

                {/* Content Hero */}
                <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6 md:space-y-8 text-center md:text-left">

                    {/* Eyebrow */}
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60">
                        Accès privé
                    </p>

                    {/* Title */}
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-4xl md:text-7xl italic uppercase tracking-tight leading-[1] bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                            Séjours d’exception <br />
                            <span style={{ color: 'var(--accent-gold)' }}>réservées à nos membres</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[12px] md:text-lg font-medium italic max-w-sm md:max-w-2xl leading-relaxed text-white/90">
                            Découvrez des séjours soigneusement sélectionnés, proposés en toute discrétion, avec des conditions privilégiées pour nos membres.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-center md:items-start">
                        <button
                            onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-6 md:mt-8 h-12 md:h-16 px-6 md:px-12 bg-[var(--accent-gold)] text-black uppercase tracking-widest rounded-xl shadow-2xl flex items-center justify-center gap-2 md:gap-4 text-[10px] md:text-sm w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
                        >
                            <span>Découvrir les expériences</span>
                            <ArrowRight size={16} className="ml-2 md:ml-4" />
                        </button>

                        {/* Micro trust */}
                        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mt-4">
                            Accès membre • Offres confidentielles • Sélections limitées
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2 : BARRE DE RÉASSURANCE (Sortie du Hero) */}
            <div className="relative z-20 -mt-10 md:-mt-16 px-6">
                <div
                    className="max-w-7xl mx-auto backdrop-blur-2xl border p-8 md:p-12 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-primary)'
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6">

                        {/* Item 1 */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[var(--accent-gold)]">
                                <ShieldCheck size={18} />
                                <span className="text-[11px] md:text-[12px] uppercase tracking-widest">Accès exclusif</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }} className="text-[11px] text-[12px] font-bold italic leading-snug">
                                Réservé à nos membres, offres confidentielles
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[var(--accent-gold)]">
                                <CheckCircle size={18} />
                                <span className="text-[11px] md:text-[12px] uppercase tracking-widest">Sélection soignée</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }} className="text-[11px] text-[13px] font-bold italic leading-snug">
                                Établissements et expériences validés pour leur qualité et leur ambiance
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[var(--accent-gold)]">
                                <Zap size={18} />
                                <span className="text-[11px] md:text-[12px] uppercase tracking-widest">Réservation directe</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }} className="text-[13px] md:text-[13px] font-bold italic leading-snug">
                                Confirmation immédiate auprès de l’établissement, sans intermédiaire
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div id="catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
                <header className="mb-8 md:mb-10"> {/* Réduit un peu pour garder la barre proche du titre */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl lg:text-6xl italic uppercase tracking-tight leading-none">
                                OFFRES <span style={{ color: 'var(--accent-gold)' }}>DISPONIBLES</span>
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <p style={{ color: 'var(--text-tertiary)' }} className="font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                                    Disponibilités négociées directement avec les hôtels
                                </p>
                                <span className="h-1 w-1 rounded-full bg-[var(--accent-gold)] animate-pulse" />
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <span style={{ color: 'var(--text-tertiary)' }} className="text-[10px] uppercase tracking-[0.3em">
                                Offres en ligne : {auctions.length} hôtels
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

                    {loading && (
                        <p style={{ color: 'var(--text-secondary)' }} className="text-center text-sm md:text-base mb-6">
                            Chargement des offres exclusives pour nos membres…
                        </p>
                    )}
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
                    ) :
                        filteredAuctions.length > 0 ?
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
                                        onAuthClick={() => setAuthMode("login")}
                                    />
                                </div>
                            ))
                            :
                            <EmptyState onBtnClick={() => setAuthMode("alert")} />
                    }
                </div>
                <section className="py-16 px-6 text-center max-w-5xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl uppercase tracking-tight">
                        Pourquoi rejoindre notre Cercle
                    </h2>

                    <p style={{ color: 'var(--text-secondary)' }} className="italic text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        Accédez à des séjours et expériences soigneusement sélectionnés.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-10">

                        {/* Avantage 1 */}
                        <div className="flex flex-col items-center gap-4 p-6 border rounded-2xl bg-[var(--bg-secondary)]">
                            <ShieldCheck size={28} className="text-[var(--accent-gold)]" />
                            <p style={{ color: 'var(--text-secondary)' }} className="font-bold text-center">
                                Accès sécurisé et réservé aux membres
                            </p>
                        </div>

                        {/* Avantage 2 */}
                        <div className="flex flex-col items-center gap-4 p-6 border rounded-2xl bg-[var(--bg-secondary)]">
                            <Zap size={28} className="text-[var(--accent-gold)]" />
                            <p style={{ color: 'var(--text-secondary)' }} className="font-bold text-center">
                                Réservation directe avec les établissements
                            </p>
                        </div>

                        {/* Avantage 3 */}
                        <div className="flex flex-col items-center gap-4 p-6 border rounded-2xl bg-[var(--bg-secondary)]">
                            <CheckCircle size={28} className="text-[var(--accent-gold)]" />
                            <p style={{ color: 'var(--text-secondary)' }} className="font-bold text-center">
                                Sélection rigoureuse d’hôtels et d’expériences
                            </p>
                        </div>

                        {/* Avantage 4 */}
                        <div className="flex flex-col items-center gap-4 p-6 border rounded-2xl bg-[var(--bg-secondary)]">
                            <Lock size={28} className="text-[var(--accent-gold)]" />
                            <p style={{ color: 'var(--text-secondary)' }} className="font-bold text-center">
                                Offres confidentielles, visibles uniquement aux membres
                            </p>
                        </div>

                        {/* Avantage 5 */}
                        <div className="flex flex-col items-center gap-4 p-6 border rounded-2xl bg-[var(--bg-secondary)]">
                            <GavelIcon size={28} className="text-[var(--accent-gold)]" />
                            <p style={{ color: 'var(--text-secondary)' }} className="font-bold text-center">
                                Tarifs privilégiés, négociés directement avec les établissements
                            </p>
                        </div>

                    </div>
                </section>
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
                    <span className="text-[7px] uppercase tracking-[0.15em]">Cercle</span>
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
                    onClick={() => user ? (window.location.href = '/profile') : setAuthMode("login")}
                    style={{ color: user ? 'var(--accent-gold)' : 'var(--text-tertiary)' }}
                >
                    <User size={20} />
                    <span className="text-[7px] uppercase tracking-[0.15em]">
                        {user ? 'Profil' : 'Login'}
                    </span>
                </button>
            </nav>
        </main>
    )
}


