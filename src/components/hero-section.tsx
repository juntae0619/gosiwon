"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUICK_FILTERS, REGIONS } from "@/lib/data";
import { RoomFan } from "@/components/room-fan";

export function HeroSection({ ready }: { ready: boolean }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden pb-20 pt-8 md:pb-28 md:pt-12">
      {/* Ambient blobs */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#C45C3E]/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-[#4A6B5D]/15 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10, delay: 1 }}
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 md:px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8E0D4] bg-[#FFFCF7] px-4 py-1.5 text-sm text-[#4A6B5D] shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-4 w-4 text-[#D4A24C]" />
              건물이 아닌, 호실로 비교하세요
            </motion.div>

            <h1 className="font-serif text-4xl leading-[1.15] font-bold tracking-tight text-[#1A1614] md:text-5xl lg:text-[3.5rem]">
              고시원을
              <br />
              <span className="text-[#C45C3E]">방처럼</span> 고르다
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5C534C] md:text-lg">
              창문, 화장실, 입실일, 보증금까지 호실별로 투명하게.
              비교하고, 문의하고, 오늘 입실까지 — 호실고에서 한 번에.
            </p>

            {/* Search */}
            <motion.form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                const q = query || activeFilter || "";
                window.location.href = `/search?q=${encodeURIComponent(q)}`;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
            >
              <motion.div
                className="flex flex-col gap-3 rounded-2xl border border-[#E8E0D4] bg-[#FFFCF7] p-2 shadow-[0_8px_40px_-12px_rgba(26,22,20,0.15)] sm:flex-row sm:items-center"
                whileHover={{ boxShadow: "0 12px 48px -12px rgba(196,92,62,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex flex-1 items-center gap-3 px-3"
                  whileFocus={{ scale: 1.01 }}
                >
                  <MapPin className="h-5 w-5 shrink-0 text-[#C45C3E]" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="지역·역·학교를 입력하세요"
                    className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                  />
                </motion.div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-xl bg-[#C45C3E] px-8 text-base font-semibold hover:bg-[#A84A32] sm:h-11"
                >
                  <Search className="mr-2 h-4 w-4" />
                  방 찾기
                </Button>
              </motion.div>

              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                variants={{
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.7 } },
                }}
              >
                {QUICK_FILTERS.map((f) => (
                  <motion.button
                    key={f}
                    type="button"
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    onClick={() => {
                      setActiveFilter(f);
                      setQuery(f);
                    }}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${
                      activeFilter === f
                        ? "border-[#4A6B5D] bg-[#4A6B5D] text-white"
                        : "border-[#E8E0D4] bg-[#FFFCF7] text-[#5C534C] hover:border-[#C45C3E]/40 hover:text-[#C45C3E]"
                    }`}
                  >
                    {f}
                  </motion.button>
                ))}
              </motion.div>
            </motion.form>

            {/* Region pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[#5C534C]">
              <span className="font-medium">인기 지역</span>
              {REGIONS.map((r) => (
                <Link
                  key={r}
                  href={`/search?q=${encodeURIComponent(r)}`}
                  className="rounded-lg px-2 py-0.5 transition-colors hover:bg-[#E8E0D4]/50 hover:text-[#C45C3E]"
                >
                  {r}
                </Link>
              ))}
            </div>
          </motion.div>

          <RoomFan ready={ready} />
        </div>
      </motion.div>
    </section>
  );
}
