import { MagicLinkEmail } from '@/app/emails/MagicLinkEmail';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { render } from '@react-email/render';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { json } from 'stream/consumers';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. GÉNÉRER LE LIEN D'AUTHENTIFICATION
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        // L'URL où l'utilisateur atterrit après avoir cliqué
        redirectTo: `https://www.loisirs-prive.fr/`  
      }
    });

    if (error) throw error;

    // Le lien magique généré par Supabase
    const magicLink = data.properties.action_link;
    console.log(magicLink)

    // ICI : Ajoute le await car render est asynchrone
    const emailHtml = await render(MagicLinkEmail({ magicLink }));

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