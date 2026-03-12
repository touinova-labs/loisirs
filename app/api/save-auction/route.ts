import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {


    try {
        const body = await req.json();
        const { id, ...data } = body;

        let result;
        if (id) {
            // MODE EDITION
            result = await supabaseAdmin.from('auctions').update(data).eq('id', id).select();
        } else {
            // MODE CREATION
            result = await supabaseAdmin.from('auctions').insert([data]).select();
        }

        if (result.error) throw result.error;
        return NextResponse.json({ success: true, data: result.data[0] });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}