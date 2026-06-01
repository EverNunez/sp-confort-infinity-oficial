"use client";

import { motion } from "framer-motion";
import { Gem, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import Reveal from "./Reveal";

const VALUES = [
  {
    icon: Gem,
    title: "Calidad",
    text: "Productos seleccionados que responden a estándares exigentes de fabricación y terminación.",
  },
  {
    icon: Sparkles,
    title: "Elegancia",
    text: "Diseños modernos y atemporales que elevan la estética de baños y cocinas.",
  },
  {
    icon: ShieldCheck,
    title: "Durabilidad",
    text: "Materiales resistentes pensados para el uso diario y para perdurar en el tiempo.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Asesoramiento cercano para ayudarte a elegir la solución ideal para tu espacio.",
  },
];

function AmbientImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-sand-100 via-white to-sand-200 shadow-soft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
      <p className="absolute inset-x-5 bottom-4 font-serif text-lg text-sand-50 drop-shadow">
        {caption}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="container-px">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Columna texto */}
          <Reveal direction="right">
            <span className="eyebrow">
              <span className="copper-rule" />
              Quiénes Somos
            </span>
            <h2 className="heading-serif mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
              Un concepto de lujo para tu hogar
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              En <strong className="font-semibold text-ink">SP Confort Infinity S.A.</strong>{" "}
              ofrecemos soluciones para baños y cocinas con productos
              funcionales, modernos y de calidad. Combinamos diseño,
              calidad y funcionalidad para transformar cada ambiente.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Te acompañamos con asesoramiento personalizado para que
              encuentres la grifería, el sanitario o el accesorio perfecto,
              y cierres tu compra de forma simple a través de WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Diseño", "Calidad", "Funcionalidad"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-copper/25 bg-sand-100 px-4 py-1.5 text-sm font-medium text-copper-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Columna tarjetas de valores */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="card group flex flex-col p-6 transition-shadow duration-300 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-sand-50 transition-colors duration-300 group-hover:bg-copper">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Banda visual de ambientes */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal direction="right">
            <AmbientImage
              src="/about-spa.jpg"
              alt="Ambiente de baño cálido y elegante"
              caption="Ambientes que invitan a relajarse"
            />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <AmbientImage
              src="/feature-marble.jpg"
              alt="Baño de mármol con bachas de apoyo y mueble de madera"
              caption="Materiales nobles y terminaciones premium"
            />
          </Reveal>
        </div>
      </div>

      {/* Transición fluida hacia "Dónde estamos" */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-sand-100" />
    </section>
  );
}
