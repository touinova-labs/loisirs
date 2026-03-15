"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Info, Building2, Server, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function LegalNoticesPage() {
    const sections = [
        {
            icon: <Building2 size={20} />,
            title: "1. Éditeur du Site",
            content: `Le site Loisirs-Privé est édité par TOUINA ATTEF.\nSiège social : BUREAU 326
78 AVENUE DES CHAMPS ELYSEES
PARIS - 75008
France (FR)\nSIREN : 944 515 063`
        },
        {
            icon: <Server size={20} />,
            title: "2. Hébergement",
            content: "Le site est hébergé par Vercel Inc.\nAdresse : 440 N Barranca Ave #4133 Covina, CA 91723\nSite Web : www.vercel.com"
        },
        {
            icon: <Globe size={20} />,
            title: "3. Propriété Intellectuelle",
            content: "L'ensemble du contenu (textes, logos, design, code source) est la propriété exclusive de Loisirs-Privé. Toute reproduction ou diffusion, même partielle, est interdite sans autorisation préalable."
        },
        {
            icon: <Mail size={20} />,
            title: "4. Contact",
            content: "Pour toute question relative au site ou à vos réservations, vous pouvez nous contacter à l'adresse email suivante : \ncontact@loisirs-prive.com"
        },
        {
            icon: <Info size={20} />,
            title: "5. Cookies",
            content: "Le site utilise des cookies techniques strictement nécessaires au fonctionnement de la plateforme (connexion, panier, préférences de thèmes). Aucun cookie de traçage publicitaire n'est déposé sans votre consentement."
        }
    ];

    return (
        <div className="min-h-screen py-20 px-6" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="max-w-3xl mx-auto">
                {/* Navigation */}
                <Link href="/onboarding" className="flex items-center gap-2 mb-10 opacity-60 hover:opacity-100 transition-opacity">
                    <ChevronLeft size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Retour</span>
                </Link>

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-black italic mb-4" style={{ color: "var(--text-primary)" }}>
                        Mentions <br/>
                        <span style={{ color: "var(--accent-gold)" }}>Légales</span>
                    </h1>
                    <p className="text-sm opacity-60 italic" style={{ color: "var(--text-secondary)" }}>
                        En vigueur au 15 Mars 2026
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
                        L/P — Transparence et Professionnalisme
                    </p>
                </div>
            </div>
        </div>
    );
}