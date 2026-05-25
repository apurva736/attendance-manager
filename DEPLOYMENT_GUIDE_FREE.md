# Free Deployment Guide

This project can be deployed fully on free-tier services that are suitable for an engineering project demo or viva.

## Recommended Free Stack

- Frontend: `Vercel` Hobby plan
- Backend: `Render` Free Web Service
- Database: `Neon` Free Postgres
- Source control and CI/CD: `GitHub` + `GitHub Actions`

## Why This Combination

- `Vercel` is the simplest free option for a Vite + React frontend and gives automatic HTTPS, preview deployments, and a global CDN.
- `Render` supports Node.js + Express on a free web service with simple Git-based deployment.
- `Neon` is a strong free Postgres option and fits this codebase directly because the backend already uses the `pg` package and SQL schema files.

## Project Analysis Summary

### Frontend

- Path: `client/`
- Stack: React 18, Vite, Tailwind CSS, React Router, React Query, Zustand, Axios
- Build command: `npm run build`
- Production output: `client/dist`
- Environment variable:
  - `VITE_API_BASE_URL`

### Backend

- Path: `server/`
- Stack: Node.js, Express, PostgreSQL, JWT, bcryptjs, zod
- Start command: `npm start`
- Health endpoint: `/api/health`
- Environment variables:
  - `PORT`
  - `CLIENT_URL`
  - `CLIENT_URLS`
  - `DATABASE_URL`
  - `DATABASE_SSL`
  - `ALLOW_VERCEL_PREVIEWS`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`

### Database

- Type: PostgreSQL
- Schema file: `server/src/db/schema.sql`
- Bootstrap behavior: the backend automatically creates the schema and seeds demo users during startup

## Production Architecture

```mermaid
flowchart LR
    U["User Browser"] --> F["Vercel Frontend<br/>React + Vite"]
    F -->|HTTPS API calls| B["Render Backend<br/>Node.js + Express"]
    B -->|SQL over SSL| D["Neon Postgres"]
    G["GitHub Repository"] -->|push| F
    G -->|push| B
    G -->|CI| A["GitHub Actions"]
```

## Exact Deployment Order

1. Create a GitHub repository
2. Push this local project to GitHub
3. Create a free Neon Postgres database
4. Deploy the backend to Render
5. Deploy the frontend to Vercel
6. Update backend CORS with the real Vercel URL
7. Test login, signup, dashboard, attendance, alerts, and reports

## Step 1: Create GitHub Repository

Open [https://github.com/new](https://github.com/new)

Use these values:

- Repository name: `attendance-manager`
- Description: `College Attendance Management System`
- Visibility: `Public` or `Private`
- Do not initialize with README
- Do not add `.gitignore`
- Do not add license

Click `Create repository`.

## Step 2: Push Local Project to GitHub

Run these commands from the project root:

```powershell
cd "D:\Attendance manager"
git init
git branch -M main
git add .
git commit -m "Prepare project for free cloud deployment"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/attendance-manager.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username.

## Step 3: Create Free Neon Database

