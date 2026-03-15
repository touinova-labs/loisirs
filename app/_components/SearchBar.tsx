'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, X, Mountain, Waves, Landmark, TreePine, Calendar, ChevronRight, ChevronDown } from 'lucide-react'

const DESTINATIONS = [
    { id: 'alpes', label: 'Les Cimes', sub: 'Alpes du Nord', icon: Mountain },
    { id: 'cote', label: 'La Côte', sub: 'Azur & Corse', icon: Waves },
    { id: 'paris', label: 'L’Héritage', sub: 'Paris & Châteaux', icon: Landmark },
    { id: 'campagne', label: 'Le Calme', sub: 'Provence & Campagne', icon: TreePine },
]

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'dest' | 'dates'>('dest')
    const [selectedDest, setSelectedDest] = useState<string | null>(null)
    const [date, setDate] = useState<string>('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Bloquer le scroll du fond
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
        } else {
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }, [isOpen])

    return (
        <div className="max-w-4xl mx-auto relative z-[60] px-4 md:px-0" ref={dropdownRef}>
            
            {/* --- 1. BARRE D'AFFICHAGE --- */}
            <div 
                className={`flex items-center transition-all duration-300 border overflow-hidden ${
                    isOpen ? 'border-[var(--accent-gold)] shadow-2xl scale-[1.01]' : 'border-[var(--border-primary)] shadow-lg'
                }`}
                style={{ borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', backdropFilter: 'blur(10px)' }}
            >
                <button 
                    onClick={() => { setActiveTab('dest'); setIsOpen(true); }}
                    className="flex-[1.4] flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-tertiary)] transition-colors text-left border-r border-[var(--border-primary)]/30"
                >
                    <div className="flex flex-col">
                        <span className="text-[7px] font-black uppercase text-[var(--accent-gold)] tracking-[0.4em] mb-1">Explorer</span>
                        <span className="text-[11px] font-bold uppercase italic truncate w-full">
                            {selectedDest ? DESTINATIONS.find(d => d.id === selectedDest)?.label : "Destinations"}
                        </span>
                    </div>
                    <ChevronDown size={12} className={`text-[var(--accent-gold)] transition-transform ${isOpen && activeTab === 'dest' ? 'rotate-180' : 'opacity-30'}`} />
                </button>
                
                <button 
                    onClick={() => { setActiveTab('dates'); setIsOpen(true); }}
                    className="flex-1 flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-tertiary)] transition-colors text-left"
                >
                    <div className="flex flex-col">
                        <span className="text-[7px] font-black uppercase text-[var(--text-tertiary)] tracking-[0.4em] mb-1">Période</span>
                        <span className="text-[11px] font-bold uppercase italic opacity-40 truncate">
                            {date || "Ajouter..."}
                        </span>
                    </div>
                    <ChevronDown size={12} className={`transition-transform ${isOpen && activeTab === 'dates' ? 'rotate-180' : 'opacity-20'}`} />
                </button>

                <button className="h-16 w-16 md:w-24 bg-[var(--accent-gold)] flex items-center justify-center text-[var(--bg-primary)] border-l border-[var(--accent-gold)] shrink-0">
                    <Search size={20} strokeWidth={3} />
                </button>
            </div>

            {/* --- 2. MODAL OVERLAY (SANS DÉPASSEMENT) --- */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg-primary)] md:absolute md:inset-auto md:top-full md:left-0 md:right-0 md:mt-3 md:bg-[var(--bg-secondary)] md:border md:border-[var(--border-primary)] md:shadow-2xl md:h-auto animate-in fade-in zoom-in-95 duration-200"
                    style={{ 
                        height: '100dvh', // Hauteur dynamique
                        maxHeight: window.innerWidth < 768 ? '100dvh' : '550px',
                        borderRadius: window.innerWidth < 768 ? '0' : '12px'
                    }}
                >
                    {/* Header Fixe */}
                    <div className="flex-none flex items-center justify-between p-5 border-b border-[var(--border-primary)]/40 bg-[var(--bg-primary)]">
                        <button onClick={() => setIsOpen(false)} className="p-2"><X size={22} /></button>
                        <div className="flex gap-6">
                            {['Destination', 'Dates'].map((label, i) => {
                                const id = i === 0 ? 'dest' : 'dates';
                                return (
                                    <button 
                                        key={id}
                                        onClick={() => setActiveTab(id)}
                                        className={`text-[9px] font-black uppercase tracking-[0.3em] relative pb-2 ${activeTab === id ? 'text-[var(--text-primary)]' : 'opacity-20'}`}
                                    >
                                        {label}
                                        {activeTab === id && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent-gold)]" />}
                                    </button>
                                )
                            })}
                        </div>
                        <div className="w-8" /> 
                    </div>

                    {/* Zone Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {activeTab === 'dest' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {DESTINATIONS.map((dest) => (
                                    <button
                                        key={dest.id}
                                        onClick={() => { setSelectedDest(dest.id); setActiveTab('dates'); }}
                                        className={`flex items-center justify-between p-5 border rounded-lg transition-all ${selectedDest === dest.id ? 'bg-[var(--bg-tertiary)] border-[var(--accent-gold)]' : 'border-[var(--border-primary)]/30'}`}
                                    >
                                        <div className="flex items-center gap-6">
                                            <dest.icon size={18} strokeWidth={1} className="text-[var(--accent-gold)]" />
                                            <div className="text-left">
                                                <p className="text-[10px] font-black uppercase tracking-widest">{dest.label}</p>
                                                <p className="text-[9px] opacity-40 italic">{dest.sub}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {['Mars', 'Avril', 'Mai', 'Juin'].map((t) => (
                                    <button 
                                        key={t}
                                        onClick={() => { setDate(t); setIsOpen(false); }}
                                        className={`p-6 border rounded-lg flex items-center gap-4 ${date === t ? 'bg-[var(--bg-tertiary)] border-[var(--accent-gold)]' : 'border-[var(--border-primary)]/30'}`}
                                    >
                                        <Calendar size={16} strokeWidth={1} className="text-[var(--accent-gold)]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest italic">{t}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer Fixe - Toujours visible en bas */}
                    <div className="flex-none p-5 border-t border-[var(--border-primary)]/40 bg-[var(--bg-primary)] md:hidden pb-10">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-full py-4 bg-[var(--accent-gold)] text-[var(--bg-primary)] text-[10px] font-black uppercase tracking-[0.3em] rounded-lg shadow-xl"
                        >
                            Confirmer la recherche
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}