'use client'

import { LogOut, Moon, Sun } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Logo } from './Logo'
import { UserData } from '@/hooks/UserContext'

interface NavbarProps {
    user: UserData | null;
    onAuthClick: () => void;
}

export default function Navbar({ user, onAuthClick }: NavbarProps) {
    const { theme, toggleTheme } = useTheme()

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('Erreur déconnexion:', error.message)
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-sm border-b"
            style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-primary)'
            }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    {/* Conteneur du Logo avec effet de halo discret */}
                    <div className="relative flex items-center justify-center w-12 h-12">
                        {/* Halo lumineux au survol */}
                        <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-md scale-125"
                            style={{ backgroundColor: 'var(--accent-gold)' }}
                        />
                        <Logo className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Nom de la marque sur une seule ligne */}
                    <span className="text-xl font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                        LOISIRS<span style={{ color: 'var(--accent-gold)' }} className="ml-0.5">PRIVÉ</span>
                    </span>
                </Link>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg transition-all"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--accent-gold)',
                            border: '1px solid var(--border-primary)'
                        }}
                        title="Changer thème"
                    >
                        {theme === 'theme-signature' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <div
                                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-semibold uppercase"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-primary)'
                                }}>
                                {user.firstName} {user.lastName}
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-2 rounded-lg transition-all"
                                style={{
                                    color: 'var(--text-secondary)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-primary)'
                                }}
                                title="Déconnexion"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onAuthClick}
                            className="px-4 py-2 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all text-white"
                            style={{ backgroundColor: 'var(--accent-gold)' }}
                        >
                            Connexion
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}