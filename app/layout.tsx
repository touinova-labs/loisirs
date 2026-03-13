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
	metadataBase: new URL("https://loisirsprive.fr"),
	title: {
		default: "LoisirsPrivé | L'Art de l'Enchère pour Séjours d'Exception",
		template: "%s | LoisirsPrivé"
	},
	description: "Accédez à une sélection exclusive de séjours et expériences d'exception en ventes privées et enchères. Privilèges réservés aux membres.",
	applicationName: "LoisirsPrivé",
	keywords: ["ventes privées", "enchères", "séjours de luxe", "expériences exclusives", "privilèges"],
	authors: [{ name: "LoisirsPrivé", url: "https://loisirsprive.fr" }],
	creator: "LoisirsPrivé",
	publisher: "LoisirsPrivé",
	formatDetection: {
		email: false,
		telephone: false,
		address: false,
	},
	viewport: "width=device-width, initial-scale=1, maximum-scale=1",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "LoisirsPrivé",
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
				color: "#d4af37",
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
		url: "https://loisirsprive.fr",
		siteName: "LoisirsPrivé",
		title: "LoisirsPrivé | L'Art de l'Enchère pour Séjours d'Exception",
		description: "Accédez à une sélection exclusive de séjours et expériences d'exception en ventes privées et enchères.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "LoisirsPrivé - Enchères de Luxe",
				type: "image/png",
			},
			{
				url: "/og-image-square.png",
				width: 800,
				height: 800,
				alt: "LoisirsPrivé - Enchères de Luxe",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "LoisirsPrivé | L'Art de l'Enchère pour Séjours d'Exception",
		description: "Accédez à une sélection exclusive de séjours et expériences d'exception.",
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
		canonical: "https://loisirsprive.fr",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
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
							<Link href="/legal/mentions">Mentions Légales</Link>
						</div>
						<p>© 2026 LoisirsPrivé. Tous droits réservés.</p>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
