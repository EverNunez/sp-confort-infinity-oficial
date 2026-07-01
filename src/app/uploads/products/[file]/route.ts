import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sirve las imágenes subidas desde el panel (que se guardan en disco).
// Next.js `next start` NO sirve archivos agregados a /public después del build,
// por eso las servimos con este handler leyéndolas del disco.
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { file: string } }
) {
  // basename evita cualquier intento de path traversal (../).
  const name = path.basename(params.file);
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const buffer = await readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
