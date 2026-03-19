import { Auction, AuctionAttributes } from '@/types'
import Map from '@/components/Map'

interface LocationSectionProps {
  auction: Auction
  attr: AuctionAttributes
}

export function LocationSection({ auction, attr }: LocationSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold italic uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--accent-gold)' }}>
        <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-gold)' }} /> Localisation
      </h2>

      <div className="group relative w-full h-64 rounded-lg overflow-hidden border shadow-lg" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
        {/* Carte */}
        {auction.location_name && attr.lng && attr.lat ? <Map lat={attr.lat} lng={attr.lng} showArea={true} /> : null}

        {/* Overlay de discrétion allégé */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none">
          <div className="p-5 backdrop-blur-md rounded-lg border text-center shadow-lg" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'var(--border-primary)' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-gold)' }} />
              <p className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'var(--text-primary)' }}>
                {auction.location_name}
              </p>
            </div>

            <p className="text-[9px] font-bold uppercase tracking-widest leading-tight italic" style={{ color: 'var(--text-secondary)' }}>
              Secteur approximatif <br />
              <span style={{ color: 'var(--accent-gold)' }}>
                Localisation précise communiquée après confirmation
              </span>
            </p>
          </div>
        </div>

        {/* Vignettage */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />
      </div>
    </section>
  )
}
