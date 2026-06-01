"use client";

import { MapPin, MessageCircle, Instagram, Navigation, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import { SITE, whatsappLink, GENERIC_WHATSAPP_MESSAGE } from "@/lib/site";

export default function Location() {
  return (
    <section
      id="ubicacion"
      className="scroll-mt-24 bg-gradient-to-b from-sand-100 to-sand-50 py-24 lg:py-32"
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="copper-rule" />
            Dónde nos encontramos
            <span className="copper-rule rotate-180" />
          </span>
          <h2 className="heading-serif mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Visitanos o escribinos
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Estamos para asesorarte y ayudarte a renovar tus espacios.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Datos */}
          <Reveal direction="right" className="lg:col-span-2">
            <div className="card flex h-full flex-col gap-6 p-8">
              <InfoRow
                icon={MapPin}
                title="Dirección"
                value={SITE.city}
                note="Editá la dirección exacta en src/lib/site.ts"
              />
              <div className="h-px bg-ink/5" />
              <InfoRow
                icon={MessageCircle}
                title="WhatsApp"
                value={SITE.whatsappDisplay}
              />
              <div className="h-px bg-ink/5" />
              <InfoRow
                icon={Instagram}
                title="Instagram"
                value={SITE.instagramHandle}
                href={SITE.instagramUrl}
              />

              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1"
                >
                  <Navigation className="h-4 w-4" />
                  Abrir ubicación
                </a>
                <a
                  href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Mapa: tarjeta elegante por defecto; iframe real solo si se habilita */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            {SITE.mapsEmbedEnabled ? (
              <div className="card h-full overflow-hidden p-2">
                <iframe
                  title="Ubicación SP Confort Infinity"
                  src={SITE.mapsEmbed}
                  className="h-[340px] w-full rounded-xl lg:h-full lg:min-h-[420px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : (
              <MapCard />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  value,
  note,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  value: string;
  note?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-copper">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {title}
        </p>
        <p className="mt-0.5 font-serif text-lg text-ink">{value}</p>
        {note && <p className="mt-1 text-xs text-ink-muted/80">{note}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        {content}
      </a>
    );
  }
  return content;
}

/**
 * Tarjeta de ubicación elegante (sin iframe), para que el preview nunca
 * quede bloqueado por la carga externa de Google Maps. El botón abre
 * Google Maps en una pestaña nueva. Para usar el mapa embebido real en el
 * navegador, poné SITE.mapsEmbedEnabled = true en src/lib/site.ts.
 */
function MapCard() {
  return (
    <div className="card group relative h-full min-h-[340px] overflow-hidden lg:min-h-[420px]">
      {/* Fondo tipo mapa estilizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-white to-sand-200" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 600 460"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="#ddd3c4" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="460" fill="url(#grid)" />
        {/* "avenidas" */}
        <path d="M-20 320 L640 180" stroke="#cbbfa9" strokeWidth="10" fill="none" opacity="0.7" />
        <path d="M120 -20 L260 480" stroke="#cbbfa9" strokeWidth="8" fill="none" opacity="0.6" />
        <path d="M-20 90 L640 380" stroke="#e3d9c8" strokeWidth="6" fill="none" />
        {/* "manzanas" destacadas */}
        <rect x="300" y="210" width="120" height="80" rx="8" fill="#b08d57" opacity="0.12" />
        <rect x="160" y="120" width="90" height="70" rx="8" fill="#b08d57" opacity="0.1" />
      </svg>

      {/* brillo radial sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.7),transparent_60%)]" />

      {/* Pin central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[140%]">
        <span className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-copper/30" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sand-50 shadow-card ring-4 ring-white/70">
            <MapPin className="h-6 w-6 text-copper-light" />
          </span>
        </span>
      </div>

      {/* Etiqueta inferior */}
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-copper-dark">
            Showroom · {SITE.city}
          </p>
          <p className="mt-1 font-serif text-lg text-ink">
            Te esperamos en nuestro local
          </p>
        </div>
        <a
          href={SITE.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shrink-0 px-5 py-2.5 text-xs"
        >
          <ExternalLink className="h-4 w-4" />
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
}
