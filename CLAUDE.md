# Portal INEMA — Guia de Atualizações

## Conta / autor dos commits

Este repo é da conta **`NeiMaldaner`** (remote `git@github-nei:NeiMaldaner/portal.git`). Todo commit vai com autor **e** committer:

```
NeiMaldaner <nei.maldaner2014@gmail.com>
```

Este é o autor deste repo em qualquer situação — não existe default ou fallback para outra conta aqui. Antes de commitar, conferir `git config user.email` (deve ser `nei.maldaner2014@gmail.com`). Se um commit já pushado sair com autor errado: `git commit --amend --reset-author` + `git push --force-with-lease`.

## Arquitetura

App **Next.js 16 (App Router)** hospedado no **Vercel**, servindo `inema.club`. Deploy é automático via webhook GitHub → Vercel ao dar push em `main`.

**Arquivos legados (NÃO EDITAR mais — ignorados em produção):**
- `data.js`, `index.html`, `styles.css`, `script.js` — vestígios da versão estática antiga. O Vercel/Next ignora.

**Arquivos que valem:**
- `src/app/globals.css` — **o CSS global de verdade** (importado por `src/app/layout.tsx`). As classes globais usadas pelo `Portal.tsx` (`.header`, `.community-badge`, `.section-nav`…) vivem aqui. Cuidado: o `styles.css` da raiz tem cópias antigas dessas MESMAS classes e não é servido — editar lá não muda nada no site.
- `src/data/courses.ts` — fonte única dos cursos (`platformsData`) e dos feeds `updatesData` / `projectUpdatesData`.
- `src/components/Portal.tsx` — rota `/`, home única. Tem também o array `communityProjects` (projetos) e a **lista hardcoded de trilhas**.
- `src/app/page.tsx` → renderiza `Portal`. (`PortalV2.tsx` e a rota `/new` foram **removidos** — não existem mais.)

## Home enxuta (2026-08-01) — flag `SHOW_DETALHES`

O topo do `Portal.tsx` tem `const SHOW_DETALHES = false`. Ele esconde, **sem apagar nada**: o grid de cursos, a busca, o grid de projetos, os itens dentro dos blocos de trilha e a seção de repositórios GitHub. Religar pra `true` traz tudo de volta.

A home hoje: header → evento → Trilha para Iniciantes (completa) → 3 quadros de "Últimas Atualizações" (cursos, projetos, repositório) → banner Perfis IA → banners → "Trilhas de Aprendizado do INEMA.PRO" (só títulos, em grade) → Projetos (chamada única "+400", botão pro `inema.pro`) → Telegram → social → footer.

**Os arrays continuam sendo mantidos normalmente** — `platformsData` e `communityProjects` alimentam o `pro.inema.club` via `courses.data.json` → `cursos.json`/`projetos.json` → `base.json`. Não pare de atualizá-los só porque não renderizam mais aqui.

Snapshot estático da home anterior: `public/index2.html` → `https://inema.club/index2.html`.

## Últimas Novidades (feed do INEMA.VIP) — automático

Seção da home logo **antes** de "Últimas Atualizações de Cursos". Vem do tópico
`306` do grupo INEMA.VIP no Telegram, que já é um feed curado pelo Nei: cada
anúncio é um bloco fechado por uma linha de `=====`.

- `scripts/gera-novidades.mjs` — parser. Resolve `t.me/c/<grupo>/<topico>` para a
  rota **same-origin** `https://www.inema.pro/cerebro/<slug>/<id>`, **só emite o
  item se a chave já existe no `cerebro.json`** (senão espera o ciclo seguinte,
  nada de 404), e puxa o `**Resumo curto**` do
  `out2/<grupo>/<topico>/resumo.md`. Bloco sem link do cvip também vira novidade,
  com link externo quando houver. Sem LLM — custo zero.
- `src/data/novidades.ts` — **GERADO, não editar à mão.** Lista rolante de 30.
- `state/novidades-portal.json` (no `telegramtopicosindex`) — dedupe; janela de
  3 dias, então uma noite que falhar se recupera sozinha na seguinte.
- Cron: `45 1 * * *`. Tem que ser **depois do cerebro-vip** (00:30, termina ~01:15)
  **e do `sync-cerebro.sh` do inemapro-mono** (01:30), que baka o `cerebro.json`.

**Não linkar pro `cvip.inema.pro/<slug>/<id>.html` direto**: aquele host responde
`307 -> inema.pro/` e o assinante cai no `/entrar` sem retorno, perdendo o destino.
O link certo é sempre a rota `/cerebro` do `inema.pro` — mesmo motivo do fix
`c561bd7` no inemapro-mono.

Mexeu no id `#novidades`? Ele **não** está em `PORTAL_ANCHORS` — se quiser que o
agente de chat navegue até lá, adicione e rode `npx supabase functions deploy chat`.

## Agente de chat (guia do site)

`src/components/AgenteChat/` monta o widget; a inteligência está na Edge Function do Supabase, em `supabase/functions/`. Dois arquivos importam:

- `_shared/tools.ts` → `PORTAL_ANCHORS`, enum fechado de rotas do `navigate_to`. Hoje: `#trilha-iniciantes`, `#trilhas`, `#projetos`, `#comunidade`, `#telegram`, `#social`. **Mexeu em seção da home? Atualize aqui**, senão o agente leva o visitante pra âncora morta.
- `_shared/prompts.ts` → system prompt, com o mapa do site e a arquitetura de ofertas.

