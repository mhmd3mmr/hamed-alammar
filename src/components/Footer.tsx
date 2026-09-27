import { useRef, useState } from 'react'
import { useLang } from '../i18n'
import { EMAIL, LINKEDIN } from '../content'

export default function Footer() {
  const { t } = useLang()
  const [state, setState] = useState<'idle' | 'copied' | 'fail'>('idle')
  const mail = useRef<HTMLAnchorElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setState('copied')
    } catch {
      const r = document.createRange()
      r.selectNodeContents(mail.current!)
      const s = getSelection()!
      s.removeAllRanges(); s.addRange(r)
      setState('fail')
    }
    setTimeout(() => setState('idle'), 1800)
  }

  return (
    <footer className="site-footer" id="contact" aria-labelledby="f-h">
      <h2 className="huge" id="f-h">{t.fA}<em>{t.fEm}</em></h2>
      <div className="contact">
        <a className="mail" ref={mail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button className="btn mag" onClick={copy}>
          <span aria-live="polite">{state === 'copied' ? t.copied : state === 'fail' ? t.copyFail : t.copy}</span>
        </button>
        <a className="btn mag" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
      <div className="fbar">
        <span>Hamed Alammar · <span lang="ar">حامد العمار</span></span>
        <span>{t.location}</span>
        <span>{t.langs}</span>
      </div>
    </footer>
  )
}
