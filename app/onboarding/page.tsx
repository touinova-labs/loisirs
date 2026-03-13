"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/app/providers/ThemeProvider";
import Toast from "@/components/Toast";
import { Check } from "lucide-react"; // Import pour l'icône de validation

type ToastType = 'error' | 'success' | null;

export default function OnboardingPage() {
	const router = useRouter();
	const { theme } = useTheme();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ firstName: "", lastName: "" });
	const [acceptedTerms, setAcceptedTerms] = useState(false); // État pour la checkbox
	const [acceptedNewsletter, setAcceptedNewsletter] = useState(false); // État pour la checkbox
	const [toast, setToast] = useState<{ message: string; type: ToastType }>({ message: "", type: null });

	const isLuxe = theme === "theme-luxe";

	useEffect(() => {
		if (toast.type) {
			const timer = setTimeout(() => {
				setToast({ message: "", type: null });
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!acceptedTerms) {
			setToast({ message: "Veuillez accepter les mentions légales", type: "error" });
			return;
		}

		setLoading(true);

		try {
			const { data: { user } } = await supabase.auth.getUser();

			if (!user) {
				setToast({ message: "Vous devez être authentifié pour continuer", type: "error" });
				setLoading(false);
				return;
			}

			const response = await fetch("/api/update-profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user.id,
					firstName: formData.firstName,
					lastName: formData.lastName,
					acceptedNewsletter: acceptedNewsletter
				}),
			});

			const result = await response.json();

			if (result.success) {
				setToast({ message: "Votre profil a été mis à jour avec succès !", type: "success" });
				setTimeout(() => router.push("/"), 1500);
			} else {
				setToast({ message: result.error || "Une erreur est survenue", type: "error" });
			}
		} catch (error) {
			setToast({ message: "Une erreur inattendue s'est produite", type: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300"
			style={{ backgroundColor: "var(--bg-primary)" }}
		>
			<div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at center, var(--accent-gold) 0%, transparent 70%)` }} />

			<div className="w-full max-w-sm z-10">
				<div className="text-center mb-10">
					<span className="text-2xl font-bold tracking-[8px]" style={{ color: "var(--accent-gold)" }}>L/P</span>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="p-8 rounded-xl shadow-lg border"
					style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-primary)" }}
				>
					<h1 className="text-2xl font-semibold mb-2 text-center" style={{ color: "var(--text-primary)" }}>
						Validez votre invitation
					</h1>
					<p className="text-sm text-center mb-8" style={{ color: "var(--text-secondary)" }}>
						L'art de séjourner dans le luxe au meilleur prix.
					</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* First Name */}
						<div>
							<label className="text-[10px] uppercase tracking-widest ml-1" style={{ color: "var(--text-tertiary)" }}>Prénom</label>
							<input
								required
								type="text"
								className="w-full p-3 rounded-lg outline-none transition-all mt-1"
								style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
								onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
							/>
						</div>

						{/* Last Name */}
						<div>
							<label className="text-[10px] uppercase tracking-widest ml-1" style={{ color: "var(--text-tertiary)" }}>Nom</label>
							<input
								required
								type="text"
								className="w-full p-3 rounded-lg outline-none transition-all mt-1"
								style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
								onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
							/>
						</div>

						{/* Checkbox Mentions Légales */}
						{/* Section Consentements */}
						<div className="space-y-3 pt-2">
							{/* 1. Mentions Légales & CGV (Obligatoire) */}
							<div
								className="flex items-start gap-3 group cursor-pointer"
								onClick={() => setAcceptedTerms(!acceptedTerms)}
							>
								<div
									className="mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-all duration-200"
									style={{
										backgroundColor: acceptedTerms ? "var(--accent-gold)" : "var(--bg-tertiary)",
										borderColor: acceptedTerms ? "var(--accent-gold)" : "var(--border-primary)"
									}}
								>
									{acceptedTerms && <Check size={10} color={isLuxe ? "white" : "black"} strokeWidth={4} />}
								</div>
								<p className="text-[10px] leading-relaxed select-none" style={{ color: "var(--text-secondary)" }}>
									J'accepte les{" "}
									<a
										href="/mentions-legales"
										target="_blank"
										className="underline hover:text-[var(--accent-gold)] transition-colors"
										style={{ color: "var(--text-primary)" }}
										onClick={(e) => e.stopPropagation()} // Empêche de cocher la case en cliquant ici
									>
										mentions légales
									</a>
									, les{" "}
									<a
										href="/cgv"
										target="_blank"
										className="underline hover:text-[var(--accent-gold)] transition-colors"
										style={{ color: "var(--text-primary)" }}
										onClick={(e) => e.stopPropagation()}
									>
										CGV
									</a>{" "}
									et je reconnais que chaque enchère posée constitue un engagement d'achat ferme.
								</p>
							</div>

							{/* 2. Newsletter (Optionnel - Standard de Luxe) */}
							<div
								className="flex items-start gap-3 group cursor-pointer"
								onClick={() => setAcceptedNewsletter(!acceptedNewsletter)}
							>
								<div
									className="mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-all duration-200"
									style={{
										backgroundColor: acceptedNewsletter ? "var(--accent-gold)" : "var(--bg-tertiary)",
										borderColor: acceptedNewsletter ? "var(--accent-gold)" : "var(--border-primary)"
									}}
								>
									{acceptedNewsletter && <Check size={10} color={isLuxe ? "white" : "black"} strokeWidth={4} />}
								</div>
								<p className="text-[10px] leading-relaxed select-none" style={{ color: "var(--text-secondary)" }}>
									Je souhaite recevoir les invitations exclusives et les alertes de ventes privées par email.
								</p>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading || !formData.firstName || !formData.lastName || !acceptedTerms}
							className="w-full font-bold py-4 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 mt-4"
							style={{
								backgroundColor: "var(--accent-gold)",
								color: isLuxe ? "var(--bg-primary)" : "var(--text-primary)",
							}}
						>
							{loading ? "ACTIVATION..." : "Rejoignez le cercle"}
						</button>
					</form>
				</motion.div>

				{/* Footer Info */}
				<div className="mt-8 flex items-center justify-center gap-4 opacity-60" style={{ color: "var(--text-tertiary)" }}>
					<span className="text-[10px] uppercase tracking-tighter">Tarifs Négociés</span>
					<span className="w-1 h-1 rounded-full bg-current" />
					<span className="text-[10px] uppercase tracking-tighter">Enchères de Prestige</span>
				</div>
			</div>

			<Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: null })} />
		</div>
	);
}