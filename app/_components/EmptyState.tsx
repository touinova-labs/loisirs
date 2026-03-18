import { useUser } from "@/hooks/UserContext";

export function EmptyState({ onBtnClick }: { onBtnClick: () => void }) {
    const { user } = useUser()

    return (
        <div
            className="col-span-full py-24 px-6 flex flex-col items-center justify-center border animate-card-entry text-center"
            style={{
                borderColor: 'var(--border-primary)',
                borderRadius: 'var(--radius-card)',
                backgroundColor: 'var(--bg-secondary)',
                background: 'linear-gradient(to bottom, var(--bg-tertiary), transparent)'
            }}
        >
            {/* Status Indicator */}
            <div className="relative flex h-4 w-4 mb-8">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: 'var(--accent-gold)' }}
                />
                <span
                    className="relative inline-flex rounded-full h-4 w-4"
                    style={{ backgroundColor: 'var(--accent-gold)' }}
                />
            </div>

            {/* Title */}
            <div className="mb-6 space-y-3">
                <p className="text-xs tracking-[0.3em] uppercase opacity-50">
                    Sélections en cours
                </p>

                <h3 className="text-2xl md:text-3xl font-bold uppercase">
                    Découvrez bientôt de nouvelles expériences
                </h3>
            </div>

            {/* Body */}
            <div className="max-w-2xl space-y-8">
                <p
                    className="text-sm md:text-lg leading-relaxed italic text-gray-400 max-w-md mx-auto"
                >
                    {user
                        ? "Les disponibilités sont actuellement en préparation et vous seront présentées en priorité dès leur publication."
                        : "Les disponibilités sont actuellement en préparation et réservées aux membres du cercle. Rejoignez le cercle pour être alerté en priorité dès qu’elles sont publiées."
                    }
                </p>
            </div>

            {/* CTA */}
            <div className="mt-12">
                {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="px-10 py-4 border text-[11px] tracking-[0.25em] uppercase font-bold"
                            style={{
                                borderColor: 'var(--border-accent)',
                                color: 'var(--accent-gold)',
                                borderRadius: 'var(--radius-button)',
                                backgroundColor: 'rgba(var(--accent-gold-rgb), 0.1)'
                            }}
                        >
                            Accès prioritaire activé
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
                            Notifications envoyées à{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
                        </p>
                    </div>
                ) : (
                    <button
                        className="px-12 py-5 border text-[11px] tracking-[0.3em] uppercase font-bold transition-all duration-500 ease-in-out hover:scale-105"
                        style={{
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)',
                            borderRadius: 'var(--radius-button)',
                            backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                            e.currentTarget.style.color = 'var(--bg-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onClick={onBtnClick}
                    >
                        Recevoir les alertes
                    </button>
                )}
            </div>
        </div>
    )
}