# SP Confort Infinity S.A. — Sitio oficial + Panel administrable

Landing premium + **catálogo administrable** + **compra/consulta por WhatsApp**.
No es un ecommerce con carrito ni pagos online: el visitante explora el
catálogo y, al elegir un producto, abre WhatsApp con un mensaje automático.
La empresa administra el catálogo desde un panel privado (`/admin`).

Construido sobre el demo premium, **conservando todo el diseño y las
animaciones**, y agregando base de datos, panel seguro y gestión de productos.

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS + Framer Motion + Lucide |
| Base de datos | PostgreSQL (Supabase) vía **Prisma** |
| Autenticación | **Auth.js (NextAuth v5)** — Credentials + bcrypt |
| Imágenes | **Supabase Storage** (con fallback elegante) |
| Deploy | Vercel |

---

## 🚀 Puesta en marcha (local)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env.local
```
Completá `.env.local` (ver detalle más abajo). Como mínimo, para administrar
necesitás `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD`.

> 💡 La web pública **funciona sin base de datos**: si `DATABASE_URL` no está
> configurada, muestra el catálogo inicial (seed) y nunca se rompe. La base
> es necesaria para el panel de administración.

### 3. Crear las tablas y cargar datos iniciales
```bash
npm run db:push     # crea las tablas en la base (Prisma)
npm run db:seed     # carga categorías, productos del demo y el usuario admin
```

### 4. Levantar el sitio
```bash
npm run dev         # http://localhost:3000
```
- Sitio público: `http://localhost:3000`
- Panel admin: `http://localhost:3000/admin`

---

## 🔐 Panel de administración

- URL: **`/admin`** (login en `/admin/login`).
- Usuario inicial: el que definas en `ADMIN_EMAIL` / `ADMIN_PASSWORD` antes de
  correr `npm run db:seed`.
- Las contraseñas se guardan **hasheadas con bcrypt** (nunca en texto plano).
- Todas las rutas `/admin/*` y las APIs `/api/admin/*` están protegidas por
  middleware y verificación de sesión.

### Qué permite el panel
- **Dashboard**: total de productos, visibles, ocultos, destacados, categorías
  y últimos productos.
- **Productos**: crear, editar, eliminar (con confirmación), mostrar/ocultar,
  destacar, cambiar categoría, precio (mostrar u “Consultar precio”),
  descripción corta y completa, beneficios, marca/modelo, stock y orden.
- **Imágenes**: subida a Supabase Storage con previsualización, validación de
  formato (JPG/PNG/WEBP/AVIF) y tamaño (máx 5 MB), o pegar una URL. Si no hay
  imagen, la web muestra un **placeholder premium** según la categoría.

> **Categorías:** en esta primera versión son fijas (se cargan con el seed). El
> modelo `Category` ya está preparado para administrarlas desde el panel en una
> fase 2 (crear/editar/ocultar/ordenar).

---

