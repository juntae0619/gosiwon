import Link from "next/link";
import { isDatabaseEnabled } from "@/db";
import { RegisterForm } from "@/components/register-form";
import { SiteHeaderShell } from "@/components/site-header-shell";
import { SiteFooter } from "@/components/site-footer";
import { getTempRoomById } from "@/lib/temp-rooms";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "호실 등록 — 호실고",
  description: "고시원 호실별 사진·가격을 등록합니다.",
};

type Props = {
  searchParams: Promise<{ tempRegistered?: string; roomId?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const dbEnabled = isDatabaseEnabled();
  const { tempRegistered, roomId } = await searchParams;
  const showTempSuccess = tempRegistered === "1";
  const tempRoom =
    showTempSuccess && roomId ? await getTempRoomById(roomId) : null;

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
        <h1 className="mt-4 font-serif text-3xl font-bold text-[#1A1614]">
          호실 등록
        </h1>
        <p className="mt-2 text-sm text-[#5C534C]">
          입점 승인된 사업자가 호실별 사진·가격·입실 조건을 등록하면 검색·상세
          페이지에 반영됩니다. 아직 입점하지 않으셨다면{" "}
          <Link
            href="/business/register"
            className="font-medium text-[#C45C3E] hover:underline"
          >
            사업자 등록
          </Link>
          을 먼저 진행해 주세요.
        </p>

        {showTempSuccess && (
          <div
            className="mt-6 rounded-2xl border border-[#4A6B5D]/30 bg-[#4A6B5D]/10 px-5 py-4"
            role="status"
          >
            <p className="font-semibold text-[#4A6B5D]">
              임시로 등록되었습니다.
            </p>
            <p className="mt-1 text-sm text-[#5C534C]">
              {dbEnabled
                ? "등록 내용을 확인한 뒤 아래에서 이어서 등록할 수 있습니다."
                : "이 브라우저에만 저장됩니다. Turso DB 연결 시 영구 저장됩니다."}
              {tempRoom && (
                <>
                  {" "}
                  <span className="font-medium text-[#1A1614]">
                    {tempRoom.gosiwon} {tempRoom.roomNumber}
                  </span>
                  이 추가되었습니다.
                </>
              )}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tempRoom && (
                <Link
                  href={`/rooms/${tempRoom.id}?tempRegistered=1`}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "rounded-lg bg-[#4A6B5D] text-white hover:bg-[#3d5a4f]"
                  )}
                >
                  등록한 호실 보기
                </Link>
              )}
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "rounded-lg border-[#E8E0D4]"
                )}
              >
                방 찾기에서 확인
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "rounded-lg border-[#E8E0D4]"
                )}
              >
                추가 등록하기
              </Link>
            </div>
          </div>
        )}

        {!dbEnabled && !showTempSuccess && (
          <p className="mt-4 rounded-xl border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-4 py-3 text-sm text-[#5C534C]">
            DB가 연결되지 않은 환경에서는 <strong>임시 등록</strong>으로 이
            기기에서만 조회할 수 있습니다.
          </p>
        )}

        <div className="mt-10 rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] p-6 shadow-sm md:p-8">
          <RegisterForm dbEnabled={dbEnabled} showTempHint={!dbEnabled} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
