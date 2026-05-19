"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ROOMS } from "@/lib/data";

const FAN_ROOMS = ROOMS.slice(0, 3);

export function RoomFan({ ready }: { ready: boolean }) {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[480px] lg:max-w-none">
      {FAN_ROOMS.map((room, i) => {
        const rotations = [-12, 0, 12];
        const xOffsets = [-90, 0, 90];
        const yOffsets = [20, 0, 20];
        const zIndex = i === 1 ? 30 : 20 - Math.abs(i - 1);

        return (
          <motion.article
            key={room.id}
            className="absolute w-[200px] overflow-hidden rounded-2xl border border-[#E8E0D4] bg-[#FFFCF7] shadow-xl md:w-[220px]"
            style={{ zIndex }}
            initial={{
              opacity: 0,
              scale: 0.6,
              rotate: 0,
              x: 0,
              y: 80,
            }}
            animate={
              ready
                ? {
                    opacity: 1,
                    scale: 1,
                    rotate: rotations[i],
                    x: xOffsets[i],
                    y: yOffsets[i],
                  }
                : {}
            }
            transition={{
              delay: 0.5 + i * 0.12,
              duration: 0.9,
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
            whileHover={{
              scale: 1.05,
              rotate: rotations[i] * 0.5,
              y: yOffsets[i] - 12,
              zIndex: 40,
              transition: { duration: 0.25 },
            }}
          >
            <motion.div
              className="relative aspect-[4/3] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={room.image}
                alt={`${room.gosiwon} ${room.roomNumber}`}
                fill
                className="object-cover"
                sizes="220px"
                priority={i === 1}
              />
              {room.moveIn === "today" && (
                <span className="absolute left-2 top-2 rounded-full bg-[#2D6A4F] px-2.5 py-0.5 text-xs font-semibold text-white">
                  오늘 입실
                </span>
              )}
              {room.noDeposit && (
                <span className="absolute right-2 top-2 rounded-full bg-[#C45C3E] px-2.5 py-0.5 text-xs font-semibold text-white">
                  보증금 없음
                </span>
              )}
            </motion.div>
            <motion.div
              className="p-3"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <p className="text-xs text-[#5C534C]">{room.gosiwon}</p>
              <p className="font-serif text-lg font-bold text-[#1A1614]">
                {room.roomNumber}
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#C45C3E]">
                월 {(room.price / 10000).toFixed(0)}만
              </p>
            </motion.div>
          </motion.article>
        );
      })}

      {/* Glow ring */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border border-[#D4A24C]/20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={ready ? { scale: 1.1, opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </div>
  );
}
