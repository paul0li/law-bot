import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { env } from './env.js';

export interface DB {
  /** schema-qualified tables as defined by Flyway migrations */
  'auth.users': {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    is_active: boolean;
    password_hash: string;
    created_at: Date;
    last_login_at: Date | null;
  };
}

let db: Kysely<DB> | null = null;

export function createDb() {
  if (db) return db;
  const pool = new pg.Pool({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    max: 10,
  });
  db = new Kysely<DB>({
    dialect: new PostgresDialect({ pool }),
  });
  return db;
}

export function getDb() {
  if (!db) return createDb();
  return db;
}
