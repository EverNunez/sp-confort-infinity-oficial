import { NextRequest, NextResponse } from "next/server";
import { ensureAdmin } from "@/lib/requireAdmin";
import {
  supabaseAdmin,
  STORAGE_BUCKET,
  isStorageConfigured,
} from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/format";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: NextRequest) {
  const guard = await ensureAdmin();
  if (!guard.ok) return guard.response;

  if (!isStorageConfigured || !supabaseAdmin) {
    return NextResponse.json(
      {
        error:
          "Almacenamiento no configurado. Cargá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY, o pegá una URL de imagen manualmente.",
      },
      { status: 503 }
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo faltante" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato no permitido (JPG, PNG, WEBP o AVIF)" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "La imagen supera el máximo de 5 MB" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "imagen";
  const path = `${Date.now()}-${base}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("[upload]", error);
    return NextResponse.json(
      { error: "No se pudo subir la imagen al almacenamiento" },
      { status: 500 }
    );
  }

  const { data } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
