import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const payload = await req.json();

  // On vérifie que c'est bien un succès de paiement
  if (payload.type === 'checkout.session.completed') {
    const session = payload.data.object;
    
    // On récupère l'ID de l'enchère que tu auras passé dans les metadata Stripe
    const auctionId = session.metadata.auction_id;

    if (auctionId) {
      const { error } = await supabase
        .from('auctions')
        .update({ status: 'finished_paid' })
        .eq('id', auctionId);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}