# Rishabh Pandey — Portfolio

A personal portfolio website built with Next.js 16, React Three Fiber (3D), TypeScript, Tailwind CSS 4, and Prisma.

## Features

- **Editorial layout** with a fixed masthead sidebar
- **Voice introduction** — AI-generated audio with a custom waveform player
- **Motion words** marquee (Problem Solving, Disciplined, Creative Thinking, ...)
- **Ambient layered background** with emerald glow
- **Contact form** with Prisma + SQLite persistence
- Dark / light theme toggle
- Fully responsive (mobile + desktop)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Fonts | Geist (sans) + Fraunces (serif display) |
| 3D | React Three Fiber + Drei + Postprocessing |
| Animation | Framer Motion |
| Database | Prisma ORM (SQLite) |
| Audio | z-ai-web-dev-sdk TTS |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rishabhpandey081/portfolio.git
cd portfolio

# 2. Install dependencies
bun install
# or: npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Create the database
bun run db:push
# or: npx prisma db push

# 5. Start the dev server
bun run dev
# or: npm run dev
```

Open `http://localhost:3000` in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |

## Project Structure

```
├── prisma/
│   └── schema.prisma        # Database schema
├── public/
│   ├── audio/               # Voice intro audio
│   └── images/              # Project thumbnails
├── src/
│   ├── app/
│   │   ├── api/contact/     # Contact form API
│   │   ├── globals.css      # Global styles + theme
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── sections/        # Hero, About, Skills, etc.
│   │   ├── ui/              # shadcn/ui components
│   │   ├── masthead.tsx     # Sidebar navigation
│   │   ├── voice-player.tsx # Audio player
│   │   └── ...
│   └── lib/
│       ├── db.ts            # Prisma client
│       └── portfolio-data.ts# All portfolio content
```

## Customization

All content (profile, projects, skills, timeline, certifications) lives in [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts). Edit that file to update your information.

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add the environment variable `DATABASE_URL` (use a PostgreSQL/MySQL connection string for production, or keep SQLite for a quick deploy)
5. Deploy

## License

MIT © Rishabh Pandey
