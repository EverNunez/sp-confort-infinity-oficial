import { SITE } from "@/lib/site";

/**
 * Logo circular de SP Confort Infinity reconstruido en SVG.
 * Si más adelante tenés el logo en /public/logo.png, podés
 * reemplazar este componente por una <Image>.
 */
export default function Logo({
  size = 56,
  variant = "dark",
}: {
  size?: number;
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";
  const ring = isDark ? "#1a1816" : "#ffffff";
  const face = isDark ? "#1a1816" : "#ffffff";
  const text = isDark ? "#f5f2ed" : "#1a1816";
  const mark = isDark ? "#ffffff" : "#1a1816";

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
        <path
          id="topArc"
          d="M 30,100 A 70,70 0 0 1 170,100"
          fill="none"
        />
        <path
          id="bottomArc"
          d="M 38,108 A 62,62 0 0 0 162,108"
          fill="none"
        />
      </defs>

      {/* anillos */}
      <circle cx="100" cy="100" r="96" fill="none" stroke={ring} strokeWidth="3" opacity="0.25" />
      <circle cx="100" cy="100" r="88" fill={face} />
      <circle cx="100" cy="100" r="80" fill="none" stroke={text} strokeWidth="1" opacity="0.35" />

      {/* texto curvo superior */}
      <text fill={text} fontSize="13" fontWeight="600" letterSpacing="2.5" fontFamily="Georgia, serif">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          SP CONFORT INFINITY S.A.
        </textPath>
      </text>

      {/* texto curvo inferior */}
      <text fill={text} fontSize="9.5" fontWeight="500" letterSpacing="2" fontFamily="Georgia, serif">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          UN CONCEPTO DE LUJO
        </textPath>
      </text>

      {/* monograma central (símbolo tipo runa fehu ᚠ) */}
      <g stroke={mark} strokeWidth="6" strokeLinecap="round" fill="none">
        <line x1="92" y1="68" x2="92" y2="132" />
        <line x1="92" y1="78" x2="118" y2="64" />
        <line x1="92" y1="100" x2="116" y2="86" />
      </g>
    </svg>
  );
}
