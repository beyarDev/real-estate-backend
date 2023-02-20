import { Pool } from "pg";
import dotenv from "dotenv";

const ENV: string = process.env.NODE_ENV || "development";

dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("no database config found");
}

export default new Pool(config);
