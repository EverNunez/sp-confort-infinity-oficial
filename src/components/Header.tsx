"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { SITE, whatsappLink, GENERIC_WHATSAPP_MESSAGE } from "@/lib/site";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#nosotros" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll de fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-sand-50/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between py-3">
        <a href="#inicio" className="flex items-center gap-3" aria-label={SITE.name}>
          <Logo size={scrolled ? 46 : 52} />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-semibold tracking-tight text-ink">
              SP Confort Infinity
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-copper-dark">
              Un concepto de lujo
            </span>
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
            rel="noopener noreferrer"
            className="btn-whatsapp hidden sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink backdrop-blur transition hover:border-copper/40 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink/5 bg-sand-50/95 backdrop-blur-md lg:hidden"
          >
            <nav className="container-px flex flex-col py-4">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-ink/5 py-3 text-base font-medium text-ink-soft"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-whatsapp mt-4 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
