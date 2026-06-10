"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { stockCta } from "@/lib/stock";
import ProductImage from "./ProductImage";
import StockBadge from "./StockBadge";

const ProductCard = forwardRef<
  HTMLElement,
  { product: Product; index?: number; onView: (product: Product) => void }
>(function ProductCard({ product, index = 0, onView }, ref) {
  const cta = stockCta(product.name, product.stockStatus);
  const isOut = product.stockStatus === "OUT_OF_STOCK";
  const isOnRequest = product.stockStatus === "ON_REQUEST";
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-card"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
            isOut ? "grayscale-[35%]" : ""
          }`}
        />
        {isOut && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-white/45" />
            <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sand-50 backdrop-blur">
              Sin stock
            </span>
          </>
        )}
        {isOnRequest && (
          <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-copper to-copper-dark px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-soft">
            A pedido
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-copper-dark backdrop-blur">
          {product.categoryLabel}
        </span>
        <button
          type="button"
          onClick={() => onView(product)}
          className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/15 group-hover:opacity-100"
          aria-label={`Ver detalles de ${product.name}`}
        >
          <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-card">
            <Eye className="h-4 w-4" />
            Ver detalles
          </span>
        </button>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        {product.brand && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-dark">
            {product.brand}
          </span>
        )}
        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-copper-dark">
            {product.price ?? "Consultar precio"}
          </span>
          <StockBadge status={product.stockStatus} />
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href={cta.href}
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 px-3 py-2.5 text-xs"
          >
            <MessageCircle className="h-4 w-4" />
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => onView(product)}
            className="btn-outline px-3 py-2.5 text-xs"
          >
            <Eye className="h-4 w-4" />
            Detalles
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
