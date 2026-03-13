import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
	try {
		const { userId, firstName, lastName, acceptedNewsletter } = await req.json();

		// Validation basique
		if (!userId || !firstName || !lastName) {
			return NextResponse.json(
				{ success: false, error: 'userId, firstName et lastName sont requis' },
				{ status: 400 }
			);
		}

		const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
		if (authError || !authUser.user) {
			return NextResponse.json(
				{ success: false, error: 'Impossible de trouver l\'email de cet utilisateur dans Auth' },
				{ status: 400 }
			);
		}

		const userEmail = authUser.user.email;

		const { data, error } = await supabaseAdmin
			.from('profiles')
			.upsert({
				id: userId, // La clé primaire pour vérifier l'existence
				first_name: firstName,
				email: userEmail,
				last_name: lastName,
				onboarding_completed: true,
				updated_at: new Date().toISOString(),
				accepted_newsletter : acceptedNewsletter
			}, {
				onConflict: 'id' // En cas de conflit sur l'ID, on fait l'update
			})
			.select();

		if (error) throw error;

		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		console.error('Error updating profile:', error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
