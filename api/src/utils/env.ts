export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PORT: process.env.API_PORT || '4000',
  API_JWT_SECRET: process.env.API_JWT_SECRET || 'dev_jwt_secret_change_me',
  WEB_APP_ORIGIN: process.env.WEB_APP_ORIGIN || 'http://localhost:5173',
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  POSTGRES_USER: process.env.POSTGRES_USER || 'lawbot',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'lawbot',
  POSTGRES_DB: process.env.POSTGRES_DB || 'lawbot',
};
