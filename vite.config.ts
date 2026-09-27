import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Public site URL for canonical/Open Graph tags. Edit site.config.json (or set VITE_SITE_URL) to change it.
const site = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8')) as { url: string }
process.env.VITE_SITE_URL ||= site.url.replace(/\/$/, '')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', chunkSizeWarningLimit: 600 },
})
