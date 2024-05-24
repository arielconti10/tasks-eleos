import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("task", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  description: text("description", { length: 256 }),
  createdAt: text("time").default(sql`CURRENT_TIME`),
});

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}
