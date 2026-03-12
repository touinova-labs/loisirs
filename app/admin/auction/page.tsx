'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Save, ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { Auction, AuctionAttributes, AuctionStatus } from '@/types';

// On enveloppe dans Suspense car useSearchParams() le requiert dans Next.js 13+
export default function AuctionFormPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center uppercase font-black" style={{ color: 'var(--text-secondary)' }}>Chargement...</div>}>
            <AuctionFormContent />
        </Suspense>
    );
}

function AuctionFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const auctionId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // État initial typé
    const [formData, setFormData] = useState<Partial<Auction>>({
        title: '',
        description: '',
        location_name: '',
        start_price: 1,
        reserve_price: 0,
        buy_now_price: 0,
        type: 'auction',
        status: 'upcoming' as AuctionStatus,
        start_at: new Date().toISOString().slice(0, 16),
        end_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        images: [],
        attributes: {
            type: 'hotel',
            guests: 2,
            validity_months: 6,
            rating: 5,
            reviews_count: 0,
            has_delivery: false,
            booking_info: '',
            lng: 2.3522,
            lat: 48.8566
        } as AuctionAttributes
    });

    useEffect(() => {
        if (auctionId) {
            const fetchAuction = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('auctions')
                    .select('*')
                    .eq('id', auctionId)
                    .single();

                if (data) {
                    // On s'assure que les dates sont au format compatible datetime-local
                    setFormData({
                        ...data,
                        start_at: new Date(data.start_at).toISOString().slice(0, 16),
                        end_at: new Date(data.end_at).toISOString().slice(0, 16)
                    });
                }
                setLoading(false);
            };
            fetchAuction();
        }
    }, [auctionId]);

    const handleAttributeChange = (key: keyof AuctionAttributes, value: any) => {
        setFormData(prev => ({
            ...prev,
            attributes: {
                ...(prev.attributes as AuctionAttributes),
                [key]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch('/api/save-auction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                router.push('/admin');
                router.refresh();
            } else {
                throw new Error(result.error);
            }
        } catch (err: any) {
            alert("Erreur: " + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center italic uppercase font-black tracking-widest" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>Initialisation...</div>;

    return (
        <div className="min-h-screen p-4 md:p-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">

                {/* ACTIONS HEADER */}
                <div className="flex justify-between items-center mb-12">
                    <button type="button" onClick={() => router.back()} className="flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] hover:opacity-70 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                        <ArrowLeft size={16} /> Retour
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl text-white"
                        style={{ backgroundColor: 'var(--accent-gold)' }}
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {auctionId ? 'Mettre à jour' : 'Publier l\'offre'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* COLONNE PRINCIPALE */}
                    <div className="lg:col-span-2 space-y-10">

                        <Section title="Détails de l'expérience">
                            <Input label="Titre commercial" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} placeholder="Ex: Nuit étoilée au Domaine des Sources" />
                            <TextArea label="Description détaillée" value={formData.description} onChange={(v: string) => setFormData({ ...formData, description: v })} />

                            <div className="grid grid-cols-2 gap-6">
                                <Input label="Localisation (Ville)" value={formData.location_name} onChange={(v: string) => setFormData({ ...formData, location_name: v })} icon={<MapPin size={14} />} />
                                <Select label="Format de vente" value={formData.type} options={['auction', 'fixed', 'hybrid']} onChange={(v: any) => setFormData({ ...formData, type: v })} />
                            </div>
                        </Section>

                        <Section title="Spécificités de l'offre">
                            {/* Sélecteur de métier principal */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <Select
                                    label="Catégorie métier"
                                    value={formData.attributes?.type}
                                    options={['hotel', 'restoration', 'sport', 'wellness']}
                                    onChange={(v: any) => handleAttributeChange('type', v)}
                                />
                                <Input
                                    label="Valeur réelle du pack (€)"
                                    type="number"
                                    value={formData.attributes?.value_real}
                                    onChange={(v: string) => handleAttributeChange('value_real', Number(v))}
                                />
                            </div>

                            {/* Grille de paramètres communs (Bases) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-[2rem] border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                                <Input label="Nombre de personnes" type="number" value={formData.attributes?.guests} onChange={(v: string) => handleAttributeChange('guests', Number(v))} />
                                <Input label="Validité du coupon (mois)" type="number" value={formData.attributes?.validity_months} onChange={(v: string) => handleAttributeChange('validity_months', Number(v))} />
                                <Input label="Note /5" type="number" value={formData.attributes?.rating} onChange={(v: string) => handleAttributeChange('rating', Number(v))} />
                                <Input label="Nombre d'avis" type="number" value={formData.attributes?.reviews_count} onChange={(v: string) => handleAttributeChange('reviews_count', Number(v))} />

                                {/* Ligne pleine pour les coordonnées GPS */}
                                <div className="col-span-full grid grid-cols-2 gap-4 pt-4 mt-2" style={{ borderTop: `1px solid var(--border-primary)` }}>
                                    <Input label="Longitude" type="number" value={formData.attributes?.lng} onChange={(v: string) => handleAttributeChange('lng', Number(v))} />
                                    <Input label="Latitude" type="number" value={formData.attributes?.lat} onChange={(v: string) => handleAttributeChange('lat', Number(v))} />
                                </div>

                                {/* --- CHAMPS CONDITIONNELS SELON LE TYPE --- */}

                                {/* 1. HOTEL */}
                                {formData.attributes?.type === 'hotel' && (
                                    <div className="col-span-full flex flex-wrap gap-8 pt-4" style={{ borderTop: `1px solid var(--border-primary)` }}>
                                        <Checkbox label="Petit-déjeuner inclus" checked={formData.attributes.breakfast} onChange={(v: boolean) => handleAttributeChange('breakfast', v)} />
                                        <Checkbox label="Accès Spa / Bien-être" checked={formData.attributes.spa_access} onChange={(v: boolean) => handleAttributeChange('spa_access', v)} />
                                    </div>
                                )}

                                {/* 2. RESTORATION */}
                                {formData.attributes?.type === 'restoration' && (
                                    <div className="col-span-full space-y-4 pt-4" style={{ borderTop: `1px solid var(--border-primary)` }}>
                                        <TextArea label="Menu / Détails de la carte" value={formData.attributes.menu} onChange={(v: string) => handleAttributeChange('menu', v)} />
                                        <Checkbox label="Livraison disponible" checked={formData.attributes.has_delivery} onChange={(v: boolean) => handleAttributeChange('has_delivery', v)} />
                                    </div>
                                )}

                                {/* 3. SPORT & WELLNESS */}
                                {(formData.attributes?.type === 'sport' || formData.attributes?.type === 'wellness') && (
                                    <div className="col-span-full grid grid-cols-2 gap-6 pt-4" style={{ borderTop: `1px solid var(--border-primary)` }}>
                                        <Input label="Durée de la séance" placeholder="Ex: 1h30" value={formData.attributes.duration} onChange={(v: string) => handleAttributeChange('duration', v)} />
                                        <div className="flex items-end pb-4">
                                            <Checkbox label="Expérience Privatisée" checked={formData.attributes.is_private} onChange={(v: boolean) => handleAttributeChange('is_private', v)} />
                                        </div>
                                    </div>
                                )}

                                {/* INFO DE RESERVATION (Tous types) */}
                                <div className="col-span-full pt-4" style={{ borderTop: `1px solid var(--border-primary)` }}>
                                    <TextArea
                                        label="Procédure de réservation (info secrète post-achat)"
                                        placeholder="Ex: Appelez le 01... ou envoyez un mail à... Réservation obligatoire via notre interface partenaire. Annulation gratuite sous 48h."
                                        value={formData.attributes?.booking_info}
                                        onChange={(v: string) => handleAttributeChange('booking_info', v)}
                                    />
                                </div>
                            </div>
                        </Section>
                    </div>

                    {/* SIDEBAR: PRIX & TEMPS */}
                    <div className="space-y-10">
                        <Section title="Pricing Strategie">
                            <Input label="Mise à prix (€)" type="number" value={formData.start_price} onChange={(v: string) => setFormData({ ...formData, start_price: Number(v) })} />
                            <Input label="Prix de réserve (€)" type="number" value={formData.reserve_price} onChange={(v: string) => setFormData({ ...formData, reserve_price: Number(v) })} />
                            {formData.type !== 'auction' && (
                                <Input label="Prix 'Achat Immédiat' (€)" type="number" value={formData.buy_now_price} onChange={(v: string) => setFormData({ ...formData, buy_now_price: Number(v) })} />
                            )}
                        </Section>
                        <Section title="Partenariat & Logistique">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Nom de l'agence partenaire"
                                    placeholder="ex: Voyage Privé, Agence Luxe Paris..."
                                    value={formData.partner_name || ''}
                                    onChange={(v: string) => setFormData({ ...formData, partner_name: v })}
                                />
                                <Input
                                    label="Email de l'agence (Contact interne)"
                                    type="email"
                                    placeholder="resa@agence.com"
                                    value={formData.partner_email || ''}
                                    onChange={(v: string) => setFormData({ ...formData, partner_email: v })}
                                />
                            </div>

                            <div className="mt-4">
                                <Input
                                    label="URL de redirection (Booking Online)"
                                    placeholder="https://partenaire.com/booking/123"
                                    value={formData.booking_url || ''}
                                    onChange={(v: string) => setFormData({ ...formData, booking_url: v })}
                                />
                                <p className="text-[10px] mt-1 italic" style={{ color: 'var(--text-secondary)' }}>
                                    * Si rempli, le gagnant sera redirigé vers ce lien pour payer.
                                </p>
                            </div>
                        </Section>

                        <Section title="Programmation">
                            <Input label="Ouverture des enchères" type="datetime-local" value={formData.start_at} onChange={(v: string) => setFormData({ ...formData, start_at: v })} />
                            <Input label="Clôture automatique" type="datetime-local" value={formData.end_at} onChange={(v: string) => setFormData({ ...formData, end_at: v })} />
                        </Section>

                        <Section title="Statut de l'enchère">
                            <StatusSelect 
                                label="Statut" 
                                value={formData.status} 
                                onChange={(v: any) => setFormData({ ...formData, status: v })} 
                            />
                        </Section>
                    </div>

                </div>
            </form>
        </div>
    );
}

// --- UI COMPONENTS (CSS VARIABLES) ---

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="p-8 rounded-[2.5rem] border shadow-sm space-y-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] border-b pb-4" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-primary)' }}>{title}</h2>
            {children}
        </div>
    );
}

function Input({ label, type = "text", value, onChange, placeholder, icon }: any) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[10px] font-black uppercase ml-1 flex items-center gap-2 tracking-wider" style={{ color: 'var(--text-secondary)' }}>{icon}{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="p-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 transition-all"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-primary)`,
                    '--tw-ring-color': 'rgba(0, 0, 0, 0.05)'
                } as any}
            />
        </div>
    );
}

