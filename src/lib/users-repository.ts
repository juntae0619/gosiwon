import "server-only";

import { eq } from "drizzle-orm";
import { ensureDb } from "@/db";
import { usersTable } from "@/db/schema";
import type { CreateUserInput, User } from "@/lib/user";
import { hashPassword } from "@/lib/password";

function rowToUser(row: typeof usersTable.$inferSelect): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone ?? undefined,
    role: row.role as User["role"],
    createdAt: row.createdAt,
  };
}

export async function getUserByEmail(email: string): Promise<
  (User & { passwordHash: string }) | null
> {
  const db = await ensureDb();
  if (!db) return null;

  const rows = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  return { ...rowToUser(row), passwordHash: row.passwordHash };
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await ensureDb();
  if (!db) return null;

  const rows = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  const row = rows[0];
  return row ? rowToUser(row) : null;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const db = await ensureDb();
  if (!db) throw new Error("Database not available");

  const email = input.email.trim().toLowerCase();
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("EMAIL_EXISTS");
  }

  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const passwordHash = await hashPassword(input.password);
  const now = new Date().toISOString();

  await db.insert(usersTable).values({
    id,
    email,
    passwordHash,
    name: input.name.trim(),
    phone: input.phone?.trim() || null,
    role: input.role ?? "user",
    createdAt: now,
  });

  return {
    id,
    email,
    name: input.name.trim(),
    phone: input.phone?.trim() || undefined,
    role: input.role ?? "user",
    createdAt: now,
  };
}
