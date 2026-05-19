# 호실고 (Hosilgo)

고시원·원룸텔을 **호실 단위**로 비교·예약하는 웹 MVP입니다.  
기획 문서 `고시원판 숙소 예약.docx`와 `DESIGN.md`를 바탕으로 구현했습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 주요 화면

| 경로 | 설명 |
|------|------|
| `/` | 메인 — 인트로 애니메이션, 검색, 추천 호실 |
| `/search` | 검색 결과 (쿼리·필터) |
| `/rooms/[id]` | 호실 상세 — 문의/방문/입실 예약 CTA |

## 첫 방문 인터랙션

- **문 열림 인트로**: 좌우 도어가 열리며 브랜드 로고 표시 (세션당 1회)
- **호실 카드 부채**: 히어로 우측에서 3장의 호실 카드가 펼쳐지며 등장
- `prefers-reduced-motion` 이면 인트로 생략

브랜드명 **호실고**는 「호실」+「고르다」에서 따온 이름으로, 서비스 핵심(호실 단위 선택)을 직관적으로 전달합니다.

## 데이터베이스

| 환경 | 동작 |
|------|------|
| **로컬** | `data/hosilgo.db` (libSQL 파일) |
| **Vercel** | 샘플 6개 호실로 방 찾기·상세 조회 (에러 없음) |
| **Vercel + Turso** | `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` 설정 시 등록·저장 가능 |

Vercel은 서버리스라 파일 SQLite(`better-sqlite3`)를 쓸 수 없어 **libSQL** + 배포 시 **시드 폴백**을 사용합니다.

## 스택

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · libSQL
