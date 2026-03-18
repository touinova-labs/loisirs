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
		default: "Loisirs-Privé | Expériences Hôtelières Exclusives",
		template: "%s | Loisirs-Privé"
	},
	description: "Découvrez des séjours et expériences hôtelières uniques, réservés aux membres. Accédez à des offres confidentielles et sécurisées, hors des parcours de réservation classiques.",
	applicationName: "Loisirs-Privé",
	keywords: [
		"séjours exclusifs",
		"expériences hôtelières",
		"accès réservé",
		"membres",
		"confidentialité",
		"voyage de luxe",
		"séjour premium"
	],
	authors: [{ name: "Loisirs-Privé", url: "https://loisirs-prive.fr" }],
	creator: "Loisirs-Privé",
	publisher: "Loisirs-Privé",
	formatDetection: {
		email: false,
		telephone: false,
		address: false,
	},
	viewport: "width=device-width, initial-scale=1, maximum-scale=1",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Loisirs-Privé",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: "/apple-touch-icon.png",
		other: [
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#10B981",
			},
		],
	},
	manifest: "/manifest.json",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#F9FAFB" },
		{ media: "(prefers-color-scheme: dark)", color: "#020617" },
	],
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://loisirs-prive.fr",
		siteName: "LoisirsPrivé",
		title: "Loisirs-Privé | Expériences Hôtelières Exclusives",
		description: "Découvrez des séjours et expériences hôtelières uniques, réservés aux membres. Accédez à des offres confidentielles et sécurisées, hors des parcours de réservation classiques.",
		images: ["/og-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Loisirs-Privé | Expériences Hôtelières Exclusives",
		description: "Découvrez des séjours et expériences hôtelières uniques, réservés aux membres. Accédez à des offres confidentielles et sécurisées, hors des parcours de réservation classiques.",
		images: ["/og-image.png"],
		creator: "@loisirsprive",
	},
	robots: {
		index: true,
		follow: true,
		"max-image-preview": "large",
		"max-snippet": -1,
		"max-video-preview": -1,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	alternates: {
		canonical: "https://loisirs-prive.fr",
	},
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
