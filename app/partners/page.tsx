'use client'

import { ShieldCheck, TrendingUp, ArrowRight, Zap, Globe, Gavel, CheckCircle2, Award, MousePointerClick } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PartnersPage() {
    return (
        <main className="min-h-screen selection:opacity-30" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Navbar user={null} onAuthClick={() => { }} />

            {/* --- HERO : LE PLEIN SEREIN --- */}
            <section className="relative h-[95vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] blur-[180px] rounded-full opacity-40 animate-pulse" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }} />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                    <h1 className="text-8xl md:text-[190px] font-black italic uppercase tracking-tighter leading-[0.75] text-center mb-16 select-none" style={{ color: 'var(--text-primary)' }}>
                        <span className="block">Le Plein</span>
                        <span className="block drop-shadow-lg" style={{ color: 'var(--accent-gold)' }}>Serein<span style={{ color: 'var(--text-primary)' }}>.</span></span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl w-full border-t pt-16" style={{ borderColor: 'var(--border-primary)' }}>
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                                Ici, on ne <span style={{ color: 'var(--accent-gold)' }}>brade</span> pas.
                            </h2>
                            <p className="font-bold italic text-xs md:text-sm uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                                Nous valorisons vos actifs résiduels.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 lg:items-end">
                            <Link href="mailto:partners@loisirsprive.fr" className="h-20 w-full lg:w-80 rounded-lg flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all duration-500 group shadow-md text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                                Rejoindre le Cercle
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-secondary)' }}>
                                <span>Accès Sélectif</span>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }} />
                                <span>Étude sous 24h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ARGUMENTS : LA STRATÉGIE --- */}
            <section className="py-40 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Sanctuaire de Marque</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Le déstockage public détruit la valeur perçue. Notre modèle en club privé protège votre grille tarifaire. Le client ne vient pas pour un "rabais", il se bat pour une opportunité exclusive que seul notre écosystème propose.
                        </p>
                    </div>

                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Yield Intelligent</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Une chambre ou une table vide est une perte irrécupérable. Nous convertissons vos actifs dormants en cash-flow immédiat. Optimisez votre remplissage sans effort opérationnel et sans risque financier.
                        </p>
                    </div>

                    <div className="group space-y-6">
                        <div className="w-14 h-14 rounded-lg border flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)', color: 'var(--accent-gold)' }}>
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-bold uppercase italic tracking-tighter" style={{ color: 'var(--text-primary)' }}>Marketing d'Exception</h3>
                        <p className="text-[13px] font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                            Chaque mise en ligne est une campagne de branding. Nous scénarisons votre savoir-faire auprès d'une audience CSP+ ultra-sélective. Gagnez en notoriété auprès de clients que les canaux traditionnels ne captent plus.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2 : FORMATS DYNAMIQUES --- */}
            <section className="py-32 rounded-3xl md:rounded-[4rem]" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', boxShadow: '0 -20px 80px rgba(0,0,0,0.1)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Deux leviers, <br/><span style={{ color: 'var(--accent-gold)' }}>une efficacité.</span></h2>
                        <p className="font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-secondary)' }}>Agilité commerciale sur-mesure</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ENCHÈRES */}
                        <div className="p-12 border rounded-2xl hover:scale-105 transition-transform duration-500" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Gavel size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">L'Enchère</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    Le format souverain pour vos produits signatures. Créez la rareté, suscitez la compétition et laissez le marché définir le prix juste de vos plus belles expériences.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Prix de réserve garanti', 'Engagement émotionnel fort', 'Maximisation du panier moyen'].map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-gold)' }} /> {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* VENTE FLASH */}
                        <div className="p-12 border rounded-2xl hover:scale-105 transition-transform duration-500 shadow-lg" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
                            <div className="space-y-8">
                                <div className="flex items-center gap-5" style={{ color: 'var(--accent-gold)' }}>
                                    <Zap size={48} strokeWidth={2.5} />
                                    <span className="text-5xl font-black italic uppercase tracking-tighter">Le Flash</span>
                                </div>
                                <p className="font-bold italic leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                                    La réponse chirurgicale à vos disponibilités immédiates. Un stock, un prix, un chrono : videz vos inventaires de dernière minute en quelques heures seulement.
                                </p>
                                <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                    {['Écoulement de stock rapide', 'Urgence d\'achat garantie', 'Gestion temps réel'].map((t, i) => (
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

            {/* --- SECTION 3 : LE MODÈLE --- */}
            <section className="py-48 max-w-6xl mx-auto px-6 space-y-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute -left-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>01</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Le succès <br /> à la <span style={{ fontSize: '1.5em', color: 'var(--accent-gold)' }}>Performance.</span>
                        </h2>
                    </div>
                    <div className="space-y-6 border-l-2 pl-10" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Nous ne croyons ni aux abonnements, ni aux frais cachés. Notre rémunération est indexée sur votre résultat. 
                        </p>
                        <p className="text-sm font-bold italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            C'est notre promesse d'excellence : nous investissons dans le marketing de votre établissement avant même de percevoir le moindre euro. Nous gagnons quand vous gagnez.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-6 border-r-2 pr-10 text-right" style={{ borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                        <p className="text-lg font-medium italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            LoisirsPrivé n'est pas un annuaire, c'est une collection. Nous filtrons chaque partenariat pour garantir un voisinage de prestige.
                        </p>
                        <p className="text-sm font-bold italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            En rejoignant notre écosystème, vous bénéficiez de l'aura des plus beaux établissements de la région, créant une confiance immédiate chez nos membres.
                        </p>
                    </div>
                    <div className="relative text-right md:text-left">
                        <div className="absolute -right-10 -top-10 text-[120px] font-black select-none uppercase italic opacity-5" style={{ color: 'var(--text-primary)' }}>02</div>
                        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none relative z-10" style={{ color: 'var(--text-primary)' }}>
                            Le Club des <br /> Établissements <br /> <span style={{ fontSize: '1.5em', color: 'var(--accent-gold)' }}>Sélectifs.</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* --- CTA : FINAL --- */}
            <section className="py-40 border-t" style={{ backgroundColor: `linear-gradient(to top, rgba(251, 191, 36, 0.05), transparent)`, borderColor: 'var(--border-primary)' }}>
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.2)' }}>
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-gold)' }}></span>
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent-gold)' }}></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] italic" style={{ color: 'var(--accent-gold)' }}>Session 2026 Ouverte</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]" style={{ color: 'var(--text-primary)' }}>
                        Prêt à remplir <br/> <span style={{ color: 'var(--accent-gold)' }}>autrement ?</span>
                    </h2>
                    <div className="pt-10 flex flex-col items-center gap-6">
                        <Link href="mailto:partners@loisirsprive.fr" className="h-24 px-20 rounded-3xl flex items-center gap-6 text-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl text-white" style={{ backgroundColor: 'var(--accent-gold)' }}>
                            Nous Contacter
                            <ArrowRight size={28} />
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] italic" style={{ color: 'var(--text-secondary)' }}>Discrétion & Efficacité Garanties</p>
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t text-center" style={{ borderColor: 'var(--border-primary)' }}>
                <p className="text-[9px] font-black uppercase tracking-[0.6em]" style={{ color: 'var(--text-secondary)' }}>LoisirsPrivé Branding Dept © 2026</p>
            </footer>
        </main>
    )
}