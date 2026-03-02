'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { platformsData, updatesData, type Course } from '@/data/courses'
import s from './PortalV2.module.css'

interface VisitStats {
  total: number
  uniqueLogged: number
  uniqueAnon: number
}

// Hook de scroll reveal
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(s.visible); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={s.reveal} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const TELEGRAM_GROUPS = [
  { icon: '💬', name: 'INEMA.VIP - Recepção',  url: 'https://t.me/inema_vip' },
  { icon: '👥', name: 'INEMA.ADULTO',           url: 'https://t.me/inema_adulto' },
  { icon: '🤖', name: 'INEMA.AGENTES',          url: 'https://t.me/inema_agentes' },
  { icon: '🎭', name: 'INEMA.AVATARES',         url: 'https://t.me/inema_avatares' },
  { icon: '📋', name: 'BMAD - Método',          url: 'https://t.me/inema_bmad' },
  { icon: '💻', name: 'INEMA.CCODE',            url: 'https://t.me/inema_ccode' },
  { icon: '🔧', name: 'INEMA.CODEX',            url: 'https://t.me/inema_codex' },
  { icon: '💼', name: 'INEMA.CONSULT',          url: 'https://t.me/inema_consult' },
  { icon: '💰', name: 'INEMA.CPA',              url: 'https://t.me/inema_cpa' },
  { icon: '👨‍💻', name: 'INEMA.DEV',              url: 'https://t.me/inema_dev' },
  { icon: '🌐', name: 'INEMA.FTD',              url: 'https://t.me/inema_ftd' },
  { icon: '🧠', name: 'INEMA.IA',               url: 'https://t.me/inema_ia' },
  { icon: '🖼️', name: 'INEMA.IMAGENS',          url: 'https://t.me/inema_imagens' },
  { icon: '🔌', name: 'INEMA.INFRA',            url: 'https://t.me/inema_infra' },
  { icon: '🔤', name: 'INEMA.LLMs',             url: 'https://t.me/inema_llms' },
  { icon: '⚙️', name: 'INEMA.Make',             url: 'https://t.me/inema_make' },
  { icon: '📢', name: 'INEMA.MKT',              url: 'https://t.me/inema_mkt' },
  { icon: '🎵', name: 'INEMA.MUSICAL',          url: 'https://t.me/inema_musical' },
  { icon: '🔄', name: 'INEMA.N8N',              url: 'https://t.me/inema_n8n' },
  { icon: '🧬', name: 'INEMA.NCIA',             url: 'https://t.me/inema_ncia' },
  { icon: '✍️', name: 'INEMA.Prompts',          url: 'https://t.me/inema_prompts' },
  { icon: '🌱', name: 'INEMA.TDS',              url: 'https://t.me/inema_tds' },
  { icon: '⚡', name: 'INEMA.TIA',              url: 'https://t.me/inema_tia' },
  { icon: '🛠️', name: 'INEMA.TOOLS',            url: 'https://t.me/inema_tools' },
  { icon: '📹', name: 'INEMA.VIDEOS',           url: 'https://t.me/inema_videos' },
  { icon: '👁️', name: 'INEMA.VISION',           url: 'https://t.me/inema_vision' },
  { icon: '🎤', name: 'INEMA.VOZ',              url: 'https://t.me/inema_voz' },
]

