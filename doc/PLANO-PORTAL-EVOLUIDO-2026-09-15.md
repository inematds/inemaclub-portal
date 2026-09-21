# Plano — Portal INEMA evoluído (eventos + notícias + educação)

Data: 2026-09-15. Autor: Claude (Fable 5.1) a pedido do Nei. Status: **proposta, nada construído.**

**Pedido:** um portal de eventos, notícias e educação mais evoluído que o inema.club de hoje,
no estilo editorial do eventos.inema.pro, que seja base de conhecimento **e** promocional.
Pesquisar o que pode viralizar e propor um plano viral e/ou pago.

**Recomendação em uma linha:** orgânico-primeiro, apoiado na fábrica de conteúdo que já existe,
com **um** teste pago pequeno e medido no mês 2. Detalhes na seção 7.

**Decisões do Nei em 2026-09-15 (depois da 1ª versão):**
- O portal de conteúdo é **trilíngue (pt, es, en)** desde o primeiro dia.
- Vive num domínio próprio, **news.inema.pro** (ou nome parecido). O **eventos.inema.pro fica só como
  agenda de eventos**; tudo que hoje é repassado pra lá como conteúdo editorial passa a ir pro news.
- Layout **impactante mas funcional, de leitura fácil**. Mockup navegável em
  `doc/mockup-portal-conteudo.html`; capturas desktop/celular nos 3 idiomas em
  `~/projetos/output/news-inema-layouts/` (enviadas ao @inemav3bot).

---

## 1. O que existe hoje (verificado em 2026-09-15)

| Superfície | Estado | O que serve pro plano |
|---|---|---|
| **inema.club** (repo `portal`) | Next.js 16 + Supabase no Vercel. Home enxuta, i18n pt/en/es, `feed.xml`, `llms.txt`, contador de visitas no Supabase, seção "Últimas Novidades" alimentada automaticamente pelo tópico 306 do INEMA.VIP (parser sem LLM) | Base técnica pronta: banco, feed, idiomas, medição. É aqui que o portal evoluído deve nascer |
| **eventos.inema.pro** (repo `inemaeventos`) | HTML estático no GitHub Pages. Formato editorial longo por área (AGI-ready, WebMCP, Gestão de IA 2027, Content2Video, Meridiano, imersões). Paleta dark `#0a0b0d` + âmbar + ciano, fonte mono | É o **estilo** pedido. Faltam: `ld+json` (0 na página), analytics (nenhum script), datas estruturadas de evento |
| **pay.inema.pro / inema.vip** | Assinatura R$ 42/mês, R$ 327 ou R$ 300/ano (riscado R$ 67 / R$ 543) | Único produto pago. O portal é o topo desse funil |
| **Comunidade (inema.pro, Telegram INEMA.VIP, t.me/apoioinema)** | Curadoria diária do Nei no tópico 306 | Matéria-prima do "briefing diário" já existe, com custo zero |
| **Fábrica de conteúdo** | inemaccbot (fila durável, fluxos com portão humano), inemapromover (1 assunto → 11 reels por público → 11 canais YouTube lives21–31), content2video, musicavideo, inemavox (TTS), HeyGen (avatar), Codex image_gen (banners), Agnes (vídeo a US$ 0) | Cada formato viral abaixo mapeia num pipeline que já roda. Vantagem que os concorrentes não têm |
| **Público** | Primário: 40+ leigo (formato-curso-v5). Secundário: 11 personas do inemapromover | Filtro pra escolher canal: WhatsApp, YouTube, e-mail, Facebook, não Threads/X |

Baseline de audiência: **não há número confiável além do contador do Supabase.** Medir na semana 1
antes de qualquer meta.

## 2. O que a pesquisa diz (fontes no relatório anexo, seção 9)

