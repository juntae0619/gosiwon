import Link from "next/link";
import { UserPlus } from "lucide-react";
import { isDatabaseEnabled } from "@/db";
import { SignupForm } from "@/components/signup-form";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "회원가입 — 호실고",
  description: "호실고 회원가입",
};

export default function SignupPage() {
  const dbEnabled = isDatabaseEnabled();

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <SiteHeaderShell ready={true} />
      <main className="mx-auto max-w-md px-4 py-10 md:px-6">
        <Link
          href="/"
          className="text-sm text-[#5C534C] transition-colors hover:text-[#C45C3E]"
        >
          ← 홈으로
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C45C3E] text-white">
            <UserPlus className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-[#4A6B5D]">입주자 · 이용자</p>
            <h1 className="font-serif text-3xl font-bold text-[#1A1614]">
              회원가입
            </h1>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#5C534C]">
          호실 비교·문의·예약을 위해 계정을 만드세요. 사업자 입점은{" "}
          <Link
            href="/business/register"
            className="font-medium text-[#C45C3E] hover:underline"
          >
            사업자 등록
          </Link>
          을 이용해 주세요.
        </p>

        <div className="mt-8 rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] p-6 shadow-sm md:p-8">
          <SignupForm showTempHint={!dbEnabled} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
