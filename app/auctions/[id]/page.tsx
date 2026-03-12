'use client'

import { useParams } from 'next/navigation'
import {
    ChevronLeft, ShieldCheck, Timer,
    Gavel, AlertCircle, Share2, ShoppingBag,
    History, Info, MapPin, Calendar, CheckCircle2,
    Users, Clock, Utensils, Star,
    Truck
} from 'lucide-react'
import Link from 'next/link'
import { useAuctionData } from '@/hooks/useAuctionData'
import { useBid } from '@/hooks/useBid'
import AuthModal from '@/components/AuthModal'
import { RarityBadge } from '@/components/RarityBadge'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { Auction, AuctionAttributes } from '@/types'
import { a } from 'framer-motion/client'
import AuctionGallery from '@/components/AuctionGallery'
import BidHistory from '@/components/BidHistory'
import Map from '@/components/Map'
import Toast, { ToastType } from '@/components/Toast'
import StructuredData, { auctionSchema, breadcrumbSchema } from '@/components/StructuredData'
import { AuctionResultModal } from '@/components/AuctionResultModal'

// --- HELPERS ---
const formatTimeLeft = (expiryDate: string) => {
    const total = Date.parse(expiryDate) - Date.now();
    if (total <= 0) return "Terminé";
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((total / 1000 / 60) % 60);
    return `${days}j ${hours}h ${mins}m`;
};

