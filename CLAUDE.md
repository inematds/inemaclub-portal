# Portal INEMA — Guia de Atualizações

## Arquitetura

App **Next.js 16 (App Router)** hospedado no **Vercel**, servindo `inema.club`. Deploy é automático via webhook GitHub → Vercel ao dar push em `main`.

**Arquivos legados (NÃO EDITAR mais — ignorados em produção):**
- `data.js`, `index.html`, `styles.css`, `script.js` — vestígios da versão estática antiga. O Vercel/Next ignora.

**Arquivos que valem:**
- `src/data/courses.ts` — fonte única dos cursos (`platformsData`) e do histórico (`updatesData`). Consumido por Portal.tsx e PortalV2.tsx via `import`.
- `src/components/Portal.tsx` — rota `/` (versão atual). Tem também uma **lista hardcoded de trilhas** que precisa ser atualizada manualmente quando o curso pertencer a alguma trilha.
- `src/components/PortalV2.tsx` — rota `/new`. **CONGELADO — NÃO ATUALIZAR MAIS** (descontinuado, mantido só por histórico). Toda atualização de curso/trilha vai apenas no `Portal.tsx`.
- `src/app/page.tsx` → renderiza `Portal`. `src/app/new/page.tsx` → renderiza `PortalV2`.

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

`PortalV2.tsx` (rota `/new`) está **congelado** — não precisa mais ser atualizado.

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
