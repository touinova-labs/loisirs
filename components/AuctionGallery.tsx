'use client'

import { useRef, useState } from 'react'
import { RarityBadge } from '@/components/RarityBadge'
import { ChevronLeft, ChevronRight, Grid2X2, Maximize2 } from 'lucide-react'

interface AuctionGalleryProps {
    images: string[]
    title: string
    isLimited?: boolean
}

export default function auctionGallery({ images, title, isLimited }: AuctionGalleryProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const gallery = images?.length > 0 ? images : ['/placeholder.jpg']

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth)
            setActiveIndex(index)
        }
    }

    const scrollTo = (index: number) => {
        scrollRef.current?.scrollTo({
            left: index * scrollRef.current.offsetWidth,
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative group">
            {/* CONTENEUR SWIPEABLE */}
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="relative aspect-[16/10] lg:aspect-[16/8] overflow-x-auto flex snap-x snap-mandatory no-scrollbar rounded-lg border"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-primary)',
                }}
            >
                {gallery.map((img: string, i: number) => (
                    <div key={i} className="min-w-full h-full snap-center relative">
                        <img 
                            src={img} 
                            alt={`${title} ${i}`}
                            className="w-full h-full object-cover pointer-events-none"
                        />
                        {/* Overlay pour la lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </div>
                ))}
            </div>

            {/* BADGE DE RARETÉ */}
            <div className="absolute top-6 left-6 z-10">
                {isLimited && <RarityBadge />}
            </div>

            {/* NAVIGATION FLÈCHES */}
            {gallery.length > 1 && (
                <>
                    <button 
                        onClick={() => scrollTo(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:hidden shadow-md"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => scrollTo(activeIndex + 1)}
                        disabled={activeIndex === gallery.length - 1}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:hidden shadow-md"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* PAGINATION DOTS */}
            {gallery.length > 1 && (
                <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10">
                    {gallery.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{
                                width: activeIndex === i ? '32px' : '8px',
                                backgroundColor: activeIndex === i ? 'var(--accent-gold)' : 'var(--border-primary)',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* COMPTEUR D'IMAGES */}
            <div 
                className="absolute top-6 right-6 px-3 py-1.5 backdrop-blur-md rounded-full border text-[10px] font-semibold italic tracking-widest uppercase"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                }}
            >
                {activeIndex + 1} / {gallery.length}
            </div>
        </div>
    )
}