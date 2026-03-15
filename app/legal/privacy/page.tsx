"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Lock, Eye, Share2, Database, UserCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: <Database size={20} />,
            title: "1. Collecte des Données",
            content: "Nous collectons les informations nécessaires à la création de votre compte et à la gestion de vos réservations : nom, prénom, adresse e-mail, et historique de vos enchères ou achats. Ces données sont collectées lors de votre onboarding."
        },
        {
            icon: <Share2 size={20} />,
            title: "2. Transmission aux Partenaires",
            content: "En tant qu'apporteur d'affaires, Loisirs-Privé transmet vos nom, prénom et e-mail à l'établissement hôtelier concerné par votre réservation. Cette transmission est indispensable pour que l'hôtel puisse valider votre séjour et vous identifier lors de votre arrivée."
        },
        {
            icon: <Lock size={20} />,
            title: "3. Sécurité des Paiements",
            content: "Loisirs-Privé ne stocke aucune coordonnée bancaire. Les paiements sont effectués soit directement auprès de l'hôtel, soit via des interfaces bancaires sécurisées tierces. Nous utilisons le protocole SSL pour chiffrer toutes les communications sur la plateforme."
        },
        {
            icon: <Eye size={20} />,
            title: "4. Finalités du Traitement",
            content: "Vos données sont utilisées pour : \n• Gérer vos participations aux enchères.\n• Vous envoyer vos bons d'invitation (Vouchers).\n• Vous informer des nouvelles ventes privées (si consenti).\n• Assurer le support client."
        },
        {
            icon: <UserCheck size={20} />,
            title: "5. Vos Droits (RGPD)",
            content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données. Vous pouvez exercer ces droits à tout moment en nous contactant via les paramètres de votre compte ou par e-mail."
        },
        {
            icon: <ShieldCheck size={20} />,
            title: "6. Conservation des Données",
            content: "Vos données personnelles sont conservées pendant toute la durée de votre adhésion au cercle Loisirs-Privé et supprimées après 3 ans d'inactivité, sauf obligation légale de conservation."
        }
    ];

    return (
        <div className="min-h-screen py-20 px-6" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="max-w-3xl mx-auto">
                {/* Retour */}
                <Link href="/onboarding" className="flex items-center gap-2 mb-10 opacity-60 hover:opacity-100 transition-opacity">
                    <ChevronLeft size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Retour</span>
                </Link>

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-black italic mb-4" style={{ color: "var(--text-primary)" }}>
                        Politique de <br/>
                        <span style={{ color: "var(--accent-gold)" }}>Confidentialité</span>
                    </h1>
                    <p className="text-sm opacity-60 italic" style={{ color: "var(--text-secondary)" }}>
                        Conformité RGPD — Mise à jour le 15 Mars 2026
                    </p>
                </div>

                {/* Contenu */}
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
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

                {/* Footer */}
                <div className="mt-20 pt-10 border-t border-[var(--border-primary)] text-center">
                    <p className="text-[10px] uppercase tracking-widest opacity-40">
                        Protection des données — Loisirs-Privé &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

// Pour éviter les erreurs d'icônes manquantes
function ShieldCheck({ size }: { size: number }) {
    return <Lock size={size} />;
}