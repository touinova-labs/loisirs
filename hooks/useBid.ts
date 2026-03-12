'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Auction } from '@/types'
import { ToastType } from '@/components/Toast'

export function useBid(auction: Auction | null,
    user: any,
    onAuthRequired: () => void,
    showToast: (msg: string, type: ToastType) => void) {
    const [loading, setLoading] = useState(false)

    const placeBid = async () => {
        if (!auction) return

        // 1. Protection : Vérifier l'utilisateur
        if (!user) {
            onAuthRequired()
            return
        }

        setLoading(true)

        try {
            // 2. Calcul du montant (Incrément de 1€)
            const bidAmount = auction.current_price + 1

            // 3. Insertion en base de données
            const { error: bidError } = await supabase
                .from('bids')
                .insert({
                    auction_id: auction.id,
                    user_id: user.id,
                    amount: bidAmount
                })

            if (bidError) {
                let message = "Une erreur est survenue.";

                // On cherche les mots-clés définis dans le SQL
                if (bidError.message.includes("ENCHERE_TERMINEE")) {
                    message = "L'enchère est clôturée ou déjà vendue.";
                }
                else if (bidError.message.includes("MISE_INSUFFISANTE")) {
                    // On peut même extraire le prix actuel si on veut être précis
                    message = "Quelqu'un a surenchéri entre-temps ! Veuillez augmenter votre mise.";
                }
                else if (bidError.message.includes("ENCHERE_INTROUVABLE")) {
                    message = "Cette enchère n'existe plus.";
                }

                showToast(message, 'error');
                return;
            }
            console.log(bidError)
            showToast("Mise confirmée avec succès !", 'success')
        } catch (err: any) {
            showToast("Une erreur inattendue est survenue", "error")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return { placeBid, loading }
}