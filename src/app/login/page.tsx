import Link from "next/link";
import { LogIn } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "로그인 — 호실고",
  description: "호실고 로그인",
};

export default function LoginPage() {
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
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A6B5D] text-white">
            <LogIn className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-[#4A6B5D]">계정</p>
            <h1 className="font-serif text-3xl font-bold text-[#1A1614]">
              로그인
            </h1>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] p-6 shadow-sm md:p-8">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
