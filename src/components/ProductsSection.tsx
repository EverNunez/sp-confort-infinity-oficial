import { getCatalog } from "@/lib/catalog";
import Products from "./Products";

/**
 * Server Component: obtiene el catálogo (DB con fallback a seed) y se lo pasa
 * al componente cliente `Products`, que conserva el diseño y las animaciones.
 */
export default async function ProductsSection() {
  const { products, categories } = await getCatalog();
  return <Products products={products} categories={categories} />;
}
