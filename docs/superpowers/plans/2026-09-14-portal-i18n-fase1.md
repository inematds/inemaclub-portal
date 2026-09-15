# Portal i18n — Fase 1 (casca multilíngue PT/EN/ES) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `inema.club/en/` e `inema.club/es/` como versões da home com interface, metadados e chat no idioma do visitante, mantendo um único repo, um único deploy e os dados de cursos/projetos intocados.

**Architecture:** A home continua sendo o `Portal.tsx`, que passa a receber `locale` e a ler os textos de interface de dicionários JSON (`src/i18n/messages/{pt,en,es}.json`). Como o `<html lang>` só pode ser trocado em root layout, o app passa a ter três root layouts via route groups (`app/(pt)`, `app/(en)/en`, `app/(es)/es`) compartilhando um `RootShell`. Os cursos e projetos seguem em português (modelo híbrido): cards ganham um selo "PT" nas versões EN/ES, e uma seção nova "Disponível em inglês/espanhol" lista os cursos já traduzidos (lista vazia no início, cresce nas fases seguintes).

**Tech Stack:** Next.js 16.1.6 (App Router, `trailingSlash: true`), React 19, TypeScript 5, `node --test` (sem dependências novas), Supabase Edge Function (Deno) para o chat.

**Spec:** A decisão de produto está na conversa de 2026-09-14 (portal único, rotas por idioma, opção 3 híbrida). Este plano é a especificação executável; não há documento separado.

## Global Constraints

- **Autor dos commits:** `NeiMaldaner <nei.maldaner2014@gmail.com>` (author e committer). Conferir `git config user.email` antes do primeiro commit. Mensagens no estilo do repo: `portal: <o que fez>`.
- **`tools/gen-courses-data.mjs` extrai `communityProjects` do `Portal.tsx` por regex** (`const communityProjects: Array<{...}> = [`). Nenhuma tarefa pode renomear, mover ou retipar esse array. Toda tarefa que toca `Portal.tsx` termina com `npm run gen:data && git diff --exit-code src/data/courses.data.json` (saída vazia = nada mudou).
- **Não editar** `src/data/courses.ts` nem `src/data/novidades.ts` (gerado). Não tocar `data.js`, `index.html`, `styles.css`, `script.js` (legado).
- **Blocos sob `SHOW_DETALHES && (...)` ficam em português.** Só os textos visíveis com `SHOW_DETALHES = false` entram no dicionário.
- **Nomes de cursos, projetos, grupos Telegram e handles sociais não se traduzem.** São nomes próprios do conteúdo (ex.: "Fundamentos de Engenharia de Prompts" é o nome do curso FEP).
- **URLs:** PT continua em `/`; EN em `/en/`; ES em `/es/`. Sem redirect automático por `Accept-Language`.
- **Deploy do site = `git push` em `main`.** Deploy da Edge Function é passo separado: `npx supabase functions deploy chat`.
- **Verificações disponíveis:** `npx tsc --noEmit`, `npm run build`, `npm test` (criado na Task 1), `npm run gen:data`.
- **Versão:** bump `package.json` de `0.1.0` para `0.2.0` (minor: carrega o patch, não zera).

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `src/i18n/locales.ts` | Tipo `Locale`, lista de locales, `DEFAULT_LOCALE`, mapas `HTML_LANG`, `OG_LOCALE`, `INTL_LOCALE`, `LOCALE_LABEL`, helper `localeHome()`. |
| `src/i18n/messages/pt.json`, `en.json`, `es.json` | Dicionários de interface. Mesmas chaves nos três. |
| `src/i18n/dictionary.ts` | `getDictionary(locale)` tipado a partir do `pt.json`. |
| `tests/i18n.test.mjs` | Paridade de chaves entre os três JSON e ausência de valores vazios. |
| `src/components/RootShell.tsx` | `<html lang>` + `<head>` (origin trial, Plausible) + `<body>` com `InemaWebMCP` e `AgenteChat`. Usado pelos três root layouts. |
| `src/lib/root-metadata.ts` | `buildRootMetadata(locale)` com título, descrição, OpenGraph, Twitter e `alternates.languages` (hreflang). |
| `src/lib/home-page.ts` | `getVisitStats()` e `buildHomeJsonLd(locale)` (extraídos do `page.tsx` atual). |
| `src/components/HomePage.tsx` | Server component: busca stats, injeta JSON-LD, renderiza `<Portal locale=... />`. |
| `src/app/(pt)/layout.tsx`, `src/app/(pt)/page.tsx`, `src/app/(pt)/cursos/**`, `src/app/(pt)/conhecimento/**`, `src/app/(pt)/stats/**` | Rotas PT (movidas; URLs não mudam). |
| `src/app/(en)/en/layout.tsx`, `src/app/(en)/en/page.tsx` | Home EN. |
| `src/app/(es)/es/layout.tsx`, `src/app/(es)/es/page.tsx` | Home ES. |
| `src/app/globals.css` | Estilos do seletor de idioma, do selo PT e da seção "Disponível em". |
| `src/components/Portal.tsx` | Recebe `locale`, usa `t = getDictionary(locale)`, seletor de idioma, selo PT, seção de cursos traduzidos. |
| `src/data/translated-courses.ts` | Lista tipada de cursos/projetos já traduzidos (fora do `courses.ts`). Vazia na fase 1. |
| `src/components/AgenteChat/widget.ts` | Textos do widget por idioma, `locale` no payload, prefixo `/en`/`/es` no `navigate_to`. |
| `supabase/functions/_shared/prompts.ts`, `supabase/functions/chat/index.ts` | Prompt responde no idioma do visitante; `locale` aceito no body. |
| `CLAUDE.md` | Seção "Idiomas (i18n)". |

Ficam na raiz de `src/app/` (route handlers e arquivos de metadata não precisam de layout): `api/**`, `feed.xml/`, `llms.txt/`, `courses-sitemap.xml/`, `robots.ts`, `globals.css`.

---

### Task 1: Núcleo i18n (locales, dicionários JSON, teste de paridade)

**Files:**
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/messages/pt.json`
- Create: `src/i18n/messages/en.json`
- Create: `src/i18n/messages/es.json`
- Create: `src/i18n/dictionary.ts`
- Create: `tests/i18n.test.mjs`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: `type Locale = 'pt' | 'en' | 'es'`; `LOCALES: readonly Locale[]`; `DEFAULT_LOCALE: 'pt'`; `HTML_LANG: Record<Locale, string>`; `OG_LOCALE: Record<Locale, string>`; `INTL_LOCALE: Record<Locale, string>`; `LOCALE_LABEL: Record<Locale, string>`; `localeHome(locale: Locale): string` (`'/'`, `'/en/'`, `'/es/'`); `getDictionary(locale: Locale): Dictionary`; `type Dictionary = typeof pt`.

- [ ] **Step 1: Escrever o teste de paridade (falha porque os arquivos não existem)**

`tests/i18n.test.mjs`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'src', 'i18n', 'messages')
const LOCALES = ['pt', 'en', 'es']

function load(locale) {
  return JSON.parse(readFileSync(path.join(DIR, `${locale}.json`), 'utf8'))
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]
  )
}

test('os três dicionários têm exatamente as mesmas chaves', () => {
  const keys = Object.fromEntries(LOCALES.map((l) => [l, flatten(load(l)).map(([k]) => k).sort()]))
  assert.deepEqual(keys.en, keys.pt, 'en.json diverge de pt.json')
  assert.deepEqual(keys.es, keys.pt, 'es.json diverge de pt.json')
})

test('nenhum valor vazio ou não-string', () => {
  for (const locale of LOCALES) {
    for (const [key, value] of flatten(load(locale))) {
      assert.equal(typeof value, 'string', `${locale}:${key} não é string`)
      assert.ok(value.trim().length > 0, `${locale}:${key} está vazio`)
    }
  }
})

test('pt.json tem as chaves usadas pelo Portal', () => {
  const pt = flatten(load('pt')).map(([k]) => k)
  for (const required of ['header.tagline', 'nav.trails', 'beginners.title', 'translated.empty', 'footer.copyright']) {
    assert.ok(pt.includes(required), `falta ${required}`)
  }
})
```

- [ ] **Step 2: Adicionar o script de teste e rodar para ver falhar**

Em `package.json`, dentro de `"scripts"`, adicionar: `"test": "node --test tests/"`.

Run: `npm test`
Expected: FAIL com `ENOENT ... src/i18n/messages/pt.json`.

- [ ] **Step 3: Criar `src/i18n/locales.ts`**

```ts
export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }
export const INTL_LOCALE: Record<Locale, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }
export const LOCALE_LABEL: Record<Locale, string> = { pt: 'PT', en: 'EN', es: 'ES' }

/** Caminho da home em cada idioma. PT fica na raiz; os outros têm prefixo. */
export function localeHome(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
```

- [ ] **Step 4: Criar `src/i18n/messages/pt.json`**

Os valores são os textos que hoje estão hardcoded no `Portal.tsx` (linhas 428–2159, fora dos blocos `SHOW_DETALHES`), copiados sem alteração.

