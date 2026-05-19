import "server-only";

import { desc, eq } from "drizzle-orm";
import { ensureDb, isDatabaseEnabled } from "@/db";
import { roomsTable, type RoomRow } from "@/db/schema";
import { ROOMS, roomPhoto, type Room } from "@/lib/data";
import { getTempRoomById, getTempRooms } from "@/lib/temp-rooms";

function rowToRoom(row: RoomRow): Room {
  return {
    id: row.id,
    gosiwon: row.gosiwon,
    roomNumber: row.roomNumber,
    district: row.district,
    station: row.station,
    price: row.price,
    deposit: row.deposit,
    size: row.size,
    window: row.window,
    bathroom: row.bathroom as Room["bathroom"],
    moveIn: row.moveIn as Room["moveIn"],
    moveInLabel: row.moveInLabel,
    womenOnly: row.womenOnly ?? undefined,
    foreignerFriendly: row.foreignerFriendly ?? undefined,
    noDeposit: row.noDeposit ?? undefined,
    image: row.image,
    tags: JSON.parse(row.tags) as string[],
  };
}

function findSeedRoom(id: string): Room | null {
  return ROOMS.find((r) => r.id === id) ?? null;
}

async function mergeWithTempRooms(rooms: Room[]): Promise<Room[]> {
  const temp = await getTempRooms();
  const ids = new Set(rooms.map((r) => r.id));
  const merged = [...temp.filter((r) => !ids.has(r.id)), ...rooms];
  return merged;
}

export async function getAllRooms(): Promise<Room[]> {
  if (!isDatabaseEnabled()) {
    return mergeWithTempRooms([...ROOMS]);
  }

  try {
    const db = await ensureDb();
    if (!db) return mergeWithTempRooms([...ROOMS]);

    const rows = await db
      .select()
      .from(roomsTable)
      .orderBy(desc(roomsTable.createdAt));
    return mergeWithTempRooms(rows.map(rowToRoom));
  } catch (error) {
    console.error("[rooms] getAllRooms failed, using seed", error);
    return mergeWithTempRooms([...ROOMS]);
  }
}

export async function getRoomById(id: string): Promise<Room | null> {
  const temp = await getTempRoomById(id);
  if (temp) return temp;

  if (!isDatabaseEnabled()) {
    return findSeedRoom(id);
  }

  try {
    const db = await ensureDb();
    if (!db) return findSeedRoom(id);

    const rows = await db
      .select()
      .from(roomsTable)
      .where(eq(roomsTable.id, id))
      .limit(1);

    if (rows[0]) return rowToRoom(rows[0]);
    return findSeedRoom(id);
  } catch (error) {
    console.error("[rooms] getRoomById failed, using seed", error);
    return findSeedRoom(id);
  }
}

export type CreateRoomInput = {
  gosiwon: string;
  roomNumber: string;
  district: string;
  station: string;
  price: number;
  deposit: number;
  size: string;
  window: boolean;
  bathroom: "private" | "shared";
  moveIn: "today" | "week" | "reservation";
  womenOnly?: boolean;
  foreignerFriendly?: boolean;
  noDeposit?: boolean;
  image?: string;
  tags?: string[];
};

const MOVE_IN_LABELS: Record<CreateRoomInput["moveIn"], string> = {
  today: "오늘 입실 가능",
  week: "이번 주 입실",
  reservation: "예약 가능",
};

export async function createRoom(input: CreateRoomInput): Promise<Room> {
  if (!isDatabaseEnabled()) {
    throw new Error("DATABASE_DISABLED");
  }

  const db = await ensureDb();
  if (!db) {
    throw new Error("DATABASE_DISABLED");
  }

  const id = `custom-${Date.now()}`;
  const tags = input.tags?.filter(Boolean) ?? [];
  const row = {
    id,
    gosiwon: input.gosiwon.trim(),
    roomNumber: input.roomNumber.trim(),
    district: input.district.trim(),
    station: input.station.trim(),
    price: input.price,
    deposit: input.noDeposit ? 0 : input.deposit,
    size: input.size.trim(),
    window: input.window,
    bathroom: input.bathroom,
    moveIn: input.moveIn,
    moveInLabel: MOVE_IN_LABELS[input.moveIn],
    womenOnly: input.womenOnly ?? false,
    foreignerFriendly: input.foreignerFriendly ?? false,
    noDeposit: input.noDeposit ?? false,
    image: input.image?.trim() || roomPhoto(id),
    tags: JSON.stringify(tags),
    createdAt: new Date().toISOString(),
  };

  await db.insert(roomsTable).values(row);

  const saved = await getRoomById(id);
  if (!saved) {
    throw new Error("Failed to read saved room");
  }
  return saved;
}
