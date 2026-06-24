/**
 * Seed — categorías reales, productos reales (con foto) y usuario admin.
 * Idempotente. Estrategia segura:
 *  - Carga SOLO productos con imagen real.
 *  - Oculta (visible=false, sin borrar) los productos viejos sin foto.
 *  - Oculta las categorías que ya no se usan.
 *
 *   npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS, CATEGORIES } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  // 1) Categorías reales
  for (const [i, c] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: c.id },
      update: { name: c.label, order: i, visible: true },
      create: { slug: c.id, name: c.label, order: i, visible: true },
    });
  }
  const validCatSlugs = CATEGORIES.map((c) => c.id);
  const hiddenCats = await prisma.category.updateMany({
    where: { slug: { notIn: validCatSlugs } },
    data: { visible: false },
  });
  const cats = await prisma.category.findMany();
  const idBySlug = new Map(cats.map((c) => [c.slug, c.id]));
  console.log(
    `✓ ${validCatSlugs.length} categorías reales · ${hiddenCats.count} viejas ocultadas`
  );

  // 2) Productos reales (todos con foto). Estado por defecto: A pedido.
  let count = 0;
  for (const [i, prod] of PRODUCTS.entries()) {
    const categoryId = idBySlug.get(prod.category);
    if (!categoryId) continue;
    await prisma.product.upsert({
      where: { slug: prod.id },
      update: {
        name: prod.name,
        categoryId,
        shortDescription: prod.shortDescription,
        description: prod.details,
        benefits: prod.benefits,
        brand: prod.brand ?? null,
        imageUrl: prod.image,
        order: i,
        visible: true,
        stockStatus: "ON_REQUEST",
      },
      create: {
        slug: prod.id,
        name: prod.name,
        categoryId,
        shortDescription: prod.shortDescription,
        description: prod.details,
        benefits: prod.benefits,
        brand: prod.brand ?? null,
        imageUrl: prod.image,
        price: null,
        priceVisible: false,
        visible: true,
        featured: false,
        order: i,
        stockStatus: "ON_REQUEST",
      },
    });
    count++;
  }

  // Oculta (NO borra) los productos que no están en el catálogo real (sin foto/demo).
  const realSlugs = PRODUCTS.map((prod) => prod.id);
  const hidden = await prisma.product.updateMany({
    where: { slug: { notIn: realSlugs } },
    data: { visible: false },
  });
  console.log(
    `✓ ${count} productos reales visibles · ${hidden.count} sin foto ocultados`
  );

  // 3) Usuario admin
  const email = (process.env.ADMIN_EMAIL ?? "admin@spconfortinfinity.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Administrador", role: "admin" },
    create: { email, name: "Administrador", passwordHash, role: "admin" },
  });
  console.log(`✓ Admin listo (contraseña sincronizada): ${email}`);
}

main()
  .catch((e) => {
    console.error("Seed falló:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
