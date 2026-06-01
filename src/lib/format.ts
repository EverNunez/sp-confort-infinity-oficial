/** Formatea un monto en guaraníes: 1230000 -> "₲ 1.230.000". */
export function formatGs(value?: number | null): string {
  if (value == null) return "Consultar precio";
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Genera un slug URL-safe a partir de un texto. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-") // no alfanumérico -> guión
    .replace(/^-+|-+$/g, "") // recorta guiones de los extremos
    .slice(0, 80);
}
