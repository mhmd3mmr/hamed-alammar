import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

// Voice sample with a word-synced transcript.
// To enable: add public/audio/sample.mp3 and public/audio/transcript.json, e.g.
//   { "words": [ { "w": "مرحبا", "start": 0.0, "end": 0.42 }, ... ] }
// Until both files exist, this component renders nothing.
type Word = { w: string; start: number; end: number }

export default function VoiceSample() {
  const { t } = useLang()
  const [words, setWords] = useState<Word[] | null>(null)
  const [now, setNow] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    fetch('/audio/transcript.json')
      .then(r => (r.ok && r.headers.get('content-type')?.includes('json') ? r.json() : null))
      .then(d => { if (Array.isArray(d?.words) && d.words.length) setWords(d.words) })
      .catch(() => {})
  }, [])

  if (!words) return null

  const onTime = () => {
    const ct = audio.current?.currentTime ?? 0
    setNow(words.findIndex(w => ct >= w.start && ct < w.end))
  }
  const toggle = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().catch(() => {}); else a.pause()
  }
  const ct = audio.current?.currentTime ?? 0

  return (
    <div className="voice rv">
      <button className="mag" onClick={toggle} aria-label={playing ? t.voice.pause : t.voice.play}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" width="3.5" height="14" /><rect x="8.5" width="3.5" height="14" /></svg>
          : <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>}
      </button>
      <div>
        <div className="mono" style={{ color: 'var(--hud)', marginBottom: 6 }}>{t.voice.k}</div>
        <p className="words" lang="ar" dir="rtl" style={{ margin: 0 }}>
          {words.map((w, i) => (
            <span key={i}><span className={`wd${i === now ? ' now' : ct >= w.end ? ' on' : ''}`}>{w.w}</span>{' '}</span>
          ))}
        </p>
      </div>
      <audio ref={audio} src="/audio/sample.mp3" preload="none" onTimeUpdate={onTime}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setNow(-1) }} />
    </div>
  )
}
