# Hamed Alammar · حامد العمار

Bilingual (English / Arabic) personal site for Hamed Alammar, Arabic Language Specialist.

Built with Vite, React, TypeScript, Tailwind, three.js (voice orb), GSAP + ScrollTrigger and Lenis (smooth scroll).
The page is prerendered to static HTML at build time, then hydrated.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck, build, prerender into dist/
npm run preview   # serve dist/
```

## Edit copy

All text lives in **`src/content.ts`**.

- `en` holds the English copy, `ar` holds the Arabic copy. Both have the same keys; TypeScript will complain if one is missing.
- Dialect examples (`DIALECTS`), the "Make it speak" captions (`CAPTIONS`), AI platforms (`PLATFORMS`) and the AI Lab sample (`LAB_TABS`) are at the bottom of the same file.
- House rules: only real facts, no em dashes or en dashes, and the AI Lab sample stays labeled "illustrative".
- Page title, description and share text are in `index.html` (the `<title>` and `og:` / `twitter:` tags).

## Swap the photo

All images live in **`public/images/`**.

1. Save a portrait as `public/images/hamed-portrait.jpg` (4:5 ratio, about 800 x 1000 px, under 200 KB).
2. Redeploy. The placeholder in the About section is replaced automatically.

To use a different filename, change `PORTRAIT` at the top of `src/components/About.tsx`.

The social share image is `public/images/og.png` (1200 x 630). Replace it with the same name and size to change link previews.

## Add the voice sample

The player in the About section stays hidden until both files exist:

- `public/audio/sample.mp3`
- `public/audio/transcript.json` with word timings in seconds:

```json
{
  "words": [
    { "w": "مرحبا", "start": 0.00, "end": 0.42 },
    { "w": "أنا",   "start": 0.42, "end": 0.70 },
    { "w": "حامد",  "start": 0.70, "end": 1.20 }
  ]
}
```

Words light up as the audio plays. Timings can be exported from most transcription tools (WhisperX, Descript, Audacity labels) and converted to this shape.

## Deploy

Deployed on Vercel (framework preset: Vite, build command `npm run build`, output `dist`).

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```

If the site is connected to GitHub in Vercel, every push to `main` deploys automatically.

When the public URL changes (for example after adding a domain), update `VITE_SITE_URL` in `.env.production` so the canonical and Open Graph tags point to it, then redeploy.

## Connect a custom domain (for example hamedalammar.com)

1. Buy the domain at any registrar (Namecheap, GoDaddy, Cloudflare, and so on).
2. In Vercel: **Project → Settings → Domains → Add**, enter `hamedalammar.com`, and also add `www.hamedalammar.com` (set it to redirect to the apex).
3. At the registrar, add the DNS records Vercel shows. Usually:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`

   Or switch the domain's nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` and let Vercel manage DNS.
4. Wait for Vercel to show "Valid Configuration" (minutes to a few hours). HTTPS is issued automatically.
5. Set `VITE_SITE_URL=https://hamedalammar.com` in `.env.production` and redeploy.

## Project map

```
index.html                 meta tags, loader markup, theme/language bootstrap
src/content.ts             all copy (EN + AR) and data
src/components/            one file per section
src/orb.ts                 three.js particle voice orb (lazy loaded)
src/styles.css             design tokens, light/dark theme, layout
src/fonts.css              self-hosted fonts + layout-stable fallbacks
public/images/             photos, favicon, share image
public/audio/              voice sample (optional)
public/fonts/              font files
scripts/prerender.mjs      build-time prerender
```
