import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/data/blog.db'
  : path.join(__dirname, '../data/blog.db');

export const db = new Database(dbPath);

export function initDatabase() {
  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create posts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      author_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      published INTEGER DEFAULT 1,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
    CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);
  `);

  console.log('Database initialized successfully');
}

export default db;
