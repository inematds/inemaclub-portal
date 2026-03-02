# Sistema de Contador de Visitas e Painel /stats
**Guia completo e reutilizável — Next.js + Supabase**

---

## Visão Geral

Este sistema faz três coisas:
1. **Conta toda visita** à página (pageviews)
2. **Identifica visitantes únicos** por dispositivo/browser (sem login)
3. **Rastreia cliques** em links externos com indicação de qual seção da página
4. **Exibe tudo** em um painel em `/stats` com gráficos e tabelas

Não usa cookies. Não precisa de login. Funciona com qualquer usuário anônimo.

---

## Stack necessária

- **Next.js** (App Router) — versão 14 ou superior
- **Supabase** — banco de dados PostgreSQL gerenciado + autenticação opcional
- Nenhuma biblioteca de gráfico necessária (CSS puro)

---

## Parte 1 — Banco de Dados (Supabase)

### Tabela `visits` — registra cada acesso à página

```sql
create table visits (
  id         uuid default gen_random_uuid() primary key,
  session_id text not null,
  user_id    uuid references auth.users,  -- null se visitante anônimo
  created_at timestamptz default now()
);

alter table visits enable row level security;

-- Qualquer pessoa pode inserir (visitante sem conta)
create policy "visits insert public" on visits
  for insert with check (true);

-- Leitura bloqueada para anon — só service role lê (server-side)
```

### Tabela `clicks` — registra cada clique em link externo

```sql
create table clicks (
  id         uuid default gen_random_uuid() primary key,
  session_id text not null,
  url        text not null,
  label      text,     -- texto do link clicado
  section    text,     -- nome da seção onde estava o link
  created_at timestamptz default now()
);

alter table clicks enable row level security;

create policy "clicks insert public" on clicks
  for insert with check (true);
```

---

## Parte 2 — Variáveis de Ambiente

Criar arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

Em produção (Vercel, Netlify, etc.), adicionar essas três variáveis no painel de configuração da plataforma.

---

## Parte 3 — Cliente Supabase

### `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Usado no browser (componentes client)
export const supabase = createClient(
  url  || 'https://placeholder.supabase.co',
  anon || 'placeholder'
)

// Usado server-side — nunca exposto ao browser
export const supabaseAdmin = createClient(
  url  || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder'
)
```

---

## Parte 4 — API Routes

### `src/app/api/visit/route.ts` — registra uma visita

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { session_id } = await req.json()

  // Detecta usuário logado pelo JWT no header (opcional)
  let user_id: string | null = null
  const auth = req.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const { data: { user } } = await supabaseAdmin.auth.getUser(auth.slice(7))
    user_id = user?.id ?? null
  }

  const { error } = await supabaseAdmin
    .from('visits')
    .insert({ session_id, user_id })

  if (error) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

### `src/app/api/click/route.ts` — registra um clique

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { session_id, url, label, section } = await req.json()

  const { error } = await supabaseAdmin
    .from('clicks')
    .insert({ session_id, url, label, section })

  if (error) return NextResponse.json({ ok: false }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

---

## Parte 5 — Leitura das Estatísticas (Server Component)

### `src/app/page.tsx` — busca os dados e passa para o componente

```typescript
import { supabaseAdmin } from '@/lib/supabase'
import MeuComponente from '@/components/MeuComponente'

export const revalidate = 60 // atualiza cache a cada 60 segundos

export default async function Home() {
  let visitStats = { total: 0, uniqueLogged: 0, uniqueAnon: 0 }

  try {
    const { data: visits } = await supabaseAdmin
      .from('visits')
      .select('user_id, session_id')

    if (visits) {
      visitStats = {
        total:        visits.length,
        uniqueLogged: new Set(visits.filter(v => v.user_id).map(v => v.user_id)).size,
        uniqueAnon:   new Set(visits.filter(v => !v.user_id).map(v => v.session_id)).size,
      }
    }
  } catch {
    // Supabase não configurado — retorna zeros
  }

  return <MeuComponente visitStats={visitStats} />
}
```

> **Nota:** Se o site já existia antes do sistema ser instalado e você quiser que os contadores reflitam um histórico anterior, some constantes fixas ao `total` e ao `uniqueAnon` antes de passar para o componente. Isso é uma decisão de negócio — tecnicamente o banco só conta a partir do dia que foi instalado.

---

## Parte 6 — Componente Client (registra visita e cliques)

### `src/components/MeuComponente.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface VisitStats {
  total: number
  uniqueLogged: number
  uniqueAnon: number
}

