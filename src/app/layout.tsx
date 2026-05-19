import type { Metadata } from "next";
import { Noto_Serif_KR, Gothic_A1 } from "next/font/google";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const gothicA1 = Gothic_A1({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "호실고 — 호실로 고르는 고시원 예약",
  description:
    "고시원을 건물이 아닌 호실 단위로 비교·예약. 즉시 입실, 보증금 없음, 외국인 가능 필터.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${gothicA1.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
