import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const roomsTable = sqliteTable("rooms", {
  id: text("id").primaryKey(),
  gosiwon: text("gosiwon").notNull(),
  roomNumber: text("room_number").notNull(),
  district: text("district").notNull(),
  station: text("station").notNull(),
  price: integer("price").notNull(),
  deposit: integer("deposit").notNull().default(0),
  size: text("size").notNull(),
  window: integer("window", { mode: "boolean" }).notNull(),
  bathroom: text("bathroom", { enum: ["private", "shared"] }).notNull(),
  moveIn: text("move_in", { enum: ["today", "week", "reservation"] }).notNull(),
  moveInLabel: text("move_in_label").notNull(),
  womenOnly: integer("women_only", { mode: "boolean" }),
  foreignerFriendly: integer("foreigner_friendly", { mode: "boolean" }),
  noDeposit: integer("no_deposit", { mode: "boolean" }),
  image: text("image").notNull(),
  tags: text("tags").notNull(),
  createdAt: text("created_at").notNull(),
});

export type RoomRow = typeof roomsTable.$inferSelect;
export type NewRoomRow = typeof roomsTable.$inferInsert;

export const businessesTable = sqliteTable("businesses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ownerName: text("owner_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  district: text("district").notNull(),
  address: text("address").notNull(),
  station: text("station").notNull(),
  totalRooms: integer("total_rooms"),
  bizNumber: text("biz_number"),
  description: text("description"),
  foreignerFriendly: integer("foreigner_friendly", { mode: "boolean" }),
  womenOnly: integer("women_only", { mode: "boolean" }),
  status: text("status", { enum: ["pending", "approved"] })
    .notNull()
    .default("pending"),
  createdAt: text("created_at").notNull(),
});

export type BusinessRow = typeof businessesTable.$inferSelect;

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  role: text("role", { enum: ["user", "owner"] }).notNull().default("user"),
  createdAt: text("created_at").notNull(),
});

export type UserRow = typeof usersTable.$inferSelect;
export type NewUserRow = typeof usersTable.$inferInsert;