- **Newsletter de IA é o formato dominante do nicho.** The Rundown AI: 2 M assinantes e US$ 10 M/ano em 2,8 anos. TLDR AI 1,25 M. Ben's Bites saiu de 0 a 110 mil em 13 meses com referral ativado no 7º dia.
- **No Brasil funciona sem mídia paga.** Newsletter de gestão + IA chegou a 30 mil assinantes orgânicos em menos de 2 anos. Grupo de WhatsApp de IA com 4.700 membros. A Globo lançou a "IAí" (IA para leigo), confirmando o tamanho do mercado.
- **WhatsApp Channels** tem 500 M usuários mensais; WhatsApp está em 99% dos smartphones brasileiros. É o canal nativo do 40+.
- **Google mudou.** AI Overviews aparecem em 48% das buscas e derrubam o CTR orgânico em 58 a 61%. O contraponto é o **Google Discover**: notícia publicada até 1 h depois do fato rende +103% de tráfego.
- **Schema.org Event** (name, startDate, location, endDate, eventStatus, image 16:9 ≥1200×675, offers) habilita carrossel de eventos no Google e citação em AI Overviews. Esforço baixo.
- **Interativo converte:** quiz e enquetes dão 2× conversão e 5× pageviews. Certificado com o nome do usuário em destaque gerou +300% de compartilhamento num case.
- **Referral nativo:** beehiiv tem programa de indicação embutido (SparkLoop está descontinuando). Substack fica com 10% da receita; beehiiv cobra fixo.
- **Pago, benchmarks externos (não são dados INEMA):** CPL médio Meta Ads 2025 US$ 27,66; Google Ads US$ 70,11; Brasil é "tier 3" no Meta (CPM ~US$ 4,20) com 20 a 30% de tráfego suspeito de bot. **Não existe CPL confiável para "educação/IA Brasil 40+"**: só medindo.
- **Público 40+/60+ já está online:** 74,5% dos 60+ conectados, 65+ usam smartphone ~22 h/semana.

## 3. Conceito: news.inema.pro, o portal de conteúdo

Um portal com três motores editoriais no formato longo do eventos.inema.pro, todos alimentados
pela fábrica atual:

1. **Eventos** — a agenda continua no eventos.inema.pro; o news mostra os próximos e, para cada
   evento, publica o artigo editorial (o que muda, tese, como aplicar, gravação, oferta).
2. **Notícias / Briefing de IA** — um "IA em 3 minutos" diário ou 3× por semana, escrito para leigo
   40+, com a mesma curadoria que o Nei já faz no tópico 306. Cada edição vira: página no portal
   (Discover), e-mail (beehiiv), post no Canal do WhatsApp, reel narrado (inemapromover) e áudio
   (inemavox). **Um insumo, seis saídas, sem trabalho novo de curadoria.**
3. **Educação** — as trilhas e cursos gratuitos que já existem, mais dois imãs: **quiz "Que
   nível de IA você está?"** com resultado compartilhável e **certificado com nome** ao terminar
   uma trilha.

**Divisão de superfícies (decidida em 2026-09-15):**

| Domínio | Papel | O que tem |
|---|---|---|
| **news.inema.pro** | portal de conteúdo | briefing diário, artigos longos no formato editorial, trilhas/educação, quiz, certificado, captura de e-mail/WhatsApp |
| **eventos.inema.pro** | agenda | calendário, página por evento com Event schema, inscrição, gravação depois; cada evento linka o artigo correspondente no news |
| **inema.club** | porta de entrada | home enxuta que já existe, apontando pros dois |

Assunção de arquitetura: **news.inema.pro nasce como app Next.js no mesmo padrão do repo `portal`**
(rotas `/`, `/es/`, `/en/`, Supabase, feed, `llms.txt`), reaproveitando `src/i18n`, `RootShell` e
`buildRootMetadata`. Pode ser o próprio repo `portal` com o domínio novo apontando pra um grupo de
rotas, ou um repo irmão `inematds/news` copiando a base. Recomendo **repo irmão**: o portal fica
enxuto e o news pode ter modelo de dados próprio (edições, artigos, traduções). O eventos continua
estático no GitHub Pages, só ganhando schema, analytics e um JSON público da agenda que o news lê.

## 3.1 Três idiomas: como o conteúdo funciona

- **Uma URL por idioma**, sem redirect automático, igual ao portal: `news.inema.pro/`, `/es/`, `/en/`.
  `hreflang` entre as três e `canonical` por idioma.
- **Modelo de dados:** cada peça (edição do briefing, artigo, evento, trilha) é um registro com
  `slug` fixo e três blocos de texto `{pt, es, en}`. Sem tradução pronta, a página mostra o PT com
  o selo "conteúdo em português", como o portal já faz com cursos.
- **Fluxo de tradução:** o PT é a fonte. Uma skill traduz pra ES e EN na hora de publicar (LLM),
  com revisão humana só nos títulos e chamadas. Nomes de cursos, projetos e marcas não se traduzem.
- **Newsletter e canal por idioma:** três listas no beehiiv e três Canais do WhatsApp. Começar só
  com PT e abrir ES/EN quando cada um passar de ~200 pedidos (medir pelo seletor de idioma no site).
- **Banners e imagens com texto:** gerados por idioma com o Codex (`codex exec -i <png>`), como a
  regra do portal já manda; imagens sem texto são compartilhadas.
- **Busca e Discover:** o Discover é por idioma e país. O PT mira Brasil; ES mira LatAm e Espanha;
  EN é o de menor aposta inicial.

## 3.2 Layout (mockup entregue)

