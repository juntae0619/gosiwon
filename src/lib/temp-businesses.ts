import "server-only";

import { cookies } from "next/headers";
import type { Business, CreateBusinessInput } from "@/lib/business";

const COOKIE_KEY = "hosilgo_temp_businesses";
const MAX = 10;

export function buildBusinessFromInput(input: CreateBusinessInput): Business {
  return {
    id: `biz-temp-${Date.now()}`,
    name: input.name.trim(),
    ownerName: input.ownerName.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    district: input.district.trim(),
    address: input.address.trim(),
    station: input.station.trim(),
    totalRooms: input.totalRooms,
    bizNumber: input.bizNumber?.trim() || undefined,
    description: input.description?.trim() || undefined,
    foreignerFriendly: input.foreignerFriendly || undefined,
    womenOnly: input.womenOnly || undefined,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export async function getTempBusinesses(): Promise<Business[]> {
  const store = await cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Business[];
  } catch {
    return [];
  }
}

export async function addTempBusiness(business: Business): Promise<void> {
  const store = await cookies();
  const existing = await getTempBusinesses();
  const next = [
    business,
    ...existing.filter((b) => b.id !== business.id),
  ].slice(0, MAX);

  store.set(COOKIE_KEY, JSON.stringify(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getTempBusinessById(
  id: string
): Promise<Business | null> {
  const list = await getTempBusinesses();
  return list.find((b) => b.id === id) ?? null;
}
