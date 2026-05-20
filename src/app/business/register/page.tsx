import Link from "next/link";
import { Building2, DoorOpen } from "lucide-react";
import { isDatabaseEnabled } from "@/db";
import { BusinessRegisterForm } from "@/components/business-register-form";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { SiteFooter } from "@/components/site-footer";
import { getBusinessById } from "@/lib/businesses-repository";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "사업자 입점 신청 — 호실고",
  description: "고시원·원룸텔 사업자 입점 신청",
};

type Props = {
  searchParams: Promise<{
    submitted?: string;
    id?: string;
    temp?: string;
  }>;
};

export default async function BusinessRegisterPage({ searchParams }: Props) {
  const dbEnabled = isDatabaseEnabled();
  const { submitted, id, temp } = await searchParams;
  const showSuccess = submitted === "1";
  const business =
    showSuccess && id ? await getBusinessById(id) : null;

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <SiteHeaderShell ready={true} />
      <main className="mx-auto max-w-2xl px-4 py-10 md:px-6">
        <Link
          href="/"
          className="text-sm text-[#5C534C] transition-colors hover:text-[#C45C3E]"
        >
          ← 홈으로
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A6B5D] text-white">
            <Building2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-[#4A6B5D]">사업자 입점</p>
            <h1 className="font-serif text-3xl font-bold text-[#1A1614]">
              사업자 등록
            </h1>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#5C534C]">
          호실고에 입점하려는 고시원·원룸텔 사업자를 위한 신청 화면입니다.
          승인 후{" "}
          <Link href="/register" className="font-medium text-[#C45C3E] hover:underline">
            호실 등록
          </Link>
          에서 방별 사진·가격을 올릴 수 있습니다.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#4A6B5D] bg-[#4A6B5D]/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A6B5D]">
              1단계 · 지금
            </p>
            <p className="mt-1 font-semibold text-[#1A1614]">사업자 입점 신청</p>
            <p className="mt-1 text-xs text-[#5C534C]">
              시설명, 연락처, 위치 등 기본 정보
            </p>
          </div>
          <div className="rounded-2xl border border-[#E8E0D4] bg-[#FFFCF7] p-4 opacity-80">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5C534C]">
              2단계 · 이후
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#1A1614]">
              <DoorOpen className="h-4 w-4" />
              호실 등록
            </p>
            <p className="mt-1 text-xs text-[#5C534C]">
              호실별 사진, 월세, 입실 조건
            </p>
          </div>
        </div>

        {showSuccess && (
          <div
            className="mt-8 rounded-2xl border border-[#4A6B5D]/30 bg-[#4A6B5D]/10 px-5 py-4"
            role="status"
          >
            <p className="font-semibold text-[#4A6B5D]">
              {temp === "1" ? "임시로 입점 신청되었습니다." : "입점 신청이 접수되었습니다."}
            </p>
            <p className="mt-1 text-sm text-[#5C534C]">
              {business && (
                <>
                  <strong className="text-[#1A1614]">{business.name}</strong>
                  {" · "}
                  담당: {business.ownerName}
                  <br />
                </>
              )}
              운영팀 검토 후 연락드립니다. 다음 단계로 호실을 등록해 주세요.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-4 inline-flex rounded-lg bg-[#C45C3E] text-white hover:bg-[#A84A32]"
              )}
            >
              호실 등록하러 가기 →
            </Link>
          </div>
        )}

        {!showSuccess && (
          <>
            {!dbEnabled && (
              <p className="mt-4 rounded-xl border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-4 py-3 text-sm text-[#5C534C]">
                Vercel 환경에서는 신청 정보가 브라우저에 임시 저장됩니다.
              </p>
            )}
            <div className="mt-8 rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] p-6 shadow-sm md:p-8">
              <BusinessRegisterForm showTempHint={!dbEnabled} />
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
