import { Database } from "lucide-react";

export default function DbNotice() {
  return (
    <div className="card mt-6 flex items-start gap-4 p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-copper">
        <Database className="h-5 w-5" />
      </span>
      <div>
        <h2 className="font-serif text-lg text-ink">
          Conectá la base de datos
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          Configurá <code className="rounded bg-sand-100 px-1">DATABASE_URL</code>{" "}
          en <code className="rounded bg-sand-100 px-1">.env.local</code> y corré{" "}
          <code className="rounded bg-sand-100 px-1">npm run db:push</code> y{" "}
          <code className="rounded bg-sand-100 px-1">npm run db:seed</code> para
          empezar a administrar productos.
        </p>
      </div>
    </div>
  );
}
