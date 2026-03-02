# Diagnóstico de Design — Portal INEMA.CLUB
**Data:** 2026-03-02
**Referência de elite analisada:** adapta.org
**Avaliador:** Claude Sonnet 4.6 (análise de designer sênior)

---

## Resumo Executivo

O portal INEMA possui uma base técnica sólida (Next.js, Supabase, componentes bem estruturados) e uma identidade visual funcional. Porém, quando comparado ao benchmark adapta.org — considerado o estado da arte do webdesign educacional brasileiro — há lacunas significativas em sofisticação visual, hierarquia tipográfica, identidade de marca e experiência do usuário.

**Nota geral atual:** 5.5/10
**Potencial com as melhorias:** 8.5/10

---

## 1. Tipografia — Nota: 4/10

### Problema crítico
O portal usa **system font stack** (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`). Isso é a escolha padrão de quem não escolheu nenhuma fonte. Não há personalidade, não há voz de marca.

**Adapta.org usa:** Satoshi + Instrument Sans + Space Grotesk + Inter — 4 famílias curadas com papéis específicos. Isso é um design system maduro.

### O que fazer
- Adotar **Inter** para corpo (gratuita, Google Fonts, excelente legibilidade)
- Adotar **Space Grotesk** para títulos (tecnológica, moderna, personalidade)
- Implementar `-webkit-font-smoothing: antialiased` globalmente
- Criar escala tipográfica formal: 12 / 14 / 16 / 18 / 24 / 32 / 48px

### Exemplo de implementação
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
```

---

## 2. Paleta de Cores — Nota: 5/10

### Problema
O ciano `#00d9ff` como cor única de acento é a escolha padrão de templates "dark tech/gaming". É genérica, overused e não comunica o posicionamento educacional/inovador do INEMA.

**O problema real:** quando TUDO brilha em ciano (borders, shadows, logos, links, chips, cards), nada tem destaque. A hierarquia visual colapsa.

### Comparação com Adapta

| Elemento | Portal INEMA | Adapta.org |
|----------|-------------|------------|
| Cor primária | `#00d9ff` ciano genérico | `#811def` roxo vibrante único |
| Fundo | `#0a0e27` azul-escuro padrão | `#0e1513` preto-esmeralda incomum |
| Fundo claro | — | `#f5f8f7` branco-frio sutil |
| Gradiente CTA | linear 135deg (comum) | radial de baixo para cima (único) |
| Paleta de acentos | 2 cores (ciano + roxo) | 5 famílias de cor com propósito |

### O que fazer

**Proposta de nova paleta INEMA:**
```css
:root {
  /* Identidade — roxo-índigo (tecnologia + conhecimento) */
  --brand-primary: #6366f1;       /* indigo vibrante */
  --brand-primary-hover: #4f46e5;
  --brand-glow: rgba(99, 102, 241, 0.3);

  /* Acento — âmbar (energia, destaque brasileiro) */
  --brand-accent: #f59e0b;

  /* Fundos — pretos com personalidade */
  --bg-color: #0c0c14;            /* preto levemente roxo */
  --bg-secondary: #111118;
  --card-bg: #16161f;
  --card-hover: #1c1c28;

  /* Gradiente signature INEMA */
  --gradient-signature: radial-gradient(60% 120% at 50% 100%, #6366f1 0%, #a78bfa 100%);
}
```

---

## 3. Espaçamento e Ritmo Visual — Nota: 4/10

### Problema crítico
O portal usa padding de seção de `2rem–3rem`. O adapta.org usa `128px` (8rem). Isso é a diferença entre um site que "parece apertado" e um que "respira".

**Princípio:** espaço em branco não é espaço vazio — é hierarquia, é luxo, é confiança.

### Comparação de espaçamento

| Elemento | Portal INEMA | Adapta.org | Recomendado |
|----------|-------------|------------|-------------|
| Padding de seção | 2–3rem (32–48px) | 8rem (128px) | 5–8rem |
| Gap entre cards | 2rem | 1.5rem (mas com mais padding interno) | 1.5rem |
| Padding de card | 2rem | 2.5rem | 2.5rem |
| Espaço entre header e conteúdo | 0.5rem | 3rem+ | 2rem |

### O que fazer
Aumentar generosamente o espaço entre seções. Parece contra-intuitivo, mas comunica premium.

```css
.section {
  padding: 5rem 0;  /* mínimo — elevar para 6-8rem onde possível */
}
```

---

## 4. Efeitos Visuais (Glow/Shadow) — Nota: 3/10

### Problema grave
O portal aplica `box-shadow: 0 0 40px rgba(0,217,255,0.1)` em TODOS os elementos. Cards, headers, footers, inputs, botões, imagens, containers — tudo brilha em ciano.

**Resultado:** nenhum elemento tem destaque porque todos têm o mesmo tratamento. O glow perde significado.

### Regra de ouro do design
> "Se tudo é especial, nada é especial."

### O que fazer
- Glow/brilho só em **um** elemento por contexto: o CTA primário
- Cards usam sombra neutra (sem cor): `0 4px 24px rgba(0,0,0,0.4)`
- Hover de card: elevação + leve borda colorida (sem glow explosivo)
- Reservar glow para o botão de ação principal

```css
/* ERRADO — atual */
.card:hover {
  box-shadow: var(--shadow-glow); /* ciano em tudo */
}

/* CERTO — proposto */
.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border-color: var(--brand-primary);
  /* sem glow colorido */
}

/* Reservar glow só para CTAs */
.btn-primary {
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.4);
}
```

---

## 5. Hierarquia Visual entre Seções — Nota: 5/10

### Problema
Todas as seções têm o mesmo peso visual. Header, hero, trilha, cursos, github, telegram, social, footer — nenhuma seção se destaca como mais importante.

**Adapta.org** usa contraste de fundos (escuro header → claro conteúdo → escuro especial → claro footer) para criar ritmo e hierarquia.

### O que fazer
Definir hierarquia de peso por seção:

| Prioridade | Seção | Tratamento |
|-----------|-------|-----------|
| ⭐⭐⭐ Hero/Banner | Máxima atenção | Full-width, gradiente, animação |
| ⭐⭐⭐ Cursos | Ação principal | Padding generoso, cards destacados |
| ⭐⭐ Trilha Iniciantes | Importante | Destaque visual, numbered steps |
| ⭐⭐ INEMA.VIP CTA | Conversão | Gradiente signature, botão proeminente |
| ⭐ GitHub/Social/Telegram | Secundário | Layout compacto, fundo diferente |

---

## 6. Call-to-Actions — Nota: 5/10

### Problema
O botão "Acessar plataforma" é um link de texto com seta (`→`). Não é um botão real. Em mobile, é difícil de clicar. Não há hierarquia clara entre CTAs primários e secundários.

### O que fazer

```css
/* CTA Primário */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--gradient-signature);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.2s ease;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(99, 102, 241, 0.55);
}
```

---

## 7. Navegação — Nota: 3/10

### Problema grave
**O portal não tem navegação**. Não há menu, não há links internos, não há forma do usuário saber o que existe na página antes de scrollar tudo.

**Adapta.org:** navegação fixa no topo com links para todas as seções principais.

### O que fazer
Adicionar uma navbar sticky minimalista:

```
[INEMA.CLUB]  Cursos  Trilha  GitHub  Comunidade  [Entrar →]
```

Características:
- `position: fixed; top: 0; z-index: 100`
- Background: `rgba(12, 12, 20, 0.85)` com `backdrop-filter: blur(12px)` (glassmorphism)
- Altura: 60px
- Smooth scroll para seções com `scroll-behavior: smooth`

---

## 8. Seção de Cursos (Cards) — Nota: 6/10

### O que está bem
- Grid responsivo funciona
- Hover com elevação é correto
- Tags são úteis
- Busca funciona

### O que melhorar

1. **Ícones**: emoji em `background: gradient` é visualmente fraco — considerar SVG icons ou fundo sólido sem gradient
2. **Título do card**: `font-size: 1.5rem` é muito grande para cards em grid de 3
3. **CTA**: Transformar "Acessar plataforma" em botão full-width no final do card
4. **Hover**: Reduzir `translateY(-8px)` para `-4px` — 8px é exagerado
5. **Borda colorida no hover**: Funciona bem, manter

---

## 9. Seção Telegram — Nota: 4/10

### Problema crítico
Os itens do Telegram são **divs sem link**. Usuários que clicam não vão a lugar nenhum. Isso quebra a expectativa e frustra o usuário.

```tsx
// ATUAL — não clicável
<div className="telegram-btn">

// DEVERIA SER — com link real
<a href="https://t.me/inema_tds" className="telegram-btn" target="_blank">
```

### Ação necessária
Mapear todos os 27 grupos/canais para seus links do Telegram e adicionar no Portal.tsx.

---

## 10. Animações e Micro-interações — Nota: 4/10

### O que existe
- `fadeIn` na carga dos cards (boa ideia, mas só nos cards)
- `translateY` no hover de cards (correto)
- `translateX` no badge INEMA.VIP no hover (criativo)

### O que falta (adapta.org tem tudo isso)
1. **Scroll-triggered animations**: elementos entram na viewport com fade+slide
2. **Stagger animations**: cards aparecem em sequência (card1, card2, card3...)
3. **Counter animation**: números de visitas animam de 0 ao valor real
4. **Smooth scroll**: navegação por âncoras com scroll suave
5. **Loading skeleton**: enquanto dados carregam, mostrar placeholder animado

### Implementação leve (sem biblioteca)
```css
/* Scroll reveal via CSS + JS minimal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.1 }
)
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
```

---

## 11. Performance Visual — Nota: 6/10

### Riscos identificados
- **Múltiplos box-shadows complexos** em cada card (6+ shadows por elemento): impacto em GPUs de mobile
- **Sem `will-change`** em elementos animados
- **Sem `content-visibility: auto`** para seções fora da viewport
- **Fontes do sistema** carregam rápido (ponto positivo atual, porém genérico)

### O que fazer
```css
/* Otimizar elementos animados */
.card {
  will-change: transform;
  contain: layout style;
}

/* Lazy render seções longas */
.github-section,
.telegram-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 600px;
}
```

---

## 12. Identidade de Marca — Nota: 5/10

### Análise
A identidade atual do portal é "dark tech genérico" — poderia ser qualquer plataforma de tecnologia. Não há elementos únicos que comuniquem especificamente o INEMA.

**Adapta.org** tem um gradiente radial signature tão reconhecível que você sabe que é a Adapta antes de ler o nome.

### O que o INEMA precisa
1. **Gradiente signature único** — proposta: roxo-índigo saindo de baixo (radial-gradient)
2. **Fonte de título com personalidade** — Space Grotesk ou Sora
3. **Elemento visual recorrente** — uma forma, um padrão, algo que apareça em todos os CTAs
4. **Cor de acento quente** — âmbar/laranja para contrastar com o tech-frio e comunicar calor/comunidade brasileira

---

## 13. Acessibilidade — Nota: 4/10

### Problemas identificados
- Links sem `aria-label` descritivo (ex: "Acessar plataforma" repetido em 30 cards)
- Foco visual não estilizado (só o padrão do browser)
- Contraste de `var(--text-secondary)` `#94a3b8` sobre `#1a1f3a` pode ser insuficiente (verificar WCAG AA)
- Inputs sem `<label>` associado (busca)

### O que fazer
```css
/* Foco visível e bonito */
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 3px;
  border-radius: 4px;
}
```

```tsx
// Label na busca
<label htmlFor="search" className="sr-only">Buscar cursos</label>
<input id="search" type="search" ... />

// aria-label únicos nos cards
<a href={course.url} aria-label={`Acessar ${course.title}`}>
  Acessar plataforma
</a>
```

---

## 14. Mobile Experience — Nota: 6/10

### O que está bem
- Grid colapsa corretamente
- Texto escala bem
- Banner hero é responsivo

### O que melhorar
1. **Community badge**: em mobile fica deslocada do header — precisa de tratamento específico
2. **Telegram grid**: `1fr` em mobile com 27 itens = scroll infinito — considerar accordion ou tabs
3. **Cards de cursos**: em mobile, 1 coluna com padding generoso funciona bem (OK)
4. **Touch targets**: alguns botões têm menos de 44px de altura (mínimo recomendado Apple/Google)
5. **Seção de redes sociais**: 4 plataformas em coluna única em mobile é longa — considerar tabs

---

## Roadmap de Melhorias — Priorizado

### 🔴 Crítico (impacto imediato na experiência)

| # | Ação | Esforço | Impacto |
|---|------|---------|---------|
| 1 | Adicionar links reais nos botões Telegram | Baixo | Alto |
| 2 | Trocar system fonts → Space Grotesk + Inter | Baixo | Alto |
| 3 | Adicionar navbar sticky com scroll suave | Médio | Alto |
| 4 | Transformar "Acessar plataforma" em botão real | Baixo | Médio |

### 🟡 Importante (melhora percepção de qualidade)

| # | Ação | Esforço | Impacto |
|---|------|---------|---------|
| 5 | Reduzir overuse de glow — reservar para CTAs | Médio | Alto |
| 6 | Aumentar padding de seções para 5rem+ | Baixo | Alto |
| 7 | Criar gradiente signature INEMA (radial roxo) | Baixo | Alto |
| 8 | Adicionar scroll reveal animations | Médio | Médio |
| 9 | Novo sistema de cores (roxo-índigo + âmbar) | Médio | Alto |

### 🟢 Enhancement (diferencial de elite)

| # | Ação | Esforço | Impacto |
|---|------|---------|---------|
| 10 | Counter animation nos chips de visitas | Baixo | Médio |
| 11 | Loading skeleton nos cards | Médio | Médio |
| 12 | Adicionar aria-labels e melhorar acessibilidade | Médio | Médio |
| 13 | Accordion/tabs para seção Telegram em mobile | Alto | Médio |
| 14 | Cursor customizado (sutil) | Baixo | Baixo |

---

## O que o Adapta.org tem que nos inspira diretamente

1. **Gradiente radial de baixo para cima** nos CTAs — parece luz subindo, muito mais dinâmico que linear
2. **Header fixo escuro** com conteúdo claro abaixo — contraste poderoso de identidade
3. **Padding de seção generoso** — o "ar" é o que faz parecer premium
4. **Uma cor única de marca** muito forte — o roxo Adapta é inconfundível
5. **Design system com tokens CSS** — escalabilidade e consistência
6. **Tipografia curada** — Satoshi/Space Grotesk comunicam modernidade tech sem ser genérico

---

## Conclusão

O portal INEMA tem **excelente conteúdo e estrutura técnica**. O gap com o Adapta.org não é de funcionalidade — é de **percepção de qualidade**. Um usuário que acessa os dois sites consecutivamente sente que o Adapta é "uma empresa séria" e o INEMA é "um portal de tecnologia".

As mudanças de maior impacto e menor esforço são:
1. Tipografia nova (Space Grotesk + Inter)
2. Aumentar espaçamento entre seções
3. Reduzir overuse de glow ciano
4. Criar um gradiente signature único para o INEMA
5. Adicionar navbar

Essas 5 ações sozinhas elevariam o portal de **5.5 para 7.5/10** em percepção de qualidade.
