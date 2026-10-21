# Jumma — portfolio

Personal portfolio of Muhamad Akmal Adha. Next.js 16, Tailwind CSS 4, Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Edit content

All text lives in [src/data/profile.ts](src/data/profile.ts): experience, company case studies, projects, skills, education.
Project screenshots are in `public/projects/<project>/`, and the resume PDF is `public/Akmal-Adha-Resume.pdf`.

## Deploy

Push to GitHub, then import the repo at https://vercel.com/new (framework: Next.js, no settings needed).
Set the `SITE_URL` environment variable to the final URL (e.g. `https://jumma-dev.vercel.app`) so link previews use the right domain.
