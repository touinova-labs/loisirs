import { ShoppingBag } from 'lucide-react'
import React from 'react'

interface BuyNowButtonProps {
  price: number
  onConfirm: (amount: number) => void
  disabled: boolean
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({ price, onConfirm, disabled }) => (
  <button
    onClick={() => onConfirm(price)}
    disabled={disabled}
    className="w-full h-14 bg-[var(--accent-gold)] text-[var(--text-primary)] font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
  >
    <div className="flex items-center gap-3">
      <ShoppingBag size={20} />
      <span className="font-black uppercase tracking-wide text-sm">
        Sécuriser ce séjour
      </span>
    </div>
    <span className="text-lg font-black tabular-nums">
      {price}€
    </span>
  </button>
)
