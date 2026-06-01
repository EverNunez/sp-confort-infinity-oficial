import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdmin } from "@/lib/requireAdmin";
import { productSchema } from "@/lib/validators";
import { toPrismaData, uniqueSlug } from "@/lib/productService";

export const runtime = "nodejs";

// Crear producto
export async function POST(req: NextRequest) {
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
    const slug = await uniqueSlug(parsed.data.slug || parsed.data.name);
    const product = await prisma.product.create({
      data: { ...toPrismaData(parsed.data), slug },
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error("[products:POST]", e);
    return NextResponse.json(
      { error: "No se pudo crear el producto" },
      { status: 500 }
    );
  }
}
