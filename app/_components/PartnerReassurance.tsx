'use client'
import { ShieldCheck, Banknote, BarChart3, Lock } from 'lucide-react'

export default function PartnerReassurance() {
    const points = [
        {
            icon: <Lock size={28} />, 
            title: "Distribution contrôlée",
            text: "Vos disponibilités ne sont jamais exposées publiquement. Accès restreint, environnement fermé, sans impact sur vos canaux existants."
        },
        {
            icon: <Banknote size={28} />,
            title: "Encaissement direct",
            text: "Le client règle directement auprès de votre établissement. Aucun intermédiaire, aucune friction de trésorerie."
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Seuil de validation",
            text: "Vous définissez un prix minimum. Si la demande ne l’atteint pas, la disponibilité reste simplement inactive."
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Activation sans risque",
            text: "Aucun coût fixe. Le modèle s’active uniquement en cas de réservation confirmée."
        }
    ]

    return (
        <section className="col-span-full py-32 px-6 border-t animate-card-entry" 
                 style={{ 
                    borderColor: 'var(--border-primary)', 
                    backgroundColor: 'var(--bg-primary)' 
                 }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="mb-24 text-center md:text-left">
                    <h2 className="text-[12px] tracking-[0.5em] uppercase mb-6 font-black" 
                        style={{ color: 'var(--accent-gold)' }}>
                        Distribution Privée
                    </h2>

                    <h3 className="text-4xl md:text-5xl font-light tracking-tighter leading-tight" 
                        style={{ color: 'var(--text-primary)' }}>
                        Activez un revenu additionnel <br className="hidden md:block" /> 
                        <span className="italic">sans exposition publique.</span>
                    </h3>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-20">
                    {points.map((point, index) => (
                        <div key={index} className="space-y-6">
                            <div style={{ color: 'var(--accent-gold)' }}>
                                {point.icon}
                            </div>

                            <h4 className="font-bold text-base tracking-widest uppercase" 
                                style={{ color: 'var(--text-primary)' }}>
                                {point.title}
                            </h4>

                            <p className="text-base leading-relaxed font-light" 
                               style={{ color: 'var(--text-secondary)' }}>
                                {point.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 p-12 border flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg"
                     style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-primary)',
                        borderRadius: 'var(--radius-card)' 
                     }}>
                    <div className="space-y-3 text-center lg:text-left">
                        <p className="text-xl md:text-2xl font-light italic" 
                           style={{ color: 'var(--text-primary)' }}>
                            "Un test isolé suffit pour valider un revenu incrémental."
                        </p>

                        <p className="text-xs uppercase tracking-[0.2em]" 
                           style={{ color: 'var(--text-tertiary)' }}>
                            Une seule disponibilité • Aucun engagement • Encaissement direct
                        </p>
                    </div>
                    
                    <button
                        onClick={() => window.location.href = 'mailto:partenaires@loisirs-prive.fr?subject=Test de distribution privée'}
                        className="whitespace-nowrap px-14 py-6 font-bold text-xs tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 shadow-xl"
                        style={{ 
                            backgroundColor: 'var(--accent-gold)', 
                            color: 'var(--bg-primary)',
                            borderRadius: 'var(--radius-button)'
                        }}
                    >
                        Proposer un test
                    </button>
                </div>
            </div>
        </section>
    )
}