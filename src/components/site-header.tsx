"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ ready }: { ready: boolean }) {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[#E8E0D4]/60 bg-[#F7F3ED]/85 backdrop-blur-md"
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.35 }}
      >
        <Link href="/" className="group flex items-center gap-2">
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
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#5C534C] md:flex">
          <Link href="/search" className="transition-colors hover:text-[#C45C3E]">
            방 찾기
          </Link>
          <a href="#features" className="transition-colors hover:text-[#C45C3E]">
            왜 호실고인가
          </a>
          <a href="#rooms" className="transition-colors hover:text-[#C45C3E]">
            추천 호실
          </a>
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.45 }}
        >
          <Link
            href="/search"
            className={cn(
              buttonVariants({ size: "default" }),
              "rounded-xl bg-[#C45C3E] px-5 text-white shadow-md hover:bg-[#A84A32]"
            )}
          >
            방 등록하기
          </Link>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
