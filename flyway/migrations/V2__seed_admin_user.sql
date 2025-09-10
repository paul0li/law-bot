INSERT INTO auth.users (name, email, role, is_active, password_hash)
VALUES ('Administrador', 'admin@lawbot.local', 'admin', true, '$2b$10$placeholderhashforseed')
ON CONFLICT (email) DO NOTHING;
