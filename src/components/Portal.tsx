'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { platformsData, updatesData, projectUpdatesData, type Course } from '@/data/courses'

interface VisitStats {
  total: number
  uniqueLogged: number
  uniqueAnon: number
}

const communityProjects: Array<{
  icon: string
  name: string
  desc: string
  url?: string
  badge?: string
}> = [
  { icon: '🎮', name: 'eai.inema.club', desc: 'Plataforma de jogos + educação (arcade, educacional, profissional) em Next.js 16', url: 'https://inematds.github.io/eai-guia/', badge: 'Guia' },
  { icon: '🐾', name: 'pet360', desc: 'SaaS open source e multi-tenant para clínicas vet, pet shops, hotéis e ONGs', url: 'https://inematds.github.io/pet360/', badge: 'Guia' },
  { icon: '💄', name: 'bela360', desc: 'SaaS de gestão para salões, barbearias e clínicas de estética com WhatsApp', url: 'https://inematds.github.io/bela360/', badge: 'Guia' },
  { icon: '📖', name: 'animabook', desc: 'Plataforma web mobile-first para criar, publicar e ler quadrinhos animados', url: 'https://inematds.github.io/animabook/', badge: 'Guia' },
  { icon: '📕', name: 'book-genesis', desc: 'Criacao de livros com IA', url: 'https://github.com/PhilipStark/book-genesis', badge: 'GitHub' },
  { icon: '🎤', name: 'inemavox', desc: 'Suíte de voz com IA local: dubla, transcreve, corta e baixa vídeos na GPU', url: 'https://inematds.github.io/inemavox/', badge: 'Guia' },
  { icon: '🎙️', name: 'dublar pro', desc: 'Pipeline de vídeo com IA: baixa, transcreve, traduz, dubla e corta vídeos', url: 'https://inematds.github.io/dublarv5/', badge: 'Guia' },
  { icon: '🧠', name: 'intelecto', desc: 'Assistente de IA pessoal em Python: Telegram, memória SQLite, OpenRouter/Ollama', url: 'https://inematds.github.io/intelecto-guia/', badge: 'Guia' },
  { icon: '💊', name: 'antidote', desc: 'Assistente de IA pessoal em Python, o antídoto contra frameworks inchados', url: 'https://inematds.github.io/antidote-guia/', badge: 'Guia' },
  { icon: '🛡️', name: 'seg360', desc: 'Marketplace BR de seguros contra calamidades: risco por CEP e cotação online', url: 'https://inematds.github.io/seg360/', badge: 'Guia' },
  { icon: '🏢', name: 'erpsb', desc: 'ERP SaaS mobile-first para MEIs e microempresas: PIX, WhatsApp e dashboard semáforo', url: 'https://inematds.github.io/ERPsb/', badge: 'Guia' },
  { icon: '🇪🇸', name: 'hola', desc: 'Plataforma de espanhol 100% para crianças de 6 a 12 anos, alinhada à BNCC', url: 'https://inematds.github.io/hola/', badge: 'Guia' },
  { icon: '🚚', name: 'rotaX1', desc: 'Entregas de última milha por nicho (vet), com rastreamento em tempo real e PIX', url: 'https://inematds.github.io/RotaX1/', badge: 'Guia' },
  { icon: '🔧', name: 'rf360', desc: 'Marketplace de técnicos de eletrônica com orçamento automático via WhatsApp', url: 'https://inematds.github.io/RF360/', badge: 'Guia' },
  { icon: '🌤️', name: 'aclima', desc: 'Dashboard realtime de chuvas e alertas com dados do INMET e notificações multicanal', url: 'https://inematds.github.io/aclima/', badge: 'Guia' },
  { icon: '📚', name: 'eboo-maker', desc: 'Gera eBooks profissionais em PDF com capa por IA, 3 layouts e Claude Code', url: 'https://inematds.github.io/ebook-maker/', badge: 'Guia' },
  { icon: '⚡', name: 'megaRAG', desc: 'RAG multimodal: converse com PDF, planilhas, imagens, vídeo e áudio', url: 'https://inematds.github.io/MegaRAG/', badge: 'Guia' },
  { icon: '🍔', name: 'Restaurante Brutal', desc: 'Sistema completo para restaurante' },
  { icon: '🏋️', name: 'inema academia', desc: 'Plataforma educacional BNCC (6º-9º ano) com gamificação, painéis e tutor IA', url: 'https://inematds.github.io/inemaacademia/', badge: 'Guia' },
  { icon: '📱', name: 'redessociais', desc: 'Publica e agenda em 6 redes via scripts Node sobre o Postiz self-hosted', url: 'https://inematds.github.io/redessociais/', badge: 'Guia' },
  { icon: '📲', name: 'redessociais2026', desc: 'Publisher próprio (worker TS + Supabase) p/ Instagram e TikTok, mais Chatwoot', url: 'https://inematds.github.io/redessociais2026/', badge: 'Guia' },
  { icon: '🔍', name: 'deepsearchagent', desc: 'Agente de pesquisa profunda em Python com Tavily, reflexão e saída Markdown', url: 'https://inematds.github.io/deepsearchagent/', badge: 'Guia' },
  { icon: '📈', name: 'timesmkt3', desc: 'Fábrica de conteúdo de marketing com agentes de IA orquestrados por bot Telegram', url: 'https://inematds.github.io/timesmkt3/', badge: 'Guia' },
  { icon: '🎥', name: 'aisf', desc: 'Fork do SkyReels V3 com Web UI para gerar episódios de vídeo em batch', url: 'https://inematds.github.io/aisf/', badge: 'Guia' },
  { icon: '🐟', name: 'BettaFish', desc: 'Análise de opinião pública multi-agente (fork BR/LATAM) que vira relatório', url: 'https://inematds.github.io/BettaFish/', badge: 'Guia' },
  { icon: '🌊', name: 'MiroFish', desc: 'Motor de previsão por inteligência de enxame: simula agentes em redes sociais', url: 'https://inematds.github.io/mirofish/', badge: 'Guia' },
  { icon: '🎬', name: 'diretor-animacao', desc: 'Imagens prontas + narração viram filme MP4 pro, sem IA de vídeo (render via pixflow)', url: 'https://inematds.github.io/diretor-animacao-guia/', badge: 'Guia' },
  { icon: '🧪', name: 'intelecto-testes', desc: 'Agente de IA no WhatsApp via Evolution API + OpenRouter, sobe em Docker', url: 'https://inematds.github.io/intelecto-testes/', badge: 'Guia' },
  { icon: '🎨', name: 'open-design', desc: 'Alternativa open-source ao Claude Design: sua CLI de agente vira o motor de design', url: 'https://inematds.github.io/open-design/', badge: 'Guia' },
  { icon: '🚀', name: 'inemaupsk', desc: 'Servidor de upscaling 4x (super-resolution) com 4 modelos ESRGAN, API HTTP e UI web', url: 'https://inematds.github.io/inemaupsk/', badge: 'Guia' },
  { icon: '📺', name: 'yt-pub-livesx', desc: 'Corta lives do YouTube em clips por tópico com IA e republica em outro canal', url: 'https://inematds.github.io/yt-pub-livesx/', badge: 'Guia' },
  { icon: '🎬', name: 'VideosDGX', desc: 'Docker multi-container para 4 Video LLMs (LTX-2, Wan 2.1, MAGI-1, Waver) no DGX Spark', url: 'https://inematds.github.io/VideosDGX/', badge: 'Guia' },
  { icon: '🌌', name: 'skyreelsv3', desc: 'Fork do SkyReels V3 com Web UI: filas de episódios, talking avatar e import em batch', url: 'https://inematds.github.io/skyreelsv3/', badge: 'Guia' },
  { icon: '🖼️', name: 'inemaimg', desc: 'Servidor local multi-modelo de imagens com hot-swap entre Qwen-Edit, FLUX.2 e ERNIE', url: 'https://inematds.github.io/inemaimg/', badge: 'Guia' },
  { icon: '📝', name: 'mkblogs', desc: 'Publicação multi-plataforma open-source com Postiz self-hosted e APIs', url: 'https://inematds.github.io/mkblogs-guia/', badge: 'Guia' },
  { icon: '🧬', name: 'openhuman', desc: 'Assistente de IA agêntico open-source, local-first, com 118+ integrações OAuth', url: 'https://inematds.github.io/openhuman-guia/', badge: 'Guia' },
  { icon: '🪽', name: 'Claude OS', desc: 'Dashboard local do Claude Code + Hermes (Dream, Mission Control e assistente Hermes)', url: 'https://inematds.github.io/claude-hermes-os/', badge: 'Guia' },
  { icon: '🎬', name: 'recursos de vídeo', desc: 'Catálogo-guia dos ~30 projetos do ecossistema INEMA para gerar e processar vídeo', url: 'https://inematds.github.io/recursos-video/', badge: 'Guia' },
  { icon: '🧭', name: 'O Caminho Certo da IA', desc: 'Manifesto de qualificação real em IA: usar IA de verdade e desenvolver o que a IA não substitui, com dados verificados (Gartner, MIT, WEF)', url: 'https://inematds.github.io/caminho-certo-da-ia-guia/', badge: 'Guia' },
  { icon: '🔬', name: 'inemathink', desc: 'Laboratório de pesquisa por trás de O Caminho Certo da IA: deep research verificado, manifesto, curso e gráficos de IA/humanoides 2019-2030', url: 'https://inematds.github.io/inemathink/', badge: 'Guia' },
]

