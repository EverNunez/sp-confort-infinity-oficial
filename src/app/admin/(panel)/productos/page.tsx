import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { formatGs } from "@/lib/format";
import ProductsTable, {
  type ProductRow,
} from "@/components/admin/ProductsTable";
import DbNotice from "@/components/admin/DbNotice";

export const dynamic = "force-dynamic";

const STOCK_LABEL: Record<string, string> = {
  IN_STOCK: "Disponible",
  ON_REQUEST: "A pedido",
  OUT_OF_STOCK: "Sin stock",
};

async function getProducts(): Promise<ProductRow[] | null> {
  if (!isDbConfigured) return null;
  try {
    const list = await prisma.product.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: { category: true },
    });
    return list.map((p) => ({
      id: p.id,
      name: p.name,
      categoryName: p.category.name,
      categorySlug: p.category.slug,
      imageUrl: p.imageUrl ?? "",
      priceLabel:
        p.priceVisible && p.price != null
          ? formatGs(p.price)
          : "Consultar precio",
      visible: p.visible,
      featured: p.featured,
      stockLabel: STOCK_LABEL[p.stockStatus] ?? "—",
    }));
  } catch (e) {
    console.error("[productos] error:", e);
    return null;
  }
}

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h1 className="heading-serif mt-2 text-3xl">Productos</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {products
              ? `${products.length} producto${products.length === 1 ? "" : "s"} en total`
              : "Gestión del catálogo"}
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </header>

      {products === null ? <DbNotice /> : <ProductsTable products={products} />}
    </div>
  );
}
