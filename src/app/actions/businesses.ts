"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDatabaseEnabled } from "@/db";
import type { CreateBusinessInput } from "@/lib/business";
import { createBusiness } from "@/lib/businesses-repository";
import { addTempBusiness, buildBusinessFromInput } from "@/lib/temp-businesses";

export type RegisterBusinessState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

function parseForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    ownerName: String(formData.get("ownerName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    district: String(formData.get("district") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    station: String(formData.get("station") ?? "").trim(),
    totalRoomsRaw: String(formData.get("totalRooms") ?? "").trim(),
    bizNumber: String(formData.get("bizNumber") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    foreignerFriendly: formData.get("foreignerFriendly") === "on",
    womenOnly: formData.get("womenOnly") === "on",
    agree: formData.get("agree") === "on",
  };
}

export async function registerBusinessAction(
  _prev: RegisterBusinessState,
  formData: FormData
): Promise<RegisterBusinessState> {
  const parsed = parseForm(formData);
  const fieldErrors: Record<string, string> = {};

  if (!parsed.name) fieldErrors.name = "고시원·숙소명을 입력하세요.";
  if (!parsed.ownerName) fieldErrors.ownerName = "대표자(담당자)명을 입력하세요.";
  if (!parsed.phone) fieldErrors.phone = "연락처를 입력하세요.";
  if (!parsed.district) fieldErrors.district = "지역을 입력하세요.";
  if (!parsed.address) fieldErrors.address = "주소를 입력하세요.";
  if (!parsed.station) fieldErrors.station = "가까운 역·위치를 입력하세요.";
  if (!parsed.agree) fieldErrors.agree = "입점 안내에 동의해 주세요.";

  const totalRooms = parsed.totalRoomsRaw
    ? Number(parsed.totalRoomsRaw)
    : undefined;
  if (
    parsed.totalRoomsRaw &&
    (Number.isNaN(totalRooms) || (totalRooms ?? 0) < 1)
  ) {
    fieldErrors.totalRooms = "호실 수를 올바르게 입력하세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  const input: CreateBusinessInput = {
    name: parsed.name,
    ownerName: parsed.ownerName,
    phone: parsed.phone,
    email: parsed.email || undefined,
    district: parsed.district,
    address: parsed.address,
    station: parsed.station,
    totalRooms,
    bizNumber: parsed.bizNumber || undefined,
    description: parsed.description || undefined,
    foreignerFriendly: parsed.foreignerFriendly,
    womenOnly: parsed.womenOnly,
  };

  if (!isDatabaseEnabled()) {
    const business = buildBusinessFromInput(input);
    await addTempBusiness(business);
    revalidatePath("/business/register");
    redirect(
      `/business/register?submitted=1&id=${business.id}&temp=1`
    );
  }

  let business;
  try {
    business = await createBusiness(input);
  } catch {
    return {
      ok: false,
      message: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  revalidatePath("/business/register");
  redirect(`/business/register?submitted=1&id=${business.id}`);
}
