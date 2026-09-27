# Hamed Alammar · حامد العمار

Bilingual (English / Arabic) personal site for Hamed Alammar, Arabic Language Specialist.

Static site built with Vite, React, TypeScript, Tailwind, three.js (voice orb), GSAP + ScrollTrigger and Lenis (smooth scroll).
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

## Deploy (Cloudflare Pages)

The site is fully static. `npm run build` writes everything to `dist/`, and Wrangler uploads it to the Cloudflare Pages project `hamed-alammar`.

```bash
npx wrangler login   # once per machine, approve in the browser
npm run deploy       # build + wrangler pages deploy dist --project-name hamed-alammar
```

Live at https://hamed-alammar.pages.dev

- `public/_headers` sets caching (hashed `/assets/*` cached for a year, HTML always revalidated, images and audio for a day) plus basic security headers.
- There is no `404.html`, so Pages serves `index.html` for any unknown path. Deep links such as `/about` or `/dialects` load the page and scroll to that section. `#section` anchors work as usual.
- When the public URL changes (for example after adding a domain), update `VITE_SITE_URL` in `.env.production` so the canonical and Open Graph tags, `robots.txt` and `sitemap.xml` point to it, then run `npm run deploy` again.

## Connect a custom domain (for example hamedalammar.com)

1. In the Cloudflare dashboard open **Workers & Pages → hamed-alammar → Custom domains → Set up a custom domain**.
2. Enter `hamedalammar.com` and continue.
   - If the domain already uses Cloudflare DNS (bought through Cloudflare Registrar, or its nameservers point to Cloudflare), Cloudflare adds the DNS record for you. Click **Activate domain**.
   - If the domain is at another registrar, either move its nameservers to Cloudflare (**Add a domain** in the dashboard shows the two nameservers to set at your registrar), or add the `CNAME` record Cloudflare shows (`hamedalammar.com` → `hamed-alammar.pages.dev`) at your DNS provider. Apex domains generally need Cloudflare nameservers.
3. Repeat for `www.hamedalammar.com` if you want it too, and add a redirect rule from `www` to the apex (**Rules → Redirect Rules**) so there is one canonical address.
4. Wait for the status to show **Active** (a few minutes up to a day). HTTPS is issued automatically.
5. Set `VITE_SITE_URL=https://hamedalammar.com` in `.env.production` and run `npm run deploy`.

## Project map

```
index.html                 meta tags, loader markup, theme/language bootstrap
src/content.ts             all copy (EN + AR) and data
src/components/            one file per section
src/orb.ts                 three.js particle voice orb (lazy loaded)
src/styles.css             design tokens, light/dark theme, layout
src/fonts.css              self-hosted fonts + layout-stable fallbacks
public/images/             photos, favicon, share image
public/_headers            Cloudflare Pages caching and security headers
public/audio/              voice sample (optional)
public/fonts/              font files
scripts/prerender.mjs      build-time prerender
```
