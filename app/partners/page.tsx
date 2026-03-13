'use client'

import { ShieldCheck, TrendingUp, ArrowRight, Zap, Globe, Gavel, CheckCircle2, Award, MousePointerClick } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:opacity-30" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Navbar user={null} onAuthClick={() => { }} />

            {/* --- HERO : DISCRÉTION & IMAGE --- */}
            <section className="relative h-[95vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] blur-[180px] rounded-full opacity-30" style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)' }} />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                    {/* Le Titre : Impactant mais professionnel */}
                    <h1 className="text-7xl md:text-[140px] font-black italic uppercase tracking-tighter leading-[0.8] text-center mb-16 select-none" style={{ color: 'var(--text-primary)' }}>
                        <span className="block">Vendez mieux,</span>
                        <span className="block drop-shadow-lg" style={{ color: 'var(--accent-gold)' }}>En discrétion<span style={{ color: 'var(--text-primary)' }}>.</span></span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl w-full border-t pt-16" style={{ borderColor: 'var(--border-primary)' }}>
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                                Protégez votre <br /> <span style={{ color: 'var(--accent-gold)' }}>image de marque</span>.
                            </h2>
                            <p className="font-bold italic text-xs md:text-sm uppercase tracking-widest max-w-md" style={{ color: 'var(--text-secondary)' }}>
                                Une audience privée pour écouler vos stocks sans impacter votre grille tarifaire publique.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 lg:items-end">
                            <Link href="mailto:partners@loisirsprive.fr" className="h-20 w-full lg:w-80 rounded-lg flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all duration-500 group shadow-md text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                                Devenir Partenaire
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-secondary)' }}>
                                <span>Ventes Confidentielles</span>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} />
                                <span>Respect de la Parité</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* --- ARGUMENTS : LA STRATÉGIE ACCESSIBLE --- */}
            <section className="py-40 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Image Préservée</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Évitez le déstockage public massif qui dévalue votre établissement. Notre accès membre sécurisé protège votre image tout en écoulant vos disponibilités discrètement.
                        </p>
                    </div>

                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Revenu Additionnel</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Chaque nuitée non vendue est perdue. Nous transformons vos chambres vacantes en chiffre d'affaires immédiat sans bousculer votre organisation habituelle.
                        </p>
                    </div>

                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Visibilité Qualifiée</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Profitez d'une mise en avant auprès d'une audience de voyageurs actifs et curieux. Gagnez de nouveaux clients qui ne vous auraient pas trouvé via les plateformes standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2 : FORMATS SIMPLES --- */}
            <section className="py-32 rounded-3xl md:rounded-[4rem]" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', boxShadow: '0 -20px 80px rgba(0,0,0,0.05)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Vendez vite, <br /><span style={{ color: 'var(--accent-gold)' }}>vendez mieux.</span></h2>
                        <p className="font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-secondary)' }}>Deux formats adaptés à vos stocks</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ENCHÈRES */}
                        <div className="p-12 border rounded-2xl hover:scale-102 transition-transform duration-500" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Gavel size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">L'Enchère</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    Idéal pour vos chambres premium ou vos packs séjours. Créez l'événement et laissez nos membres se disputer vos meilleures dates.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Prix de réserve défini par vous', 'Dynamisme de vente', 'Mise en avant visuelle forte'].map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} /> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* VENTE FLASH */}
                        <div className="p-12 border rounded-2xl hover:scale-102 transition-transform duration-500 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Zap size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">Le Flash</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    Pour vos disponibilités de dernière minute. Un prix attractif, une durée limitée : l'outil parfait pour remplir vos chambres vides en 48h.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Écoulement rapide', 'Liberté totale sur les dates', 'Flux de trésorerie direct'].map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} /> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3 : LE MODÈLE SANS RISQUE --- */}
            <section className="py-48 max-w-6xl mx-auto px-6 space-y-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute -left-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>01</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Zéro risque, <br /> <span style={{ fontSize: '1.2em', color: 'var(--accent-gold)' }}>Pur résultat.</span>
                        </h2>
                    </div>
                    <div className="space-y-6 border-l-2 pl-10" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Pas d'abonnement, pas de frais d'inscription. Nous nous rémunérons uniquement sur les ventes réalisées.
                        </p>
                        <p className="text-sm font-bold italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Nous prenons en charge la communication et la promotion de vos offres. Si vous ne vendez rien, vous ne payez rien. C'est un partenariat gagnant-gagnant.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-6 border-r-2 pr-10 text-right" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            LoisirsPrivé sélectionne des établissements de qualité pour garantir une expérience membre homogène et valorisante.
                        </p>
                        <p className="text-sm font-bold italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            En rejoignant notre sélection, vous côtoyez les meilleures adresses régionales, renforçant la confiance des clients envers votre établissement.
                        </p>
                    </div>
                    <div className="relative text-right md:text-left">
                        <div className="absolute -right-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>02</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Une sélection <br /> d'Hôtels <br /> <span style={{ fontSize: '1.2em', color: 'var(--accent-gold)' }}>De Qualité.</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* --- CTA : FINAL --- */}
            <section className="py-40 border-t" style={{ backgroundColor: `linear-gradient(to top, rgba(251, 191, 36, 0.03), transparent)`, borderColor: 'var(--border-primary)' }}>
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]" style={{ color: 'var(--text-primary)' }}>
                        Prêt à booster <br /> <span style={{ color: 'var(--accent-gold)' }}>votre remplissage ?</span>
                    </h2>
                    <div className="pt-10 flex flex-col items-center gap-6">
                        <Link href="mailto:partners@loisirsprive.fr" className="h-24 px-16 rounded-2xl flex items-center gap-6 text-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                            Nous Contacter
                            <ArrowRight size={28} />
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] italic" style={{ color: 'var(--text-secondary)' }}>Partenariats 2026 Ouverts</p>
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t text-center" style={{ borderColor: 'var(--border-primary)' }}>
                <p className="text-[9px] font-black uppercase tracking-[0.6em]" style={{ color: 'var(--text-secondary)' }}>LoisirsPrivé Partenaires © 2026</p>
            </footer>
        </main>
    )
}