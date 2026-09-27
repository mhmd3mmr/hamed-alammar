import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { useLang } from '../i18n'
import { reducedMotion, visibleLoop } from '../motion'

type Fx = 'wave' | 'rings' | 'grid' | 'dots'

function draw(cv: HTMLCanvasElement, fx: Fx, t: number) {
  const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio, 2)
  if (cv.width !== Math.round(r.width * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d) }
  const g = cv.getContext('2d')!, W = cv.width, H = cv.height
  g.clearRect(0, 0, W, H)
  if (fx === 'wave') for (let i = 0; i < 90; i++) {
    const x = W * .45 + i * (W * .55 / 90), h = Math.abs(Math.sin(i * .28 + t) * Math.cos(i * .07 - t * .5)) * H * .35 + 4
    g.fillStyle = `rgba(154,164,255,${.25 + h / H})`; g.fillRect(x, H * .32 - h / 2, W * .004 + 1, h)
  }
  if (fx === 'rings') for (let i = 1; i < 14; i++) {
    g.strokeStyle = `rgba(154,164,255,${.5 - i * .03})`; g.beginPath(); g.arc(W * .82, H * .28, i * H * .035 + Math.sin(t + i) * 3, 0, 7); g.stroke()
  }
  if (fx === 'grid') for (let x = 0; x < 14; x++) for (let y = 0; y < 6; y++) {
    const v = (Math.sin(x * .9 + y * 1.7 + t * 1.5) + 1) / 2
    g.fillStyle = `rgba(${v > .8 ? '255,106,61' : '154,164,255'},${.1 + v * .5})`
    g.fillRect(W * .5 + x * W * .034, H * .08 + y * W * .034, W * .024, W * .024)
  }
  if (fx === 'dots') for (let i = 0; i < 220; i++) {
    const a = i * 2.4, rr = Math.sqrt(i) * H * .022
    g.fillStyle = `rgba(154,164,255,${.2 + .6 * ((Math.sin(t + i * .1) + 1) / 2)})`
    g.beginPath(); g.arc(W * .8 + Math.cos(a) * rr, H * .3 + Math.sin(a) * rr, 1.6 * d, 0, 7); g.fill()
  }
}

function Card({ fx, children }: { fx: Fx; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current || !cv.current) return
    const c = cv.current
    if (reducedMotion()) { draw(c, fx, 0); return }
    return visibleLoop(ref.current, t => draw(c, fx, t))
  }, [fx])

  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (reducedMotion() || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
  }

  return (
    <article className="proj rv" ref={ref} onPointerMove={tilt} onPointerLeave={e => { e.currentTarget.style.transform = '' }}>
      <canvas ref={cv} aria-hidden="true" />
      {children}
    </article>
  )
}

export default function Work() {
  const { t } = useLang()
  return (
    <section id="work" aria-labelledby="work-h">
      <div className="eyebrow mono"><b>{t.workK}</b><span>{t.workS}</span></div>
      <h2 id="work-h">{t.workH}</h2>
      <div className="work">
        {t.work.map(w => (
          <Card fx={w.fx as Fx} key={w.fx}>
            <div className="top"><span>{w.org}</span><span>{w.years}</span></div>
            <div>
              <h3>{w.h}</h3>
              {'sub' in w && w.sub && <p className="sub">{w.sub}</p>}
              <p className="desc">{w.p}</p>
              <div className="tags">{w.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
