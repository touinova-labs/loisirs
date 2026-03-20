import { Gavel } from 'lucide-react'
import React, { useState } from 'react'

interface BidButtonProps {
  nextAmount: number
  increment: number
  onConfirm: (amount: number) => void
  disabled: boolean
  isBidding: boolean
}

export const BidButton: React.FC<BidButtonProps> = ({ nextAmount, increment, onConfirm, disabled, isBidding }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>()
  const [customAmount, setCustomAmount] = useState<number>()
  return (
    <div className="flex flex-col gap-3">
      {/* 1. Explication */}
      <p className="text-[12px] text-[var(--text-secondary)] italic text-center font-bold">
        Indiquez le montant que vous souhaitez engager pour accéder à cette expérience.
        L’accès est attribué aux positions retenues.
      </p>
      {/* 2. Choix du montant */}
      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={() => setSelectedAmount(nextAmount * 1.1)}
          className={`px-3 py-1 rounded-lg border transition-colors 
            ${selectedAmount === nextAmount * 1.1 ? 'bg-[var(--accent-gold)] text-[var(--text-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}
          `}
        >
          {new Intl.NumberFormat('fr-FR').format(nextAmount * 1.1)}€
        </button>
        <button
          onClick={() => setSelectedAmount(nextAmount * 1.5)}
          className={`px-3 py-1 rounded-lg border transition-colors 
            ${selectedAmount === nextAmount * 1.5 ? 'bg-[var(--accent-gold)] text-[var(--text-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'}
          `}
        >
          {new Intl.NumberFormat('fr-FR').format(nextAmount * 1.5)}€
        </button>
        <input
          type="number"
          placeholder={`${nextAmount}€`}
          value={customAmount || ""}
          onChange={(e) => {
            const val = Number(e.target.value)
            setCustomAmount(val)
            setSelectedAmount(val)
          }}
          className="w-20 px-2 py-1 border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)]"
        />
      </div>
      {/* 3. Affichage du montant choisi */}
      {selectedAmount && (
        <p className="text-sm font-bold text-center text-[var(--text-primary)]">
          Votre position : {new Intl.NumberFormat('fr-FR').format(selectedAmount)}€
        </p>
      )}
      {/* 4. Bouton principal */}
      <button
        onClick={() => onConfirm(selectedAmount || nextAmount)}
        disabled={!selectedAmount}
        className={`w-full h-14 bg-[var(--accent-gold)] text-[var(--text-primary)] font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform
          ${!selectedAmount ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}
        `}
      >
        <Gavel size={18} />
        <span className="uppercase tracking-wider text-sm">Demander cet accès</span>
      </button>
      <p className="text-[11px] text-[var(--text-secondary)] italic text-center">
        Sans engagement tant que votre position n’est pas confirmée.
      </p>
    </div>
  )
}
