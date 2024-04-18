import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config();

// PostgreSQLへの接続設定
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "dev",
  port: 5432
});

export default pool;
