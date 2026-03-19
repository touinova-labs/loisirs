'use client'

import { Lock, ShoppingBag, Gavel } from 'lucide-react'
import type { Auction, AuctionAttributes } from '@/types'

interface MobileActionBarProps {
	auction: Auction
	attr: AuctionAttributes
	isFixedPrice: boolean
	isConnected: boolean
	onPlaceBid: (amount: number) => void
	isBidding?: boolean
}

export function MobileActionBar({
	auction,
	isConnected,
	onPlaceBid,
	isBidding = false
}: MobileActionBarProps) {

	const currentPrice = Number(auction.current_price);
	const stepValue = Number(auction.min_bid_increment || 10);
	const minIncrement = auction.bid_step_type === "fixed"
		? stepValue
		: Math.ceil(currentPrice * (stepValue / 100));
	const nextMinAmount = currentPrice + minIncrement;

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: 0,
		}).format(amount);

	const renderActionButton = () => {
		if (!isConnected) {
			return (
				<button
					onClick={() => onPlaceBid(0)} // ouvrira modal connexion
					className="flex-grow h-16 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
				>
					<Lock size={16} />
					S'inscrire
				</button>
			);
		}

		return (
			<div className='flex flex-col w-full'>
				<button
					onClick={() => onPlaceBid(nextMinAmount)}
					disabled={!isBidding}
					className={`w-full h-14 bg-[var(--accent-gold)] text-[var(--text-primary)] font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform`}
				>
					<span className="uppercase tracking-wider text-sm">{isBidding ? 'Envoi...' : 'Confirmer ma position'}</span>
					{!isBidding && (
						<span className="tracking-tight text-center">
							{formatCurrency(nextMinAmount)}
						</span>
					)}
				</button>

				{/* Explication courte */}
				{!isBidding && (
					<p className="text-[10px] text-center text-[var(--text-secondary)] leading-snug mt-2 px-2">
						Montant engagé pour accéder à l’expérience. Accès selon positions retenues.
					</p>
				)}
			</div>
		);
	};

	return (
		<div
			className="fixed bottom-0 left-0 right-0 p-4 pb-8 border-t z-50 lg:hidden backdrop-blur-xl"
			style={{
				backgroundColor: 'rgba(var(--bg-primary-rgb), 0.95)',
				borderColor: 'var(--border-primary)'
			}}
		>
			<div className="max-w-md mx-auto flex items-center gap-4">
				{renderActionButton()}
			</div>
		</div>
	);
}