import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Verifica que haya una sesión de admin válida en una API route.
 * Uso:
 *   const guard = await ensureAdmin();
 *   if (!guard.ok) return guard.response;
 */
export async function ensureAdmin() {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "No autorizado" }, { status: 401 }),
    };
  }
  return { ok: true as const, session };
}
