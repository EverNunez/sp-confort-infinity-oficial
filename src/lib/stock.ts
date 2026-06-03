import type { StockStatusValue } from "@/data/products";
import { whatsappLink, productWhatsappLink } from "./site";

/** Metadatos visuales de cada estado de stock (etiqueta + estilos del badge). */
export const STOCK_META: Record<
  StockStatusValue,
  { label: string; badgeClass: string; dotClass: string }
> = {
  IN_STOCK: {
    label: "Disponible",
    badgeClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
    dotClass: "bg-green-500",
  },
  ON_REQUEST: {
    label: "A pedido",
    badgeClass: "bg-copper/10 text-copper-dark ring-1 ring-inset ring-copper/30",
    dotClass: "bg-copper",
  },
  OUT_OF_STOCK: {
    label: "Sin stock",
    badgeClass: "bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-500/20",
    dotClass: "bg-rose-400",
  },
};

export function stockLabel(status?: StockStatusValue): string {
  return STOCK_META[status ?? "IN_STOCK"].label;
}

/**
 * Texto del botón y enlace de WhatsApp según el estado del producto.
 * - Disponible  → "Comprar" / mensaje estándar.
 * - A pedido    → "Consultar por pedido".
 * - Sin stock   → "Consultar disponibilidad".
 */
export function stockCta(
  productName: string,
  status?: StockStatusValue
): { label: string; longLabel: string; href: string } {
  switch (status) {
    case "OUT_OF_STOCK":
      return {
        label: "Consultar disponibilidad",
        longLabel: "Consultar disponibilidad",
        href: whatsappLink(
          `Hola, quiero consultar si tienen disponible nuevamente el producto: ${productName}.`
        ),
      };
    case "ON_REQUEST":
      return {
        label: "Consultar por pedido",
        longLabel: "Consultar por pedido",
        href: whatsappLink(
          `Hola, quiero consultar por pedido del producto: ${productName}.`
        ),
      };
    default:
      return {
        label: "Comprar",
        longLabel: "Comprar por WhatsApp",
        href: productWhatsappLink(productName),
      };
  }
}
