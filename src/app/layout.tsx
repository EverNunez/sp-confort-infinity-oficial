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

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "Sanitarios, griferías y equipamientos seleccionados para baños y cocinas modernas. Asesoramiento personalizado y compra por WhatsApp.",
  keywords: [
    "sanitarios",
    "griferías",
    "baño",
    "cocina",
    "Paraguay",
    "SP Confort Infinity",
    "inodoros",
    "duchas",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Elegancia, calidad y confort para cada espacio. Catálogo de sanitarios y griferías por WhatsApp.",
    type: "website",
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
