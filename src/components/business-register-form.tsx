"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  registerBusinessAction,
  type RegisterBusinessState,
} from "@/app/actions/businesses";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: RegisterBusinessState = {
  ok: false,
  message: "",
};

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[#1A1614]">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-[#5C534C]">{hint}</p>}
      {error && <p className="text-xs text-[#C45C3E]">{error}</p>}
    </div>
  );
}

export function BusinessRegisterForm({
  showTempHint = false,
}: {
  showTempHint?: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    registerBusinessAction,
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
          사업자 · 시설 정보
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="고시원·숙소명 *"
            name="name"
            error={state.fieldErrors?.name}
            hint="입점 후 호실 등록 시 표시되는 이름입니다."
          >
            <Input
              id="name"
              name="name"
              placeholder="예: A고시원"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="대표자(담당자)명 *"
            name="ownerName"
            error={state.fieldErrors?.ownerName}
          >
            <Input
              id="ownerName"
              name="ownerName"
              placeholder="홍길동"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="연락처 *"
            name="phone"
            error={state.fieldErrors?.phone}
          >
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-0000-0000"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field label="이메일" name="email">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contact@example.com"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
            />
          </Field>
          <Field
            label="사업자등록번호"
            name="bizNumber"
            hint="선택 · 심사 시 요청드릴 수 있습니다."
          >
            <Input
              id="bizNumber"
              name="bizNumber"
              placeholder="000-00-00000"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
            />
          </Field>
          <Field
            label="보유 호실 수"
            name="totalRooms"
            error={state.fieldErrors?.totalRooms}
          >
            <Input
              id="totalRooms"
              name="totalRooms"
              type="number"
              min={1}
              placeholder="예: 20"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
            />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-[#1A1614]">
          위치
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="지역 *" name="district" error={state.fieldErrors?.district}>
            <Input
              id="district"
              name="district"
              placeholder="예: 영등포구"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="가까운 역 · 위치 *"
            name="station"
            error={state.fieldErrors?.station}
          >
            <Input
              id="station"
              name="station"
              placeholder="신도림역 도보 8분"
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
              required
            />
          </Field>
          <Field
            label="주소 *"
            name="address"
            error={state.fieldErrors?.address}
            hint="상세 주소까지 입력해 주세요."
          >
            <Input
              id="address"
              name="address"
              placeholder="서울특별시 ..."
              className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7] sm:col-span-2"
              required
            />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-[#1A1614]">
          시설 소개
        </h2>
        <Field label="한줄 소개" name="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="건물 특징, 관리 방식, 입실 대상 등을 간단히 적어 주세요."
            className={cn(
              "w-full rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] px-3 py-2 text-sm",
              "focus-visible:border-[#C45C3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C3E]/20"
            )}
          />
        </Field>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "foreignerFriendly", label: "외국인 입실 가능" },
            { name: "womenOnly", label: "여성 전용 시설" },
          ].map((item) => (
            <label
              key={item.name}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] px-4 py-2.5 text-sm text-[#5C534C]"
            >
              <input
                type="checkbox"
                name={item.name}
                className="h-4 w-4 rounded accent-[#4A6B5D]"
              />
              {item.label}
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#E8E0D4] bg-[#F7F3ED] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="agree"
            required
            className="mt-1 h-4 w-4 rounded accent-[#C45C3E]"
          />
          <span className="text-sm text-[#5C534C]">
            입점 신청 정보가 호실고 운영팀 심사·연락 목적으로 사용됨에
            동의합니다. 승인 후 호실별 사진·가격을 등록할 수 있습니다.
          </span>
        </label>
        {state.fieldErrors?.agree && (
          <p className="mt-2 text-xs text-[#C45C3E]">{state.fieldErrors.agree}</p>
        )}
      </section>

      <div className="flex flex-col gap-3 border-t border-[#E8E0D4] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#5C534C]">
          {showTempHint
            ? "임시 저장됩니다. 심사 후 호실 등록 단계로 진행합니다."
            : "신청 후 검토되며, 승인되면 호실 등록이 가능합니다."}
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
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
            {pending ? "신청 중…" : "입점 신청하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