## 🔧 Variables de entorno

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Conexión **pooled** a Postgres (Supabase, puerto 6543) |
| `DIRECT_URL` | Conexión **directa** para migraciones (Supabase, puerto 5432) |
| `AUTH_SECRET` | Secreto de Auth.js. Generalo con `npx auth secret` |
| `AUTH_URL` | (Producción) URL pública del sitio. En Vercel se infiere sola |
| `ADMIN_EMAIL` | Email del admin inicial (lo usa el seed) |
| `ADMIN_PASSWORD` | Contraseña del admin inicial (lo usa el seed) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase (para Storage) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service key de Supabase (**solo servidor**, secreta) |
| `SUPABASE_STORAGE_BUCKET` | Nombre del bucket público de imágenes (ej: `products`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (internacional, sin signos) |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | Cómo se muestra el número en pantalla |

Ver `.env.example` para el formato exacto.

### Configurar Supabase
1. Creá un proyecto en [supabase.com](https://supabase.com).
2. **Database → Connection string**: copiá la _pooled_ (`DATABASE_URL`) y la
   _direct_ (`DIRECT_URL`).
3. **Storage → New bucket**: creá un bucket **público** llamado `products`.
4. **Project Settings → API**: copiá `Project URL` (→ `NEXT_PUBLIC_SUPABASE_URL`)
   y la `service_role` key (→ `SUPABASE_SERVICE_ROLE_KEY`).

---

## 🗄️ Comandos de base de datos

```bash
npm run db:push        # sincroniza el schema con la base (sin migraciones)
npm run db:migrate:dev # crea una migración en desarrollo
npm run db:migrate     # aplica migraciones en producción (prisma migrate deploy)
npm run db:seed        # carga categorías, productos y admin inicial
npm run db:studio      # abre Prisma Studio (UI de la base)
npm run db:generate    # regenera el Prisma Client
```

El seed es **idempotente**: se puede correr varias veces. No pisa la
contraseña de un admin ya existente.

---

## ☁️ Deploy en Vercel

1. Subí el proyecto a GitHub (ver abajo).
2. En Vercel: **Add New → Project → Import** el repo.
3. **Configuración del proyecto** (Vercel autodetecta Next.js):
   - Framework Preset: **Next.js**
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
4. **Environment Variables**: cargá todas las del `.env.example` con los
   valores reales (DATABASE_URL, DIRECT_URL, AUTH_SECRET, ADMIN_*, SUPABASE_*,
   WHATSAPP_*).
5. **Deploy.**
6. Después del primer deploy, aplicá el schema y cargá datos (una sola vez),
   apuntando a la base de producción:
   ```bash
   npm run db:push
   npm run db:seed
   ```
   (Podés correrlos localmente con el `.env.local` apuntando a la base de
   producción, o desde la consola de Supabase.)

> `postinstall` ya ejecuta `prisma generate` automáticamente en cada build de
> Vercel, así que el Prisma Client siempre queda disponible.

### Dominio propio
En Vercel → **Project → Settings → Domains → Add**, ingresá tu dominio y
seguí las instrucciones de DNS (registro A/CNAME). Una vez verificado, fijá
`AUTH_URL=https://tudominio.com` en las variables de entorno.

---

## 🐙 Subir a GitHub

```bash
git init -b main
git add .
git commit -m "Sitio oficial SP Confort Infinity"
git remote add origin https://github.com/TU-USUARIO/sp-confort-infinity-oficial.git
git push -u origin main
```
`.gitignore` ya excluye `node_modules`, `.next`, `.env*` (excepto
`.env.example`) y `.vercel`. **Nunca** se suben secretos.

---

## ✏️ Dónde cambiar cada cosa

| Quiero cambiar… | Dónde |
|---|---|
| Número de WhatsApp | `NEXT_PUBLIC_WHATSAPP_NUMBER` (o `src/lib/site.ts`) |
| Mensaje de WhatsApp del producto | `productWhatsappLink()` en `src/lib/site.ts` |
| Ubicación / mapa | `src/lib/site.ts` (`city`, `mapsLink`, `mapsEmbedEnabled`) |
| Instagram / redes / horario | `src/lib/site.ts` |
| Productos y precios | **Panel `/admin`** (o el seed `src/data/products.ts`) |
| Imágenes de producto | **Panel `/admin`** (subida) o `/public/products/` |
| Imágenes del hero / secciones | `/public/` (`hero-showroom.jpg`, `about-spa.jpg`, …) |
| Categorías (v1) | Seed en `src/data/products.ts` + `npm run db:seed` |

El número de WhatsApp está **centralizado**: los botones usan
`whatsappLink()` / `productWhatsappLink()` de `src/lib/site.ts`.

---

## 📁 Estructura

```
prisma/
├─ schema.prisma          # modelos Product, Category, AdminUser, Lead
└─ seed.ts                # datos iniciales (categorías, productos, admin)
src/
├─ app/
│  ├─ page.tsx            # landing (público, catálogo desde DB con fallback)
│  ├─ admin/
│  │  ├─ login/           # login del panel
│  │  └─ (panel)/         # dashboard + productos (protegido)
│  └─ api/
│     ├─ admin/products/  # CRUD de productos
│     ├─ admin/upload/    # subida de imágenes a Supabase
│     └─ auth/            # Auth.js
├─ components/            # UI premium (Hero, About, Products, …) + admin/
├─ data/products.ts       # catálogo seed + tipos (fallback público)
├─ lib/
│  ├─ prisma.ts · catalog.ts · site.ts · format.ts
│  ├─ validators.ts · productService.ts · supabaseAdmin.ts · requireAdmin.ts
├─ auth.ts · auth.config.ts · middleware.ts
```

---

## ✅ Estado actual

- ✅ Build de producción verificado (`npm run build`).
- ✅ Sitio público con el diseño premium intacto, catálogo desde DB con
  fallback a seed (nunca se rompe por falta de base o imágenes).
- ✅ Panel `/admin` con login seguro, dashboard y CRUD de productos + imágenes.
- ✅ WhatsApp centralizado con nombre del producto.
- ⏳ Pendiente de confirmar con el cliente: dirección exacta, fotos reales de
  productos, y si se habilita el CRUD de categorías (fase 2).

## 🔜 Próxima etapa sugerida
- CRUD de categorías desde el panel.
- Registro de consultas (modelo `Lead` ya preparado).
- Sección de “Destacados” en la home.
- Roles/múltiples usuarios admin.
- Posible ecommerce con carrito y pagos (etapa posterior).
