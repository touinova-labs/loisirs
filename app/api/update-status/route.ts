import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { id, newStatus } = await req.json();
    // 1. (Optionnel) Vérification de sécurité supplémentaire ici
    // ex: vérifier le cookie de session pour voir si l'email est admin

    // 2. Update via le client admin (ignore RLS)
    const { data, error } = await supabaseAdmin
        .from('auctions')
        .update({ status: newStatus })
        .eq('id', id)
        .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}