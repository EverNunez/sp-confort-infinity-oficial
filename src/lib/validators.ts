import { z } from "zod";

const emptyToUndef = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

export const stockStatusEnum = z.enum([
  "IN_STOCK",
  "ON_REQUEST",
  "OUT_OF_STOCK",
]);

export const productSchema = z.object({
  name: z.string().trim().min(2, "El nombre es obligatorio"),
  slug: z.preprocess(emptyToUndef, z.string().trim().optional()),
  categoryId: z.string().trim().min(1, "Elegí una categoría"),
  shortDescription: z.preprocess(
    emptyToUndef,
    z.string().trim().max(240).optional()
  ),
  description: z.preprocess(emptyToUndef, z.string().trim().optional()),
  benefits: z.array(z.string().trim().min(1)).max(12).default([]),
  price: z
    .preprocess(
      (v) => (v === "" || v === null ? null : v),
      z.coerce.number().int().nonnegative().nullable()
    )
    .default(null),
  priceVisible: z.boolean().default(false),
  imageUrl: z.preprocess(
    emptyToUndef,
    z
      .string()
      .trim()
      .refine(
        (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
        "Debe ser una URL (https://…) o una ruta que empiece con /"
      )
      .optional()
  ),
  brand: z.preprocess(emptyToUndef, z.string().trim().max(80).optional()),
  model: z.preprocess(emptyToUndef, z.string().trim().max(80).optional()),
  stockStatus: stockStatusEnum.default("IN_STOCK"),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
  whatsappMessage: z.preprocess(emptyToUndef, z.string().trim().optional()),
});

export type ProductInput = z.infer<typeof productSchema>;
