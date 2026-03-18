import { ShoppingBag, Gavel, Timer, History } from 'lucide-react'
import { Auction, AuctionAttributes } from '@/types'

interface PricingSidebarProps {
	auction: Auction
	attr: AuctionAttributes
	timeLeft: string
	bidsCount: number
	isBidding: boolean
	canBid: boolean
	winnerData?: any
	user?: any
	onPlaceBid: (amount: number) => void
	onSignIn: () => void
}

export function PricingSidebar({
	auction,
	attr,
	timeLeft,
	bidsCount,
	isBidding,
	canBid,
	winnerData,
	user,
	onPlaceBid,
	onSignIn
}: PricingSidebarProps) {
	const isFixedPrice = auction.type === 'fixed'

	// On calcule l'incrément réel selon le type
	const minIncrement = auction.bid_step_type === "fixed"
		? Number(auction.min_bid_increment)
		: (Number(auction.current_price) * (Number(auction.min_bid_increment) / 100));

	// Le prochain montant minimum autorisé
	const nextMinAmount = Number(auction.current_price) + minIncrement;

	return (
		<div className="sticky top-24 space-y-6">
			<div className="p-8 border rounded-lg shadow-lg space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
				{/* Titre et Badge Desktop */}
				<div className="hidden lg:block space-y-2">
					<h1 className="text-2xl font-bold italic uppercase leading-none tracking-tighter" style={{ color: 'var(--text-primary)' }}>
						{auction.title}
					</h1>
					<div className="flex items-center gap-2">
						<div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
						<p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
							Offre Certifiée
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
						{
							isFixedPrice &&
							<div className="text-right">
								<span className="text-[10px] font-medium block uppercase" style={{ color: 'var(--text-secondary)' }}>
									Valeur réelle
								</span>
								<span className="text-sm font-medium line-through" style={{ color: 'var(--text-secondary)' }}>
									{attr.value_real || (auction.current_price * 1.6).toFixed(0)}€
								</span>
							</div>
						}
					</div>
				) : (
					<div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-primary)' }}>
						<div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
							<span className="text-sm font-bold uppercase" style={{ color: 'var(--accent-gold)' }}>Connectez-vous pour voir les tarifs</span>
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

				{/* Résultat Enchère */}
				{auction.status === 'finished_unpaid' && (
					<div className="mt-6">
						{winnerData?.result_status === 'reserve_not_met' ? (
							<div className="p-6 border rounded-lg" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.3)', color: 'var(--accent-gold)' }}>
								<p className="font-bold">⌛ Enchère terminée sans vainqueur</p>
								<p className="text-sm">Le prix de réserve n'a pas été atteint pour cette offre.</p>
							</div>
						) : winnerData?.winner_id === user?.id ? (
							<div className="p-6 rounded-lg text-white shadow-lg animate-in fade-in zoom-in duration-500" style={{ backgroundColor: 'var(--accent-gold)' }}>
								<h2 className="text-2xl font-bold italic uppercase">Félicitations !</h2>
								<p className="mb-4">Vous avez remporté l'enchère pour {winnerData?.winning_bid}€.</p>
								<a
									href="https://buy.stripe.com/TON_LIEN"
									className="inline-block px-6 py-3 rounded-lg font-bold uppercase text-sm"
									style={{ backgroundColor: 'white', color: 'black' }}
								>
									Finaliser ma réservation (30€)
								</a>
							</div>
						) : (
							<div className="p-4 rounded-lg text-center italic" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
								Cette vente est terminée.
							</div>
						)}
					</div>
				)}

				{/* Bouton Enchère/Achat */}
				{canBid && (
					isFixedPrice ? (
						<BuyNowButton
							price={Number(auction.buy_now_price)}
							onConfirm={onPlaceBid}
							disabled={isBidding}
						/>
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



				{/* Infos Timer et Enchères */}
				<div className="flex items-center justify-center gap-4 pt-4" style={{ color: 'var(--text-secondary)' }}>
					<div className="flex items-center gap-1 text-[10px] font-bold uppercase italic">
						<Timer size={14} style={{ color: 'var(--accent-gold)' }} /> {timeLeft}
					</div>
					<div className="w-[1px] h-3" style={{ backgroundColor: 'var(--border-primary)' }} />
					<div className="flex items-center gap-1 text-[10px] font-bold uppercase italic">
						<History size={14} /> {bidsCount} offres
					</div>
				</div>
			</div>
		</div>
	)
}
interface BidButtonProps {
	nextAmount: number;
	increment: number;
	onConfirm: (amount: number) => void;
	disabled: boolean;
	isBidding: boolean
}

interface BuyNowButtonProps {
	price: number;
	onConfirm: (amount: number) => void;
	disabled: boolean;
}


const BuyNowButton: React.FC<BuyNowButtonProps> = ({ price, onConfirm, disabled }) => (
	<button
		onClick={() => onConfirm(price)}
		disabled={disabled}
		className="group w-full h-16 bg-black text-white rounded-xl flex items-center justify-center gap-4 transition-all hover:bg-[var(--accent-gold)] hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50"
	>
		<ShoppingBag size={22} />
		<div className="flex flex-col items-start">
			<span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-70">
				Réservation Immédiate
			</span>
			<span className="text-lg font-black tracking-wider">
				Réserver à {price}€
			</span>
		</div>
	</button>
);

const BidButton: React.FC<BidButtonProps> = ({
	nextAmount,
	increment,
	onConfirm,
	disabled,
	isBidding
}) => {
	const formattedAmount = new Intl.NumberFormat('fr-FR').format(nextAmount);

	return (
		<button
			onClick={() => onConfirm(nextAmount)}
			disabled={disabled}
			className="group relative w-full h-16 bg-[var(--accent-gold)] text-black rounded-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-4 px-8"
		>
			{/* Icône Marteau - En noir profond pour contraster avec l'or */}
			<Gavel
				size={24}
				strokeWidth={2.5}
				className={`transition-transform duration-500 ${isBidding ? 'animate-bounce' : 'group-hover:rotate-[-15deg]'
					}`}
			/>

			<div className="flex flex-col items-start justify-center">
				<span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-black text-black/60 group-hover:text-black transition-colors">
					{isBidding ? 'Transmission...' : 'Surenchérir'}
				</span>
				<span className="text-xl md:text-2xl font-[1000] tracking-tighter text-black uppercase">
					{isBidding ? 'En cours' : `Placer ${formattedAmount}€`}
				</span>
			</div>

			{/* Badge d'incrément - Noir sur Or pour une visibilité maximale */}
			{!isBidding && (
				<div className="absolute top-2 right-4 text-[10px] font-black border border-black/20 bg-black/5 px-2 py-0.5 rounded-full group-hover:bg-black group-hover:text-[var(--accent-gold)] transition-all">
					+{increment}€
				</div>
			)}

			{/* Effet Shimmer de luxe (Brillance blanche sur l'Or) */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
		</button>
	);
};

export const getPriceLabel = (isFixedPrice: boolean, status: string, bidCount: number) => {
	if (isFixedPrice) return "Prix Membre";

	switch (status) {
		case 'upcoming':
			return "Mise de départ";
		case 'active':
			return bidCount > 0 ? "Offre actuelle" : "Première mise";
		case 'finished_reserve_not_met':
		case 'finished_unpaid':
		case 'finished_paid':
		case 'completed':
			return "Prix final";
		default:
			return "Valeur";
	}
};