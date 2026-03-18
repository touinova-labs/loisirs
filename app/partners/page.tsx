'use client'

import { Lock, Banknote, ShieldCheck, BarChart3, ArrowRight, EyeOff, Users, Layers } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const TextSecondary: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <p className={`text-sm ${className}`} style={{ color: 'var(--text-secondary)' }}>
        {children}
    </p>
)

export default function PartnersPage() {

    const objections = [
        {
            icon: <EyeOff size={26} />,
            title: "Aucune exposition publique",
            text: "Vos tarifs ne sont jamais visibles, indexés ou comparables en ligne."
        },
        {
            icon: <ShieldCheck size={26} />,
            title: "Aucun impact sur votre image",
            text: "Aucune perception de discount. Vos offres restent confidentielles."
        },
        {
            icon: <Layers size={26} />,
            title: "Canal totalement isolé",
            text: "N’interfère ni avec vos OTA, ni avec votre site direct."
        },
        {
            icon: <Banknote size={26} />,
            title: "Aucune cannibalisation",
            text: "Accessible uniquement à un cercle restreint, non substituable."
        },
        {
            icon: <Users size={26} />,
            title: "Audience contrôlée",
            text: "Accès filtré, pas de clientèle “discount”."
        },
        {
            icon: <BarChart3 size={26} />,
            title: "Aucun impact pricing",
            text: "Votre stratégie tarifaire reste intacte."
        }
    ]

    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <Navbar user={null} onAuthClick={() => { }} />

            {/* HERO */}
            <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6 border-b"
                style={{ borderColor: 'var(--border-primary)' }}>

                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight leading-[0.9] mb-6">
                    Activez un canal privé <br />
                    <span style={{ color: 'var(--accent-gold)' }}>
                        sans exposer vos tarifs
                    </span>
                </h1>

                <TextSecondary className="max-w-xl text-sm md:text-base font-medium italic mb-10">
                    Un canal fermé pour valoriser vos disponibilités non publiques,
                    sans impact sur votre image, vos prix ou vos partenaires.
                </TextSecondary>

                <Link
                    href="mailto:collaboration@loisirs-prive.fr"
                    className="px-10 py-5 text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'black' }}
                >
                    Activer un test confidentiel
                    <ArrowRight size={16} />
                </Link>
            </section>

            {/* CE QUE NOUS NE SOMMES PAS */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ce que nous ne sommes pas
                    </h2>

                    <div className="space-y-3 text-sm italic">
                        <TextSecondary>Pas une OTA</TextSecondary>
                        <TextSecondary>Pas un canal discount</TextSecondary>
                        <TextSecondary>Pas une marketplace publique</TextSecondary>
                    </div>

                    <p className="pt-6 font-semibold">
                        Un canal fermé conçu pour préserver votre image.
                    </p>
                </div>
            </section>

            {/* OBJECTIONS */}
            <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="max-w-6xl mx-auto">

                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Conçu pour répondre à vos contraintes
                        </h2>
                        <TextSecondary>
                            Chaque aspect est pensé pour éviter les risques classiques de distribution.
                        </TextSecondary>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {objections.map((o, i) => (
                            <div key={i} className="space-y-4">
                                <div style={{ color: 'var(--accent-gold)' }}>
                                    {o.icon}
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest">
                                    {o.title}
                                </h3>
                                <TextSecondary>{o.text}</TextSecondary>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMENT ÇA MARCHE */}
            <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16">
                        Un fonctionnement simple, sous contrôle total
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10 text-left">

                        {/* Étape 1 */}
                        <div className="flex gap-4 items-start p-4 border rounded-xl bg-[var(--bg-secondary)] shadow-sm">
                            <div className="text-[var(--accent-gold)] text-2xl font-bold">01</div>
                            <div>
                                <h3 className="font-bold mb-1">Choisissez quand activer</h3>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Sélectionnez dates et chambres invendues uniquement. <strong>Contrôle total sur votre inventaire</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Étape 2 */}
                        <div className="flex gap-4 items-start p-4 border rounded-xl bg-[var(--bg-secondary)] shadow-sm">
                            <div className="text-[var(--accent-gold)] text-2xl font-bold">02</div>
                            <div>
                                <h3 className="font-bold mb-1">Fixez un prix minimum</h3>
                                <TextSecondary>
                                    <strong>Ce prix inclut notre commission</strong> mais reste toujours inférieur ou égal au tarif public.
                                    Le membre reçoit une offre attractive et satisfaisante,
                                    sans jamais voir ni comparer les tarifs avant réservation.
                                    Vous remplissez vos chambres invendues tout en préservant votre image et vos revenus.
                                </TextSecondary>
                            </div>
                        </div>

                        {/* Étape 3 */}
                        <div className="flex gap-4 items-start p-4 border rounded-xl bg-[var(--bg-secondary)] shadow-sm">
                            <div className="text-[var(--accent-gold)] text-2xl font-bold">03</div>
                            <div>
                                <h3 className="font-bold mb-1">Validez visuels et expérience</h3>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Photos, descriptions et informations validées avant publication. <strong>Tout reste confidentiel jusqu’à réservation</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Étape 4 */}
                        <div className="flex gap-4 items-start p-4 border rounded-xl bg-[var(--bg-secondary)] shadow-sm">
                            <div className="text-[var(--accent-gold)] text-2xl font-bold">04</div>
                            <div>
                                <h3 className="font-bold mb-1">Paiement direct et confirmation</h3>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Réservation confirmée une fois le seuil atteint. <strong>Paiement direct à l’hôtel</strong>, vous gardez le contrôle total.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Conclusion */}
                    <div className="pt-10">
                        <p className="text-lg font-semibold italic">
                            Contrôle total sur dates, prix et visuels. Aucune exposition publique, aucune comparaison, aucune cannibalisation.
                        </p>
                    </div>
                </div>
            </section>

            {/* FORMAT CONFIDENTIEL POUR ÉVITER LA CANNIBALISATION */}
            <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="max-w-5xl mx-auto space-y-16">

                    {/* HEADER */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Un format conçu pour éviter toute cannibalisation
                        </h2>

                        <TextSecondary className="italic">
                            Certaines disponibilités sont proposées sous un format confidentiel :
                            l’expérience est décrite, mais l’établissement n’est pas identifiable avant validation.
                        </TextSecondary>
                    </div>

                    <div className="relative">

                        {/* Ligne verticale */}
                        <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--border-primary)] transform -translate-x-1/2" />

                        <div className="space-y-16">

                            {/* ITEM 1 */}
                            <div className="relative grid md:grid-cols-2 gap-8 items-center">
                                <div className="md:text-right">
                                    <h3 className="font-bold">Aucune comparaison possible</h3>
                                    <TextSecondary>
                                        Votre établissement n’étant pas visible, vos tarifs ne peuvent être comparés à vos canaux publics.
                                    </TextSecondary>
                                </div>

                                <div />

                                {/* Point */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-md" />
                            </div>

                            {/* ITEM 2 */}
                            <div className="relative grid md:grid-cols-2 gap-8 items-center">
                                <div />

                                <div>
                                    <h3 className="font-bold">Une audience différente</h3>
                                    <TextSecondary>
                                        Nos membres ne recherchent pas un établissement précis ni une comparaison de prix.
                                        Ils explorent des expériences proposées de manière confidentielle, en dehors des parcours de réservation traditionnels (OTA, site direct).
                                    </TextSecondary>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-md" />
                            </div>
                            <div className="relative grid md:grid-cols-2 gap-8 items-center">

                                <div className="md:text-right">
                                    <h3 className="font-bold">Offres spécifiques et contrôlées</h3>
                                    <TextSecondary>
                                        Elles concernent uniquement des disponibilités choisies par vos soins (dates et lots définis), distinctes de votre offre publique. Non indexées et accessibles uniquement via un accès membre, elles ne peuvent être ni retrouvées, ni suivies, ni comparées dans le temps.
                                    </TextSecondary>
                                </div>
                                <div />

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-md" />
                            </div>

                            {/* ITEM 3 */}
                            <div className="relative grid md:grid-cols-2 gap-8 items-center">
                                <div />
                                <div>
                                    <h3 className="font-bold">Validation avant révélation</h3>
                                    <TextSecondary>
                                        L’accès nécessite un engagement du membre, garantissant un niveau de sérieux et de qualification.
                                    </TextSecondary>
                                </div>


                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-md" />
                            </div>

                            {/* ITEM 4 */}
                            <div className="relative grid md:grid-cols-2 gap-8 items-center">

                                <div className="md:text-right">
                                    <h3 className="font-bold">Pas d’effet d’habituation</h3>
                                    <TextSecondary>
                                        Offres confidentielles, jamais visibles par vos clients habituels.
                                        Accessible uniquement aux membres, non indexée, non suivable.
                                        Une audience distincte, une offre séparée de votre offre publique.
                                    </TextSecondary>
                                </div>
                                <div />

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-md" />
                            </div>

                        </div>
                    </div>

                    {/* STATEMENT */}
                    <div className="text-center pt-6">
                        <p className="text-lg md:text-xl font-semibold italic">
                            Aucun affichage. Aucune comparaison. Aucun impact sur vos ventes directes.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-32 text-center border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <h2 className="text-4xl md:text-6xl font-black italic mb-6">
                    Une disponibilité non publique. <br />
                    <span style={{ color: 'var(--accent-gold)' }}>
                        Une opportunité maîtrisée.
                    </span>
                </h2>

                <TextSecondary>
                    Testez sur une seule chambre. Sans impact sur vos ventes ni votre image.
                </TextSecondary>

                <Link
                    href="mailto:collaboration@loisirs-prive.fr"
                    className="inline-block mt-8 px-12 py-6 text-sm font-bold uppercase tracking-widest hover:scale-105 transition"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'black' }}
                >
                    Proposer une disponibilité
                </Link>
            </section>
        </main>
    )
}