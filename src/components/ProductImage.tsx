"use client";

import { useState } from "react";
import type { CategoryId } from "@/data/products";
import { Bath, Droplets, ShowerHead, Thermometer, Cog } from "lucide-react";

/**
 * Imagen de producto con fallback elegante.
 * Si la foto real (en /public/products) aún no existe, muestra un
 * placeholder sobrio con degradado y un ícono según la categoría.
 * Cuando reemplaces la imagen, aparecerá automáticamente.
 */

const GRADIENTS: Record<CategoryId, string> = {
  inodoros: "from-sand-100 via-white to-sand-200",
  bachas: "from-white via-sand-100 to-sand-200",
  "griferias-lavatorio": "from-[#eee9e1] via-white to-[#e7ded0]",
  "griferias-cocina": "from-[#ece6dc] via-white to-[#f5f2ed]",
  "griferias-ducha": "from-[#e9ede9] via-white to-[#eef1ef]",
  termocalefones: "from-sand-200 via-white to-sand-100",
  motores: "from-[#e8e9ea] via-white to-[#eef0f1]",
};

function CategoryIcon({ category }: { category: CategoryId }) {
  const cls = "h-10 w-10 text-copper";
  if (category === "griferias-ducha") return <ShowerHead className={cls} />;
  if (category === "termocalefones") return <Thermometer className={cls} />;
  if (category === "motores") return <Cog className={cls} />;
  if (category === "inodoros" || category === "bachas")
    return <Bath className={cls} />;
  return <Droplets className={cls} />;
}

export default function ProductImage({
  src,
  alt,
  category,
  className = "",
}: {
  src: string;
  alt: string;
  category: CategoryId;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || !src || src.trim() === "";

  if (showFallback) {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br ${GRADIENTS[category]} ${className}`}
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 shadow-soft ring-1 ring-copper/20">
            <CategoryIcon category={category} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            SP Confort Infinity
          </span>
        </div>
        {/* brillo sutil */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_55%)]" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
