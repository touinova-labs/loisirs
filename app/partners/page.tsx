'use client'

import { Lock, Banknote, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function PartnersPage() {

    const points = [
        {
            icon: <Lock size={26} />,
            title: "Distribution hors OTA",
            text: "Aucune exposition publique. Aucun impact sur vos canaux existants."
        },
        {
            icon: <Banknote size={26} />,
            title: "Encaissement direct",
            text: "Le client paie directement à l’hôtel. Vous gardez le contrôle."
        },
        {
            icon: <ShieldCheck size={26} />,
            title: "Prix minimum",
            text: "Vous fixez un seuil. En dessous, la chambre reste invendue."
        }
    ]

    const reassurance = [
        {
            icon: <Lock size={28} />,
            title: "Aucune exposition publique",
            text: "Vos tarifs et disponibilités ne sont jamais visibles en ligne."
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Aucun impact pricing",
            text: "Votre stratégie tarifaire reste totalement intacte."
        },
        {
            icon: <Banknote size={28} />,
            title: "Paiement direct",
            text: "Le client règle directement à l’hôtel, sans intermédiaire."
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Sans engagement",
            text: "Vous testez librement. Si ça ne fonctionne pas, vous arrêtez."
        }
    ]

    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Navbar user={null} onAuthClick={() => { }} />

            {/* HERO */}
            <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6 border-b"
                style={{ borderColor: 'var(--border-primary)' }}>

                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight leading-[0.9] mb-6">
                    Monétisez vos chambres vides <br />
                    <span style={{ color: 'var(--accent-gold)' }}>sans exposer vos tarifs</span>
                </h1>

                <p className="max-w-xl text-sm md:text-base font-medium italic mb-10"
                    style={{ color: 'var(--text-secondary)' }}>
                    Un canal discret pour générer un revenu additionnel,
                    sans passer par les OTA ni modifier votre stratégie tarifaire.
                </p>

                <Link
                    href="mailto:collaboration@loisirs-prive.fr?subject=Test de distribution privée"
                    className="px-10 py-5 text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'black' }}
                >
                    Tester une disponibilité
                    <ArrowRight size={16} />
                </Link>
            </section>

            {/* 3 POINTS CLÉS */}
            <section className="py-24 max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {points.map((p, i) => (
                        <div key={i} className="space-y-4">
                            <div style={{ color: 'var(--accent-gold)' }} className="flex justify-center">
                                {p.icon}
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest">
                                {p.title}
                            </h3>
                            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                                {p.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMMENT ÇA MARCHE */}
            <section className="py-24 px-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="max-w-5xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold mb-16">
                        Comment ça fonctionne
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10 text-left">

                        <div className="space-y-3">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                01
                            </p>
                            <h3 className="font-bold">
                                Vous sélectionnez une disponibilité
                            </h3>
                            <p className="text-gray-500">
                                Une chambre invendue ou une période creuse.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                02
                            </p>
                            <h3 className="font-bold">
                                Vous fixez un prix minimum
                            </h3>
                            <p className="text-gray-500">
                                Seuil confidentiel. En dessous, rien ne se passe.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                03
                            </p>
                            <h3 className="font-bold">
                                On teste la demande
                            </h3>
                            <p className="text-gray-500">
                                Si le prix est atteint, la réservation est confirmée et payée à l’hôtel.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* REASSURANCE */}
            <section className="py-32 px-6 border-t"
                style={{ borderColor: 'var(--border-primary)' }}>

                <div className="max-w-6xl mx-auto">

                    <div className="mb-20">
                        <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold"
                            style={{ color: 'var(--accent-gold)' }}>
                            Garanties
                        </h2>

                        <h3 className="text-4xl md:text-5xl font-light leading-tight">
                            Aucun risque. <br />
                            <span className="italic">Aucune contrainte opérationnelle.</span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {reassurance.map((r, i) => (
                            <div key={i} className="space-y-4">
                                <div style={{ color: 'var(--accent-gold)' }}>
                                    {r.icon}
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-widest">
                                    {r.title}
                                </h4>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {r.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-24 border p-10 flex flex-col md:flex-row items-center justify-between gap-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border-primary)'
                        }}>

                        <div>
                            <p className="text-xl italic mb-2">
                                Testez sur une seule chambre. Sans risque.
                            </p>
                            <p className="text-xs uppercase tracking-widest"
                                style={{ color: 'var(--text-secondary)' }}>
                                Une disponibilité • Prix minimum • Paiement direct
                            </p>
                        </div>

                        <Link
                            href="mailto:collaboration@loisirs-prive.fr?subject=Test de distribution privée"
                            className="px-10 py-5 text-xs font-bold uppercase tracking-widest hover:scale-105 transition"
                            style={{ backgroundColor: 'var(--accent-gold)', color: 'black' }}
                        >
                            Proposer un test
                        </Link>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 text-center border-t"
                style={{ borderColor: 'var(--border-primary)' }}>

                <h2 className="text-4xl md:text-6xl font-black italic mb-6">
                    Une chambre vide. <br />
                    <span style={{ color: 'var(--accent-gold)' }}>Un prix minimum. Sinon rien.</span>
                </h2>

                <Link
                    href="mailto:collaboration@loisirs-prive.fr?subject=Test de distribution privée"
                    className="inline-block mt-8 px-12 py-6 text-sm font-bold uppercase tracking-widest hover:scale-105 transition"
                    style={{ backgroundColor: 'var(--accent-gold)', color: 'black' }}
                >
                    Lancer un test
                </Link>
            </section>
        </main>
    )
}