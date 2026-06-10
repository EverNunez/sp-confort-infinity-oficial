"use client";

import { motion } from "framer-motion";
import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import Reveal from "./Reveal";
import { SITE, whatsappLink, GENERIC_WHATSAPP_MESSAGE } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-sand-50 lg:py-32"
    >
      {/* Decoración */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-copper/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-copper/10 blur-3xl" />

      <div className="container-px relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal direction="right">
            <span className="eyebrow text-copper-light">
              <span className="h-px w-16 bg-gradient-to-r from-copper-light to-transparent" />
              Contacto
            </span>
            <h2 className="heading-serif mt-5 text-3xl text-sand-50 sm:text-4xl lg:text-[2.75rem]">
              Renová tus espacios con productos que combinan diseño, calidad y
              funcionalidad.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand-200/80">
              Escribinos por WhatsApp y un asesor te ayuda a elegir lo ideal
              para tu baño o cocina.
            </p>

            <a
              href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
              rel="noopener noreferrer"
              className="btn-whatsapp mt-8 px-8 py-4 text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </Reveal>

          {/* Tarjetas de info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value={SITE.whatsappDisplay}
              href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
              delay={0}
            />
            <ContactCard
              icon={Instagram}
              title="Instagram"
              value={SITE.instagramHandle}
              href={SITE.instagramUrl}
              delay={0.1}
            />
            <ContactCard
              icon={MapPin}
              title="Ubicación"
              value={SITE.city}
              href={SITE.mapsLink}
              delay={0.2}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper/20 text-copper-light">
                <Clock className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-sand-200/70">
                Horario
              </p>
              <ul className="mt-2 space-y-1">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-2 text-sm text-sand-100">
                    <span className="text-sand-200/80">{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  delay,
}: {
  icon: typeof MapPin;
  title: string;
  value: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-copper/40 hover:bg-white/10"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper/20 text-copper-light transition-colors group-hover:bg-copper group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-sand-200/70">
        {title}
      </p>
      <p className="mt-1 font-serif text-lg text-sand-50">{value}</p>
    </motion.a>
  );
}