function Select({ label, value, options, onChange }: any) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[10px] font-black uppercase ml-1 tracking-wider" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="p-4 rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:ring-4 transition-all"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-primary)`,
                    '--tw-ring-color': 'rgba(0, 0, 0, 0.05)'
                } as any}
            >
                {options.map((opt: string) => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
            </select>
        </div>
    );
}

function Checkbox({ label, checked, onChange }: any) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all" style={{ backgroundColor: checked ? 'var(--accent-gold)' : 'var(--bg-secondary)', borderColor: checked ? 'var(--accent-gold)' : 'var(--border-primary)' }}>
                <input type="checkbox" checked={checked || false} onChange={e => onChange(e.target.checked)} className="hidden" />
                {checked && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bg-primary)' }} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        </label>
    );
}

function TextArea({ label, value, onChange }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase ml-1 tracking-wider" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <textarea
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                rows={5}
                className="p-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 transition-all"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-primary)`,
                    '--tw-ring-color': 'rgba(0, 0, 0, 0.05)'
                } as any}
            />
        </div>
    );
}

function StatusSelect({ label, value, onChange }: any) {
    const statusLabels: Record<string, string> = {
        upcoming: 'À venir',
        active: 'En cours',
        finished_reserve_not_met: 'Fini - sans vainqueur',
        finished_unpaid: 'Fini - Attente paiement',
        finished_paid: 'Fini - Payé',
        completed: 'Prestation terminée'
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[10px] font-black uppercase ml-1 tracking-wider" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="p-4 rounded-2xl text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:ring-4 transition-all"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-primary)`,
                    '--tw-ring-color': 'rgba(0, 0, 0, 0.05)'
                } as any}
            >
                {Object.entries(statusLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    );
}