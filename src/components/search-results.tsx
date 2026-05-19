"use client";

import { useSearchParams } from "next/navigation";
import { RoomCard } from "@/components/room-card";
import { QUICK_FILTERS, type Room } from "@/lib/data";

export function SearchResults({ rooms }: { rooms: Room[] }) {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const filter = params.get("filter");

  let results = [...rooms];

  if (filter === "today") {
    results = results.filter((r) => r.moveIn === "today");
  }

  if (q) {
    results = results.filter(
      (r) =>
        r.district.toLowerCase().includes(q) ||
        r.station.toLowerCase().includes(q) ||
        r.gosiwon.toLowerCase().includes(q) ||
        r.roomNumber.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        QUICK_FILTERS.some(
          (f) => f.toLowerCase().includes(q) && r.tags.join(" ").includes(f)
        )
    );
  }

  return (
    <div className="mt-8">
      <p className="text-sm text-[#5C534C]">
        {q || filter ? (
          <>
            검색 조건: <strong className="text-[#1A1614]">{q || filter}</strong>
            {" · "}
          </>
        ) : null}
        {results.length}개 호실
      </p>

      {results.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-[#E8E0D4] bg-[#FFFCF7] p-12 text-center text-[#5C534C]">
          조건에 맞는 호실이 없습니다.{" "}
          <a href="/register" className="font-medium text-[#C45C3E] hover:underline">
            새 호실 등록
          </a>
          을 해보세요.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
