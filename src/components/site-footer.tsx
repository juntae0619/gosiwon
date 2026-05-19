import Link from "next/link";
import { HashLink } from "@/components/hash-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E8E0D4] bg-[#FFFCF7] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:justify-between md:px-6">
        <div>
          <p className="font-serif text-2xl font-bold text-[#1A1614]">호실고</p>
          <p className="mt-2 max-w-xs text-sm text-[#5C534C]">
            호실 단위 고시원·원룸텔 예약 플랫폼 MVP
          </p>
        </div>
        <div className="flex gap-12 text-sm text-[#5C534C]">
          <div>
            <p className="mb-3 font-semibold text-[#1A1614]">서비스</p>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="hover:text-[#C45C3E]">
                  방 찾기
                </Link>
              </li>
              <li>
                <HashLink href="/#features" className="hover:text-[#C45C3E]">
                  소개
                </HashLink>
              </li>
              <li>
                <HashLink href="/#rooms" className="hover:text-[#C45C3E]">
                  추천 호실
                </HashLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-[#1A1614]">지역 (예정)</p>
            <ul className="space-y-2">
              <li>영등포 · 신도림</li>
              <li>연신내 · 홍대</li>
              <li>서울대입구</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-center text-xs text-[#5C534C] md:px-6 md:text-left">
        © {new Date().getFullYear()} 호실고 Hosilgo — 기획 문서 기반 MVP 데모
      </p>
    </footer>
  );
}
