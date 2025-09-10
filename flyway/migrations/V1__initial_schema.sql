-- Schemas
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS docs;
CREATE SCHEMA IF NOT EXISTS chat;
CREATE SCHEMA IF NOT EXISTS audit;

-- Users
CREATE TABLE IF NOT EXISTS auth.users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin','user')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- Documents and versions
CREATE TABLE IF NOT EXISTS docs.documents (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'vigente' CHECK (status IN ('vigente','obsoleto')),
  current_version INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS docs.document_versions (
  id BIGSERIAL PRIMARY KEY,
  document_id BIGINT NOT NULL REFERENCES docs.documents(id) ON DELETE CASCADE,
  version INT NOT NULL,
  storage_key TEXT NOT NULL,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, version)
);

-- Assignments
CREATE TABLE IF NOT EXISTS docs.document_assignments (
  id BIGSERIAL PRIMARY KEY,
  document_id BIGINT NOT NULL REFERENCES docs.documents(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by BIGINT NOT NULL REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(document_id, user_id)
);

-- Conversations and messages
CREATE TABLE IF NOT EXISTS chat.conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id BIGINT NOT NULL REFERENCES docs.documents(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'abierta' CHECK (status IN ('abierta','cerrada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  summary TEXT
);

CREATE TABLE IF NOT EXISTS chat.messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES chat.conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('usuario','sistema','asistente')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit events
CREATE TABLE IF NOT EXISTS audit.events (
  id BIGSERIAL PRIMARY KEY,
  actor_id BIGINT REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id BIGINT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);
CREATE INDEX IF NOT EXISTS idx_docs_assignments_user ON docs.document_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conv_user ON chat.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conv_doc ON chat.conversations(document_id);
