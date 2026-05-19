"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  registerRoomAction,
  type RegisterRoomState,
} from "@/app/actions/rooms";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: RegisterRoomState = {
  ok: false,
  message: "",
};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[#1A1614]">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[#C45C3E]">{error}</p>}
    </div>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerRoomAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      {state.message && !state.ok && (
        <p
          className="rounded-xl border border-[#C45C3E]/30 bg-[#C45C3E]/10 px-4 py-3 text-sm text-[#A84A32]"
          role="alert"
        >
          {state.message}
        </p>
      )}

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-[#1A1614]">
          기본 정보
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="고시원 이름 *"
            name="gosiwon"
            error={state.fieldErrors?.gosiwon}
          >
            <Input
              id="gosiwon"
              name="gosiwon"
              placeholder="예: A고시원"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="호실 번호 *"
            name="roomNumber"
            error={state.fieldErrors?.roomNumber}
          >
            <Input
              id="roomNumber"
              name="roomNumber"
              placeholder="예: 301호"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field label="지역 *" name="district" error={state.fieldErrors?.district}>
            <Input
              id="district"
              name="district"
              placeholder="예: 영등포"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="역·위치 *"
            name="station"
            error={state.fieldErrors?.station}
          >
            <Input
              id="station"
              name="station"
              placeholder="예: 신도림역 도보 8분"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-[#1A1614]">
          가격 · 조건
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="월세 (원) *" name="price" error={state.fieldErrors?.price}>
            <Input
              id="price"
              name="price"
              type="number"
              min={10000}
              step={10000}
              placeholder="550000"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field label="보증금 (원)" name="deposit" error={state.fieldErrors?.deposit}>
            <Input
              id="deposit"
              name="deposit"
              type="number"
              min={0}
              step={10000}
              defaultValue={0}
              placeholder="0"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
            />
          </Field>
          <Field label="평수 *" name="size" error={state.fieldErrors?.size}>
            <Input
              id="size"
              name="size"
              placeholder="예: 4.2평"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="화장실 *"
            name="bathroom"
            error={state.fieldErrors?.bathroom}
          >
            <select
              id="bathroom"
              name="bathroom"
              defaultValue=""
              className={cn(
                "h-9 w-full rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] px-3 text-sm",
                "focus-visible:border-[#C45C3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C3E]/20"
              )}
              required
            >
              <option value="" disabled>
                선택하세요
              </option>
              <option value="private">개인 화장실</option>
              <option value="shared">공용 화장실</option>
            </select>
          </Field>
          <Field
            label="입실 가능 *"
            name="moveIn"
            error={state.fieldErrors?.moveIn}
          >
            <select
              id="moveIn"
              name="moveIn"
              defaultValue=""
              className={cn(
                "h-9 w-full rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] px-3 text-sm",
                "focus-visible:border-[#C45C3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C3E]/20"
              )}
              required
            >
              <option value="" disabled>
                선택하세요
              </option>
              <option value="today">오늘 입실 가능</option>
              <option value="week">이번 주 입실</option>
              <option value="reservation">예약 가능</option>
            </select>
          </Field>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { name: "window", label: "창문 있음" },
            { name: "noDeposit", label: "보증금 없음" },
            { name: "womenOnly", label: "여성 전용" },
            { name: "foreignerFriendly", label: "외국인 가능" },
          ].map((item) => (
            <label
              key={item.name}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] px-4 py-2.5 text-sm text-[#5C534C] has-checked:border-[#4A6B5D] has-checked:bg-[#4A6B5D]/10 has-checked:text-[#4A6B5D]"
            >
              <input
                type="checkbox"
                name={item.name}
                className="h-4 w-4 rounded border-[#E8E0D4] accent-[#4A6B5D]"
              />
              {item.label}
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-[#1A1614]">
          사진 · 태그 (선택)
        </h2>
        <Field label="사진 URL" name="image">
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="비우면 자동으로 샘플 사진이 지정됩니다"
            className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          />
        </Field>
        <Field label="태그" name="tags">
          <Input
            id="tags"
            name="tags"
            placeholder="쉼표로 구분 (예: 창문, 가성비)"
            className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          />
        </Field>
      </section>

      <div className="flex flex-col gap-3 border-t border-[#E8E0D4] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#5C534C]">
          등록한 호실은 로컬 SQLite DB(
          <code className="rounded bg-[#E8E0D4]/60 px-1">data/hosilgo.db</code>
          )에 저장됩니다.
        </p>
        <div className="flex gap-3">
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl border-[#E8E0D4]"
            )}
          >
            취소
          </Link>
          <Button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-[#C45C3E] px-8 hover:bg-[#A84A32] disabled:opacity-60"
          >
            {pending ? "저장 중…" : "호실 등록하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
