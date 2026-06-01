import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma, isDbConfigured } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import DbNotice from "@/components/admin/DbNotice";

export const dynamic = "force-dynamic";

async function getCategories() {
  if (!isDbConfigured) return [];
  try {
    return await prisma.category.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true },
    });
  } catch (e) {
    console.error("[nuevo] error categorías:", e);
    return [];
  }
}

export default async function NuevoProductoPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>
      <h1 className="heading-serif mt-3 text-3xl">Nuevo producto</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Completá los datos y guardá. Podés ocultarlo hasta tenerlo listo.
      </p>

      <div className="mt-8">
        {categories.length === 0 ? (
          <DbNotice />
        ) : (
          <ProductForm categories={categories} />
        )}
      </div>
    </div>
  );
}
