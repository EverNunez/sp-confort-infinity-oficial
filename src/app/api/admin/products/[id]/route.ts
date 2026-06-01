import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/requireAdmin";
import { productSchema } from "@/lib/validators";
import { toPrismaData } from "@/lib/productService";

export const runtime = "nodejs";

// Actualización completa (formulario de edición)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: toPrismaData(parsed.data),
    });
    return NextResponse.json({ product });
  } catch (e) {
    console.error("[products:PUT]", e);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto" },
      { status: 500 }
    );
  }
}

// Cambios rápidos (visible / destacado / orden) desde la lista
const toggleSchema = z.object({
  visible: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  const body = await req.json().catch(() => null);
  const parsed = toggleSchema.safeParse(body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ product });
  } catch (e) {
    console.error("[products:PATCH]", e);
    return NextResponse.json(
      { error: "No se pudo actualizar" },
      { status: 500 }
    );
  }
}

// Eliminar producto
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[products:DELETE]", e);
    return NextResponse.json(
      { error: "No se pudo eliminar el producto" },
      { status: 500 }
    );
  }
}
