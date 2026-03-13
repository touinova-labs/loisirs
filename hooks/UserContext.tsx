'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase' // Ton client client-side

export interface UserData {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    onboardingCompleted: boolean
}

interface UserContextType {
    user: UserData | null
    loading: boolean
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return;

            const res = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${session?.access_token || session.user.id}`,
                },
            })
            const result = await res.json()
            if (result.success) {
                setUser(result.data)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error("Failed to fetch user:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Chargement initial
        fetchUser()

        // Écouter les changements d'auth (Login/Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') fetchUser()
            if (event === 'SIGNED_OUT') {
                setUser(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}