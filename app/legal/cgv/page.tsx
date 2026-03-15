"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Scale, Gavel, ShieldCheck, RefreshCcw, Landmark } from "lucide-react";
import Link from "next/link";

export default function CGVPage() {
    const sections = [
        {
            icon: <Landmark size={20} />,
            title: "1. Nature du Service (Mandat)",
            content: "Loisirs-Privé agit exclusivement en qualité d'apporteur d'affaires et de plateforme technologique de mise en relation. Nous ne sommes pas une agence de voyage. En validant une offre, vous mandatez Loisirs-Privé pour transmettre votre réservation à l'établissement partenaire aux tarifs négociés."
        },
        {
            icon: <Gavel size={20} />,
            title: "2. Enchères et Ventes Privées",
            content: "• L'Enchère : Système de prix ascendant. L'offre finale constitue un engagement ferme d'achat.\n• La Vente Privée : Achat immédiat à prix fixe dans la limite des stocks disponibles.\nDans les deux cas, le contrat de séjour lie exclusivement le Membre et l'établissement hôtelier."
        },
        {
            icon: <Scale size={20} />,
            title: "3. Le Prix de Réserve",
            content: "Certaines enchères comportent un 'Prix de Réserve' confidentiel fixé par l'hôtel. Si ce montant n'est pas atteint à la clôture, l'enchère est déclarée nulle et aucune transaction n'est effectuée. L'atteinte de ce prix est indiquée en temps réel sur l'interface."
        },
        {
            icon: <ShieldCheck size={20} />,
            title: "4. Paiement et Règlement",
            content: "Loisirs-Privé ne perçoit aucun fonds au titre de l'hébergement. Le montant total (incluant nos frais de service) est à régler directement à l'hôtelier, selon ses modalités : soit via un lien de paiement sécurisé transmis après l'offre, soit lors de votre arrivée sur place."
        },
        {
            icon: <Landmark size={20} />,
            title: "5. Taxes de Séjour et Extras",
            content: "Le prix final correspond uniquement à la prestation décrite. Les taxes de séjour (obligatoires) ainsi que les consommations personnelles (minibar, room-service, extras) sont à régler directement à l'hôtel et ne sont jamais incluses dans l'offre initiale."
        },
        {
            icon: <RefreshCcw size={20} />,
            title: "6. Engagement et Non-Rétractation",
            content: "Conformément à l'Art. L221-28 du Code de la Consommation, le droit de rétractation de 14 jours ne s'applique pas aux prestations d'hébergement à date déterminée. Toute offre confirmée est ferme, définitive et non-annulable."
        },
        {
            icon: <RefreshCcw size={20} />,
            title: "7. No-Show (Non-présentation)",
            content: "En cas de non-présentation à l'hôtel (No-Show), l'intégralité du montant de la réservation reste due à l'établissement. Le Membre s'engage à honorer son paiement auprès de l'hôtel partenaire sous peine de poursuites engagées par l'établissement."
        },
        {
            icon: <ShieldCheck size={20} />,
            title: "8. Responsabilités",
            content: "L'hôtelier est seul responsable de la qualité et de l'exécution du séjour. Loisirs-Privé décline toute responsabilité en cas de litige relatif à la prestation sur place, au confort ou à une éventuelle modification des services par l'établissement."
        }
    ];

    return (
        <div className="min-h-screen py-20 px-6" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="max-w-3xl mx-auto">
                {/* Navigation */}
                <Link href="/onboarding" className="flex items-center gap-2 mb-10 opacity-60 hover:opacity-100 transition-opacity">
                    <ChevronLeft size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Retour à l'onboarding</span>
                </Link>

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-black italic mb-4" style={{ color: "var(--text-primary)" }}>
                        Conditions Générales <br />
                        <span style={{ color: "var(--accent-gold)" }}>de Vente</span>
                    </h1>
                    <p className="text-sm opacity-60 italic" style={{ color: "var(--text-secondary)" }}>
                        Version applicable au 14 Mars 2026 — Modèle Intermédiation B2B
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-12"
                        >
                            <div
                                className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border"
                                style={{ borderColor: "var(--border-primary)", color: "var(--accent-gold)", backgroundColor: "var(--bg-secondary)" }}
                            >
                                {section.icon}
                            </div>
                            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                                {section.title}
                            </h2>
                            <div className="text-sm leading-relaxed opacity-70 whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                                {section.content}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Footer Legal */}
                <div className="mt-20 pt-10 border-t border-[var(--border-primary)] text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
                        Loisirs-Privé — Cercle Privé d'Expériences
                    </p>
                </div>
            </div>
        </div>
    );
}