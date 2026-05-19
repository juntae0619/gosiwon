import Link from "next/link";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllRooms } from "@/lib/rooms-repository";

export const metadata = {
  title: "방 찾기 — 호실고",
};

export const dynamic = "force-dynamic";

export default function SearchPage() {
  const rooms = getAllRooms();

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <SiteHeader ready={true} />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <Link
          href="/"
          className="text-sm text-[#5C534C] transition-colors hover:text-[#C45C3E]"
        >
          ← 홈으로
        </Link>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1614]">
              방 찾기
            </h1>
            <p className="mt-1 text-sm text-[#5C534C]">
              로컬 DB에 저장된 호실을 검색합니다.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex rounded-xl bg-[#C45C3E] px-4 py-2 text-sm font-medium text-white hover:bg-[#A84A32]"
          >
            + 방 등록하기
          </Link>
        </div>
        <Suspense fallback={<p className="mt-8 text-[#5C534C]">불러오는 중…</p>}>
          <SearchResults rooms={rooms} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