export default function MeuComponente({ visitStats }: { visitStats: VisitStats }) {

  // ── Registra visita ao montar o componente ──
  useEffect(() => {
    async function trackVisit() {
      // Recupera ou cria um ID único para este browser/dispositivo
      let sid = localStorage.getItem('meu_site_sid')
      if (!sid) {
        sid = crypto.randomUUID()
        localStorage.setItem('meu_site_sid', sid)
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' }

      // Inclui token JWT se o usuário estiver logado (opcional)
      const { data: { session } } = await supabase.auth.getSession()
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

  // ── Função para rastrear cliques ──
  function trackClick(url: string, label: string, section: string) {
    const sid = localStorage.getItem('meu_site_sid') ?? 'unknown'
    fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, url, label, section }),
    })
  }

  return (
    <>
      {/* Exibir contadores */}
      <span>👁 {visitStats.total}</span>
      <span>👤 {visitStats.uniqueAnon}</span>

      {/* Exemplo de link rastreado */}
      <a
        href="https://exemplo.com/curso"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick('https://exemplo.com/curso', 'Nome do Curso', 'cursos')}
      >
        Acessar curso
      </a>
    </>
  )
}
```

---

## Parte 7 — Painel /stats

### `src/app/stats/page.tsx`

O painel é um Server Component que:
1. Busca todas as visitas e cliques do Supabase
2. Calcula métricas no servidor
3. Renderiza gráficos em CSS puro (sem biblioteca)

```typescript
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 60

