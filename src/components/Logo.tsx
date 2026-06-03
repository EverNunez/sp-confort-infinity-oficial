"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Logo oficial de SP Confort Infinity.
 * Usa la imagen real del cliente recortada en círculo (oculta el fondo gris
 * del archivo original). Si la imagen no carga, cae a una reconstrucción SVG,
 * de modo que el logo nunca se rompe.
 */
export default function Logo({
  size = 56,
}: {
  size?: number;
  variant?: "dark" | "light";
}) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <span
        className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-ink/10"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-sp-confort-infinity.jpg"
          alt={SITE.name}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return <LogoSvg size={size} />;
}

/** Reconstrucción en SVG (fallback). */
function LogoSvg({ size }: { size: number }) {
  const ring = "#1a1816";
  const face = "#ffffff";
  const text = "#1a1816";
  const mark = "#1a1816";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={SITE.name}
      className="shrink-0"
    >
      <defs>
        <path id="topArc" d="M 30,100 A 70,70 0 0 1 170,100" fill="none" />
        <path id="bottomArc" d="M 38,108 A 62,62 0 0 0 162,108" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="96" fill="none" stroke={ring} strokeWidth="3" opacity="0.25" />
      <circle cx="100" cy="100" r="88" fill={face} />
      <circle cx="100" cy="100" r="80" fill="none" stroke={text} strokeWidth="1" opacity="0.35" />

      <text fill={text} fontSize="13" fontWeight="600" letterSpacing="2.5" fontFamily="Georgia, serif">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SP CONFORT INFINITY S.A.
        </textPath>
      </text>
      <text fill={text} fontSize="9.5" fontWeight="500" letterSpacing="2" fontFamily="Georgia, serif">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          UN CONCEPTO DE LUJO
        </textPath>
      </text>

      <g stroke={mark} strokeWidth="6" strokeLinecap="round" fill="none">
        <line x1="92" y1="68" x2="92" y2="132" />
        <line x1="92" y1="78" x2="118" y2="64" />
        <line x1="92" y1="100" x2="116" y2="86" />
      </g>
    </svg>
  );
}
