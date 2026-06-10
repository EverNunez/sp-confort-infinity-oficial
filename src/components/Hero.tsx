"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Droplets, ShowerHead, Sparkles } from "lucide-react";
import { whatsappLink, GENERIC_WHATSAPP_MESSAGE } from "@/lib/site";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden">
      {/* Fondo con degradado elegante + parallax */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-sand-50 to-white"
      />
      <div className="pointer-events-none absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-copper/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-48 -z-10 h-80 w-80 rounded-full bg-sand-300/40 blur-3xl" />

      <div className="container-px grid min-h-[92vh] grid-cols-1 items-center gap-12 pb-20 pt-36 lg:grid-cols-2 lg:gap-8 lg:pt-40">
        {/* Texto */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow">
            <span className="copper-rule" />
            Sanitarios · Griferías · Equipamientos
          </motion.span>

          <motion.h1
            variants={item}
            className="heading-serif mt-6 text-4xl sm:text-5xl lg:text-6xl"
          >
            Elegancia, calidad y confort{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-copper-dark">
                para cada espacio
              </span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-copper/15" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            Sanitarios, griferías y equipamientos seleccionados para baños y
            cocinas modernas. Diseño, calidad y funcionalidad, con
            asesoramiento personalizado.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#productos" className="btn-primary">
              Ver productos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6"
          >
            {[
              { icon: Droplets, label: "Griferías premium" },
              { icon: ShowerHead, label: "Sanitarios de calidad" },
              { icon: Sparkles, label: "Asesoramiento experto" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-5 w-5 text-copper" />
                <span className="text-sm font-medium text-ink-soft">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Composición visual */}
        <motion.div
          style={{ y: yArt, opacity }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden h-[520px] w-full max-w-md lg:block"
        >
          {/* tarjeta principal: foto real de showroom sobre arte de respaldo */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-sand-100 to-sand-200 shadow-card">
            {/* capa de respaldo (visible si la foto no carga) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(176,141,87,0.18),transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.5)_50%,transparent_60%)]" />
            <svg
              viewBox="0 0 200 320"
              className="absolute left-1/2 top-1/2 h-[78%] -translate-x-1/2 -translate-y-1/2"
              fill="none"
            >
              <rect x="60" y="250" width="80" height="14" rx="7" fill="#ddd3c4" />
              <path
                d="M100 250 V150 Q100 110 140 110 H150"
                stroke="#1a1816"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="100" cy="150" r="16" fill="#b08d57" />
              <rect x="138" y="104" width="20" height="12" rx="6" fill="#1a1816" />
              <path
                d="M148 120 q-2 26 -2 40"
                stroke="#c9a877"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>

            {/* foto real (se oculta sola si falla, dejando ver el arte) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-showroom.jpg"
              alt="Showroom de baño premium de SP Confort Infinity"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* scrim cálido para legibilidad y tono de marca */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(176,141,87,0.22),transparent_55%)]" />
          </div>

          {/* tarjeta flotante 1 */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 w-40 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-dark">
              Showroom
            </p>
            <p className="mt-1 font-serif text-lg text-ink">Ambientes de lujo</p>
          </motion.div>

          {/* tarjeta flotante 2 */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-4 bottom-12 w-44 rounded-2xl border border-white/70 bg-ink p-4 text-sand-50 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-copper-light">
              Compra simple
            </p>
            <p className="mt-1 font-serif text-lg">Por WhatsApp</p>
          </motion.div>
        </motion.div>
      </div>

      {/* indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
          Descubrí más
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-copper to-transparent"
        />
      </motion.div>
    </section>
  );
}
