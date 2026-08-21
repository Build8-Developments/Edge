# Project Overview: EDGE for Garments

EDGE for Garments is a modern, high-performance web application for an Egyptian garment manufacturing company specializing in premium denim and ready-made garments. The project is built with **Next.js 16 (App Router)** and **TypeScript**, featuring a bilingual interface (English and Arabic) and a robust backend integrated with **Supabase**.

## Core Technologies
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database/Auth:** [Supabase](https://supabase.com/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Fonts:** [Manrope](https://fonts.google.com/specimen/Manrope) (Latin), [Cairo](https://fonts.google.com/specimen/Cairo) (Arabic)

## Architecture & Directory Structure

### `/app` (App Router)
- **`/[locale]`**: Root of the localized application.
  - **`/admin`**: Admin dashboard for managing products, blog posts, and submissions. Protected by `middleware.ts` and a custom cookie-based auth.
  - **`/products`**: Product showcase with dynamic routing (`[slug]`).
  - **`/blog`**: Company blog with dynamic routing (`[slug]`).
  - **`/production-process`**: Detailed overview of manufacturing capabilities.
  - **`/components`**: Localized UI components.
  - **`/sections`**: Page-level sections (Hero, About, Services, etc.).
- **`/api`**: Backend routes for handling forms, authentication, and data operations (Supabase integration).
- **`/i18n`**: Internationalization logic, including dictionaries (`dictionaries.ts`) and configuration (`config.ts`).

### `/lib`
- **`supabase.ts`**: Supabase client initialization and shared TypeScript interfaces for database entities.
- **`supabase-schema.sql`**: SQL schema definition for the project's database tables.

### `/data`
- Contains fallback JSON files (`products.json`, `blog-posts.json`) and CSV exports for initial data seeding.

### `/public`
- Assets including logos (SVG and PNG), hero images, and uploaded files.

## Building and Running

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Development Conventions

### Internationalization (i18n)
- The project uses a custom dictionary-based i18n system.
- All text strings must be added to `app/i18n/dictionaries.ts` for both `en` and `ar` locales.
- Use the `getDictionary(locale)` helper to access translated content in Server Components.

### Database & State
- **Supabase** is the primary data source. 
- API routes in `app/api` typically attempt to fetch from Supabase and fall back to local JSON files in `/data` if the database is unreachable or empty.
- **Service Key:** Server-side operations use `SUPABASE_SERVICE_KEY` for full database access.

### Routing & Middleware
- `middleware.ts` handles locale detection, redirection, and basic admin authentication.
- Admin routes are protected; unauthorized users are redirected to `/[locale]/admin/login`.

### Styling
- Adheres to a professional, industrial aesthetic using Tailwind CSS 4.
- Custom fonts (Manrope and Cairo) are integrated via `next/font`.
- Supports RTL (Right-to-Left) layouts automatically based on the `dir` attribute set in `app/[locale]/layout.tsx`.

### Project Memory
- For private, project-specific notes that should not be committed to the repository, use the local memory directory: `C:\Users\seifa\.gemini\tmp\edge\memory\`.
- Index private notes in `C:\Users\seifa\.gemini\tmp\edge\memory\MEMORY.md`.
