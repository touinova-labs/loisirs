import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
	Link,
} from "@react-email/components";
import { WebSiteTheme } from "../providers/ThemeProvider";
interface IProps {
	magicLink: string;
	theme: WebSiteTheme,
	is_new: boolean
}

export const MagicLinkEmail = ({ magicLink, theme, is_new }: IProps) => {
	// Sélection des couleurs en fonction du thème
	const isLuxe = theme === "theme-luxe";

	const colors = {
		bg: isLuxe ? "#020617" : "#F9FAFB",
		card: isLuxe ? "#0F172A" : "#FFFFFF",
		accent: isLuxe ? "#10B981" : "#FBBF24", // Vert Émeraude vs Or Ambre
		textMain: isLuxe ? "#F8FAFC" : "#1E293B",
		textMuted: isLuxe ? "#94A3B8" : "#64748B",
		border: isLuxe ? "#1E293B" : "#E2E8F0",
	};

	const heading = is_new ? "Vos privilèges commencent ici" : "Ravi de vous revoir";


	const previewText = is_new
		? "Accès membre : Vos privilèges Loisirs Privé 🔑"
		: "Bon retour parmi nous : Votre accès sécurisé 🔑";

	const mainMessage = is_new
		? "Votre invitation est prête. Finalisez votre adhésion pour profiter de notre"
		: "Votre accès sécurisé est prêt. Retrouvez dès maintenant notre";

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={{ ...main, backgroundColor: colors.bg }}>
				<Container style={{ ...container, backgroundColor: colors.card, borderColor: colors.border }}>

					<Section style={logoSection}>
						<Text style={{ ...logo, color: colors.accent, borderBottom: `2px solid ${colors.accent}` }}>
							L/P
						</Text>
					</Section>

					<Section style={content}>
						<Heading style={{ ...h1, color: colors.textMain }}>{heading}</Heading>

						<Text style={{ ...text, color: colors.textMuted }}>
							{mainMessage}
							<Text style={{ ...text, color: colors.textMuted }}>
								<strong style={{ color: colors.textMain }}> sélection d’expériences hôtelières</strong>,
								proposées de manière confidentielle à nos membres.
							</Text>
						</Text>

						<Section style={buttonContainer}>
							<Link href={magicLink} style={{ ...button, backgroundColor: colors.accent, color: isLuxe ? "#020617" : "#FFFFFF" }}>
								Découvrir la sélection
							</Link>
						</Section>

						<Text style={{ ...details, color: colors.textMuted }}>
							  Réservé aux membres • Sélection confidentielle • Expériences hôtelières
						</Text>
					</Section>

					<Section style={{ ...footer, borderTop: `1px solid ${colors.border}` }}>
						<Text style={{ ...footerText, color: colors.textMain }}>
							© {new Date().getFullYear()} LOISIRS PRIVÉ
						</Text>
						<Text style={{ ...footerNote, color: colors.textMuted }}>
							Ce lien expire dans 15 minutes.<br />
							<strong>Loisirs Privé : Expériences hôtelières réservées à nos membres.</strong>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Styles de base (sans les couleurs dynamiques)
const main = {
	fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
	padding: "40px 0",
};

const container = {
	margin: "0 auto",
	width: "500px",
	borderRadius: "4px",
	borderStyle: "solid",
	borderWidth: "1px",
	padding: "40px",
};

const logoSection = { textAlign: "center" as const, marginBottom: "30px" };
const logo = { fontSize: "32px", fontWeight: "bold", letterSpacing: "8px", display: "inline-block", paddingBottom: "8px" };
const content = { textAlign: "center" as const };
const h1 = { fontSize: "22px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "1px", margin: "30px 0 20px" };
const text = { fontSize: "15px", lineHeight: "24px", marginBottom: "30px" };
const buttonContainer = { textAlign: "center" as const, margin: "30px 0" };
const button = { borderRadius: "4px", fontSize: "13px", fontWeight: "bold", textDecoration: "none", display: "inline-block", padding: "16px 32px", letterSpacing: "1px" };
const details = { fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "2px", marginTop: "40px", opacity: 0.6 };
const footer = { marginTop: "40px", textAlign: "center" as const, paddingTop: "20px" };
const footerText = { fontSize: "12px", fontWeight: "bold", margin: "0 0 10px" };
const footerNote = { fontSize: "11px", lineHeight: "18px" };