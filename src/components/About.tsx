import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { reducedMotion } from '../motion'
import VoiceSample from './VoiceSample'

// Drop a portrait at public/images/hamed-portrait.jpg and it replaces the placeholder automatically.
const PORTRAIT = '/images/hamed-portrait.jpg'

function Portrait() {
  const { t } = useLang()
  const [ok, setOk] = useState(true)
  return (
    <figure className="portrait rv" style={{ margin: 0 }}>
      {ok && <img src={PORTRAIT} alt={t.photoAlt} width={800} height={1000} loading="lazy" decoding="async" onError={() => setOk(false)} />}
      {!ok && (
        <div className="ph" role="img" aria-label={t.photoAlt}>
          <span className="plus" style={{ top: 16, left: 18 }} aria-hidden="true">+</span>
          <span className="plus" style={{ top: 16, right: 18 }} aria-hidden="true">+</span>
          <span className="plus" style={{ bottom: 16, right: 18 }} aria-hidden="true">+</span>
          <div className="mono-mark" aria-hidden="true">HA<span lang="ar">حامد</span></div>
          {/* TODO: replace with Hamed's photo (public/images/hamed-portrait.jpg) */}
          <span className="tag mono" aria-hidden="true">{t.photoTodo}</span>
        </div>
      )}
    </figure>
  )
}

export default function About() {
  const { t } = useLang()
  const ref = useRef<HTMLParagraphElement>(null)

  // Scroll-lit statement: words light up as the paragraph moves through the viewport.
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const words = el.querySelectorAll<HTMLSpanElement>('.w')
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)))
      const k = Math.round(p * words.length)
      words.forEach((w, i) => w.classList.toggle('on', i < k))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [t.statement])

  return (
    <section id="about" aria-labelledby="about-k">
      <div className="eyebrow mono"><b id="about-k">{t.aboutK}</b><span>{t.aboutS}</span></div>
      <div className="about-grid">
        <p className="statement" ref={ref}>
          {t.statement.split(' ').map((w, i) => <span key={i}><span className="w">{w}</span>{' '}</span>)}
        </p>
        <Portrait />
      </div>
      <div className="facts">
        {t.facts.map(f => (
          <div className="fact rv" key={f.n}><b>{f.n}</b><span>{f.l}</span></div>
        ))}
      </div>
      <VoiceSample />
    </section>
  )
}
