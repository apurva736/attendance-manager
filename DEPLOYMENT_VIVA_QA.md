# Deployment Viva Questions and Answers

## Why did you choose Vercel for the frontend?

Vercel is a very good free hosting platform for React and Vite projects. It provides automatic builds, HTTPS, CDN delivery, preview deployments, and easy GitHub integration. For a student project, it is fast to set up and reliable for demos.

## Why did you choose Render for the backend?

Render supports Node.js and Express projects directly. It can deploy from GitHub, provides environment variable management, logs, HTTPS, and a public URL. Its free tier is good for engineering project demonstrations.

## Why did you choose Neon for the database?

This project already uses PostgreSQL with the `pg` library. Neon provides a free Postgres database with a cloud connection string and SSL support, so it matches the existing backend with minimal code changes.

## Why not host everything on one platform?

The frontend, backend, and database have different hosting needs. Vercel is best for static frontend delivery, Render is simpler for Express APIs, and Neon is specialized for Postgres. Using the right free tool for each layer gives better results.

## How does the frontend connect to the backend?

The frontend reads the backend base URL from `VITE_API_BASE_URL`. In production, this points to the Render backend URL ending with `/api`. All Axios requests go through that base URL.

## How does the backend connect to the database?

The backend uses the `pg` package and reads `DATABASE_URL` from environment variables. In production, the connection string comes from Neon. SSL is enabled using `DATABASE_SSL=true`.

## How did you handle CORS in production?

I updated the backend to support multiple allowed origins using `CLIENT_URL` and `CLIENT_URLS`. I also added an option to allow Vercel preview deployments using `ALLOW_VERCEL_PREVIEWS=true`.

## How is the database schema created in production?

This project does not rely on a separate migration tool yet. On server startup, it reads `server/src/db/schema.sql`, creates the required tables if needed, and seeds demo users automatically.

## What are the main production environment variables?

- `VITE_API_BASE_URL` for frontend API calls
- `DATABASE_URL` for Postgres connection
- `DATABASE_SSL` for hosted database SSL
- `JWT_SECRET` for token signing
- `CLIENT_URL` and `CLIENT_URLS` for CORS

## What CI/CD setup is used?

GitHub is the source repository. GitHub Actions runs a basic CI workflow to install dependencies and build the frontend. Vercel and Render are connected to the GitHub repository, so each push can trigger a new deployment automatically.

## What deployment problems can happen in this project?

Common problems include wrong API base URL, CORS mismatch, missing environment variables, invalid Postgres connection string, and slow cold starts on the backend free tier.

## How would you scale this project in the future?

I would move to paid always-on backend hosting, add proper migration tooling, split large frontend bundles, add Redis caching if needed, use object storage for exports, and add monitoring and structured logging.

## What are the limitations of the free deployment?

Render free services can sleep and become slow on the first request. Free plans also have usage limits and are not ideal for heavy production traffic. However, they are suitable for learning, demos, and viva presentations.

## If the examiner asks what your contribution was, what should you say?

I analyzed the full stack, prepared the codebase for production, added environment-based configuration, handled hosted Postgres SSL and CORS concerns, created deployment configs, documented the deployment flow, and validated the frontend production build and backend module loading.
