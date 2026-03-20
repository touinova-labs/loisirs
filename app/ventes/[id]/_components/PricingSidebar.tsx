'use client'
import { Timer, History } from 'lucide-react'
import { BuyNowButton } from './PricingSidebar/BuyNowButton'
import { ContactInfoPopup } from './PricingSidebar/BuyNowPopup'
import { BidButton } from './PricingSidebar/BidButton'
import { Auction } from '@/types'
import { useState } from 'react';


interface PricingSidebarProps {
	auction: Auction;
	timeLeft: string;
	bidsCount: number;
	isBidding: boolean;
	canBid: boolean;
	winnerData?: any;
	user?: any;
	onPlaceBid: (amount: number) => void;
	onSignIn: () => void;
}


export function PricingSidebar({
	auction,
	timeLeft,
	bidsCount,
	isBidding,
	canBid,
	winnerData,
	user,
	onPlaceBid,
	onSignIn
}: PricingSidebarProps) {
	const isFixedPrice = auction.type === 'fixed';

	// Calcul du minimum de l'enchère
	const minIncrement = auction.bid_step_type === "fixed"
		? Number(auction.min_bid_increment)
		: (Number(auction.current_price) * (Number(auction.min_bid_increment) / 100));

	const nextMinAmount = Number(auction.current_price) + minIncrement;

	// Popup state
	const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);
	// ...existing code...
	const handleBuyNow = () => setShowBuyNowPopup(true)
	const handleClosePopup = () => setShowBuyNowPopup(false)
	const handleBuyNowSubmit = (contactData: { name: string; email: string; phone: string }) => {
		setShowBuyNowPopup(false)
		// Pass contact info to onPlaceBid
		onPlaceBid(Number(auction.buy_now_price))
		// You can handle contactData here (send to API, etc.)
	}

	return (
		<div className="sticky top-24 space-y-6">
			<div className="p-8 border rounded-lg shadow-lg space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>

				{/* Titre & Badge Premium */}
				<div className="hidden lg:block space-y-2">
					<h1 className="text-2xl font-bold italic uppercase leading-none tracking-tighter" style={{ color: 'var(--text-primary)' }}>
						{auction.title}
					</h1>
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
						<p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
							Offre Premium Certifiée
						</p>
					</div>
				</div>

				{/* Prix Actuel */}
				{user ? (
					<div className="pt-4 border-t flex justify-between items-end" style={{ borderColor: 'var(--border-primary)' }}>
						<div>
							<span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: 'var(--text-secondary)' }}>
								{getPriceLabel(isFixedPrice, auction.status, bidsCount)}
							</span>
							<span className="text-5xl font-bold tabular-nums" style={{ color: 'var(--accent-gold)' }}>
								{isFixedPrice ? auction.buy_now_price : auction.current_price}€
							</span>
						</div>
					</div>
				) : (
					<div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-primary)' }}>
						<div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
							<span className="text-sm font-bold uppercase" style={{ color: 'var(--accent-gold)' }}>
								Connectez-vous pour découvrir vos tarifs exclusifs
							</span>
						</div>
						<button
							onClick={onSignIn}
							className="w-full h-12 rounded-lg font-bold uppercase text-sm tracking-widest transition-all shadow-md flex items-center justify-center gap-2 text-white"
							style={{ backgroundColor: 'var(--accent-gold)' }}
						>
							Se connecter
						</button>
					</div>
				)}

				{/* Résultat Enchère / Position finale */}
				{['finished_paid', 'completed', 'finished_unpaid', 'finished_reserve_not_met'].includes(auction.status) && user && (
					<div className="mt-6">
						{winnerData?.result_status === 'reserve_not_met' ? (
							<div className="p-6 border rounded-lg" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.3)', color: 'var(--accent-gold)' }}>
								<p className="font-bold">Accès non attribué</p>
								<p className="text-sm">
									Aucune position n’a permis de confirmer ce séjour.
								</p>
							</div>
						) : winnerData?.winner_id === user?.id ? (
							<div className="p-6 rounded-lg text-white shadow-lg animate-in fade-in zoom-in duration-500" style={{ backgroundColor: 'var(--accent-gold)' }}>
								<h2 className="text-2xl font-bold italic uppercase">
									Accès confirmé
								</h2>
								<p className="mb-4">
									Votre position a été retenue pour {winnerData?.winning_bid}€.
								</p>
								<a
									href="https://buy.stripe.com/TON_LIEN"
									className="inline-block px-6 py-3 rounded-lg font-bold uppercase text-sm"
									style={{ backgroundColor: 'white', color: 'black' }}
								>
									Finaliser mon séjour
								</a>
							</div>
						) : (
							<div className="p-4 rounded-lg text-center italic" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
								Une autre position a été retenue pour cette expérience.
							</div>
						)}
					</div>
				)}

				{/* Bouton Enchère/Achat */}
				{canBid && (
					isFixedPrice ? (
						<>
							<BuyNowButton
								price={Number(auction.buy_now_price)}
								onConfirm={handleBuyNow}
								disabled={isBidding}
							/>
							<ContactInfoPopup
								isOpen={showBuyNowPopup}
								onClose={handleClosePopup}
								onSubmit={handleBuyNowSubmit}
							/>
						</>
					) : (
						<BidButton
							nextAmount={nextMinAmount}
							increment={minIncrement}
							onConfirm={onPlaceBid}
							isBidding={isBidding}
							disabled={isBidding}
						/>
					)
				)}

				{/* Timer et offres */}
				<div className="flex items-center justify-center gap-4 pt-4" style={{ color: 'var(--text-secondary)' }}>
					<div className="flex items-center gap-1 text-[10px] font-bold uppercase italic">
						<Timer size={14} style={{ color: 'var(--accent-gold)' }} /> {timeLeft}
					</div>

					<div className="w-[1px] h-3" style={{ backgroundColor: 'var(--border-primary)' }} />

					<div className="flex items-center gap-1 text-[10px] font-bold uppercase italic">
						<History size={14} />
						{bidsCount} {bidsCount > 1 ? "positions actives" : "position active"}
					</div>
				</div>
			</div>
		</div>
	)
}


export const getPriceLabel = (isFixedPrice: boolean, status: string, bidCount: number) => {
	if (isFixedPrice) return "Prix Membre";

	switch (status) {
		case 'upcoming':
			return "Prochaine mise";
		case 'active':
			return bidCount > 0 ? "Position actuelle" : "Première opportunité";
		case 'finished_reserve_not_met':
		case 'finished_unpaid':
		case 'finished_paid':
		case 'completed':
			return "Position finale";
		default:
			return "Valeur";
	}
};