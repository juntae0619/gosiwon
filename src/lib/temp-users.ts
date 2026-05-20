import "server-only";

import { cookies } from "next/headers";
import type { CreateUserInput, User } from "@/lib/user";
import { hashPassword } from "@/lib/password";

const COOKIE_KEY = "hosilgo_temp_users";
const MAX = 20;

type StoredTempUser = User & { passwordHash: string };

export async function getTempUsers(): Promise<StoredTempUser[]> {
  const store = await cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredTempUser[];
  } catch {
    return [];
  }
}

async function saveTempUsers(users: StoredTempUser[]): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_KEY, JSON.stringify(users.slice(0, MAX)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getTempUserByEmail(
  email: string
): Promise<StoredTempUser | null> {
  const normalized = email.trim().toLowerCase();
  const list = await getTempUsers();
  return list.find((u) => u.email === normalized) ?? null;
}

export async function getTempUserById(id: string): Promise<User | null> {
  const list = await getTempUsers();
  const found = list.find((u) => u.id === id);
  if (!found) return null;
  const { passwordHash: _, ...user } = found;
  return user;
}

export async function createTempUser(input: CreateUserInput): Promise<User> {
  const email = input.email.trim().toLowerCase();
  const existing = await getTempUserByEmail(email);
  if (existing) throw new Error("EMAIL_EXISTS");

  const passwordHash = await hashPassword(input.password);
  const user: StoredTempUser = {
    id: `user-temp-${Date.now()}`,
    email,
    name: input.name.trim(),
    phone: input.phone?.trim() || undefined,
    role: input.role ?? "user",
    createdAt: new Date().toISOString(),
    passwordHash,
  };

  const list = await getTempUsers();
  await saveTempUsers([user, ...list]);
  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}

export async function verifyTempUserPassword(
  email: string,
  password: string
): Promise<User | null> {
  const stored = await getTempUserByEmail(email);
  if (!stored) return null;

  const { verifyPassword } = await import("@/lib/password");
  const ok = await verifyPassword(password, stored.passwordHash);
  if (!ok) return null;

  const { passwordHash: _, ...user } = stored;
  return user;
}
