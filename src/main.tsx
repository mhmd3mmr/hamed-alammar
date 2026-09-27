import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles.css'
import { LangProvider } from './i18n'
import App from './App'

const root = document.getElementById('root')!
const app = <StrictMode><LangProvider><App /></LangProvider></StrictMode>

// The HTML is prerendered in English. Hydrate it, or render fresh when Arabic was saved.
if (root.hasChildNodes() && document.documentElement.lang !== 'ar') hydrateRoot(root, app)
else { root.textContent = ''; createRoot(root).render(app) }
