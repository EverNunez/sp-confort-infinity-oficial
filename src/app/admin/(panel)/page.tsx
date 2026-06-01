import Link from "next/link";
import {
  Package,
  Eye,
  EyeOff,
  Star,
  FolderTree,
  Plus,
  Database,
  ArrowRight,
} from "lucide-react";
import { prisma, isDbConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  if (!isDbConfigured) return null;
  try {
    const [total, visibles, ocultos, destacados, categorias, ultimos] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { visible: true } }),
        prisma.product.count({ where: { visible: false } }),
        prisma.product.count({ where: { featured: true } }),
        prisma.category.count(),
        prisma.product.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { category: true },
        }),
      ]);
    return { total, visibles, ocultos, destacados, categorias, ultimos };
  } catch (e) {
    console.error("[dashboard] error de stats:", e);
    return null;
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Panel</span>
          <h1 className="heading-serif mt-2 text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Resumen del catálogo de SP Confort Infinity.
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </header>

      {!stats ? (
        <div className="card mt-8 flex items-start gap-4 p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-copper">
            <Database className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-serif text-lg text-ink">
              Base de datos no conectada todavía
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Configurá <code className="rounded bg-sand-100 px-1">DATABASE_URL</code>{" "}
              en <code className="rounded bg-sand-100 px-1">.env.local</code>, y
              corré <code className="rounded bg-sand-100 px-1">npm run db:push</code>{" "}
              y <code className="rounded bg-sand-100 px-1">npm run db:seed</code>.
              Mientras tanto, la web pública sigue funcionando con el catálogo
              inicial.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Package} label="Productos" value={stats.total} />
            <StatCard icon={Eye} label="Visibles" value={stats.visibles} />
            <StatCard icon={EyeOff} label="Ocultos" value={stats.ocultos} />
            <StatCard
              icon={Star}
              label="Destacados"
              value={stats.destacados}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="card flex items-center justify-between p-5 lg:col-span-1">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-copper">
                  <FolderTree className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-muted">
                    Categorías
                  </p>
                  <p className="font-serif text-xl text-ink">
                    {stats.categorias}
                  </p>
                </div>
              </div>
            </div>

            {/* Últimos productos */}
            <div className="card p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg text-ink">
                  Últimos productos
                </h2>
                <Link
                  href="/admin/productos"
                  className="flex items-center gap-1 text-xs font-semibold text-copper-dark hover:text-copper"
                >
                  Ver todos <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <ul className="mt-4 divide-y divide-ink/5">
                {stats.ultimos.length === 0 && (
                  <li className="py-3 text-sm text-ink-muted">
                    Todavía no hay productos.
                  </li>
                )}
                {stats.ultimos.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="truncate text-sm font-medium text-ink hover:text-copper-dark"
                    >
                      {p.name}
                    </Link>
                    <span className="shrink-0 rounded-full bg-sand-100 px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                      {p.category.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: number;
}) {
  return (
    <div className="card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-copper">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 font-serif text-3xl text-ink">{value}</p>
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
    </div>
  );
}
