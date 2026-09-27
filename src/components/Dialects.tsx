import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { DIALECTS } from '../content'
import { reducedMotion, visibleLoop } from '../motion'

type Star = { dx: number; dy: number; s: number; p: number }

// Narrow canvases get a taller layout so labels never collide.
const NARROW: Record<string, [number, number]> = { msa: [.5, .13], lev: [.74, .34], glf: [.7, .72], egy: [.3, .7], mag: [.24, .36] }
const at = (k: { id: string; x: number; y: number }, narrow: boolean): [number, number] => narrow ? NARROW[k.id] : [k.x, k.y]

export default function Dialects() {
  const { t, lang } = useLang()
  const [cur, setCur] = useState('lev')
  const curRef = useRef(cur)
  curRef.current = cur
  const wrap = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const redraw = useRef<() => void>(() => {})
  const d = DIALECTS.find(x => x.id === cur)!

  useEffect(() => {
    const c = cv.current!, box = wrap.current!, g = c.getContext('2d')!
    let W = 0, H = 0, dpr = 1, hover: string | null = null
    let bg: { x: number; y: number; a: number; s: number }[] = []
    let clusters: { id: string; en: string; ar: string; x: number; y: number; pts: Star[] }[] = []
    const pm = { x: 0, y: 0 }

    const build = () => {
      const r = c.getBoundingClientRect()
      dpr = Math.min(devicePixelRatio, 2)
      W = c.width = Math.round(r.width * dpr); H = c.height = Math.round(r.height * dpr)
      bg = Array.from({ length: 240 }, () => ({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * .6, s: Math.random() * 1.4 * dpr }))
      const spread = Math.min(W, H * 1.4) * .06
      clusters = DIALECTS.map(k => ({ ...k, pts: Array.from({ length: 80 }, () => {
        const a = Math.random() * 6.28, rr = Math.pow(Math.random(), .7) * spread
        return { dx: Math.cos(a) * rr, dy: Math.sin(a) * rr, s: (Math.random() * 2 + .6) * dpr, p: Math.random() * 6 }
      }) }))
      redraw.current()
    }

    const frame = (time: number) => {
      const cur = curRef.current
      g.clearRect(0, 0, W, H)
      for (const s of bg) { g.fillStyle = `rgba(255,255,255,${s.a * (.6 + .4 * Math.sin(time + s.x))})`; g.fillRect(s.x + pm.x * 6 * dpr, s.y + pm.y * 6 * dpr, s.s, s.s) }
      const hub = { x: W * .5 + pm.x * 14 * dpr, y: H * .42 + pm.y * 14 * dpr }
      const narrow = W / dpr < 520
      for (const o of clusters) {
        const [ox, oy] = at(o, narrow)
        const cx = ox * W + pm.x * 22 * dpr, cy = oy * H + pm.y * 22 * dpr, on = o.id === cur, hv = o.id === hover
        g.lineWidth = dpr
        for (let k = 0; k < 5; k++) {
          g.strokeStyle = `rgba(255,106,61,${on ? .5 : .14})`
          g.beginPath(); g.moveTo(hub.x, hub.y); g.lineTo(cx + o.pts[k].dx * .6, cy + o.pts[k].dy * .6); g.stroke()
        }
        for (const p of o.pts) {
          const a = (on || hv ? .9 : .5) * (.5 + .5 * Math.sin(time * 1.5 + p.p))
          g.fillStyle = on ? `rgba(255,${140 + p.p * 15 | 0},90,${a})` : `rgba(190,198,255,${a})`
          g.beginPath(); g.arc(cx + p.dx, cy + p.dy, p.s * (hv ? 1.3 : 1), 0, 7); g.fill()
        }
        g.strokeStyle = on ? '#FF6A3D' : 'rgba(190,198,255,.6)'
        g.beginPath(); g.arc(cx, cy, (on ? 16 : 11) * dpr, 0, 7); g.stroke()
        // Labels flip to the left of clusters near the right edge so they never clip.
        const right = ox > .65
        g.textAlign = right ? 'right' : 'left'
        const lx = cx + (right ? -22 : 22) * dpr
        g.fillStyle = on ? '#FF6A3D' : '#cfd6ea'
        g.font = `${(narrow ? 10 : 11) * dpr}px "Geist Mono", monospace`
        g.fillText(o.en.toUpperCase(), lx, cy - 6 * dpr)
        g.font = `${(narrow ? 14 : 16) * dpr}px "IBM Plex Sans Arabic", sans-serif`
        g.fillText(o.ar, lx, cy + 14 * dpr)
      }
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.arc(hub.x, hub.y, 22 * dpr, 0, 7); g.stroke()
      g.fillStyle = '#fff'; g.beginPath(); g.arc(hub.x, hub.y, 3 * dpr, 0, 7); g.fill()
    }

    const pick = (e: PointerEvent) => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      let best: string | null = null, bd = .1
      const narrow = r.width < 520
      if (narrow) bd = .14
      for (const k of DIALECTS) { const [kx, ky] = at(k, narrow); const dd = Math.hypot(kx - x, (ky - y) * r.height / r.width); if (dd < bd) { bd = dd; best = k.id } }
      return best
    }
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      pm.x = (e.clientX - r.left) / r.width - .5; pm.y = (e.clientY - r.top) / r.height - .5
      hover = pick(e)
      c.style.cursor = hover ? 'pointer' : 'default'
    }
    const leave = () => { hover = null }
    const click = (e: PointerEvent) => { const p = pick(e); if (p) setCur(p) }

    build()
    const ro = new ResizeObserver(build); ro.observe(box)
    c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave); c.addEventListener('pointerup', click)
    const still = reducedMotion()
    redraw.current = still ? () => frame(0) : () => {}
    const stop = still ? () => {} : visibleLoop(box, frame)
    document.fonts?.ready.then(() => frame(0))

    return () => {
      stop(); ro.disconnect()
      c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave); c.removeEventListener('pointerup', click)
    }
  }, [])

  // With reduced motion there is no loop, so repaint when the selection changes.
  useEffect(() => redraw.current(), [cur])

  return (
    <section id="dialects" aria-labelledby="d-h">
      <div className="eyebrow mono"><b>{t.dK}</b><span>{t.dS}</span></div>
      <h2 id="d-h">{t.dH}</h2>
      <div className="constel">
        <div className="map rv" ref={wrap}>
          <canvas ref={cv} role="img" aria-label={t.starsLabel} />
          <div className="hint" aria-hidden="true">{t.hint}</div>
        </div>
        <div className="dpanel rv">
          <div className="dchips" role="group" aria-label={t.chooseDialect}>
            {DIALECTS.map(k => (
              <button key={k.id} aria-pressed={k.id === cur} onClick={() => setCur(k.id)}>{lang === 'ar' ? k.ar : k.en}</button>
            ))}
          </div>
          <div className="dname" aria-live="polite">
            {lang === 'ar' ? d.ar : d.en}{lang === 'en' && <span lang="ar">{d.ar}</span>}
          </div>
          <dl className="dtable">
            {d.words.map((w, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <dt>{t.rowKeys[i]}</dt>
                <dd lang="ar">{w}</dd>
              </div>
            ))}
          </dl>
          <p className="dnote">{d.note[lang]}</p>
        </div>
      </div>
    </section>
  )
}
