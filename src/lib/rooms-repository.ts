import "server-only";

import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { roomsTable, type RoomRow } from "@/db/schema";
import type { Room } from "@/lib/data";
import { roomPhoto } from "@/lib/data";

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

export function getAllRooms(): Room[] {
  const db = getDb();
  const rows = db
    .select()
    .from(roomsTable)
    .orderBy(desc(roomsTable.createdAt))
    .all();
  return rows.map(rowToRoom);
}

export function getRoomById(id: string): Room | null {
  const db = getDb();
  const row = db
    .select()
    .from(roomsTable)
    .where(eq(roomsTable.id, id))
    .get();
  return row ? rowToRoom(row) : null;
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

export function createRoom(input: CreateRoomInput): Room {
  const db = getDb();
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

  db.insert(roomsTable).values(row).run();
  const saved = getRoomById(id);
  if (!saved) {
    throw new Error("Failed to read saved room");
  }
  return saved;
}