```json
{
  "langSwitcher": { "label": "Idioma" },
  "header": {
    "communityBadge": "Participe da Comunidade",
    "proBadge": "Assine o INEMA.PRO",
    "logo": "INEMA.CLUB Portal INEMA",
    "tagline": "Acesso centralizado aos seus cursos e plataformas",
    "chipVisits": "acessos",
    "chipUnique": "visitantes únicos",
    "chipLogged": "logados"
  },
  "nav": {
    "search": "🔍 Buscas",
    "beginners": "📘 Iniciantes",
    "courses": "🎓 Cursos",
    "trails": "🗺️ Trilhas",
    "projects": "🚀 Projetos",
    "telegram": "💬 Telegram",
    "social": "📱 Social",
    "pro": "⭐ INEMA.PRO"
  },
  "hero": {
    "imageAlt": "INEMA.CLUB — Aprenda. Pratique. Evolua. O ecossistema para dominar IA na prática.",
    "caption": "Aprenda. Pratique. Evolua. — uma base sólida de conhecimento em IA, para aplicar no trabalho, nos projetos e na carreira.",
    "title": "Construa uma base sólida de conhecimento em IA.",
    "body": "O INEMA Club é um ecossistema de aprendizado prático para quem quer dominar inteligência artificial e aplicar IA no trabalho, nos projetos e na carreira. A ideia central é simples: aprender, praticar e evoluir com IA de forma contínua."
  },
  "search": {
    "title": "O que você quer aprender hoje?",
    "body": "Pesquise os cursos públicos do INEMA por tema, ferramenta ou objetivo. Mesmo sem WebMCP, você pode continuar manualmente pelo catálogo.",
    "label": "Tema ou objetivo",
    "placeholder": "Ex.: WebMCP, agentes, automação",
    "button": "Buscar cursos",
    "catalogNote": "O catálogo de cursos está em português."
  },
  "events": {
    "gestao2027Alt": "Gestão de Agentes 2027 — o novo papel das empresas. Mesma liderança, uma nova força de trabalho: humanos + agentes = mais valor.",
    "agiAlt": "AGI chegou — não é mais sobre fazer tudo, é sobre comandar agentes. A era dos super-agentes começou.",
    "content2videoAlt": "Content2Video — um link entra, um vídeo sai",
    "webmcpAlt": "WebMCP — evento INEMA",
    "musicavideoAlt": "INEMA MUSICAVIDEO — crie músicas e clipes em escala, de ideia ao hit",
    "destaqueAlt": "Curso INEMACCBOT com Promoavatar",
    "eventoAlt": "Evento INEMA"
  },
  "beginners": {
    "title": "Trilha para Iniciantes",
    "subtitle": "Comece sua jornada com os cursos essenciais, nesta ordem recomendada",
    "body": "Não é uma lista aleatória: é uma progressão. Você começa aprendendo a falar com a IA (FEP), vê essas habilidades em ação (ATIA), constrói a base técnica de dados (FDB) e amplia para imagens (Vision). Só então entra nas ferramentas de agente de código — Claude Code e Codex — que juntam tudo isso na prática, antes de colocar um projeto real no ar (Do Zero ao Deploy) e fechar construindo seu próprio sistema de IA (INTELECTO). Pular etapas cria lacunas: os cursos mais à frente presumem a base dos anteriores.",
    "footer": "Após completar esta trilha, explore outros cursos conforme seu interesse abaixo",
    "guideButton": "📖 Veja o guia com a importância de cada curso",
    "ptPill": "PT",
    "ptPillTitle": "Curso em português"
  },
  "iaZero": {
    "title": "🌱 Nunca usou IA? Comece pelo IA do Zero",
    "subtitle": "Antes do passo 1 da trilha: quatro aulas curtas, um kit de vinte pedidos prontos e, na sequência, o FEP reescrito para 2026",
    "body": "Sem nada técnico e sem instalar nada. Você aprende as três partes de um pedido, os quatro botões do chat, o que conferir antes de repassar, e sai com o seu próprio kit de cinco pedidos preenchido e testado. Quando terminar, o FEP 2026 mostra o que mudou na forma de pedir agora que a AGI chegou, e a trilha acima faz sentido."
  },
  "novidades": {
    "title": "Últimas Novidades",
    "more": "Ver mais",
    "less": "Ver menos",
    "readVip": "Ler no INEMA.VIP →",
    "openLink": "Abrir link →",
    "ptNote": "Conteúdo em português."
  },
  "updates": {
    "coursesTitle": "Últimas Atualizações de Cursos",
    "projectsTitle": "Últimas Atualizações de Projetos"
  },
  "perfis": {
    "topoAlt": "Descubra como usar IA para evoluir na sua profissão",
    "operacionalAlt": "Profissional Operacional — mais produtividade com IA",
    "empreendedorAlt": "Empreendedor Estratégico com IA",
    "liberalAlt": "Profissional Liberal Experiente com IA",
    "gestorAlt": "Gestor e Líder — lidere melhor com IA"
  },
  "proBanner": { "alt": "INEMA.PRO — A plataforma para quem quer usar IA para crescer na prática" },
  "trails": {
    "title": "Trilhas de Aprendizado do INEMA.PRO",
    "subtitle": "Escolha seu caminho e avance com foco — o conteúdo completo de cada trilha está no INEMA.PRO"
  },
  "projects": {
    "title": "Projetos",
    "subtitle": "Projetos desenvolvidos pela INEMA — prontos para baixar e usar",
    "ctaLine": "projetos prontos para baixar e usar",
    "ctaBody": "Aplicativos, agentes, skills e ferramentas construídos pela comunidade INEMA, com código e guia de uso."
  },
  "translated": {
    "title": "Disponível em português",
    "subtitle": "Cursos e projetos do INEMA já publicados neste idioma",
    "empty": "Estamos traduzindo o catálogo. Os primeiros cursos neste idioma aparecem aqui assim que forem publicados."
  },
  "banners": {
    "clubAlt": "INEMA.CLUB",
    "teamAlt": "Crie sua equipe. Lidere o futuro."
  },
  "telegram": {
    "title": "Grupos e Canais Telegram",
    "subtitle": "Junte-se à nossa comunidade de aprendizado"
  },
  "vip": {
    "alt": "INEMA.VIP - Você foi convidado para a comunidade",
    "title": "INEMA.VIP",
    "description": "Um espaço de autoaprendizado e transformação com IA e Humanoides",
    "badge": "Faça seu Cadastro →"
  },
  "social": {
    "title": "Redes Sociais INEMA",
    "subtitle": "Siga-nos nas principais plataformas"
  },
  "footer": { "copyright": "© 2025 Portal INEMA. Todos os direitos reservados." }
}
```

Se, ao executar a Task 3, aparecer um texto visível em PT que não está aqui (o levantamento foi feito por regex e pode ter perdido parágrafos multilinha), **adicionar a chave nos três JSON** seguindo o mesmo agrupamento por seção. O teste de paridade garante que os três ficam sincronizados.

- [ ] **Step 5: Criar `src/i18n/messages/en.json`**

