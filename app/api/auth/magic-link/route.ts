import { MagicLinkEmail } from '@/app/emails/MagicLinkEmail';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { render } from '@react-email/render';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
	try {
		const { email, theme } = await req.json();

		// 1. Vérifier si l'utilisateur a déjà complété son onboarding
		const { data: profile } = await supabaseAdmin
			.from('profiles')
			.select('onboarding_completed')
			.eq('email', email)
			.single();

		const is_new = !profile || profile.onboarding_completed === false;

		// 2. Générer le lien magique via Supabase
		const { data, error } = await supabaseAdmin.auth.admin.generateLink({
			type: 'magiclink',
			email: email,
			options: {
				// Si nouveau, on l'envoie vers l'onboarding, sinon vers les enchères
				redirectTo: is_new
					? `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding`
					: `${process.env.NEXT_PUBLIC_SITE_URL}/`
			}
		});

		if (error) throw error;

		// Le lien magique généré par Supabase
		const magicLink = data.properties.action_link;

		// ICI : Ajoute le await car render est asynchrone
		const emailHtml = await render(MagicLinkEmail({ magicLink, theme, is_new }));

		const msg: MailDataRequired = {
			to: email,
			from: {
				name: 'Loisirs Privé', // Ton Company Name / Sender Name
				email: 'club@loisirs-prive.fr',
			},
			subject: 'Votre accès privé 🔑',
			html: emailHtml, // Maintenant c'est bien un string, pas une Promise
		};

		await sgMail.send(msg);
		return Response.json({ success: true });
	} catch (error) {
		console.error(error);
		return Response.json({ error: 'Failed to send' }, { status: 500 });
	}
}