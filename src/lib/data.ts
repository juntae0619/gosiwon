export type Room = {
  id: string;
  gosiwon: string;
  roomNumber: string;
  district: string;
  station: string;
  price: number;
  deposit: number;
  size: string;
  window: boolean;
  bathroom: "private" | "shared";
  moveIn: "today" | "week" | "reservation";
  moveInLabel: string;
  womenOnly?: boolean;
  foreignerFriendly?: boolean;
  noDeposit?: boolean;
  image: string;
  tags: string[];
};

export const QUICK_FILTERS = [
  "서울",
  "경기",
  "대학가",
  "병원 근처",
  "즉시 입실",
  "외국인 가능",
  "여성 전용",
] as const;

export const REGIONS = [
  "홍대입구",
  "신도림",
  "연신내",
  "강북",
  "서울대입구",
  "영등포",
] as const;

/** 호실별 고정 시드 — picsum.photos CDN (Unsplash 404 이슈 대체) */
export function roomPhoto(id: string) {
  return `https://picsum.photos/seed/hosilgo-${id}/800/600`;
}

export const FEATURES = [
  {
    title: "호실 단위로 고르기",
    description:
      "같은 고시원 안에서도 301호와 303호는 완전히 다릅니다. 창문, 화장실, 월세를 호실별로 비교하세요.",
    icon: "door",
  },
  {
    title: "지금 입실 가능한 방",
    description:
      "오늘 입실, 이번 주 입실, 예약 가능 — 실제 공실 상태를 기준으로 필터링합니다.",
    icon: "calendar",
  },
  {
    title: "실사진 · 보증금 투명",
    description:
      "광고용 렌더가 아닌 현재 방 사진. 보증금 없음·개인 화장실 여부를 카드에서 바로 확인.",
    icon: "camera",
  },
  {
    title: "외국인·단기 환영",
    description:
      "단기 거주, 유학생, 출장자를 위한 다국어 안내와 외국인 가능 호실 표시.",
    icon: "globe",
  },
] as const;

export const ROOMS: Room[] = [
  {
    id: "a-301",
    gosiwon: "A고시원",
    roomNumber: "301호",
    district: "영등포",
    station: "신도림역 도보 8분",
    price: 550000,
    deposit: 0,
    size: "4.2평",
    window: true,
    bathroom: "private",
    moveIn: "today",
    moveInLabel: "오늘 입실 가능",
    noDeposit: true,
    foreignerFriendly: true,
    image: roomPhoto("a-301"),
    tags: ["창문", "개인화장실", "보증금 없음"],
  },
  {
    id: "a-302",
    gosiwon: "A고시원",
    roomNumber: "302호",
    district: "영등포",
    station: "신도림역 도보 8분",
    price: 380000,
    deposit: 300000,
    size: "3.1평",
    window: false,
    bathroom: "shared",
    moveIn: "week",
    moveInLabel: "6일 후 입실",
    image: roomPhoto("a-302"),
    tags: ["공용화장실", "가성비"],
  },
  {
    id: "a-303",
    gosiwon: "A고시원",
    roomNumber: "303호",
    district: "영등포",
    station: "신도림역 도보 8분",
    price: 480000,
    deposit: 500000,
    size: "3.8평",
    window: true,
    bathroom: "shared",
    moveIn: "reservation",
    moveInLabel: "예약 가능",
    womenOnly: true,
    image: roomPhoto("a-303"),
    tags: ["여성 전용", "개인 냉장고"],
  },
  {
    id: "b-201",
    gosiwon: "연신내 스테이",
    roomNumber: "201호",
    district: "은평",
    station: "연신내역 3분",
    price: 420000,
    deposit: 0,
    size: "3.5평",
    window: true,
    bathroom: "private",
    moveIn: "today",
    moveInLabel: "오늘 입실 가능",
    noDeposit: true,
    foreignerFriendly: true,
    image: roomPhoto("b-201"),
    tags: ["즉시입실", "외국인 가능"],
  },
  {
    id: "c-105",
    gosiwon: "홍대 라이브",
    roomNumber: "105호",
    district: "마포",
    station: "홍대입구역 5분",
    price: 620000,
    deposit: 1000000,
    size: "5.0평",
    window: true,
    bathroom: "private",
    moveIn: "week",
    moveInLabel: "이번 주 입실",
    foreignerFriendly: true,
    image: roomPhoto("c-105"),
    tags: ["대형", "개인화장실"],
  },
  {
    id: "d-402",
    gosiwon: "서울대입구 하우스",
    roomNumber: "402호",
    district: "관악",
    station: "서울대입구역 4분",
    price: 450000,
    deposit: 500000,
    size: "3.6평",
    window: false,
    bathroom: "shared",
    moveIn: "today",
    moveInLabel: "오늘 입실 가능",
    image: roomPhoto("d-402"),
    tags: ["대학가", "조용한 층"],
  },
];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}
