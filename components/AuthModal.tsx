'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Sparkles } from 'lucide-react'

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [sent, setSent] = useState(false)

	const handleMagicLink = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch('/api/auth/magic-link', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
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


	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Fond sombre */}
					<motion.div
						initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 backdrop-blur-sm z-[100]"
						style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
					/>

					{/* Fenêtre Modale */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md border p-8 rounded-2xl shadow-lg z-[101]"
						style={{
							backgroundColor: 'var(--bg-secondary)',
							borderColor: 'var(--border-primary)',
						}}
					>
						<button onClick={onClose} className="absolute top-4 right-4 transition-colors" style={{ color: 'var(--text-secondary)' }}>
							<X size={20} />
						</button>

						{!sent ? (
							<div className="text-center">
								<div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.1 }}>
									<Sparkles size={32} style={{ color: 'var(--accent-gold)' }} />
								</div>
								<h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Rejoignez l'enchère</h2>
								<p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Entrez votre email pour miser en un clic.</p>

								<form onSubmit={handleMagicLink} className="space-y-4">
									<div className="relative">
										<Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-secondary)' }} />
										<input
											type="email" placeholder="nom@exemple.com" required
											value={email} onChange={(e) => setEmail(e.target.value)}
											className="w-full border rounded-lg py-3 pl-12 pr-4 outline-none transition-all"
											style={{
												backgroundColor: 'var(--bg-tertiary)',
												borderColor: 'var(--border-primary)',
												color: 'var(--text-primary)',
											}}
										/>
									</div>
									<button
										disabled={loading}
										className="w-full font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-50 text-white"
										style={{ backgroundColor: 'var(--accent-gold)' }}
									>
										{loading ? "Envoi..." : "Recevoir mon lien magique"}
									</button>
								</form>
							</div>
						) : (
							<div className="text-center py-8">
								<div className="text-5xl mb-4">📩</div>
								<h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Vérifiez vos emails</h2>
								<p style={{ color: 'var(--text-secondary)' }}>On vous a envoyé un lien magique pour vous connecter instantanément.</p>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}