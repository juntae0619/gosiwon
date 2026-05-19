"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="pb-24">
      <motion.div
        className="mx-auto max-w-6xl px-4 md:px-6"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#1A1614] px-8 py-16 text-center md:px-16 md:py-20">
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C45C3E]/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#4A6B5D]/40 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />

          <p className="relative text-sm tracking-widest text-[#D4A24C] uppercase">
            For owners & guests
          </p>
          <h2 className="relative mt-3 font-serif text-3xl font-bold text-[#FFFCF7] md:text-4xl">
            방문 예약부터 입실까지,
            <br />
            한 플랫폼에서
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-[#E8E0D4]/80">
            고시원 사업자는 호실별 사진·가격을 등록하고, 입주자는 비교 후
            문의·방문·입실 예약까지 진행합니다.
          </p>
          <motion.div
            className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-[#C45C3E] px-8 hover:bg-[#A84A32]"
              )}
            >
              방 찾아보기
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-xl border-[#E8E0D4]/30 bg-transparent text-[#FFFCF7] hover:bg-white/10 hover:text-white"
              )}
            >
              사업자 등록
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