export default async function StatsPage() {
  let visits: { session_id: string; created_at: string }[] = []
  let clicks: { url: string; label: string | null; section: string | null; created_at: string }[] = []

  try {
    const [v, c] = await Promise.all([
      supabaseAdmin.from('visits').select('session_id, created_at').order('created_at'),
      supabaseAdmin.from('clicks').select('url, label, section, created_at').order('created_at'),
    ])
    visits = v.data ?? []
    clicks = c.data ?? []
  } catch { /* Supabase indisponível */ }

  // ── Métricas de visitas ──
  const totalViews    = visits.length
  const uniqueVisitors = new Set(visits.map(v => v.session_id)).size
  const today = new Date().toISOString().slice(0, 10)
  const todayVisits = visits.filter(v => v.created_at.slice(0, 10) === today).length

  // ── Visitas por dia (últimos 14 dias) ──
  const visitsByDay: Record<string, number> = {}
  for (const v of visits) {
    const day = v.created_at.slice(0, 10)
    visitsByDay[day] = (visitsByDay[day] ?? 0) + 1
  }
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    return d.toISOString().slice(0, 10)
  })

  // ── Cliques por seção ──
  const bySection: Record<string, number> = {}
  for (const c of clicks) {
    const sec = c.section ?? 'outros'
    bySection[sec] = (bySection[sec] ?? 0) + 1
  }
  const sectionData = Object.entries(bySection).sort((a, b) => b[1] - a[1])
  const maxSection  = Math.max(...sectionData.map(s => s[1]), 1)

  // ── Top links clicados ──
  const linkMap: Record<string, { url: string; label: string; section: string; count: number }> = {}
  for (const c of clicks) {
    if (!linkMap[c.url]) {
      linkMap[c.url] = { url: c.url, label: c.label ?? c.url, section: c.section ?? '-', count: 0 }
    }
    linkMap[c.url].count++
  }
  const topLinks = Object.values(linkMap).sort((a, b) => b.count - a.count).slice(0, 20)

  const maxDay = Math.max(...last14Days.map(d => visitsByDay[d] ?? 0), 1)

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e2e8f0',
                  fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem' }}>
          📊 Estatísticas
        </h1>

        {/* Cards de resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '👁',  label: 'Visualizações',    value: totalViews },
            { icon: '👤',  label: 'Visitantes Únicos', value: uniqueVisitors },
            { icon: '🖱️', label: 'Cliques',           value: clicks.length },
            { icon: '📅',  label: 'Acessos Hoje',     value: todayVisits },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e293b', borderRadius: 12,
                                           padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                {card.value.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '.8rem', color: '#64748b' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Gráfico de barras — últimos 14 dias */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem',
                      border: '1px solid #334155', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Acessos — últimos 14 dias
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {last14Days.map(day => {
              const count = visitsByDay[day] ?? 0
              const fmt   = new Date(day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
              return (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: '.65rem', color: '#64748b' }}>{count || ''}</span>
                  <div style={{
                    width: '100%',
                    background: count > 0 ? '#6366f1' : '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: 4,
                    height: `${Math.max((count / maxDay) * 90, count > 0 ? 8 : 2)}px`,
                  }} />
                  <span style={{ fontSize: '.6rem', color: '#475569', writingMode: 'vertical-rl',
                                 transform: 'rotate(180deg)' }}>
                    {fmt}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cliques por seção — barras horizontais */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem',
                      border: '1px solid #334155', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Cliques por seção
          </h2>
          {sectionData.length === 0
            ? <p style={{ color: '#475569', fontSize: '.85rem' }}>Nenhum clique ainda.</p>
            : sectionData.map(([sec, count]) => (
                <div key={sec} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                                marginBottom: 4, fontSize: '.85rem' }}>
                    <span style={{ textTransform: 'capitalize' }}>{sec}</span>
                    <span style={{ color: '#94a3b8' }}>{count}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: '#0f172a', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(count / maxSection) * 100}%`,
                      background: '#6366f1',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              ))
          }
        </div>

        {/* Tabela — top links */}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem',
                      border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Links mais clicados
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                {['#', 'Link', 'Seção', 'Cliques'].map(h => (
                  <th key={h} style={{ padding: '.5rem .75rem', color: '#64748b',
                                       textAlign: h === 'Cliques' ? 'right' : 'left', fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topLinks.map((link, i) => (
                <tr key={link.url} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '.6rem .75rem', color: '#475569' }}>{i + 1}</td>
                  <td style={{ padding: '.6rem .75rem' }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                       style={{ color: '#818cf8', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </td>
                  <td style={{ padding: '.6rem .75rem', color: '#94a3b8' }}>{link.section}</td>
                  <td style={{ padding: '.6rem .75rem', textAlign: 'right', fontWeight: 600 }}>
                    {link.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
```

---

## Como funciona — Resumo do fluxo

```
Usuário abre o site
  │
  ├─ Browser verifica localStorage por "meu_site_sid"
  │    ├─ Não existe → gera UUID → salva → usa
  │    └─ Existe → reutiliza o mesmo
  │
  ├─ POST /api/visit { session_id }
  │    └─ Supabase INSERT em visits
  │
  └─ Usuário clica em link externo
       └─ POST /api/click { session_id, url, label, section }
            └─ Supabase INSERT em clicks

Servidor (a cada 60s ou a cada request)
  └─ SELECT * FROM visits → calcula total e únicos
  └─ SELECT * FROM clicks → calcula por seção e top links
  └─ Passa para o componente via props
```

---

## Conceitos-chave

**Visitante único:** identificado pelo `session_id` no `localStorage`. Enquanto o usuário não limpar o storage do browser, o mesmo ID é reutilizado — conta como um único visitante independente de quantas vezes recarregar.

**Visualizações (pageviews):** total de linhas na tabela `visits`. Sobe a cada reload, mesmo do mesmo visitante. É o equivalente ao "pageview" do Google Analytics.

**Seção do clique:** string livre que você define no `onClick` de cada link (`'cursos'`, `'header'`, `'github'`, etc.). Permite saber qual parte da página gera mais engajamento.

**Segurança:** a tabela só aceita INSERT de qualquer usuário (RLS policy). SELECT é bloqueado para a chave anônima — apenas o `SUPABASE_SERVICE_ROLE_KEY` (usado server-side, nunca no browser) consegue ler os dados.

---

## Checklist para replicar em outro site

- [ ] Criar projeto no Supabase
- [ ] Rodar os dois SQLs (tabelas `visits` e `clicks`)
- [ ] Copiar `src/lib/supabase.ts`
- [ ] Copiar `src/app/api/visit/route.ts`
- [ ] Copiar `src/app/api/click/route.ts`
- [ ] Copiar `src/app/stats/page.tsx`
- [ ] No `page.tsx` principal: buscar visitas e passar como props
- [ ] No componente cliente: adicionar `useEffect` com `trackVisit()` e função `trackClick()`
- [ ] Adicionar `onClick={() => trackClick(url, label, 'seção')}` nos links que quiser monitorar
- [ ] Configurar as 3 variáveis de ambiente (local e em produção)