- **Tipografia:** display *Bricolage Grotesque*; corpo *Atkinson Hyperlegible* a 19px, linha 1,6,
  máximo 68 caracteres por linha. Escolha deliberada pra leitor 40+.
- **Paleta:** a do eventos.inema.pro (fundo `#0a0b0d`, painel `#111317`, âmbar `#f5c04a`, ciano
  `#38bdf8`), pra manter a mesma família visual.
- **Hero = "primeira página de hoje":** data em destaque, três manchetes do briefing com horário,
  botão "Ler a edição de hoje" e o próximo evento ao lado. É o único elemento de impacto; o resto é
  quieto.
- **Seções:** Hoje → Eventos (lista por data, com passado apagado) → Aprender (três trilhas por
  perfil + quiz) → Comunidade (WhatsApp, e-mail com indicação, Telegram, YouTube, oferta VIP).
- **Seletor PT/ES/EN** no topo, sem recarregar. No celular tudo vira uma coluna; datas e manchetes
  continuam grandes.
- Pendências do mockup: espaço vazio sob o card do próximo evento no desktop (candidato a banner
  da semana ou lista de edições), página de artigo e página de edição ainda não desenhadas.

Estrutura editorial de cada área, herdada do eventos.inema.pro:
`o que muda → tese → competências/ideias → como aplicar (curso/guia) → acervo → oferta`.

## 4. Trilha orgânica (viral)

| # | Aposta | Por que | Mapeia em | Esforço |
|---|---|---|---|---|
| 1 | **Newsletter "IA em 3 minutos"** em beehiiv com referral desde o dia 1 (indique 3 → acesso a um mini-curso; 10 → 1 mês de VIP) | Maior alavanca comprovada do nicho | Parser do tópico 306 + redação por skill + envio | Médio |
| 2 | **Canal do WhatsApp INEMA** com o mesmo briefing | Canal nativo do 40+, zero atrito | Publicação manual ou via API do Canal | Baixo |
| 3 | **Event schema + página evergreen por evento** | Carrossel do Google e AI Overviews | Rota `/eventos/[slug]` no Next | Baixo |
| 4 | **Cobertura quente (<1 h) de lançamentos de IA** mirando o Discover | Único canal Google que cresce | agi-newprof / content2video geram análise + vídeo | Médio |
| 5 | **Quiz "Que nível de IA você está?"** com card de resultado pra compartilhar no WhatsApp | 2× conversão, 5× pageviews | Página no portal + imagem gerada (Codex/flux) | Baixo |
| 6 | **Certificado com nome grande** ao concluir trilha | +300% compartilhamento no case | Supabase (já tem login) + PDF/PNG | Baixo |
| 7 | **Reels por público** de cada edição (11 canais YouTube) | Já existe, só falta ligar ao briefing | inemapromover | Zero novo |
| 8 | **SEO programático híbrido**: uma página por ferramenta de IA e por tema, cada uma com FAQ própria escrita, não clonada | Cauda longa contínua | Skill de geração + revisão humana | Médio |
| 9 | **PWA + push web** no portal | Retenção sem depender de algoritmo | Next PWA | Médio |
| 10 | **Evento online gratuito trimestral** (desafio de 5 dias ou summit) com inscrição via newsletter | Ímã de lista + venda de VIP no fim | Já se faz imersões; só formalizar o funil | Médio |

Mecânica de loop: **briefing → e-mail/WhatsApp → indicação → mais assinantes → evento gratuito →
VIP.** Tudo que o assinante compartilha (resultado do quiz, certificado, edição do briefing) leva
o link do portal.

## 5. Trilha paga

Só depois de a trilha orgânica ter medição (semana 1) e um imã funcionando (quiz ou newsletter).
Valores abaixo são **estimativas externas**, não dados INEMA.

| Nível | Verba/mês | Onde | Objetivo | Expectativa (a validar) |
|---|---|---|---|---|
| **Piloto** | R$ 500 | Meta Ads, objetivo Leads, 40+ BR, criativo = reel do inemapromover | Descobrir o CPL real do nicho | Com CPL de US$ 15 a 30 (Meta BR barato): 90 a 180 assinantes/mês |
| **Crescimento** | R$ 2.000 | Meta 70% + YouTube 30% (canais lives) | Escalar o criativo vencedor do piloto | 400 a 700 assinantes/mês |
| **Aceleração** | R$ 5.000 | Meta + YouTube + patrocínio de 1 newsletter BR do nicho | Encher o evento trimestral | 1.000+ assinantes/mês |

Regras: nunca escalar sem CPL medido no piloto; criativo sempre em vídeo (a fábrica produz de
graça); descontar 20 a 30% de tráfego suspeito nas leituras de Meta BR.

