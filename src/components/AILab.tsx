import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../i18n'
import { LAB_TABS, PLATFORMS } from '../content'
import { reducedMotion } from '../motion'

const BARS = Array.from({ length: 96 }, (_, i) => 6 + Math.abs(Math.sin(i * .33) * Math.cos(i * .09)) * 60)

export default function AILab() {
  const { t } = useLang()
  const [tab, setTab] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const wave = useRef<HTMLDivElement>(null)

  // Playhead sweeping the waveform, only while it is on screen.
  useEffect(() => {
    const el = wave.current
    if (!el || reducedMotion()) return
    let lp = 0, id = 0
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id)
      if (e.isIntersecting) id = window.setInterval(() => {
        const b = el.children
        for (let i = 0; i < b.length; i++) b[i].classList.toggle('hot', i <= lp)
        lp = (lp + 1) % (b.length + 20)
      }, 70)
    })
    io.observe(el)
    return () => { io.disconnect(); clearInterval(id) }
  }, [])

  const onKey = (e: KeyboardEvent) => {
    const rtl = document.documentElement.dir === 'rtl'
    const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, Home: -tab, End: LAB_TABS.length - 1 - tab }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const i = (tab + next + LAB_TABS.length) % LAB_TABS.length
    setTab(i); tabRefs.current[i]?.focus()
  }

  const cur = LAB_TABS[tab]

  return (
    <section id="lab" aria-labelledby="lab-h">
      <div className="eyebrow mono"><b>{t.lK}</b><span>{t.lS}</span></div>
      <h2 id="lab-h">{t.lH}</h2>
      <div className="lab">
        <div className="rv">
          <p className="lede">{t.lP}</p>
          <ul className="platforms" aria-label={t.platformsLabel}>
            {PLATFORMS.map(p => <li key={p} dir="ltr">{p}</li>)}
          </ul>
          <ul className="skills">
            {t.skills.map(([k, v]) => <li key={k}><span>{k}</span><span>{v}</span></li>)}
          </ul>
        </div>
        <div className="rv">
          <div className="console">
            <div className="row1"><span className="lbl">{t.sample}</span><span dir="ltr">00:00:07.4</span></div>
            <div className="wave" ref={wave} aria-hidden="true">
              {BARS.map((h, i) => <i key={i} style={{ height: h }} />)}
            </div>
            <div className="tabs" role="tablist" aria-label={t.sample} onKeyDown={onKey}>
              {t.tabs.map((label, i) => (
                <button key={i} ref={el => { tabRefs.current[i] = el }} role="tab" id={`lt-${i}`} aria-controls="lab-panel"
                  aria-selected={i === tab} tabIndex={i === tab ? 0 : -1} onClick={() => setTab(i)}>{label}</button>
              ))}
            </div>
            <div className="out" id="lab-panel" role="tabpanel" aria-labelledby={`lt-${tab}`} tabIndex={0}>
              {'kv' in cur ? (
                <dl className="kv">
                  {cur.kv.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              ) : (
                <p className={`txt${cur.ar ? ' ar' : ''}`} lang={cur.ar ? 'ar' : 'en'} dir={cur.ar ? 'rtl' : 'ltr'}
                  dangerouslySetInnerHTML={{ __html: cur.html }} />
              )}
            </div>
          </div>
          <div className="rank">
            <h3>{t.rankH}</h3>
            <div className="ans"><span className="l">A</span><span className="a" lang="ar">أنا في الطريق</span><span className="s meh">{t.rankA}</span></div>
            <div className="ans"><span className="l">B</span><span className="a" lang="ar">أنا جاي في السكة</span><span className="s good">{t.rankB}</span></div>
            <p className="why">{t.why}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
