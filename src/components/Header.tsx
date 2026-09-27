import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function Header() {
  const { t, lang, toggle } = useLang()
  // Starts as null so the prerendered HTML and first client render match.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme
    else setTheme(currentTheme())
  }, [theme])

  const flipTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('ha-theme', next) } catch { /* storage unavailable */ }
  }

  const links: [string, string][] = [
    ['#about', t.nav.about], ['#work', t.nav.work], ['#dialects', t.nav.dialects], ['#lab', t.nav.lab], ['#community', t.nav.community],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#main">
        <span className="en-name">{lang === 'ar' ? 'حامد العمار' : 'HAMED ALAMMAR'}</span>
        <small>{t.role}</small>
      </a>
      <div className="nav">
        <nav className="menu" aria-label={lang === 'ar' ? 'الأقسام' : 'Sections'}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button className="pill icon mag" onClick={flipTheme} aria-label={t.themeToggle} aria-pressed={theme === 'dark'}>
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>
          )}
        </button>
        <button className="pill mag" onClick={toggle} aria-label={t.langToggle} lang={lang === 'ar' ? 'en' : 'ar'}>
          {lang === 'ar' ? 'EN' : 'ع'}
        </button>
        <a className="pill dark talk mag" href="#contact">
          <span>{t.talk}</span><span className="dot" aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
