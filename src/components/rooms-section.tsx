"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoomCard } from "@/components/room-card";
import { ROOMS } from "@/lib/data";

export function RoomsSection() {
  const todayRooms = ROOMS.filter((r) => r.moveIn === "today");
  const noDeposit = ROOMS.filter((r) => r.noDeposit);

  return (
    <section id="rooms" className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#4A6B5D]">추천 매물</p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-[#1A1614] md:text-4xl">
              오늘 입실 가능한 호실
            </h2>
          </div>
          <Link
            href="/search?filter=today"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl border-[#E8E0D4] bg-transparent hover:border-[#C45C3E] hover:text-[#C45C3E]"
            )}
          >
            전체 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todayRooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-2xl font-bold text-[#1A1614]">
            보증금 없는 방
          </h3>
          <p className="mt-1 text-sm text-[#5C534C]">
            초기 비용 부담을 줄이고 싶을 때
          </p>
          <motion.div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noDeposit.map((room, i) => (
              <RoomCard key={`nd-${room.id}`} room={room} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
