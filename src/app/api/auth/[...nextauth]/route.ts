import { handlers } from "@/auth";

// Auth.js usa Prisma + bcrypt -> debe correr en el runtime Node, no en edge.
export const runtime = "nodejs";

export const { GET, POST } = handlers;