type RepoUpdate = {
  name: string
  url: string
  description: string
  date: string
  type: 'novo' | 'atualizado'
}

type Repo = {
  name: string
  url: string
  description: string
  stars: number
  language: string | null
  pushed_at: string
}

const LANG_ICON: Record<string, string> = {
  TypeScript: '🟦',
  JavaScript: '🟨',
  Python: '🐍',
  HTML: '🌐',
  CSS: '🎨',
  Shell: '🐚',
  Go: '🐹',
  Rust: '🦀',
  Java: '☕',
  Ruby: '💎',
  PHP: '🐘',
  Vue: '💚',
  Svelte: '🧡',
  Dockerfile: '🐳',
}

export default function Portal({ visitStats }: { visitStats: VisitStats }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [updatesExpanded, setUpdatesExpanded] = useState(false)
  const [projectUpdatesExpanded, setProjectUpdatesExpanded] = useState(false)
  const [repoUpdatesExpanded, setRepoUpdatesExpanded] = useState(false)
  const [repoUpdates, setRepoUpdates] = useState<RepoUpdate[]>([])
  const [repos, setRepos] = useState<Repo[]>([])

  // Registra a visita ao montar
  useEffect(() => {
    async function trackVisit() {
      let sid = localStorage.getItem('animabook_sid')
      if (!sid) {
        sid = crypto.randomUUID()
        localStorage.setItem('animabook_sid', sid)
      }
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }
      await fetch('/api/visit', {
        method: 'POST',
        headers,
        body: JSON.stringify({ session_id: sid }),
      })
    }
    trackVisit()
  }, [])

  // Busca últimas atualizações dos repositórios GitHub
  useEffect(() => {
    let cancelled = false
    fetch('/api/repos-updates')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.ok && Array.isArray(data.items)) {
          setRepoUpdates(data.items)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // Busca repositórios da org (ordenados por estrelas)
  useEffect(() => {
    let cancelled = false
    fetch('/api/repos')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.ok && Array.isArray(data.items)) {
          setRepos(data.items)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // Rastreia cliques em links externos
  function trackClick(url: string, label: string, section: string) {
    const sid = localStorage.getItem('animabook_sid') ?? 'unknown'
    fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, url, label, section }),
    })
  }

  // Filtra cursos pela busca
  const filteredCourses: Course[] =
    searchTerm.trim() === ''
      ? platformsData
      : platformsData.filter((p) => {
          const term = searchTerm.toLowerCase()
          return (
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.tags.some((t) => t.toLowerCase().includes(term))
          )
        })

  // Lista de atualizações a exibir
  const visibleUpdates = updatesData.slice(0, updatesExpanded ? 20 : 5)
  const visibleProjectUpdates = projectUpdatesData.slice(0, projectUpdatesExpanded ? 20 : 5)
  const visibleRepoUpdates = repoUpdates.slice(0, repoUpdatesExpanded ? 20 : 5)
  const sortedProjects = [...communityProjects].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' })
  )


  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  function formatIsoDate(iso: string) {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <a
            href="https://inema.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="community-badge"
            onClick={() => trackClick('https://inema.vip', 'Participe da Comunidade', 'header')}
          >
            <img src="/doc/conviteinemap.png" alt="INEMA.VIP" />
            <span>Participe da Comunidade</span>
          </a>
          <div className="header-content">
            <h1 className="logo">INEMA.CLUB Portal INEMA</h1>
            <p className="tagline">Acesso centralizado aos seus cursos e plataformas</p>
            {/* Chips de visitantes */}
            <div className="visit-chips">
              <span className="visit-chip" title="acessos">
                👁 {visitStats.total}
              </span>
              <span className="visit-chip" title="visitantes únicos">
                👤 {visitStats.uniqueAnon}
              </span>
              {visitStats.uniqueLogged > 0 && (
                <span className="visit-chip" title="logados">
                  🔑 {visitStats.uniqueLogged}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section Nav */}
      <nav className="section-nav">
        <div className="container">
          <div className="section-nav-links">
            <a href="#trilha-iniciantes" className="section-nav-link">📘 Iniciantes</a>
            <a href="#trilha-profissional" className="section-nav-link">🧭 Profissional</a>
            <a href="#cursos" className="section-nav-link">🎓 Cursos</a>
            <a href="#trilha-vibe" className="section-nav-link">⚡ Vibe Code</a>
            <a href="#trilha-skills" className="section-nav-link">🧩 Skills</a>
            <a href="#trilhas" className="section-nav-link">🗺️ Trilhas</a>
            <a href="#comunidade" className="section-nav-link">🚀 Projetos</a>
            <a href="#github" className="section-nav-link">💻 GitHub</a>
            <a href="#telegram" className="section-nav-link">💬 Telegram</a>
            <a href="#social" className="section-nav-link">📱 Social</a>
          </div>
        </div>
      </nav>

      {/* Recruitment Hero */}
      <section className="recruitment-hero">
        <div className="container">
          <div className="recruitment-content">
            <div className="recruitment-image-wrapper">
              <div className="recruitment-image">
                <img
                  src="/doc/inema-hero-aprenda-pratique-evolua.webp"
                  alt="INEMA.CLUB — Aprenda. Pratique. Evolua. O ecossistema para dominar IA na prática."
                />
              </div>
              <p className="recruitment-image-caption">
                <strong>
                  Aprenda. Pratique. Evolua. — uma base sólida de conhecimento em IA, para aplicar
                  no trabalho, nos projetos e na carreira.
                </strong>
              </p>
            </div>
            <div className="recruitment-text">
              <h2>Construa uma base sólida de conhecimento em IA.</h2>
              <p>
                O INEMA Club é um ecossistema de aprendizado prático para quem quer dominar
                inteligência artificial e aplicar IA no trabalho, nos projetos e na carreira. A ideia
                central é simples: aprender, praticar e evoluir com IA de forma contínua.
              </p>
              <p>
                Aqui você encontra cursos práticos diretos ao ponto, projetos reais para colocar a
                mão na massa, trilhas organizadas para cada nível, uma comunidade ativa e a curadoria
                das melhores ferramentas. Tudo voltado a construir uma base sólida de conhecimento —
                que te torna mais produtivo, mais estratégico e mais preparado para o futuro do
                trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="trilha-iniciantes" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>Trilha para Iniciantes</h3>
            <p>Comece sua jornada com os cursos essenciais, nesta ordem recomendada</p>
          </div>
          <div className="learning-path-cards">
            <a
              href="https://inematds.github.io/FEP/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-1"
              onClick={() => trackClick('https://inematds.github.io/FEP/', 'FEP', 'trilha')}
            >
              <div className="path-number">1</div>
              <h4>FEP</h4>
              <p>Fundamentos de Engenharia de Prompts</p>
            </a>
            <a
              href="https://inematds.github.io/ATIA/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-2"
              onClick={() => trackClick('https://inematds.github.io/ATIA/', 'ATIA', 'trilha')}
            >
              <div className="path-number">2</div>
              <h4>ATIA</h4>
              <p>AI Tools in Action</p>
            </a>
            <a
              href="https://inematds.github.io/FDB/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-3"
              onClick={() => trackClick('https://inematds.github.io/FDB/', 'FDB', 'trilha')}
            >
              <div className="path-number">3</div>
              <h4>FDB</h4>
              <p>Fundamentos de Banco de Dados</p>
            </a>
            <a
              href="https://inematds.github.io/VISION/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-4"
              onClick={() => trackClick('https://inematds.github.io/VISION/', 'Vision', 'trilha')}
            >
              <div className="path-number">4</div>
              <h4>Vision</h4>
              <p>Processamento de Imagens com IA</p>
            </a>
            <a
              href="https://inematds.github.io/ccodebasico/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-5"
              onClick={() => trackClick('https://inematds.github.io/ccodebasico/', 'Claude Code Básico', 'trilha')}
            >
              <div className="path-number">5</div>
              <h4>Claude Code Básico</h4>
              <p>Do Zero: Instalação, Comandos, Skills, MCP e Cowork</p>
            </a>
            <a
              href="https://inematds.github.io/codexbasico/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-6"
              onClick={() => trackClick('https://inematds.github.io/codexbasico/', 'Codex Básico', 'trilha')}
            >
              <div className="path-number">6</div>
              <h4>Codex Básico</h4>
              <p>Curso Completo do Codex CLI em 6 Trilhas</p>
            </a>
            <a
              href="https://inematds.github.io/do-zero-ao-deploy/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-7"
              onClick={() => trackClick('https://inematds.github.io/do-zero-ao-deploy/', 'Do Zero ao Deploy', 'trilha')}
            >
              <div className="path-number">7</div>
              <h4>Do Zero ao Deploy</h4>
              <p>Da primeira linha no terminal ao seu assistente IA</p>
            </a>
            <a
              href="https://inematds.github.io/intelecto-curso/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-8"
              onClick={() => trackClick('https://inematds.github.io/intelecto-curso/', 'INTELECTO Curso', 'trilha')}
            >
              <div className="path-number">8</div>
              <h4>INTELECTO Curso</h4>
              <p>Do Zero ao Expert em IA</p>
            </a>
          </div>
          <div className="learning-path-footer">
            <p>Após completar esta trilha, explore outros cursos conforme seu interesse abaixo</p>
          </div>
        </div>
      </section>

      {/* Trilha Profissional com IA */}
      <section id="trilha-profissional" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>🧭 Trilha Profissional com IA</h3>
            <p>Do espectador ao especialista, em 3 estágios — desperte, lidere e construa sua estratégia</p>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#34d399', margin: '0 0 .9rem' }}>1 · Despertar — integre a IA na sua profissão</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/profissionalai/',    label: 'Integra sua Profissão', desc: 'Integre a IA na profissão que você já tem', n: 1 },
              { href: 'https://inematds.github.io/pha2030-aula/',      label: 'PHA 2030',              desc: 'Potencial Humano Aumentado',              n: 2 },
              { href: 'https://inematds.github.io/profissional2027x/', label: 'Profissional 2027',     desc: 'Implementadores de IA para PMEs',          n: 3 },
              { href: 'https://inematds.github.io/prof2030/',          label: 'Prof2030',              desc: 'O Profissional do Futuro',                n: 4 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#a78bfa', margin: '1.6rem 0 .9rem' }}>2 · Liderar &amp; Monetizar — consultor, CAIO, certificação</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/caio/',          label: 'CAIO',             desc: 'Chief AI Officer 2030',                  n: 1 },
              { href: 'https://inematds.github.io/prof2031CAIP/',  label: 'CAIP',             desc: 'Certified AI Professional',              n: 2 },
              { href: 'https://inematds.github.io/consultoria2k/', label: 'Consultor de IA',  desc: 'Do Rótulo ao Resultado',                 n: 3 },
              { href: 'https://inematds.github.io/cultura-inovacao/', label: 'Cultura de Inovação', desc: 'Da Teoria à Prática',                  n: 4 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#38bdf8', margin: '1.6rem 0 .9rem' }}>3 · Estratégia — automação e estratégia com IA</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/fae-ai/',       label: 'Automação Estratégica', desc: 'Automação Estratégica com IA',           n: 1 },
              { href: 'https://inematds.github.io/aiestrategia/', label: 'Estratégia de IA',      desc: 'Fábrica de Estratégia — Vire Consultor', n: 2 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>

          <div className="learning-path-footer">
            <p>Uma jornada do INEMA.CLUB: integre a IA na sua profissão, vire implementador e depois consultor ou CAIO</p>
          </div>
        </div>
      </section>

      {/* Main — Updates + Search + Cards */}
      <main className="main">
        <div className="container">
          {/* Updates de Cursos */}
          <section className="updates-section">
            <div
              className="updates-header"
              onClick={() => setUpdatesExpanded((v) => !v)}
              style={{ cursor: 'pointer' }}
            >
              <h3>Últimas Atualizações de Cursos</h3>
              <span className="updates-toggle">{updatesExpanded ? 'Ver menos' : 'Ver mais'}</span>
            </div>
            <div className={`updates-list${updatesExpanded ? ' expanded' : ''}`}>
              {visibleUpdates.map((update, i) => (
                <a
                  key={i}
                  className="update-item"
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(update.url, update.title, 'atualizacoes')}
                >
                  <span className="update-date">{formatDate(update.date)}</span>
                  <span className={`update-type ${update.type}`}>{update.type}</span>
                  <span className="update-title">{update.title}</span>
                  <span className="update-arrow">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Updates de Projetos */}
          <section className="updates-section">
            <div
              className="updates-header"
              onClick={() => setProjectUpdatesExpanded((v) => !v)}
              style={{ cursor: 'pointer' }}
            >
              <h3>Últimas Atualizações de Projetos</h3>
              <span className="updates-toggle">{projectUpdatesExpanded ? 'Ver menos' : 'Ver mais'}</span>
            </div>
            <div className={`updates-list${projectUpdatesExpanded ? ' expanded' : ''}`}>
              {visibleProjectUpdates.map((update, i) => (
                <a
                  key={i}
                  className="update-item"
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(update.url, update.title, 'atualizacoes-projetos')}
                >
                  <span className="update-date">{formatDate(update.date)}</span>
                  <span className={`update-type ${update.type}`}>{update.type}</span>
                  <span className="update-title">{update.title}</span>
                  <span className="update-arrow">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Repo Updates (GitHub) */}
          <section className="updates-section">
            <div
              className="updates-header"
              onClick={() => setRepoUpdatesExpanded((v) => !v)}
              style={{ cursor: 'pointer' }}
            >
              <h3>Últimas Atualizações do Repositório</h3>
              <span className="updates-toggle">
                {repoUpdates.length === 0
                  ? 'carregando…'
                  : repoUpdatesExpanded
                  ? 'Ver menos'
                  : 'Ver mais'}
              </span>
            </div>
            <div className={`updates-list${repoUpdatesExpanded ? ' expanded' : ''}`}>
              {visibleRepoUpdates.map((r, i) => (
                <a
                  key={`${r.name}-${i}`}
                  className="update-item"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(r.url, r.name, 'repo-updates')}
                  title={r.description || r.name}
                >
                  <span className="update-date">{formatIsoDate(r.date)}</span>
                  <span className={`update-type ${r.type}`}>{r.type}</span>
                  <span className="update-title">
                    {r.name}
                    {r.description ? ` — ${r.description}` : ''}
                  </span>
                  <span className="update-arrow">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Search */}
          <section id="cursos" className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar cursos ou plataformas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchTerm('')
              }}
            />
          </section>

          {/* Cards */}
          <section className="cards-grid">
            {filteredCourses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <p className="empty-state-text">Nenhuma plataforma encontrada</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="card">
                  <div className="card-icon">{course.icon}</div>
                  <h2 className="card-title">{course.title}</h2>
                  <p className="card-description">{course.description}</p>
                  <div className="card-tags">
                    {course.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={course.url}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(course.url, course.title, 'cursos')}
                  >
                    Acessar plataforma
                  </a>
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      {/* Trilha Vibe Code */}
      <section id="trilha-vibe" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>⚡ Trilha Vibe Code</h3>
            <p>Do conceito à engenharia — crie software com IA de ponta a ponta</p>
          </div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/vibecode',          label: 'Vibe Coding',      desc: 'Da Ideia ao Produto com IA',    n: 1 },
              { href: 'https://inematds.github.io/vb-imersao/',      label: 'VB Imersao',       desc: 'Do Zero ao SaaS em 3 Dias',    n: 2 },
              { href: 'https://inematds.github.io/skills',            label: 'Skills',           desc: 'Agent Skills Mastery',         n: 3 },
              { href: 'https://inematds.github.io/agentic/',          label: 'Agentic',          desc: 'Engenharia de Agentic',        n: 4 },
              { href: 'https://inematds.github.io/agentic-workflow/', label: 'Agentic Workflow', desc: 'Workflows Agentic na Prática', n: 5 },
              { href: 'https://inematds.github.io/CLI-x',            label: 'CLI-x',            desc: 'O Terminal como Interface dos Agentes', n: 6 },
              { href: 'https://inematds.github.io/skill-design/',    label: 'Skill Design',     desc: 'Skills pra Melhorar Páginas',  n: 7 },
              { href: 'https://inematds.github.io/skill-video-explicativo/', label: 'HyperFrames', desc: 'Vídeos Explicativos com Claude Code', n: 8 },
              { href: 'https://inematds.github.io/skills-craft/',    label: 'Criando Skills',   desc: 'Do Catálogo à Sua Primeira Skill', n: 9 },
              { href: 'https://inematds.github.io/subagentes/',     label: 'Subagentes',       desc: 'Especialistas do Claude Code', n: 10 },
              { href: 'https://inematds.github.io/fablelite/',       label: 'Fable Lite',       desc: 'Garimpe o Raciocínio dos Modelos', n: 11 },
              { href: 'https://inematds.github.io/vibe-coding-completo/', label: 'Domínio Completo', desc: 'Fundamentos, Técnica, Prompts, Skills, Agentes e Produção', n: 12 },
              { href: 'https://inematds.github.io/vibe-coding/', label: 'Vibe Coding na Prática', desc: 'Do Primeiro Workflow ao App no Ar', n: 13 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-vibe')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="learning-path-footer">
            <p>Trilha completa para dominar o desenvolvimento de software com IA — do vibe ao agente</p>
          </div>
        </div>
      </section>

      {/* Trilha Skills */}
      <section id="trilha-skills" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>🧩 Trilha Skills</h3>
            <p>Domine as Agent Skills do Claude Code — do catálogo à sua própria Skill</p>
          </div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/skills-craft/',           label: 'Criando Skills',          desc: 'Do Catálogo à Sua Primeira Skill',   n: 1 },
              { href: 'https://inematds.github.io/skill-video-explicativo/', label: 'HyperFrames',             desc: 'Vídeos Explicativos com Claude Code', n: 2 },
              { href: 'https://inematds.github.io/akarpathy-skill/curso-pt/', label: 'Karpathy Guidelines',     desc: '4 Princípios pra Código Limpo',      n: 3 },
              { href: 'https://inematds.github.io/polyskills',              label: 'PolySkills',              desc: 'Claude Code & Codex lado a lado',    n: 4 },
              { href: 'https://inematds.github.io/skill-design/',           label: 'Skill Design',            desc: 'Arsenal de Skills pra Páginas',      n: 5 },
              { href: 'https://inematds.github.io/skills',                  label: 'Skills',                  desc: 'Agent Skills Mastery',               n: 6 },
              { href: 'https://inematds.github.io/mp-skill/curso-skills/',  label: 'Skills For Real Engineers', desc: 'Skills pra Engenheiros de Verdade', n: 7 },
              { href: 'https://inematds.github.io/skills-premium/',         label: 'Skills Premium',          desc: 'Do Iniciante ao Expert',             n: 8 },
              { href: 'https://inematds.github.io/superskills-karpathy/',   label: 'SuperSkills Karpathy',    desc: 'Skills como Funcionários Digitais',  n: 9 },
              { href: 'https://inematds.github.io/claude-skills/',          label: 'Claude Skills na Prática', desc: 'Construa Agent Skills do Claude Code', n: 10 },
              { href: 'https://inematds.github.io/claude-watch/',           label: 'claude-watch',            desc: 'Dê ao Claude olhos pra assistir vídeo', n: 11 },
              { href: 'https://inematds.github.io/grillme/',                label: 'Grill Me',                desc: 'Extraia o que está na sua cabeça',     n: 12 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-skills')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="learning-path-footer">
            <p>Skills transformam o Claude Code em especialistas sob demanda — aprenda a criar e usar as suas</p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="hero-banner">
        <div className="container">
          <img src="/doc/inemac2.jpg" alt="INEMA.CLUB" className="hero-banner-image" />
        </div>
      </section>

      {/* Trilhas de Aprendizado */}
      <section id="trilhas" className="trilhas-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>Trilhas de Aprendizado</h3>
            <p>18 trilhas temáticas — escolha seu caminho e avance com foco</p>
          </div>
          {([
            { title: '🎯 Arquitetura de IA', steps: [
              { href: 'https://inematds.github.io/arquitetura-de-intencao/', label: 'Arquitetura de Intenção', desc: 'Imersão de 3 dias — do prompt ao sistema' },
              { href: 'https://inematds.github.io/manual-oculto-ia/',        label: 'Manual Oculto',         desc: 'System Prompts como os Labs Fazem — o cérebro do Fable' },
              { href: 'https://inematds.github.io/fablelite/',               label: 'Fable Lite',            desc: 'Garimpando o Raciocínio dos Modelos' },
            ]},
            { title: '⚡ Automação', steps: [
              { href: 'https://inematds.github.io/FIA2026/', label: 'FIA2026',    desc: 'Automações com IA 2026' },
              { href: 'https://inematds.github.io/N8Nb',    label: 'N8Nb',       desc: 'Fundamentos N8N' },
              { href: 'https://inematds.github.io/N8Np',    label: 'N8Np',       desc: 'N8N Avançado' },
              { href: 'https://inematds.github.io/MAKE/',   label: 'MAKE',       desc: 'Automação com Make' },
            ]},
            { title: '✍️ Engenharia de Prompts', steps: [
              { href: 'https://inematds.github.io/FEP/',     label: 'FEP',     desc: 'Fundamentos de Prompts' },
              { href: 'https://inematds.github.io/FEP2/',    label: 'FEP2',    desc: 'Prompt Engineering Masterclass' },
              { href: 'https://inematds.github.io/prompts/', label: 'Prompts', desc: 'Engenharia de Prompts Avançada' },
              { href: 'https://inematds.github.io/FEI/',     label: 'FEI',     desc: 'Engenharia da Intenção' },
              { href: 'https://inematds.github.io/prompts-prontos/', label: 'Prompts Prontos', desc: '13 System Prompts Copiáveis' },
            ]},
            { title: '🎨 Design & Visual', steps: [
              { href: 'https://inematds.github.io/webp',      label: 'WebP',      desc: 'Designer 2026' },
              { href: 'https://inematds.github.io/FDF',       label: 'FDF',       desc: 'Designers do Futuro' },
              { href: 'https://inematds.github.io/dash/',     label: 'Dashboard', desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/VisionPro', label: 'VisionPro', desc: 'Construção Audiovisual com IA' },
            ]},
            { title: '🤖 Robótica & Humanoides', steps: [
              { href: 'https://inematds.github.io/robot/', label: 'Robot', desc: 'Robótica e Automação' },
              { href: 'https://inematds.github.io/FTH/',   label: 'FTH',   desc: 'Treinamento de Humanoides' },
              { href: 'https://inematds.github.io/HG1',    label: 'HG1',   desc: 'Academia dos Humanoides G1' },
              { href: 'https://inematds.github.io/segrobot/', label: 'segROBOT', desc: 'Requalificação Humana p/ Ambientes Robotizados' },
              { href: 'https://inematds.github.io/vla/', label: 'VLA', desc: 'Vision Language Action para Robótica' },
            ]},
            { title: '💼 Consultoria IA & Negócios', steps: [
              { href: 'https://inematds.github.io/ATIA/',        label: 'ATIA',        desc: 'Oportunidades Digitais com IA' },
              { href: 'https://inematds.github.io/FGMD/',        label: 'FGMD',        desc: 'Gatilhos Mentais Digitais' },
              { href: 'https://inematds.github.io/Playbook-IA/', label: 'Playbook-IA', desc: 'Formação de Consultoria IA' },
              { href: 'https://inematds.github.io/tiktokshop',   label: 'TikTok Shop', desc: 'Vendas no TikTok Shop' },
              { href: 'https://inematds.github.io/whatsapp-bsuid/', label: 'WhatsApp BSUID', desc: 'Privacidade e Identidade no WhatsApp' },
              { href: 'https://inematds.github.io/vendasaios/', label: 'Vendendo AIOS', desc: 'Como Vender Sistemas Operacionais de IA' },
              { href: 'https://inematds.github.io/mapacliente/', label: 'Mapa do Cliente', desc: 'Formação DICA — Consultor de IA para Pequenos Negócios' },
              { href: 'https://inematds.github.io/profissional2027x', label: 'Profissional 2027', desc: 'Implementadores de IA para PMEs — Método DPIA' },
              { href: 'https://inematds.github.io/AI-CONSULT/', label: 'AI Strategy Factory', desc: 'Estratégia de IA Completa para Qualquer Empresa' },
              { href: 'https://inematds.github.io/aiestrategia/', label: 'Fábrica de Estratégia de IA', desc: 'Curso — vire consultor de IA construindo a sua própria fábrica' },
            ]},
            { title: '📊 Dados & IA', steps: [
              { href: 'https://inematds.github.io/FDB/',       label: 'FDB',        desc: 'Fundamentos de Banco de Dados' },
              { href: 'https://inematds.github.io/DBA-FO/',    label: 'DBA-FO',     desc: 'Fundamentos DBA Oracle' },
              { href: 'https://inematds.github.io/FETD/',      label: 'FETD',       desc: 'Engenharia de Treinamento de Dados' },
              { href: 'https://inematds.github.io/notebooklm', label: 'NotebookLM', desc: 'Do Zero ao Avançado' },
            ]},
            { title: '💻 Desenvolvedor IA', steps: [
              { href: 'https://inematds.github.io/ccguide2026',          label: 'CCGuide',          desc: 'Claude Code 2026' },
              { href: 'https://inematds.github.io/6pilarccb/',           label: '6 Pilares',        desc: '6 Pilares do Claude Code' },
              { href: 'https://inematds.github.io/6pilarccfull/',        label: '6 Pilares Full',   desc: 'Edicao Completa 2026' },
              { href: 'https://inematds.github.io/agentic-workflow/',    label: 'Agentic Workflow', desc: 'Engenharia Agentic Prática' },
              { href: 'https://inematds.github.io/BMAD-Academy/',       label: 'BMAD',             desc: 'BMAD Academy' },
              { href: 'https://inematds.github.io/github/',              label: 'GitHub',           desc: 'Repositórios INEMA' },
              { href: 'https://inematds.github.io/dash/',                label: 'Dashboard',        desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/mkblogs/',              label: 'MkBlogs',          desc: 'Publicação Multi-Plataforma sem SaaS' },
            ]},
            { title: '🌱 Transformação Digital', steps: [
              { href: 'https://inematds.github.io/FTD/',  label: 'FTD',  desc: 'Formação Transformação Digital' },
              { href: 'https://inematds.github.io/TDS/',  label: 'TDS',  desc: 'Transformação Digital Sustentável' },
              { href: 'https://inematds.github.io/SHIA/', label: 'SHIA', desc: 'Super Humanos Inteligência Ampliada' },
              { href: 'https://inematds.github.io/GIPM/', label: 'GIPM', desc: 'Projetos com IA Governada' },
              { href: 'https://inematds.github.io/mentesbrilhantes1/', label: 'Mentes Brilhantes', desc: 'A Fórmula 1-20-79' },
              { href: 'https://inematds.github.io/caio/', label: 'CAIO', desc: 'Chief AI Officer 2030' },
            ]},
            { title: '🎬 Vídeos, Filmes e Cinema', steps: [
              { href: 'https://inematds.github.io/seedance2/',  label: 'Seedance 2.0', desc: 'Video com IA (ByteDance)' },
              { href: 'https://inematds.github.io/VisionPro',   label: 'VisionPro',    desc: 'Construção Audiovisual com IA' },
              { href: 'https://inematds.github.io/fpfilm1/',     label: 'FPFilm',       desc: 'Crie Filmes com IA (Freepik)' },
              { href: 'https://inematds.github.io/VISION/',      label: 'VISION',       desc: 'Visão Computacional com IA' },
              { href: 'https://inematds.github.io/promptfilmes/', label: 'Prompt Director', desc: 'Imagens e Cinema com IA' },
            ]},
            { title: '🧠 Frameworks & Assistentes', steps: [
              { href: 'https://inematds.github.io/intelecto-curso/',   label: 'INTELECTO Curso', desc: 'Do Zero ao Expert em IA — 6 trilhas, 18 módulos' },
              { href: 'https://inematds.github.io/intelecto',          label: 'INTELECTO',       desc: 'Inteligência Pessoal sem Frameworks Inchados' },
              { href: 'https://inematds.github.io/docker-openclaw/',   label: 'Docker OpenClaw', desc: 'Assistente IA Autônomo e Multi-Canal' },
              { href: 'https://inematds.github.io/deerflow/',          label: 'DeerFlow',        desc: 'Framework de Agentes ByteDance' },
              { href: 'https://inematds.github.io/agentejax/',        label: 'AgenteJAX',      desc: 'Agente de IA Pessoal em TypeScript' },
              { href: 'https://inematds.github.io/ruflo/',               label: 'Ruflo',       desc: 'Orquestração de Agentes Multi-IA' },
              { href: 'https://inematds.github.io/openhuman/',           label: 'OpenHuman',   desc: 'Assistente IA para Comunidades (Rust/Tauri)' },
            ]},
            { title: '🖥️ Claude Code', steps: [
              { href: 'https://inematds.github.io/ccodebasico/',          label: 'CC Básico',        desc: 'Do Zero: Instalação, Comandos, Skills, MCP e Cowork' },
              { href: 'https://inematds.github.io/jccode23/',             label: 'Do Zero ao Projeto', desc: 'Claude Code dos Fundamentos ao Deploy' },
              { href: 'https://inematds.github.io/claude-code-na-pratica/', label: 'Na Prática', desc: 'Do Zero ao Produto: sites, apps e automações' },
              { href: 'https://inematds.github.io/ccguide2026',           label: 'CCGuide',     desc: 'Claude Code 2026 - Completo' },
              { href: 'https://inematds.github.io/6pilarccb/',            label: '6 Pilares',   desc: '6 Pilares do Claude Code' },
              { href: 'https://inematds.github.io/6pilarccfull/',         label: '6 Pilares Full', desc: 'Edição Completa 2026' },
              { href: 'https://inematds.github.io/claudecode-estrutura/', label: 'Por Dentro',  desc: 'Arquitetura do Claude Code' },
              { href: 'https://inematds.github.io/claudecode-manual/',    label: 'Deep Dive',   desc: 'Mergulho no Código-Fonte' },
              { href: 'https://inematds.github.io/CLI-x',                label: 'CLI-x',       desc: 'Terminal como Interface dos Agentes' },
              { href: 'https://inematds.github.io/ccmastermemory/',    label: 'MasterMemory', desc: 'Memory Injection via Hooks' },
              { href: 'https://inematds.github.io/cctop/',             label: 'CCTop',        desc: 'Mestre em Contexto e Tokens' },
              { href: 'https://inematds.github.io/opus47/',            label: 'Opus 4.7',     desc: 'Dominando o Opus 4.7' },
              { href: 'https://inematds.github.io/opus48/curso/',      label: 'Opus 4.8',     desc: 'Raciocínio Híbrido, Effort Control e Dynamic Workflows' },
              { href: 'https://inematds.github.io/ccfast32/',           label: 'CCFast32',     desc: '32 Hacks do Claude Code' },
              { href: 'https://inematds.github.io/superpowers/',        label: 'Superpowers',  desc: 'Desenvolvimento com Agentes de IA' },
              { href: 'https://inematds.github.io/ccopen/',             label: 'CCOpen',       desc: 'Claude Code de Graça ou por Quase Nada' },
              { href: 'https://inematds.github.io/superskills-karpathy/', label: 'SuperSkills', desc: 'Skills como Funcionários Digitais (Karpathy)' },
              { href: 'https://inematds.github.io/curso-od/',             label: 'Open Design',  desc: 'Alternativa Open-Source ao Claude Design' },
              { href: 'https://inematds.github.io/multiagentes/',         label: 'Multiagentes', desc: 'Equipes de Agentes na Prática' },
              { href: 'https://inematds.github.io/FEC/',                  label: 'FEC',          desc: 'Engenharia de Contexto para LLM' },
              { href: 'https://inematds.github.io/power-design/',         label: 'Power Design', desc: 'Os 20 Princípios de Design' },
              { href: 'https://inematds.github.io/5niveiscc/',           label: '5 Níveis',     desc: 'Em qual nível do Claude você está?' },
              { href: 'https://inematds.github.io/pp-cli/',              label: 'Printing Press', desc: 'CLI para Agentes — 35x menos tokens que MCP' },
              { href: 'https://inematds.github.io/skills-premium/',     label: 'Skills Premium', desc: 'Skills do Iniciante ao Expert' },
              { href: 'https://inematds.github.io/mkbook/',              label: 'mkbook',         desc: 'Seu Livro em 30 Dias com Claude Code' },
              { href: 'https://inematds.github.io/mp-skill/curso-skills/', label: 'Skills Engineers', desc: 'Skills do Matt Pocock para Claude Code' },
              { href: 'https://inematds.github.io/akarpathy-skill/curso-pt/', label: 'Karpathy Guidelines', desc: '4 Princípios para Código Limpo com LLM' },
              { href: 'https://inematds.github.io/u-any/curso/', label: 'Understand Anything', desc: 'Análise de Código com LLM e Dashboards Interativos' },
              { href: 'https://inematds.github.io/manual-oculto-ia/', label: 'Manual Oculto', desc: 'System Prompts como os Labs Fazem — do Fundamento ao Cérebro do Fable' },
            ]},
            { title: '⚙️ Agentic OS', steps: [
              { href: 'https://inematds.github.io/agenticbasico/', label: 'Agentic Básico', desc: 'Fundamentos de Agentes IA — 5 Pilares + Arena' },
              { href: 'https://inematds.github.io/agenticos/',           label: 'Agentic OS',     desc: 'Sistema Operacional do Trabalho com IA' },
              { href: 'https://inematds.github.io/newagenticos/',        label: 'New Agentic OS', desc: 'Do Executivo ao Jarvis Multi-Cliente' },
              { href: 'https://inematds.github.io/curso-iamasters-os/',  label: 'iAmasters OS',   desc: 'Sistema Operativo Agêntico para Operadores de IA' },
            ]},
            { title: '🧩 Codex', steps: [
              { href: 'https://inematds.github.io/codexbasico/',        label: 'Codex Básico', desc: 'Curso Completo do Codex CLI em 6 Trilhas' },
              { href: 'https://inematds.github.io/iclaudex/',           label: 'iClaudeX',     desc: 'Planejamento com Claude + Codex no Terminal' },
              { href: 'https://inematds.github.io/makeclaudex/',        label: 'MakeClaudeX',  desc: 'Do Prompt ao Plugin de Produção' },
              { href: 'https://inematds.github.io/mastercodex/',        label: 'Master Codex', desc: 'Fábrica de SaaS com Agentes de IA' },
              { href: 'https://inematds.github.io/deepclaudex/',        label: 'DeepClaudeX',  desc: 'Multi-Modelo 70/20/10' },
              { href: 'https://inematds.github.io/ccxcx',              label: 'CCXCX',        desc: 'Claude e Codex Tool-Agnostic' },
              { href: 'https://inematds.github.io/ruflo/',              label: 'Ruflo',        desc: 'Orquestração de Agentes Multi-IA' },
            ]},
            { title: '🤝 Claude Cowork', steps: [
              { href: 'https://inematds.github.io/cccowork/',         label: 'Claude Cowork',  desc: 'Equipe de Marketing de US$ 10k/mês' },
              { href: 'https://inematds.github.io/cccoworkfull/',      label: 'Cowork Full',    desc: 'Guia Completo do Claude Cowork' },
              { href: 'https://inematds.github.io/cccoworkexec/',     label: 'Cowork Exec',    desc: 'Playbook para Treinadores de Cowork' },
            ]},
            { title: '🧬 Neurociência & Futuro', steps: [
              { href: 'https://inematds.github.io/prof2030/', label: 'Prof2030', desc: 'O Tripé do Profissional do Futuro' },
              { href: 'https://inematds.github.io/mentesbrilhantes1/', label: 'Mentes Brilhantes', desc: 'A Fórmula 1-20-79' },
              { href: 'https://inematds.github.io/prof2031CAIP', label: 'CAIP', desc: 'Certified AI Professional' },
            ]},
            { title: '🤖 Agentes Jarvis', steps: [
              { href: 'https://inematds.github.io/hermes21c/',         label: 'Hermes 21C',      desc: 'Os 21 conceitos do Hermes explicados' },
              { href: 'https://inematds.github.io/agentehermes',       label: 'Agente Hermes',   desc: 'Assistente IA Self-Hosted com Docker' },
              { href: 'https://inematds.github.io/docker-openclaw/',   label: 'Docker OpenClaw', desc: 'Assistente IA Autônomo e Multi-Canal' },
              { href: 'https://inematds.github.io/intelecto-curso/',   label: 'INTELECTO Curso', desc: 'Do Zero ao Expert em IA' },
              { href: 'https://inematds.github.io/intelecto',          label: 'INTELECTO',       desc: 'Inteligência Pessoal sem Frameworks' },
              { href: 'https://inematds.github.io/agentejax/',         label: 'AgenteJAX',       desc: 'Agente de IA Pessoal em TypeScript' },
              { href: 'https://inematds.github.io/triad',              label: 'TRIAD',            desc: 'Automação de IA Multi-Modelo com Hermes e DeepSeek' },
              { href: 'https://inematds.github.io/hnotebooklm',        label: 'Hermes+NotebookLM', desc: 'Agente AI com RAG Grátis via Telegram' },
              { href: 'https://inematds.github.io/hermesagent/',       label: 'Hermes Agent',     desc: 'Curso Completo Avançado — Nous Research' },
              { href: 'https://inematds.github.io/manual-oculto-ia/', label: 'Manual Oculto', desc: 'O Loop Operacional e a Destilação do Cérebro do Fable' },
              { href: 'https://inematds.github.io/mundo-apos-claude/',  label: 'O Mundo Após o Claude', desc: 'De usuário a maestro: construa qualquer coisa e monte seu Jarvis' },
            ]},
            { title: '🗄️ Dados & IA', steps: [
              { href: 'https://inematds.github.io/engdadosai', label: 'Eng. Dados com IA', desc: 'A Base dos Sistemas de IA e Agentes' },
            ]},
          ] as Array<{ title: string; steps: Array<{ href: string; label: string; desc: string }> }>).map((trail) => (
            <div key={trail.title} className="trilha-group">
              <h4 className="trilha-group-title">{trail.title}</h4>
              <div className="learning-path-cards">
                {trail.steps.map((p, i) => (
                  <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                     className={`path-card path-card-${(i % 4) + 1}`}
                     onClick={() => trackClick(p.href, p.label, 'trilhas')}>
                    <div className="path-number">{i + 1}</div>
                    <h4>{p.label}</h4>
                    <p>{p.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projetos */}
      <section id="comunidade" className="community-projects-section">
        <div className="container">
          <div className="community-projects-header">
            <h3>Projetos</h3>
            <p>Cards com os projetos desenvolvidos pela INEMA</p>
          </div>
          <div className="community-projects-grid">
            {sortedProjects.map((project) =>
              project.url ? (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="community-project-card community-project-card-linked"
                  onClick={() => trackClick(project.url!, project.name, 'projetos-comunidade')}
                >
                  <span className="community-project-icon">{project.icon}</span>
                  <h4>{project.name}</h4>
                  <p>{project.desc}</p>
                  <span className="community-project-badge">{project.badge ?? 'Link'}</span>
                </a>
              ) : (
                <div key={project.name} className="community-project-card">
                  <span className="community-project-icon">{project.icon}</span>
                  <h4>{project.name}</h4>
                  <p>{project.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* GitHub Repos */}
      <section id="github" className="github-section">
        <div className="container">
          <div className="github-header">
            <h3>Repositórios GitHub INEMA</h3>
            <p>Explore nossos projetos open-source e contribua com a comunidade</p>
          </div>
          <div className="github-grid">
            {repos.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Carregando repositórios…</p>
            ) : (
              repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-card"
                  onClick={() => trackClick(repo.url, repo.name, 'github')}
                >
                  <div className="github-card-header">
                    <span className="github-icon">
                      {(repo.language && LANG_ICON[repo.language]) ?? '📦'}
                    </span>
                    <h4>{repo.name}</h4>
                  </div>
                  <p className="github-description">
                    {repo.description || 'Sem descrição'}
                  </p>
                  <div className="github-stats">
                    <span className="github-stars">⭐ {repo.stars}</span>
                    {repo.language && (
                      <span className="github-stars" style={{ marginLeft: '0.75rem' }}>
                        {repo.language}
                      </span>
                    )}
                  </div>
                </a>
              ))
            )}
          </div>
          <div className="github-footer">
            <a
              href="https://github.com/inematds"
              target="_blank"
              rel="noopener noreferrer"
              className="github-view-all"
              onClick={() => trackClick('https://github.com/inematds', 'Ver todos os repositórios', 'github')}
            >
              Ver todos os repositórios no GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Hero Banners */}
      <section className="hero-banner">
        <div className="container">
          <img
            src="/doc/inemaclubee.jpg"
            alt="Crie sua equipe. Lidere o futuro."
            className="hero-banner-image"
          />
        </div>
      </section>

      {/* Telegram */}
      <section id="telegram" className="telegram-section">
        <div className="container">
          <div className="telegram-header">
            <h3>Grupos e Canais Telegram</h3>
            <p>Junte-se à nossa comunidade de aprendizado</p>
          </div>
          <div className="telegram-grid">
            {[
              { icon: '💬', name: 'INEMA.VIP - Recepção' },
              { icon: '👥', name: 'INEMA.ADULTO' },
              { icon: '🤖', name: 'INEMA.AGENTES' },
              { icon: '🎭', name: 'INEMA.AVATARES' },
              { icon: '📋', name: 'BMAD - Método' },
              { icon: '💻', name: 'INEMA.CCODE' },
              { icon: '🔧', name: 'INEMA.CODEX' },
              { icon: '💼', name: 'INEMA.CONSULT' },
              { icon: '💰', name: 'INEMA.CPA' },
              { icon: '👨‍💻', name: 'INEMA.DEV' },
              { icon: '🌐', name: 'INEMA.FTD' },
              { icon: '🧠', name: 'INEMA.IA' },
              { icon: '🖼️', name: 'INEMA.IMAGENS' },
              { icon: '🔌', name: 'INEMA.INFRA' },
              { icon: '🔤', name: 'INEMA.LLMs' },
              { icon: '⚙️', name: 'INEMA.Make' },
              { icon: '📢', name: 'INEMA.MKT' },
              { icon: '🎵', name: 'INEMA.MUSICAL' },
              { icon: '🔄', name: 'INEMA.N8N' },
              { icon: '🧬', name: 'INEMA.NCIA' },
              { icon: '✍️', name: 'INEMA.Prompts' },
              { icon: '🌱', name: 'INEMA.TDS' },
              { icon: '⚡', name: 'INEMA.TIA' },
              { icon: '🛠️', name: 'INEMA.TOOLS' },
              { icon: '📹', name: 'INEMA.VIDEOS' },
              { icon: '👁️', name: 'INEMA.VISION' },
              { icon: '🎤', name: 'INEMA.VOZ' },
            ].map((g) => (
              <div key={g.name} className="telegram-btn">
                <span className="telegram-icon">{g.icon}</span>
                <span className="telegram-name">{g.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="container">
          <a
            href="https://inema.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-link"
            onClick={() => trackClick('https://inema.vip', 'INEMA.VIP - Faça seu Cadastro', 'comunidade')}
          >
            <div className="featured-content">
              <div className="featured-logo">
                <img
                  src="/doc/conviteinemap.png"
                  alt="INEMA.VIP - Você foi convidado para a comunidade"
                />
              </div>
              <div className="featured-text">
                <h2 className="featured-title">INEMA.VIP</h2>
                <p className="featured-description">
                  Um espaço de autoaprendizado e transformação com IA e Humanoides
                </p>
              </div>
              <div className="featured-badge">Faça seu Cadastro →</div>
            </div>
          </a>
        </div>
      </section>

      {/* Social */}
      <section id="social" className="social-section">
        <div className="container">
          <div className="social-header">
            <h3>Redes Sociais INEMA</h3>
            <p>Siga-nos nas principais plataformas</p>
          </div>
          <div className="social-platforms">
            {/* TikTok */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">📱</span>
                <h4 className="platform-name">TikTok</h4>
              </div>
              <div className="social-links">
                {['@inema.tds', '@inema.tia', '@inemafuturos', '@inema.tech', '@inema.prompts', '@inema.robot', '@inema.vip'].map(
                  (handle) => (
                    <a
                      key={handle}
                      href={`https://www.tiktok.com/${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn tiktok"
                    >
                      <span>{handle}</span>
                    </a>
                  )
                )}
              </div>
            </div>
            {/* Instagram */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">📷</span>
                <h4 className="platform-name">Instagram</h4>
              </div>
              <div className="social-links">
                {['@inema.tds', '@inema.tia', '@inema.vip'].map((handle) => (
                  <a
                    key={handle}
                    href={`https://www.instagram.com/${handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                  >
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* YouTube */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">🎬</span>
                <h4 className="platform-name">YouTube</h4>
              </div>
              <div className="social-links">
                {['@inematdsx', '@inematia', '@inemaftd', '@inematec'].map((handle) => (
                  <a
                    key={handle}
                    href={`https://www.youtube.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn youtube"
                    onClick={() => trackClick(`https://www.youtube.com/${handle}`, handle, 'social')}
                  >
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Facebook */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">👍</span>
                <h4 className="platform-name">Facebook</h4>
              </div>
              <div className="social-links">
                {[
                  { handle: 'inemafuturos', url: 'https://www.facebook.com/inemafuturos' },
                  { handle: 'inematds', url: 'https://www.facebook.com/inematds' },
                ].map((fb) => (
                  <a
                    key={fb.handle}
                    href={fb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn facebook"
                  >
                    <span>{fb.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Portal INEMA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