```json
{
  "langSwitcher": { "label": "Language" },
  "header": {
    "communityBadge": "Join the Community",
    "proBadge": "Subscribe to INEMA.PRO",
    "logo": "INEMA.CLUB Portal INEMA",
    "tagline": "One place for all your courses and platforms",
    "chipVisits": "visits",
    "chipUnique": "unique visitors",
    "chipLogged": "logged in"
  },
  "nav": {
    "search": "🔍 Search",
    "beginners": "📘 Beginners",
    "courses": "🎓 Courses",
    "trails": "🗺️ Paths",
    "projects": "🚀 Projects",
    "telegram": "💬 Telegram",
    "social": "📱 Social",
    "pro": "⭐ INEMA.PRO"
  },
  "hero": {
    "imageAlt": "INEMA.CLUB — Learn. Practice. Evolve. The ecosystem for mastering AI in practice.",
    "caption": "Learn. Practice. Evolve. — a solid AI knowledge base to apply at work, in projects and in your career.",
    "title": "Build a solid foundation of AI knowledge.",
    "body": "INEMA Club is a hands-on learning ecosystem for people who want to master artificial intelligence and apply it at work, in projects and in their careers. The core idea is simple: learn, practice and evolve with AI continuously."
  },
  "search": {
    "title": "What do you want to learn today?",
    "body": "Search INEMA's public courses by topic, tool or goal. Even without WebMCP you can browse the catalog manually.",
    "label": "Topic or goal",
    "placeholder": "E.g.: WebMCP, agents, automation",
    "button": "Search courses",
    "catalogNote": "The course catalog is in Portuguese."
  },
  "events": {
    "gestao2027Alt": "Agent Management 2027 — the new role of companies. Same leadership, a new workforce: humans + agents = more value.",
    "agiAlt": "AGI has arrived — it is no longer about doing everything, it is about commanding agents. The era of super-agents has begun.",
    "content2videoAlt": "Content2Video — a link goes in, a video comes out",
    "webmcpAlt": "WebMCP — INEMA event",
    "musicavideoAlt": "INEMA MUSICAVIDEO — create songs and music videos at scale, from idea to hit",
    "destaqueAlt": "INEMACCBOT course with Promoavatar",
    "eventoAlt": "INEMA event"
  },
  "beginners": {
    "title": "Beginner Path",
    "subtitle": "Start your journey with the essential courses, in this recommended order",
    "body": "This is not a random list: it is a progression. You start by learning to talk to AI (FEP), see those skills in action (ATIA), build the technical data foundation (FDB) and expand to images (Vision). Only then do you move to code-agent tools — Claude Code and Codex — which bring it all together in practice, before shipping a real project (Do Zero ao Deploy) and finishing by building your own AI system (INTELECTO). Skipping steps creates gaps: later courses assume the foundation of earlier ones.",
    "footer": "After completing this path, explore other courses by interest below",
    "guideButton": "📖 See the guide on why each course matters",
    "ptPill": "PT",
    "ptPillTitle": "Course in Portuguese"
  },
  "iaZero": {
    "title": "🌱 Never used AI? Start with IA do Zero",
    "subtitle": "Before step 1 of the path: four short lessons, a kit of twenty ready-made prompts and, right after, FEP rewritten for 2026",
    "body": "Nothing technical, nothing to install. You learn the three parts of a request, the four chat buttons, what to check before passing it on, and leave with your own kit of five prompts filled in and tested. When you finish, FEP 2026 shows what changed in how we ask now that AGI has arrived, and the path above makes sense."
  },
  "novidades": {
    "title": "Latest News",
    "more": "Show more",
    "less": "Show less",
    "readVip": "Read on INEMA.VIP →",
    "openLink": "Open link →",
    "ptNote": "Content in Portuguese."
  },
  "updates": {
    "coursesTitle": "Latest Course Updates",
    "projectsTitle": "Latest Project Updates"
  },
  "perfis": {
    "topoAlt": "Discover how to use AI to grow in your profession",
    "operacionalAlt": "Operational Professional — more productivity with AI",
    "empreendedorAlt": "Strategic Entrepreneur with AI",
    "liberalAlt": "Experienced Independent Professional with AI",
    "gestorAlt": "Manager and Leader — lead better with AI"
  },
  "proBanner": { "alt": "INEMA.PRO — The platform for people who want to use AI to grow in practice" },
  "trails": {
    "title": "INEMA.PRO Learning Paths",
    "subtitle": "Choose your path and move forward with focus — the full content of each path is on INEMA.PRO"
  },
  "projects": {
    "title": "Projects",
    "subtitle": "Projects built by INEMA — ready to download and use",
    "ctaLine": "projects ready to download and use",
    "ctaBody": "Apps, agents, skills and tools built by the INEMA community, with code and a usage guide."
  },
  "translated": {
    "title": "Available in English",
    "subtitle": "INEMA courses and projects already published in this language",
    "empty": "We are translating the catalog. The first courses in this language will appear here as soon as they are published."
  },
  "banners": {
    "clubAlt": "INEMA.CLUB",
    "teamAlt": "Build your team. Lead the future."
  },
  "telegram": {
    "title": "Telegram Groups and Channels",
    "subtitle": "Join our learning community"
  },
  "vip": {
    "alt": "INEMA.VIP - You are invited to the community",
    "title": "INEMA.VIP",
    "description": "A space for self-directed learning and transformation with AI and Humanoids",
    "badge": "Sign up →"
  },
  "social": {
    "title": "INEMA Social Media",
    "subtitle": "Follow us on the main platforms"
  },
  "footer": { "copyright": "© 2025 Portal INEMA. All rights reserved." }
}
```

- [ ] **Step 6: Criar `src/i18n/messages/es.json`**

```json
{
  "langSwitcher": { "label": "Idioma" },
  "header": {
    "communityBadge": "Únete a la Comunidad",
    "proBadge": "Suscríbete a INEMA.PRO",
    "logo": "INEMA.CLUB Portal INEMA",
    "tagline": "Acceso centralizado a tus cursos y plataformas",
    "chipVisits": "accesos",
    "chipUnique": "visitantes únicos",
    "chipLogged": "conectados"
  },
  "nav": {
    "search": "🔍 Búsquedas",
    "beginners": "📘 Principiantes",
    "courses": "🎓 Cursos",
    "trails": "🗺️ Rutas",
    "projects": "🚀 Proyectos",
    "telegram": "💬 Telegram",
    "social": "📱 Social",
    "pro": "⭐ INEMA.PRO"
  },
  "hero": {
    "imageAlt": "INEMA.CLUB — Aprende. Practica. Evoluciona. El ecosistema para dominar la IA en la práctica.",
    "caption": "Aprende. Practica. Evoluciona. — una base sólida de conocimiento en IA para aplicar en el trabajo, en los proyectos y en la carrera.",
    "title": "Construye una base sólida de conocimiento en IA.",
    "body": "INEMA Club es un ecosistema de aprendizaje práctico para quienes quieren dominar la inteligencia artificial y aplicarla en el trabajo, en los proyectos y en la carrera. La idea central es simple: aprender, practicar y evolucionar con IA de forma continua."
  },
  "search": {
    "title": "¿Qué quieres aprender hoy?",
    "body": "Busca los cursos públicos de INEMA por tema, herramienta u objetivo. Incluso sin WebMCP puedes seguir manualmente por el catálogo.",
    "label": "Tema u objetivo",
    "placeholder": "Ej.: WebMCP, agentes, automatización",
    "button": "Buscar cursos",
    "catalogNote": "El catálogo de cursos está en portugués."
  },
  "events": {
    "gestao2027Alt": "Gestión de Agentes 2027 — el nuevo papel de las empresas. El mismo liderazgo, una nueva fuerza de trabajo: humanos + agentes = más valor.",
    "agiAlt": "La AGI llegó — ya no se trata de hacerlo todo, sino de comandar agentes. La era de los superagentes ha comenzado.",
    "content2videoAlt": "Content2Video — entra un enlace, sale un video",
    "webmcpAlt": "WebMCP — evento INEMA",
    "musicavideoAlt": "INEMA MUSICAVIDEO — crea canciones y videoclips a escala, de la idea al hit",
    "destaqueAlt": "Curso INEMACCBOT con Promoavatar",
    "eventoAlt": "Evento INEMA"
  },
  "beginners": {
    "title": "Ruta para Principiantes",
    "subtitle": "Comienza tu camino con los cursos esenciales, en este orden recomendado",
    "body": "No es una lista aleatoria: es una progresión. Empiezas aprendiendo a hablar con la IA (FEP), ves esas habilidades en acción (ATIA), construyes la base técnica de datos (FDB) y amplías hacia imágenes (Vision). Solo entonces entras en las herramientas de agente de código — Claude Code y Codex — que unen todo eso en la práctica, antes de poner un proyecto real en línea (Do Zero ao Deploy) y cerrar construyendo tu propio sistema de IA (INTELECTO). Saltarse etapas crea vacíos: los cursos siguientes presuponen la base de los anteriores.",
    "footer": "Después de completar esta ruta, explora otros cursos según tu interés más abajo",
    "guideButton": "📖 Mira la guía con la importancia de cada curso",
    "ptPill": "PT",
    "ptPillTitle": "Curso en portugués"
  },
  "iaZero": {
    "title": "🌱 ¿Nunca usaste IA? Empieza por IA do Zero",
    "subtitle": "Antes del paso 1 de la ruta: cuatro clases cortas, un kit de veinte pedidos listos y, a continuación, el FEP reescrito para 2026",
    "body": "Nada técnico y sin instalar nada. Aprendes las tres partes de un pedido, los cuatro botones del chat, qué revisar antes de reenviar, y sales con tu propio kit de cinco pedidos completado y probado. Al terminar, el FEP 2026 muestra qué cambió en la forma de pedir ahora que la AGI llegó, y la ruta de arriba cobra sentido."
  },
  "novidades": {
    "title": "Últimas Novedades",
    "more": "Ver más",
    "less": "Ver menos",
    "readVip": "Leer en INEMA.VIP →",
    "openLink": "Abrir enlace →",
    "ptNote": "Contenido en portugués."
  },
  "updates": {
    "coursesTitle": "Últimas Actualizaciones de Cursos",
    "projectsTitle": "Últimas Actualizaciones de Proyectos"
  },
  "perfis": {
    "topoAlt": "Descubre cómo usar la IA para evolucionar en tu profesión",
    "operacionalAlt": "Profesional Operativo — más productividad con IA",
    "empreendedorAlt": "Emprendedor Estratégico con IA",
    "liberalAlt": "Profesional Independiente Experimentado con IA",
    "gestorAlt": "Gestor y Líder — lidera mejor con IA"
  },
  "proBanner": { "alt": "INEMA.PRO — La plataforma para quienes quieren usar la IA para crecer en la práctica" },
  "trails": {
    "title": "Rutas de Aprendizaje de INEMA.PRO",
    "subtitle": "Elige tu camino y avanza con foco — el contenido completo de cada ruta está en INEMA.PRO"
  },
  "projects": {
    "title": "Proyectos",
    "subtitle": "Proyectos desarrollados por INEMA — listos para descargar y usar",
    "ctaLine": "proyectos listos para descargar y usar",
    "ctaBody": "Aplicaciones, agentes, skills y herramientas construidos por la comunidad INEMA, con código y guía de uso."
  },
  "translated": {
    "title": "Disponible en español",
    "subtitle": "Cursos y proyectos de INEMA ya publicados en este idioma",
    "empty": "Estamos traduciendo el catálogo. Los primeros cursos en este idioma aparecerán aquí en cuanto se publiquen."
  },
  "banners": {
    "clubAlt": "INEMA.CLUB",
    "teamAlt": "Crea tu equipo. Lidera el futuro."
  },
  "telegram": {
    "title": "Grupos y Canales de Telegram",
    "subtitle": "Únete a nuestra comunidad de aprendizaje"
  },
  "vip": {
    "alt": "INEMA.VIP - Has sido invitado a la comunidad",
    "title": "INEMA.VIP",
    "description": "Un espacio de autoaprendizaje y transformación con IA y Humanoides",
    "badge": "Regístrate →"
  },
  "social": {
    "title": "Redes Sociales INEMA",
    "subtitle": "Síguenos en las principales plataformas"
  },
  "footer": { "copyright": "© 2025 Portal INEMA. Todos los derechos reservados." }
}
```

