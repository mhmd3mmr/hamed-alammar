export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Run a rAF loop only while `el` is on screen. Returns a cleanup function.
export function visibleLoop(el: Element, frame: (t: number) => void) {
  let raf = 0
  let on = false
  const tick = (t: number) => { frame(t / 1000); raf = requestAnimationFrame(tick) }
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !on) { on = true; raf = requestAnimationFrame(tick) }
    else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf) }
  })
  io.observe(el)
  return () => { io.disconnect(); cancelAnimationFrame(raf) }
}
