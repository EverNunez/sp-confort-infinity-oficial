import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase con service role — SOLO para uso en el servidor
// (subida de imágenes desde el panel admin). Nunca exponer el service key
// en el cliente.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET ?? "products";

export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

/** true si el almacenamiento de imágenes (Supabase Storage) está configurado. */
export const isStorageConfigured = Boolean(supabaseAdmin);