export default function AuctionDetails() {
    const { id } = useParams()
    const { auction, bids, user, loading, isAuthOpen, setIsAuthOpen, winnerData } = useAuctionData(id as string)
    const [toast, setToast] = useState<{ msg: string | null; type: ToastType }>({ msg: null, type: null })

    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: null, type: null }), 5000)
    }

    const { placeBid, loading: isBidding } = useBid(auction, user, () => setIsAuthOpen(true), showToast)
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        if (auction?.end_at) {
            setTimeLeft(formatTimeLeft(auction.end_at));
            const timer = setInterval(() => setTimeLeft(formatTimeLeft(auction.end_at)), 60000);
            return () => clearInterval(timer);
        }
    }, [auction]);

    const isFixedPrice = auction?.type === 'fixed'
    const attr = (auction?.attributes as AuctionAttributes) || {}

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border-primary)', borderTopColor: 'var(--accent-gold)' }} />
        </div>
    )

    if (!auction) return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center gap-4" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <AlertCircle size={40} style={{ color: 'var(--text-secondary)' }} />
            <p className="font-bold italic uppercase tracking-widest text-center" style={{ color: 'var(--text-secondary)' }}>Expérience introuvable</p>
            <Link href="/" className="text-sm font-bold uppercase underline" style={{ color: 'var(--accent-gold)' }}>Retour au catalogue</Link>
        </div>
    )
    const isFinished = new Date(auction.end_at) < new Date() || auction.status !== "active"; /// 

    // Generate schemas for structured data
    const auctionStructuredData = auctionSchema({
        id: auction.id,
        title: auction.title,
        description: auction.description || '',
        image: auction.images?.[0] || '/og-image.png',
        startPrice: auction.start_price || 0,
        currentBid: bids?.[0]?.amount || auction.start_price,
        status: auction.status as 'upcoming' | 'active' | 'completed',
        startDate: auction.start_at,
        endDate: auction.end_at,
        location: auction.location_name,
    });

    const breadcrumbs = breadcrumbSchema([
        { name: 'Accueil', url: 'https://loisirsprive.fr' },
        { name: 'Catalogue', url: 'https://loisirsprive.fr/auctions' },
        { name: auction.title, url: `https://loisirsprive.fr/auctions/${auction.id}` },
    ]);

    console.log(isFinished)
    return (
        <main className="pb-32" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* STRUCTURED DATA FOR SEO */}
            <StructuredData schema={auctionStructuredData} />
            <StructuredData schema={breadcrumbs} />
            
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <Toast
                message={toast.msg}
                type={toast.type}
                onClose={() => setToast({ msg: null, type: null })}
            />
            <Navbar user={user} onAuthClick={() => setIsAuthOpen(true)} />

            {/* HEADER NAVIGATION */}
            <div className="border-b" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                        <ChevronLeft size={18} />
                        <span className="text-[10px] font-semibold uppercase tracking-widest italic">Tous les loisirs • {attr.type || 'Exclusivité'}</span>
                    </Link>
                    <button className="p-2 rounded-lg transition-colors hover:opacity-80" style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'var(--border-primary)' }}><Share2 size={16} /></button>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* --- COLONNE GAUCHE --- */}
                    <div className="lg:col-span-8 space-y-12">
                        <AuctionGallery
                            images={auction.images}
                            title={auction.title}
                            isLimited={auction.is_limited}
                        />

                        {/* TITRE MOBILE */}
                        <div className="lg:hidden space-y-4">
                            <h1 className="text-3xl font-bold italic uppercase tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>{auction.title}</h1>
                            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                                <span className="flex items-center gap-1"><MapPin size={12} style={{ color: 'var(--accent-gold)' }} /> {auction.location_name}</span>

                                {
                                    attr.rating && attr.reviews_count &&
                                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {attr.rating} ({attr.reviews_count} avis)</span>
                                }
                            </div>
                        </div>

                        {/* SECTION DYNAMIQUE SELON LE TYPE */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold italic uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
                                    <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> L'offre en détail
                                </h2>
                                <span className="text-[10px] font-semibold py-1 px-3 border rounded-full uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                                    ID: #{auction.id.slice(0, 6)}
                                </span>
                            </div>
                            <ExperienceInclusions attr={attr} />
                        </section>

                        {/* --- SECTION GARANTIES (TRUST BAR) --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                            <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                                    <ShieldCheck size={20} style={{ color: 'var(--accent-gold)' }} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>Paiement Sécurisé</span>
                                <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Transactions SSL & Séquestre</p>
                            </div>

                            <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80 border-x" style={{ borderColor: 'var(--border-primary)' }}>
                                <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                                    <CheckCircle2 size={20} style={{ color: 'var(--accent-gold)' }} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>Annulation Zen</span>
                                <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Flexible jusqu'à 48h</p>
                            </div>

                            <div className="p-6 flex flex-col items-center text-center space-y-2 group transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                                    <Star size={20} style={{ color: 'var(--accent-gold)' }} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>Service Premium</span>
                                <p className="text-[9px] font-medium uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Conciergerie dédiée 7j/7</p>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold italic uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
                                <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> L'expérience
                            </h2>
                            <p className="leading-relaxed italic text-base whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                                {auction.description}
                            </p>
                        </section>

                        {/* LOCALISATION DYNAMIQUE (MAPBOX STATIC) */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold italic uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
                                <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> Localisation
                            </h2>

                            <div className="group relative w-full h-64 rounded-lg overflow-hidden border shadow-lg" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                                {/* LA CARTE (Version Secteur) */}
                                {auction.location_name && attr.lng && attr.lat ? (
                                    <Map
                                        lat={attr.lat}
                                        lng={attr.lng}
                                        showArea={true}
                                    />
                                ) : null}

                                {/* OVERLAY DE DISCRÉTION ALLÉGÉ */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none">
                                    <div className="p-5 backdrop-blur-md rounded-lg border text-center shadow-lg" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'var(--border-primary)' }}>
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
                                            <p className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>
                                                {auction.location_name}
                                            </p>
                                        </div>

                                        <p className="text-[9px] font-bold uppercase tracking-widest leading-tight italic" style={{ color: 'var(--text-secondary)' }}>
                                            Secteur approximatif <br />
                                            <span style={{ color: 'var(--accent-gold)' }}>Adresse exacte disponible après la vente</span>
                                        </p>
                                    </div>
                                </div>

                                {/* VIGNETTAGE */}
                                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />
                            </div>
                        </section>

                        {/* CONDITIONS DYNAMIQUES */}
                        <section className="p-8 border rounded-lg space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
                            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--accent-gold)' }}>
                                <CheckCircle2 size={16} /> Conditions & Validité
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-xs font-bold italic" style={{ color: 'var(--text-secondary)' }}>
                                    <Calendar size={16} className="shrink-0" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                                    <span>Valable jusqu'au {new Date(new Date().setMonth(new Date().getMonth() + (attr.validity_months))).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.</span>
                                </li>
                                <li className="flex gap-4 text-xs font-bold italic" style={{ color: 'var(--text-secondary)' }}>
                                    <Info size={16} className="shrink-0" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                                    <span>{attr.booking_info}</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* --- COLONNE DROITE (STICKY) --- */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-8 border rounded-lg shadow-lg space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
                                <div className="hidden lg:block space-y-2">
                                    <h1 className="text-2xl font-bold italic uppercase leading-none tracking-tighter" style={{ color: 'var(--text-primary)' }}>{auction.title}</h1>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
                                        <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Offre Certifiée</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t flex justify-between items-end" style={{ borderColor: 'var(--border-primary)' }}>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--text-secondary)' }}>
                                            {isFixedPrice ? 'Prix Fixe' : 'Mise Actuelle'}
                                        </span>
                                        <span className="text-5xl font-bold tabular-nums" style={{ color: 'var(--accent-gold)' }}>
                                            {isFixedPrice ? auction.buy_now_price : auction.current_price}€
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-medium block uppercase" style={{ color: 'var(--text-secondary)' }}>Valeur réelle</span>
                                        <span className="text-sm font-medium line-through" style={{ color: 'var(--text-secondary)' }}>
                                            {attr.value_real || (auction.current_price * 1.6).toFixed(0)}€
                                        </span>
                                    </div>
                                </div>

                                {auction.status === 'finished_unpaid' && (
                                    <div className="mt-6">
                                        {winnerData?.result_status === 'reserve_not_met' ? (
                                            <div className="p-6 border rounded-lg" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.3)', color: 'var(--accent-gold)' }}>
                                                <p className="font-bold">⌛ Enchère terminée sans vainqueur</p>
                                                <p className="text-sm">Le prix de réserve n'a pas été atteint pour cette offre.</p>
                                            </div>
                                        ) : winnerData?.winner_id === user?.id ? (
                                            <div className="p-6 rounded-lg text-white shadow-lg animate-in fade-in zoom-in duration-500" style={{ backgroundColor: 'var(--accent-gold)' }}>
                                                <h2 className="text-2xl font-bold italic uppercase">Félicitations !</h2>
                                                <p className="mb-4">Vous avez remporté l'enchère pour {winnerData.winning_bid}€.</p>
                                                <a
                                                    href="https://buy.stripe.com/TON_LIEN"
                                                    className="inline-block px-6 py-3 rounded-lg font-bold uppercase text-sm"
                                                    style={{ backgroundColor: 'white', color: 'black' }}
                                                >
                                                    Finaliser ma réservation (30€)
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="p-4 rounded-lg text-center italic" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                                                Cette vente est terminée.
                                            </div>
                                        )}
                                    </div>
                                )}
                                {
                                    !isFinished &&
                                    <button
                                        onClick={isFixedPrice ? () => { } : placeBid}
                                        disabled={isBidding}
                                        className="w-full h-16 rounded-lg font-bold text-lg uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50 text-white"
                                        style={{ backgroundColor: 'var(--accent-gold)' }}
                                    >
                                        {isFixedPrice ? <ShoppingBag size={22} /> : <Gavel size={22} />}
                                        {isBidding ? 'Envoi...' : (isFixedPrice ? 'Acheter' : `Miser ${auction.current_price + 1}€`)}
                                    </button>
                                }

                                <div className="flex items-center justify-center gap-4 pt-4" style={{ color: 'var(--text-secondary)' }}>
                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase italic"><Timer size={14} style={{ color: 'var(--accent-gold)' }} /> {timeLeft}</div>
                                    <div className="w-[1px] h-3" style={{ backgroundColor: 'var(--border-primary)' }} />
                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase italic"><History size={14} /> {bids?.length || 0} offres</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- HISTORIQUE DES OFFRES (FULL WIDTH) --- */}
                    <div className="lg:col-span-12 mt-12">
                        <BidHistory bids={bids || []} />
                    </div>
                </div>
            </div>

            {/* ACTION MOBILE STICKY */}
            <div className="fixed bottom-0 left-0 right-0 p-6 border-t z-50 lg:hidden backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', opacity: 0.98 }}>
                <div className="max-w-md mx-auto flex items-center justify-between gap-6">

                    {/* PRIX ET VALEUR : Alignement vertical propre */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold tabular-nums tracking-tighter" style={{ color: 'var(--accent-gold)' }}>
                                {auction.current_price}€
                            </span>
                            {/* Badge discret de statut */}
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
                        </div>
                        <p className="text-[10px] font-medium uppercase tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>
                            Valeur {attr.value_real}€
                        </p>
                    </div>

                    {/* BOUTON : Prend le reste de la place */}
                    <button
                        onClick={placeBid}
                        className="flex-grow h-14 rounded-lg font-bold uppercase text-xs tracking-widest shadow-md active:scale-95 transition-transform text-white"
                        style={{ backgroundColor: 'var(--accent-gold)' }}
                    >
                        {isFixedPrice ? 'Acheter' : 'Enchérir'}
                    </button>

                </div>
            </div>
            <AuctionResultModal
                winnerData={winnerData}
                user={user}
                isFinished={isFinished}
                auction_id={auction.id}
            />
        </main>
    )
}

const ExperienceInclusions = ({ attr }: { attr: AuctionAttributes }) => {
    const inclusions = [];
    if (attr.guests) inclusions.push({ icon: <Users size={18} />, text: `${attr.guests} Personnes` });
    if (attr.duration) inclusions.push({ icon: <Clock size={18} />, text: attr.duration });
    if (attr.breakfast) inclusions.push({ icon: <Utensils size={18} />, text: "Petit-déjeuner" });
    if (attr.spa_access) inclusions.push({ icon: <ShieldCheck size={18} />, text: "Espace Spa" });
    if (attr.menu) inclusions.push({ icon: <Utensils size={18} />, text: attr.menu });
    if (attr.is_private) inclusions.push({ icon: <Star size={18} />, text: "Privé" });
    if (attr.has_delivery) inclusions.push({ icon: <Truck size={18} />, text: "Livraison incluse" });

    return (
        <div className="grid grid-cols-2 gap-3">
            {inclusions.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border rounded-lg hover:opacity-80 transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                    <div style={{ color: 'var(--accent-gold)' }} className="shrink-0">{item.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.text}</span>
                </div>
            ))}
        </div>
    );
};