Open [https://console.neon.tech/](https://console.neon.tech/)

Click these buttons:

1. `Sign up`
2. `Create project`

Use these values:

- Project name: `attendance-manager-db`
- Postgres version: default
- Region: choose the closest region

After the project is created:

1. Open the project dashboard
2. Find `Connection Details`
3. Copy the `Connection string`

It will look similar to:

```text
postgresql://neondb_owner:password@ep-xxxxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

Keep this value safely. You will paste it into Render as `DATABASE_URL`.

## Step 4: Deploy Backend on Render

Open [https://dashboard.render.com/](https://dashboard.render.com/)

Click these buttons:

1. `New +`
2. `Web Service`
3. `Connect GitHub`
4. Select your `attendance-manager` repository

Use these values in the creation form:

- Name: `attendance-manager-api`
- Language: `Node`
- Branch: `main`
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free`

In `Environment Variables`, add:

- `NODE_VERSION` = `22.14.0`
- `PORT` = `10000`
- `DATABASE_URL` = paste your Neon connection string
- `DATABASE_SSL` = `true`
- `JWT_SECRET` = click `Generate` or paste a long random string
- `JWT_EXPIRES_IN` = `1d`
- `CLIENT_URL` = `https://attendance-manager-client.vercel.app`
- `CLIENT_URLS` = `https://attendance-manager-client.vercel.app,http://localhost:5173`
- `ALLOW_VERCEL_PREVIEWS` = `true`

Click `Create Web Service`.

### Expected Backend URL

Render will give a URL like:

```text
https://attendance-manager-api.onrender.com
```

### First Backend Test

After deployment finishes, open:

```text
https://attendance-manager-api.onrender.com/api/health
```

You should get a JSON success response.

## Step 5: Deploy Frontend on Vercel

Open [https://vercel.com/new](https://vercel.com/new)

Click these buttons:

1. `Import Git Repository`
2. Choose your `attendance-manager` repository
3. Click `Configure Project`

Use these values:

- Framework Preset: `Vite`
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Add this environment variable:

- `VITE_API_BASE_URL` = `https://attendance-manager-api.onrender.com/api`

Click `Deploy`.

### Expected Frontend URL

Vercel will give a URL like:

```text
https://attendance-manager-client.vercel.app
```

## Step 6: Update Backend CORS With Real Frontend URL

After Vercel shows the final deployed domain:

1. Open your Render backend service
2. Click `Environment`
3. Update:
   - `CLIENT_URL`
   - `CLIENT_URLS`

Example:

- `CLIENT_URL` = `https://attendance-manager-client.vercel.app`
- `CLIENT_URLS` = `https://attendance-manager-client.vercel.app,http://localhost:5173`

Click `Save, rebuild, and deploy`.

## Step 7: Test the Full Stack

Test these URLs and flows:

### Frontend

- `/`
- `/login`
- `/signup`
- dashboard routes after login

### Backend

- `/api/health`
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/me`
- `/api/dashboard/summary`
- `/api/attendance/overview`

### Demo Accounts

- `admin@college.edu` / `password123`
- `hod@college.edu` / `password123`
- `teacher@college.edu` / `password123`
- `student@college.edu` / `password123`

## Common Deployment Issues and Fixes

### CORS Error

Problem:

- Frontend can load, but login or dashboard API calls fail.

Fix:

- Check `CLIENT_URL`
- Check `CLIENT_URLS`
- Keep `ALLOW_VERCEL_PREVIEWS=true`
- Redeploy the backend

### Database Connection Failure

Problem:

- Render logs show Postgres connection errors.

Fix:

- Verify `DATABASE_URL`
- Verify `DATABASE_SSL=true`
- Ensure the Neon connection string includes `sslmode=require`

### Frontend Routing 404

Problem:

- Deep links like `/dashboard` fail on refresh.

Fix:

- `client/vercel.json` already adds a rewrite to `index.html`

### Render App Sleeps

Problem:

- First request is slow.

Fix:

- This is expected on Render free services
- For viva/demo, open the backend health URL once before starting your presentation

## Final Deliverables After Deployment

When you finish deployment, save these final URLs:

- Frontend live URL: `https://YOUR-FRONTEND.vercel.app`
- Backend live URL: `https://YOUR-BACKEND.onrender.com`
- Health URL: `https://YOUR-BACKEND.onrender.com/api/health`

## Simple Viva Explanation

You can explain the deployment like this:

`I deployed the React frontend on Vercel because it is optimized for static frontend builds and gives free HTTPS and CI/CD. I deployed the Node.js Express backend on Render because it supports free web services and easy Git-based deployment. I hosted PostgreSQL on Neon because the backend already uses Postgres and Neon gives a cloud connection string with SSL. Then I connected the frontend and backend using environment variables and enabled CORS for the Vercel frontend domain.`
