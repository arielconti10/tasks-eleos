import { type Config } from "drizzle-kit";
import "better-sqlite3";

export default {
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
  tablesFilter: ["tasksapp_*"],
} satisfies Config;
