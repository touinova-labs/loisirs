"use client";

import { motion } from "framer-motion";
import { ChevronLeft, UserCheck, EyeOff, ShieldAlert, Globe, Hammer, Terminal } from "lucide-react";
import Link from "next/link";

export default function CGUPage() {
    const sections = [
        {
            icon: <UserCheck size={20} />,
            title: "1. Accès au Cercle Privé",
            content: "L'accès aux offres de Loisirs-Privé est strictement réservé aux membres inscrits. Le compte est personnel et confidentiel. Toute activité suspecte ou partage de compte pourra entraîner une suspension immédiate des accès sans préavis."
        },
        {
            icon: <EyeOff size={20} />,
            title: "2. Confidentialité des Offres",
            content: "Les tarifs négociés et les conditions d'enchères affichées sur la plateforme sont confidentiels. Il est interdit de diffuser, capturer ou partager ces informations en dehors du cercle privé, notamment sur les réseaux sociaux ou sites de comparaison."
        },
        {
            icon: <Hammer size={20} />,
            title: "3. Usage de la Plateforme",
            content: "L'utilisateur s'engage à ne pas perturber le bon fonctionnement du système d'enchères. L'utilisation de robots (bots), de scripts ou de toute méthode automatisée pour placer des offres est formellement interdite et constitue un motif d'exclusion définitive."
        },
        {
            icon: <ShieldAlert size={20} />,
            title: "4. Rôle de l'Intermédiaire",
            content: "Loisirs-Privé fournit l'infrastructure technique permettant la mise en relation. Nous ne garantissons pas la disponibilité constante du service et ne saurions être tenus responsables des interruptions techniques indépendantes de notre volonté."
        },
        {
            icon: <Terminal size={20} />,
            title: "5. Données Personnelles",
            content: "Conformément au RGPD, vos données sont collectées uniquement pour la gestion de vos enchères et la mise en relation avec les hôtels. Vous disposez d'un droit d'accès et de suppression via votre profil ou par demande directe au support."
        },
        {
            icon: <Globe size={20} />,
            title: "6. Propriété Intellectuelle",
            content: "L'ensemble des contenus (textes, logos, photographies des hôtels) est protégé. Les photos utilisées pour illustrer les lots sont la propriété de nos partenaires hôteliers ou de Loisirs-Privé et ne peuvent être réutilisées sans autorisation."
        },
        {
            icon: <ShieldAlert size={20} />,
            title: "7. Modification des Conditions",
            content: "Loisirs-Privé se réserve le droit de modifier les présentes CGU à tout moment. La poursuite de l'utilisation de la plateforme après mise à jour vaut acceptation des nouvelles conditions."
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
                        <span style={{ color: "var(--accent-gold)" }}>d'Utilisation</span>
                    </h1>
                    <p className="text-sm opacity-60 italic" style={{ color: "var(--text-secondary)" }}>
                        Dernière mise à jour : 14 Mars 2026 — Accès Membres Privilégiés
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
                        Loisirs-Privé — Plateforme Technique de Mise en Relation
                    </p>
                </div>
            </div>
        </div>
    );
}