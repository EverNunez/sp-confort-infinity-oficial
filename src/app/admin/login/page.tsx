import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sand-100 via-sand-50 to-white px-5 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo size={64} />
            <span className="eyebrow mt-5">Panel de administración</span>
            <h1 className="heading-serif mt-3 text-2xl">
              SP Confort Infinity
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Ingresá con tus credenciales para gestionar el catálogo.
            </p>
          </div>

          <LoginForm />
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>
      </div>
    </main>
  );
}
