import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function ExperienceNotFound() {
    return <div className="min-h-screen text-white flex flex-col items-center justify-center gap-4" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <AlertCircle size={40} style={{ color: 'var(--text-secondary)' }} />
        <p className="font-bold italic uppercase tracking-widest text-center" style={{ color: 'var(--text-secondary)' }}>
            Expérience introuvable
        </p>
        <Link href="/" className="text-sm font-bold uppercase underline" style={{ color: 'var(--accent-gold)' }}>
            Retour au catalogue
        </Link>
    </div>
}