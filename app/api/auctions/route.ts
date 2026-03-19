import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(request: Request) {
    try {
        // Récupération de l'utilisateur via Bearer token
        const authHeader = request.headers.get('authorization')
        const tokenFromHeader = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : undefined
        const { data: { user } } = await supabase.auth.getUser(tokenFromHeader)

        // Récupération de toutes les enchères via Admin (pour éviter RLS)
        const { data: auctions, error } = await supabaseAdmin
            .from('auctions')
            .select('*')
            // .eq("enabled", true)
            .order('created_at', { ascending: false })

        if (error) throw error

        let sanitizedAuctions = auctions || []

        // Si non connecté, on masque les infos sensibles
        sanitizedAuctions = sanitizedAuctions.map(a => {
            const sanitized = { ...a }
            if (sanitized.attributes) {
                sanitized.attributes = {
                    ...sanitized.attributes,
                    lat: null,
                    lng: null
                }
            }

            if (!user) {
                // Masquage des prix
                sanitized.current_price = null
                sanitized.buy_now_price = null
                sanitized.start_price = null
                sanitized.reserve_price = null

                // Masquage des infos JSONB
                if (sanitized.attributes) {
                    sanitized.attributes = {
                        ...sanitized.attributes,
                        value_real: null,
                    }
                }

                // Masquage du nom/location
                sanitized.location_name = 'Emplacement réservé aux membres'
            }

            return sanitized
        })

        return NextResponse.json({
            success: true,
            data: sanitizedAuctions,
            isLoggedIn: !!user
        })
    } catch (error: any) {
        console.error('Error fetching auctions:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}