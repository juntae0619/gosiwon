import Link from "next/link";
import { isDatabaseEnabled } from "@/db";
import { RegisterForm } from "@/components/register-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "방 등록하기 — 호실고",
  description: "고시원 호실을 등록하고 로컬 DB에 저장합니다.",
};

export default function RegisterPage() {
  const dbEnabled = isDatabaseEnabled();

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <SiteHeader ready={true} />
      <main className="mx-auto max-w-2xl px-4 py-10 md:px-6">
        <Link
          href="/"
          className="text-sm text-[#5C534C] transition-colors hover:text-[#C45C3E]"
        >
          ← 홈으로
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-bold text-[#1A1614]">
          방 등록하기
        </h1>
        <p className="mt-2 text-sm text-[#5C534C]">
          사업자·관리자가 호실 정보를 입력하면 검색·상세 페이지에 바로
          반영됩니다.
        </p>

        {!dbEnabled && (
          <p className="mt-4 rounded-xl border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-4 py-3 text-sm text-[#5C534C]">
            Vercel 배포 환경에서는 방 찾기는 샘플 데이터로 동작합니다. 호실
            등록·저장은 Turso DB 연결 후 사용할 수 있습니다.
          </p>
        )}

        <div className="mt-10 rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] p-6 shadow-sm md:p-8">
          <RegisterForm dbEnabled={dbEnabled} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
