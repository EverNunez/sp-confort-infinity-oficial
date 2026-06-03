// =============================================================
//  CONFIGURACIÓN CENTRAL DE LA EMPRESA
//  Cambiá aquí los datos de contacto, redes y ubicación.
// =============================================================

export const SITE = {
  name: "SP Confort Infinity",
  tagline: "Un concepto de lujo",
  shortName: "SP Confort Infinity",

  // --- WhatsApp (número internacional, sin signos ni espacios) ---
  // Sobreescribible con variables de entorno (ver .env.example).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "595976160007",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "0976 160 007",

  // --- Redes ---
  instagramHandle: "@spconfortinfinity",
  instagramUrl: "https://www.instagram.com/spconfortinfinity",

  // --- Ubicación ---
  city: "Aviadores esquina Doctor Noguez",
  // Ubicación real del local (Google Maps).
  mapsLink: "https://maps.app.goo.gl/VGiuEW63A3DkJdAc6",
  // Iframe embebido (editable). Cambiá el parámetro q= por tu dirección real.
  mapsEmbed:
    "https://www.google.com/maps?q=Aviadores%20esquina%20Doctor%20Noguez&output=embed",
  // Por defecto se muestra una tarjeta de ubicación elegante (no rompe el preview).
  // Poné `true` para mostrar el iframe real de Google Maps en el navegador.
  mapsEmbedEnabled: false,

  // --- Horario de atención ---
  hours: [
    { day: "Lunes a Viernes", time: "07:00 — 17:00" },
    { day: "Sábados", time: "07:00 — 12:00" },
    { day: "Domingos", time: "Cerrado" },
  ],
} as const;

/**
 * Genera un enlace de WhatsApp con mensaje pre-cargado.
 * Centraliza el número para que solo se edite en SITE.whatsappNumber.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Mensaje estándar para consultar por un producto (estado "Disponible"). */
export function productWhatsappLink(productName: string): string {
  return whatsappLink(
    `Hola, quiero consultar por el producto: ${productName}.`
  );
}

export const GENERIC_WHATSAPP_MESSAGE =
  "Hola, quiero más información sobre los productos de SP Confort Infinity.";
