# Law-bot Mini

Chat privado con documentos para equipos muy pequeños.

Este repositorio está organizado como un monorepo con:
- `api/`: API en TypeScript (Express + Kysely) sobre Postgres
- `flyway/`: Migraciones de base de datos
- `web-front-end/`: Frontend en Vite + React + TypeScript
- `docker-compose.yml`: Orquestación local (Postgres, Flyway, API, Web)


## Requisitos

- Docker y Docker Compose
- (Opcional para desarrollo local sin Docker) Node.js 20.x y pnpm/npm


## Variables de entorno

Copie `.env.example` a `.env` en la raíz si desea sobrescribir valores por defecto.
Valores por defecto ya están en `docker-compose.yml` y `.env.example`:

- Postgres: usuario `lawbot`, password `lawbot`, base `lawbot`
- API: puerto `4000`
- Web: puerto `5173`


## Quickstart (con Docker)

1) Arrancar todos los servicios

```bash
# Desde la raíz del repo
docker compose up -d
```

Esto levanta:
- `postgres` en `localhost:5432`
- `flyway` que aplica migraciones automáticamente
- `api` (Express) en `http://localhost:4000`
- `web` (Vite) en `http://localhost:5173`

2) Verificar salud de la API

```bash
curl http://localhost:4000/health
# {"status":"ok"}
```

3) Iniciar sesión en el frontend

- Abra `http://localhost:5173`
- Usuario seed: `admin@lawbot.local`
- Contraseña: `admin`

Nota: En el MVP, la ruta de login (`POST /auth/login`) valida el usuario y hace un chequeo de contraseña simplificado (acepta `admin` o `user`). La migración `V2__seed_admin_user.sql` inserta el usuario admin. Más adelante se integrará verificación con hash real.

4) Parar los servicios

```bash
docker compose down
```


## Desarrollo local (sin Docker)

Si prefieres correr cada servicio manualmente:

1) Base de datos Postgres

- Asegúrate de tener Postgres 15+ corriendo y una base creada `lawbot` con usuario `lawbot`/`lawbot`.
- Ajusta credenciales en variables de entorno si difieren.

2) Aplicar migraciones con Flyway

```bash
# Usando contenedor flyway
docker run --rm -v $(pwd)/flyway:/flyway --network host \
  -e FLYWAY_URL=jdbc:postgresql://localhost:5432/lawbot \
  -e FLYWAY_USER=lawbot -e FLYWAY_PASSWORD=lawbot \
  flyway/flyway:10 migrate
```

3) API

```bash
cd api
npm i
npm run dev
# API en http://localhost:4000
```

4) Web

```bash
cd web-front-end
npm i
npm run dev
# Web en http://localhost:5173
```


## Estructura de carpetas

```
.
├── api/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── routes/
│       │   ├── auth.ts
│       │   └── health.ts
│       └── utils/
│           ├── db.ts
│           └── env.ts
├── flyway/
│   ├── flyway.conf
│   └── migrations/
│       ├── V1__initial_schema.sql
│       └── V2__seed_admin_user.sql
├── web-front-end/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── auth/
│       │   └── AuthContext.tsx
│       ├── components/
│       │   └── ProtectedRoute.tsx
│       ├── lib/
│       │   └── api.ts
│       └── pages/
│           ├── Dashboard.tsx
│           └── Login.tsx
├── .env.example
└── docker-compose.yml
```


## Endpoints útiles (MVP)

- `GET /health` — comprobación de salud
- `POST /auth/login` — login con body JSON `{ email, password }`

Respuesta de login (ejemplo):
```json
{
  "token": "<jwt>",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@lawbot.local",
    "role": "admin"
  }
}
```


## Troubleshooting

- __Flyway no migra__: verifica que `postgres` esté saludable antes de que arranque `flyway`. Con Docker, `docker compose logs flyway`.
- __API no levanta__: revisa dependencias instaladas en `api/` (el contenedor ejecuta `npm ci || npm i`). Chequea `docker compose logs api`.
- __Web no compila__: revisa dependencias en `web-front-end/`. Chequea `docker compose logs web`.
- __CORS__: la API permite origen `WEB_APP_ORIGIN` (por defecto `http://localhost:5173`). Ajusta variable si accedes desde otro host/puerto.


## Roadmap del MVP

Ver los documentos de producto en el README original del proyecto (secciones: `FEATURES.md`, `USER_STORIES.md`, `ACCEPTANCE_CRITERIA.md`, etc.). Este repo implementa la base técnica para empezar a iterar.
