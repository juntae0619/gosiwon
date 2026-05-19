"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Bath, Calendar, DoorOpen, Globe, Shield } from "lucide-react";
import type { Room } from "@/lib/data";
import { formatPrice } from "@/lib/data";

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={`/rooms/${room.id}`} className="group block">
        <div className="overflow-hidden rounded-[20px] border border-[#E8E0D4] bg-[#FFFCF7] shadow-[0_4px_24px_-8px_rgba(26,22,20,0.1)] transition-shadow group-hover:shadow-[0_12px_40px_-12px_rgba(196,92,62,0.2)]">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={room.image}
              alt={`${room.gosiwon} ${room.roomNumber}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <motion.div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {room.moveIn === "today" && (
                <Badge icon={<Calendar className="h-3 w-3" />} variant="sage">
                  {room.moveInLabel}
                </Badge>
              )}
              {room.noDeposit && (
                <Badge icon={<Shield className="h-3 w-3" />} variant="terra">
                  보증금 없음
                </Badge>
              )}
              {room.foreignerFriendly && (
                <Badge icon={<Globe className="h-3 w-3" />} variant="gold">
                  외국인 가능
                </Badge>
              )}
            </motion.div>
          </motion.div>

          <div className="p-4 md:p-5">
            <motion.div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-[#5C534C]">{room.gosiwon}</p>
                <h3 className="font-serif text-xl font-bold text-[#1A1614]">
                  {room.roomNumber}
                </h3>
                <p className="mt-0.5 text-xs text-[#5C534C]">{room.station}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#C45C3E]">
                  {formatPrice(room.price)}원
                </p>
                <p className="text-xs text-[#5C534C]">/ 월</p>
              </div>
            </motion.div>

            <motion.div className="mt-3 flex flex-wrap gap-2">
              <Chip icon={<DoorOpen className="h-3.5 w-3.5" />}>
                {room.window ? "창문 있음" : "창문 없음"}
              </Chip>
              <Chip icon={<Bath className="h-3.5 w-3.5" />}>
                {room.bathroom === "private" ? "개인 화장실" : "공용 화장실"}
              </Chip>
              <Chip>{room.size}</Chip>
            </motion.div>

            {room.moveIn !== "today" && (
              <p className="mt-3 text-sm font-medium text-[#4A6B5D]">
                {room.moveInLabel}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Badge({
  children,
  icon,
  variant,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  variant: "sage" | "terra" | "gold";
}) {
  const colors = {
    sage: "bg-[#4A6B5D] text-white",
    terra: "bg-[#C45C3E] text-white",
    gold: "bg-[#D4A24C] text-[#1A1614]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${colors[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}

function Chip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-[#F7F3ED] px-2.5 py-1 text-xs text-[#5C534C]">
      {icon}
      {children}
    </span>
  );
}
