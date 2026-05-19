"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type RoomImageProps = {
  src: string;
  alt: string;
  roomNumber?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function RoomImage({
  src,
  alt,
  roomNumber,
  priority = false,
  sizes = "(max-width:768px) 100vw, 33vw",
  className,
}: RoomImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#E8E0D4] via-[#F7F3ED] to-[#E8E0D4]",
          className
        )}
        aria-label={alt}
      >
        <span className="font-serif text-5xl font-bold text-[#5C534C]/25">
          {roomNumber ?? "호실"}
        </span>
        <span className="mt-2 text-sm text-[#5C534C]/50">사진 준비 중</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
