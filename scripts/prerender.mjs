// Injects the server-rendered English page into dist/index.html so text paints before JS runs.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const file = resolve('dist/index.html')
let html = readFileSync(file, 'utf8').replace('<div id="root"></div>', `<div id="root">${render()}</div>`)

// Inline the (small) stylesheet to save a render-blocking round trip.
html = html.replace(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/, (_, href) =>
  `<style>${readFileSync(resolve('dist' + href), 'utf8')}</style>`)
writeFileSync(file, html)
rmSync('dist-ssr', { recursive: true, force: true })
console.log('prerendered dist/index.html')
