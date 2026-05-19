import "server-only";

import { cookies } from "next/headers";
import type { Room } from "@/lib/data";
import { roomPhoto } from "@/lib/data";
import type { CreateRoomInput } from "@/lib/rooms-repository";

const COOKIE_KEY = "hosilgo_temp_rooms";
const MAX_TEMP_ROOMS = 30;

const MOVE_IN_LABELS: Record<CreateRoomInput["moveIn"], string> = {
  today: "오늘 입실 가능",
  week: "이번 주 입실",
  reservation: "예약 가능",
};

export function buildRoomFromInput(input: CreateRoomInput): Room {
  const id = `temp-${Date.now()}`;
  const tags = input.tags?.filter(Boolean) ?? [];

  return {
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
    womenOnly: input.womenOnly || undefined,
    foreignerFriendly: input.foreignerFriendly || undefined,
    noDeposit: input.noDeposit || undefined,
    image: input.image?.trim() || roomPhoto(id),
    tags,
  };
}

export async function getTempRooms(): Promise<Room[]> {
  const store = await cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Room[];
  } catch {
    return [];
  }
}

export async function addTempRoom(room: Room): Promise<void> {
  const store = await cookies();
  const existing = await getTempRooms();
  const next = [room, ...existing.filter((r) => r.id !== room.id)].slice(
    0,
    MAX_TEMP_ROOMS
  );

  store.set(COOKIE_KEY, JSON.stringify(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getTempRoomById(id: string): Promise<Room | null> {
  const rooms = await getTempRooms();
  return rooms.find((r) => r.id === id) ?? null;
}
