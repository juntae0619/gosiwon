"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDatabaseEnabled } from "@/db";
import {
  createRoom,
  type CreateRoomInput,
} from "@/lib/rooms-repository";
import { addTempRoom, buildRoomFromInput } from "@/lib/temp-rooms";

export type RegisterRoomState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

function parseFormData(formData: FormData) {
  const gosiwon = String(formData.get("gosiwon") ?? "").trim();
  const roomNumber = String(formData.get("roomNumber") ?? "").trim();
  const district = String(formData.get("district") ?? "").trim();
  const station = String(formData.get("station") ?? "").trim();
  const size = String(formData.get("size") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const depositRaw = String(formData.get("deposit") ?? "0").trim();
  const bathroom = String(formData.get("bathroom") ?? "");
  const moveIn = String(formData.get("moveIn") ?? "");
  const image = String(formData.get("image") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "").trim();

  const window = formData.get("window") === "on";
  const womenOnly = formData.get("womenOnly") === "on";
  const foreignerFriendly = formData.get("foreignerFriendly") === "on";
  const noDeposit = formData.get("noDeposit") === "on";

  return {
    gosiwon,
    roomNumber,
    district,
    station,
    size,
    priceRaw,
    depositRaw,
    bathroom,
    moveIn,
    image,
    tagsRaw,
    window,
    womenOnly,
    foreignerFriendly,
    noDeposit,
  };
}

function validateForm(parsed: ReturnType<typeof parseFormData>) {
  const fieldErrors: Record<string, string> = {};

  if (!parsed.gosiwon) fieldErrors.gosiwon = "고시원 이름을 입력하세요.";
  if (!parsed.roomNumber) fieldErrors.roomNumber = "호실 번호를 입력하세요.";
  if (!parsed.district) fieldErrors.district = "지역을 입력하세요.";
  if (!parsed.station) fieldErrors.station = "역·위치를 입력하세요.";
  if (!parsed.size) fieldErrors.size = "평수를 입력하세요.";

  const price = Number(parsed.priceRaw);
  if (!parsed.priceRaw || Number.isNaN(price) || price < 10000) {
    fieldErrors.price = "월세를 만원 단위 이상으로 입력하세요.";
  }

  const deposit = parsed.noDeposit ? 0 : Number(parsed.depositRaw);
  if (!parsed.noDeposit && (Number.isNaN(deposit) || deposit < 0)) {
    fieldErrors.deposit = "보증금을 올바르게 입력하세요.";
  }

  if (parsed.bathroom !== "private" && parsed.bathroom !== "shared") {
    fieldErrors.bathroom = "화장실 유형을 선택하세요.";
  }

  if (
    parsed.moveIn !== "today" &&
    parsed.moveIn !== "week" &&
    parsed.moveIn !== "reservation"
  ) {
    fieldErrors.moveIn = "입실 가능 시점을 선택하세요.";
  }

  return { fieldErrors, price, deposit };
}

export async function registerRoomAction(
  _prev: RegisterRoomState,
  formData: FormData
): Promise<RegisterRoomState> {
  const parsed = parseFormData(formData);
  const { fieldErrors, price, deposit } = validateForm(parsed);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  const input: CreateRoomInput = {
    gosiwon: parsed.gosiwon,
    roomNumber: parsed.roomNumber,
    district: parsed.district,
    station: parsed.station,
    size: parsed.size,
    price,
    deposit,
    window: parsed.window,
    bathroom: parsed.bathroom as "private" | "shared",
    moveIn: parsed.moveIn as CreateRoomInput["moveIn"],
    womenOnly: parsed.womenOnly,
    foreignerFriendly: parsed.foreignerFriendly,
    noDeposit: parsed.noDeposit,
    image: parsed.image || undefined,
    tags: parsed.tagsRaw
      ? parsed.tagsRaw.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      : [],
  };

  if (!isDatabaseEnabled()) {
    const room = buildRoomFromInput(input);
    await addTempRoom(room);
    revalidatePath("/");
    revalidatePath("/search");
    revalidatePath("/register");
    redirect(`/register?tempRegistered=1&roomId=${room.id}`);
  }

  let room;
  try {
    room = await createRoom(input);
  } catch {
    return {
      ok: false,
      message: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath(`/rooms/${room.id}`);

  redirect(`/rooms/${room.id}?registered=1`);
}
