import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { CAPTIONS } from '../content'
import { reducedMotion } from '../motion'
import type { OrbState } from '../orb'

function columbusTime() {
  return new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function Hero() {
  const { t } = useLang()
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const f0Ref = useRef<HTMLSpanElement>(null)
  const enRef = useRef<HTMLSpanElement>(null)
  const orb = useRef<OrbState>({ energy: 0, target: 0, speaking: false })
  const line = useRef(0)
  const [clock, setClock] = useState('--:--')
  const [capAr, setCapAr] = useState('')
  const [capEn, setCapEn] = useState('')
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    setClock(columbusTime())
    const id = setInterval(() => setClock(columbusTime()), 15000)
    return () => clearInterval(id)
  }, [])

  // Mount the orb once the browser is idle, so three.js never competes with first paint.
  useEffect(() => {
    let dispose = () => {}
    let cancelled = false
    const start = () => import('../orb').then(({ mountOrb }) => {
      if (cancelled || !canvasRef.current || !stageRef.current) return
      dispose = mountOrb(canvasRef.current, stageRef.current, orb.current, (energy, time) => {
        if (f0Ref.current) f0Ref.current.textContent = String(Math.round(120 + energy * 90 + Math.sin(time * 3) * 4))
        if (enRef.current) enRef.current.textContent = energy.toFixed(2)
      }, reducedMotion())
    })
    if ('requestIdleCallback' in window) requestIdleCallback(() => start(), { timeout: 1200 })
    else setTimeout(start, 300)
    return () => { cancelled = true; dispose() }
  }, [])

  const speak = useCallback(() => {
    if (orb.current.speaking) return
    orb.current.speaking = true
    setSpeaking(true)
    const [ar, en] = CAPTIONS[line.current++ % CAPTIONS.length]
    const words = ar.split(' ')
    setCapAr(''); setCapEn('')
    let i = 0
    const id = setInterval(() => {
      orb.current.target = .55 + Math.random() * .45
      setCapAr(words.slice(0, ++i).join(' '))
      if (i >= words.length) {
        clearInterval(id)
        setCapEn(en)
        setTimeout(() => { orb.current.target = 0; orb.current.speaking = false; setSpeaking(false) }, 900)
      }
    }, 380)
  }, [])

  return (
    <>
      <div className="hero">
        <p className="meta mono">{t.meta}</p>
        <h1>{t.heroA}<em>{t.heroEm}</em>{t.heroB}</h1>
      </div>

      <div className="stage" ref={stageRef}>
        <canvas
          ref={canvasRef}
          className="orb"
          role="img"
          aria-label={t.orbLabel}
          onPointerDown={speak}
        />
        <div className="hud l" aria-hidden="true">F0 <span ref={f0Ref}>138</span> Hz<br />{t.hud.dialect}</div>
        <div className="hud r" aria-hidden="true">
          <span className="energy">{t.hud.energy} <span ref={enRef}>0.00</span><br /></span>
          {t.hud.city} {clock}
        </div>
        <div className="caption" aria-live="polite">
          <div className="ar" lang="ar-SY">{capAr}</div>
          <div className="en" lang="en">{capEn}</div>
        </div>
        <div className="name">
          <b>Hamed<br />Alammar</b>
          <span lang="ar">حامد العمار</span>
        </div>
        <button className="speak mag" onClick={speak} aria-pressed={speaking}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M0 0l10 6-10 6z" /></svg>
          <span>{speaking ? t.speaking : t.speak}</span>
        </button>
      </div>
      <div className="cross" aria-hidden="true"><span>+</span><span>+</span><span className="lbl">{t.scroll}</span><span>+</span><span>+</span></div>
    </>
  )
}
