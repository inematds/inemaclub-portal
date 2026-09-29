import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { videosVirais, videoViralMp4 } from '@/data/videos-virais'

export const metadata: Metadata = {
  title: 'Vídeos curtos: 9 áreas de IA com cursos e projetos gratuitos',
  description:
    'Cinco vídeos verticais sobre as 9 áreas de IA do INEMA: RSI, IA Cultivada, OSWork, Claude → Codex, Codex + Claude, JEV, Gestão de IA, AGI-ready e WebMCP. Cursos e projetos abertos e gratuitos.',
  alternates: { canonical: '/videos/' },
}

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '1.6rem',
  listStyle: 'none',
  padding: 0,
  margin: '2.4rem 0 0',
}
const card: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.6rem' }
const player: CSSProperties = {
  width: '100%',
  aspectRatio: '9 / 16',
  borderRadius: '14px',
  background: '#0D1321',
  border: '1px solid rgba(116,140,171,.35)',
}

export default function VideosPage() {
  return (
    <main className="course-page-shell">
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Vídeos</span>
      </nav>
      <header className="course-index-header">
        <h1>9 áreas de IA. Cursos e projetos gratuitos.</h1>
        <p>
          Cinco vídeos curtos, cinco ângulos do mesmo acervo: as nove áreas de assunto do{' '}
          <a href="https://eventos.inema.pro/" target="_blank" rel="noopener noreferrer">eventos.inema.pro</a>,
          cada uma com curso, projeto e o primeiro passo — abertos no navegador, sem cobrança.
          Baixe e compartilhe à vontade.
        </p>
      </header>
      <ul style={grid}>
        {videosVirais.map((v) => (
          <li key={v.id} style={card}>
            <video
              controls
              playsInline
              preload="none"
              poster={`/videos/inema-areas-${v.id}.jpg`}
              src={videoViralMp4(v.id)}
              style={player}
            />
            <small style={{ textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.7 }}>
              {v.angle}{v.duration ? ` · ${v.duration}` : ''}
            </small>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{v.title}</h2>
            <p style={{ margin: 0 }}>{v.description}</p>
            <a href={videoViralMp4(v.id)} download>Baixar MP4 (9:16)</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
