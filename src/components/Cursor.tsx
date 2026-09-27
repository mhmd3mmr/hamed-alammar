import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="tab"], .map canvas, .proj, .stage canvas'

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(hover: none), (pointer: coarse)').matches) return
    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      el.classList.add('on')
    }
    const over = (e: PointerEvent) => el.classList.toggle('big', !!(e.target as Element).closest?.(INTERACTIVE))
    const leave = () => el.classList.remove('on')
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div id="cur" ref={ref} aria-hidden="true" />
}
