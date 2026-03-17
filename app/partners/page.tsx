'use client'

import { ShieldCheck, TrendingUp, ArrowRight, Zap, Globe, Gavel, CheckCircle2, Award, MousePointerClick, BarChart3, Lock, CalendarClock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:opacity-30" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Navbar user={null} onAuthClick={() => { }} />

            {/* --- HERO : PERFORMANCE & DISCRÉTION --- */}
            <section className="relative h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] blur-[180px] rounded-full opacity-30" style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)' }} />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-[90px] font-black italic uppercase tracking-tighter leading-[0.9] mb-12 select-none" style={{ color: 'var(--text-primary)' }}>
                        Accélérateur de <br />
                        <span className="drop-shadow-lg" style={{ color: 'var(--accent-gold)' }}>RevPAR</span> <span style={{ color: 'var(--text-primary)' }}>Discret</span>
                    </h1>

                    <p className="font-bold italic text-sm md:text-base uppercase tracking-widest max-w-xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Activez un flux de réservation supplémentaire tout en gardant vos tarifs publics intacts et votre distribution sous contrôle.
                    </p>

                    <Link href="mailto:partenaires@loisirs-prive.fr" className="h-20 px-12 rounded-lg flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-md text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                        Contacter un Partenaire
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* --- ARGUMENTS --- */}
            <section className="py-32 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-center">
                    <div className="space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-lg border flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <CalendarClock size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Planification</h3>
                        <p className="text-sm font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Remplissez vos chambres sur les périodes stratégiques, uniquement auprès des bons clients.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-lg border flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <BarChart3 size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Yield Dynamique</h3>
                        <p className="text-sm font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Maximisez le taux d’occupation sans cannibaliser vos ventes classiques. Valorisez vos suites et chambres selon leur rareté.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-lg border flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <CheckCircle2 size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Réservations Fermes</h3>
                        <p className="text-sm font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Chaque réservation est définitive et sécurisée. Revenus garantis, zéro annulation ou no-show.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FORMATS --- */}
            <section className="py-32 rounded-3xl md:rounded-[4rem]" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', boxShadow: '0 -20px 80px rgba(0,0,0,0.05)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Deux leviers de <span style={{ color: 'var(--accent-gold)' }}>performance</span></h2>
                        <p className="font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-secondary)' }}>Choisissez la technique adaptée à vos stocks</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VENTE PRIVÉE */}
                        <div className="p-12 border rounded-2xl hover:scale-102 transition-transform duration-500 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Award size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">Vente Privée</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    Remplissez vos semaines creuses à prix fixe, en toute prévisibilité et contrôle.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Volume garanti', 'Visibilité ciblée', 'Marketing dédié'].map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} /> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ENCHÈRES FLASH */}
                        <div className="p-12 border rounded-2xl hover:scale-102 transition-transform duration-500" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Gavel size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">Enchère Flash</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    Maximisez la valeur de vos suites rares. Créez de l’urgence auprès d’acheteurs qualifiés.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Prix de réserve confidentiel', 'Revenus supplémentaires possibles', 'Positionnement Premium'].map((t, i) => (
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

            {/* --- SECTION SÉLECTION --- */}
            <section className="py-40 max-w-6xl mx-auto px-6 space-y-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute -left-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>01</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Paiement Direct <br /> <span style={{ fontSize: '1.2em', color: 'var(--accent-gold)' }}>Zéro Attente</span>
                        </h2>
                    </div>
                    <div className="space-y-6 border-l-2 pl-10" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Le client règle directement auprès de votre établissement. Vous gardez la main sur la trésorerie et la relation client.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-6 border-r-2 pr-10 text-right" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Sélection d’hôtels 4* et 5* pour assurer la qualité de service et la valorisation mutuelle.
                        </p>
                    </div>
                    <div className="relative text-right md:text-left">
                        <div className="absolute -right-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>02</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Cercle d'Hôtels <br /> <span style={{ fontSize: '1.2em', color: 'var(--accent-gold)' }}>D'Exception</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-32 border-t" style={{ backgroundColor: `linear-gradient(to top, rgba(251, 191, 36, 0.03), transparent)`, borderColor: 'var(--border-primary)' }}>
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85]" style={{ color: 'var(--text-primary)' }}>
                        Prêt à booster <br /> <span style={{ color: 'var(--accent-gold)' }}>votre RevPAR ?</span>
                    </h2>
                    <div className="pt-10 flex flex-col items-center gap-6">
                        <Link href="mailto:partenaires@loisirs-prive.fr" className="h-20 px-12 rounded-2xl flex items-center gap-6 text-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                            Devenir Partenaire
                            <ArrowRight size={28} />
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] italic" style={{ color: 'var(--text-secondary)' }}>Accès réservé aux professionnels</p>
                    </div>
                </div>
            </section>
        </main>
    )
}