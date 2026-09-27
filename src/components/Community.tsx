import { useLang } from '../i18n'

export default function Community() {
  const { t } = useLang()
  return (
    <section id="community" aria-labelledby="c-k">
      <div className="eyebrow mono"><b id="c-k">{t.cK}</b><span>{t.cS}</span></div>
      <div className="two">
        <div className="box rv"><div className="big">{t.c1n}</div><h3>{t.c1h}</h3><p>{t.c1p}</p></div>
        <div className="box rv"><div className="big">{t.c2n}</div><h3>{t.c2h}</h3><p>{t.c2p}</p></div>
        <div className="box rv">
          <h3>{t.eduH}</h3>
          <ul className="list">{t.edu.map(([k, y]) => <li key={k}><span>{k}</span><span>{y}</span></li>)}</ul>
        </div>
        <div className="box rv">
          <h3>{t.awH}</h3>
          <ul className="list">{t.awards.map(([k, y]) => <li key={k}><span>{k}</span><span>{y}</span></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
