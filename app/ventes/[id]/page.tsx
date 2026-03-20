'use client'

import { useParams } from 'next/navigation'
import { useAuctionData } from '@/hooks/useAuctionData'
import { useBidApi } from '@/hooks/useBid'
import AuthModal from '@/components/AuthModal'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { AuctionAttributes } from '@/types'
import AuctionGallery from '@/components/AuctionGallery'
import BidHistory from '@/components/BidHistory'
import Toast, { ToastType } from '@/components/Toast'
import { AuctionResultModal } from '@/components/AuctionResultModal'

import {
    HeaderNavigation,
    TitleSection,
    OfferDetailsSection,
    TrustBar,
    DescriptionSection,
    LocationSection,
    ConditionsSection,
    PricingSidebar,
    MobileActionBar,
    ExperienceNotFound,
} from './_components'
import { useUser } from '@/hooks/UserContext'
import { BuyNowPopup } from './_components/PricingSidebar/BuyNowPopup'

// --- HELPERS ---
const formatTimeLeft = (expiryDate: string): string => {
    const total = Date.parse(expiryDate) - Date.now()

    if (total <= 0) return 'Vente terminée'

    const d = Math.floor(total / (1000 * 60 * 60 * 24))
    const h = Math.floor((total / (1000 * 60 * 60)) % 24)
    const m = Math.floor((total / 1000 / 60) % 60)
    const s = Math.floor((total / 1000) % 60)

    // Affichage intelligent selon l'urgence
    if (d > 0) {
        return `${d}j ${h}h ${m}m`
    }

    if (h > 0) {
        return `${h}h ${m}m ${s}s`
    }

    return `${m}m ${s}s` // Si moins d'une heure, on force l'affichage des secondes
}

export default function AuctionDetailsPage() {
    const { id } = useParams()
    const { auction, bids, loading, isAuthOpen, setIsAuthOpen, winnerData } = useAuctionData(id as string)
    const { user } = useUser()
    const [toast, setToast] = useState<{ msg: string | null; type: ToastType }>({ msg: null, type: null })
    const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);

    const showToast = (msg: string, type: ToastType) => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: null, type: null }), 5000)
    }

    const { bid, loading: isBidding } = useBidApi(showToast)

    const handlePlaceBid = async (bidAmount: number) => {
        if (!user) {
            setIsAuthOpen(true)
            return
        }
        if (auction) {
            if (auction.type == "auction") {
                await bid(user.id, auction.id, bidAmount)
            }
        }
    }

    const [timeLeft, setTimeLeft] = useState('')

    const handleBuyNow = () => setShowBuyNowPopup(true)
    const handleClosePopup = () => setShowBuyNowPopup(false)
    const handleBuyNowSubmit = (contactData: { name: string; email: string; phone: string }) => {
        setShowBuyNowPopup(false)
        // Pass contact info to onPlaceBid
        // You can handle contactData here (send to API, etc.)
    }
    useEffect(() => {
        if (auction?.end_at) {
            setTimeLeft(formatTimeLeft(auction.end_at))
            const timer = setInterval(() => setTimeLeft(formatTimeLeft(auction.end_at)), 60000)
            return () => clearInterval(timer)
        }
    }, [auction])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border-primary)', borderTopColor: 'var(--accent-gold)' }} />
            </div>
        )
    }

    // Not found state
    if (!auction) {
        return <ExperienceNotFound />
    }

    // State calculations - AFTER null check
    const isFixedPrice = auction.type === 'fixed'
    const attr = (auction.attributes as AuctionAttributes) || {}
    const isFinished = new Date(auction.end_at) < new Date() || auction.status !== 'active'

    return (
        <main className="pb-32" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

            {/* MODALS & NOTIFICATIONS */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: null, type: null })} />

            {/* NAVBAR */}
            <Navbar user={user} onAuthClick={() => setIsAuthOpen(true)} />

            {/* HEADER NAVIGATION */}
            <HeaderNavigation attr={attr} />

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Image Gallery */}
                        <AuctionGallery images={auction.images} title={auction.title} isLimited={auction.is_limited} />

                        {/* Mobile Title */}
                        <TitleSection auction={auction} attr={attr} />

                        {/* Offer Details with Inclusions */}
                        <OfferDetailsSection auction={auction} attr={attr} />

                        {/* Trust Bar - Guarantees */}
                        <TrustBar />

                        {/* Description */}
                        <DescriptionSection auction={auction} />

                        {/* Location */}
                        <LocationSection auction={auction} attr={attr} />

                        {/* Conditions */}
                        <ConditionsSection attr={attr} />
                    </div>

                    {/* --- RIGHT COLUMN (STICKY) --- */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <PricingSidebar
                            auction={auction}
                            timeLeft={timeLeft}
                            bidsCount={bids?.length || 0}
                            isBidding={isBidding}
                            canBid={!!user?.id && !isFinished}
                            winnerData={winnerData}
                            user={user}
                            onPlaceBid={handlePlaceBid}
                            onSignIn={() => setIsAuthOpen(true)}
                            onBuyNowClick={handleBuyNow}
                        />
                    </div>

                    {/* --- BID HISTORY (FULL WIDTH) --- */}
                    <div className="lg:col-span-12 mt-12">
                        <BidHistory bids={bids || []} />
                    </div>
                </div>
            </div>

            {/* MOBILE ACTION BAR */}
            <MobileActionBar
                auction={auction} attr={attr}
                isFixedPrice={isFixedPrice}
                isConnected={!!user}
                onPlaceBid={handlePlaceBid}
                onSignIn={() => setIsAuthOpen(true)}
                isBidding={isBidding}
                onBuyNowClick={handleBuyNow}
            />

            {/* RESULT MODAL */}
            <AuctionResultModal winnerData={winnerData} user={user} isFinished={isFinished} auction_id={auction.id} />
            <BuyNowPopup
                isOpen={showBuyNowPopup}
                onClose={handleClosePopup}
                onSubmit={handleBuyNowSubmit}
            />
        </main>
    )
}

