import "server-only";

import { eq } from "drizzle-orm";
import { ensureDb, isDatabaseEnabled } from "@/db";
import { businessesTable, type BusinessRow } from "@/db/schema";
import type { Business, CreateBusinessInput } from "@/lib/business";
import { getTempBusinessById } from "@/lib/temp-businesses";

function rowToBusiness(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    ownerName: row.ownerName,
    phone: row.phone,
    email: row.email ?? undefined,
    district: row.district,
    address: row.address,
    station: row.station,
    totalRooms: row.totalRooms ?? undefined,
    bizNumber: row.bizNumber ?? undefined,
    description: row.description ?? undefined,
    foreignerFriendly: row.foreignerFriendly ?? undefined,
    womenOnly: row.womenOnly ?? undefined,
    status: row.status as Business["status"],
    createdAt: row.createdAt,
  };
}

export async function createBusiness(
  input: CreateBusinessInput
): Promise<Business> {
  if (!isDatabaseEnabled()) {
    throw new Error("DATABASE_DISABLED");
  }

  const db = await ensureDb();
  if (!db) throw new Error("DATABASE_DISABLED");

  const id = `biz-${Date.now()}`;
  const row = {
    id,
    name: input.name.trim(),
    ownerName: input.ownerName.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    district: input.district.trim(),
    address: input.address.trim(),
    station: input.station.trim(),
    totalRooms: input.totalRooms ?? null,
    bizNumber: input.bizNumber?.trim() || null,
    description: input.description?.trim() || null,
    foreignerFriendly: input.foreignerFriendly ?? false,
    womenOnly: input.womenOnly ?? false,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  await db.insert(businessesTable).values(row);

  const saved = await getBusinessById(id);
  if (!saved) throw new Error("Failed to read saved business");
  return saved;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const temp = await getTempBusinessById(id);
  if (temp) return temp;

  if (!isDatabaseEnabled()) return null;

  try {
    const db = await ensureDb();
    if (!db) return null;

    const rows = await db
      .select()
      .from(businessesTable)
      .where(eq(businessesTable.id, id))
      .limit(1);

    return rows[0] ? rowToBusiness(rows[0]) : null;
  } catch {
    return null;
  }
}
