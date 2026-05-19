import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { ROOMS } from "@/lib/data";
import { roomsTable } from "./schema";

const DB_PATH = path.join(process.cwd(), "data", "hosilgo.db");

let sqlite: Database.Database | null = null;
let db: ReturnType<typeof drizzle> | null = null;
let initialized = false;

function getSqlite() {
  if (!sqlite) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    sqlite = new Database(DB_PATH);
    sqlite.pragma("journal_mode = WAL");
  }
  return sqlite;
}

function initSchema() {
  if (initialized) return;
  const client = getSqlite();
  client.exec(`
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

  const { count } = client
    .prepare("SELECT COUNT(*) as count FROM rooms")
    .get() as { count: number };

  if (count === 0) {
    const insert = client.prepare(`
      INSERT INTO rooms (
        id, gosiwon, room_number, district, station, price, deposit, size,
        window, bathroom, move_in, move_in_label, women_only, foreigner_friendly,
        no_deposit, image, tags, created_at
      ) VALUES (
        @id, @gosiwon, @roomNumber, @district, @station, @price, @deposit, @size,
        @window, @bathroom, @moveIn, @moveInLabel, @womenOnly, @foreignerFriendly,
        @noDeposit, @image, @tags, @createdAt
      )
    `);

    const now = new Date().toISOString();
    for (const room of ROOMS) {
      insert.run({
        id: room.id,
        gosiwon: room.gosiwon,
        roomNumber: room.roomNumber,
        district: room.district,
        station: room.station,
        price: room.price,
        deposit: room.deposit,
        size: room.size,
        window: room.window ? 1 : 0,
        bathroom: room.bathroom,
        moveIn: room.moveIn,
        moveInLabel: room.moveInLabel,
        womenOnly: room.womenOnly ? 1 : null,
        foreignerFriendly: room.foreignerFriendly ? 1 : null,
        noDeposit: room.noDeposit ? 1 : null,
        image: room.image,
        tags: JSON.stringify(room.tags),
        createdAt: now,
      });
    }
  }

  initialized = true;
}

export function getDb() {
  if (!db) {
    initSchema();
    db = drizzle(getSqlite(), { schema: { roomsTable } });
  }
  return db;
}

export function getDbPath() {
  return DB_PATH;
}
