/**
 * Seed inicial — categorías, productos (migrados del demo) y usuario admin.
 * Idempotente: se puede correr varias veces sin duplicar.
 *
 *   npm run db:seed
 *
 * El admin se crea con ADMIN_EMAIL / ADMIN_PASSWORD del entorno.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS, CATEGORIES } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  // 1) Categorías
  for (const [i, c] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: c.id },
      update: { name: c.label, order: i, visible: true },
      create: { slug: c.id, name: c.label, order: i, visible: true },
    });
  }
  const cats = await prisma.category.findMany();
  const idBySlug = new Map(cats.map((c) => [c.slug, c.id]));
  console.log(`✓ ${cats.length} categorías`);

  // 2) Productos (migrados del catálogo demo, sin perder imágenes)
  let count = 0;
  for (const [i, p] of PRODUCTS.entries()) {
    const categoryId = idBySlug.get(p.category);
    if (!categoryId) continue;
    await prisma.product.upsert({
      where: { slug: p.id },
      update: {
        name: p.name,
        categoryId,
        shortDescription: p.shortDescription,
        description: p.details,
        benefits: p.benefits,
        brand: p.brand ?? null,
        imageUrl: p.image,
        order: i,
      },
      create: {
        slug: p.id,
        name: p.name,
        categoryId,
        shortDescription: p.shortDescription,
        description: p.details,
        benefits: p.benefits,
        brand: p.brand ?? null,
        imageUrl: p.image,
        price: null,
        priceVisible: false,
        visible: true,
        featured: false,
        order: i,
      },
    });
    count++;
  }
  console.log(`✓ ${count} productos`);

  // 3) Usuario admin
  const email = (process.env.ADMIN_EMAIL ?? "admin@spconfortinfinity.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: {}, // no pisa la contraseña si el admin ya existe
    create: { email, name: "Administrador", passwordHash, role: "admin" },
  });
  console.log(`✓ Admin listo: ${email}`);
}

main()
  .catch((e) => {
    console.error("Seed falló:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
