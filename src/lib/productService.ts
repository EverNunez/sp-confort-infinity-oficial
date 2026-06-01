import { prisma } from "./prisma";
import { slugify } from "./format";
import type { ProductInput } from "./validators";

/** Genera un slug único para productos (agrega -2, -3… si ya existe). */
export async function uniqueSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "producto";
  let slug = root;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

/** Convierte el input validado en datos para Prisma (campos vacíos -> null). */
export function toPrismaData(data: ProductInput) {
  return {
    name: data.name,
    categoryId: data.categoryId,
    shortDescription: data.shortDescription ?? null,
    description: data.description ?? null,
    benefits: data.benefits,
    price: data.price ?? null,
    priceVisible: data.priceVisible,
    imageUrl: data.imageUrl ?? null,
    brand: data.brand ?? null,
    model: data.model ?? null,
    stockStatus: data.stockStatus,
    featured: data.featured,
    visible: data.visible,
    order: data.order,
    whatsappMessage: data.whatsappMessage ?? null,
  };
}
