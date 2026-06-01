"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Plus,
  LogOut,
  ExternalLink,
} from "lucide-react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/productos", label: "Productos", icon: Package, exact: false },
  {
    href: "/admin/productos/nuevo",
    label: "Nuevo",
    icon: Plus,
    exact: true,
  },
];

export default function AdminSidebar({
  userName,
}: {
  userName?: string | null;
}) {
  const pathname = usePathname();
  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="sticky top-0 z-30 flex shrink-0 flex-row items-center gap-2 border-b border-ink/10 bg-white/90 px-4 py-3 backdrop-blur lg:h-screen lg:w-64 lg:flex-col lg:items-stretch lg:gap-1 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
      <Link
        href="/admin"
        className="flex items-center gap-2.5 lg:mb-6 lg:px-2"
      >
        <Logo size={36} />
        <span className="hidden font-serif text-lg font-semibold text-ink sm:block">
          SP Confort
        </span>
      </Link>

      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto lg:flex-col">
        {LINKS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-ink text-sand-50"
                  : "text-ink-soft hover:bg-sand-100 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 lg:mt-auto lg:flex-col lg:items-stretch lg:border-t lg:border-ink/10 lg:pt-4">
        {userName && (
          <p className="mr-2 hidden max-w-[10rem] truncate text-xs text-ink-muted lg:mb-2 lg:mr-0 lg:block lg:px-3">
            Sesión: <span className="font-medium text-ink">{userName}</span>
          </p>
        )}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-sand-100 hover:text-ink"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Ver sitio</span>
        </a>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </aside>
  );
}
