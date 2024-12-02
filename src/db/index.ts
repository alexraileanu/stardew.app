import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import * as schema from "./schema";

export const connection = createPool({
  uri: process.env.DATABASE_URL!,
  queueLimit: 0,
  connectionLimit: 10,
  // Keep alive packets should be sent
  enableKeepAlive: true,
  // We should start sending them early
  keepAliveInitialDelay: 3 * 1000, // 3 seconds
  // We don't want idle connections, but it's not mandatory for the fix to work, it seems
  maxIdle: 0,
  // Idle timeout much larger than keep alive delay and much smaller than MySQL's timeout setting
  idleTimeout: 5 * 60 * 1000 // 5 minutes
});

export const db = drizzle(connection, { schema, mode: "default" });
