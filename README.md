# S.S.Sohanpal — Graphic Designer Portfolio (MERN)

A full-stack, production-style portfolio site for a graphic designer, built with React (Vite + Tailwind + Framer Motion) on the frontend and Node/Express/MongoDB on the backend.

## Structure

```
portfolio/
├── client/   # React + Vite frontend
└── server/   # Express + MongoDB backend
```

## Getting started

### 1. Backend

```bash
cd server
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, Cloudinary keys, etc.
npm install
npm run seed            # creates categories, 8 projects, testimonials, and the admin account
npm run dev              # starts the API on http://localhost:5000
```

### 2. Frontend

```bash
cd client
cp .env.example .env    # set VITE_API_URL if different from http://localhost:5000/api
npm install
npm run dev              # starts the site on http://localhost:5173
```

### 3. Log in to the admin dashboard

Go to `http://localhost:5173/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD`
you set in `server/.env` before running `npm run seed`.

## What's implemented

- Public site: Home, About, Work (with category filter + search), Project case-study pages,
  Services, Contact (validated form posting to the API), 404 page, dark/light theme
  (persisted in localStorage), animated marquee, counters, testimonial slider, back-to-top.
- Admin dashboard (JWT-protected): stats overview, project CRUD with publish/unpublish,
  cover + gallery image upload via Cloudinary, gallery image delete, testimonial CRUD,
  contact message inbox (read/unread, delete).
- REST API: auth, projects, categories, testimonials, contact, dashboard stats — matching
  the routes in the brief, with validation, rate limiting, Helmet, CORS, and centralized
  error handling.
- MongoDB models for User, Project, Category, Testimonial, Contact, matching the brief's fields.
- Seed script with 8 realistic projects, 4 categories, 4 testimonials and one admin account
  (uses placeholder images from picsum.photos — swap these for real work before shipping).

## What you'll still want to do before shipping

- Replace the placeholder picsum.photos images with real project photography via the admin
  gallery upload (Cloudinary).
- Set real environment variables (MongoDB Atlas URI, a strong JWT secret, Cloudinary
  credentials) — never commit `.env` files.
- Deploy: frontend to Vercel, backend to Render/Railway, database to MongoDB Atlas, then
  point `VITE_API_URL` and `CLIENT_URL` at the deployed URLs.
- A few "nice to have" items from the brief were intentionally left as good next steps rather
  than built out fully, to keep the codebase readable: sitemap.xml generation, image
  reordering UI (the API endpoint exists — `PATCH /api/projects/:id/gallery/reorder`), and a
  branded loading screen on first paint.
