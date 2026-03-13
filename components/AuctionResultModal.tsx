import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Ou n'importe quelle icône de fermeture

export function AuctionResultModal({ winnerData, user, isFinished, auction_id }: any) {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const celebrationKey = `celebrated_${auction_id}`; // Clé unique par enchère
    const alreadyCelebrated = sessionStorage.getItem(celebrationKey);

    if (isFinished && winnerData?.winner_id === user?.id && !alreadyCelebrated) {
      // On bloque immédiatement dans le storage
      sessionStorage.setItem(celebrationKey, 'true');

      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#ffffff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isFinished, winnerData?.winner_id, user?.id, auction_id]);

  if (!isFinished || !isOpen) return null;

  const isWinner = winnerData?.winner_id === user?.id;
  const isReserveNotMet = winnerData?.result_status === 'reserve_not_met';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay sombre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        />

        {/* Contenu de la Modale */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl shadow-xl overflow-hidden text-center"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
          }}
        >
          {/* Bouton Fermer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full transition-colors hover:opacity-80"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {isWinner ? (
            /* --- ETAT : VICTOIRE --- */
            <div className="p-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.1, color: 'var(--accent-gold)' }}>
                🥂
              </div>
              <h2 className="text-4xl font-bold italic uppercase tracking-tight mb-2">
                Félicitations !
              </h2>
              <p className="font-semibold text-xs uppercase tracking-widest mb-6 italic" style={{ color: 'var(--accent-gold)' }}>
                Vous avez remporté la vente
              </p>

              <div className="rounded-lg p-6 mb-8 border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>Prix Adjugé</p>
                <p className="text-4xl font-bold italic leading-none" style={{ color: 'var(--accent-gold)' }}>{winnerData?.winning_bid}€</p>
              </div>

              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Le prestige vous attend. Pour sécuriser votre coupon VIP, veuillez confirmer votre réservation ci-dessous.
              </p>

              <a
                href="https://buy.stripe.com/TON_LIEN"
                className="block w-full py-5 rounded-lg font-bold uppercase text-xs tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 text-white"
                style={{ backgroundColor: 'var(--accent-gold)' }}
              >
                Confirmer & Payer (30€)
              </a>
              <p className="mt-4 text-[10px] font-semibold uppercase italic" style={{ color: 'var(--text-secondary)' }}>Paiement sécurisé via Stripe</p>
            </div>

          ) : isReserveNotMet ? (
            /* --- ETAT : RESERVE NON ATTEINTE --- */
            <div className="p-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.1 }}>
                ⌛
              </div>
              <h2 className="text-2xl font-bold uppercase italic mb-4">Vente Clôturée</h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                Malheureusement, le prix de réserve de l'établissement n'a pas été atteint. Aucune transaction n'a été effectuée.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-all border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'var(--accent-gold)',
                  color: 'var(--accent-gold)',
                }}
              >
                Fermer
              </button>
            </div>

          ) : (
            /* --- ETAT : PERDU --- */
            <div className="p-10">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.5 }}>
                🏨
              </div>
              <h2 className="text-2xl font-bold uppercase italic mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>Offre Clôturée</h2>
              <p className="text-sm mb-8 italic" style={{ color: 'var(--text-secondary)' }}>
                Cette vente privée est terminée. Un autre membre a remporté l'enchère.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                Retour aux enchères
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}