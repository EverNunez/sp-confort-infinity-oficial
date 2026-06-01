import type { NextAuthConfig } from "next-auth";

/**
 * Configuración base de Auth.js — SIN providers que usen Node (Prisma/bcrypt).
 * Se usa también en el middleware (edge), por eso debe quedar liviana.
 * Los providers reales se agregan en `src/auth.ts`.
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnLogin = nextUrl.pathname === "/admin/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnLogin) {
        // Si ya está logueado, no mostrar el login: ir al dashboard.
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }

      if (isOnAdmin) {
        // Rutas del panel: requieren sesión. Si no hay, Auth.js redirige al login.
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "admin";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string | undefined) ?? "admin";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
