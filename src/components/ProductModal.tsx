"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Check, Tag } from "lucide-react";
import type { Product } from "@/data/products";
import { productWhatsappLink } from "@/lib/site";
import ProductImage from "./ProductImage";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  // Cerrar con tecla Escape + bloquear scroll de fondo
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Tarjeta */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink shadow-soft backdrop-blur transition hover:bg-white hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Imagen grande */}
            <div className="relative aspect-[4/3] bg-sand-100 md:aspect-auto md:h-full">
              <ProductImage
                src={product.image}
                alt={product.name}
                category={product.category}
                className="h-full w-full"
              />
            </div>

            {/* Detalles */}
            <div className="flex max-h-[90vh] flex-col overflow-y-auto p-7 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-copper-dark">
                  <Tag className="h-3 w-3" />
                  {product.categoryLabel}
                </span>
                {product.brand && (
                  <span className="inline-flex w-fit items-center rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sand-50">
                    {product.brand}
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {product.name}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {product.details}
              </p>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Beneficios
                </p>
                <ul className="mt-3 space-y-2.5">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper-dark">
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-2xl bg-sand-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                  Precio
                </p>
                <p className="mt-1 font-serif text-xl text-ink">
                  {product.price ?? "Consultar precio"}
                </p>
              </div>

              <a
                href={productWhatsappLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6 w-full"
              >
                <MessageCircle className="h-5 w-5" />
                Comprar por WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
