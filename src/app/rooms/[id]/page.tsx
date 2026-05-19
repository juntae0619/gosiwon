import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, Calendar, DoorOpen, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ROOMS, formatPrice } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ROOMS.map((r) => ({ id: r.id }));
}

export default async function RoomDetailPage({ params }: Props) {
  const { id } = await params;
  const room = ROOMS.find((r) => r.id === id);
  if (!room) notFound();

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <SiteHeader ready={true} />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <Link
          href="/search"
          className="text-sm text-[#5C534C] hover:text-[#C45C3E]"
        >
          ← 검색으로
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#E8E0D4] bg-[#FFFCF7] shadow-lg">
          <div className="relative aspect-[16/10]">
            <Image
              src={room.image}
              alt={`${room.gosiwon} ${room.roomNumber}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width:896px) 100vw, 896px"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm text-[#5C534C]">{room.gosiwon}</p>
            <h1 className="font-serif text-3xl font-bold text-[#1A1614]">
              {room.roomNumber}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-[#5C534C]">
              <MapPin className="h-4 w-4 text-[#C45C3E]" />
              {room.station} · {room.district}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-[#E8E0D4] pt-6">
              <div>
                <p className="text-2xl font-bold text-[#C45C3E]">
                  월 {formatPrice(room.price)}원
                </p>
                <p className="text-sm text-[#5C534C]">
                  보증금{" "}
                  {room.noDeposit
                    ? "없음"
                    : `${formatPrice(room.deposit)}원`}
                </p>
              </div>
              <p className="rounded-full bg-[#4A6B5D] px-4 py-1.5 text-sm font-semibold text-white">
                {room.moveInLabel}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Info icon={<DoorOpen />} label="창문" value={room.window ? "있음" : "없음"} />
              <Info
                icon={<Bath />}
                label="화장실"
                value={room.bathroom === "private" ? "개인" : "공용"}
              />
              <Info icon={<Calendar />} label="평수" value={room.size} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {room.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-[#F7F3ED] px-3 py-1 text-sm text-[#5C534C]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 rounded-xl bg-[#C45C3E] hover:bg-[#A84A32]"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                문의하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-xl border-[#E8E0D4]"
              >
                방문 예약
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-xl border-[#4A6B5D] text-[#4A6B5D]"
              >
                입실 예약
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E8E0D4] bg-[#F7F3ED] p-4">
      <div className="mb-2 text-[#C45C3E]">{icon}</div>
      <p className="text-xs text-[#5C534C]">{label}</p>
      <p className="font-semibold text-[#1A1614]">{value}</p>
    </div>
  );
}
