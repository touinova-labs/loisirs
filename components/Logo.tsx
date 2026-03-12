export function Logo({ className }: { className?: string }) {
    return (
        <svg 
            viewBox="180 110 320 320"  /* viewBox ajustée pour zoomer sur le monogramme */
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            {/* Cercle : Il affleure maintenant les bords de la viewBox */}
            <circle 
                cx="340" cy="270" r="150"
                stroke="var(--accent-gold)"
                strokeWidth="6"
                fill="none"
            />

            {/* Monogramme P (Derrière, décalé à droite) */}
            <text 
                x="385" y="325"
                textAnchor="middle"
                fontFamily="Didot, 'Bodoni MT', 'Times New Roman', serif"
                fontSize="160"
                fontWeight="900"
                fill="var(--accent-gold)"
                style={{ letterSpacing: '-5px' }}
            >
                P
            </text>
            
            {/* Monogramme L (Devant, décalé à gauche) */}
            {/* Le stroke noir (var(--bg-primary)) crée la séparation visuelle au chevauchement */}
            <text 
                x="310" y="295" 
                textAnchor="middle"
                fontFamily="Didot, 'Bodoni MT', 'Times New Roman', serif"
                fontSize="170"
                fontWeight="900"
                fill="var(--accent-gold)"
                stroke="var(--bg-primary)" 
                strokeWidth="10"
                style={{ paintOrder: 'stroke fill', letterSpacing: '-5px' }}
            >
                L
            </text>
        </svg>
    );
}