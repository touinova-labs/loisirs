'use client'

import { useState } from 'react'
import { Auction } from '@/types'
import { ToastType } from '@/components/Toast'

// Messages d'erreur centralisés
const ERROR_MESSAGES: Record<string, string> = {
    'AUCTION_NOT_FOUND': 'Cette offre n’est plus disponible.',
    'AUCTION_ENDED': 'La période de sélection est clôturée.',
    'BID_TOO_LOW': 'Un autre membre a confirmé son accès avant vous.',
    'MISSING_PARAMS': 'Certaines informations sont manquantes, veuillez vérifier.',
    'INVALID_AMOUNT': 'Le montant indiqué n’est pas valide.',
    'INTERNAL_ERROR': 'Une erreur est survenue, merci de réessayer.',
}

// Helper pour l'appel API bid
async function placeBidToApi(
    auctionId: string,
    userId: string,
    amount: number,
    showToast: (msg: string, type: ToastType) => void
): Promise<boolean> {
    try {
        const response = await fetch('/api/bid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auctionId,
                userId,
                amount,
            }),
        })

        const result = await response.json()

        if (result.success) {
            showToast("votre posistion  confirmée avec succès !", 'success')
            return true
        } else {
            const message = ERROR_MESSAGES[result.code] || result.error || "Une erreur est survenue"
            showToast(message, 'error')
            return false
        }
    } catch (err: any) {
        showToast("Une erreur inattendue est survenue", "error")
        console.error(err)
        return false
    }
}

export function useBid(
    auction: Auction | null,
    user: any,
    onAuthRequired: (() => void) | undefined,
    showToast: (msg: string, type: ToastType) => void
) {
    const [loading, setLoading] = useState(false)

    const placeBid = async (bidAmount?: number) => {
        if (!auction) return false

        // 1. Protection : Vérifier l'utilisateur
        if (!user) {
            onAuthRequired?.()
            return false
        }

        setLoading(true)

        try {
            // 2. Calcul du montant (Incrément de 1€ par défaut ou montant custom)
            const amount = bidAmount || (auction.current_price + 1)

            // 3. Appel API via helper
            return await placeBidToApi(auction.id, user.id, amount, showToast)
        } finally {
            setLoading(false)
        }
    }

    return { placeBid, loading }
}

// Hook générique pour les pages sans enchère unique (comme la page d'accueil)
export function useBidApi(showToast: (msg: string, type: ToastType) => void) {
    const [loading, setLoading] = useState(false)

    const bid = async (userId: string, auctionId: string, amount: number) => {
        setLoading(true)

        try {
            return await placeBidToApi(auctionId, userId, amount, showToast)
        } finally {
            setLoading(false)
        }
    }

    return { bid, loading }
}