"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDatabaseEnabled } from "@/db";
import {
  createRoom,
  type CreateRoomInput,
} from "@/lib/rooms-repository";

export type RegisterRoomState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function registerRoomAction(
  _prev: RegisterRoomState,
  formData: FormData
): Promise<RegisterRoomState> {
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

  const fieldErrors: Record<string, string> = {};

  if (!gosiwon) fieldErrors.gosiwon = "고시원 이름을 입력하세요.";
  if (!roomNumber) fieldErrors.roomNumber = "호실 번호를 입력하세요.";
  if (!district) fieldErrors.district = "지역을 입력하세요.";
  if (!station) fieldErrors.station = "역·위치를 입력하세요.";
  if (!size) fieldErrors.size = "평수를 입력하세요.";

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price < 10000) {
    fieldErrors.price = "월세를 만원 단위 이상으로 입력하세요.";
  }

  const deposit = noDeposit ? 0 : Number(depositRaw);
  if (!noDeposit && (Number.isNaN(deposit) || deposit < 0)) {
    fieldErrors.deposit = "보증금을 올바르게 입력하세요.";
  }

  if (bathroom !== "private" && bathroom !== "shared") {
    fieldErrors.bathroom = "화장실 유형을 선택하세요.";
  }

  if (
    moveIn !== "today" &&
    moveIn !== "week" &&
    moveIn !== "reservation"
  ) {
    fieldErrors.moveIn = "입실 가능 시점을 선택하세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  if (!isDatabaseEnabled()) {
    return {
      ok: false,
      message:
        "Vercel 배포 환경에서는 DB(Turso) 설정 전까지 등록이 제한됩니다. 방 찾기·목록은 샘플 데이터로 이용 가능합니다.",
    };
  }

  const input: CreateRoomInput = {
    gosiwon,
    roomNumber,
    district,
    station,
    size,
    price,
    deposit,
    window,
    bathroom: bathroom as "private" | "shared",
    moveIn: moveIn as CreateRoomInput["moveIn"],
    womenOnly,
    foreignerFriendly,
    noDeposit,
    image: image || undefined,
    tags: tagsRaw
      ? tagsRaw.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      : [],
  };

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
