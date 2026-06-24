/**
 * Actualiza SOLO el usuario admin (email + contraseña), sin tocar el catálogo.
 * Lee ADMIN_EMAIL y ADMIN_PASSWORD del entorno y guarda el hash bcrypt.
 *
 *   npm run db:seed:admin
 *
 * Útil para cambiar la contraseña del panel sin re-seedear los productos.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (
    process.env.ADMIN_EMAIL ?? "admin@spconfortinfinity.com"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("✗ Falta ADMIN_PASSWORD en el entorno (.env).");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Administrador", role: "admin" },
    create: { email, name: "Administrador", passwordHash, role: "admin" },
  });

  console.log(`✓ Contraseña del admin actualizada: ${email}`);
}

main()
  .catch((e) => {
    console.error("Falló la actualización del admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
