# Setup Guide — How to run this portfolio on your computer

## Prerequisites (install these first)

1. **VS Code** — download from https://code.visualstudio.com/
2. **Node.js** — download from https://nodejs.org/ (get the LTS version)
3. **Bun** (optional, faster) — run in terminal:
   ```
   curl -fsSL https://bun.sh/install | bash
   ```
4. **Git** — download from https://git-scm.com/

---

## Step 1: Clone from GitHub

Open VS Code, open a terminal (Terminal > New Terminal), and run:

```bash
git clone https://github.com/rishabhpandey081/portfolio.git
cd portfolio
```

## Step 2: Install dependencies

```bash
bun install
```
(or if you don't have Bun: `npm install`)

## Step 3: Set up environment

```bash
cp .env.example .env
```

## Step 4: Create the database

```bash
bun run db:push
```
(or: `npx prisma db push`)

## Step 5: Start the dev server

```bash
bun run dev
```
(or: `npm run dev`)

Open http://localhost:3000 in your browser — your portfolio is live!

---

## How to edit your portfolio

All your content (name, projects, skills, etc.) is in ONE file:
```
src/lib/portfolio-data.ts
```
Edit that file, save, and the site updates automatically.

## Available commands

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Check code quality |
| `bun run db:push` | Update database schema |

---

## Deploy to Vercel (free, gets a public URL)

1. Push your code to GitHub (see above)
2. Go to https://vercel.com/new
3. Import your `portfolio` repository
4. Add environment variable: `DATABASE_URL` = `file:./db/custom.db`
5. Click **Deploy**
6. You get a live URL like `portfolio-rishabh.vercel.app`

---

## Project structure

```
portfolio/
├── prisma/schema.prisma      # Database schema
├── public/
│   ├── audio/intro.wav       # Voice intro audio
│   ├── images/               # Project thumbnails + avatar
│   └── files/                # Resume + CV PDFs
├── src/
│   ├── app/
│   │   ├── api/contact/      # Contact form API
│   │   ├── globals.css       # Colors & theme
│   │   ├── layout.tsx        # Page metadata
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── sections/         # Hero, About, Skills, etc.
│   │   ├── three/            # 3D scenes
│   │   ├── floating-nav.tsx  # Navigation bar
│   │   └── voice-player.tsx # Audio player
│   └── lib/
│       ├── db.ts             # Database client
│       └── portfolio-data.ts # ALL YOUR CONTENT — edit this!
├── package.json
└── README.md
```
