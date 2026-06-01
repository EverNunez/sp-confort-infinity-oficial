import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Middleware liviano (edge): solo valida la sesión vía JWT para proteger /admin.
// No importa Prisma ni bcrypt (eso vive en src/auth.ts, runtime Node).
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
