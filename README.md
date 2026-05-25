# College Attendance Management System

Full-stack scaffold for a College Attendance Management System built with React.js, Vite, Tailwind CSS, Node.js, Express, PostgreSQL, React Query, Zustand, and JWT authentication.

## Roles

- `SUPER_ADMIN`
- `ADMIN`
- `HOD`
- `TEACHER`
- `STUDENT`

## Structure

- `client/` React frontend
- `server/` Express backend

## Quick Start

```bash
cd server && npm install
cd ../client && npm install
```

Copy env files:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm run dev
```

For a quick video demo on Windows, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-demo.ps1
```

There is also a ready recording flow in `VIDEO_DEMO_GUIDE.md`.

## Free Deployment

For a free full-stack deployment setup using Vercel + Render + Neon, see:

- `DEPLOYMENT_GUIDE_FREE.md`
- `DEPLOYMENT_VIVA_QA.md`

The backend now bootstraps the PostgreSQL schema and seeds these demo users on startup:

- `admin@college.edu` / `password123`
- `hod@college.edu` / `password123`
- `teacher@college.edu` / `password123`
- `student@college.edu` / `password123`
