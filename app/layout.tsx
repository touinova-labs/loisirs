import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "@/hooks/UserContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://loisirs-prive.fr"),
	title: {
		default: "Loisirs-Privé | Expériences hôtelières réservées à nos membres",
		template: "%s | Loisirs-Privé"
	},
	description: "Rejoignez un cercle réservé et découvrez des expériences hôtelières soigneusement sélectionnées. Des séjours proposés avec discrétion, accessibles uniquement à nos membres.",
	applicationName: "Loisirs-Privé",
	keywords: [
		"séjours exclusifs",
		"expériences hôtelières",
		"accès privé",
		"membres",
		"voyage confidentiel",
		"séjour d'exception",
		"hôtels premium"
	],
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://loisirs-prive.fr",
		siteName: "Loisirs-Privé",
		title: "Loisirs-Privé | Expériences hôtelières réservées à nos membres",
		description: "Rejoignez un cercle réservé et découvrez des expériences hôtelières soigneusement sélectionnées. Des séjours proposés avec discrétion, accessibles uniquement à nos membres.",
		images: ["/og-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Loisirs-Privé | Expériences hôtelières réservées à nos membres",
		description: "Entrez dans un cercle réservé et découvrez des séjours d’exception proposés de manière confidentielle.",
		images: ["/og-image.png"],
		creator: "@loisirsprive",
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/manifest.json",
};

export default function RootLayout({ children, }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<UserProvider>
						{children}
					</UserProvider>
					<footer className="border-t py-10 opacity-50 text-[9px] font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
						<div className="flex justify-center gap-8 mb-4">
							<Link href="/legal/cgu">CGU</Link>
							<Link href="/legal/cgv">CGV</Link>
							<Link href="/legal/privacy">Confidentialité</Link>
							<Link href="/legal/mentions-legales">Mentions Légales</Link>
							<Link href="/partners">Proposer mes offres</Link>
						</div>
						<p className="flex justify-center">© 2026 Loisirs-Privé. Tous droits réservés.</p>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
