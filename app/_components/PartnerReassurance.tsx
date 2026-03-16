'use client'
import { ShieldCheck, Banknote, BarChart3, Lock } from 'lucide-react'

export default function PartnerReassurance() {
    const points = [
        {
            icon: <Lock size={28} />, 
            title: "Opacité Totale",
            text: "Votre identité et vos tarifs ne sont révélés qu'après authentification. Respect strict de votre parité."
        },
        {
            icon: <Banknote size={28} />,
            title: "Paiement Direct",
            text: "Le membre règle son séjour directement auprès de votre établissement. Zéro délai de trésorerie."
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Prix de Réserve",
            text: "Vous gardez le contrôle final : si l'enchère n'atteint pas votre prix minimum, le lot n'est pas adjugé."
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Zéro Risque",
            text: "Aucun frais d'inscription. Nous nous rémunérons uniquement au succès via une commission fixe."
        }
    ]

    return (
        <section className="col-span-full py-32 px-6 border-t animate-card-entry" 
                 style={{ 
                    borderColor: 'var(--border-primary)', 
                    backgroundColor: 'var(--bg-primary)' 
                 }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Header : Titre et Sous-titre */}
                <div className="mb-24 text-center md:text-left">
                    <h2 className="text-[12px] tracking-[0.5em] uppercase mb-6 font-black" 
                        style={{ color: 'var(--accent-gold)' }}>
                        Partenariats Hôteliers
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-light tracking-tighter leading-tight" 
                        style={{ color: 'var(--text-primary)' }}>
                        Optimisez votre RevPAR <br className="hidden md:block" /> 
                        <span className="italic">sans altérer votre image.</span>
                    </h3>
                </div>

                {/* Grille des points clés */}
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

                {/* Bannière CTA : Utilise bg-secondary et radius-card */}
                <div className="mt-24 p-12 border flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg"
                     style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-primary)',
                        borderRadius: 'var(--radius-card)' 
                     }}>
                    <div className="space-y-2 text-center lg:text-left">
                        <p className="text-xl md:text-2xl font-light italic" 
                           style={{ color: 'var(--text-primary)' }}>
                            "Un test sur une seule suite suffit pour mesurer l'impact."
                        </p>
                        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
                            Zéro engagement • Paiement direct établissement
                        </p>
                    </div>
                    
                    <button
                        onClick={() => window.location.href = 'mailto:partenaires@loisirs-prive.fr?subject=Partenariat Hotelier'}
                        className="whitespace-nowrap px-14 py-6 font-bold text-xs tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 shadow-xl"
                        style={{ 
                            backgroundColor: 'var(--accent-gold)', 
                            color: 'var(--bg-primary)',
                            borderRadius: 'var(--radius-button)'
                        }}
                    >
                        Devenir partenaire
                    </button>
                </div>
            </div>
        </section>
    )
}