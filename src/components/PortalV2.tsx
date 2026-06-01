'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { platformsData, updatesData, type Course } from '@/data/courses'
import s from './PortalV2.module.css'

interface VisitStats { total: number; uniqueLogged: number; uniqueAnon: number }

/* ── Scroll Reveal ── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(s.vis); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${s.reveal} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Dados estáticos ── */
const TELEGRAM = [
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

const REPOS = [
  { icon: '📚', name: 'BMAD-Academy',      desc: 'Academia de desenvolvimento com metodologia BMAD',      stars: 12 },
  { icon: '🧠', name: 'FEA-IA',            desc: 'Formação de Engenheiros de Agentes de IA',              stars: 10 },
  { icon: '✍️', name: 'FEP',               desc: 'Formação de Engenheiros de Prompts',                    stars: 7 },
  { icon: '🎤', name: 'lk_agente_v3',      desc: 'Agente de voz inteligente com LiveKit em Português',    stars: 5 },
  { icon: '📱', name: 'whatsapp-agentkit', desc: 'Kit de agentes para WhatsApp',                          stars: 4 },
  { icon: '🤝', name: 'nm82',              desc: 'Sistema de Padrinhos e Afiliados INEMA.VIP',            stars: 3 },
  { icon: '🤖', name: 'FEA',               desc: 'Formação de Engenharia de Agentes de IA',               stars: 3 },
  { icon: '💄', name: 'bela360',           desc: 'Plataforma Bela 360',                                   stars: 1 },
  { icon: '🎓', name: 'SuperProf',         desc: 'Formação avançada para professores e educadores',       stars: 1 },
  { icon: '🎙️', name: 'DublarV4',          desc: 'Sistema de dublagem versão 4',                          stars: 1 },
  { icon: '✨', name: 'AIWCF',             desc: 'AI Website Creation Framework - Vibe Coding',           stars: 0 },
  { icon: '🖥️', name: 'sis',               desc: 'Sistema de Informações',                               stars: 0 },
  { icon: '🎲', name: 'bet360',            desc: 'Plataforma Bet 360',                                    stars: 0 },
  { icon: '🤖', name: 'agent-browser',     desc: 'Agente de automação de navegador',                      stars: 0 },
  { icon: '🖼️', name: 'webp',              desc: 'Conversão e otimização de imagens WebP',                stars: 0 },
  { icon: '🏛️', name: 'GIPM',              desc: 'Método de Projetos com IA Governada',                   stars: 0 },
  { icon: '🎬', name: 'VisionPro',         desc: 'Construção Audiovisual com IA',                         stars: 0 },
  { icon: '🐾', name: 'pet360',            desc: 'Plataforma Pet 360',                                    stars: 0 },
  { icon: '🎥', name: 'seedance2',         desc: 'App de Geração de Vídeo com IA',                         stars: 0 },
  { icon: '🤝', name: 'iclaudex',          desc: 'Planejamento Inteligente com Claude + Codex',             stars: 0 },
]

function fmt(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

/* ================================================================ */
export default function PortalV2({ visitStats }: { visitStats: VisitStats }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    async function track() {
      let sid = localStorage.getItem('animabook_sid')
      if (!sid) { sid = crypto.randomUUID(); localStorage.setItem('animabook_sid', sid) }
      const hdrs: Record<string, string> = { 'Content-Type': 'application/json' }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) hdrs['Authorization'] = `Bearer ${session.access_token}`
      fetch('/api/visit', { method: 'POST', headers: hdrs, body: JSON.stringify({ session_id: sid }) })
    }
    track()
  }, [])

  function click(url: string, label: string, section: string) {
    const sid = localStorage.getItem('animabook_sid') ?? 'unknown'
    fetch('/api/click', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, url, label, section }) })
  }

  const courses: Course[] = search.trim() === '' ? platformsData
    : platformsData.filter(p => {
        const t = search.toLowerCase()
        return p.title.toLowerCase().includes(t) || p.description.toLowerCase().includes(t)
          || p.tags.some(tag => tag.toLowerCase().includes(t))
      })

  const updates = updatesData.slice(0, expanded ? 20 : 5)

  return (
    <div className={s.root}>

      {/* ── Navbar ── */}
      <nav className={s.nav} aria-label="Navegação principal">
        <div className={`${s.wrap} ${s.navWrap}`}>
          <a href="#inicio" className={s.navLogo}>INEMA<em>.CLUB</em></a>
          <div className={s.navMenu}>
            <a href="#cursos"      className={s.navItem}>Cursos</a>
            <a href="#trilha"      className={s.navItem}>Trilha</a>
            <a href="#trilha-vibe" className={s.navItem}>Trilha Vibe</a>
            <a href="#trilhas"     className={s.navItem}>Trilhas</a>
            <a href="#github"    className={s.navItem}>GitHub</a>
            <a href="#comunidade" className={s.navItem}>Projetos</a>
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
               className={s.navBtn}
               onClick={() => click('https://inema.vip', 'Entrar', 'navbar')}>
              Entrar →
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — full viewport, orbe animado
      ══════════════════════════════════════════ */}
      <section id="inicio" className={s.hero}>
        <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
           className={s.heroBadge}
           onClick={() => click('https://inema.vip', 'badge comunidade', 'hero')}>
          Participe da Comunidade INEMA.VIP
        </a>

        <h1 className={s.heroTitle}>
          Portal<br /><span>INEMA.CLUB</span>
        </h1>

        <p className={s.heroSub}>
          Acesso centralizado a cursos, ferramentas e comunidade de IA do Brasil.
        </p>

        <div className={s.heroStats}>
          <div className={s.heroStat}>
            <strong>{visitStats.total.toLocaleString('pt-BR')}</strong>
            <span>Visualizações</span>
          </div>
          <div className={s.heroStat}>
            <strong>{visitStats.uniqueAnon.toLocaleString('pt-BR')}</strong>
            <span>Visitantes únicos</span>
          </div>
          <div className={s.heroStat}>
            <strong>{platformsData.length}</strong>
            <span>Cursos</span>
          </div>
        </div>

        <div className={s.heroCtas}>
          <a href="#cursos" className={s.ctaPrimary}
             onClick={() => click('#cursos', 'explorar cursos', 'hero')}>
            Explorar cursos →
          </a>
          <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
             className={s.ctaSecondary}
             onClick={() => click('https://inema.vip', 'entrar comunidade', 'hero')}>
            Entrar na comunidade
          </a>
        </div>

        <div className={s.scrollHint}>
          <span>scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── Banner full-bleed ── */}
      <div className={s.fullBleed}>
        <img src="/doc/inemaclub.jpg" alt="Portal INEMA" />
      </div>

      {/* ══════════════════════════════════════════
          01 — MISSÃO
      ══════════════════════════════════════════ */}
      <section className={s.sectionDark}>
        <div className={s.wrap}>
          <div className={s.recruitGrid}>
            <Reveal>
              <div>
                <div className={s.recruitImg}>
                  <img src="/doc/7e25b078-3996-4a42-abf6-48103e2ba422.jpg" alt="Crie seu time." />
                </div>
                <p className={s.recruitCaption}>
                  Comece sua jornada e compartilhe as trilhas especiais para iniciantes.
                  É aqui que o futuro começa — e ele precisa de você.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={s.recruitText}>
                <div className={s.sectionTop}>
                  <span className={s.sectionNum}>01</span>
                  <span className={s.sectionLine} />
                  <span className={s.sectionLabel}>Nossa Missão</span>
                </div>
                <h2>Crie sua Equipe.<br />Nós Ajudamos.</h2>
                <p>O INEMA Clube é o ponto de partida para quem quer se preparar para o futuro.
                  Ajudamos você a formar e desenvolver seu próprio time — pessoas com propósito,
                  visão e capacidade de atuar em um mundo onde a IA estará em todos os lugares.</p>
                <p>Não é apenas uma plataforma de conhecimento — é uma comunidade viva, feita
                  por pessoas que acreditam no poder do aprendizado e da inovação.</p>
                <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
                   className={s.recruitCta}
                   onClick={() => click('https://inema.vip', 'quero fazer parte', 'missao')}>
                  Quero fazer parte →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 — TRILHA
      ══════════════════════════════════════════ */}
      <section id="trilha" className={s.section}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>02</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Por onde começar</span>
            </div>
            <h2 className={s.sectionTitle}>Trilha para Iniciantes</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              Siga esta ordem recomendada para construir uma base sólida em IA
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className={s.pathRow}>
              {[
                { href: 'https://inematds.github.io/FEP/',    label: 'FEP',    desc: 'Fundamentos de Engenharia de Prompts',   tag: 'Passo 1' },
                { href: 'https://inematds.github.io/ATIA/',   label: 'ATIA',   desc: 'AI Tools in Action',                    tag: 'Passo 2' },
                { href: 'https://inematds.github.io/FDB/',    label: 'FDB',    desc: 'Fundamentos de Banco de Dados',         tag: 'Passo 3' },
                { href: 'https://inematds.github.io/VISION/', label: 'Vision', desc: 'Processamento de Imagens com IA',      tag: 'Passo 4' },
              ].map((p, i) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                   className={s.pathCard}
                   onClick={() => click(p.href, p.label, 'trilha')}>
                  <div className={s.pathNum}>0{i + 1}</div>
                  <span className={s.pathTag}>{p.tag}</span>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                  <span className={s.pathArrow}>Acessar →</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className={s.pathNote}>
              Após completar esta trilha, explore os demais cursos abaixo conforme seu interesse
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03 — TRILHA VIBE CODE
      ══════════════════════════════════════════ */}
      <section id="trilha-vibe" className={s.sectionDark}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>03</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Construa com IA</span>
            </div>
            <h2 className={s.sectionTitle}>Trilha Vibe Code</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              Do conceito à engenharia — crie software com IA de ponta a ponta
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className={s.pathRow}>
              {[
                { href: 'https://inematds.github.io/vibecode',  label: 'Vibe Coding',  desc: 'Da Ideia ao Produto com IA',           tag: 'Passo 1' },
                { href: 'https://inematds.github.io/skills',    label: 'Skills',       desc: 'Agent Skills Mastery',                 tag: 'Passo 2' },
                { href: 'https://inematds.github.io/agentic/',  label: 'Agentic',      desc: 'Engenharia de Agentic Masterclass',    tag: 'Passo 3' },
              ].map((p, i) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                   className={s.pathCard}
                   onClick={() => click(p.href, p.label, 'trilha-vibe')}>
                  <div className={s.pathNum}>0{i + 1}</div>
                  <span className={s.pathTag}>{p.tag}</span>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                  <span className={s.pathArrow}>Acessar →</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className={s.pathNote}>
              Trilha completa para dominar o desenvolvimento de software com IA — do vibe ao agente
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04 — CURSOS
      ══════════════════════════════════════════ */}
      <section id="cursos" className={s.sectionDark}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>04</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Biblioteca completa</span>
            </div>
            <h2 className={s.sectionTitle}>Cursos e Plataformas</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              {platformsData.length} cursos disponíveis — encontre o seu
            </p>
          </Reveal>

          <Reveal>
            <div className={s.updBox}>
              <div className={s.updHead} onClick={() => setExpanded(v => !v)}
                   role="button" aria-expanded={expanded}>
                <h3>Últimas Atualizações</h3>
                <span className={s.updToggle}>{expanded ? 'Ver menos ↑' : 'Ver mais ↓'}</span>
              </div>
              <div className={`${s.updList} ${expanded ? s.exp : ''}`}>
                {updates.map((u, i) => (
                  <a key={i} className={s.updItem} href={u.url}
                     target="_blank" rel="noopener noreferrer"
                     onClick={() => click(u.url, u.title, 'atualizacoes')}>
                    <span className={s.updDate}>{fmt(u.date)}</span>
                    <span className={`${s.updBadge} ${u.type === 'novo' ? s.bNovo : s.bUpd}`}>{u.type}</span>
                    <span className={s.updTitle}>{u.title}</span>
                    <span className={s.updArrow}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={s.searchBox}>
              <span className={s.searchIco}>🔍</span>
              <label htmlFor="v3search" className={s.sr}>Buscar cursos</label>
              <input id="v3search" type="search" className={s.searchIn}
                placeholder="Buscar cursos ou plataformas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') setSearch('') }} />
            </div>
          </Reveal>

          <div className={s.bento}>
            {courses.length === 0 ? (
              <div className={s.emptyState}>
                <div className={s.emptyIco}>🔍</div>
                <p>Nenhum resultado para &ldquo;{search}&rdquo;</p>
              </div>
            ) : courses.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 40} className={s.bentoCard}>
                <span className={s.bentoIcon}>{c.icon}</span>
                <h2 className={s.bentoTitle}>{c.title}</h2>
                <p className={s.bentoDesc}>{c.description}</p>
                <div className={s.bentoTags}>
                  {c.tags.map(t => <span key={t} className={s.bentoTag}>{t}</span>)}
                </div>
                <a href={c.url} className={s.bentoBtn}
                   target="_blank" rel="noopener noreferrer"
                   aria-label={`Acessar ${c.title}`}
                   onClick={() => click(c.url, c.title, 'cursos')}>
                  Acessar →
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner ── */}
      <div className={s.fullBleed}>
        <img src="/doc/inemac2.jpg" alt="" />
      </div>

      {/* ══════════════════════════════════════════
          05 — TRILHAS
      ══════════════════════════════════════════ */}
      <section id="trilhas" className={s.section}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>05</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Percursos temáticos</span>
            </div>
            <h2 className={s.sectionTitle}>Trilhas de Aprendizado</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              17 trilhas temáticas — escolha seu caminho e avance com foco
            </p>
          </Reveal>

          {([
            { title: '⚡ Automação', steps: [
              { href: 'https://inematds.github.io/FIA2026/', label: 'FIA2026',    desc: 'Automações com IA 2026' },
              { href: 'https://inematds.github.io/N8Nb',    label: 'N8Nb',       desc: 'Fundamentos N8N' },
              { href: 'https://inematds.github.io/N8Np',    label: 'N8Np',       desc: 'N8N Avançado' },
              { href: 'https://inematds.github.io/MAKE/',   label: 'MAKE',       desc: 'Automação com Make' },
            ]},
            { title: '✍️ Engenharia de Prompts', steps: [
              { href: 'https://inematds.github.io/FEP/',      label: 'FEP',     desc: 'Fundamentos de Prompts' },
              { href: 'https://inematds.github.io/FEP2/',     label: 'FEP2',    desc: 'Prompt Engineering Masterclass' },
              { href: 'https://inematds.github.io/prompts/',  label: 'Prompts', desc: 'Engenharia de Prompts Avançada' },
              { href: 'https://inematds.github.io/FEI/',      label: 'FEI',     desc: 'Engenharia da Intenção' },
            ]},
            { title: '🎨 Design & Visual', steps: [
              { href: 'https://inematds.github.io/webp',       label: 'WebP',       desc: 'Designer 2026' },
              { href: 'https://inematds.github.io/FDF',        label: 'FDF',        desc: 'Designers do Futuro' },
              { href: 'https://inematds.github.io/dash/',      label: 'Dashboard',  desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/VisionPro',  label: 'VisionPro',  desc: 'Construção Audiovisual com IA' },
            ]},
            { title: '🤖 Robótica & Humanoides', steps: [
              { href: 'https://inematds.github.io/robot/', label: 'Robot', desc: 'Robótica e Automação' },
              { href: 'https://inematds.github.io/FTH/',   label: 'FTH',   desc: 'Treinamento de Humanoides' },
              { href: 'https://inematds.github.io/HG1',    label: 'HG1',   desc: 'Academia dos Humanoides G1' },
              { href: 'https://inematds.github.io/segrobot/', label: 'segROBOT', desc: 'Requalificação Humana p/ Ambientes Robotizados' },
            ]},
            { title: '💼 Consultoria IA & Negócios', steps: [
              { href: 'https://inematds.github.io/ATIA/',        label: 'ATIA',       desc: 'Oportunidades Digitais com IA' },
              { href: 'https://inematds.github.io/FGMD/',        label: 'FGMD',       desc: 'Gatilhos Mentais Digitais' },
              { href: 'https://inematds.github.io/Playbook-IA/', label: 'Playbook-IA',desc: 'Formação de Consultoria IA' },
              { href: 'https://inematds.github.io/tiktokshop',   label: 'TikTok Shop',desc: 'Vendas no TikTok Shop' },
              { href: 'https://inematds.github.io/whatsapp-bsuid/', label: 'WhatsApp BSUID', desc: 'Privacidade e Identidade no WhatsApp' },
              { href: 'https://inematds.github.io/vendasaios/', label: 'Vendendo AIOS', desc: 'Como Vender Sistemas Operacionais de IA' },
              { href: 'https://inematds.github.io/mapacliente/', label: 'Mapa do Cliente', desc: 'Formação DICA — Consultor de IA para Pequenos Negócios' },
              { href: 'https://inematds.github.io/profissional2027x', label: 'Profissional 2027', desc: 'Implementadores de IA para PMEs — Método DPIA' },
            ]},
            { title: '📊 Dados & IA', steps: [
              { href: 'https://inematds.github.io/FDB/',       label: 'FDB',       desc: 'Fundamentos de Banco de Dados' },
              { href: 'https://inematds.github.io/DBA-FO/',    label: 'DBA-FO',    desc: 'Fundamentos DBA Oracle' },
              { href: 'https://inematds.github.io/FETD/',      label: 'FETD',      desc: 'Engenharia de Treinamento de Dados' },
              { href: 'https://inematds.github.io/notebooklm', label: 'NotebookLM',desc: 'Do Zero ao Avançado' },
            ]},
            { title: '💻 Desenvolvedor IA', steps: [
              { href: 'https://inematds.github.io/ccguide2026',   label: 'CCGuide',   desc: 'Claude Code 2026' },
              { href: 'https://inematds.github.io/BMAD-Academy/', label: 'BMAD',      desc: 'BMAD Academy' },
              { href: 'https://inematds.github.io/github/',        label: 'GitHub',    desc: 'Repositórios INEMA' },
              { href: 'https://inematds.github.io/dash/',          label: 'Dashboard', desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/mkblogs/',    label: 'MkBlogs',   desc: 'Publicação Multi-Plataforma sem SaaS' },
            ]},
            { title: '🌱 Transformação Digital', steps: [
              { href: 'https://inematds.github.io/FTD/',   label: 'FTD',   desc: 'Formação Transformação Digital' },
              { href: 'https://inematds.github.io/TDS/',   label: 'TDS',   desc: 'Transformação Digital Sustentável' },
              { href: 'https://inematds.github.io/SHIA/',  label: 'SHIA',  desc: 'Super Humanos Inteligência Ampliada' },
              { href: 'https://inematds.github.io/GIPM/',  label: 'GIPM',  desc: 'Projetos com IA Governada' },
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
              { href: 'https://inematds.github.io/ruflo/',               label: 'Ruflo',         desc: 'Orquestração de Agentes Multi-IA' },
              { href: 'https://inematds.github.io/openhuman/',           label: 'OpenHuman',     desc: 'Assistente IA para Comunidades (Rust/Tauri)' },
            ]},
            { title: '🖥️ Claude Code', steps: [
              { href: 'https://inematds.github.io/ccguide2026',          label: 'CCGuide',          desc: 'Claude Code 2026 - Completo' },
              { href: 'https://inematds.github.io/6pilarccb/',           label: '6 Pilares',        desc: '6 Pilares do Claude Code' },
              { href: 'https://inematds.github.io/6pilarccfull/',        label: '6 Pilares Full',   desc: '6 Pilares - Edição Completa' },
              { href: 'https://inematds.github.io/claudecode-estrutura/', label: 'Por Dentro',      desc: 'Arquitetura do Claude Code' },
              { href: 'https://inematds.github.io/claudecode-manual/',   label: 'Deep Dive',        desc: 'Mergulho no Código-Fonte' },
              { href: 'https://inematds.github.io/CLI-x',               label: 'CLI-x',            desc: 'Terminal como Interface dos Agentes' },
              { href: 'https://inematds.github.io/ccmastermemory/',    label: 'MasterMemory',     desc: 'Memory Injection via Hooks' },
              { href: 'https://inematds.github.io/cctop/',             label: 'CCTop',            desc: 'Mestre em Contexto e Tokens' },
              { href: 'https://inematds.github.io/opus47/',            label: 'Opus 4.7',         desc: 'Dominando o Opus 4.7' },
              { href: 'https://inematds.github.io/opus48/curso/',      label: 'Opus 4.8',         desc: 'Raciocínio Híbrido, Effort Control e Dynamic Workflows' },
              { href: 'https://inematds.github.io/ccfast32/',           label: 'CCFast32',         desc: '32 Hacks do Claude Code' },
              { href: 'https://inematds.github.io/superpowers/',        label: 'Superpowers',      desc: 'Desenvolvimento com Agentes de IA' },
              { href: 'https://inematds.github.io/ccopen/',             label: 'CCOpen',           desc: 'Claude Code de Graça ou por Quase Nada' },
              { href: 'https://inematds.github.io/superskills-karpathy/', label: 'SuperSkills',    desc: 'Skills como Funcionários Digitais (Karpathy)' },
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
            ]},
            { title: '⚙️ Agentic OS', steps: [
              { href: 'https://inematds.github.io/agenticbasico/', label: 'Agentic Básico', desc: 'Fundamentos de Agentes IA — 5 Pilares + Arena' },
              { href: 'https://inematds.github.io/agenticos/',           label: 'Agentic OS',     desc: 'Sistema Operacional do Trabalho com IA' },
              { href: 'https://inematds.github.io/newagenticos/',        label: 'New Agentic OS', desc: 'Do Executivo ao Jarvis Multi-Cliente' },
              { href: 'https://inematds.github.io/curso-iamasters-os/',  label: 'iAmasters OS',   desc: 'Sistema Operativo Agêntico para Operadores de IA' },
              { href: 'https://inematds.github.io/aiosagi/',             label: 'AIOS',           desc: 'AI Agent Operating System — Rutgers AGI' },
            ]},
            { title: '🧩 Codex', steps: [
              { href: 'https://inematds.github.io/iclaudex/',           label: 'iClaudeX',     desc: 'Planejamento com Claude + Codex no Terminal' },
              { href: 'https://inematds.github.io/makeclaudex/',        label: 'MakeClaudeX',  desc: 'Do Prompt ao Plugin de Produção' },
              { href: 'https://inematds.github.io/mastercodex/',        label: 'Master Codex', desc: 'Fábrica de SaaS com Agentes de IA' },
              { href: 'https://inematds.github.io/deepclaudex/',        label: 'DeepClaudeX',  desc: 'Multi-Modelo 70/20/10' },
              { href: 'https://inematds.github.io/ccxcx',              label: 'CCXCX',        desc: 'Claude e Codex Tool-Agnostic' },
              { href: 'https://inematds.github.io/ruflo/',              label: 'Ruflo',        desc: 'Orquestração de Agentes Multi-IA' },
              { href: 'https://inematds.github.io/polyskills',          label: 'PolySkills',   desc: 'Claude Code & Codex lado a lado' },
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
              { href: 'https://inematds.github.io/agentehermes',       label: 'Agente Hermes',   desc: 'Assistente IA Self-Hosted com Docker' },
              { href: 'https://inematds.github.io/docker-openclaw/',   label: 'Docker OpenClaw', desc: 'Assistente IA Autônomo e Multi-Canal' },
              { href: 'https://inematds.github.io/intelecto-curso/',   label: 'INTELECTO Curso', desc: 'Do Zero ao Expert em IA' },
              { href: 'https://inematds.github.io/intelecto',          label: 'INTELECTO',       desc: 'Inteligência Pessoal sem Frameworks' },
              { href: 'https://inematds.github.io/agentejax/',         label: 'AgenteJAX',       desc: 'Agente de IA Pessoal em TypeScript' },
              { href: 'https://inematds.github.io/triad',              label: 'TRIAD',            desc: 'Automação de IA Multi-Modelo com Hermes e DeepSeek' },
              { href: 'https://inematds.github.io/hnotebooklm',        label: 'Hermes+NotebookLM', desc: 'Agente AI com RAG Grátis via Telegram' },
              { href: 'https://inematds.github.io/hermesagent/',       label: 'Hermes Agent',     desc: 'Curso Completo Avançado — Nous Research' },
            ]},
            { title: '🗄️ Dados & IA', steps: [
              { href: 'https://inematds.github.io/engdadosai', label: 'Eng. Dados com IA', desc: 'A Base dos Sistemas de IA e Agentes' },
            ]},
          ] as Array<{ title: string; steps: Array<{ href: string; label: string; desc: string }> }>).map((trail, ti) => (
            <Reveal key={trail.title} delay={ti * 30}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.2rem', opacity: 0.9 }}>
                  {trail.title}
                </h3>
                <div className={s.pathRow}>
                  {trail.steps.map((p, i) => (
                    <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                       className={s.pathCard}
                       onClick={() => click(p.href, p.label, 'trilhas')}>
                      <div className={s.pathNum}>0{i + 1}</div>
                      <span className={s.pathTag}>Passo {i + 1}</span>
                      <h4>{p.label}</h4>
                      <p>{p.desc}</p>
                      <span className={s.pathArrow}>Acessar →</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 — GITHUB
      ══════════════════════════════════════════ */}
      <section id="github" className={s.section}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>06</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Open Source</span>
            </div>
            <h2 className={s.sectionTitle}>Repositórios GitHub</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              Projetos abertos da comunidade INEMA — contribua e aprenda
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className={s.ghGrid}>
              {REPOS.map((r, i) => (
                <a key={r.name} href={`https://github.com/inematds/${r.name}`}
                   target="_blank" rel="noopener noreferrer"
                   className={s.ghCard}
                   aria-label={`${r.name} — ${r.desc}`}
                   onClick={() => click(`https://github.com/inematds/${r.name}`, r.name, 'github')}>
                  <div className={s.ghHead}>
                    <span>{r.icon}</span>
                    <h4>{r.name}</h4>
                  </div>
                  <p className={s.ghDesc}>{r.desc}</p>
                  <span className={s.ghStars}>⭐ {r.stars}</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className={s.ghFooter}>
              <a href="https://github.com/inematds" target="_blank" rel="noopener noreferrer"
                 className={s.ghAll}
                 onClick={() => click('https://github.com/inematds', 'ver todos', 'github')}>
                Ver todos os repositórios →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          07 — INEMA.VIP
      ══════════════════════════════════════════ */}
      <section id="comunidade" className={s.featSection}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop} style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
              <span className={s.sectionNum}>07</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Projetos</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer"
               className={s.featCard}
               onClick={() => click('https://inema.vip', 'INEMA.VIP CTA', 'comunidade')}>
              <div className={s.featImg}>
                <img src="/doc/conviteinemap.png" alt="INEMA.VIP" />
              </div>
              <div className={s.featText}>
                <h2>INEMA.VIP</h2>
                <p>Um espaço de autoaprendizado e transformação com IA e Humanoides.
                  Junte-se a uma comunidade que está construindo o futuro agora.</p>
              </div>
              <div className={s.featBtn}>Faça seu Cadastro →</div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 — TELEGRAM
      ══════════════════════════════════════════ */}
      <section className={s.sectionDark}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>08</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Grupos e canais</span>
            </div>
            <h2 className={s.sectionTitle}>Telegram INEMA</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              27 grupos temáticos — escolha os que fazem sentido para você
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className={s.tgGrid}>
              {TELEGRAM.map(g => (
                <a key={g.name} href={g.url} target="_blank" rel="noopener noreferrer"
                   className={s.tgBtn}
                   onClick={() => click(g.url, g.name, 'telegram')}>
                  <span>{g.icon}</span>
                  <span>{g.name}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Banner ── */}
      <div className={s.fullBleed}>
        <img src="/doc/inemaclubee.jpg" alt="" />
      </div>

      {/* ══════════════════════════════════════════
          07 — SOCIAL
      ══════════════════════════════════════════ */}
      <section className={s.section}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.sectionTop}>
              <span className={s.sectionNum}>09</span>
              <span className={s.sectionLine} />
              <span className={s.sectionLabel}>Siga-nos</span>
            </div>
            <h2 className={s.sectionTitle}>Redes Sociais</h2>
            <p className={s.sectionSub} style={{ marginBottom: '3rem' }}>
              Acompanhe o INEMA nas principais plataformas
            </p>
          </Reveal>
          <div className={s.socialGrid}>
            {[
              { icon: '📱', name: 'TikTok', cls: 'tiktok',
                links: [
                  { h: '@inema.tds',     u: 'https://www.tiktok.com/@inema.tds' },
                  { h: '@inema.tia',     u: 'https://www.tiktok.com/@inema.tia' },
                  { h: '@inemafuturos',  u: 'https://www.tiktok.com/@inemafuturos' },
                  { h: '@inema.tech',    u: 'https://www.tiktok.com/@inema.tech' },
                  { h: '@inema.prompts', u: 'https://www.tiktok.com/@inema.prompts' },
                  { h: '@inema.robot',   u: 'https://www.tiktok.com/@inema.robot' },
                ]},
              { icon: '📷', name: 'Instagram', cls: 'instagram',
                links: [
                  { h: '@inema.tds', u: 'https://www.instagram.com/inema.tds' },
                  { h: '@inema.tia', u: 'https://www.instagram.com/inema.tia' },
                ]},
              { icon: '🎬', name: 'YouTube', cls: 'youtube',
                links: [{ h: '@inematdsx', u: 'https://www.youtube.com/@inematdsx' }]},
              { icon: '👍', name: 'Facebook', cls: 'facebook',
                links: [
                  { h: 'inemafuturos', u: 'https://www.facebook.com/inemafuturos' },
                  { h: 'inematds',     u: 'https://www.facebook.com/inematds' },
                ]},
            ].map(p => (
              <Reveal key={p.name}>
                <div className={s.socialCard}>
                  <div className={s.socialHead}>
                    <span>{p.icon}</span>
                    <h4>{p.name}</h4>
                  </div>
                  <div className={s.socialLinks}>
                    {p.links.map(l => (
                      <a key={l.h} href={l.u} target="_blank" rel="noopener noreferrer"
                         className={`${s.socialBtn} ${s[p.cls as keyof typeof s] ?? ''}`}
                         onClick={() => click(l.u, l.h, 'social')}>
                        {l.h}
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
        <div className={s.wrap}>
          <p>
            &copy; 2025 Portal INEMA · <a href="/stats">Estatísticas</a> · <a href="/">Versão atual</a>
          </p>
        </div>
      </footer>

    </div>
  )
}
