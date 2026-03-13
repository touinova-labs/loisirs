import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { supabase } from '@/lib/supabase'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // On définit params comme une Promise
) {
    try {
        const { id } = await params
        const authHeader = request.headers.get('authorization')
        const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined
        const { data: { user } } = await supabase.auth.getUser(tokenFromHeader)

        // 3. Récupérer l'enchère via Admin (car certaines données sont peut-être cachées par RLS)
        const { data: auction, error: auctionError } = await supabaseAdmin
            .from('auctions')
            .select('*')
            .eq('id', id)
            .single()

        console.log("hh", auctionError, auction)

        if (auctionError || !auction) {
            return NextResponse.json({ error: 'Enchère non trouvée' }, { status: 404 })
        }

        // 4. Récupérer les mises (Bids)
        let bids = []
        if (user) {
            const { data } = await supabaseAdmin
                .from('bids')
                .select('*')
                .eq('auction_id', id)
                .order('created_at', { ascending: false })
            bids = data || []
        }

        // 5. Récupérer le gagnant si terminé
        let winnerData = null
        if (new Date(auction.end_at) < new Date()) {
            const { data } = await supabaseAdmin
                .from('auction_winners')
                .select('*')
                .eq('auction_id', id)
                .single()
            winnerData = data
        }

        // 6. SANITIZATION (Nettoyage des données si non connecté)
        // On crée un nouvel objet pour éviter de muter l'original par accident
        let sanitizedAuction = { ...auction }

        if (!user) {
            // Masquage strict des prix
            sanitizedAuction.current_price = null
            sanitizedAuction.buy_now_price = null
            sanitizedAuction.start_price = null
            sanitizedAuction.reserve_price = null

            // Masquage dans les JSONB attributes
            if (sanitizedAuction.attributes) {
                sanitizedAuction.attributes = {
                    ...sanitizedAuction.attributes,
                    value_real: null,
                    lat: null,
                    lng: null
                }
            }

            sanitizedAuction.location_name = 'Emplacement réservé aux membres'
            // On s'assure que les bids restent vides pour le client
            bids = []
        }

        return NextResponse.json({
            auction: sanitizedAuction,
            bids,
            winnerData,
            isLoggedIn: !!user
        })

    } catch (error) {
        console.error('Erreur API auctions:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}