import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { LangProvider } from './i18n'
import App from './App'

export function render() {
  return renderToString(<StrictMode><LangProvider><App /></LangProvider></StrictMode>)
}
