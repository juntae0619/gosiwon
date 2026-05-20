"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction, type AuthFormState } from "@/app/actions/auth";
import { AuthField } from "@/components/auth-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {
  ok: false,
  message: "",
};

export function SignupForm({ showTempHint = false }: { showTempHint?: boolean }) {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.message && !state.ok && (
        <p
          className="rounded-xl border border-[#C45C3E]/30 bg-[#C45C3E]/10 px-4 py-3 text-sm text-[#A84A32]"
          role="alert"
        >
          {state.message}
        </p>
      )}

      <AuthField label="이름 *" name="name" error={state.fieldErrors?.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="홍길동"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          required
        />
      </AuthField>

      <AuthField
        label="이메일 *"
        name="email"
        error={state.fieldErrors?.email}
        hint="로그인 시 사용합니다"
      >
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          required
        />
      </AuthField>

      <AuthField label="휴대폰" name="phone" error={state.fieldErrors?.phone}>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
        />
      </AuthField>

      <AuthField
        label="비밀번호 *"
        name="password"
        error={state.fieldErrors?.password}
        hint="8자 이상"
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          required
        />
      </AuthField>

      <AuthField
        label="비밀번호 확인 *"
        name="confirmPassword"
        error={state.fieldErrors?.confirmPassword}
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          required
        />
      </AuthField>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E8E0D4] bg-[#F7F3ED] px-4 py-3">
        <input
          type="checkbox"
          name="agree"
          className="mt-1 h-4 w-4 rounded border-[#E8E0D4] accent-[#C45C3E]"
          required
        />
        <span className="text-sm text-[#5C534C]">
          호실고 이용약관 및 개인정보 처리에 동의합니다.
        </span>
      </label>
      {state.fieldErrors?.agree && (
        <p className="-mt-4 text-xs text-[#C45C3E]">{state.fieldErrors.agree}</p>
      )}

      {showTempHint && (
        <p className="text-xs text-[#5C534C]">
          DB 미연결 환경에서는 이 브라우저에만 계정이 저장됩니다.
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#C45C3E] py-6 hover:bg-[#A84A32] disabled:opacity-60"
      >
        {pending ? "가입 중…" : "회원가입"}
      </Button>

      <p className="text-center text-sm text-[#5C534C]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-[#C45C3E] hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
