import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma, isDbConfigured } from "@/lib/prisma";
import ProductForm, {
  type ProductFormData,
} from "@/components/admin/ProductForm";
import DbNotice from "@/components/admin/DbNotice";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  if (!isDbConfigured) return { categories: [], product: null, dbOff: true };
  try {
    const [product, categories] = await Promise.all([
      prisma.product.findUnique({ where: { id } }),
      prisma.category.findMany({
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { id: true, name: true, slug: true },
      }),
    ]);
    return { product, categories, dbOff: false };
  } catch (e) {
    console.error("[editar] error:", e);
    return { categories: [], product: null, dbOff: true };
  }
}

export default async function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const { product, categories, dbOff } = await getData(params.id);

  if (!dbOff && !product) notFound();

  const formData: ProductFormData | undefined = product
    ? {
        id: product.id,
        name: product.name,
        categoryId: product.categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        benefits: product.benefits,
        price: product.price,
        priceVisible: product.priceVisible,
        imageUrl: product.imageUrl,
        brand: product.brand,
        model: product.model,
        stockStatus: product.stockStatus,
        featured: product.featured,
        visible: product.visible,
        order: product.order,
        whatsappMessage: product.whatsappMessage,
      }
    : undefined;

  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>
      <h1 className="heading-serif mt-3 text-3xl">Editar producto</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {formData?.name ?? "Modificá los datos y guardá los cambios."}
      </p>

      <div className="mt-8">
        {dbOff || !formData ? (
          <DbNotice />
        ) : (
          <ProductForm categories={categories} product={formData} />
        )}
      </div>
    </div>
  );
}
