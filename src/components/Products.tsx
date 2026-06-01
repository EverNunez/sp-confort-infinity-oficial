"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { type CategoryId, type Product, type Category } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Reveal from "./Reveal";

type Filter = "all" | CategoryId;

export default function Products({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products]
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Todos" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <section id="productos" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="copper-rule" />
            Productos
            <span className="copper-rule rotate-180" />
          </span>
          <h2 className="heading-serif mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Nuestro catálogo
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Explorá por categoría y consultá o comprá por WhatsApp. Un vendedor
            te asesora y cierra tu compra.
          </p>
        </Reveal>

        {/* Filtros */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active
                      ? "text-sand-50"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {!active && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-ink/10 bg-white" />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grilla de productos (remonta al cambiar filtro → entrada escalonada) */}
        <div
          key={filter}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onView={setSelected}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-ink-muted">
            No hay productos en esta categoría todavía.
          </p>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