const GITHUB_REPOS = [
  { icon: '🖥️', name: 'sis',               desc: 'Sistema de Informações',                               stars: 0 },
  { icon: '✨', name: 'AIWCF',             desc: 'AI Website Creation Framework - Vibe Coding',           stars: 0 },
  { icon: '💄', name: 'bela360',           desc: 'Plataforma Bela 360',                                   stars: 1 },
  { icon: '🎲', name: 'bet360',            desc: 'Plataforma Bet 360',                                    stars: 0 },
  { icon: '🎓', name: 'SuperProf',         desc: 'Formação avançada para professores e educadores',       stars: 1 },
  { icon: '🤖', name: 'agent-browser',     desc: 'Agente de automação de navegador',                      stars: 0 },
  { icon: '🖼️', name: 'webp',              desc: 'Conversão e otimização de imagens WebP',                stars: 0 },
  { icon: '🎙️', name: 'DublarV4',          desc: 'Sistema de dublagem versão 4',                          stars: 1 },
  { icon: '🏛️', name: 'GIPM',              desc: 'Método de Projetos com IA Governada',                   stars: 0 },
  { icon: '🎬', name: 'VisionPro',         desc: 'Construção Audiovisual com IA',                         stars: 0 },
  { icon: '📚', name: 'BMAD-Academy',      desc: 'Academia de desenvolvimento com metodologia BMAD',      stars: 12 },
  { icon: '🐾', name: 'pet360',            desc: 'Plataforma Pet 360',                                    stars: 0 },
  { icon: '🧠', name: 'FEA-IA',            desc: 'Formação de Engenheiros de Agentes de IA',              stars: 10 },
  { icon: '✍️', name: 'FEP',               desc: 'Formação de Engenheiros de Prompts',                    stars: 7 },
  { icon: '🎤', name: 'lk_agente_v3',      desc: 'Agente de voz inteligente com LiveKit em Português',    stars: 5 },
  { icon: '📱', name: 'whatsapp-agentkit', desc: 'Kit de agentes para WhatsApp',                          stars: 4 },
  { icon: '🤝', name: 'nm82',              desc: 'Sistema de Padrinhos e Afiliados INEMA.VIP',            stars: 3 },
  { icon: '🤖', name: 'FEA',               desc: 'Formação de Engenharia de Agentes de IA',               stars: 3 },
]

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit',
  })
}

