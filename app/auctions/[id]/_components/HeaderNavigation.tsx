import { ChevronLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { AuctionAttributes } from '@/types'

interface HeaderNavigationProps {
  attr: AuctionAttributes
}

export function HeaderNavigation({ attr }: HeaderNavigationProps) {
  return (
    <div className="border-b" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-primary)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ChevronLeft size={18} />
          <span className="text-[10px] font-semibold uppercase tracking-widest italic">Tous les loisirs • {attr.type || 'Exclusivité'}</span>
        </Link>
        <button className="p-2 rounded-lg transition-colors hover:opacity-80" style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'var(--border-primary)' }}>
          <Share2 size={16} />
        </button>
      </nav>
    </div>
  )
}
