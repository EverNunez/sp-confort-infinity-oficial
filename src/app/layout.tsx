import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://spconfortinfinity.com";
const SITE_DESCRIPTION =
  "Sanitarios, griferías, bachas, inodoros, termocalefones y motores en Paraguay. Atención por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  keywords: [
    "SP Confort Infinity",
    "sanitarios",
    "griferías",
    "bachas",
    "inodoros",
    "termocalefones",
    "motores",
    "Paraguay",
    "baño",
    "cocina",
    "griferías de cocina",
    "griferías de lavatorio",
    "griferías de ducha",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "eWtxHaqTYZ2hl6yItsaMAqrzx-6E8Cs0xUKaCZggr7A",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/brand/logo-sp-confort-infinity.jpg",
        width: 290,
        height: 290,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE_DESCRIPTION,
    images: ["/brand/logo-sp-confort-infinity.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
