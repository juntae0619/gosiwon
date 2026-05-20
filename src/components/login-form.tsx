"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthFormState } from "@/app/actions/auth";
import { AuthField } from "@/components/auth-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthFormState = {
  ok: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

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

      <AuthField label="이메일" name="email" error={state.fieldErrors?.email}>
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

      <AuthField
        label="비밀번호"
        name="password"
        error={state.fieldErrors?.password}
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="rounded-xl border-[#E8E0D4] bg-[#FFFCF7]"
          required
        />
      </AuthField>

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#C45C3E] py-6 hover:bg-[#A84A32] disabled:opacity-60"
      >
        {pending ? "로그인 중…" : "로그인"}
      </Button>

      <p className="text-center text-sm text-[#5C534C]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-[#C45C3E] hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
