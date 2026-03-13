import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
    try {
        // On récupère le token du header s'il existe
        const authHeader = req.headers.get('authorization')
        const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined
        const { data : {user}} = await supabase.auth.getUser(tokenFromHeader)

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Non authentifié' },
                { status: 401 }
            )
        }

        // 3. Récupérer le profil via Admin (pour bypasser les RLS si besoin)
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('first_name, last_name, onboarding_completed, email')
            .eq('id', user.id)
            .single()

        // 4. Construire un objet utilisateur "propre"
        const safeUser = {
            id: user.id,
            email: user.email,
            firstName: profile?.first_name || null,
            lastName: profile?.last_name || null,
            onboardingCompleted: profile?.onboarding_completed || false,
        }

        return NextResponse.json({
            success: true,
            data: safeUser
        })

    } catch (error: any) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
            { success: false, error: 'Erreur serveur interne' },
            { status: 500 }
        )
    }
}