import { useEffect } from 'react'
import { useLang } from './i18n'
import { reducedMotion } from './motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Dialects from './components/Dialects'
import AILab from './components/AILab'
import Community from './components/Community'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

// Counts 000 to 100 in about 1.1s, then slides the static loader (index.html) up.
function runLoader(): Promise<void> {
  const loader = document.getElementById('loader')
  if (!loader || reducedMotion()) { loader?.remove(); return Promise.resolve() }
  const count = document.getElementById('lcount')!
  const bar = document.getElementById('lbar')!
  return new Promise(resolve => {
    const start = performance.now()
    const DURATION = 1000
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      loader.classList.add('done')
      resolve()
      setTimeout(() => loader.remove(), 900)
    }
    // Safety net: frames can be paused (background tab), never leave the loader up.
    setTimeout(finish, 1400)
    const step = (now: number) => {
      if (finished) return
      const p = Math.min(1, (now - start) / DURATION)
      const n = Math.round(100 * (1 - Math.pow(1 - p, 3)))
      count.textContent = String(n).padStart(3, '0')
      bar.style.width = n + '%'
      if (p < 1) return requestAnimationFrame(step)
      finish()
    }
    requestAnimationFrame(step)
  })
}

export default function App() {
  const { t } = useLang()

  useEffect(() => {
    // Deep links: /about, /work, ... are served index.html by Pages; turn them into #anchors.
    const slug = location.pathname.replace(/^\/+|\/+$/g, '')
    const target = slug && document.getElementById(slug)
    if (target) {
      history.replaceState(null, '', '/#' + slug)
      target.scrollIntoView()
    }

    let cleanup = () => {}
    const loaded = runLoader()

    // Motion libraries load after first paint so they never block the hero.
    if (!reducedMotion()) {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]).then(
        ([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
          gsap.registerPlugin(ScrollTrigger)
          const lenis = new Lenis({ anchors: { offset: -70 }, autoRaf: false })
          lenis.on('scroll', ScrollTrigger.update)
          const raf = (time: number) => lenis.raf(time * 1000)
          gsap.ticker.add(raf)
          gsap.ticker.lagSmoothing(0)

          // Page-load sequence: header, statement, then the stage.
          loaded.then(() => {
            gsap.from('.site-header > *', { y: -16, duration: .7, stagger: .08, ease: 'power3.out' })
            gsap.from('.hero > *', { y: 28, duration: .9, stagger: .1, ease: 'power3.out', delay: .05 })
            gsap.from('.stage', { y: 40, scale: .97, duration: 1.1, ease: 'power3.out', delay: .15 })
          })

          // Section reveals: transform only, content stays visible without JS.
          ScrollTrigger.batch('.rv', {
            start: 'top 88%', once: true,
            onEnter: els => gsap.fromTo(els, { y: 32 }, { y: 0, duration: .9, stagger: .08, ease: 'power3.out' }),
          })

          window.dispatchEvent(new Event('ha:motion'))
          cleanup = () => { gsap.ticker.remove(raf); lenis.destroy(); ScrollTrigger.getAll().forEach(s => s.kill()) }
        },
      )
    }
    return () => cleanup()
  }, [])

  // Magnetic buttons: any element with .mag drifts toward the pointer.
  useEffect(() => {
    if (reducedMotion() || matchMedia('(hover: none)').matches) return
    let active: HTMLElement | null = null
    const move = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('.mag')
      if (active && active !== el) { active.style.transform = ''; active = null }
      if (!el) return
      active = el
      const r = el.getBoundingClientRect()
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`
    }
    document.addEventListener('pointermove', move, { passive: true })
    return () => document.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Cursor />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Dialects />
        <AILab />
        <Community />
      </main>
      <Footer />
    </>
  )
}