- [ ] **Step 7: Criar `src/i18n/dictionary.ts`**

```ts
import type { Locale } from './locales'
import pt from './messages/pt.json'
import en from './messages/en.json'
import es from './messages/es.json'

export type Dictionary = typeof pt

const dictionaries: Record<Locale, Dictionary> = { pt, en, es }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
```

`tsconfig.json` já tem `resolveJsonModule: true`. Como `en` e `es` são atribuídos a `Record<Locale, typeof pt>`, o TypeScript acusa chave faltando ou sobrando em tempo de compilação (segunda rede além do teste).

- [ ] **Step 8: Rodar teste e tsc**

Run: `npm test && npx tsc --noEmit`
Expected: 3 testes PASS; tsc sem erro.

- [ ] **Step 9: Commit**

```bash
git config user.email   # deve ser nei.maldaner2014@gmail.com
git add src/i18n tests/i18n.test.mjs package.json
git commit -m "portal: núcleo i18n (locales, dicionários PT/EN/ES, teste de paridade)"
```

---

### Task 2: Root layouts por idioma (route groups) + HomePage compartilhada

**Files:**
- Create: `src/components/RootShell.tsx`
- Create: `src/lib/root-metadata.ts`
- Create: `src/lib/home-page.ts`
- Create: `src/components/HomePage.tsx`
- Move: `src/app/layout.tsx` → `src/app/(pt)/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/(pt)/page.tsx` (reescrito)
- Move: `src/app/cursos/` → `src/app/(pt)/cursos/`
- Move: `src/app/conhecimento/` → `src/app/(pt)/conhecimento/`
- Move: `src/app/stats/` → `src/app/(pt)/stats/`
- Create: `src/app/(en)/en/layout.tsx`, `src/app/(en)/en/page.tsx`
- Create: `src/app/(es)/es/layout.tsx`, `src/app/(es)/es/page.tsx`
- Modify: `src/components/Portal.tsx:289` (assinatura recebe `locale`, sem usar ainda)

**Interfaces:**
- Consumes: `Locale`, `HTML_LANG`, `OG_LOCALE`, `localeHome`, `getDictionary` (Task 1).
- Produces: `RootShell({ lang, children })`; `buildRootMetadata(locale): Metadata`; `getVisitStats(): Promise<VisitStats>`; `buildHomeJsonLd(locale): object[]`; `HomePage({ locale })`; `Portal({ visitStats, locale })` com `locale` opcional (default `'pt'`).

Por que route groups: um layout aninhado (`app/en/layout.tsx`) não consegue trocar o `<html lang>`, e um `[locale]` na raiz moveria todas as rotas e exigiria middleware. Com três root layouts, as URLs PT não mudam, `src/proxy.ts` (matcher `/conhecimento/:path*`) continua igual, e a troca de idioma vira um reload completo de página (aceitável para um seletor de idioma).

- [ ] **Step 1: Criar `src/components/RootShell.tsx`** (o corpo do `layout.tsx` atual, parametrizado por `lang`)

```tsx
import Script from 'next/script'
import AgenteChat from '@/components/AgenteChat/AgenteChat'
import InemaWebMCP from '@/components/InemaWebMCP'
import '@/app/globals.css'

export default function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  const originTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN?.trim()
  const originTrialMode = process.env.WEBMCP_ORIGIN_TRIAL_MODE?.trim()
  return (
    <html lang={lang}>
      <head>
        {originTrialToken && originTrialMode === 'third-party' ? (
          <Script src="/api/webmcp-origin-trial/" strategy="beforeInteractive" />
        ) : originTrialToken ? (
          <meta httpEquiv="origin-trial" content={originTrialToken} />
        ) : null}
        <Script
          src="https://plausible.io/js/pa-kTjsz6v4nJLgQy3_zomx8.js"
          strategy="afterInteractive"
          async
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};
          window.plausible.init=window.plausible.init||function(i){window.plausible.o=i||{}};
          window.plausible.init();
        `}</Script>
      </head>
      <body>
        {children}
        <InemaWebMCP />
        <AgenteChat />
      </body>
    </html>
  )
}
```

Antes de escrever, abrir `src/app/layout.tsx` e conferir que o `<head>`/`<body>` são exatamente esses (o trecho acima foi copiado em 2026-09-14; se houver algo a mais, trazer junto).

- [ ] **Step 2: Criar `src/lib/root-metadata.ts`**

```ts
import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import { OG_LOCALE, localeHome, type Locale } from '@/i18n/locales'

const TITLES: Record<Locale, { title: string; og: string; description: string }> = {
  pt: {
    title: 'INEMA.club — Cursos, projetos e formação prática em IA',
    og: 'INEMA.club — Aprenda, pratique e evolua com IA',
    description: 'Formação prática em inteligência artificial, agentes e automação.',
  },
  en: {
    title: 'INEMA.club — Courses, projects and hands-on AI training',
    og: 'INEMA.club — Learn, practice and evolve with AI',
    description: 'Hands-on training in artificial intelligence, agents and automation.',
  },
  es: {
    title: 'INEMA.club — Cursos, proyectos y formación práctica en IA',
    og: 'INEMA.club — Aprende, practica y evoluciona con IA',
    description: 'Formación práctica en inteligencia artificial, agentes y automatización.',
  },
}

export const HREFLANG_ALTERNATES = {
  'pt-BR': '/',
  en: '/en/',
  es: '/es/',
  'x-default': '/',
}

