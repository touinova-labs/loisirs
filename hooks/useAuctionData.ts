import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase' // ton client supabase
import { Auction } from '@/types'

export function useAuctionData(auctionId: string) {
    const [auction, setAuction] = useState<Auction | null>(null)
    const [bids, setBids] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    
    const [winnerData, setWinnerData] = useState<any | null>(null)

    // Fonction pour vérifier le gagnant dans la VUE SQL
    const fetchWinnerInfo = async () => {
        const { data, error } = await supabase
            .from('auction_winners') // Ta vue SQL
            .select('*')
            .eq('auction_id', auctionId)
            .single()
        
        if (data) setWinnerData(data)
    }

    useEffect(() => {
        // 1. Gérer l'utilisateur
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
        })

        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        // 2. Charger les données initiales
        const fetchInitialData = async () => {
            setLoading(true)
            const [auctionRes, bidsRes] = await Promise.all([
                supabase.from('auctions').select('*').eq('id', auctionId).single(),
                supabase.from('bids').select('*').eq('auction_id', auctionId).order('created_at', { ascending: false })
            ])

            if (auctionRes.data) {
                setAuction(auctionRes.data)
                // Si l'enchère est déjà finie au chargement, on cherche le gagnant
                if (new Date(auctionRes.data.end_at) < new Date()) {
                    fetchWinnerInfo()
                }
            }
            if (bidsRes.data) setBids(bidsRes.data)
            setLoading(false)
        }

        fetchInitialData()

        // 3. Temps Réel
        const channel = supabase
            .channel(`auction-${auctionId}`)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'auctions', filter: `id=eq.${auctionId}` },
                (payload) => {
                    const newAuction = payload.new as any
                    setAuction(newAuction)
                    // NOUVEAU : Si le temps expire suite à une mise à jour (anti-sniping ou autre)
                    if (new Date(newAuction.end_at) < new Date()) {
                        fetchWinnerInfo()
                    }
                }
            )
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bids', filter: `auction_id=eq.${auctionId}` },
                (payload) => {
                    setBids((current) => [payload.new as any, ...current])
                }
            )
            .subscribe()

        return () => {
            authSub.unsubscribe()
            supabase.removeChannel(channel)
        }
    }, [auctionId])

    return {
        auction,
        bids,
        loading,
        user,
        isAuthOpen,
        setIsAuthOpen,
        winnerData // On retourne le gagnant
    }
}