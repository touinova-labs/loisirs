import React from 'react'
import { X } from 'lucide-react'

interface BuyNowPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; phone: string }) => void
}

export const ContactInfoPopup: React.FC<BuyNowPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      
      <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-primary)'
        }}
      >
        <p className="text-[10px] text-[var(--accent-gold)] uppercase tracking-widest">
  Accès réservé
</p>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              Confirmation
            </p>
            <h2 className="text-xl font-bold italic uppercase">
              Sécuriser votre séjour
            </h2>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Renseignez vos coordonnées pour confirmer votre demande.  
          L’établissement vous contactera directement pour finaliser votre séjour.
        </p>

        {/* Form */}
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit({ name, email, phone })
          }}
          className="space-y-3"
        >
          <input
            type="text"
            placeholder="Nom complet"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg outline-none border text-sm"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-primary)'
            }}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg outline-none border text-sm"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-primary)'
            }}
            required
          />

          <input
            type="tel"
            placeholder="Téléphone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg outline-none border text-sm"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-primary)'
            }}
            required
          />

          {/* CTA */}
          <button
            type="submit"
            className="w-full h-14 mt-2 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl transition-all active:scale-95"
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: 'black'
            }}
          >
            Confirmer ma demande
          </button>
        </form>

        {/* Micro trust */}
        <p className="text-[10px] text-center mt-4 italic"
          style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
        >
          Vos informations sont transmises uniquement à l’établissement concerné
        </p>
      </div>
    </div>
  )
}