export function buildRootMetadata(locale: Locale): Metadata {
  const t = TITLES[locale]
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: `%s | ${SITE_NAME}` },
    description: locale === 'pt' ? SITE_DESCRIPTION : t.description,
    alternates: {
      canonical: localeHome(locale),
      languages: HREFLANG_ALTERNATES,
      types: { 'application/rss+xml': '/feed.xml' },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      url: localeHome(locale),
      siteName: SITE_NAME,
      title: t.og,
      description: t.description,
      images: [
        {
          url: '/doc/inema-hero-aprenda-pratique-evolua.webp',
          width: 1200,
          height: 675,
          alt: t.og,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.og,
      description: t.description,
      images: ['/doc/inema-hero-aprenda-pratique-evolua.webp'],
    },
    category: 'education',
  }
}
```

Conferir contra o `metadata` atual de `src/app/layout.tsx` (linhas 9–45): para `pt`, o resultado tem que ser idêntico ao de hoje mais `alternates.languages`.

- [ ] **Step 3: Criar `src/lib/home-page.ts`** (extraído de `src/app/page.tsx`)

```ts
import { supabaseAdmin } from '@/lib/supabase'
import { OFFICIAL_PROFILES, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'
import { HTML_LANG, localeHome, type Locale } from '@/i18n/locales'

export type VisitStats = { total: number; uniqueLogged: number; uniqueAnon: number }

const BASE_TOTAL = 100000
const BASE_UNIQUE_ANON = 50000

type StatsRow = { total: number; unique_anon: number; unique_logged: number }

export async function getVisitStats(): Promise<VisitStats> {
  let visitStats: VisitStats = { total: BASE_TOTAL, uniqueLogged: 0, uniqueAnon: BASE_UNIQUE_ANON }
  try {
    // RPC visit_stats() usa RETURNS TABLE → vem como array [{...}]
    const { data } = await supabaseAdmin.rpc('visit_stats')
    const row: StatsRow | null = Array.isArray(data) ? data[0] ?? null : (data as StatsRow | null)
    if (row && typeof row.total === 'number') {
      visitStats = {
        total: BASE_TOTAL + row.total,
        uniqueLogged: row.unique_logged ?? 0,
        uniqueAnon: BASE_UNIQUE_ANON + (row.unique_anon ?? 0),
      }
    }
  } catch {
    // Supabase não configurado — retorna valores base
  }
  return visitStats
}

export function buildHomeJsonLd(locale: Locale) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'INEMA.club',
    alternateName: 'INEMA',
    url: SITE_URL,
    logo: `${SITE_URL}/doc/conviteinemap.png`,
    description: SITE_DESCRIPTION,
    founder: {
      '@type': 'Person',
      name: 'Nei Maldaner',
      url: `${SITE_URL}/conhecimento/quem-e-nei-maldaner/`,
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    sameAs: OFFICIAL_PROFILES,
    subOrganization: [
      { '@type': 'Organization', name: 'INEMA.pro', url: 'https://inema.pro/' },
      { '@type': 'Organization', name: 'INEMA.VIP', url: 'https://inema.vip/' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cursos e formações do INEMA',
      url: `${SITE_URL}/cursos/`,
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}${localeHome(locale)}#website`,
    url: `${SITE_URL}${localeHome(locale)}`,
    name: 'INEMA.club',
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: HTML_LANG[locale],
  }

  return [organizationJsonLd, websiteJsonLd]
}
```

Nota: para `pt`, `localeHome` devolve `/`, então `@id` e `url` ficam `https://www.inema.club/#website` e `https://www.inema.club/`, idênticos aos de hoje.

- [ ] **Step 4: Criar `src/components/HomePage.tsx`**

```tsx
import Portal from '@/components/Portal'
import { buildHomeJsonLd, getVisitStats } from '@/lib/home-page'
import type { Locale } from '@/i18n/locales'

export default async function HomePage({ locale }: { locale: Locale }) {
  const visitStats = await getVisitStats()
  const jsonLd = buildHomeJsonLd(locale)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Portal visitStats={visitStats} locale={locale} />
    </>
  )
}
```

- [ ] **Step 5: Dar a prop `locale` ao `Portal` (sem usar ainda)**

Em `src/components/Portal.tsx`, trocar a linha 289:

```tsx
export default function Portal({ visitStats }: { visitStats: VisitStats }) {
```

por:

```tsx
export default function Portal({
  visitStats,
  locale = 'pt',
}: {
  visitStats: VisitStats
  locale?: Locale
}) {
```

e adicionar no topo, junto dos imports: `import type { Locale } from '@/i18n/locales'`.

- [ ] **Step 6: Mover as rotas PT para o route group `(pt)`**

```bash
cd /home/nmaldaner/projetos/portal
mkdir -p "src/app/(pt)"
git mv src/app/layout.tsx "src/app/(pt)/layout.tsx"
git mv src/app/page.tsx "src/app/(pt)/page.tsx"
git mv src/app/cursos "src/app/(pt)/cursos"
git mv src/app/conhecimento "src/app/(pt)/conhecimento"
git mv src/app/stats "src/app/(pt)/stats"
```

Ficam em `src/app/`: `api/`, `feed.xml/`, `llms.txt/`, `courses-sitemap.xml/`, `robots.ts`, `globals.css`.

- [ ] **Step 7: Reescrever `src/app/(pt)/layout.tsx`**

```tsx
import RootShell from '@/components/RootShell'
import { buildRootMetadata } from '@/lib/root-metadata'
import { HTML_LANG } from '@/i18n/locales'

export const metadata = buildRootMetadata('pt')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang={HTML_LANG.pt}>{children}</RootShell>
}
```

O `import './globals.css'` saiu daqui porque o `RootShell` importa `@/app/globals.css`.

- [ ] **Step 8: Reescrever `src/app/(pt)/page.tsx`**

```tsx
import HomePage from '@/components/HomePage'

export const revalidate = 60 // revalida a cada 60 segundos

export default function Home() {
  return <HomePage locale="pt" />
}
```

- [ ] **Step 9: Criar os layouts e pages EN e ES**

`src/app/(en)/en/layout.tsx`:

```tsx
import RootShell from '@/components/RootShell'
import { buildRootMetadata } from '@/lib/root-metadata'
import { HTML_LANG } from '@/i18n/locales'

export const metadata = buildRootMetadata('en')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang={HTML_LANG.en}>{children}</RootShell>
}
```

`src/app/(en)/en/page.tsx`:

```tsx
import HomePage from '@/components/HomePage'

export const revalidate = 60

export default function HomeEn() {
  return <HomePage locale="en" />
}
```

`src/app/(es)/es/layout.tsx` e `src/app/(es)/es/page.tsx`: iguais aos de EN, trocando `'en'`/`HTML_LANG.en`/`HomeEn` por `'es'`/`HTML_LANG.es`/`HomeEs`.

- [ ] **Step 10: Conferir imports relativos nas rotas movidas**

```bash
grep -rn "from '\.\./\|from '\./" "src/app/(pt)" | grep -v node_modules
```

Expected: nenhuma linha (as rotas usam `@/...`). Se aparecer import relativo que subia até `src/app/`, trocar por alias `@/`.

- [ ] **Step 11: Build e verificação de `<html lang>` por rota**

```bash
npx tsc --noEmit && npm run build
```

Expected: build OK, com `/`, `/en`, `/es`, `/cursos`, `/stats` listadas nas rotas.

```bash
PORT=3111 npm start &
sleep 5
curl -s http://localhost:3111/ | grep -o '<html lang="[^"]*"'
curl -s http://localhost:3111/en/ | grep -o '<html lang="[^"]*"'
curl -s http://localhost:3111/es/ | grep -o '<html lang="[^"]*"'
curl -s http://localhost:3111/en/ | grep -o 'hreflang="[^"]*"' | sort -u
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3111/cursos/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3111/stats/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3111/feed.xml
kill %1
```

Expected, em ordem: `pt-BR`, `en`, `es`; `hreflang="en"`, `"es"`, `"pt-BR"`, `"x-default"`; `200`; `200`; `200`.

- [ ] **Step 12: gen:data intacto e commit**

```bash
npm run gen:data && git diff --exit-code src/data/courses.data.json
git add -A src/app src/components/RootShell.tsx src/components/HomePage.tsx src/lib/root-metadata.ts src/lib/home-page.ts src/components/Portal.tsx
git commit -m "portal: root layouts por idioma (/, /en/, /es/) com hreflang e HomePage compartilhada"
```

---

### Task 3: `Portal.tsx` lê o dicionário, ganha seletor de idioma e selo PT

**Files:**
- Modify: `src/components/Portal.tsx` (linhas 289–2159; blocos `SHOW_DETALHES` intocados)
- Modify: `src/app/globals.css` (fim do arquivo)

**Interfaces:**
- Consumes: `getDictionary`, `LOCALES`, `LOCALE_LABEL`, `localeHome`, `INTL_LOCALE` (Task 1); prop `locale` (Task 2).
- Produces: home renderizada no idioma; classes CSS `.lang-switcher`, `.lang-switcher a`, `.lang-switcher a.active`, `.lang-pill`.

- [ ] **Step 1: Instanciar o dicionário e o `formatDate` por idioma**

No topo do componente (logo depois dos `useState`, antes de `formatDate`):

```tsx
const t = getDictionary(locale)
```

Import: `import { getDictionary } from '@/i18n/dictionary'` e `import { LOCALES, LOCALE_LABEL, localeHome, INTL_LOCALE, type Locale } from '@/i18n/locales'` (substitui o `import type { Locale }` da Task 2).

Trocar `formatDate` (linha ~423):

```tsx
function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString(INTL_LOCALE[locale], { day: '2-digit', month: '2-digit' })
}
```

- [ ] **Step 2: Seletor de idioma no header**

Dentro de `<div className="header-content">`, depois de `<div className="visit-chips">…</div>`, inserir:

```tsx
<nav className="lang-switcher" aria-label={t.langSwitcher.label}>
  {LOCALES.map((l) => (
    <a key={l} href={localeHome(l)} className={l === locale ? 'active' : ''} hrefLang={l} lang={l}>
      {LOCALE_LABEL[l]}
    </a>
  ))}
</nav>
```

- [ ] **Step 3: Substituir os textos do header e da nav**

Mapa linha → chave (linhas de referência do arquivo em 2026-09-14; localizar pelo texto, não pelo número):

| Texto atual | Substituir por |
|---|---|
| `<span>Participe da Comunidade</span>` | `<span>{t.header.communityBadge}</span>` |
| `<span>Assine o INEMA.PRO</span>` | `<span>{t.header.proBadge}</span>` |
| `<h1 className="logo">INEMA.CLUB Portal INEMA</h1>` | `<h1 className="logo">{t.header.logo}</h1>` |
| `<p className="tagline">Acesso centralizado…</p>` | `<p className="tagline">{t.header.tagline}</p>` |
| `title="acessos"` / `"visitantes únicos"` / `"logados"` | `title={t.header.chipVisits}` / `{t.header.chipUnique}` / `{t.header.chipLogged}` |
| `🔍 Buscas` … `⭐ INEMA.PRO` (8 links da section-nav) | `{t.nav.search}`, `{t.nav.beginners}`, `{t.nav.courses}`, `{t.nav.trails}`, `{t.nav.projects}`, `{t.nav.telegram}`, `{t.nav.social}`, `{t.nav.pro}` |

Os `label` passados ao `trackClick(...)` **não mudam** (são chaves de analytics, ficam em PT).

- [ ] **Step 4: Substituir hero, busca e eventos**

| Texto atual | Substituir por |
|---|---|
| `alt="INEMA.CLUB — Aprenda. Pratique. Evolua. …"` (hero) | `alt={t.hero.imageAlt}` |
| `<strong>Aprenda. Pratique. Evolua. — uma base sólida…</strong>` | `<strong>{t.hero.caption}</strong>` |
| `<h2>Construa uma base sólida de conhecimento em IA.</h2>` | `<h2>{t.hero.title}</h2>` |
| `<p>O INEMA Club é um ecossistema…</p>` | `<p>{t.hero.body}</p>` |
| `<h2 id="webmcp-course-search-title">O que você quer aprender hoje?</h2>` | `<h2 id="webmcp-course-search-title">{t.search.title}</h2>` |
| `<p>Pesquise os cursos públicos…</p>` | `<p>{t.search.body}{locale !== 'pt' && <> {t.search.catalogNote}</>}</p>` |
| `<label htmlFor="home-course-search">Tema ou objetivo</label>` | `<label htmlFor="home-course-search">{t.search.label}</label>` |
| `placeholder="Ex.: WebMCP, agentes, automação"` | `placeholder={t.search.placeholder}` |
| `<button type="submit">Buscar cursos</button>` | `<button type="submit">{t.search.button}</button>` |
| `alt="Gestão de Agentes 2027 — …"` | `alt={t.events.gestao2027Alt}` |
| `alt="AGI chegou — …"` | `alt={t.events.agiAlt}` |
| `alt="Content2Video — …"` | `alt={t.events.content2videoAlt}` |
| `alt="WebMCP — evento INEMA"` | `alt={t.events.webmcpAlt}` |
| `alt="INEMA MUSICAVIDEO — …"` | `alt={t.events.musicavideoAlt}` |
| `alt="Curso INEMACCBOT com Promoavatar"` | `alt={t.events.destaqueAlt}` |
| `alt="Evento INEMA"` | `alt={t.events.eventoAlt}` |

Os atributos `toolname`, `tooldescription`, `toolparamdescription` do formulário WebMCP **ficam em PT** (contrato com o agente WebMCP; fora do escopo desta fase).

- [ ] **Step 5: Trilha para Iniciantes, IA do Zero e selo PT**

| Texto atual | Substituir por |
|---|---|
| `<h3>Trilha para Iniciantes</h3>` | `<h3>{t.beginners.title}</h3>` |
| `<p>Comece sua jornada…</p>` | `<p>{t.beginners.subtitle}</p>` |
| `<p style={{ maxWidth: '760px' … }}>Não é uma lista aleatória…</p>` | mesmo `<p style=…>` com `{t.beginners.body}` |
| `<p>Após completar esta trilha…</p>` | `<p>{t.beginners.footer}</p>` |
| `📖 Veja o guia com a importância de cada curso` | `{t.beginners.guideButton}` |
| `<h3>🌱 Nunca usou IA? Comece pelo IA do Zero</h3>` | `<h3>{t.iaZero.title}</h3>` |
| `<p>Antes do passo 1 da trilha…</p>` | `<p>{t.iaZero.subtitle}</p>` |
| `<p style=…>Sem nada técnico…</p>` | mesmo `<p style=…>` com `{t.iaZero.body}` |

Selo PT: em **cada** `<a className="path-card …">` da Trilha para Iniciantes (FEP, ATIA, FDB, Vision, Claude Code Básico, Codex Básico, Do Zero ao Deploy, INTELECTO, Claude Code para Pessoas Normais, OS Agentes, Lives 2026, Como Montar um Negócio) e dos três cards do IA do Zero, logo depois do `<div className="path-number">N</div>`, inserir:

```tsx
{locale !== 'pt' && <span className="lang-pill" title={t.beginners.ptPillTitle}>{t.beginners.ptPill}</span>}
```

Os `<h4>` e `<p>` desses cards (nomes e subtítulos dos cursos) **não mudam**.

- [ ] **Step 6: Novidades, atualizações, perfis, banners, trilhas, projetos, telegram, VIP, social, footer**

| Texto atual | Substituir por |
|---|---|
| `<h3>Últimas Novidades</h3>` | `<h3>{t.novidades.title}{locale !== 'pt' && <small className="lang-note"> · {t.novidades.ptNote}</small>}</h3>` |
| `{novidadesExpanded ? 'Ver menos' : 'Ver mais'}` | `{novidadesExpanded ? t.novidades.less : t.novidades.more}` |
| `'Ler no INEMA.VIP →' : 'Abrir link →'` | `t.novidades.readVip : t.novidades.openLink` |
| `<h3>Últimas Atualizações de Cursos</h3>` | `<h3>{t.updates.coursesTitle}</h3>` |
| `{updatesExpanded ? 'Ver menos' : 'Ver mais'}` | `{updatesExpanded ? t.novidades.less : t.novidades.more}` |
| `<h3>Últimas Atualizações de Projetos</h3>` | `<h3>{t.updates.projectsTitle}</h3>` |
| `{projectUpdatesExpanded ? 'Ver menos' : 'Ver mais'}` | `{projectUpdatesExpanded ? t.novidades.less : t.novidades.more}` |
| `alt="Descubra como usar IA…"` | `alt={t.perfis.topoAlt}` |
| `alt="Profissional Operacional — …"` | `alt={t.perfis.operacionalAlt}` |
| `alt="Empreendedor Estratégico com IA"` | `alt={t.perfis.empreendedorAlt}` |
| `alt="Profissional Liberal Experiente com IA"` | `alt={t.perfis.liberalAlt}` |
| `alt="Gestor e Líder — …"` | `alt={t.perfis.gestorAlt}` |
| `alt="INEMA.PRO — A plataforma…"` | `alt={t.proBanner.alt}` |
| `alt="INEMA.CLUB"` (hero-banner inemac2.jpg) | `alt={t.banners.clubAlt}` |
| `<h3>Trilhas de Aprendizado do INEMA.PRO</h3>` | `<h3>{t.trails.title}</h3>` |
| `<p>Escolha seu caminho…</p>` | `<p>{t.trails.subtitle}</p>` |
| `<h3>Projetos</h3>` | `<h3>{t.projects.title}</h3>` |
| `<p>Projetos desenvolvidos pela INEMA…</p>` | `<p>{t.projects.subtitle}</p>` |
| `<p>projetos prontos para baixar e usar</p>` | `<p>{t.projects.ctaLine}</p>` |
| `<p>Aplicativos, agentes, skills…</p>` | `<p>{t.projects.ctaBody}</p>` |
| `alt="Crie sua equipe. Lidere o futuro."` | `alt={t.banners.teamAlt}` |
| `<h3>Grupos e Canais Telegram</h3>` | `<h3>{t.telegram.title}</h3>` |
| `<p>Junte-se à nossa comunidade de aprendizado</p>` | `<p>{t.telegram.subtitle}</p>` |
| `alt="INEMA.VIP - Você foi convidado…"` | `alt={t.vip.alt}` |
| `<h2 className="featured-title">INEMA.VIP</h2>` | `<h2 className="featured-title">{t.vip.title}</h2>` |
| `<p className="featured-description">Um espaço de autoaprendizado…</p>` | `<p className="featured-description">{t.vip.description}</p>` |
| `<div className="featured-badge">Faça seu Cadastro →</div>` | `<div className="featured-badge">{t.vip.badge}</div>` |
| `<h3>Redes Sociais INEMA</h3>` | `<h3>{t.social.title}</h3>` |
| `<p>Siga-nos nas principais plataformas</p>` | `<p>{t.social.subtitle}</p>` |
| `<p>&copy; 2025 Portal INEMA. Todos os direitos reservados.</p>` | `<p>{t.footer.copyright}</p>` |

Os títulos das oito trilhas na grade `#trilhas` (ex.: "Trilha Profissional com IA"), os nomes dos grupos Telegram, os handles sociais e o botão da seção Projetos que aponta para o `inema.pro` ficam como estão. Se o botão de Projetos tiver texto PT visível, criar a chave `projects.ctaButton` nos três JSON e usar.

- [ ] **Step 7: Varredura final por texto PT fora dos blocos `SHOW_DETALHES`**

```bash
node -e "
const fs=require('fs');const L=fs.readFileSync('src/components/Portal.tsx','utf8').split('\n');
let depth=0,skip=false;
for(let i=428;i<L.length;i++){const l=L[i];
 if(/SHOW_DETALHES\s*&&\s*\(/.test(l)){skip=true;depth=0}
 if(skip){depth+=(l.match(/\(/g)||[]).length-(l.match(/\)/g)||[]).length;if(depth<=0)skip=false;continue}
 const m=l.match(/>([^<>{}]*[a-záéíóúãõç]{4,}[^<>{}]*)</i)||l.match(/(?:placeholder|title|alt)=\"([^\"]{4,})\"/);
 if(m)console.log((i+1)+': '+m[1].trim())}"
```

Expected: só nomes próprios (nomes de cursos dos cards, títulos das trilhas, nomes de grupos Telegram, handles) e o texto do botão de Projetos se ainda não tiver chave. Qualquer frase de interface que sobrar vira chave nova nos três JSON.

- [ ] **Step 8: CSS do seletor e do selo** (append em `src/app/globals.css`)

```css
/* i18n — seletor de idioma no header e selo de idioma do conteúdo */
.lang-switcher {
  display: flex;
  gap: .35rem;
  justify-content: center;
  margin-top: .6rem;
}
.lang-switcher a {
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .04em;
  padding: .2rem .6rem;
  border-radius: 999px;
  border: 1px solid oklch(0.45 0.02 260 / .5);
  color: var(--text-secondary, #94a3b8);
  text-decoration: none;
}
.lang-switcher a:hover { color: var(--text-primary, #f8fafc); }
.lang-switcher a.active {
  color: #0b0e14;
  background: oklch(0.82 0.16 75);
  border-color: transparent;
}
.lang-pill {
  display: inline-block;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .06em;
  padding: .1rem .4rem;
  border-radius: 999px;
  background: oklch(0.35 0.03 260 / .8);
  color: var(--text-secondary, #94a3b8);
  margin-left: .4rem;
  vertical-align: middle;
}
.lang-note {
  font-size: .7em;
  font-weight: 400;
  color: var(--text-secondary, #94a3b8);
}
```

Se `globals.css` já definir `--text-primary`/`--text-secondary`, manter os nomes; se não, os fallbacks acima cobrem.

- [ ] **Step 9: Verificar**

```bash
npx tsc --noEmit && npm test && npm run gen:data && git diff --exit-code src/data/courses.data.json
npm run build
PORT=3111 npm start & sleep 5
curl -s http://localhost:3111/en/ | grep -c 'Beginner Path'
curl -s http://localhost:3111/es/ | grep -c 'Ruta para Principiantes'
curl -s http://localhost:3111/ | grep -c 'Trilha para Iniciantes'
curl -s http://localhost:3111/en/ | grep -c 'lang-pill'
curl -s http://localhost:3111/ | grep -c 'lang-pill'
kill %1
```

Expected: `1`, `1`, `1`, `≥ 12`, `0`.

- [ ] **Step 10: Commit**

```bash
git add src/components/Portal.tsx src/app/globals.css src/i18n/messages
git commit -m "portal: home lê dicionário por idioma, seletor PT/EN/ES e selo PT nos cursos"
```

---

### Task 4: Seção "Disponível em <idioma>" (lista de cursos traduzidos)

**Files:**
- Create: `src/data/translated-courses.ts`
- Modify: `src/components/Portal.tsx` (inserir seção logo após `</section>` de `#trilha-iniciantes`, antes de `#ia-do-zero`)
- Modify: `src/app/globals.css`
- Modify: `tests/i18n.test.mjs` (um teste para a lista)

**Interfaces:**
- Produces: `type TranslatedItem = { id: number; kind: 'curso' | 'projeto'; locale: Exclude<Locale, 'pt'>; title: string; description: string; url: string; icon: string }`; `translatedCatalog: TranslatedItem[]`; `translatedFor(locale: Locale): TranslatedItem[]`.

Fica fora de `courses.ts` de propósito: o `gen:data` não vê esse arquivo, e o `courses.data.json` que alimenta o PRO e o inemabuscas não muda. Nas fases seguintes, cada curso traduzido entra aqui com o `id` do curso original em `platformsData`.

- [ ] **Step 1: Teste**

Adicionar em `tests/i18n.test.mjs`:

```js
test('translated-courses.ts: ids únicos por locale e url github.io ou inema', () => {
  const src = readFileSync(path.join(ROOT, 'src', 'data', 'translated-courses.ts'), 'utf8')
  const entries = [...src.matchAll(/\{\s*id:\s*(\d+),\s*kind:\s*'(curso|projeto)',\s*locale:\s*'(en|es)'[^}]*url:\s*'([^']+)'/g)]
  const seen = new Set()
  for (const [, id, , locale, url] of entries) {
    const key = `${locale}:${id}`
    assert.ok(!seen.has(key), `duplicado ${key}`)
    seen.add(key)
    assert.match(url, /^https:\/\/(inematds\.github\.io|[a-z.]*inema\.(pro|club))\//, `url fora do padrão: ${url}`)
  }
})
```

Run: `npm test` → FAIL (`ENOENT translated-courses.ts`).

- [ ] **Step 2: Criar `src/data/translated-courses.ts`**

```ts
import type { Locale } from '@/i18n/locales'

/**
 * Cursos e guias de projeto que JÁ TÊM versão em outro idioma.
 * `id` = id do curso em platformsData (courses.ts) ou, para projetos, o índice
 * não importa: use o id do guia se houver, senão 0.
 * Fase 1: lista vazia — a seção mostra o aviso "estamos traduzindo".
 * Fases seguintes: cada tradução publicada entra aqui (uma linha por idioma).
 */
export type TranslatedItem = {
  id: number
  kind: 'curso' | 'projeto'
  locale: Exclude<Locale, 'pt'>
  title: string
  description: string
  url: string
  icon: string
}

export const translatedCatalog: TranslatedItem[] = [
  // Exemplo do formato (remover quando entrar o primeiro real):
  // { id: 1, kind: 'curso', locale: 'en', title: 'FEP — Prompt Engineering Fundamentals', description: 'The base course, in English.', url: 'https://inematds.github.io/FEP/en/', icon: '📝' },
]

export function translatedFor(locale: Locale): TranslatedItem[] {
  if (locale === 'pt') return []
  return translatedCatalog.filter((item) => item.locale === locale)
}
```

- [ ] **Step 3: Renderizar a seção no `Portal.tsx`**

Import: `import { translatedFor } from '@/data/translated-courses'`. Antes do `return`: `const translated = translatedFor(locale)`.

Inserir logo depois do `</section>` que fecha `#trilha-iniciantes` (antes do comentário `{/* IA do Zero — … */}`):

```tsx
{locale !== 'pt' && (
  <section id="translated" className="learning-path-section translated-section">
    <div className="container">
      <div className="learning-path-header">
        <h3>{t.translated.title}</h3>
        <p>{t.translated.subtitle}</p>
      </div>
      {translated.length === 0 ? (
        <p className="translated-empty">{t.translated.empty}</p>
      ) : (
        <div className="learning-path-cards">
          {translated.map((item) => (
            <a
              key={`${item.kind}-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="path-card"
              onClick={() => trackClick(item.url, item.title, `translated-${locale}`)}
            >
              <div className="path-number">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 4: CSS** (append em `globals.css`)

```css
.translated-empty {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-secondary, #94a3b8);
  font-size: .95rem;
  padding: 1rem;
  border: 1px dashed oklch(0.45 0.02 260 / .5);
  border-radius: 12px;
}
```

- [ ] **Step 5: Verificar e commitar**

```bash
npx tsc --noEmit && npm test && npm run gen:data && git diff --exit-code src/data/courses.data.json
npm run build
PORT=3111 npm start & sleep 5
curl -s http://localhost:3111/en/ | grep -c 'id="translated"'
curl -s http://localhost:3111/ | grep -c 'id="translated"'
kill %1
git add src/data/translated-courses.ts src/components/Portal.tsx src/app/globals.css tests/i18n.test.mjs
git commit -m "portal: seção 'Disponível em EN/ES' com lista de cursos traduzidos (vazia na fase 1)"
```

Expected dos curls: `1` e `0`.

---

### Task 5: Chat no idioma do visitante (widget + Edge Function)

**Files:**
- Modify: `src/components/AgenteChat/widget.ts` (linhas ~97, ~194–235)
- Modify: `supabase/functions/chat/index.ts:103,207`
- Modify: `supabase/functions/_shared/prompts.ts` (assinatura de `buildSystemPrompt` e última linha do prompt)

**Interfaces:**
- Consumes: `document.documentElement.lang` (`pt-BR` | `en` | `es`, definido pelo `RootShell` da Task 2).
- Produces: payload do chat ganha `locale: 'pt' | 'en' | 'es'`; `buildSystemPrompt(fichasContexto: string, locale: 'pt' | 'en' | 'es' = 'pt')`.

Limitação conhecida, **não corrigir aqui**: `index.ts:186` faz `textSearch(..., { config: 'portuguese' })` nas fichas; pergunta em EN/ES casa pior com o catálogo. O modelo ainda responde no idioma certo com as fichas que encontrar.

- [ ] **Step 1: Locale e textos do widget**

No `widget.ts`, antes de `mountAgenteChat` (perto da linha 15, junto de `STORAGE_KEY`):

```ts
type WidgetLocale = 'pt' | 'en' | 'es';

function detectLocale(): WidgetLocale {
  const lang = (document.documentElement.lang || 'pt').toLowerCase();
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('es')) return 'es';
  return 'pt';
}

const WIDGET_TEXT: Record<WidgetLocale, { placeholder: string; serverError: string; contactSaved: string; navigating: string; offline: string }> = {
  pt: {
    placeholder: 'Pergunte alguma coisa...',
    serverError: 'Deu ruim aqui do nosso lado — tenta de novo em instantes.',
    contactSaved: 'Contato registrado — alguém do INEMA vai falar com você.',
    navigating: 'Te levando pra lá...',
    offline: 'Sem conexão com o agente agora — tenta de novo em instantes.',
  },
  en: {
    placeholder: 'Ask me anything...',
    serverError: 'Something went wrong on our side — please try again in a moment.',
    contactSaved: 'Contact saved — someone from INEMA will reach out to you.',
    navigating: 'Taking you there...',
    offline: 'No connection to the assistant right now — please try again in a moment.',
  },
  es: {
    placeholder: 'Pregunta lo que quieras...',
    serverError: 'Algo falló de nuestro lado — inténtalo de nuevo en un momento.',
    contactSaved: 'Contacto registrado — alguien de INEMA hablará contigo.',
    navigating: 'Te llevo allí...',
    offline: 'Sin conexión con el asistente ahora — inténtalo de nuevo en un momento.',
  },
};
```

Dentro de `mountAgenteChat`, logo após o guard da linha 74: `const locale = detectLocale(); const text = WIDGET_TEXT[locale];`

Trocar, no template HTML (linha ~97), `placeholder="Pergunte alguma coisa..."` por `placeholder="${text.placeholder}"`.

Trocar as quatro strings de `addSystemNote` (linhas ~211, 223, 227, 233) por `text.serverError`, `text.contactSaved`, `data.navigate.motivo || text.navigating`, `text.offline`.

Se o widget tiver uma mensagem de boas-vindas inicial em PT (procurar por `'assistant'` com conteúdo fixo), adicionar a chave `welcome` no `WIDGET_TEXT` dos três idiomas e usar.

- [ ] **Step 2: Payload e prefixo de idioma no `navigate_to`**

No `fetch` (linha ~201), o body passa a ser:

```ts
body: JSON.stringify({
  session_token: state.sessionToken,
  message: text,
  page_context: window.location.pathname,
  locale,
}),
```

Onde o widget aplica a navegação (perto da linha 227, após `addSystemNote(data.navigate.motivo || text.navigating)`), localizar a atribuição de `window.location` / `href` e prefixar âncoras da home:

```ts
function localizePath(path: string): string {
  // PORTAL_ANCHORS da Edge Function são absolutas na raiz ('/#trilhas').
  // Em /en/ e /es/ a home é outra rota: prefixa pra não jogar o visitante pro PT.
  if (locale !== 'pt' && (path === '/' || path.startsWith('/#'))) return `/${locale}${path}`;
  return path;
}
```

e usar `localizePath(data.navigate.path)` (ou o nome do campo que o widget já lê — conferir no `ChatResponse` do arquivo) no lugar do valor cru. Rotas `/conhecimento/...` seguem sem prefixo (só existem em PT).

- [ ] **Step 3: Edge Function aceita `locale` e o prompt responde no idioma**

`supabase/functions/chat/index.ts:103`:

```ts
let body: { session_token?: string; message?: string; page_context?: string; locale?: string };
```

Logo depois da validação de `message` (linha ~113), adicionar:

```ts
const locale: 'pt' | 'en' | 'es' =
  body.locale === 'en' || body.locale === 'es' ? body.locale : 'pt';
```

Linha ~207: `{ role: 'system', content: buildSystemPrompt(fichasContexto, locale) },`

`supabase/functions/_shared/prompts.ts`: assinatura vira

```ts
export function buildSystemPrompt(fichasContexto: string, locale: 'pt' | 'en' | 'es' = 'pt'): string {
```

e a última linha do template, hoje `Responda sempre em português do Brasil.`, vira:

```ts
${RESPONSE_LANGUAGE[locale]}`;
```

com a constante, definida acima da função:

```ts
const RESPONSE_LANGUAGE = {
  pt: 'Responda sempre em português do Brasil.',
  en: 'Always answer in English. The catalog, courses and pages of the site are in Brazilian Portuguese: keep course and project names as they are, and tell the visitor when a page you point to is in Portuguese.',
  es: 'Responde siempre en español. El catálogo, los cursos y las páginas del sitio están en portugués de Brasil: conserva los nombres de cursos y proyectos tal como están, y avisa al visitante cuando la página que indicas está en portugués.',
} as const;
```

- [ ] **Step 4: Verificar localmente o que dá para verificar**

```bash
npx tsc --noEmit      # widget.ts faz parte do projeto Next
npm run build
deno check supabase/functions/chat/index.ts   # se o deno estiver instalado; senão pular e confiar no deploy
```

- [ ] **Step 5: Commit e deploy da função**

```bash
git add src/components/AgenteChat/widget.ts supabase/functions
git commit -m "portal: chat responde no idioma da página (locale no payload, prompt e widget PT/EN/ES)"
npx supabase functions deploy chat
```

O deploy da Edge Function **não acontece no push**; sem esse comando o prompt em produção continua "responda em português". Depois do deploy, abrir `inema.club/en/` (quando o Vercel publicar), mandar "what is INEMA?" no chat e conferir resposta em inglês.

---

### Task 6: Versão, documentação e push

**Files:**
- Modify: `package.json` (`"version": "0.1.0"` → `"0.2.0"`)
- Modify: `CLAUDE.md` (nova seção depois de "Home enxuta (2026-08-01)")

- [ ] **Step 1: Bump de versão**

Em `package.json`: `"version": "0.2.0"`.

- [ ] **Step 2: Seção no `CLAUDE.md`**

```markdown
## Idiomas (i18n) — desde 2026-09-14

Portal único, um idioma por rota: `/` (PT), `/en/`, `/es/`. Sem redirect por `Accept-Language`.

- `src/i18n/locales.ts` — `Locale`, `HTML_LANG`, `OG_LOCALE`, `localeHome()`.
- `src/i18n/messages/{pt,en,es}.json` — textos de interface da home. **Mesmas chaves nos três**; `npm test` (`tests/i18n.test.mjs`) e o `tsc` acusam divergência. Nomes de cursos, projetos, grupos e handles NÃO se traduzem.
- `src/app/(pt)/`, `src/app/(en)/en/`, `src/app/(es)/es/` — três root layouts (é o único jeito de trocar `<html lang>`); todos usam `src/components/RootShell.tsx` e `buildRootMetadata()` (`src/lib/root-metadata.ts`, com hreflang). As rotas PT (`cursos`, `conhecimento`, `stats`) moram em `(pt)/`; URLs não mudaram.
- `src/components/Portal.tsx` recebe `locale` e usa `t = getDictionary(locale)`. Blocos `SHOW_DETALHES` seguem em PT.
- Modelo híbrido: catálogo continua em PT (selo "PT" nos cards em EN/ES) e a seção "Disponível em <idioma>" lista o que já foi traduzido — **`src/data/translated-courses.ts`**. Para publicar um curso traduzido: adicionar uma linha lá com o `id` do curso em `platformsData`, `locale`, título/descrição no idioma e a URL da versão traduzida. Não mexer no `courses.ts` por causa disso.
- Chat: o widget manda `locale` e a Edge Function responde nesse idioma (`_shared/prompts.ts`). Mudou o prompt? `npx supabase functions deploy chat`.
- Fora do escopo por enquanto: `/cursos/`, `/conhecimento/`, `feed.xml`, `llms.txt` e as novidades ficam só em PT.
```

- [ ] **Step 3: Verificação final e push**

```bash
npx tsc --noEmit && npm test && npm run build
npm run gen:data && git diff --exit-code src/data/courses.data.json
git log --format='%an <%ae> | %cn <%ce>' -6   # todos NeiMaldaner <nei.maldaner2014@gmail.com>
git add package.json CLAUDE.md
git commit -m "portal: v0.2.0 — i18n fase 1 (PT/EN/ES), docs"
git push
```

"Concluído" = push entrou no `origin`. O deploy no Vercel é automático e não é verificado por este plano. Depois que o site subir, o usuário confere `inema.club/en/` e `inema.club/es/` no navegador.

---

## Self-Review

**Cobertura:** rotas por idioma (Task 2), `<html lang>` e hreflang (Task 2), dicionário e seletor (Tasks 1 e 3), selo PT (Task 3), seção de traduzidos (Task 4), chat (Task 5), versão e docs (Task 6). Ficam explicitamente fora: `/cursos/` e `/conhecimento/` em EN/ES, novidades traduzidas, `sitemap.ts` (não existe hoje; `robots.ts` aponta para um `/sitemap.xml` que não é gerado — não corrigir nesta fase), busca `textSearch` em português na Edge Function.

**Tipos consistentes:** `Locale` vem só de `src/i18n/locales.ts`; `getDictionary` (Task 1) é o que o `Portal` usa (Task 3); `Portal({ visitStats, locale })` definido na Task 2 e consumido pelo `HomePage`; `translatedFor(locale)` (Task 4); `buildSystemPrompt(fichas, locale)` (Task 5) com o mesmo union `'pt' | 'en' | 'es'`.

**Risco principal:** Task 2, Step 6 (mover rotas para `(pt)`). Se o `next build` reclamar de root layout ausente para alguma rota, é porque um `page.tsx` ficou fora de um group; a lista do Step 6 cobre `page.tsx`, `cursos`, `conhecimento`, `stats`. Route handlers (`api`, `feed.xml`, `llms.txt`, `courses-sitemap.xml`) e `robots.ts` não precisam de layout.
