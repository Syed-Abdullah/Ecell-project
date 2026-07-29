import pkg from 'pg';
const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL || 'postgres://ecell_user:ecell_secret@db:5432/ecell_db';

export const pool = new Pool({
  connectionString: databaseUrl,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export const query = (text, params) => pool.query(text, params);
