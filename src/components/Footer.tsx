import { MessageCircle, Instagram, MapPin } from "lucide-react";
import Logo from "./Logo";
import { SITE, whatsappLink, GENERIC_WHATSAPP_MESSAGE } from "@/lib/site";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#nosotros" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/5 bg-sand-50">
      <div className="container-px py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <Logo size={52} />
              <div>
                <p className="font-serif text-lg font-semibold text-ink">
                  SP Confort Infinity
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-copper-dark">
                  Un concepto de lujo
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Sanitarios, griferías y equipamientos para baños y cocinas
              modernas. Diseño, calidad y funcionalidad.
            </p>
          </div>

          {/* Links rápidos */}
          <div className="md:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Navegación
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-copper-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Contacto
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappLink(GENERIC_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-copper-dark"
                >
                  <MessageCircle className="h-4 w-4 text-copper" />
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-copper-dark"
                >
                  <Instagram className="h-4 w-4 text-copper" />
                  {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-copper-dark"
                >
                  <MapPin className="h-4 w-4 text-copper" />
                  {SITE.city}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-muted">
            © {year} SP Confort Infinity — Todos los derechos reservados.
          </p>
          <p className="text-xs text-ink-muted">
            Sanitarios · Griferías · Equipamientos
          </p>
        </div>
      </div>
    </footer>
  );
}
