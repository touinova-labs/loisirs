import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
	try {
		const { auctionId, userId, amount } = await req.json();

		// Validation basique
		if (!auctionId || !userId || !amount) {
			return NextResponse.json(
				{ success: false, code: 'MISSING_PARAMS', error: 'auctionId, userId et amount sont requis' },
				{ status: 400 }
			);
		}

		if (typeof amount !== 'number' || amount <= 0) {
			return NextResponse.json(
				{ success: false, code: 'INVALID_AMOUNT', error: 'Le montant doit être un nombre positif' },
				{ status: 400 }
			);
		}

		// Insérer la mise - La validation est faite par le trigger PostgreSQL
		const { data, error } = await supabaseAdmin
			.from('bids')
			.insert({
				auction_id: auctionId,
				amount,
				user_id: userId,
			})
			.select();

		if (error) {
			// Gérer les erreurs du trigger PostgreSQL avec codes structurés
			if (error.message.includes('ENCHERE_INTROUVABLE')) {
				return NextResponse.json(
					{ success: false, code: 'AUCTION_NOT_FOUND', error: 'Enchère introuvable' },
					{ status: 404 }
				);
			}
			if (error.message.includes('ENCHERE_TERMINEE')) {
				return NextResponse.json(
					{ success: false, code: 'AUCTION_ENDED', error: 'L\'enchère est clôturée' },
					{ status: 400 }
				);
			}
			if (error.message.includes('MISE_INSUFFISANTE')) {
				return NextResponse.json(
					{ success: false, code: 'BID_TOO_LOW', error: 'Mise insuffisante' },
					{ status: 400 }
				);
			}
			throw error;
		}

		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		console.error('Error placing bid:', error);
		return NextResponse.json(
			{ success: false, code: 'INTERNAL_ERROR', error: 'Une erreur interne s\'est produite' },
			{ status: 500 }
		);
	}
}
