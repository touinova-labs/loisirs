import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Auction } from '@/types'

export function useAuctionData(auctionId: string) {
    const [auction, setAuction] = useState<Auction | null>(null)
    const [bids, setBids] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [winnerData, setWinnerData] = useState<any | null>(null)

    // 1. Fonction pour rafraîchir les infos du gagnant (Vue SQL)
    const fetchWinnerInfo = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('auction_winners')
                .select('*')
                .eq('auction_id', auctionId)
                .single()
            if (data) setWinnerData(data)
        } catch (err) {
            console.error("Erreur winner info:", err)
        }
    }, [auctionId])

    // 2. Chargement initial via TON API (pour la sanitization des prix)
    const fetchInitialData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const { data: { session } } = await supabase.auth.getSession();


            const response = await fetch(`/api/auctions/${auctionId}`, {
                headers: session?.user ? {
                    'Authorization': `Bearer ${session?.access_token || session?.user?.id}`,
                } : {},
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Erreur lors du chargement')

            setAuction(data.auction)
            setBids(data.bids || [])
            setWinnerData(data.winnerData)
            setIsLoggedIn(data.isLoggedIn)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [auctionId])

    useEffect(() => {
        // Appeler le fetch initial
        fetchInitialData()

        // 3. Gestion du changement d'état Auth
        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                fetchInitialData()
            }
        })

        // 4. Souscription Realtime (uniquement pour les updates fluides)
        const channel = supabase
            .channel(`auction-room-${auctionId}`)
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'auctions', filter: `id=eq.${auctionId}` },
                (payload) => {
                    const newAuction = payload.new as Auction
                    setAuction(prev => ({ ...prev, ...newAuction }))

                    // Si l'enchère se termine en direct
                    if (new Date(newAuction.end_at) < new Date()) {
                        fetchWinnerInfo()
                    }
                }
            )
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'bids', filter: `auction_id=eq.${auctionId}` },
                async (payload) => {
                    const newBid = payload.new;
                    setBids((current) => [newBid, ...current]);
                }
            )
            .subscribe()

        return () => {
            authSub.unsubscribe()
            supabase.removeChannel(channel)
        }
    }, [auctionId, fetchInitialData, fetchWinnerInfo])

    return {
        auction,
        bids,
        loading,
        error,
        isLoggedIn,
        isAuthOpen,
        setIsAuthOpen,
        winnerData,
        refresh: fetchInitialData // Permet de forcer un refresh manuel si besoin
    }
}