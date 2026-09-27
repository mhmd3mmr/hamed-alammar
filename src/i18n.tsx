import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { COPY, type Copy, type Lang } from './content'

type Ctx = { lang: Lang; t: Copy; toggle: () => void }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  return typeof document !== 'undefined' && document.documentElement.lang === 'ar' ? 'ar' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    const d = document.documentElement
    d.lang = lang
    d.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('ha-lang', lang) } catch { /* storage unavailable */ }
    window.dispatchEvent(new Event('ha:lang'))
  }, [lang])

  const toggle = useCallback(() => setLang(l => (l === 'en' ? 'ar' : 'en')), [])
  return <LangContext.Provider value={{ lang, t: COPY[lang], toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  const c = useContext(LangContext)
  if (!c) throw new Error('useLang outside LangProvider')
  return c
}