Outras receitas possíveis, em ordem de facilidade: patrocínio da newsletter (quando passar de
5 mil assinantes), ingressos de imersão presencial (já existe nota em `INEMAVIPw/NOTAS-IMERSAO-PRESENCIAL.md`),
listagem paga de ferramentas no diretório programático, afiliados de ferramentas de IA.

## 6. Fases

**Semana 1 — medir e destravar (sem design novo)**
- Analytics no portal e no eventos (Plausible ou GA4). Registrar baseline de visitas, origem, top páginas.
- Event schema nas páginas de evento existentes. Testar no Rich Results Test.
- Criar Canal do WhatsApp INEMA e conta beehiiv (plano gratuito basta pra começar).
- Publicar a 1ª edição do "IA em 3 minutos" a partir do tópico 306.

**Semanas 2 a 4 — o loop mínimo**
- Rota `/hoje` (briefing) e `/eventos` no portal, no visual do eventos.inema.pro.
- Quiz de nível de IA com card compartilhável.
- Referral do beehiiv ligado com as duas recompensas.
- Ligar o briefing ao inemapromover: cada edição gera reels pros 11 canais.

**Mês 2 — teste pago + certificado**
- Piloto Meta Ads R$ 500 com 3 criativos em vídeo. Meta: CPL medido.
- Certificado com nome ao concluir trilha para iniciantes.
- Migrar o eventos.inema.pro pra dentro do portal (domínio aponta pra rota).

**Mês 3 — escalar o que provou**
- Se CPL ≤ R$ 15: subir pra R$ 2.000. Se não: seguir só orgânico e revisar criativo.
- 1º evento online gratuito com inscrição via newsletter.
- SEO programático: primeiras 30 páginas de ferramentas/temas.
- PWA + push.

## 7. Decisão: viral, pago ou os dois?

**Orgânico primeiro.** Motivos: a curadoria diária já existe, a fábrica de vídeo já existe, o
nicho no Brasil cresce sem mídia (case de 30 mil orgânicos), e não há CPL conhecido pra gastar
com segurança. O pago entra como **medição** (R$ 500 no mês 2), não como motor.

O que viraria a decisão pra "pago-primeiro": um evento com data e capacidade a encher em menos de
30 dias, ou o piloto mostrar CPL abaixo de R$ 10 com assinante que abre e-mail.

## 8. KPIs

| KPI | Baseline | Meta 90 dias | Fonte |
|---|---|---|---|
| Visitas/mês no portal | medir semana 1 | 3× | contador Supabase / analytics |
| Assinantes newsletter | 0 | 2.000 | beehiiv |
| Taxa de abertura | — | ≥ 35% (leigo 40+ abre mais que dev) | beehiiv |
| % assinantes vindos de indicação | — | ≥ 20% | beehiiv referral |
| Membros do Canal WhatsApp | 0 | 1.000 | WhatsApp |
| Eventos com rich result no Google | 0 | 100% | Search Console |
| Tráfego Discover | 0 | existir | Search Console |
| CPL Meta (piloto) | — | ≤ R$ 15 | Ads Manager |
| Conversão assinante → VIP | — | ≥ 1% | pay.inema.pro |

## 9. O que não verifiquei

- Números atuais de visitas, membros do VIP e inscritos nos canais YouTube: não li o Supabase nem o YouTube.
- CPL real do nicho no Brasil: não existe em fonte confiável; só o piloto responde.
- Dados 2025–26 de Threads, LinkedIn newsletters, Shorts e TikTok BR: a pesquisa não achou fonte sólida.
- Se o Canal do WhatsApp aceita publicação por API na conta INEMA (pode exigir a API oficial da Meta).
- Custo do beehiiv com referral: o plano com indicação começa em ~US$ 517/ano; o gratuito serve pra começar sem referral.

**Fontes principais da pesquisa:** therundown.ai/advertise-with-us · growthinreverse.com/bens-bites ·
querobolsa.com.br (newsletter 30 mil orgânicos) · distrito.me (IAí Globo) · beehiiv.com/blog/newsletter-referral-program ·
blog.beehiiv.com (SparkLoop → beehiiv) · mediacopilot.ai (AI Overviews × Discover) ·
developers.google.com/search/docs/appearance/structured-data/event · thunderbit.com (WhatsApp Channels) ·
cndl.org.br (WhatsApp BR) · wordstream.com e get-ryze.ai (CPL 2025) · adamigo.ai (CPM BR) ·
socialbaddie.com (interativo) · marketingideas.com (certificado) · publift.com (Core Web Vitals) ·
olhardigital.com.br e primeiroasaber.com.br (60+ online).
