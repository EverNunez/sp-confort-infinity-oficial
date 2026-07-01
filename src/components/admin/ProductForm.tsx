"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Upload,
  Plus,
  X,
  ImageIcon,
  Star,
  Eye,
} from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { CategoryId } from "@/data/products";

export type ProductFormData = {
  id: string;
  name: string;
  categoryId: string;
  shortDescription: string | null;
  description: string | null;
  benefits: string[];
  price: number | null;
  priceVisible: boolean;
  imageUrl: string | null;
  brand: string | null;
  model: string | null;
  stockStatus: "IN_STOCK" | "ON_REQUEST" | "OUT_OF_STOCK";
  featured: boolean;
  visible: boolean;
  order: number;
  whatsappMessage: string | null;
};

type CategoryOption = { id: string; name: string; slug: string };

export default function ProductForm({
  categories,
  product,
}: {
  categories: CategoryOption[];
  product?: ProductFormData;
}) {
  const router = useRouter();
  const editing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? categories[0]?.id ?? ""
  );
  const [shortDescription, setShortDescription] = useState(
    product?.shortDescription ?? ""
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [benefits, setBenefits] = useState<string[]>(
    product?.benefits?.length ? product.benefits : [""]
  );
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [model, setModel] = useState(product?.model ?? "");
  const [price, setPrice] = useState(
    product?.price != null ? String(product.price) : ""
  );
  const [priceVisible, setPriceVisible] = useState(
    product?.priceVisible ?? false
  );
  const [stockStatus, setStockStatus] = useState<ProductFormData["stockStatus"]>(
    product?.stockStatus ?? "IN_STOCK"
  );
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [visible, setVisible] = useState(product?.visible ?? true);
  const [order, setOrder] = useState(String(product?.order ?? 0));
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [whatsappMessage, setWhatsappMessage] = useState(
    product?.whatsappMessage ?? ""
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const previewCategory = (categories.find((c) => c.id === categoryId)?.slug ??
    "muebles") as CategoryId;

  function updateBenefit(i: number, value: string) {
    setBenefits((prev) => prev.map((b, idx) => (idx === i ? value : b)));
  }
  function addBenefit() {
    setBenefits((prev) => [...prev, ""]);
  }
  function removeBenefit(i: number) {
    setBenefits((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "No se pudo subir la imagen");
        return;
      }
      setImageUrl(json.url);
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (!categoryId) {
      toast.error("Elegí una categoría");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        categoryId,
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        benefits: benefits.map((b) => b.trim()).filter(Boolean),
        price: price.trim() === "" ? null : Number(price),
        priceVisible,
        imageUrl: imageUrl.trim() || undefined,
        brand: brand.trim(),
        model: model.trim(),
        stockStatus,
        featured,
        visible,
        order: Number(order) || 0,
        whatsappMessage: whatsappMessage.trim(),
      };

      const url = editing
        ? `/api/admin/products/${product!.id}`
        : "/api/admin/products";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "No se pudo guardar");
        return;
      }
      toast.success(editing ? "Producto actualizado" : "Producto creado");
      router.push("/admin/productos");
      router.refresh();
    } catch {
      toast.error("Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Columna principal */}
      <div className="space-y-6 lg:col-span-2">
        <div className="card space-y-4 p-6">
          <div>
            <label className="field-label" htmlFor="name">
              Nombre *
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="field-input"
              placeholder="Ej: Grifería Fani Bold Monocomando Cocina"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="category">
                Categoría *
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="field-input"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="field-label" htmlFor="brand">
                  Marca
                </label>
                <input
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="field-input"
                  placeholder="Fani"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="model">
                  Modelo
                </label>
                <input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="field-input"
                  placeholder="Bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="short">
              Descripción corta
            </label>
            <textarea
              id="short"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength={240}
              rows={2}
              className="field-input resize-none"
              placeholder="Frase breve que aparece en la tarjeta del producto."
            />
            <p className="mt-1 text-right text-[11px] text-ink-muted">
              {shortDescription.length}/240
            </p>
          </div>

          <div>
            <label className="field-label" htmlFor="desc">
              Descripción completa
            </label>
            <textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="field-input resize-y"
              placeholder="Texto detallado que aparece en el modal del producto."
            />
          </div>
        </div>

        {/* Beneficios */}
        <div className="card space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-ink">Beneficios</h3>
            <button
              type="button"
              onClick={addBenefit}
              className="btn-sm bg-sand-100 text-ink hover:bg-sand-200"
            >
              <Plus className="h-3.5 w-3.5" />
              Agregar
            </button>
          </div>
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={b}
                onChange={(e) => updateBenefit(i, e.target.value)}
                className="field-input"
                placeholder={`Beneficio ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeBenefit(i)}
                aria-label="Quitar beneficio"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* WhatsApp opcional */}
        <div className="card space-y-2 p-6">
          <label className="field-label" htmlFor="wa">
            Mensaje de WhatsApp personalizado (opcional)
          </label>
          <textarea
            id="wa"
            value={whatsappMessage}
            onChange={(e) => setWhatsappMessage(e.target.value)}
            rows={2}
            className="field-input resize-none"
            placeholder="Si lo dejás vacío se usa el mensaje estándar con el nombre del producto."
          />
        </div>
      </div>

      {/* Columna lateral */}
      <div className="space-y-6">
        {/* Imagen */}
        <div className="card space-y-3 p-6">
          <h3 className="font-serif text-lg text-ink">Imagen</h3>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-sand-100">
            <ProductImage
              src={imageUrl}
              alt={name || "Vista previa"}
              category={previewCategory}
              className="h-full w-full"
            />
          </div>
          <label className="btn-outline w-full cursor-pointer">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Subiendo…" : "Subir imagen"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <div className="flex items-center gap-2 text-[11px] text-ink-muted">
            <ImageIcon className="h-3.5 w-3.5" />
            JPG, PNG o WEBP · máx 5MB
          </div>
          <div>
            <label className="field-label" htmlFor="imgurl">
              o pegá una URL
            </label>
            <input
              id="imgurl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="field-input"
              placeholder="https://…"
            />
          </div>
        </div>

        {/* Precio */}
        <div className="card space-y-3 p-6">
          <h3 className="font-serif text-lg text-ink">Precio</h3>
          <div>
            <label className="field-label" htmlFor="price">
              Precio (Gs.)
            </label>
            <input
              id="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="field-input"
              placeholder="1230000"
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={priceVisible}
              onChange={(e) => setPriceVisible(e.target.checked)}
              className="h-4 w-4 accent-[#b08d57]"
            />
            Mostrar precio en la web
          </label>
          <p className="text-[11px] text-ink-muted">
            Si está desactivado, la web muestra “Consultar precio”.
          </p>
        </div>

        {/* Estado */}
        <div className="card space-y-3 p-6">
          <h3 className="font-serif text-lg text-ink">Estado</h3>
          <div>
            <label className="field-label" htmlFor="stock">
              Stock
            </label>
            <select
              id="stock"
              value={stockStatus}
              onChange={(e) =>
                setStockStatus(e.target.value as ProductFormData["stockStatus"])
              }
              className="field-input"
            >
              <option value="IN_STOCK">Disponible</option>
              <option value="ON_REQUEST">A pedido</option>
              <option value="OUT_OF_STOCK">Sin stock</option>
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
              className="h-4 w-4 accent-[#b08d57]"
            />
            <Eye className="h-4 w-4 text-ink-muted" />
            Visible en la web
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-[#b08d57]"
            />
            <Star className="h-4 w-4 text-ink-muted" />
            Producto destacado
          </label>
          <div>
            <label className="field-label" htmlFor="order">
              Orden
            </label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="field-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {editing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
}
