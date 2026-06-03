import { STOCK_META } from "@/lib/stock";
import type { StockStatusValue } from "@/data/products";

/** Badge elegante con el estado del producto (Disponible / A pedido / Sin stock). */
export default function StockBadge({
  status,
  className = "",
}: {
  status?: StockStatusValue;
  className?: string;
}) {
  const meta = STOCK_META[status ?? "IN_STOCK"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.badgeClass} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} aria-hidden />
      {meta.label}
    </span>
  );
}
