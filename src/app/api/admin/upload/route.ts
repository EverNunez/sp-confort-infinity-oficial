import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { ensureAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/format";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// MIME permitido -> extensión de salida (la extensión la controlamos nosotros).
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Carpeta local pública (se sirve en /uploads/products/...).
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

export async function POST(req: NextRequest) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  // Rechazo temprano por tamaño (antes de bufferear el archivo).
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength && contentLength > MAX_BYTES + 200 * 1024) {
    return NextResponse.json(
      { error: "La imagen supera el máximo de 5 MB." },
      { status: 400 }
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo faltante" }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Formato no permitido. Usá JPG, PNG o WEBP." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "La imagen supera el máximo de 5 MB." },
      { status: 400 }
    );
  }

  // Nombre limpio y único: base sanitizada + fecha + uuid corto.
  // No se usa el nombre del usuario tal cual, así se evita path traversal.
  const base =
    slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "imagen";
  const filename = `${base}-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json(
      { error: "No se pudo guardar la imagen en el servidor." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/uploads/products/${filename}` });
}
