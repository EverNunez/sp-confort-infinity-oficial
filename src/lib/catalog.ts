import { prisma, isDbConfigured } from "./prisma";
import {
  PRODUCTS as SEED_PRODUCTS,
  CATEGORIES as SEED_CATEGORIES,
  type Product as ProductView,
  type Category as CategoryView,
  type CategoryId,
} from "@/data/products";
import { formatGs } from "./format";

export type { ProductView, CategoryView };

function seedCatalog() {
  return {
    products: SEED_PRODUCTS,
    categories: SEED_CATEGORIES,
    source: "seed" as const,
  };
}

/**
 * Devuelve el catálogo público (solo productos y categorías visibles).
 * - Si no hay base configurada o falla la conexión, cae al seed estático,
 *   de modo que la landing NUNCA se rompe por la base de datos.
 * - Ordena destacados primero, luego por `order` y fecha.
 */
export async function getCatalog(): Promise<{
  products: ProductView[];
  categories: CategoryView[];
  source: "db" | "seed";
}> {
  if (!isDbConfigured) return seedCatalog();

  try {
    const [dbCats, dbProds] = await Promise.all([
      prisma.category.findMany({
        where: { visible: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
      }),
      prisma.product.findMany({
        where: { visible: true, category: { visible: true } },
        orderBy: [
          { featured: "desc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
        include: { category: true },
      }),
    ]);

    // Base recién creada y vacía -> mostramos el seed para no dejar la web pelada.
    if (dbCats.length === 0 && dbProds.length === 0) return seedCatalog();

    const categories: CategoryView[] = dbCats.map((c) => ({
      id: c.slug as CategoryId,
      label: c.name,
    }));

    const products: ProductView[] = dbProds.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.slug as CategoryId,
      categoryLabel: p.category.name,
      brand: p.brand ?? undefined,
      shortDescription: p.shortDescription ?? "",
      details: p.description ?? p.shortDescription ?? "",
      benefits: p.benefits ?? [],
      price: p.priceVisible && p.price != null ? formatGs(p.price) : undefined,
      image: p.imageUrl ?? "",
      stockStatus: p.stockStatus,
    }));

    return { products, categories, source: "db" };
  } catch (err) {
    console.error("[catalog] Error leyendo de la base, usando seed:", err);
    return seedCatalog();
  }
}
