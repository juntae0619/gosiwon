# 호실고 (Hosilgo) — Design System

> 고시원을 건물이 아닌 **호실**로 비교·예약하는 숙소 플랫폼. Airbnb의 발견감 + 고시원의 실용성 + 단기·외국인 수요에 맞춘 신뢰 중심 UI.

**Theme:** light (warm linen canvas)

## 1. Visual Theme & Atmosphere

호실고의 화면은 **작지만 따뜻한 방**을 연상시키는 린넨 톤 캔버스 위에, 실제 호실 사진과 가격이 주인공이 되는 구조입니다. 차가운 테크 블루나 보라 그라데이션 대신, **테라코타(행동)** 와 **세이지(신뢰·가용)** 를 포인트로 씁니다. 모서리는 12–20px로 부드럽고, 카드에는 얇은 웜 섀도우만 사용합니다.

**Key Characteristics:**
- 린넨 배경 `#F7F3ED` — 병원·관공서 느낌의 차가운 흰색 회피
- 호실 단위 카드 — 건물명보다 호실 번호·창문·화장실·입실일이 먼저
- 즉시 입실·보증금 없음·외국인 가능 배지를 시각적으로 강조
- Noto Serif KR(헤드라인) + Gothic A1(본문) — 한글 가독성 + 편집형 톤
- 첫 방문: 문 열림 인트로 → 호실 카드 부채 펼침 애니메이션

## 2. Color Palette

| Name | Value | Role |
|------|-------|------|
| Linen Canvas | `#F7F3ED` | 페이지 배경 |
| Warm White | `#FFFCF7` | 카드, 입력 필드 |
| Ink | `#1A1614` | 제목, 본문 |
| Muted Ink | `#5C534C` | 보조 텍스트 |
| Sand Border | `#E8E0D4` | 구분선, 입력 테두리 |
| Terracotta | `#C45C3E` | Primary CTA, 브랜드 액센트 |
| Terracotta Hover | `#A84A32` | CTA 호버 |
| Sage Trust | `#4A6B5D` | 신뢰 배지, 즉시입실 |
| Available | `#2D6A4F` | 입실 가능 상태 |
| Gold Highlight | `#D4A24C` | 추천·프리미엄 |

## 3. Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Display Hero | Noto Serif KR | 48–64px | 700 |
| Section Title | Noto Serif KR | 28–36px | 600 |
| Body | Gothic A1 | 15–16px | 400 |
| UI Label / Badge | Gothic A1 | 12–13px | 500–600 |
| Price | Gothic A1 | 20–24px | 700 |

## 4. Components

### Primary Button
- Background: Terracotta `#C45C3E`, text white
- Radius: 14px, padding 12px 24px

### Room Card
- Background: Warm White, border 1px Sand, radius 20px
- Top: 4:3 room photo, badges overlay (즉시입실, 보증금없음)
- Body: 호실명, 월세, 옵션 칩

### Search Bar (Hero)
- Large pill, white fill, soft shadow
- Placeholder: "지역·역·학교를 입력하세요"

### Filter Chips
- Outline sand, active: sage fill + white text

## 5. Layout

- Max width: 1200px
- Section gap: 64–96px
- Grid: 1 col mobile → 2 tablet → 3 desktop for room cards
- Map + list split on search results (future)

## 6. Motion

- **Intro (first visit):** 1.2s door-split reveal, room cards fan from center (stagger 80ms)
- **Hover:** card lift 4px, subtle scale 1.02
- **Scroll:** fade-up for sections (once)
- prefers-reduced-motion: skip intro, instant layout

## 7. Screens (MVP from PRD)

1. **메인** — 검색, 빠른 필터, 추천 호실, 차별점
2. **검색 결과** — 지도+리스트, 필터 (stub)
3. **상세** — 사진, 가격, 옵션, 문의/예약 CTA (stub)
4. **예약** — 입실일, 연락처 (stub)

## 8. Do's and Don'ts

### Do
- 호실 단위 정보를 건물명보다 크게
- 실제 입실 가능·보증금·창문/화장실을 배지로 즉시 전달
- 외국인·단기 입실 필터를 눈에 띄게

### Don't
- 건물만 크게 보여주는 호텔 OTA 레이아웃
- 차가운 그레이+보라 그라데이션
- 과도한 글래스모피즘