O catálogo que o agente cita vive na tabela `catalogo_fichas` (Supabase), espelhando as páginas do repo `NeiMaldaner/conhecimento` (servidas em `/conhecimento/*` via rewrite no `src/proxy.ts`). Mudou a ficha? Atualize a página **e** a linha da tabela.

**Edge Function não sai no deploy do Vercel** — depois de editar `supabase/functions/`, rode `npx supabase functions deploy chat`.

## Como adicionar um curso novo

### 1. `src/data/courses.ts` — `platformsData`

Entrar em **ordem alfabética por title**. ID = `MAX(id) + 1`.

```ts
{
  id: 117,
  title: 'NOME — Subtítulo',
  description: 'Descrição breve, 1-2 frases.',
  icon: '📚',
  tags: ['Tag1', 'Tag2', 'IA'],
  url: 'https://inematds.github.io/repo/',
},
```

### 2. `src/data/courses.ts` — `updatesData`

Adicionar no **topo** (mais recente primeiro):

```ts
{ date: '2026-MM-DD', title: 'NOME — Subtítulo', type: 'novo', url: 'https://inematds.github.io/repo/' },
```

`type` ∈ `'novo' | 'atualizado'`.

### 3. Trilhas em `Portal.tsx` (se aplicável)

Se o curso pertence a uma trilha existente (Claude Code, Agentes Jarvis, etc), adicionar o item à lista hardcoded no `Portal.tsx`. Procurar pelo bloco da trilha e inserir:

```ts
{ href: 'https://inematds.github.io/repo/', label: 'nome-curto', desc: 'Descrição curta' },
```

Desde 2026-08-01 os itens de trilha **não renderizam** na home (só os títulos das trilhas aparecem) — mas continue adicionando: o dado fica preservado e volta com `SHOW_DETALHES = true`.

### 4. Commit + push

```bash
git add src/data/courses.ts src/components/Portal.tsx
git commit -m "Add <NOME> course (id <N>) to portal"
git push
```

Vercel detecta o push e dispara build automaticamente. Build leva ~1-2 min. Cache CDN limpa em ~5 min.

## Como verificar que apareceu no ar

1. Vercel dashboard: https://vercel.com/dashboard → projeto portal-inema → Deployments. Confirmar que o último deploy está `Ready`.
2. `fetch('https://inema.club/')` no terminal e procurar pelo slug do repo.
3. Se Vercel falhar, ler o build log. Erro comum: TypeScript fora de tipo em `courses.ts` (faltou vírgula, tag duplicada).

## Buscar dados de um curso novo

Quando o user manda só a URL do curso (`https://inematds.github.io/X/`), usar WebFetch / fetch direto pra extrair:
- Título completo
- Descrição (primeira frase do hero ou meta description)
- Trilhas / módulos / duração (se aparecer)
- Escolher ícone temático adequado

## Comunidade — repositórios GitHub

Listagem no portal: 12 mais recentes (excluindo `portal`) + 6 com mais estrelas. Atualização separada do fluxo de cursos.

## Badge "Participe da Comunidade"

- Topo esquerdo do header
- Imagem: `public/doc/conviteinemap.png` (120px)
- Texto: "Participe da Comunidade" (1.1rem)
- Link: https://inema.vip

## GUIAS DE PROJETO (≠ cursos)

Guia de projeto = página landing+guia (padrão INEMA, skill `projetos-landing-guia`) de um **projeto** da comunidade. **Nunca entra em cursos** (`platformsData`/`updatesData`). Entra na seção **Projetos** e no quadro **"Últimas Atualizações de Projetos"**.

**Onde fica no código:**
- `src/components/Portal.tsx` → array `communityProjects` (seção "Projetos"). Renderizado em **ordem alfabética** (`sortedProjects` com `localeCompare`). Card do guia: `badge: 'Guia'`, `url` = a URL do guia.
- `src/data/courses.ts` → `projectUpdatesData` (tipo `Update`) alimenta o quadro "Últimas Atualizações de Projetos" no `Portal.tsx`. Adicionar no topo.

**Hospedagem (GitHub Pages, org `inematds`):** decidir por repo:
- Repo do projeto **sem** Pages → publicar o guia num branch **`gh-pages`** do próprio repo (não toca o `main`/app). URL limpa: `inematds.github.io/<slug>/`.
- Repo que **já serve** Pages, ou repo **externo**, ou **sem** repo → repo dedicado **`inematds/<slug>-guia`** (Pages do `main`). URL: `inematds.github.io/<slug>-guia/`.
- Checar antes: `gh api repos/inematds/<slug>/pages` (200 = já tem Pages).

**Ferramentas reutilizáveis** (build feito em 2026-06-20, ~34 guias):
- `~/projetos/guias-build/` — uma subpasta por guia (`<slug>/index.html` + `.nojekyll`), fonte local para editar/re-publicar.
- `~/projetos/guias-build/_publish.sh ghpages <slug>...` | `_publish.sh separate <slug>...` — publica e habilita Pages (idempotente, force-push).
- `~/projetos/guias-build/_template.html` — cópia do template da skill.

Sem fonte acessível não se inventa guia: `Restaurante Brutal` (sem repo) e `book-genesis` (PhilipStark, 404) ficaram **sem** guia, com o card apontando para o destino original.
