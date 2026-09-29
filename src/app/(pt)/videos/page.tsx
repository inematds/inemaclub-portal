import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { videosExplicativos, seriesShorts, totalVideosShorts, totalVideosExplicativos } from '@/data/videos'
import type { Idioma } from '@/data/videos'

export const metadata: Metadata = {
  title: 'Vídeos do INEMA: aulas e shorts sobre IA na prática',
  description:
    'Todos os vídeos produzidos pelo INEMA: vídeo-aulas com o Nei Maldaner (LOOP-R, OSWork, Astra, IA Cultivada, Codex + Claude) e shorts verticais sobre as áreas de IA. Abertos e gratuitos.',
  alternates: { canonical: '/videos/' },
}

const grid = (min: string): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`,
  gap: '1.6rem',
  listStyle: 'none',
  padding: 0,
  margin: '1.4rem 0 0',
})
const card: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.6rem' }
const frame: CSSProperties = {
  width: '100%',
  borderRadius: '14px',
  background: '#0D1321',
  border: '1px solid rgba(116,140,171,.35)',
  display: 'block',
}
const kicker: CSSProperties = { textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.7 }
const section: CSSProperties = { marginTop: '3.2rem' }
const videoList: CSSProperties = {
  listStyle: 'none',
  padding: '0.6rem 0 0',
  margin: 0,
  borderTop: '1px solid rgba(116,140,171,.25)',
  fontSize: '0.92rem',
}
const videoRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.8rem',
  padding: '0.25rem 0',
}
const IDIOMA_NOME: Record<Idioma, string> = { pt: 'português', en: 'inglês', es: 'espanhol' }

export default function VideosPage() {
  return (
    <main className="course-page-shell videos-catalog">
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Vídeos</span>
      </nav>
      <header className="course-index-header">
        <h1>Vídeos do INEMA</h1>
        <p>
          Tudo o que já produzimos em vídeo: aulas com o Nei Maldaner, com capítulos e legendas, e shorts verticais
          sobre as áreas de IA do{' '}
          <a href="https://eventos.inema.pro/" target="_blank" rel="noopener noreferrer">eventos.inema.pro</a>.
          Abertos, sem cobrança. Assista, baixe e compartilhe à vontade.
        </p>
      </header>

      <section style={section} aria-labelledby="explicativos">
        <h2 id="explicativos">Vídeo-aulas com o Nei</h2>
        <p style={{ margin: 0 }}>
          {totalVideosExplicativos} vídeos em 16:9, em {videosExplicativos.length} produções feitas com o{' '}
          <a href="https://inematds.github.io/explicavideos/guia/" target="_blank" rel="noopener noreferrer">Explicavideos</a>.
          Abra o player com capítulos ou o MP4 de cada vídeo no idioma que quiser.
        </p>
        <ul style={grid('300px')}>
          {videosExplicativos.map((v) => (
            <li key={v.id} style={card}>
              <a href={v.playerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Assistir: ${v.title}`}>
                <img
                  src={`/videos/${v.id}.jpg`}
                  alt=""
                  loading="lazy"
                  width={960}
                  height={540}
                  style={{ ...frame, aspectRatio: '16 / 9', height: 'auto', objectFit: 'cover' }}
                />
              </a>
              <small style={kicker}>{v.meta}</small>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{v.title}</h3>
              <p style={{ margin: 0 }}>{v.description}</p>
              <a href={v.playerUrl} target="_blank" rel="noopener noreferrer">Assistir no player com capítulos →</a>
              <ul style={videoList}>
                {v.videos.map((item) => (
                  <li key={item.label} style={videoRow}>
                    <span>{item.label}</span>
                    <span style={{ display: 'flex', gap: '0.7rem' }}>
                      {(Object.keys(item.mp4) as Idioma[]).map((l) => (
                        <a key={l} href={item.mp4[l]} target="_blank" rel="noopener noreferrer" aria-label={`${item.label} em ${IDIOMA_NOME[l]}`}>
                          {l.toUpperCase()}
                        </a>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section style={section} aria-labelledby="shorts">
        <h2 id="shorts">Shorts 9:16</h2>
        <p style={{ margin: 0 }}>{totalVideosShorts} vídeos verticais para Reels, Shorts e TikTok.</p>
        {seriesShorts.map((s) => (
          <div key={s.id} style={{ marginTop: '2.2rem' }}>
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{s.title}</h3>
            <p style={{ margin: '0.3rem 0 0' }}>{s.description}</p>
            <ul style={grid('220px')}>
              {s.videos.map((v) => (
                <li key={v.id} style={card}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={v.poster}
                    src={v.mp4}
                    style={{ ...frame, aspectRatio: '9 / 16' }}
                  />
                  <small style={kicker}>{v.duration}</small>
                  <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{v.title}</h4>
                  <p style={{ margin: 0 }}>{v.description}</p>
                  <span style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href={v.mp4} download>Baixar MP4</a>
                    {v.link && (
                      <a href={v.link.href} target="_blank" rel="noopener noreferrer">{v.link.label}</a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
