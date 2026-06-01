"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Loader2,
  Check,
  X,
} from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { CategoryId } from "@/data/products";

export type ProductRow = {
  id: string;
  name: string;
  categoryName: string;
  categorySlug: string;
  imageUrl: string;
  priceLabel: string;
  visible: boolean;
  featured: boolean;
  stockLabel: string;
};

export default function ProductsTable({
  products,
}: {
  products: ProductRow[];
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function patch(id: string, body: Record<string, unknown>) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast.error(j.error ?? "No se pudo actualizar");
        return;
      }
      router.refresh();
    } catch {
      toast.error("Error de conexión");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast.error(j.error ?? "No se pudo eliminar");
        return;
      }
      toast.success("Producto eliminado");
      setConfirmId(null);
      router.refresh();
    } catch {
      toast.error("Error de conexión");
    } finally {
      setBusyId(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="card mt-6 p-10 text-center">
        <p className="text-ink-muted">Todavía no hay productos cargados.</p>
        <Link href="/admin/productos/nuevo" className="btn-primary mt-4">
          Crear el primero
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {products.map((p) => {
        const busy = busyId === p.id;
        return (
          <div
            key={p.id}
            className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-sand-100">
              <ProductImage
                src={p.imageUrl}
                alt={p.name}
                category={p.categorySlug as CategoryId}
                className="h-full w-full"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-medium text-ink">{p.name}</p>
                {p.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-copper/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-copper-dark">
                    <Star className="h-3 w-3" /> Destacado
                  </span>
                )}
                {!p.visible && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                    <EyeOff className="h-3 w-3" /> Oculto
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-ink-muted">
                {p.categoryName} · {p.priceLabel} · {p.stockLabel}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-1.5">
              {confirmId === p.id ? (
                <>
                  <span className="text-xs text-ink-muted">¿Eliminar?</span>
                  <button
                    onClick={() => remove(p.id)}
                    disabled={busy}
                    className="btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    Sí
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="btn-sm bg-sand-100 text-ink hover:bg-sand-200"
                  >
                    <X className="h-3.5 w-3.5" />
                    No
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => patch(p.id, { visible: !p.visible })}
                    disabled={busy}
                    title={p.visible ? "Ocultar" : "Mostrar"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition hover:bg-sand-100 hover:text-ink disabled:opacity-50"
                  >
                    {p.visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => patch(p.id, { featured: !p.featured })}
                    disabled={busy}
                    title={p.featured ? "Quitar destacado" : "Destacar"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-sand-100 disabled:opacity-50 ${
                      p.featured ? "text-copper" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/admin/productos/${p.id}`}
                    title="Editar"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition hover:bg-sand-100 hover:text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setConfirmId(p.id)}
                    title="Eliminar"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
