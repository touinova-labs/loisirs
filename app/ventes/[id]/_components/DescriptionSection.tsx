import { Auction } from '@/types'
import ReactMarkdown from 'react-markdown'

interface DescriptionSectionProps {
  auction: Auction
}

export function DescriptionSection({ auction }: DescriptionSectionProps) {
  if (!auction.description) return null;

  return (
    <section className="space-y-6 py-12 border-t border-[var(--border-primary)]">
      {/* Header : S'adapte Gold ou Émeraude selon le thème */}
      <h2 className="text-xl font-black italic uppercase tracking-[0.2em] flex items-center gap-4" 
          style={{ color: 'var(--accent-gold)' }}>
        <span className="w-12 h-[1px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> 
        L'expérience
      </h2>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            // Texte principal
            p: ({ node, ...props }) => (
              <p className="leading-relaxed italic text-base mb-6 font-medium" 
                 style={{ color: 'var(--text-secondary)' }} {...props} />
            ),
            // Titres : Utilise l'ombre portée de la couleur d'accent (Gold ou Émeraude)
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-black uppercase italic tracking-tighter mt-10 mb-4 flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}>
                <span className="w-1.5 h-1.5 rounded-full" 
                      style={{ 
                        backgroundColor: 'var(--accent-gold)', 
                        boxShadow: '0 0 10px var(--accent-gold)' 
                      }} />
                {props.children}
              </h3>
            ),
            // Listes : Bordure gauche utilisant la couleur de bordure du thème
            ul: ({ node, ...props }) => (
              <ul className="space-y-3 mb-8 ml-2 border-l border-[var(--border-primary)] pl-6" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="italic text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {/* Le tiret prend la couleur d'accentuation du thème */}
                <span className="font-bold mr-2" style={{ color: 'var(--accent-gold)' }}>—</span>
                <span {...props} />
              </li>
            ),
            // Mise en avant (Gras)
            strong: ({ node, ...props }) => (
              <strong className="font-bold border-b pb-0.5" 
                      style={{ 
                        color: 'var(--text-primary)', 
                        borderColor: 'rgba(16, 185, 129, 0.3)' // Optionnel: laisser une touche émeraude ou utiliser var(--accent-gold) avec opacité
                      }} {...props} />
            ),
            // Bloc de citation (Style éditorial)
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-2 pl-6 py-2 my-8 italic text-lg rounded-r-lg" 
                          style={{ 
                            borderColor: 'var(--accent-gold)', 
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)' 
                          }} {...props} />
            ),
          }}
        >
          {auction.description}
        </ReactMarkdown>
      </div>

      {/* Footer signature */}
      <div className="pt-8 flex items-center justify-center opacity-30">
        <span className="text-[10px] tracking-[0.8em] uppercase font-black" 
              style={{ color: 'var(--text-tertiary)' }}>
          Loisirs Privé Selection
        </span>
      </div>
    </section>
  )
}