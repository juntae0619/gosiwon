"use client";

import { motion } from "framer-motion";
import { Camera, Calendar, DoorOpen, Globe } from "lucide-react";
import { FEATURES } from "@/lib/data";

const ICONS = {
  door: DoorOpen,
  calendar: Calendar,
  camera: Camera,
  globe: Globe,
} as const;

export function FeaturesSection() {
  return (
    <section id="features" className="border-y border-[#E8E0D4]/60 bg-[#FFFCF7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold tracking-widest text-[#C45C3E] uppercase">
            Why Hosilgo
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1A1614] md:text-4xl">
            고시원 OTA가 아닌,
            <br />
            호실 선택 플랫폼
          </h2>
          <p className="mt-4 text-[#5C534C]">
            문서 기획의 핵심 — 건물 목록이 아니라 실제 살 방을 비교하고, 즉시
            입실·외국인 가능 여부까지 한눈에.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div
                key={f.title}
                className="group rounded-2xl border border-[#E8E0D4] bg-[#F7F3ED] p-6 transition-colors hover:border-[#C45C3E]/30 hover:bg-[#FFFCF7] md:p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C45C3E]/10 text-[#C45C3E] transition-colors group-hover:bg-[#C45C3E] group-hover:text-white"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-serif text-xl font-bold text-[#1A1614]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5C534C]">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
