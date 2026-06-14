import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const waitingUsers = sqliteTable('waiting_users', {
  id: text('id').primaryKey(),
  joinedAt: integer('joined_at').notNull(),
  sessionId: text('session_id').notNull(),
}, (table) => ({
  sessionIdx: index('session_idx').on(table.sessionId),
}));

export const activeSessions = sqliteTable('active_sessions', {
  id: text('id').primaryKey(),
  user1Session: text('user1_session').notNull(),
  user2Session: text('user2_session').notNull(),
  startedAt: integer('started_at').notNull(),
}, (table) => ({
  user1Idx: index('user1_idx').on(table.user1Session),
  user2Idx: index('user2_idx').on(table.user2Session),
}));

// Note: We do NOT store chat messages in the database.
// Chats are ephemeral and handled in-memory via Socket.io.
// This keeps things private and automatic deletion is guaranteed.
