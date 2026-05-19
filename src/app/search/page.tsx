import Link from "next/link";
import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "방 찾기 — 호실고",
};

export default function SearchPage() {
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
        <h1 className="mt-4 font-serif text-3xl font-bold text-[#1A1614]">
          방 찾기
        </h1>
        <Suspense fallback={<p className="mt-8 text-[#5C534C]">불러오는 중…</p>}>
          <SearchResults />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
