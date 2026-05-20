import { createClient, type Client } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import { ROOMS } from "@/lib/data";
import { businessesTable, roomsTable, usersTable } from "./schema";

type Db = LibSQLDatabase<{
  roomsTable: typeof roomsTable;
  businessesTable: typeof businessesTable;
  usersTable: typeof usersTable;
}>;

let client: Client | null = null;
let db: Db | null = null;
let ready: Promise<Db | null> | null = null;

/** Vercel 서버리스는 파일 SQLite 불가 → Turso URL 없으면 시드 데이터 폴백 */
export function isDatabaseEnabled(): boolean {
  if (process.env.TURSO_DATABASE_URL) return true;
  if (process.env.VERCEL === "1") return false;
  return true;
}

function createDbClient(): Client {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  if (tursoUrl) {
    return createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  const dbPath = path.join(process.cwd(), "data", "hosilgo.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  return createClient({ url: `file:${dbPath}` });
}

async function initDb(): Promise<Db | null> {
  if (!isDatabaseEnabled()) return null;

  client = createDbClient();
  const database = drizzle(client, {
    schema: { roomsTable, businessesTable, usersTable },
  });

  await database.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL
    )
  `);

  await database.run(sql`
    CREATE TABLE IF NOT EXISTS businesses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      district TEXT NOT NULL,
      address TEXT NOT NULL,
      station TEXT NOT NULL,
      total_rooms INTEGER,
      biz_number TEXT,
      description TEXT,
      foreigner_friendly INTEGER,
      women_only INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    )
  `);

  await database.run(sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      gosiwon TEXT NOT NULL,
      room_number TEXT NOT NULL,
      district TEXT NOT NULL,
      station TEXT NOT NULL,
      price INTEGER NOT NULL,
      deposit INTEGER NOT NULL DEFAULT 0,
      size TEXT NOT NULL,
      window INTEGER NOT NULL,
      bathroom TEXT NOT NULL,
      move_in TEXT NOT NULL,
      move_in_label TEXT NOT NULL,
      women_only INTEGER,
      foreigner_friendly INTEGER,
      no_deposit INTEGER,
      image TEXT NOT NULL,
      tags TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  const existing = await database.select().from(roomsTable).limit(1);
  if (existing.length === 0) {
    const now = new Date().toISOString();
    for (const room of ROOMS) {
      await database.insert(roomsTable).values({
        id: room.id,
        gosiwon: room.gosiwon,
        roomNumber: room.roomNumber,
        district: room.district,
        station: room.station,
        price: room.price,
        deposit: room.deposit,
        size: room.size,
        window: room.window,
        bathroom: room.bathroom,
        moveIn: room.moveIn,
        moveInLabel: room.moveInLabel,
        womenOnly: room.womenOnly ?? false,
        foreignerFriendly: room.foreignerFriendly ?? false,
        noDeposit: room.noDeposit ?? false,
        image: room.image,
        tags: JSON.stringify(room.tags),
        createdAt: now,
      });
    }
  }

  db = database;
  return database;
}

export async function ensureDb(): Promise<Db | null> {
  if (!isDatabaseEnabled()) return null;
  if (!ready) {
    ready = initDb().catch((error) => {
      ready = null;
      console.error("[db] init failed", error);
      throw error;
    });
  }
  return ready;
}

export function getDbPath(): string {
  if (process.env.TURSO_DATABASE_URL) return process.env.TURSO_DATABASE_URL;
  return path.join(process.cwd(), "data", "hosilgo.db");
}
