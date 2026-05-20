"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { HashLink } from "@/components/hash-link";
import { LogoutButton } from "@/components/logout-button";
import type { SessionUser } from "@/lib/user";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "방 찾기", href: "/search", type: "route" as const },
  { label: "왜 호실고인가", href: "/#features" as const, type: "hash" as const },
  { label: "추천 호실", href: "/#rooms" as const, type: "hash" as const },
] as const;

export function SiteHeader({
  ready,
  user = null,
}: {
  ready: boolean;
  user?: SessionUser | null;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.type === "route") return pathname === item.href;
    return false;
  };

  const linkClass = (active: boolean) =>
    cn(
      "transition-colors hover:text-[#C45C3E]",
      active && "font-semibold text-[#C45C3E]"
    );

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[#E8E0D4]/60 bg-[#F7F3ED]/85 backdrop-blur-md"
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C45C3E] font-serif text-lg font-bold text-white shadow-md transition-transform group-hover:scale-105">
            室
          </span>
          <div>
            <span className="font-serif text-xl font-bold text-[#1A1614]">
              호실고
            </span>
            <span className="ml-2 hidden text-xs text-[#5C534C] sm:inline">
              호실로 고르는 숙소
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#5C534C] md:flex">
          {NAV_ITEMS.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(isActive(item))}
              >
                {item.label}
              </Link>
            ) : (
              <HashLink
                key={item.href}
                href={item.href}
                className={linkClass(isActive(item))}
              >
                {item.label}
              </HashLink>
            )
          )}
        </nav>

        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, x: 12 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.45 }}
        >
          {user ? (
            <>
              <span className="hidden max-w-[120px] truncate text-sm font-medium text-[#1A1614] sm:inline">
                {user.name}님
              </span>
              <LogoutButton className="hidden sm:inline" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-[#5C534C] transition-colors hover:text-[#C45C3E] sm:inline"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "default", variant: "outline" }),
                  "hidden rounded-xl border-[#E8E0D4] bg-[#FFFCF7] px-4 text-[#1A1614] hover:bg-[#F7F3ED] sm:inline-flex"
                )}
              >
                회원가입
              </Link>
            </>
          )}
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "default" }),
              "hidden rounded-xl bg-[#C45C3E] px-5 text-white shadow-md hover:bg-[#A84A32] sm:inline-flex"
            )}
          >
            방 등록하기
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E0D4] bg-[#FFFCF7] text-[#1A1614] md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-[#E8E0D4]/60 bg-[#FFFCF7] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.type === "route" ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C534C] hover:bg-[#F7F3ED] hover:text-[#C45C3E]",
                      isActive(item) && "bg-[#F7F3ED] font-semibold text-[#C45C3E]"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <HashLink
                    href={item.href}
                    onNavigate={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C534C] hover:bg-[#F7F3ED] hover:text-[#C45C3E]"
                  >
                    {item.label}
                  </HashLink>
                )}
              </li>
            ))}
            <li className="mt-2 border-t border-[#E8E0D4] pt-2 space-y-1">
              {user ? (
                <>
                  <p className="px-3 py-2 text-sm font-semibold text-[#1A1614]">
                    {user.name}님
                  </p>
                  <div className="px-3 py-2">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C534C] hover:bg-[#F7F3ED] hover:text-[#C45C3E]"
                    onClick={() => setMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C534C] hover:bg-[#F7F3ED] hover:text-[#C45C3E]"
                    onClick={() => setMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "flex w-full justify-center rounded-xl bg-[#C45C3E] text-white hover:bg-[#A84A32]"
                )}
                onClick={() => setMenuOpen(false)}
              >
                방 등록하기
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </motion.header>
  );
}