export default function PortalV2({ visitStats }: { visitStats: VisitStats }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [updatesExpanded, setUpdatesExpanded] = useState(false)

  // Registra visita
  useEffect(() => {
    async function trackVisit() {
      let sid = localStorage.getItem('animabook_sid')
      if (!sid) {
        sid = crypto.randomUUID()
        localStorage.setItem('animabook_sid', sid)
      }
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`
      await fetch('/api/visit', { method: 'POST', headers, body: JSON.stringify({ session_id: sid }) })
    }
    trackVisit()
  }, [])

  function trackClick(url: string, label: string, section: string) {
    const sid = localStorage.getItem('animabook_sid') ?? 'unknown'
    fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, url, label, section }),
    })
  }

  const filteredCourses: Course[] =
    searchTerm.trim() === ''
      ? platformsData
      : platformsData.filter((p) => {
          const t = searchTerm.toLowerCase()
          return (
            p.title.toLowerCase().includes(t) ||
            p.description.toLowerCase().includes(t) ||
            p.tags.some((tag) => tag.toLowerCase().includes(t))
          )
        })

  const visibleUpdates = updatesData.slice(0, updatesExpanded ? 20 : 5)

  return (
    <div className={s.root}>

      {/* ── Navbar ── */}
      <nav className={s.navbar} aria-label="Navegação principal">
        <div className={`${s.container} ${s.navInner}`}>
          <a href="#top" className={s.navBrand}>
            INEMA<span>.CLUB</span>
          </a>
          <div className={s.navLinks}>
            <a href="#cursos"    className={s.navLink}>Cursos</a>
            <a href="#trilha"    className={s.navLink}>Trilha</a>
            <a href="#github"    className={s.navLink}>GitHub</a>
            <a href="#comunidade" className={s.navLink}>Comunidade</a>
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
               className={s.navCta}
               onClick={() => trackClick('https://inema.vip', 'Entrar', 'navbar')}>
              Entrar →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header id="top" className={s.header}>
        <div className={s.container}>
          <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
             className={s.headerBadge}
             onClick={() => trackClick('https://inema.vip', 'Participe da Comunidade', 'header')}>
            <img src="/doc/conviteinemap.png" alt="" width={20} height={20}
                 style={{ borderRadius: 4, objectFit: 'cover' }} />
            Participe da Comunidade INEMA.VIP
          </a>
          <h1 className={s.headerTitle}>Portal INEMA.CLUB</h1>
          <p className={s.headerSub}>Acesso centralizado aos seus cursos e plataformas</p>
          <div className={s.statsRow}>
            <span className={s.statChip} title="Visualizações">👁 {visitStats.total.toLocaleString('pt-BR')}</span>
            <span className={s.statChip} title="Visitantes únicos">👤 {visitStats.uniqueAnon.toLocaleString('pt-BR')}</span>
            {visitStats.uniqueLogged > 0 && (
              <span className={s.statChip} title="Logados">🔑 {visitStats.uniqueLogged}</span>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <section className={s.heroBanner} aria-hidden="true">
        <img src="/doc/inemaclub.jpg" alt="Portal INEMA" className={s.heroBannerImg} />
      </section>

      {/* ── Recruitment ── */}
      <section className={s.sectionAlt}>
        <div className={s.container}>
          <Reveal>
            <div className={s.recruitGrid}>
              <div className={s.recruitImgWrapper}>
                <div className={s.recruitImg}>
                  <img src="/doc/7e25b078-3996-4a42-abf6-48103e2ba422.jpg"
                       alt="Crie seu time." />
                </div>
                <p className={s.recruitCaption}>
                  Comece sua jornada agora e compartilhe as trilhas especiais para iniciantes.
                  É aqui que o futuro começa — e ele precisa de você.
                </p>
              </div>
              <div className={s.recruitText}>
                <h2>Crie sua Equipe, Seu Time.<br />Nós Ajudamos.</h2>
                <p>O INEMA Clube é o ponto de partida para quem quer se preparar para o futuro.
                  Nosso foco é ajudar você a formar e desenvolver seu próprio time — pessoas com
                  propósito, visão e capacidade de atuar em um mundo onde a Inteligência Artificial
                  e a Robótica estarão em todos os lugares.</p>
                <p>O INEMA não é apenas uma plataforma de conhecimento — é uma comunidade viva,
                  feita por pessoas que acreditam no poder do aprendizado, da inovação e da
                  colaboração para transformar o futuro.</p>
                <p className={s.recruitCta}>
                  Você está pronto para criar, liderar e construir o amanhã conosco?
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trilha ── */}
      <section id="trilha" className={s.section}>
        <div className={s.container}>
          <Reveal>
            <div className={s.sectionHeader}>
              <span className={s.sectionLabel}>Por onde começar</span>
              <h2 className={s.sectionTitle}>Trilha para Iniciantes</h2>
              <p className={s.sectionDesc}>Comece sua jornada com os cursos essenciais, nesta ordem recomendada</p>
            </div>
          </Reveal>
          <div className={s.pathGrid}>
            {[
              { href: 'https://inematds.github.io/FEP/',    label: 'FEP',    desc: 'Fundamentos de Engenharia de Prompts' },
              { href: 'https://inematds.github.io/ATIA/',   label: 'ATIA',   desc: 'AI Tools in Action' },
              { href: 'https://inematds.github.io/FDB/',    label: 'FDB',    desc: 'Fundamentos de Banco de Dados' },
              { href: 'https://inematds.github.io/VISION/', label: 'Vision', desc: 'Processamento de Imagens com IA' },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 80}>
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                   className={s.pathCard}
                   onClick={() => trackClick(p.href, p.label, 'trilha')}>
                  <div className={s.pathNum}>{i + 1}</div>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <div className={s.pathFooter}>
              Após completar esta trilha, explore outros cursos conforme seu interesse abaixo
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cursos ── */}
      <section id="cursos" className={s.sectionAlt}>
        <div className={s.container}>
          <Reveal>
            <div className={s.sectionHeader}>
              <span className={s.sectionLabel}>Biblioteca de cursos</span>
              <h2 className={s.sectionTitle}>Cursos e Plataformas</h2>
              <p className={s.sectionDesc}>Explore todo o conteúdo disponível na plataforma</p>
            </div>
          </Reveal>

          {/* Updates */}
          <Reveal>
            <div className={s.updatesBox}>
              <div className={s.updatesHead} onClick={() => setUpdatesExpanded(v => !v)}
                   role="button" aria-expanded={updatesExpanded}>
                <h3>Últimas Atualizações</h3>
                <span className={s.updatesToggle}>{updatesExpanded ? 'Ver menos ↑' : 'Ver mais ↓'}</span>
              </div>
              <div className={`${s.updatesList} ${updatesExpanded ? s.expanded : ''}`}>
                {visibleUpdates.map((u, i) => (
                  <a key={i} className={s.updateItem} href={u.url}
                     target="_blank" rel="noopener noreferrer"
                     onClick={() => trackClick(u.url, u.title, 'atualizacoes')}>
                    <span className={s.updateDate}>{formatDate(u.date)}</span>
                    <span className={`${s.updateBadge} ${u.type === 'novo' ? s.badgeNovo : s.badgeAtualizado}`}>
                      {u.type}
                    </span>
                    <span className={s.updateTitle}>{u.title}</span>
                    <span className={s.updateArrow}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Search */}
          <Reveal>
            <div className={s.searchWrap}>
              <span className={s.searchIcon}>🔍</span>
              <label htmlFor="v2-search" className={s.srOnly}>Buscar cursos</label>
              <input
                id="v2-search"
                type="search"
                className={s.searchInput}
                placeholder="Buscar cursos ou plataformas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchTerm('') }}
              />
            </div>
          </Reveal>

          {/* Cards */}
          <div className={s.cardsGrid}>
            {filteredCourses.length === 0 ? (
              <div className={s.emptyState}>
                <div className={s.emptyIcon}>🔍</div>
                <p>Nenhuma plataforma encontrada para &ldquo;{searchTerm}&rdquo;</p>
              </div>
            ) : (
              filteredCourses.map((course, i) => (
                <Reveal key={course.id} delay={(i % 3) * 60}>
                  <div className={s.card}>
                    <div className={s.cardIcon}>{course.icon}</div>
                    <h2 className={s.cardTitle}>{course.title}</h2>
                    <p className={s.cardDesc}>{course.description}</p>
                    <div className={s.cardTags}>
                      {course.tags.map((tag) => (
                        <span key={tag} className={s.tag}>{tag}</span>
                      ))}
                    </div>
                    <a href={course.url} className={s.cardBtn}
                       target="_blank" rel="noopener noreferrer"
                       aria-label={`Acessar ${course.title}`}
                       onClick={() => trackClick(course.url, course.title, 'cursos')}>
                      Acessar plataforma →
                    </a>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── GitHub ── */}
      <section id="github" className={s.section}>
        <div className={s.container}>
          <Reveal>
            <div className={s.sectionHeader}>
              <span className={s.sectionLabel}>Open source</span>
              <h2 className={s.sectionTitle}>Repositórios GitHub INEMA</h2>
              <p className={s.sectionDesc}>Explore nossos projetos e contribua com a comunidade</p>
            </div>
          </Reveal>
          <div className={s.githubGrid}>
            {GITHUB_REPOS.map((repo, i) => (
              <Reveal key={repo.name} delay={(i % 4) * 50}>
                <a href={`https://github.com/inematds/${repo.name}`}
                   target="_blank" rel="noopener noreferrer"
                   className={s.githubCard}
                   aria-label={`${repo.name} — ${repo.desc}`}
                   onClick={() => trackClick(`https://github.com/inematds/${repo.name}`, repo.name, 'github')}>
                  <div className={s.githubCardHead}>
                    <span>{repo.icon}</span>
                    <h4>{repo.name}</h4>
                  </div>
                  <p className={s.githubDesc}>{repo.desc}</p>
                  <span className={s.githubStars}>⭐ {repo.stars}</span>
                </a>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="https://github.com/inematds" target="_blank" rel="noopener noreferrer"
               className={s.githubViewAll}
               onClick={() => trackClick('https://github.com/inematds', 'Ver todos', 'github')}>
              Ver todos os repositórios no GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── Hero banner 2 ── */}
      <section className={s.heroBanner} aria-hidden="true">
        <img src="/doc/inemac2.jpg" alt="" className={s.heroBannerImg} />
      </section>

      {/* ── INEMA.VIP Featured ── */}
      <section id="comunidade" className={s.featuredSection}>
        <div className={s.container}>
          <Reveal>
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
               className={s.featuredCard}
               onClick={() => trackClick('https://inema.vip', 'INEMA.VIP — Faça seu Cadastro', 'comunidade')}>
              <div className={s.featuredLogo}>
                <img src="/doc/conviteinemap.png" alt="INEMA.VIP" />
              </div>
              <div className={s.featuredText}>
                <h2>INEMA.VIP</h2>
                <p>Um espaço de autoaprendizado e transformação com IA e Humanoides</p>
              </div>
              <div className={s.featuredCta}>Faça seu Cadastro →</div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Telegram ── */}
      <section className={s.sectionAlt}>
        <div className={s.container}>
          <Reveal>
            <div className={s.sectionHeader}>
              <span className={s.sectionLabel}>Comunidade</span>
              <h2 className={s.sectionTitle}>Grupos e Canais Telegram</h2>
              <p className={s.sectionDesc}>Junte-se à nossa comunidade de aprendizado</p>
            </div>
          </Reveal>
          <Reveal>
            <div className={s.telegramGrid}>
              {TELEGRAM_GROUPS.map((g) => (
                <a key={g.name} href={g.url} target="_blank" rel="noopener noreferrer"
                   className={s.telegramBtn}
                   onClick={() => trackClick(g.url, g.name, 'telegram')}>
                  <span>{g.icon}</span>
                  <span>{g.name}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Hero banner 3 ── */}
      <section className={s.heroBanner} aria-hidden="true">
        <img src="/doc/inemaclubee.jpg" alt="" className={s.heroBannerImg} />
      </section>

      {/* ── Social ── */}
      <section className={s.section}>
        <div className={s.container}>
          <Reveal>
            <div className={s.sectionHeader}>
              <span className={s.sectionLabel}>Siga-nos</span>
              <h2 className={s.sectionTitle}>Redes Sociais INEMA</h2>
              <p className={s.sectionDesc}>Acompanhe o INEMA nas principais plataformas</p>
            </div>
          </Reveal>
          <div className={s.socialGrid}>
            {[
              {
                icon: '📱', name: 'TikTok', cls: 'tiktok',
                links: [
                  { handle: '@inema.tds',     url: 'https://www.tiktok.com/@inema.tds' },
                  { handle: '@inema.tia',     url: 'https://www.tiktok.com/@inema.tia' },
                  { handle: '@inemafuturos',  url: 'https://www.tiktok.com/@inemafuturos' },
                  { handle: '@inema.tech',    url: 'https://www.tiktok.com/@inema.tech' },
                  { handle: '@inema.prompts', url: 'https://www.tiktok.com/@inema.prompts' },
                  { handle: '@inema.robot',   url: 'https://www.tiktok.com/@inema.robot' },
                ],
              },
              {
                icon: '📷', name: 'Instagram', cls: 'instagram',
                links: [
                  { handle: '@inema.tds', url: 'https://www.instagram.com/inema.tds' },
                  { handle: '@inema.tia', url: 'https://www.instagram.com/inema.tia' },
                ],
              },
              {
                icon: '🎬', name: 'YouTube', cls: 'youtube',
                links: [
                  { handle: '@inematdsx', url: 'https://www.youtube.com/@inematdsx' },
                ],
              },
              {
                icon: '👍', name: 'Facebook', cls: 'facebook',
                links: [
                  { handle: 'inemafuturos', url: 'https://www.facebook.com/inemafuturos' },
                  { handle: 'inematds',     url: 'https://www.facebook.com/inematds' },
                ],
              },
            ].map((platform) => (
              <Reveal key={platform.name}>
                <div className={s.socialCard}>
                  <div className={s.socialCardHead}>
                    <span>{platform.icon}</span>
                    <h4>{platform.name}</h4>
                  </div>
                  <div className={s.socialLinks}>
                    {platform.links.map((link) => (
                      <a key={link.handle} href={link.url}
                         target="_blank" rel="noopener noreferrer"
                         className={`${s.socialBtn} ${s[platform.cls as keyof typeof s] ?? ''}`}
                         onClick={() => trackClick(link.url, link.handle, 'social')}>
                        {link.handle}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={s.footer}>
        <div className={s.container}>
          <p>
            &copy; 2025 Portal INEMA. Todos os direitos reservados. &nbsp;·&nbsp;&nbsp;
            <a href="/stats">Estatísticas</a>
            &nbsp;·&nbsp;&nbsp;
            <a href="/">Versão atual</a>
          </p>
        </div>
      </footer>

    </div>
  )
}
