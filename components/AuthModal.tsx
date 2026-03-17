'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Sparkles, ShieldCheck } from 'lucide-react'
import { useTheme } from '@/app/providers/ThemeProvider'

export default function AuthModal({ isOpen, onClose, mode }: { isOpen: boolean, onClose: () => void, mode?: 'login' | 'alert' }) {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)
	const { theme } = useTheme();

	const handleMagicLink = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch('/api/auth/magic-link', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, theme })
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Erreur lors de l'envoi")
			}

			setSent(true)
		} catch (error: any) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	const content = {
		login: {
			title: "Accès au Cercle",
			desc: <>Identifiez-vous pour accéder aux <strong>offres exclusives</strong> <br /> et profiter de chambres confidentielles à prix avantageux.</>,
			button: "Entrer dans le Cercle"
		},
		alert: {
			title: "Liste Prioritaire",
			desc: "Toutes nos suites sont réservées. Inscrivez-vous pour être alerté en priorité des nouvelles disponibilités.",
			button: "Rejoindre la liste prioritaire"
		}
	};

	const current = mode === 'alert' ? content.alert : content.login;

	return (
		<AnimatePresence>

			{isOpen && (
				<>
					{/* Fond sombre avec flou artistique */}
					<motion.div
						initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 backdrop-blur-md z-[100]"
						style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
					/>

					{/* Fenêtre Modale */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md border p-10 rounded-[2.5rem] shadow-2xl z-[101]"
						style={{
							backgroundColor: 'var(--bg-secondary)',
							borderColor: 'var(--border-primary)',
						}}
					>
						<button onClick={onClose} className="absolute top-6 right-6 transition-colors opacity-50 hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>
							<X size={24} />
						</button>

						{!sent ? (
							<div className="text-center">
								{/* Icône Premium */}
								<div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5 shadow-inner" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
									<Sparkles size={38} style={{ color: 'var(--accent-gold)' }} />
								</div>

								<h2 className="text-2xl font-light tracking-widest uppercase mb-4" style={{ color: 'var(--text-primary)' }}>
									{current.title}
								</h2>

								<p className="mb-10 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
									{current.desc}
								</p>

								<form onSubmit={handleMagicLink} className="space-y-6">
									<div className="relative">
										<Mail className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" size={20} style={{ color: 'var(--text-primary)' }} />
										<input
											type="email"
											placeholder="votre@email.com"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full border rounded-full py-4 pl-14 pr-6 outline-none transition-all text-sm tracking-wide"
											style={{
												backgroundColor: 'var(--bg-tertiary)',
												borderColor: 'var(--border-primary)',
												color: 'var(--text-primary)',
											}}
										/>
									</div>

									<button
										disabled={loading}
										className="w-full font-bold py-4 rounded-full shadow-lg transition-all disabled:opacity-50 text-black uppercase text-[10px] tracking-[0.3em]"
										style={{ backgroundColor: 'var(--accent-gold)' }}
									>
										{loading ? "Vérification..." : current.button}
									</button>
								</form>

								<div className="mt-8 flex items-center justify-center gap-2 opacity-30">
									<ShieldCheck size={14} />
									<span className="text-[10px] uppercase tracking-widest">Connexion sécurisée sans mot de passe</span>
								</div>
							</div>
						) : (
							<div className="text-center py-10">
								<div className="text-6xl mb-6 animate-bounce">
									{mode === 'alert' ? '✨' : '📩'}
								</div>
								<h2 className="text-xl font-light tracking-widest uppercase mb-4" style={{ color: 'var(--text-primary)' }}>
									{mode === 'alert' ? 'Inscription confirmée' : 'Lien envoyé'}
								</h2>

								<p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
									{mode === 'alert' ? (
										<>Vous êtes maintenant sur la <strong>liste prioritaire</strong>. <br />Vous serez alerté en premier des nouvelles suites disponibles.</>
									) : (
										<>Un lien magique vient d’être envoyé à votre boîte mail. <br />Cliquez dessus pour accéder au Cercle immédiatement.</>
									)}
								</p>

								<button
									onClick={() => setSent(false)}
									className="mt-10 text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all border-b border-transparent hover:border-current pb-1"
								>
									{mode === 'alert' ? "S'inscrire avec un autre email" : "Renvoyer le lien"}
								</button>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}