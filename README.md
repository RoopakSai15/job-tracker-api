# Job Tracker API

A Dockerized backend API for tracking job applications with authentication.

## Features
- User authentication (JWT)
- Job CRUD operations
- PostgreSQL + Sequelize
- Database migrations
- Dockerized setup

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Sequelize
- Docker

## Setup (Local)
```bash
docker compose up -d --build
docker compose exec api npx sequelize-cli db:migrate
```

## API Overview

POST /auth/register
POST /auth/login
GET /jobs
POST /jobs

## Notes
Refresh tokens and RBAC are implemented but not yet finalized.

Tests exist but are currently disabled in deployment.
