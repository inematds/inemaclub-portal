export interface Course {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  url: string
}

export interface Update {
  date: string
  title: string
  type: 'novo' | 'atualizado'
  url: string
}

// Guias de PROJETOS (não cursos). Alimenta a board "Últimas Atualizações de Projetos".
export const projectUpdatesData: Update[] = [
  { date: '2026-07-13', title: 'NVIDIA API Free — Console gratuito para 100+ modelos de IA', type: 'novo', url: 'https://inematds.github.io/nvidiaapifree/guia/' },
  { date: '2026-07-12', title: 'War Game Prompt — prompt reutilizável (EN + PT-BR) pra planejar qualquer build de IA como um war game', type: 'novo', url: 'https://inematds.github.io/promptwargame/guia/' },
  { date: '2026-07-12', title: 'Arquiteto de Execução — skill que decide paralelo × sequencial × híbrido antes de criar agentes', type: 'novo', url: 'https://inematds.github.io/agenteexecuta/guia/' },
  { date: '2026-07-10', title: 'AIV 2026 — AI Visibility como serviço (playbook AEO/GEO + case INEMA)', type: 'novo', url: 'https://inematds.github.io/aiv2026/guia/' },
  { date: '2026-07-09', title: 'wacrm — CRM self-hostable para WhatsApp (fork + landing + guia de uso publicados)', type: 'novo', url: 'https://inematds.github.io/wacrm/guia/' },
  { date: '2026-07-09', title: 'OS Coach — landing + guia de uso publicados (você constrói a base do seu OS agêntico)', type: 'novo', url: 'https://inematds.github.io/os-coach/guia/' },
  { date: '2026-07-09', title: 'os-agentes — landing + guia de uso publicados (passo a passo das 6 camadas)', type: 'atualizado', url: 'https://inematds.github.io/os-agentes/guia/' },
  { date: '2026-07-06', title: 'Infinite Brain OS — Sistema operacional de conhecimento para negócios com IA (git-backed)', type: 'novo', url: 'https://inematds.github.io/infinite-brain-os/guia/' },
  { date: '2026-07-03', title: 'claude-video — /watch: input de vídeo multi-host (Claude Code, Codex, +50)', type: 'novo', url: 'https://inematds.github.io/claude-video/guia/' },
  { date: '2026-06-30', title: 'Health OS — Coach de saúde pessoal com IA (Telegram + Supabase + WHOOP)', type: 'novo', url: 'https://inematds.github.io/health-os/' },
  { date: '2026-06-29', title: 'os-agentes — skill /os-agentes que constrói um OS agêntico de 6 camadas, uma de cada vez, com auditoria por objetivo', type: 'novo', url: 'https://inematds.github.io/os-agentes/guia/' },
  { date: '2026-06-29', title: 'INEMA Engenharia Civil — Agentes de IA para cálculos de engenharia civil (validação NBR + memorial)', type: 'novo', url: 'https://inematds.github.io/inemaengenhariacivil/' },
  { date: '2026-06-28', title: 'VideosAvatar — Avatar falante no HeyGen, do roteiro ao bot (API + assinatura)', type: 'novo', url: 'https://inematds.github.io/videosavatar/' },
  { date: '2026-06-26', title: 'cerebro-inema — Segundo cérebro de IA com 3 cérebros (PT-BR)', type: 'novo', url: 'https://inematds.github.io/cerebro-inema/' },
  { date: '2026-06-26', title: 'claude-watch — Skill /watch: o Claude assiste vídeo e gera report', type: 'novo', url: 'https://inematds.github.io/claude-watch/' },
  { date: '2026-06-26', title: 'gravityclaw — Agente Telegram lean com hub de recursos', type: 'novo', url: 'https://inematds.github.io/gravityclaw/' },
  { date: '2026-06-26', title: 'inemaref — Referência real vira HQ e motion comic', type: 'novo', url: 'https://inematds.github.io/inemaref/' },
  { date: '2026-06-26', title: 'mdd — Mestre de Direção Dinâmica (pacote de vídeo)', type: 'novo', url: 'https://inematds.github.io/mdd/' },
  { date: '2026-06-26', title: 'video-plan-editor — Plano de edição de vídeo renderer-agnóstico', type: 'novo', url: 'https://inematds.github.io/skill-video-plan-editor/' },
  { date: '2026-06-21', title: 'inemathink — Laboratório de pesquisa de O Caminho Certo da IA', type: 'novo', url: 'https://inematds.github.io/inemathink/' },
  { date: '2026-06-20', title: 'O Caminho Certo da IA — guia de qualificação real (anti-hype, com dados)', type: 'novo', url: 'https://inematds.github.io/caminho-certo-da-ia-guia/' },
  { date: '2026-06-20', title: 'recursos de vídeo — Catálogo do ecossistema de vídeo', type: 'novo', url: 'https://inematds.github.io/recursos-video/' },
  { date: '2026-06-20', title: 'pet360 — SaaS multi-tenant para pets', type: 'novo', url: 'https://inematds.github.io/pet360/' },
  { date: '2026-06-20', title: 'bela360 — Gestão para salões e estética', type: 'novo', url: 'https://inematds.github.io/bela360/' },
  { date: '2026-06-20', title: 'inemavox — Suíte de voz com IA local', type: 'novo', url: 'https://inematds.github.io/inemavox/' },
  { date: '2026-06-20', title: 'dublar pro — Pipeline de dublagem com IA', type: 'novo', url: 'https://inematds.github.io/dublarv5/' },
  { date: '2026-06-20', title: 'seg360 — Marketplace de seguros (BR)', type: 'novo', url: 'https://inematds.github.io/seg360/' },
  { date: '2026-06-20', title: 'erpsb — ERP SaaS para MEIs e micro', type: 'novo', url: 'https://inematds.github.io/ERPsb/' },
  { date: '2026-06-20', title: 'hola — Espanhol para crianças (BNCC)', type: 'novo', url: 'https://inematds.github.io/hola/' },
  { date: '2026-06-20', title: 'rotaX1 — Entregas de última milha', type: 'novo', url: 'https://inematds.github.io/RotaX1/' },
  { date: '2026-06-20', title: 'rf360 — Marketplace de técnicos', type: 'novo', url: 'https://inematds.github.io/RF360/' },
  { date: '2026-06-20', title: 'aclima — Alertas de chuva (INMET)', type: 'novo', url: 'https://inematds.github.io/aclima/' },
  { date: '2026-06-20', title: 'eboo-maker — Gerador de eBooks com IA', type: 'novo', url: 'https://inematds.github.io/ebook-maker/' },
  { date: '2026-06-20', title: 'megaRAG — RAG multimodal', type: 'novo', url: 'https://inematds.github.io/MegaRAG/' },
  { date: '2026-06-20', title: 'redessociais — Publicação em 6 redes (Postiz)', type: 'novo', url: 'https://inematds.github.io/redessociais/' },
  { date: '2026-06-20', title: 'redessociais2026 — Publisher próprio IG/TikTok', type: 'novo', url: 'https://inematds.github.io/redessociais2026/' },
  { date: '2026-06-20', title: 'deepsearchagent — Pesquisa profunda com IA', type: 'novo', url: 'https://inematds.github.io/deepsearchagent/' },
  { date: '2026-06-20', title: 'timesmkt3 — Fábrica de conteúdo de marketing', type: 'novo', url: 'https://inematds.github.io/timesmkt3/' },
  { date: '2026-06-20', title: 'aisf — Vídeos em batch (SkyReels V3)', type: 'novo', url: 'https://inematds.github.io/aisf/' },
  { date: '2026-06-20', title: 'BettaFish — Opinião pública multi-agente', type: 'novo', url: 'https://inematds.github.io/BettaFish/' },
  { date: '2026-06-20', title: 'MiroFish — Previsão por inteligência de enxame', type: 'novo', url: 'https://inematds.github.io/mirofish/' },
  { date: '2026-06-20', title: 'intelecto-testes — Agente de IA no WhatsApp', type: 'novo', url: 'https://inematds.github.io/intelecto-testes/' },
  { date: '2026-06-20', title: 'open-design — Alternativa open-source ao Claude Design', type: 'novo', url: 'https://inematds.github.io/open-design/' },
  { date: '2026-06-20', title: 'inemaupsk — Upscaling 4x (super-resolution)', type: 'novo', url: 'https://inematds.github.io/inemaupsk/' },
  { date: '2026-06-20', title: 'yt-pub-livesx — Cortes de lives do YouTube', type: 'novo', url: 'https://inematds.github.io/yt-pub-livesx/' },
  { date: '2026-06-20', title: 'VideosDGX — 4 Video LLMs em Docker (DGX)', type: 'novo', url: 'https://inematds.github.io/VideosDGX/' },
  { date: '2026-06-20', title: 'skyreelsv3 — SkyReels V3 com Web UI', type: 'novo', url: 'https://inematds.github.io/skyreelsv3/' },
  { date: '2026-06-20', title: 'inemaimg — Servidor multi-modelo de imagens', type: 'novo', url: 'https://inematds.github.io/inemaimg/' },
  { date: '2026-06-20', title: 'animabook — Quadrinhos animados na web', type: 'novo', url: 'https://inematds.github.io/animabook/' },
  { date: '2026-06-20', title: 'inema academia — Plataforma educacional (BNCC)', type: 'novo', url: 'https://inematds.github.io/inemaacademia/' },
  { date: '2026-06-20', title: 'intelecto — Assistente de IA pessoal (Python)', type: 'novo', url: 'https://inematds.github.io/intelecto-guia/' },
  { date: '2026-06-20', title: 'antidote — Assistente de IA pessoal (Python)', type: 'novo', url: 'https://inematds.github.io/antidote-guia/' },
  { date: '2026-06-20', title: 'diretor-animacao — Imagens + narração viram filme', type: 'novo', url: 'https://inematds.github.io/diretor-animacao-guia/' },
  { date: '2026-06-20', title: 'mkblogs — Publicação multi-plataforma', type: 'novo', url: 'https://inematds.github.io/mkblogs-guia/' },
  { date: '2026-06-20', title: 'openhuman — Assistente agêntico local-first', type: 'novo', url: 'https://inematds.github.io/openhuman-guia/' },
  { date: '2026-06-20', title: 'eai.inema.club — Jogos + educação', type: 'novo', url: 'https://inematds.github.io/eai-guia/' },
  { date: '2026-06-20', title: 'Claude OS — Sistema Operacional do Claude Code + Hermes', type: 'novo', url: 'https://inematds.github.io/claude-hermes-os/' },
]

export const platformsData: Course[] = [
  {
    id: 183,
    title: '10 Cara Design — Character Design Styles',
    description:
      'Uma pessoa, dez mundos visuais. 10 prompts de character design para Nano Banana 2: trave a identidade na Referência 1, aplique styling na Referência 2 e atravesse 10 estilos visuais distintos.',
    icon: '🎨',
    tags: ['Design', 'IA', 'Personagem', 'Prompts', 'Nano Banana'],
    url: 'https://inematds.github.io/10cara-design/',
  },
  {
    id: 204,
    title: 'Agentes: o Novo Office — Formação por Perfil',
    description:
      'A terceira virada do trabalho de escritório: formação prática em agentes de IA por perfil profissional (operacional, empreendedor, liberal, gestor) — cada módulo termina com algo seu montado e funcionando.',
    icon: '🤖',
    tags: ['Agentes', 'IA', 'Formação', 'Produtividade'],
    url: 'https://inematds.github.io/agentes-office/',
  },
  {
    id: 205,
    title: 'Agentes: o Novo Office — Profissional Liberal',
    description:
      'Curso completo (aula 0 + 8 módulos) para quem vive da expertise: do primeiro agente de triagem ao Sistema Operacional de IA do consultório ou escritório — advogados, médicos, contadores, arquitetos, com verificação de fonte e sigilo profissional como regra.',
    icon: '🧠',
    tags: ['Agentes', 'IA', 'Profissional Liberal', 'Curso'],
    url: 'https://inematds.github.io/agentes-office/curso/liberal/',
  },
  {
    id: 184,
    title: 'AI Filmmaking — Parte 1',
    description:
      'Pensar como diretor antes de gerar. Caderno editorial de estudo sobre filmmaking com IA — pré-produção, linguagem cinematográfica e visão de diretor.',
    icon: '🎬',
    tags: ['Filmmaking', 'IA', 'Vídeo', 'Direção', 'Pré-produção'],
    url: 'https://inematds.github.io/ai-filmaking-p1/',
  },
  {
    id: 186,
    title: 'Alerta IA 2028 — A IA que constrói a próxima IA',
    description:
      'Curso + explainer sobre auto-aperfeiçoamento recursivo (RSI) da IA com horizonte 2028. Destila o alerta dos labs de fronteira (Anthropic, DeepMind, OpenAI), mostra a evidência (METR, MirrorCode) e separa o que é sólido do que é especulação.',
    icon: '🚨',
    tags: ['IA', 'AI Safety', 'RSI', 'Fronteira', 'Curso'],
    url: 'https://inematds.github.io/ia2028alerta/',
  },
  {
    id: 185,
    title: 'Anúncios Virais com IA',
    description:
      'Aprenda a encontrar, desconstruir e recriar anúncios que vendem usando IA. Curso passo a passo, linguagem simples, foco em resultado.',
    icon: '📣',
    tags: ['Marketing', 'IA', 'Anúncios', 'Viral', 'Copywriting'],
    url: 'https://inematds.github.io/viralads/',
  },
  {
    id: 204,
    title: 'Arquiteto de Execução — Paralelo × Sequencial para Agentes',
    description:
      'Skill que decide entre sequência, paralelismo ou fluxo híbrido antes de criar agentes — portão de proporcionalidade, matriz de decisão com limiar objetivo, executor mais barato e plano antes do primeiro subagente. Inclui script de teste baseline × skill.',
    icon: '🧭',
    tags: ['Skill', 'Agentes', 'IA', 'Produtividade'],
    url: 'https://inematds.github.io/agenteexecuta/guia/',
  },
  {
    id: 177,
    title: '33 Viral Hooks',
    description:
      'Os 33 viral hooks de cada um dos 5 nichos mais populares (165 no total) para vídeo curto — TikTok, Reels e Shorts. 3 trilhas (Fundamentos, Técnicas, Avançado), 10 módulos, 60 tópicos. Cada hook traz a frase falada, o Visual Hook, o Text Hook e uma imagem de referência gerada por IA; a fórmula Context Lean → Scroll Stop → Contrarian Snapback, prompts copy-run e uma skill "Hook Machine". Camada de aprendizagem v2.',
    icon: '🪝',
    tags: ['Conteúdo', 'Vídeo Curto', 'Copywriting', 'TikTok', 'Reels', 'IA'],
    url: 'https://inematds.github.io/33viralhooks/',
  },
  {
    id: 174,
    title: 'O Caminho Certo da IA',
    description:
      'Qualificação real em IA, sem hype e sem medo. 2 trilhas (Alavancar com IA · Ser insubstituível), 3 módulos, 19 tópicos. Os 7 hábitos práticos de usar IA + as 12 habilidades humanas que a IA não substitui, ancorados em dados verificados (Gartner, MIT, NBER, METR, Princeton, WEF). Camada de aprendizagem v2.',
    icon: '🧭',
    tags: ['IA', 'Carreira', 'Qualificação', 'Habilidades Humanas', 'Futuro do Trabalho', 'Produtividade'],
    url: 'https://inematds.github.io/caminho-certo-da-ia/',
  },
  {
    id: 161,
    title: 'Integra sua Profissão com IA',
    description:
      'Integre a sua profissão com IA em vez de trocar de carreira. 3 trilhas (Fundamentos, Carreiras, Avançado), 12 módulos, 72 tópicos, ~7h30. As 6 habilidades + o caminho de carreira (diagnóstico, plano 30-60-90, blindagem) com dados de mercado (WEF 2025, Stanford AI Index, IBM). Camada de aprendizagem v2 e Guia de Ação baixável.',
    icon: '🧭',
    tags: ['Carreira', 'IA', 'Produtividade', 'Profissão', 'Agentes', 'Contexto'],
    url: 'https://inematds.github.io/profissionalai/',
  },
  {
    id: 60,
    title: '2Cerebro - Segundo Cerebro com LLM + Obsidian',
    description:
      'Construa um sistema de conhecimento persistente onde o LLM funciona como compilador. 3 trilhas (Fundamentos, Implementacao, Avancado), 12 modulos, ~8 horas. Cobre Obsidian vault, ingestao, grafos, RAG e multi-agentes.',
    icon: '🧠',
    tags: ['LLM', 'Obsidian', 'Knowledge Management', 'RAG', 'IA', 'Produtividade'],
    url: 'https://inematds.github.io/2cerebro/',
  },
  {
    id: 93,
    title: '5 Níveis do Claude Code',
    description:
      'Em qual nível do Claude você está? 6 trilhas: Entusiasta, Iniciante, Intermediário, Avançado, Arquiteto e Prova Final. 13 módulos, 80+ tópicos, ~6h.',
    icon: '📊',
    tags: ['Claude Code', 'Níveis', 'Diagnóstico', 'Skills', 'Hooks', 'Automação'],
    url: 'https://inematds.github.io/5niveiscc/',
  },
  {
    id: 68,
    title: '6 Chapeus + Anti-Ancora',
    description:
      'Curso completo do metodo dos 6 Chapeus de Edward de Bono com fase anti-ancora para quebrar vieses cognitivos. 3 trilhas (Metodo, Pratica, Construcao), 18 modulos, 108 topicos em ~9 horas. Pensamento estruturado em 8 etapas: fatos, beneficios, riscos, alternativas e intuicao.',
    icon: '🎩',
    tags: ['Pensamento', 'Decisao', '6 Chapeus', 'De Bono', 'Metodologia', 'Produtividade'],
    url: 'https://inematds.github.io/6chapeus/',
  },
  {
    id: 43,
    title: '6 Pilares do Claude Code',
    description:
      '6 Pilares do Claude Code - Domine atalhos, CLAUDE.md, 9 workflows, prompts estratégicos, skills reutilizáveis e MCPs. 6 trilhas, 58 aulas práticas.',
    icon: '🧠',
    tags: ['Claude Code', 'CLI', 'IA', 'Produtividade', 'Skills', 'Automação'],
    url: 'https://inematds.github.io/6pilarccb/',
  },
  {
    id: 46,
    title: '6 Pilares do Claude Code - Completa',
    description:
      '6 Pilares do Claude Code - Edicao Completa 2026. Domine o Claude Code do zero ao avancado com 6 trilhas, 49 modulos, 294 topicos e 49 exercicios praticos.',
    icon: '🧠',
    tags: ['Claude Code', 'CLI', 'IA', 'Produtividade', 'Skills', 'MCP'],
    url: 'https://inematds.github.io/6pilarccfull/',
  },
  {
    id: 57,
    title: '8020 - Vendas, Gestão e Estratégia Comercial',
    description:
      'Construa um sistema comercial integrado. 8 trilhas cobrindo diagnóstico de equipes, treinamento de vendedores, scripts práticos, níveis de consciência do consumidor, estratégias B2B/B2C e IA aplicada a vendas.',
    icon: '💰',
    tags: ['Vendas', 'Gestão Comercial', 'Estratégia', 'B2B', 'B2C', 'IA'],
    url: 'https://inematds.github.io/8020',
  },
  {
    id: 90,
    title: 'Agente Hermes - Assistente IA Self-Hosted',
    description:
      'Suba um agente IA na sua própria infra com Docker, Telegram e GitHub. 6 trilhas: Fundamentos, Setup, 5 Pilares, Segurança, Hermes vs Mercado e Escala Multi-Agente.',
    icon: '🏛️',
    tags: ['Agente IA', 'Self-Hosted', 'Docker', 'Telegram', 'Open Source', 'Hermes'],
    url: 'https://inematds.github.io/agentehermes',
  },
  {
    id: 175,
    title: 'Agente Hermes + Ollama — Seu SO de IA 100% Privado',
    description:
      'Rode um agente de IA completo e privado na sua máquina com Ollama: sem mensalidade, offline e sem nenhum dado saindo de casa. Dos fundamentos a 7 projetos passo a passo — 3 trilhas, 19 módulos.',
    icon: '🔒',
    tags: ['IA Local', 'Ollama', 'Agente IA', 'Privacidade', 'Hermes', 'IA'],
    url: 'https://inematds.github.io/agente-hermes-local/',
  },
  {
    id: 84,
    title: 'AgenteJAX - Construa seu Agente de IA Pessoal',
    description:
      'Construa um agente de IA pessoal de ponta a ponta em TypeScript. Vive no Telegram, opera 24/7 com autonomia, memória multi-camada, function calling, voz, skills auto-geradas e MCP. 3 trilhas (Fundamentos, Vida do Agente, Produção), 9 módulos, 54 tópicos em ~6 horas. Sem frameworks fechados.',
    icon: '🤖',
    tags: ['Agente IA', 'Telegram', 'TypeScript', 'MCP', 'Memória', 'Produção', 'IA'],
    url: 'https://inematds.github.io/agentejax/',
  },
  {
    id: 121,
    title: 'Agentic Básico',
    description:
      'Aprenda agentes de IA em 2 caminhos: Visual Quick (15 min) e Curso Completo (3h, 9 módulos). 5 pilares agênticos + Multi-Agent Arena no browser. Gratuito.',
    icon: '🤖',
    tags: ['Agentes', 'IA', 'Básico', 'Multi-Agent', 'Arena', 'Gratuito'],
    url: 'https://inematds.github.io/agenticbasico/',
  },
  {
    id: 42,
    title: 'Agentic Engineering Masterclass',
    description:
      'Engenharia de Agentic - Masterclass completa com 6 trilhas, 42 módulos e 252+ tópicos em 21 semanas. Do básico à orquestração multi-agente enterprise com LangGraph, CrewAI e AutoGen.',
    icon: '🤖',
    tags: ['IA', 'Agentes', 'Engenharia', 'LLMs', 'Multi-Agentes', 'Python'],
    url: 'https://inematds.github.io/agentic/',
  },
  {
    id: 91,
    title: 'Agentic OS - O Sistema Operacional do Trabalho com IA',
    description:
      'Claude Code, Codex e agentes como sistema operacional. 6 trilhas: Fundamentos, Identidade, Conhecimento, Trabalhadores, Automação e Deploy. 36 módulos, 216+ tópicos, ~24h.',
    icon: '⚙️',
    tags: ['Agentic OS', 'Claude Code', 'MCP', 'A2A', 'Hooks', 'Skills', 'Orquestração'],
    url: 'https://inematds.github.io/agenticos/',
  },
  {
    id: 140,
    title: 'AI FILMMAKING — Do Conceito ao Filme Final',
    description:
      'Curso completo de filmmaking com IA: pense como diretor, não como usuário de prompt. 7 trilhas, 31 módulos — linguagem e lógica de câmera, roteiro→storyboard→frames, direção e diálogo, composição/iluminação/profundidade, geração de vídeo (Seedance, Kling, Luma, Runway), YAML, efeitos visuais, edição e narrativa visual. Com exemplos cinematográficos e prompts reais.',
    icon: '🎬',
    tags: ['Filmmaking', 'Vídeo IA', 'Cinema', 'Seedance', 'Kling', 'Runway', 'IA'],
    url: 'https://inematds.github.io/aifilmmaking/',
  },
  {
    id: 151,
    title: 'AI Strategy Factory — Estratégia de IA Completa para Qualquer Empresa',
    description:
      'Gere um pacote de consultoria de IA completo para qualquer empresa em minutos: 15 documentos (diagnóstico, roadmap, ROI, governança, prompts), 2 apresentações, 2 relatórios Word e diagramas. Curso didático em PT-BR para iniciantes — instalar, usar (web e CLI) e aproveitar os entregáveis. Usa Perplexity + Google Gemini. 3 trilhas, 9 módulos, ~60 tópicos.',
    icon: '🏭',
    tags: ['Estratégia IA', 'Perplexity', 'Gemini', 'Consultoria', 'Automação', 'IA'],
    url: 'https://inematds.github.io/AI-CONSULT/',
  },
  {
    id: 114,
    title: 'AIOS — AI Agent Operating System',
    description:
      'Curso completo sobre AIOS (Rutgers AGI Research). Kernel, SDK Cerebrum, scheduler, memória, ferramentas, computer-use e MCP. 2 módulos, 12 tópicos, ~1.5h.',
    icon: '⚙️',
    tags: ['AIOS', 'Agente', 'Kernel', 'SDK', 'MCP', 'IA'],
    url: 'https://inematds.github.io/aiosagi/',
  },
  {
    id: 133,
    title: 'AIS-OS — Seu AI Operating System no Claude Code',
    description:
      'Transforme o Claude Code num AI Operating System pessoal: conhece seu negócio, alcança suas ferramentas, sabe fazer o trabalho e roda sem ser pedido. Baseado no kit AIS-OS (MIT) de Nate Herk — frameworks 3 Ms (Mindset/Method/Machine) e 4 Cs (Context/Connections/Capabilities/Cadence) + as skills /onboard, /audit e /level-up. 3 trilhas, 11 módulos, ~70 tópicos, ~7h, com diagramas SVG.',
    icon: '⚙️',
    tags: ['AIOS', 'Claude Code', '3 Ms', '4 Cs', 'Skills', 'Automação'],
    url: 'https://inematds.github.io/ais-os/',
  },
  {
    id: 212,
    title: 'AIV 2026 — AI Visibility como serviço (AEO/GEO)',
    description:
      'Playbook de 5 fases para tornar empresas encontráveis e citáveis por IAs públicas (ChatGPT, Claude, Gemini, Perplexity), com o case completo do cliente-zero INEMA.',
    icon: '📡',
    tags: ['AEO/GEO', 'AI Visibility', 'Playbook', 'IA'],
    url: 'https://inematds.github.io/aiv2026/guia/',
  },
  {
    id: 1,
    title: 'AIWCF - Vibe Coding',
    description:
      'AI Website Creation Framework - Aprenda a criar websites profissionais usando IA com a metodologia Vibe Coding.',
    icon: '✨',
    tags: ['Vibe Coding', 'Web', 'IA', 'Desenvolvimento'],
    url: 'https://inematds.github.io/AIWCF',
  },
  {
    id: 156,
    title: 'AntiGravity — do Zero ao App Publicado com IA',
    description:
      'Construa, publique e escale apps reais com IA usando o AntiGravity (o IDE com agentes da Google). 5 trilhas, 11 módulos, 77 tópicos — do problema ao deploy seguro, clonagem em escala, GoHighLevel/WordPress, QA profissional e o framework CODA. Com exemplos, exercícios e biblioteca de prompts prontos.',
    icon: '🛰️',
    tags: ['AntiGravity', 'IDE', 'Agentes IA', 'Deploy', 'No-Code', 'CODA', 'IA'],
    url: 'https://inematds.github.io/antigravity/',
  },
  {
    id: 52,
    title: 'Arquitetura 2030 - Arquitetura de Software com IA',
    description:
      'De fundamentos a execução: domine arquitetura de software com exemplos reais, decisões práticas e IA aplicada. 6 trilhas, 30 módulos e 210 tópicos em ~30 horas de conteúdo.',
    icon: '🏗️',
    tags: ['Arquitetura', 'Software', 'IA', 'DevOps', 'Escalabilidade', 'Design Patterns'],
    url: 'https://inematds.github.io/arqdev2030',
  },
  {
    id: 159,
    title: 'Arquitetura de Intenção — Imersão Intensiva (3 dias)',
    description:
      'Prompt não basta. Do prompt à Arquitetura de Intenção: estruture contexto, regras, memória, objetivos e validação para a IA entregar resultado confiável. Imersão prática de 3 dias.',
    icon: '🎯',
    tags: ['Arquitetura de Intenção', 'Vibe Coding', 'IA', 'Imersão', 'Prompt'],
    url: 'https://inematds.github.io/arquitetura-de-intencao/',
  },
  {
    id: 160,
    title: 'Arquitetura de Intenção da IA — Curso Completo (Método JARVIS)',
    description:
      'A versão completa da Arquitetura de Intenção: 3 dias, 18 módulos e 111 seções no método JARVIS. Forma arquitetos de soluções com IA nas empresas — da infraestrutura à "alma" do sistema (identidade, serviços, agentes, habilidades, memória, segurança e ferramentas) até entregar uma solução real, medida e em evolução.',
    icon: '🧠',
    tags: ['Arquitetura de Intenção', 'Agentes', 'IA', 'Curso Completo', 'JARVIS'],
    url: 'https://inematds.github.io/arquitetura-de-intencao-da-ia/',
  },
  {
    id: 2,
    title: 'ATIA - Oportunidades Digitais com IA',
    description:
      'Oportunidades Digitais com IA - Explore o mundo da Inteligência Artificial e suas aplicações práticas.',
    icon: '🤖',
    tags: ['IA', 'Oportunidades', 'Digital'],
    url: 'https://inematds.github.io/ATIA/',
  },
  {
    id: 206,
    title: 'Automação & Hooks no Claude Code',
    description:
      'Curso web (formato v4, página única): hooks do Claude Code — eventos, settings.json, travas de segurança e integração com CI. Leitura viva (uma ideia por seção) + retenção (grifo vira flashcard, revisão espaçada). 5 aulas.',
    icon: '🪝',
    tags: ['Claude Code', 'Hooks', 'Automação', 'IA'],
    url: 'https://inematds.github.io/cchooks/',
  },
  {
    id: 3,
    title: 'Automação 2026',
    description:
      'Automação 2026 - Formação em automação e tecnologias para o futuro.',
    icon: '⚙️',
    tags: ['Automação', 'Tecnologia', '2026'],
    url: 'https://inematds.github.io/AUTOMACAO2026',
  },
  {
    id: 4,
    title: 'BMAD Academy',
    description:
      'Academia de desenvolvimento com metodologia BMAD - Aprenda boas práticas de desenvolvimento.',
    icon: '🎓',
    tags: ['Desenvolvimento', 'Metodologia', 'Academia'],
    url: 'https://inematds.github.io/BMAD-Academy/',
  },
  {
    id: 100,
    title: 'CAIO - Chief AI Officer 2030',
    description:
      'Profissional de IA 2030. De analista a Chief AI Officer. 6 trilhas, 36 módulos, 216 tópicos. Playbooks por função, plano de 12 semanas.',
    icon: '💼',
    tags: ['Negócios', 'Carreira', 'Chief AI Officer', 'Liderança', 'IA', 'Estratégia'],
    url: 'https://inematds.github.io/caio/',
  },
  {
    id: 92,
    title: 'CAIP - Certified AI Professional',
    description:
      'Certificação profissional em IA aplicada. 6 trilhas, 6 selos, ~58h. Do modo execução ao modo comando com IA.',
    icon: '🎓',
    tags: ['Certificação', 'IA', 'CAIP', 'Profissional', 'Agentes', 'Automação'],
    url: 'https://inematds.github.io/prof2031CAIP',
  },
  {
    id: 53,
    title: 'CCA-Q1 - Claude Certified Architect Foundations',
    description:
      'Curso preparatório para a certificação oficial da Anthropic. 5 trilhas, 30 módulos cobrindo Agentic Architecture, Tool Design & MCP, Claude Code, Prompt Engineering e Context Management. Score mínimo 720/1000.',
    icon: '🏅',
    tags: ['Certificação', 'Anthropic', 'Claude', 'MCP', 'Agentic', 'Arquitetura'],
    url: 'https://inematds.github.io/cca-q1/',
  },
  {
    id: 54,
    title: 'CCA-Q2 - Claude Certified Architect Interativo',
    description:
      'Preparatório interativo para a certificação Anthropic. Mapa visual, simulador de cenários e flashcards com repetição espaçada. 5 camadas progressivas cobrindo os 5 domínios do exame. Score mínimo 720/1000.',
    icon: '🎯',
    tags: ['Certificação', 'Anthropic', 'Claude', 'Simulador', 'Flashcards', 'Interativo'],
    url: 'https://inematds.github.io/cca-q2',
  },
  {
    id: 204,
    title: 'cccache — Prompt Caching no Claude Code',
    description:
      'Entenda de verdade o cache que roda por baixo quando você conversa com o Claude Code. 3 trilhas, 8 módulos: fundamentos de prefixo, economia de tokens, invalidação silenciosa, cache vs compactação e prompts prontos copy-run.',
    icon: '💰',
    tags: ['Claude Code', 'Cache', 'Tokens', 'Economia', 'Otimização', 'IA'],
    url: 'https://inematds.github.io/cccache/',
  },
  {
    id: 72,
    title: 'CCFast32 - 32 Hacks do Claude Code',
    description:
      'Do Iniciante ao Power User: 32 hacks práticos em 3 trilhas (Iniciante, Intermediário, Avançado), 11 módulos. Cobre /init, CLAUDE.md, tokens, plan mode, subagentes paralelos, slash commands, hooks, worktrees, ultrathink, multi-agente e CI/CD.',
    icon: '⚡',
    tags: ['Claude Code', 'Hacks', 'Power User', 'Multi-agente', 'Worktrees', 'Hooks', 'IA'],
    url: 'https://inematds.github.io/ccfast32/',
  },
  {
    id: 37,
    title: 'CCGuide - Claude Code 2026',
    description:
      'O curso mais completo sobre Claude Code em português. Domine a CLI da Anthropic do básico ao avançado com 24 módulos e 144 tópicos práticos.',
    icon: '🖥️',
    tags: ['Claude Code', 'CLI', 'Anthropic', 'IA'],
    url: 'https://inematds.github.io/ccguide2026',
  },
  {
    id: 70,
    title: 'CCMasterMemory - Memory Injection via Hooks',
    description:
      'Resolva as limitacoes de memoria do Claude Code com hooks deterministicos. 6 trilhas, 36 modulos, ~24 horas + 6 labs praticos. Cobre hierarquia de 7 niveis de memoria, anatomia de 18 hooks, arquitetura de backend (Markdown, SQLite, vector DB) e memoria multi-agente.',
    icon: '🧠',
    tags: ['Claude Code', 'Memory', 'Hooks', 'Anthropic', 'IA', 'SQLite'],
    url: 'https://inematds.github.io/ccmastermemory/',
  },
  {
    id: 75,
    title: 'CCOpen - Claude Code de Graça ou por Quase Nada',
    description:
      'Use Claude Code com Ollama (local, gratuito) ou OpenRouter (cloud, quase nada) trocando o motor sem mudar a interface. 5 trilhas, 19 módulos: fundamentos, instalação (Linux/macOS/Windows WSL), Ollama, OpenRouter e prática real.',
    icon: '🆓',
    tags: ['Claude Code', 'Ollama', 'OpenRouter', 'Gratuito', 'Local LLM', 'vLLM', 'IA'],
    url: 'https://inematds.github.io/ccopen/',
  },
  {
    id: 69,
    title: 'CCTop - Mestre em Contexto e Tokens',
    description:
      'Domine o gerenciamento de contexto e tokens no Claude Code. 6 trilhas, 18 modulos, ~108 topicos em ~12 horas. Cobre mecanica de tokens, prompt caching, context rot, handoff inteligente, delegacao sub-agente e orquestracao multi-modelo.',
    icon: '📊',
    tags: ['Claude Code', 'Tokens', 'Contexto', 'Anthropic', 'Otimizacao', 'IA'],
    url: 'https://inematds.github.io/cctop/',
  },
  {
    id: 102,
    title: 'CCXCX - Claude e Codex Tool-Agnostic AI Coding',
    description:
      'Domina Claude Code e Codex como ferramentas complementares. 3 trilhas, 11 módulos. AGENTS.md vs CLAUDE.md, handoff entre agentes, subagentes em paralelo, zero lock-in.',
    icon: '⚡',
    tags: ['Claude Code', 'Codex', 'Agentes', 'Tool-Agnostic', 'AGENTS.md', 'IA'],
    url: 'https://inematds.github.io/ccxcx',
  },
  {
    id: 171,
    title: 'Cérebro INEMA — Segundo Cérebro com 3 Cérebros',
    description:
      'Segundo cérebro de IA com 3 cérebros (Projeto, Self, Conhecimento), em PT-BR, roda no Linux. Obsidian + Claude Code: o cérebro são os arquivos e o CLAUDE.md é o mapa. Inclui skills de triagem, nota e socrática, instalador e guia de uso.',
    icon: '🧠',
    tags: ['Segundo Cérebro', 'Claude Code', 'Obsidian', 'PKM', 'PT-BR', 'IA'],
    url: 'https://inematds.github.io/cerebro-inema/',
  },
  {
    id: 131,
    title: 'Claude Code — Do Zero ao Projeto',
    description:
      'Curso completo de Claude Code: dos fundamentos à instalação, criando skills e automações, até desenvolver e publicar projetos reais de longo prazo. 6 trilhas, 24 módulos, 144 tópicos, ~18h. Com dois estudos de caso de produção: a skill ads-skill (Arcads) e o projeto ClaudeOS.',
    icon: '🤖',
    tags: ['Claude Code', 'Skills', 'Automação', 'Deploy', 'Iniciante', 'IA'],
    url: 'https://inematds.github.io/jccode23/',
  },
  {
    id: 163,
    title: 'Claude Code Básico — Curso Completo',
    description:
      'Curso completo de Claude Code em 6 trilhas, 39 módulos: do básico e instalação (Windows/macOS/Linux/WSL) ao contexto e comandos, skills, plugins e memória, MCP e integrações, agentes e Cowork. Conteúdo extraído e curado do canal Claude Code (INEMA) no Telegram.',
    icon: '✳️',
    tags: ['Claude Code', 'Iniciante', 'Instalação', 'Skills', 'MCP', 'IA'],
    url: 'https://inematds.github.io/ccodebasico/',
  },
  {
    id: 157,
    title: 'Claude Code na Prática — do Zero ao Produto',
    description:
      'Curso prático e gratuito de Claude Code, do zero ao produto. 3 trilhas (Fundamentos, Construir, Operar & Lucrar) + Biblioteca com 48 prompts, skills e agentes. 12 módulos com exemplos, exercícios e prompts prontos, sem pré-requisito de programação.',
    icon: '⚡',
    tags: ['Claude Code', 'Iniciante', 'Website', 'Apps', 'Prompts', 'IA'],
    url: 'https://inematds.github.io/claude-code-na-pratica/',
  },
  {
    id: 216,
    title: 'Claude Code para Pessoas Normais — do zero ao AI Native',
    description:
      'Curso completo (10 módulos) pra quem nunca programou: instale o Claude Code, estruture projetos, construa seu segundo cérebro, use sub-agentes, monte automações e publique sites — tudo em linguagem simples.',
    icon: '🤖',
    tags: ['Claude Code', 'IA', 'Automação', 'Iniciantes'],
    url: 'https://inematds.github.io/cccompletopn/',
  },
  {
    id: 59,
    title: 'Claude Code Deep Dive',
    description:
      'Mergulho profundo no codigo-fonte do Claude Code. Analise de 1.902 arquivos cobrindo arquitetura core, sistema de tools, inteligencia do agente, infra, conectividade e features nao lancadas. 8 trilhas, 50 aulas, ~25 horas. Nivel avancado.',
    icon: '🔍',
    tags: ['Claude Code', 'Anthropic', 'Arquitetura', 'Source Code', 'IA', 'Tools'],
    url: 'https://inematds.github.io/claudecode-manual/',
  },
  {
    id: 136,
    title: 'Claude Code Tier S — os 12 recursos que mudam seu dia',
    description:
      'Tier list completa do ecossistema Claude (D→S) com o Top 12 em contagem regressiva até o #1. O critério não é hype: é quanto cada recurso muda seu dia de trabalho real (conhecimento + automação). 3 trilhas, 6 módulos, 36 tópicos + deck futurista navegável e 20 imagens. Skills, Status Line, Routines, Subagents, /loop, /goal, Agent Teams e mais.',
    icon: '🏆',
    tags: ['Claude Code', 'Tier List', 'Skills', 'Top 12', 'Produtividade', 'IA'],
    url: 'https://inematds.github.io/cctop12/',
  },
  {
    id: 139,
    title: 'Claude Code × Remotion - Motion Graphics com Código',
    description:
      'Gere motion graphics de produção com código: Claude Code + Remotion + GSAP, D3, Three.js e Lottie. 4 trilhas, 16 módulos, com demonstrações visuais animadas ao vivo. Inclui 4 projetos práticos (SaaS, data-story, comercial 3D, onboarding).',
    icon: '🎞️',
    tags: ['Remotion', 'Motion Graphics', 'Claude Code', 'GSAP', 'React', 'IA'],
    url: 'https://inematds.github.io/claude-remotion-motion/',
  },
  {
    id: 105,
    title: 'Claude Cowork - Equipe de Marketing de US$ 10.000/mês',
    description:
      'Equipe de marketing autônoma com Claude Code. 3 trilhas, 20 módulos, 120+ tópicos, ~14h. 7 skills de marketing, conectores MCP, tarefas agendadas, sem código.',
    icon: '💸',
    tags: ['Claude Code', 'Marketing', 'Skills', 'MCP', 'Automação', 'IA'],
    url: 'https://inematds.github.io/cccowork/',
  },
  {
    id: 107,
    title: 'Claude Cowork - Guia Completo',
    description:
      'Guia completo do Claude Cowork (Projects). 3 trilhas, 18 módulos, ~12h. Custom instructions, knowledge files, artifacts, modelos, integrações MCP, skills e métricas.',
    icon: '🚗',
    tags: ['Claude', 'Cowork', 'Projects', 'Knowledge', 'MCP', 'IA'],
    url: 'https://inematds.github.io/cccoworkfull/',
  },
  {
    id: 66,
    title: 'Claude Design - Zero ao Expert',
    description:
      'Curso completo de Claude Design, a ferramenta de design da Anthropic. 5 trilhas, ~35 modulos, 200+ topicos. Cobre fundamentos, design systems, context stacking, canvas iteration, prompts prontos e automacao. Substitui Figma, Gamma e Canva numa interface conversacional.',
    icon: '🎨',
    tags: ['Claude Design', 'Anthropic', 'Design', 'No-Code', 'UI/UX', 'Canva'],
    url: 'https://inematds.github.io/claudedesign/',
  },
  {
    id: 155,
    title: 'Claude Skills na Prática — Construa Agent Skills do Claude Code',
    description:
      'Curso prático sobre construir Agent Skills do Claude Code, do SKILL.md à arquitetura multi-agente. 6 trilhas, 16 módulos, 96 tópicos, dissecando 12 skills reais (geradores, automação n8n, lead scoring, SEO/AEO, RAG, memória multi-agente) com prompts, exemplos e exercícios. Inclui Central de Skills para download.',
    icon: '⚡',
    tags: ['Claude Code', 'Agent Skills', 'SKILL.md', 'Automação', 'IA'],
    url: 'https://inematds.github.io/claude-skills/',
  },
  {
    id: 196,
    title: 'claude-video — /watch: input de vídeo multi-host (Claude Code, Codex, +50)',
    description:
      'A skill /watch dá ao seu agente entrada de vídeo: baixa via yt-dlp, extrai frames (dial de 4 modos — transcript, keyframes, cena, sem cap) com dedup de quadros quase-idênticos, e transcreve por captions ou Whisper (Groq/OpenAI) com auto-chunking. Pasta self-contained: instala em Claude Code, Codex, Cursor, Copilot, Gemini CLI e +50 hosts de Agent Skills.',
    icon: '🎬',
    tags: ['Agent Skills', 'Vídeo', 'yt-dlp', 'Whisper', 'IA'],
    url: 'https://inematds.github.io/claude-video/guia/',
  },
  {
    id: 166,
    title: 'claude-watch — /watch: analista de vídeo com report + Obsidian',
    description:
      'Skill /watch que dá ao Claude entrada de vídeo: baixa via yt-dlp, extrai frames por corte de cena, microscopa o hook 0-10s, transcreve por captions ou Whisper (Groq/OpenAI) e emite um report.md estruturado, com auto-save opcional no Obsidian. Plugin para Claude Code, Codex e claude.ai.',
    icon: '🎬',
    tags: ['Skills', 'Claude Code', 'Vídeo', 'yt-dlp', 'ffmpeg', 'Whisper', 'IA'],
    url: 'https://inematds.github.io/claude-watch/',
  },
  {
    id: 55,
    title: 'CLI-x - O Terminal como Interface dos Agentes',
    description:
      'O terminal como interface padrão dos agentes de IA em 2026. 6 trilhas, 30 módulos cobrindo fundamentos CLI, arquitetura MCP, CLI-Anything, ecossistema de agentes e projetos práticos. ~15 horas.',
    icon: '💻',
    tags: ['CLI', 'Terminal', 'MCP', 'Agentes', 'Claude Code', 'Gemini CLI'],
    url: 'https://inematds.github.io/CLI-x',
  },
  {
    id: 167,
    title: 'CLI Printing Press — Imprima CLIs Perfeitas para Agentes',
    description:
      'Gerador de CLIs otimizadas para agentes de IA: lê docs oficiais, estuda CLIs populares, aplica o playbook de Peter Steinberger (SQLite local, compound commands, agent-native flags) e imprime Go CLI + Claude Code skill + MCP server para qualquer API. Inclui ESPN, Flight Goat, Linear e catálogo completo.',
    icon: '🖨️',
    tags: ['CLI', 'Go', 'MCP', 'Agentes', 'Claude Code', 'Codex', 'Open Source'],
    url: 'https://github.com/mvanhorn/cli-printing-press',
  },
  {
    id: 162,
    title: 'Codex Básico — Curso Completo do Codex CLI',
    description:
      'Curso completo do Codex CLI da OpenAI em 6 trilhas, 46 módulos: do básico ao avançado, terminal e interface gráfica, Agent Builder sem código, BMAD Method, equipe de 5 agentes de marketing e chatbot de WhatsApp. Conteúdo extraído e curado do canal INEMA.Codex.',
    icon: '⚡',
    tags: ['Codex', 'OpenAI', 'CLI', 'Agent Builder', 'BMAD', 'IA'],
    url: 'https://inematds.github.io/codexbasico/',
  },
  {
    id: 213,
    title: 'Como Montar um Negócio de Serviços de IA — 8 aulas, sem programar',
    description:
      'Curso interativo (formato v5) para profissionais liberais e de escritório fecharem o primeiro serviço de IA pago: mapear oportunidades no próprio círculo, motor de conteúdo, atendente por voz, testes de qualidade com gabarito, assistente com memória do negócio, agentes com salvaguardas e venda para empresas grandes.',
    icon: '💼',
    tags: ['Negócios', 'IA', 'Serviços', 'Sem código', 'Curso'],
    url: 'https://inematds.github.io/evai2026/curso-e-live/curso/',
  },
  {
    id: 125,
    title: 'Consultor de IA — Do Rótulo ao Resultado',
    description:
      'Formação prática para atuar como consultor de IA: mapear a restrição real, auditar a prontidão e montar planos de execução. IA é a caixa de ferramentas, não o cargo — pirâmide determinístico→IA→agentes, comece pela base. 5 trilhas, 20 módulos, 120 tópicos. Ancorado em Anthropic, McKinsey, NIST AI RMF, MITRE e Gartner.',
    icon: '🧭',
    tags: ['Consultoria', 'IA', 'Mapeamento', 'Auditoria', 'NIST', 'Roadmap'],
    url: 'https://inematds.github.io/consultoria2k/',
  },
  {
    id: 218,
    title: 'Construa seu AI OS — Assistente de IA pessoal sem programar',
    description:
      'Monte, em português e sem programar, um assistente de IA que lembra de você, alcança suas ferramentas e trabalha em horário marcado. 9 aulas práticas (formato v5) para quem já usa IA de chat: dossiê de memória, conectores com critério, receitas nomeadas, rotinas agendadas e painel diário.',
    icon: '🧩',
    tags: ['AI OS', 'Assistente', 'IA', 'Produtividade', 'Sem código'],
    url: 'https://inematds.github.io/builaios/',
  },
  {
    id: 132,
    title: 'Criando Agent Skills — Do Catálogo à Sua Primeira Skill',
    description:
      'Curso data-driven sobre Agent Skills: parte de uma análise real de 39.366 skills coletadas do skills.sh (5.075 repos, 53,9M instalações). Você entende o ecossistema e a lei de potência, aprende a reconhecer skills boas, disseca as melhores por grupo com exemplos reais, e aprende a criar a sua. 5 trilhas, 25 módulos — cada trilha fecha com As Melhores, Como Criar e Dicas Avançadas. Inclui o dataset completo e 25 SKILL.md reais.',
    icon: '🛠️',
    tags: ['Skills', 'Agent Skills', 'skills.sh', 'Criar', 'Catálogo', 'IA'],
    url: 'https://inematds.github.io/skills-craft/',
  },
  {
    id: 165,
    title: 'Cultura de Inovação — Da Teoria à Prática',
    description:
      'A parte mais difícil de copiar é a cultura. Construa, meça e escale cultura de inovação — dos fundamentos (pilares, mindset, liderança, métricas) às técnicas (Design Thinking, Lean, Sprint, JTBD, OKRs) e à escala corporativa (programa, intraempreendedorismo, inovação aberta, IA como acelerador, ROI, governança). 3 trilhas, 28 módulos, 168 tópicos em ~14h, com camada de aprendizagem (progresso, anotações, minha jornada).',
    icon: '💡',
    tags: ['Inovação', 'Cultura', 'Gestão', 'Estratégia', 'IA'],
    url: 'https://inematds.github.io/cultura-inovacao/',
  },
  {
    id: 83,
    title: 'Curso Open Design - Alternativa Open-Source ao Claude Design',
    description:
      'Alternativa local-first e BYOK ao Claude Design. 3 trilhas (Fundamentos, Exemplos, Avançado), 18 módulos, 100+ tópicos em ~30 horas. Conduzido por 31 skills, 72 design systems e CLI de agente. Cobre prompt stack, pitch decks, landing pages, dashboards, critique loops, ACP e daemon/sidecar.',
    icon: '🎨',
    tags: ['Open Design', 'Design', 'Skills', 'BYOK', 'Claude Code', 'UI/UX', 'IA'],
    url: 'https://inematds.github.io/curso-od/',
  },
  {
    id: 5,
    title: 'Dashboard Mastery',
    description:
      'Supercurso de Dashboards Profissionais - Domine a criação de dashboards com Next.js e React.',
    icon: '📊',
    tags: ['Dashboard', 'Next.js', 'React', 'Design'],
    url: 'https://inematds.github.io/dash/',
  },
  {
    id: 6,
    title: 'DBA-FO',
    description:
      'Fundamentos DBA Oracle - Formação em administração de banco de dados Oracle.',
    icon: '🗄️',
    tags: ['DBA', 'Oracle', 'Banco de Dados'],
    url: 'https://inematds.github.io/DBA-FO/',
  },
  {
    id: 82,
    title: 'DeepClaudeX - Multi-Modelo 70/20/10',
    description:
      'Orquestre 3 modelos de IA (GPT-5.5, Claude Opus 4.7, DeepSeek V4) com eficiência máxima. 3 trilhas (Conceito, Configuração, Projetos), 18 módulos, 108 tópicos em ~10 horas. Reduza custos mantendo qualidade com distribuição inteligente: 70% DeepSeek, 20% GPT, 10% Claude.',
    icon: '🔀',
    tags: ['Multi-modelo', 'Orquestração', 'Claude Code', 'DeepSeek', 'GPT', 'Custos', 'IA'],
    url: 'https://inematds.github.io/deepclaudex/',
  },
  {
    id: 64,
    title: 'DeerFlow 2.0 - Framework de Agentes ByteDance',
    description:
      'Curso completo do framework open-source de agentes da ByteDance. 4 trilhas, 21 modulos com labs praticos. Cobre fundamentos, arquitetura LangGraph, extensao com skills e MCP, plataforma avancada e comparativo com Claude Code.',
    icon: '🦌',
    tags: ['DeerFlow', 'ByteDance', 'Agentes', 'LangGraph', 'MCP', 'Python'],
    url: 'https://inematds.github.io/deerflow/',
  },
  {
    id: 65,
    title: 'Design + Video com IA (Hyperframes)',
    description:
      'Produza materiais visuais profissionais de ponta a ponta com Claude Design e Hyperframes. 3 trilhas, 9 modulos, 54 topicos em ~22 horas. Cobre design, brand systems, motion graphics, pitch decks, videos verticais e promocionais.',
    icon: '🎨',
    tags: ['Design', 'Video', 'IA', 'Hyperframes', 'Claude Design', 'Motion Graphics'],
    url: 'https://inematds.github.io/cchyperframes/',
  },
  {
    id: 51,
    title: 'DEV2K6 - Engenharia de Software com IA Avançada',
    description:
      'Formação completa para devs que querem dominar IA como ferramenta de engenharia. 3 trilhas, 15 módulos, ~100 tópicos e 55+ exercícios práticos cobrindo LLMs, prompting, context engineering, MCP, agentes, RAG, segurança e adoção em times.',
    icon: '💻',
    tags: ['IA', 'Engenharia', 'Claude Code', 'MCP', 'Agentes', 'RAG'],
    url: 'https://inematds.github.io/dev2k6/',
  },
  {
    id: 147,
    title: 'Diretor de Animação — Imagens + Narração viram Filme',
    description:
      'Skill de direção cinematográfica para Claude Code: analisa cada imagem com visão, decide câmera, cortes, transições, música e SFX seguindo gramática de cinema, e renderiza determinístico via pixflow — sem IA generativa de vídeo.',
    icon: '🎬',
    tags: ['IA', 'Vídeo', 'Claude Code', 'Skill'],
    url: 'https://inematds.github.io/diretor-animacao/',
  },
  {
    id: 164,
    title: 'Do Zero ao Deploy — Da Primeira Linha no Terminal ao Assistente IA',
    description:
      'Curso para iniciantes sem pré-requisitos: comece do zero no terminal e termine com seu próprio servidor, deploy automático e um assistente de IA funcionando. 5 trilhas, 18 módulos, 108 tópicos — Terminal & Git, Deploy Moderno, Servidor Próprio, Docker & Automação e Assistentes IA.',
    icon: '🚀',
    tags: ['Iniciantes', 'Terminal', 'Deploy', 'Docker', 'IA'],
    url: 'https://inematds.github.io/do-zero-ao-deploy/',
  },
  {
    id: 76,
    title: 'Docker OpenClaw - Assistente IA Autônomo e Multi-Canal',
    description:
      'Configure um assistente pessoal de IA rodando localmente com Docker, 200+ modelos via OpenRouter, Telegram, WhatsApp, Discord e Slack. 6 trilhas, 24 módulos, 144 tópicos, ~12 horas. Cobre instalação, canais, workspace, uso avançado e segurança.',
    icon: '🦞',
    tags: ['Docker', 'OpenClaw', 'OpenRouter', 'Telegram', 'WhatsApp', 'Self-hosted', 'IA'],
    url: 'https://inematds.github.io/docker-openclaw/',
  },
  {
    id: 122,
    title: 'Dominando o Opus 4.8',
    description:
      'Raciocínio híbrido, 1M de contexto, controle de esforço e codificação de longo horizonte. 3 trilhas, 21 módulos, 24 exercícios, 30+ prompts. Baseado no relatório oficial com 25 claims validados.',
    icon: '🧠',
    tags: ['Opus', 'Claude', '4.8', 'Effort', 'Workflows', 'Coding'],
    url: 'https://inematds.github.io/opus48/curso/',
  },
  {
    id: 7,
    title: 'EAI - Games Educativos',
    description:
      'Games Educativos - Aprenda através de jogos interativos e gamificação.',
    icon: '🎮',
    tags: ['Games', 'Educação', 'Gamificação'],
    url: 'https://inematds.github.io/EAI/',
  },
  {
    id: 44,
    title: 'Engenharia Agentic - Workflow',
    description:
      'Engenharia Agentic prática: especifique workflows, desenhe tools, rode evals, depure traces e opere sistemas agentic em ambiente real. 3 trilhas, 18 módulos, 100+ aulas e labs.',
    icon: '🔄',
    tags: ['Agentic', 'Workflows', 'Tools', 'Evals', 'IA', 'Engenharia'],
    url: 'https://inematds.github.io/agentic-workflow/',
  },
  {
    id: 97,
    title: 'Engenharia de Dados com IA',
    description:
      'A base dos sistemas de IA e agentes. 3 trilhas: Fundamentos, Dicas Técnicas e Visão Avançada. DuckDB, Text-to-SQL, pipelines, auditoria de dados. 16 módulos, ~9h30.',
    icon: '🗄️',
    tags: ['Dados', 'Engenharia', 'DuckDB', 'Pipeline', 'SQL', 'IA', 'Agentes'],
    url: 'https://inematds.github.io/engdadosai',
  },
  {
    id: 188,
    title: 'Engenharia de Sistemas Operacionais de IA — do zero ao OS vivo',
    description:
      'Construa centros de comando de IA (AIOS), uma camada por vez, sem virar engenheiro. As 6 camadas (Identidade, Substrato, Regras, Skills, Tools, Agentes), passo a passo com /os-agentes e domínios reais: tributário, vendas, suporte, conteúdo e consultoria. 5 trilhas, 21 módulos.',
    icon: '🧩',
    tags: ['AIOS', 'Agentes', 'Claude Code', 'Contexto', 'Skills', 'IA'],
    url: 'https://inematds.github.io/oscoach/',
  },
  {
    id: 106,
    title: 'Ensinando Claude Cowork - Playbook para Treinadores',
    description:
      'Playbook para quem ensina Claude Cowork. 5 trilhas, 30 módulos, ~13h. Enquadramento, 3 produtos, pré-produção de demos, tour da interface, fechamento e continuidade.',
    icon: '🎤',
    tags: ['Claude Code', 'Cowork', 'Treinamento', 'Workshop', 'Consultoria', 'IA'],
    url: 'https://inematds.github.io/cccoworkexec/',
  },
  {
    id: 47,
    title: 'Enxames de Agentes de IA',
    description:
      'Domine a construção de sistemas multiagentes inteligentes. 4 trilhas, 32 módulos e 220+ tópicos cobrindo fundamentos, frameworks (CrewAI, LangGraph, AutoGen), prática avançada e projetos hands-on.',
    icon: '🐝',
    tags: ['IA', 'Agentes', 'Multi-Agentes', 'CrewAI', 'LangGraph', 'AutoGen'],
    url: 'https://inematds.github.io/enxamesagentes/',
  },
  {
    id: 158,
    title: 'Fable Lite — Garimpando o Raciocínio dos Modelos',
    description:
      'Destile seus logs do Claude Code, meça em números reais como cada modelo trabalha e gere um playbook que faz o Opus agir mais como o Fable 5. Inclui scripts, skill e o curso completo.',
    icon: '🔶',
    tags: ['Claude Code', 'Agentic', 'Logs', 'Playbook', 'IA'],
    url: 'https://inematds.github.io/fablelite/',
  },
  {
    id: 152,
    title: 'Fábrica de Estratégia de IA — Vire Consultor de IA',
    description:
      'Construa sua própria fábrica de estratégia de IA com Claude Code e vire consultor de IA — do zero ao entregável que vende.',
    icon: '🏭',
    tags: ['IA', 'Consultoria', 'Claude Code', 'Estratégia'],
    url: 'https://inematds.github.io/aiestrategia/',
  },
  {
    id: 8,
    title: 'FDB - Fundamentos de Banco de Dados',
    description:
      'Formação em Desenvolvimento de Base - Fundamentos essenciais para desenvolvedores.',
    icon: '💻',
    tags: ['Desenvolvimento', 'Fundamentos', 'Base'],
    url: 'https://inematds.github.io/FDB/',
  },
  {
    id: 9,
    title: 'FDF - Designers do Futuro',
    description:
      'Formação de Designer do Futuro - Desenvolva competências de design para a era digital.',
    icon: '🎨',
    tags: ['Design', 'Futuro', 'Criatividade'],
    url: 'https://inematds.github.io/FDF',
  },
  {
    id: 10,
    title: 'FEA-IA - Engenharia de Agentes',
    description:
      'Formação de Engenheiros de Agentes de IA - Aprenda a criar e gerenciar agentes inteligentes.',
    icon: '🧠',
    tags: ['IA', 'Agentes', 'Engenharia'],
    url: 'https://inematds.github.io/FEA-IA/',
  },
  {
    id: 87,
    title: 'FEC - Formação de Engenharia de Contexto',
    description:
      'Engenharia de Contexto para quem leva LLM a produção. 6 trilhas, 14 módulos, 3 projetos cumulativos. Cobre janelas de contexto, message engineering, RAG, tools e agentes, memória e compressão, avaliação e deploy. Cada módulo com ilustrações e exercícios automatizados.',
    icon: '🧩',
    tags: ['Engenharia de Contexto', 'LLM', 'RAG', 'Agentes', 'Memória', 'Produção', 'IA'],
    url: 'https://inematds.github.io/FEC/',
  },
  {
    id: 11,
    title: 'FEI - Engenharia da Intenção',
    description:
      'Formação em Engenharia de Inteligência - Desenvolvimento de soluções inteligentes com IA.',
    icon: '🧪',
    tags: ['IA', 'Engenharia', 'Inteligência'],
    url: 'https://inematds.github.io/FEI/',
  },
  {
    id: 12,
    title: 'FEP - Engenharia de Prompts',
    description:
      'Formação de Engenheiros de Prompts - Domine a arte de criar prompts eficazes para IA.',
    icon: '✍️',
    tags: ['Prompts', 'IA', 'Engenharia'],
    url: 'https://inematds.github.io/FEP/',
  },
  {
    id: 38,
    title: 'FEP2 - Prompt Engineering Masterclass',
    description:
      'Masterclass em Engenharia de Prompts - Domine técnicas profissionais de prompting, desde context windows até meta prompting.',
    icon: '✍️',
    tags: ['Prompts', 'IA', 'Engenharia', 'LLMs'],
    url: 'https://inematds.github.io/FEP2/',
  },
  {
    id: 13,
    title: 'FETD - Engenharia de Treinamentos de Dados',
    description:
      'Formação em Engenharia de Treinamento de Dados - Especialização em preparação e qualidade de dados para IA.',
    icon: '📊',
    tags: ['Dados', 'Engenharia', 'Treinamento'],
    url: 'https://inematds.github.io/FETD/',
  },
  {
    id: 14,
    title: 'FGMD - Gatilhos Mentais Digitais',
    description:
      'Formação em Gatilhos Mentais no Digital - Domine a comunicação estratégica com os 10 gatilhos mentais fundamentais.',
    icon: '🎯',
    tags: ['Comunicação', 'Marketing', 'Gatilhos Mentais'],
    url: 'https://inematds.github.io/FGMD/',
  },
  {
    id: 15,
    title: 'FIA2026',
    description:
      'Formação em Automações com IA 2026 - Aprenda a criar automações inteligentes com IA.',
    icon: '⚡',
    tags: ['IA', 'Automação', '2026'],
    url: 'https://inematds.github.io/FIA2026/',
  },
  {
    id: 134,
    title: 'Formação em Automação Estratégica com IA',
    description:
      'De 10 horas para 10 segundos: identificar, desenhar e construir automações com IA que economizam tempo e têm valor comercial. O diferencial é saber o que construir, não só mexer em ferramentas. Ciclo completo Identificar→Mapear→Desenhar→Construir→Comercializar + prática. 6 trilhas, 19 módulos, exercícios, prompts e skills prontas. Baseado na tese "10 Hours to 10 Seconds".',
    icon: '⚙️',
    tags: ['Automação', 'IA', 'n8n', 'Make', 'ROI', 'Serviço'],
    url: 'https://inematds.github.io/fae-ai/',
  },
  {
    id: 128,
    title: 'Formação em IA Incorporada (VLA) — A Escola da Robótica Inteligente',
    description:
      'Página de apresentação da formação profissional em Vision-Language-Action: por que agora (o "momento ChatGPT" da robótica), pesquisa de mercado real 2024-2026 (US$ 38 bi até 2035, +78 mi de empregos, gap de 530 mil profissionais no Brasil), como China, EUA, Europa e Japão qualificam talento, casos reais por setor e o currículo em 3 trilhas. Ligada ao curso aberto VLA.',
    icon: '🎓',
    tags: ['Formação', 'VLA', 'Carreira', 'Mercado', 'Robótica', 'IA Incorporada'],
    url: 'https://inematds.github.io/vla-formacao/',
  },
  {
    id: 61,
    title: 'FPFilm - Crie Filmes com IA',
    description:
      'Criacao cinematografica com Freepik Spaces. Do roteiro ao export final usando workflows visuais baseados em nodes. 6 trilhas, 34 modulos, 200+ topicos. Cobre fundamentos de cinema, camera, producao e projeto completo.',
    icon: '🎬',
    tags: ['Freepik', 'Cinema', 'IA', 'Video', 'Filmes', 'Producao'],
    url: 'https://inematds.github.io/fpfilm1/',
  },
  {
    id: 16,
    title: 'FTD - Formação Transformação Digital',
    description:
      'Formação Técnica Digital - Capacitação técnica para o mundo digital e tecnológico.',
    icon: '⚙️',
    tags: ['Técnico', 'Digital', 'Tecnologia'],
    url: 'https://inematds.github.io/FTD/',
  },
  {
    id: 17,
    title: 'FTH - Treinamento de Humanoides',
    description:
      'Formação para Treinamento de Humanoides - Capacitação em robótica e interação humano-robô.',
    icon: '🤖',
    tags: ['Robótica', 'Humanoides', 'Treinamento'],
    url: 'https://inematds.github.io/FTH/',
  },
  {
    id: 19,
    title: 'GIPM - Projetos com IA Governada',
    description:
      'Método de Projetos com IA Governada - Aprenda a construir projetos onde a IA é um componente controlado, não o decisor.',
    icon: '🏛️',
    tags: ['IA', 'Projetos', 'Governança', 'Arquitetura'],
    url: 'https://inematds.github.io/GIPM/',
  },
  {
    id: 18,
    title: 'GitHub',
    description:
      'Repositórios e projetos INEMA no GitHub - Código aberto e colaboração.',
    icon: '🐙',
    tags: ['GitHub', 'Código', 'Colaboração'],
    url: 'https://inematds.github.io/github/',
  },
  {
    id: 180,
    title: 'Grill Me — Extraia o que está na sua cabeça',
    description:
      'O skill grill-me: ser entrevistado sem dó para extrair o que está na sua cabeça e virar contexto reutilizável para a IA. 4 trilhas — fundamentos, técnicas, o skill por dentro e os prompts avançados.',
    icon: '🔥',
    tags: ['Claude Code', 'Skills', 'Contexto', 'Prompts', 'IA'],
    url: 'https://inematds.github.io/grillme/',
  },
  {
    id: 56,
    title: 'Hack do Algoritmo Meta 2026',
    description:
      'Domine o algoritmo da Meta (Facebook e Instagram) em 2026. 4 trilhas, 20 módulos e 120+ tópicos cobrindo fundamentos do algoritmo, estratégia de conteúdo, produção de vídeos e escala de 0 a 10K+ seguidores. ~10 horas.',
    icon: '📱',
    tags: ['Meta', 'Instagram', 'Facebook', 'Marketing Digital', 'Reels', 'IA'],
    url: 'https://inematds.github.io/hack7meta',
  },
  {
    id: 168,
    title: 'HARNESS — Engenharia Agêntica de Matt Pocock',
    description:
      'O método Matt Pocock: pare de obcecar pelo modelo, domine o harness. 5 trilhas, 30 módulos, 180 tópicos — fundamentos do harness, habilidades humanas, skills de IA, técnicas avançadas (AFK, sandboxes, filas) e soluções prontas pra copiar.',
    icon: '🏎️',
    tags: ['Agentes', 'Claude Code', 'Engenharia', 'Skills', 'IA'],
    url: 'https://inematds.github.io/hardnessai/',
  },
  {
    id: 191,
    title: 'HealthOS — Coach de Saúde Pessoal com IA',
    description:
      'Construa e opere um coach de saúde pessoal num bot do Telegram, aterrado nos seus dados — wearable (WHOOP), exames de sangue, DNA e dieta — com Supabase + pgvector, visão (Gemini) e memória semântica. 3 trilhas, 12 módulos, 84 tópicos: Fundamentos, Passo a passo e Como usar. Não é conselho médico.',
    icon: '🫀',
    tags: ['HealthOS', 'Saúde', 'Agentes', 'Telegram', 'Supabase', 'WHOOP', 'IA'],
    url: 'https://inematds.github.io/healthos/',
  },
  {
    id: 104,
    title: 'Hermes + NotebookLM - O Sistema de Agente AI Definitivo',
    description:
      'Integra Hermes com NotebookLM via Telegram. 3 trilhas, 15 módulos, 108+ tópicos, ~12h. RAG grátis, podcasts, infográficos, n8n, Triad multi-modelo. $0 por consulta.',
    icon: '📱',
    tags: ['Hermes', 'NotebookLM', 'Telegram', 'RAG', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/hnotebooklm',
  },
  {
    id: 124,
    title: 'Hermes 21C — Todos os Conceitos do Hermes',
    description:
      'Os 21 conceitos do agente Hermes explicados para pessoas comuns, do mais simples ao mais poderoso. Agente vs chatbot, um cérebro 22 bocas, memória, soul.md, MCPs, sub-agentes, heartbeat, operating system. 3 trilhas, 21 módulos, ~7h, com diagramas SVG.',
    icon: '🪽',
    tags: ['Hermes', 'Agente', 'MCP', 'Sub-agentes', 'Memória', 'IA'],
    url: 'https://inematds.github.io/hermes21c/',
  },
  {
    id: 113,
    title: 'Hermes Agent — Curso Completo Avançado',
    description:
      'Agente IA open-source da Nous Research. Cria skills, memória persistente, 200+ modelos via OpenRouter. 6 trilhas, 12 módulos, ~11h.',
    icon: '🤖',
    tags: ['Hermes', 'Agente', 'Open-Source', 'Docker', 'OpenRouter', 'IA'],
    url: 'https://inematds.github.io/hermesagent/',
  },
  {
    id: 20,
    title: 'HG1 - Academia dos Humanoides G1',
    description:
      'Academias dos Humanoides - Formação especializada em robótica humanoide e interação avançada.',
    icon: '🤖',
    tags: ['Humanoides', 'Academia', 'Robótica'],
    url: 'https://inematds.github.io/HG1',
  },
  {
    id: 129,
    title: 'HyperFrames — Vídeos Explicativos com Claude Code',
    description:
      'Curso completo sobre a Skill video-explicativo: criar vídeos explicativos narrados (HTML→MP4 via HyperFrames) com Claude Code, animados, em PT-BR e renderizados localmente sem chave de API, em 16:9 e 9:16. Do conceito de Skill ao render final, com a própria Skill incluída para download.',
    icon: '🎬',
    tags: ['Claude Code', 'Skills', 'Vídeo', 'HyperFrames', 'IA'],
    url: 'https://inematds.github.io/skill-video-explicativo/',
  },
  {
    id: 187,
    title: 'IA Local Masterclass — IA na sua máquina: soberania, privacidade e agentes 24/7',
    description:
      'Curso completo e profundo de IA local: por que rodar modelos na sua máquina (soberania, privacidade, uso ilimitado), que hardware usar, e o passo a passo prático — Ollama, GGUF/quantização, Open WebUI, API local, RAG e agentes 24/7. 4 trilhas, 20 módulos, 120 tópicos.',
    icon: '🖥️',
    tags: ['IA Local', 'Ollama', 'LLM', 'Hardware', 'RAG', 'Agentes', 'Privacidade', 'IA'],
    url: 'https://inematds.github.io/local-ai-masterclass/',
  },
  {
    id: 101,
    title: 'iAmasters OS - Sistema Operativo Agêntico',
    description:
      'Sistema operativo agêntico que converte o Claude Code numa máquina de operação profissional. 3 trilhas, 9 módulos, 54 tópicos. Arquitetura agêntica, brand context, operação multi-cliente.',
    icon: '🦎',
    tags: ['IA', 'Agentes', 'Claude Code', 'Operação', 'Multi-Cliente', 'Skills'],
    url: 'https://inematds.github.io/curso-iamasters-os/',
  },
  {
    id: 62,
    title: 'IAMed - Medico IA-Native',
    description:
      'Qualificacao de medicos em IA. 9 trilhas, 54 modulos: entendendo IA, prompt clinico, pesquisa, consultorio, vibe code, segundo cerebro medico. Do fundamento a pratica. 100% gratuito.',
    icon: '🩺',
    tags: ['Medicina', 'IA', 'Saude', 'Pesquisa', 'Obsidian', 'Vibe Coding'],
    url: 'https://inematds.github.io/IAMed/',
  },
  {
    id: 78,
    title: 'iClaudeX - Planejamento Inteligente com Claude + Codex',
    description:
      'Duas IAs discutem o seu plano para você não precisar fazer isso. Claude drafta, Codex critica de múltiplas perspectivas profissionais, iteram até validar — tudo no terminal. Plugin open source para Claude Code com arquitetura de loops iterativos.',
    icon: '🤝',
    tags: ['Claude Code', 'Codex', 'OpenAI', 'Planejamento', 'Plugin', 'Open Source', 'IA'],
    url: 'https://inematds.github.io/iclaudex/',
  },
  {
    id: 45,
    title: 'Imersao Vibe Coding',
    description:
      'Do Zero ao SaaS com IA em 3 Dias. Construa uma plataforma de assistentes com agentes, skills, MCP, multibots, billing e deploy. 6 turnos intensivos, 36 topicos.',
    icon: '🚀',
    tags: ['Vibe Coding', 'SaaS', 'Agentes', 'IA', 'MCP', 'Deploy'],
    url: 'https://inematds.github.io/vb-imersao/',
  },
  {
    id: 176,
    title: 'INEMA.NCIA — Habilidades Humanas na Era da IA',
    description:
      'O canal de Telegram INEMA.NCIA virado curso de leitura: 27 tópicos em 6 trilhas sobre atenção, percepção, hábitos, neurociência do foco, persuasão e os talentos humanos que seguem escassos quando a máquina assume o resto. Reading-mode editorial, leitura no seu ritmo.',
    icon: '🧠',
    tags: ['Habilidades Humanas', 'Neurociência', 'Persuasão', 'Foco', 'IA'],
    url: 'https://inematds.github.io/inemancia2/',
  },
  {
    id: 145,
    title: 'inemaref — Foto vira história em quadrinhos',
    description:
      'Fábrica de conteúdo a partir de uma referência de pessoa real: ficha de personagem → página de HQ → motion comic narrado (câmera viaja sobre a página). Textless + camada, tudo local (flux2-klein, inemavox, ffmpeg).',
    icon: '🎭',
    tags: ['Quadrinhos', 'Motion Comic', 'Vídeo', 'IA', 'Local'],
    url: 'https://inematds.github.io/inemaref/',
  },
  {
    id: 71,
    title: 'INTELECTO - Inteligência Pessoal sem Frameworks Inchados',
    description:
      'Compare 9 frameworks de IA (OpenClaw, ZeroClaw, NanoClaw, NanoBot, PicoClaw, IronClaw, TinyClaw, Agent Zero), escolha os ingredientes certos para o seu assistente pessoal e entenda os 8 corredores de funcionalidades e 6 padrões de arquitetura.',
    icon: '🧠',
    tags: ['Frameworks', 'IA', 'Assistente', 'Comparativo', 'Arquitetura', 'Agentes'],
    url: 'https://inematds.github.io/intelecto',
  },
  {
    id: 74,
    title: 'INTELECTO Curso - Do Zero ao Expert em IA',
    description:
      'Curso completo de construção de assistentes de IA pessoais: 6 trilhas (Fundamentos, Identidade e Canais, Segurança Zero-Trust, Memória e Integrações, Arquiteturas Avançadas, Projeto Final: Seu Jarvis), 18 módulos, ~21 horas.',
    icon: '🤖',
    tags: ['Assistente IA', 'Frameworks', 'Segurança', 'Memória', 'Arquitetura', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/intelecto-curso/',
  },
  {
    id: 181,
    title: 'Jarvis — Seu Sistema Operacional de IA',
    description:
      'Curso aberto e para leigos sobre Jarvis e sistemas operacionais de IA: fundamentos, panorama dos sistemas (OpenClaw, GravityClaw, Hermes, Intelecto, AIOS), a anatomia (canais, identidade, ferramentas, skills, agentes, cérebros) e trilhas práticas — construir um Jarvis eficaz, no celular e para crianças (educativo, socrático). 6 trilhas, 21 módulos, 126 tópicos.',
    icon: '🤖',
    tags: ['Jarvis', 'SO de IA', 'Agentes', 'MCP', 'Assistente IA', 'IA'],
    url: 'https://inematds.github.io/jarvis/',
  },
  {
    id: 118,
    title: 'Karpathy Guidelines — 4 Princípios para Código Limpo com LLM',
    description:
      'Baseado em Andrej Karpathy. Think Before Coding, Simplicity First, Surgical Changes, Goal-Oriented. 1 trilha, 4 módulos, ~2h.',
    icon: '🧠',
    tags: ['Karpathy', 'Claude Code', 'CLAUDE.md', 'Princípios', 'LLM', 'IA'],
    url: 'https://inematds.github.io/akarpathy-skill/curso-pt/',
  },
  {
    id: 214,
    title: 'Lives 2026 — 7 vídeos estratégicos de serviços de IA',
    description:
      'Sete lives curtas e narradas sobre o lado estratégico de vender serviços de IA: negociação real, precificação por valor, o que empresas compram, build to sell, sinal vs ruído, a guerra das ferramentas e a venda que o cliente não pediu. Cada uma em 16:9 e 9:16 (Shorts/Reels).',
    icon: '🎙️',
    tags: ['IA', 'Negócios', 'Vídeos', 'Estratégia', 'Serviços'],
    url: 'https://inematds.github.io/lives2/',
  },
  {
    id: 182,
    title: 'LLMs Orquestradas — Multi-LLM, Fugu Ultra e OpenRouter Fusion',
    description:
      'A nova forma de rodar vários modelos de IA juntos: o que é orquestrar, do conceito ao Sakana Fugu Ultra (decompõe e delega) e à OpenRouter Fusion (ensemble paralelo + juiz), com o benchmark real de quando vale o custo. 3 trilhas, 6 módulos, camada de aprendizagem v2.',
    icon: '🐟',
    tags: ['Orquestração', 'Multi-LLM', 'Fugu', 'OpenRouter', 'Claude Code', 'IA'],
    url: 'https://inematds.github.io/sakanafugu/',
  },
  {
    id: 169,
    title: 'Loop Agentes v2 — Engenharia de Loops',
    description:
      'Pare de promptar seus agentes — projete os loops que promptam eles. Do esqueleto reason→act→observe ao Loop Engineering, com diagramas e exemplos prontos pra copiar e rodar. 4 trilhas, 13 módulos, 86 tópicos.',
    icon: '🔁',
    tags: ['Agentes', 'Loops', 'Loop Engineering', 'Claude Code', 'Verificação', 'IA'],
    url: 'https://inematds.github.io/loop-agentes-v2/',
  },
  {
    id: 170,
    title: 'Loop Engineering — Sistemas com IA no Loop',
    description:
      'Cole Medin explica Loop Engineering: como criar sistemas onde a IA opera em loops contínuos com verificação humana. 4 trilhas (Fundamentos, Vantagens vs Desvantagens, Implementação Técnica, Exemplos Práticos), 14 módulos, ~4h. Camada de aprendizagem v2.',
    icon: '🔄',
    tags: ['Loop Engineering', 'Agentes', 'IA', 'Sistemas', 'Verificação', 'Cole Medin'],
    url: 'https://inematds.github.io/loop-engineering/',
  },
  {
    id: 21,
    title: 'MAKE - Automações',
    description:
      'Curso Completo de Automação - Domine automação no-code com Make e IA.',
    icon: '⚡',
    tags: ['Automação', 'Make', 'No-Code', 'IA'],
    url: 'https://inematds.github.io/MAKE/',
  },
  {
    id: 79,
    title: 'MakeClaudeX - Engenharia com Claude Code: Do Prompt ao Plugin',
    description:
      'Construa plugins de produção com Claude Code usando o método real do Claudex. 4 trilhas (Fundamentos, Construindo, O Método, Avançado), 24 módulos, 144 tópicos, ~19 horas. Cobre hooks, slash commands, skills, state management YAML/CAS, Git e GitHub API.',
    icon: '🔧',
    tags: ['Claude Code', 'Hooks', 'Plugins', 'Skills', 'Engenharia', 'YAML', 'IA'],
    url: 'https://inematds.github.io/makeclaudex/',
  },
  {
    id: 110,
    title: 'Mapa do Cliente — Formação DICA',
    description:
      'Consultor de IA para Pequenos Negócios. Método DICA (Diagnosticar, Implementar, Capacitar, Acompanhar). 6 trilhas, 28 módulos, ~15h.',
    icon: '🗺️',
    tags: ['Consultoria', 'DICA', 'Vendas', 'Pequenos Negócios', 'IA'],
    url: 'https://inematds.github.io/mapacliente/',
  },
  {
    id: 81,
    title: 'Master Codex - A Fábrica de SaaS com Agentes de IA',
    description:
      'Evolua de curioso a operador de fábrica de software com agentes IA. 6 trilhas, 24 módulos, 144 tópicos em ~27 horas. Cobre protocolos de comunicação (AGENTS.md), UI/UX com IA, backend multi-tenant, WhatsApp, orquestração multi-agente paralela e metodologia de micro-SaaS semanal. Projeto-âncora: InboxAI.',
    icon: '⚡',
    tags: ['Claude Code', 'SaaS', 'Multi-agente', 'WhatsApp', 'Automação', 'Produção', 'IA'],
    url: 'https://inematds.github.io/mastercodex/',
  },
  {
    id: 85,
    title: 'Mentes Brilhantes - A Fórmula 1-20-79',
    description:
      '1% ideia, 20% produto, 79% venda. Curso gratuito de mentalidade empreendedora com case Cal AI ($100M+). 6 trilhas, 24 módulos, 144+ tópicos. Cobre validação de ideias, MVP, marketing, distribuição, vendas, retenção e escala. 100% gratuito.',
    icon: '💡',
    tags: ['Empreendedorismo', 'Vendas', 'Marketing', 'MVP', 'Mindset', 'Gratuito'],
    url: 'https://inematds.github.io/mentesbrilhantes1/',
  },
  {
    id: 192,
    title: 'Mente, Poder e Máquina — Neurociência, Vieses e Comportamento',
    description:
      'Neurociência, vieses cognitivos e futuro do comportamento humano. Baseado em Marcus Bruzzo, Kahneman, Milgram, Thaler e Chalmers. 6 trilhas, 18 módulos, 108 tópicos.',
    icon: '🧠',
    tags: ['Neurociência', 'Comportamento', 'Vieses Cognitivos', 'Filosofia', 'IA', 'Ética'],
    url: 'https://inematds.github.io/neurociencia-comportamento/',
  },
  {
    id: 49,
    title: 'MiroFish - Ecossistema de Predição Multiagente',
    description:
      'Domine o motor de predição multiagente que constrói mundos digitais paralelos para simular cenários futuros. Pipeline MindSpider, BettaFish e MiroFish. 5 trilhas, 30 módulos e ~180 tópicos.',
    icon: '🐟',
    tags: ['IA', 'Multiagente', 'Simulação', 'Predição', 'GraphRAG'],
    url: 'https://inematds.github.io/mirofishcurso/',
  },
  {
    id: 115,
    title: 'MkBlogs — Publicação Multi-Plataforma',
    description:
      'Publicação em escala sem SaaS pago. Postiz self-hosted, redes sociais, blogs, deploy. 6 trilhas, 28 módulos, ~20h.',
    icon: '📝',
    tags: ['Publicação', 'Blog', 'Redes Sociais', 'Open-Source', 'Deploy', 'IA'],
    url: 'https://inematds.github.io/mkblogs/',
  },
  {
    id: 141,
    title: 'MDD — Mestre de Direção Dinâmica',
    description:
      'Skill para Claude Code que transforma qualquer assunto em um pacote completo de direção de vídeo dinâmico (cartão, pacote de cena, storyboard, faixa do diretor, prompt final e prompt negativo), pronto pra gerar em Seedance, Kling, Runway, Veo ou Luma.',
    icon: '🎬',
    tags: ['Vídeo', 'Storyboard', 'Prompt', 'IA', 'Claude Code', 'Skill'],
    url: 'https://inematds.github.io/mdd/',
  },
  {
    id: 116,
    title: 'mkbook — Seu livro em 30 dias com Claude Code',
    description:
      'Escreva, publique e lance um livro em 30 dias com Claude Code. 4 trilhas, 16 módulos, ~12h. EPUB, PDF, MOBI para Amazon KDP.',
    icon: '📖',
    tags: ['Livro', 'Claude Code', 'Publicação', 'KDP', 'EPUB', 'IA'],
    url: 'https://inematds.github.io/mkbook/',
  },
  {
    id: 137,
    title: 'mkivideos — Fila de Vídeos com IA',
    description:
      'Motor de fila para criar vídeos (explicativo/curso/demo) um por vez, comandado por Telegram (/mkivideos) e visível num painel. Host-agnóstico: roda em qualquer bot jarvis ou standalone. Concorrência controlada pra não sobrecarregar a máquina.',
    icon: '🎬',
    tags: ['Vídeo', 'Fila', 'Automação', 'Telegram', 'IA', 'Ferramenta'],
    url: 'https://inematds.github.io/mkivideos/',
  },
  {
    id: 86,
    title: 'Multiagentes - Equipes de Agentes na Prática',
    description:
      'Projete, orquestre e opere squads de agentes IA que entregam software de produção. 5 trilhas, 20 módulos, 120 tópicos em ~16h + 4h de projeto final. Cobre Claude Code, OpenAI Codex, Gemini CLI, coordenação multi-agente, diagnóstico, custos e multi-runtime.',
    icon: '🤖',
    tags: ['Multi-agente', 'Claude Code', 'Codex', 'Gemini', 'Orquestração', 'Produção', 'IA'],
    url: 'https://inematds.github.io/multiagentes/',
  },
  {
    id: 22,
    title: 'N8Nb - Fundamentos N8N',
    description:
      'Fundamentos de N8N - Aprenda os fundamentos da automação com N8N.',
    icon: '🔗',
    tags: ['Automação', 'N8N', 'Fundamentos'],
    url: 'https://inematds.github.io/N8Nb',
  },
  {
    id: 23,
    title: 'N8Np',
    description:
      'N8N Avançado - Domine técnicas avançadas de automação com N8N.',
    icon: '⚡',
    tags: ['Automação', 'N8N', 'Avançado'],
    url: 'https://inematds.github.io/N8Np',
  },
  {
    id: 24,
    title: 'NanoBanana - SuperCurso Nano Banana',
    description:
      'SuperCurso Nano Banana - Curso especial de formação acelerada.',
    icon: '🍌',
    tags: ['Curso', 'Formação', 'Nano'],
    url: 'https://inematds.github.io/NanoBanana/',
  },
  {
    id: 103,
    title: 'New Agentic OS - Do Executivo ao Jarvis Multi-Cliente',
    description:
      'Disciplina de engenharia agêntica completa. 4 trilhas (Executivo, Builder, Multi-usuário, iAmasters OS), 24 módulos, ~25h. Vocabulário, ROI, arquitetura multi-usuário, caso real.',
    icon: '🏛️',
    tags: ['Agentes', 'Agentic OS', 'Multi-Cliente', 'Arquitetura', 'IA', 'Jarvis'],
    url: 'https://inematds.github.io/newagenticos/',
  },
  {
    id: 40,
    title: 'NotebookLM - Do Zero ao Avançado',
    description:
      'NotebookLM Completo - Domine a ferramenta de IA do Google que transforma documentos em conhecimento acionável, com áudio, mapas mentais e chat inteligente.',
    icon: '📓',
    tags: ['NotebookLM', 'Google AI', 'Documentos', 'IA', 'RAG'],
    url: 'https://inematds.github.io/notebooklm',
  },
  {
    id: 217,
    title: 'NVIDIA API Free — Console gratuito para 100+ modelos de IA',
    description:
      'Acesso gratuito a 100+ modelos NVIDIA NIM (Llama, DeepSeek, Qwen, Mistral, Vision) via API OpenAI-compatible. Console web com chat, arena side-by-side, embeddings. Sem cartão de crédito, 40 RPM.',
    icon: '⚡',
    tags: ['NVIDIA', 'API', 'LLM', 'IA'],
    url: 'https://inematds.github.io/nvidiaapifree/guia/',
  },
  {
    id: 153,
    title: 'O Manual Oculto da IA — do Fundamento ao Cérebro do Fable',
    description:
      'System prompts e disciplina de agentes destilados de prompts reais (Anthropic, OpenAI, xAI, Cursor, Perplexity) + o método de recuperar o "cérebro" de um bom agente a partir dos logs. 3 trilhas, 20 módulos, 120 tópicos.',
    icon: '🧠',
    tags: ['System Prompts', 'Agentes', 'Prompt Engineering', 'Claude Code', 'IA'],
    url: 'https://inematds.github.io/manual-oculto-ia/',
  },
  {
    id: 179,
    title: 'O Mundo Após o Claude',
    description:
      'De usuário a maestro: comande a IA para construir qualquer coisa e monte seu próprio Jarvis. Para público leigo — não precisa programar. 3 trilhas, 16 módulos; Trilha 1 (Fundamentos) no ar.',
    icon: '🎼',
    tags: ['Jarvis', 'Agentes', 'Iniciante', 'Claude', 'IA'],
    url: 'https://inematds.github.io/mundo-apos-claude/',
  },
  {
    id: 119,
    title: 'OpenHuman Mastery',
    description:
      'Assistente IA para comunidades. Arquitetura local, multi-canal, memória, skills, open-source. 6 trilhas, 18 módulos, ~14.5h. Rust, React, Tauri v2.',
    icon: '🧬',
    tags: ['OpenHuman', 'Assistente', 'Comunidade', 'Rust', 'Tauri', 'IA'],
    url: 'https://inematds.github.io/openhuman/',
  },
  {
    id: 67,
    title: 'Opus 4.7 - Dominando o Claude Code',
    description:
      'Treinamento pratico para dominar o Opus 4.7 no Claude Code. 4 trilhas, 28 modulos, 180+ topicos em ~20 horas. Cobre transicao do 4.6, orquestracao agentica, fan-out paralelo, framework ICCA, auditoria e migracao para producao.',
    icon: '🧬',
    tags: ['Claude Code', 'Opus 4.7', 'Anthropic', 'Agentic', 'IA', 'Produtividade'],
    url: 'https://inematds.github.io/opus47/',
  },
  {
    id: 210,
    title: 'OS Coach — Você Constrói a Base do Seu OS Agêntico',
    description:
      'Skill do Claude Code que treina você, camada por camada (Identidade, Substrato, Regras, Skills, Ferramentas, Agentes), na construção do seu próprio OS agêntico, sem precisar programar. Um treinador particular que constrói os arquivos de verdade pra você.',
    icon: '🧑‍🏫',
    tags: ['Claude Code', 'Skill', 'OS Agêntico', 'Coaching', 'IA'],
    url: 'https://inematds.github.io/os-coach/guia/',
  },
  {
    id: 209,
    title: 'os-agentes — Skill Cria Agentic',
    description:
      'Sistema de criação de agentes passo a passo: guia você, camada por camada, na construção do seu próprio OS agêntico (Identidade, Substrato, Regras, Skills, Ferramentas, Agentes), sem precisar saber programar.',
    icon: '🧭',
    tags: ['Claude Code', 'Skill', 'OS Agêntico', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/os-agentes/guia/',
  },
  {
    id: 149,
    title: 'Padrões de System Prompts — Anatomia, Catálogo e Evolução',
    description:
      'Engenharia de system prompts revelada pelos prompts reais de Claude, GPT, Gemini, Cursor e outros. Anatomia das 6 seções universais, catálogo de 12 padrões nomeados + 5 antipadrões, e a evolução por diffs (Opus 4.8 → Fable 5) com citações originais.',
    icon: '📜',
    tags: ['System Prompts', 'Engenharia de Prompts', 'Claude', 'LLM', 'IA'],
    url: 'https://inematds.github.io/system_prompts_leaks/',
  },
  {
    id: 50,
    title: 'PHA 2030 - Da Capacitação à Transformação',
    description:
      'Prepare pessoas, equipes e empresas para a era da inteligência aplicada. Capacitação, diagnóstico, monitoramento e consultoria com clareza, critério e escala. 3 trilhas, 12 módulos e 72 tópicos.',
    icon: '🎯',
    tags: ['Transformação Digital', 'Capacitação', 'IA Aplicada', 'Consultoria', 'Educação'],
    url: 'https://inematds.github.io/pha2030-aula',
  },
  {
    id: 146,
    title: 'Pirâmide da IA — Engenharia de Conhecimento da IA',
    description:
      'Suba a Pirâmide da Inteligência Aplicada camada por camada: Prompt, Intenção, Contexto, Aproveitamento, Arquitetura e Evolução. 6 trilhas, 13 módulos, diagnóstico de nível e 6 artefatos prontos — feito pra quem está entrando tarde na IA.',
    icon: '🔺',
    tags: ['IA', 'Prompt', 'Engenharia de Contexto', 'Método', 'Requalificação'],
    url: 'https://inematds.github.io/aiengenharia/',
  },
  {
    id: 144,
    title: 'PixFlow — Imagens estáticas viram filme',
    description:
      'Recria a qualidade do pixflow.net em código aberto: transforma imagens estáticas em vídeos cinematográficos (parallax 2.5D real, grain, color grade, vinheta, aberração, bloom, câmera e transições) de forma determinística — sem geradores de vídeo por IA. Skill pixflow-motion: movie spec YAML → Depth-Anything → WebGL/GLSL → Remotion → FFmpeg → MP4. Tudo local.',
    icon: '🪄',
    tags: ['Vídeo', 'Parallax', 'Remotion', 'WebGL', 'Código Aberto', 'Skill'],
    url: 'https://inematds.github.io/pixflow/',
  },
  {
    id: 25,
    title: 'Playbook - Formação Consultor IA - Inglês',
    description:
      'Playbook de Desenvolvimento - Guia completo de boas práticas e metodologias de desenvolvimento.',
    icon: '📖',
    tags: ['Desenvolvimento', 'Guia', 'Metodologia'],
    url: 'https://inematds.github.io/Playbook/',
  },
  {
    id: 26,
    title: 'Playbook-IA - Formação de Consultoria IA',
    description:
      'Curso de Consultoria em IA - Formação especializada para consultores de Inteligência Artificial.',
    icon: '🎯',
    tags: ['IA', 'Consultoria', 'Especialização'],
    url: 'https://inematds.github.io/Playbook-IA/',
  },
  {
    id: 111,
    title: 'PolySkills — Claude Code & Codex lado a lado',
    description:
      'Da terminologia básica aos fluxos avançados com os dois agentes em paralelo. 6 trilhas, 10 módulos, ~7.5h. Skills cross-runtime, conversão zero-loss.',
    icon: '🔀',
    tags: ['Claude Code', 'Codex', 'PolySkill', 'Cross-Runtime', 'Skills', 'IA'],
    url: 'https://inematds.github.io/polyskills',
  },
  {
    id: 58,
    title: 'Por Dentro do Claude Code',
    description:
      'A arquitetura revelada do agente de IA mais sofisticado ja construido. Baseado em 512k linhas de TypeScript. 3 trilhas (Fundamentos, Nucleo, Avancado), 12 modulos, 72 topicos em ~6 horas.',
    icon: '🔬',
    tags: ['Claude Code', 'Anthropic', 'Arquitetura', 'TypeScript', 'IA', 'Agentes'],
    url: 'https://inematds.github.io/claudecode-estrutura/',
  },
  {
    id: 27,
    title: 'Portal INEMA',
    description:
      'Portal dos Projetos, Sites e Plataformas do INEMA - Acesso centralizado a todos os recursos.',
    icon: '🌐',
    tags: ['Portal', 'Projetos', 'Plataformas'],
    url: 'https://inematds.github.io/portal/',
  },
  {
    id: 88,
    title: 'Power Design - Os 20 Princípios',
    description:
      'Os 20 princípios de design fundamentais aplicados a slides e apresentações profissionais com Claude Code. 7 seções (Carga Cognitiva, Hierarquia Visual, Gestalt, Tipografia, Cor, Sistemas Espaciais, Alinhamento), 72+ brand systems, referências Tufte/Reynolds/Duarte. Slides que não parecem feitos por IA.',
    icon: '🎨',
    tags: ['Design', 'Slides', 'Claude Code', 'Tipografia', 'Gestalt', 'Apresentações', 'IA'],
    url: 'https://inematds.github.io/power-design/',
  },
  {
    id: 95,
    title: 'Printing Press - CLI para Agentes de IA',
    description:
      'Por que CLI vence MCP e API para agentes. 35x menos tokens, 100% confiabilidade. Conceitos, instalação, criar sua CLI, BrasilAPI, n8n + Supabase. 7 módulos, ~2h.',
    icon: '🖨️',
    tags: ['CLI', 'Agentes', 'MCP', 'Printing Press', 'n8n', 'Supabase'],
    url: 'https://inematds.github.io/pp-cli/',
  },
  {
    id: 89,
    title: 'Prof2030 - O Profissional do Futuro',
    description:
      'O Tripé do Profissional do Futuro: comunicar com a máquina, empreender pela automação e liderar com humanidade. 3 trilhas, 18 módulos, 108 tópicos, ~13h.',
    icon: '🧬',
    tags: ['Neurociência', 'Futuro', 'IA', 'Automação', 'Liderança', 'Empreendedorismo'],
    url: 'https://inematds.github.io/prof2030/',
  },
  {
    id: 112,
    title: 'Profissional 2027 — Implementadores de IA para PMEs',
    description:
      'Formação de implementadores de IA para PMEs. Método DPIA (Diagnosticar, Processar, Instruir, Automatizar). 6 trilhas, ~100h em 10-12 semanas.',
    icon: '🎯',
    tags: ['Consultoria', 'PME', 'DPIA', 'Implementação', 'n8n', 'IA'],
    url: 'https://inematds.github.io/profissional2027x',
  },
  {
    id: 194,
    title: 'Profissional Liberal Experiente com IA — Aprenda a usar IA para atender melhor, produzir mais e transformar sua experiência em autoridade',
    description:
      'Curso prático para profissionais liberais (advogados, médicos, contadores, arquitetos, consultores). 5 trilhas, 15 módulos, 90 tópicos. Saia com 1 assistente configurado, 10 prompts essenciais, 3 templates (proposta, resposta, conteúdo), 1 checklist e 1 rotina semanal de IA. Camada de aprendizagem v2.',
    icon: '🧑‍💼',
    tags: ['IA', 'Profissional Liberal', 'Produtividade', 'Prompts', 'Templates'],
    url: 'https://inematds.github.io/pro-liberal-ia/',
  },
  {
    id: 99,
    title: 'Prompt Director - Imagens e Cinema com IA',
    description:
      'Direção de arte com IA. Midjourney, Sora 2, Veo 3, Runway Gen-4, Flux, Seedance, Kling. 4 trilhas, 19 módulos, 114 tópicos, +80 prompts prontos.',
    icon: '🎬',
    tags: ['Prompt', 'Cinema', 'Imagens', 'Vídeo', 'Midjourney', 'Sora', 'IA'],
    url: 'https://inematds.github.io/promptfilmes/',
  },
  {
    id: 193,
    title: 'Prompting Claude Fable 5 — 2 Trilhas, 14 Módulos',
    description:
      'Trilha 1: as 6 técnicas de prompting pro Claude Fable 5, verificadas contra a documentação oficial da Anthropic (effort levels, pricing, refusals/fallback pro Opus 4.8). Trilha 2: 12 dicas práticas pra usar o Fable 5 como agente de trabalho — tarefa certa, limites, verificação, subagentes, memória e loops.',
    icon: '🐉',
    tags: ['Prompting', 'Claude', 'Fable 5', 'Anthropic', 'IA'],
    url: 'https://inematds.github.io/fable5back/',
  },
  {
    id: 28,
    title: 'Prompts',
    description:
      'Formação de Engenheiros de Prompts - Técnicas avançadas de engenharia de prompts para IA.',
    icon: '📝',
    tags: ['Prompts', 'Engenharia', 'IA'],
    url: 'https://inematds.github.io/prompts/',
  },
  {
    id: 154,
    title: 'Prompts Prontos — 13 System Prompts Copiáveis',
    description:
      '13 system prompts completos e prontos pra usar (agente de código, pesquisa, persona, subagente, destilador de cérebro…), montados a partir das técnicas do Manual Oculto da IA. Copie, troque os campos, cole.',
    icon: '📋',
    tags: ['System Prompts', 'Prompt Engineering', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/prompts-prontos/',
  },
  {
    id: 138,
    title: 'Remotion - Vídeo Programático com React',
    description:
      'Curso gratuito de Remotion: do conceito de frame aos 81 templates prontos, até projetos completos. Vídeo com código em React, sem keyframes de CSS.',
    icon: '🎬',
    tags: ['Remotion', 'React', 'Vídeo', 'IA'],
    url: 'https://inematds.github.io/remotion-templates/',
  },
  {
    id: 29,
    title: 'Robot',
    description: 'Plataforma Robot - Robótica e automação inteligente.',
    icon: '🤖',
    tags: ['Robótica', 'Automação', 'Robot'],
    url: 'https://inematds.github.io/robot/',
  },
  {
    id: 80,
    title: 'Ruflo - Orquestração de Agentes Multi-IA',
    description:
      'Coordene enxames de agentes especializados com Claude Code, AgentDB+HNSW, federation zero-trust e auto-aprendizado SONA. 3 trilhas (Fundamentos, Uso Prático, Avançado), 21 módulos, 126 tópicos, ~45 horas. Deploy em produção com consenso distribuído e 33 plugins nativos.',
    icon: '🤖',
    tags: ['Claude Code', 'Multi-agente', 'Orquestração', 'Zero-trust', 'SONA', 'AgentDB', 'IA'],
    url: 'https://inematds.github.io/ruflo/',
  },
  {
    id: 63,
    title: 'Seedance 2.0 Mastery - Video com IA',
    description:
      'Curso completo de geracao de video com Seedance 2.0 (ByteDance). 3 trilhas (Iniciante, Aplicado, Tecnico), ~85 aulas. Cobre prompts, cinema, storytelling, reverse engineering e pipeline de producao. Audio nativo, faces reais e image references.',
    icon: '🎥',
    tags: ['Seedance', 'Video', 'IA', 'ByteDance', 'Cinema', 'Prompts'],
    url: 'https://inematds.github.io/seedance2/',
  },
  {
    id: 123,
    title: 'segROBOT — Requalificação Humana para Ambientes Robotizados',
    description:
      'Pesquisa profunda sobre integração humano-robô. ISO 10218:2025, cobots, AMRs, humanoides, digital twins, gestão de mudança. 3 trilhas, 18 módulos. 50+ fontes.',
    icon: '🦾',
    tags: ['Robótica', 'Requalificação', 'ISO', 'Cobots', 'Humanoides', 'HRC'],
    url: 'https://inematds.github.io/segrobot/',
  },
  {
    id: 207,
    title: 'Segunda Opinião — IA para Gestores e Líderes',
    description:
      '5 aulas para líderes de PME sem base técnica usarem IA como espelho, conselheira e simuladora de decisão — nunca como substituta da liderança. Decisão, conversas difíceis, comunicação, desenvolvimento de pessoas e ritual semanal.',
    icon: '🪞',
    tags: ['Liderança', 'IA', 'Gestão', 'Decisão'],
    url: 'https://inematds.github.io/segunda-opiniao/',
  },
  {
    id: 189,
    title: 'Segundo Cérebro pro Claude Code — Graphify + Obsidian',
    description:
      'Dê memória persistente ao Claude Code: o Graphify (graphifyy) transforma um repositório ou uma pasta de documentos num grafo de conhecimento e exporta pro Obsidian, que o agente consulta. 3 trilhas, 14 módulos, com passo a passo copy-run.',
    icon: '🧠',
    tags: ['Claude Code', 'Graphify', 'Obsidian', 'Knowledge Graph', 'Memória', 'IA'],
    url: 'https://inematds.github.io/segundo-cerebro/',
  },
  {
    id: 30,
    title: 'SHIA - Super Humanos Inteligência Ampliada',
    description:
      'Super Humanos Inteligência Ampliada - Formação para potencializar capacidades humanas com IA.',
    icon: '🧬',
    tags: ['IA', 'Super Humanos', 'Inteligência'],
    url: 'https://inematds.github.io/SHIA/',
  },
  {
    id: 130,
    title: 'Skill Design — Arsenal de Skills pra Melhorar Páginas',
    description:
      'Curso-catálogo dos 16 skills do Claude Code para criar e melhorar páginas, agrupados em 4 trilhas (Construir, Identidade, Mídia, Apoio). Analisa frontend-design, impeccable, web-artifacts-builder, theme-factory, brand-guidelines, animation-designer, remotion, agent-browser (Playwright), website-intelligence e mais — cada um com o que faz, quando dispara, como melhora a página e prompts prontos.',
    icon: '🎨',
    tags: ['Claude Code', 'Skills', 'Design', 'Frontend', 'IA'],
    url: 'https://inematds.github.io/skill-design/',
  },
  {
    id: 39,
    title: 'Skills - Agent Skills Mastery',
    description:
      'Domine a criação de Skills para agentes de IA. Aprenda a criar, configurar e distribuir skills para Claude Code, Gemini CLI e outras plataformas.',
    icon: '🧠',
    tags: ['Skills', 'IA', 'Agentes', 'Claude Code', 'Gemini'],
    url: 'https://inematds.github.io/skills',
  },
  {
    id: 117,
    title: 'Skills For Real Engineers',
    description:
      'Skills do Matt Pocock para Claude Code. Anatomia de SKILL.md, triggers, workflow, exemplos práticos (handoffs, code review, debugging).',
    icon: '🛠️',
    tags: ['Skills', 'Claude Code', 'Matt Pocock', 'SKILL.md', 'Workflow', 'IA'],
    url: 'https://inematds.github.io/mp-skill/curso-skills/',
  },
  {
    id: 96,
    title: 'Skills Premium - Do Iniciante ao Expert',
    description:
      'Domine skills no Claude Code. 3 trilhas: Fundamentos, Dicas Técnicas e No Expert. 20 módulos, sub-agentes, prompts canhão, skills auto-iterativas.',
    icon: '⚡',
    tags: ['Skills', 'Claude Code', 'Agentes', 'Sub-agentes', 'IA', 'Expert'],
    url: 'https://inematds.github.io/skills-premium/',
  },
  {
    id: 208,
    title: 'SSH e Chaves SSH — Acesse sua VPS sem Depender de Suporte',
    description:
      'Curso web (formato-curso v5, 9 aulas) para quem nunca abriu um terminal: conectar numa VPS, criar e usar chaves SSH, colocar a chave no servidor e diagnosticar os erros de conexão mais comuns.',
    icon: '🔑',
    tags: ['SSH', 'VPS', 'Automação', 'IA'],
    url: 'https://inematds.github.io/ssh-basico/',
  },
  {
    id: 190,
    title: 'STORM Research — Pesquisa Multi-Perspectiva Verificada com Claude',
    description:
      'Método STORM (Stanford) como skill do Claude Code: 5 lentes de especialistas, mapa de contradições e verificação de citações contra a fonte primária. 3 trilhas, 11 módulos, 66 tópicos. Inclui download da skill + template do relatório.',
    icon: '🌩️',
    tags: ['Claude Code', 'Skills', 'Pesquisa', 'STORM', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/storm-research/',
  },
  {
    id: 150,
    title: 'Subagentes — Especialistas do Claude Code',
    description:
      'Curso completo sobre subagentes do Claude Code (e Codex): fundamentos, criação na prática, modelo/custo/orquestração e avançado. 4 trilhas, 24 módulos, com exemplos .md, prompts prontos, exercícios e desenhos.',
    icon: '🤖',
    tags: ['Claude Code', 'Subagentes', 'Skills', 'Agentes', 'Codex', 'IA'],
    url: 'https://inematds.github.io/subagentes/',
  },
  {
    id: 73,
    title: 'Superpowers - Desenvolvimento com Agentes de IA',
    description:
      'Metodologia completa do brainstorming ao deploy com agentes: TDD, subagentes, debugging sistemático, worktrees, agentes paralelos e criação de skills. 1 trilha, 10 módulos, 42 tópicos, ~5 horas. Intermediate.',
    icon: '⚡',
    tags: ['Claude Code', 'Agentes', 'TDD', 'Metodologia', 'Worktrees', 'Skills', 'IA'],
    url: 'https://inematds.github.io/superpowers/',
  },
  {
    id: 31,
    title: 'SuperProf',
    description:
      'SuperProf - Formação avançada para professores e educadores do futuro.',
    icon: '🎓',
    tags: ['Educação', 'Professores', 'Formação'],
    url: 'https://inematds.github.io/SuperProf/',
  },
  {
    id: 77,
    title: 'SuperSkills Karpathy - Transforme Skills em Funcionários Digitais',
    description:
      'Método Karpathy para criar skills que funcionam como funcionários digitais reais: contexto, memória, integração de dados e melhoria contínua. 3 trilhas, 9 módulos, 54 tópicos, ~5 horas. Cobre Memory OS, Signal Dashboard e Claude Code.',
    icon: '🧑‍💻',
    tags: ['Claude Code', 'Skills', 'Karpathy', 'Memory OS', 'Agentes', 'IA', 'Produtividade'],
    url: 'https://inematds.github.io/superskills-karpathy/',
  },
  {
    id: 32,
    title: 'TDS',
    description:
      'Transformação Digital Sustentável - Curso completo sobre transformação digital com foco em sustentabilidade.',
    icon: '🌱',
    tags: ['Transformação Digital', 'Sustentabilidade', 'Inovação'],
    url: 'https://inematds.github.io/TDS/',
  },
  {
    id: 33,
    title: 'TikTok Shop',
    description:
      'TikTok Shop - Aprenda a vender e monetizar na plataforma TikTok Shop.',
    icon: '🛒',
    tags: ['TikTok', 'E-commerce', 'Vendas'],
    url: 'https://inematds.github.io/tiktokshop',
  },
  {
    id: 94,
    title: 'TimesMarketing 3 - Automação de Conteúdo com IA',
    description:
      'Sistema de automação de marketing com agentes IA via Telegram. Pipeline: pesquisa, narrativa, imagens, vídeos e publicação. Docker + Redis + Remotion.',
    icon: '📈',
    tags: ['Marketing', 'Automação', 'Agentes', 'Telegram', 'Vídeo', 'IA', 'Docker'],
    url: 'https://github.com/inematds/timesmkt3',
  },
  {
    id: 98,
    title: 'TRIAD - Automação de IA Multi-Modelo com Hermes e DeepSeek',
    description:
      'Sistema multi-modelo 24/7: Claude Opus (condutor), DeepSeek V4 (executor), GPT-5.5 (crítico). 4 trilhas, OpenRouter, Pantheon para times.',
    icon: '🎭',
    tags: ['Agentes', 'Multi-Modelo', 'Hermes', 'OpenRouter', 'Automação', 'IA'],
    url: 'https://inematds.github.io/triad',
  },
  {
    id: 120,
    title: 'Understand Anything',
    description:
      'Análise de código com LLM + dashboards interativos. Knowledge graphs, plugins para Claude Code, Cursor e Copilot. 3 trilhas, ~6h.',
    icon: '🔍',
    tags: ['Análise', 'Código', 'LLM', 'Dashboard', 'Claude Code', 'IA'],
    url: 'https://inematds.github.io/u-any/curso/',
  },
  {
    id: 109,
    title: 'Vendendo AIOS 2026',
    description:
      'Como vender Sistemas Operacionais de IA como serviço. 6 trilhas, 22 módulos, ~16.5h. Da primeira hora cobrada ao SaaS.',
    icon: '💰',
    tags: ['Vendas', 'AIOS', 'Consultoria', 'Negócios', 'SaaS', 'IA'],
    url: 'https://inematds.github.io/vendasaios/',
  },
  {
    id: 41,
    title: 'Vibe Coding - Da Ideia ao Produto',
    description:
      'Vibe Coding: Da Ideia ao Produto - Aprenda a construir software usando linguagem natural com IA. Método com 4 trilhas para leigos, executivos e técnicos com 31 módulos e 217 tópicos.',
    icon: '⚡',
    tags: ['Vibe Coding', 'IA', 'Programação', 'Low-Code', 'Empreendedorismo'],
    url: 'https://inematds.github.io/vibecode',
  },
  {
    id: 172,
    title: 'Vibe Coding: Domínio Completo',
    description:
      'Curso completo reorganizado por abordagem: fundamentos & glossário, técnica (CLAUDE.md, framework WAT, MCP, RAG), biblioteca de prompts copy-run, skills & agentes, projetos end-to-end e produção/deploy. 6 trilhas, 21 módulos, ~150 tópicos.',
    icon: '🧭',
    tags: ['Vibe Coding', 'Claude Code', 'Agentes', 'MCP', 'n8n', 'IA'],
    url: 'https://inematds.github.io/vibe-coding-completo/',
  },
  {
    id: 48,
    title: 'Vibe Coding Imersão - Do Zero ao SaaS',
    description:
      'Imersão intensiva de 3 dias: do zero ao SaaS com IA. 6 trilhas e 36 tópicos cobrindo arquitetura, agentes inteligentes, MCP, multi-bots, billing e deploy em produção.',
    icon: '🚀',
    tags: ['Vibe Coding', 'SaaS', 'IA', 'Agentes', 'Imersão'],
    url: 'https://inematds.github.io/vibecode-imersao/',
  },
  {
    id: 173,
    title: 'Vibe Coding na Prática',
    description:
      'Construa automações e agentes de IA conversando — do primeiro workflow ao app no ar. 4 trilhas, 10 módulos: fundamentos, domínio do agente de código, hospedagem & deploy e construção de frontends.',
    icon: '⚡',
    tags: ['Vibe Coding', 'Claude Code', 'n8n', 'Agentes', 'IA'],
    url: 'https://inematds.github.io/vibe-coding/',
  },
  {
    id: 195,
    title: 'videos-edit — Forja Reel: monte seu editor de reels com IA',
    description:
      'Forja Reel: meta-skill que transforma um vídeo bruto (cortes, silêncios e erros) num reel profissional — corte limpo, motion graphics, B-roll real, legendas e SFX — sem abrir um editor de vídeo. Em vez de um editor pronto, ela te entrevista e gera o SEU próprio editor. Curso em 4 trilhas + a skill pronta para baixar.',
    icon: '🎬',
    tags: ['Vídeo', 'Reels', 'Edição', 'Claude Code', 'IA'],
    url: 'https://inematds.github.io/videos-edit/',
  },
  {
    id: 135,
    title: 'Vídeo Demonstrativo — Walkthroughs de app com Claude Code',
    description:
      'Curso completo da Skill video-demonstrativo: gere vídeos de demonstração (walkthrough) de uma aplicação web a partir do link do app. O Claude Code navega o app de verdade com um navegador automatizado, captura as telas reais passo a passo e monta um vídeo narrado com moldura de navegador, cursor animado, zoom e narração local (Kokoro) — tudo na máquina, sem chave de API. 3 trilhas, 10 módulos, com a Skill incluída para download.',
    icon: '🖱️',
    tags: ['Claude Code', 'Skills', 'Vídeo', 'HyperFrames', 'Playwright', 'IA'],
    url: 'https://inematds.github.io/skill-video-demonstrativo/',
  },
  {
    id: 142,
    title: 'video-plan-editor — Plano de Edição de Vídeo',
    description:
      'Skill (Claude Code) + pacote Python (vpe) que transforma um assunto ou link num plano profissional de edição de vídeo — JSON estruturado e renderer-agnóstico (plano-edicao.json + RESUMO.md). Detecta o input, escolhe um de 5 presets (acao/suave/promo/vendas/viral) e valida guardrails. Render opcional via HyperFrames + b-roll flux2-klein, local e sem chave de API.',
    icon: '🎞️',
    tags: ['Vídeo', 'Edição', 'Python', 'Plano', 'IA', 'Skill'],
    url: 'https://inematds.github.io/skill-video-plan-editor/',
  },
  {
    id: 143,
    title: 'videoprodutor — O Produtor de Vídeo Profissional',
    description:
      'Skill (Claude Code) que orquestra link/fonte → plano + execução de um vídeo profissional (propaganda ou explicativo), ponta a ponta. Coordena as peças que já existem (plano, direção, imagem, voz, render) numa linha de montagem única, em 3 camadas (cinema + texto cinético + ilustração). Saída 16:9 e 9:16, dark premium, tudo local; imagem flux2-klein com fallback SVG automático.',
    icon: '🏭',
    tags: ['Vídeo', 'Orquestrador', 'Render', 'HyperFrames', 'IA', 'Skill'],
    url: 'https://inematds.github.io/skill-videoprodutor/',
  },
  {
    id: 148,
    title: 'videos-cursos-inema — Cursos viram vídeos narrados',
    description:
      'Motor que transforma um curso INEMA (site estático, ex.: FEP) numa série de vídeos narrados e animados — HTML→MP4 via HyperFrames, dark premium âmbar. Três níveis: Landing (visão geral), Trilhas (módulos/tópicos) e Conteúdo completo (aula profunda por módulo, ilustrada com SVG). Timing vindo do áudio, narração local (inemavox bella/rachel), 16:9 e 9:16, CTA INEMA.CLUB.',
    icon: '🎬',
    tags: ['Vídeo', 'Cursos', 'HyperFrames', 'TTS', 'Render', 'INEMA'],
    url: 'https://inematds.github.io/videos-cursos-inema/',
  },
  {
    id: 34,
    title: 'VISION',
    description:
      'Plataforma VISION - Visão computacional e processamento de imagens com IA.',
    icon: '👁️',
    tags: ['Visão', 'IA', 'Imagens'],
    url: 'https://inematds.github.io/VISION/',
  },
  {
    id: 35,
    title: 'VisionPro - Construção Audiovisual com IA',
    description:
      'Método Prático de Construção Audiovisual com IA - Crie conteúdo audiovisual profissional usando IA como colaborador criativo.',
    icon: '🎬',
    tags: ['Audiovisual', 'IA', 'Filmes', 'Curtas', 'Cinema'],
    url: 'https://inematds.github.io/VisionPro',
  },
  {
    id: 126,
    title: 'VLA — Vision Language Action para Robótica',
    description:
      'Curso profundo sobre IA Incorporada: modelos VLA (RT-2, OpenVLA, π0, Qwen-VLA, GR00T N1), frameworks (LeRobot, ROS2, MuJoCo, Isaac Sim), treinamento, sim-to-real, mercado $7.2B. 3 trilhas, 18 módulos, 50+ fontes.',
    icon: '🦾',
    tags: ['VLA', 'Robótica', 'LeRobot', 'ROS2', 'Humanoides', 'Sim-to-Real'],
    url: 'https://inematds.github.io/vla/',
  },
  {
    id: 127,
    title: 'VLA Mastery — Da Teoria aos Robôs que Agem',
    description:
      'Curso avançado de modelos Vision-Language-Action e IA Incorporada. Anatomia VLA, RT-1→π0, behavior cloning, diffusion policy e flow matching, tokenização FAST, LeRobot, MuJoCo/Isaac, ROS2, datasets (Open X-Embodiment, DROID, LIBERO), sim-to-real, humanoides (GR00T, Figure Helix, Optimus), arquiteturas híbridas e fronteira 2026-2030. 3 trilhas, 18 módulos, 108 tópicos, com diagramas SVG.',
    icon: '🦾',
    tags: ['VLA', 'Robótica', 'Diffusion Policy', 'LeRobot', 'Humanoides', 'Sim-to-Real'],
    url: 'https://inematds.github.io/vla-mastery/',
  },
  {
    id: 211,
    title: 'wacrm — CRM self-hostable para WhatsApp',
    description:
      'Template self-hostable de CRM para WhatsApp Business API — inbox compartilhada, contatos, pipelines de vendas, disparos e automações no-code. Fork it, brand it, host it: seu código, seu Supabase, seu domínio.',
    icon: '💬',
    tags: ['CRM', 'WhatsApp', 'Next.js', 'Supabase', 'Self-hosted'],
    url: 'https://inematds.github.io/wacrm/guia/',
  },
  {
    id: 215,
    title: 'War Game Prompt — planeje qualquer build como um war game',
    description:
      'Prompt reutilizável (EN + PT-BR) que transforma o planejamento de um build de IA num war game: fases com suposição otimista/pessimista, modos de falha, critérios de saída verificáveis e uma tabela mestre de riscos. Inclui dois dossiês de exemplo gerados a partir do prompt.',
    icon: '⚔️',
    tags: ['Prompt Engineering', 'Planejamento', 'IA'],
    url: 'https://inematds.github.io/promptwargame/guia/',
  },
  {
    id: 36,
    title: 'WebP - Designer 2026',
    description:
      'Web Presence na Era da IA - Aprenda a linguagem visual que as IAs entendem. Domine princípios de design para orientar IAs generativas.',
    icon: '🎨',
    tags: ['Design', 'IA', 'Web', 'UI/UX', '2026'],
    url: 'https://inematds.github.io/webp',
  },
  {
    id: 108,
    title: 'WhatsApp Username & BSUID',
    description:
      'Privacidade e identidade no WhatsApp. 3 trilhas, 9 módulos, ~5h. Username, BSUID, Cloud API, CRM, compliance.',
    icon: '📱',
    tags: ['WhatsApp', 'BSUID', 'Username', 'Privacidade', 'API', 'Empresas'],
    url: 'https://inematds.github.io/whatsapp-bsuid/',
  },
  {
    id: 178,
    title: 'Transição para o Claude Code',
    description:
      'De zero a produtivo em 12 semanas. 5 trilhas, 30 módulos, 180 tópicos. CLI, Plan/Loop, MCP Servers, Subagentes, Git, Python e Ship.',
    icon: '🤖',
    tags: ['Claude Code', 'CLI', 'MCP', 'Agentes', 'Python', 'Git', 'IA', '2026'],
    url: 'https://inematds.github.io/claude-code-curso/',
  },
  {
    id: 197,
    title: "PHA 2030 — Potencial Humano Aumentado",
    description: "PHA 2030 — Potencial Humano Aumentado: curso completo em HTML com 6 trilhas de conteúdo.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/pha2030/",
  },
  {
    id: 198,
    title: "Profissional 2027 — Implementador de IA para PMEs",
    description: "Curso gratuito de Implementador de Soluções de IA para PMEs brasileiras — método DPIA em 4 trilhas e módulos completos.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/profissional2027/",
  },
  {
    id: 199,
    title: "MCP — Model Context Protocol do Zero",
    description: "Curso INEMA sobre Model Context Protocol — do zero à construção de servidores, organizado em 5 trilhas.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/MCP/",
  },
  {
    id: 200,
    title: "INTELECTO 4D — Workshop do Zero ao Jarvis",
    description: "Landpage promocional do workshop INTELECTO (2 dias, do zero ao seu Jarvis).",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/intelecto4d/",
  },
  {
    id: 201,
    title: "HyperFrames — Vídeos Explicativos com Claude Code",
    description: "Curso HyperFrames (formato INEMA.CLUB): criar vídeos explicativos HTML→MP4 com Claude Code e a Skill video-explicativo.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/skill-hyperframes-videos/",
  },
  {
    id: 202,
    title: "INEMA.NCIA — Leitura Editorial",
    description: "Curso de leitura editorial (formato-curso v3) com 6 trilhas e 27 seções, adaptado do canal de Telegram INEMA.NCIA.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://inematds.github.io/inemancia/",
  },
  {
    id: 203,
    title: "Skills CLI — do Zero ao Expert em Agent Skills",
    description: "Curso completo Skills CLI - do zero ao expert em agent skills.",
    icon: "🎓",
    tags: ["Curso", "IA", "2026"],
    url: "https://github.com/inematds/skills-curso",
  },
]

export const updatesData: Update[] = [
  { date: '2026-07-13', title: 'Construa seu AI OS — Assistente de IA pessoal sem programar (9 aulas, formato v5)', type: 'novo', url: 'https://inematds.github.io/builaios/' },
  { date: '2026-07-13', title: 'Claude Code para Pessoas Normais — do zero ao AI Native (10 módulos, formato v5)', type: 'novo', url: 'https://inematds.github.io/cccompletopn/' },
  { date: '2026-07-11', title: 'Lives 2026 — 7 vídeos estratégicos de serviços de IA (16:9 + 9:16)', type: 'novo', url: 'https://inematds.github.io/lives2/' },
  { date: '2026-07-11', title: 'Como Montar um Negócio de Serviços de IA — 8 aulas, sem programar (formato v5)', type: 'novo', url: 'https://inematds.github.io/evai2026/curso-e-live/curso/' },
  { date: '2026-07-07', title: 'Agentes: o Novo Office — Profissional Liberal (aula 0 + 8 módulos, formato v5)', type: 'novo', url: 'https://inematds.github.io/agentes-office/curso/liberal/' },
  { date: '2026-07-07', title: 'Agentes: o Novo Office — Formação por Perfil', type: 'novo', url: 'https://inematds.github.io/agentes-office/' },
  { date: '2026-07-06', title: 'SSH e Chaves SSH — Acesse sua VPS sem Depender de Suporte (9 aulas)', type: 'novo', url: 'https://inematds.github.io/ssh-basico/' },
  { date: '2026-07-06', title: 'Segunda Opinião — IA para Gestores e Líderes (5 aulas)', type: 'novo', url: 'https://inematds.github.io/segunda-opiniao/' },
  { date: '2026-07-04', title: 'Automação & Hooks no Claude Code (Trilha 03, 5 aulas)', type: 'novo', url: 'https://inematds.github.io/cchooks/' },
  { date: '2026-07-03', title: 'cccache — Prompt Caching no Claude Code (3 trilhas, 8 módulos)', type: 'novo', url: 'https://inematds.github.io/cccache/' },
  { date: '2026-07-02', title: 'videos-edit — Forja Reel: monte seu editor de reels com IA (curso + skill, 4 trilhas)', type: 'novo', url: 'https://inematds.github.io/videos-edit/' },
  { date: '2026-07-02', title: 'Profissional Liberal Experiente com IA — 5 trilhas, 15 módulos, 90 tópicos', type: 'novo', url: 'https://inematds.github.io/pro-liberal-ia/' },
  { date: '2026-07-02', title: 'Prompting Claude Fable 5 — 2 Trilhas, 14 Módulos (Trilha 2: agente de trabalho)', type: 'atualizado', url: 'https://inematds.github.io/fable5back/' },
  { date: '2026-07-01', title: 'Prompting Claude Fable 5 — 6 Técnicas + Bônus Oficial (1 trilha, 7 módulos, 42 tópicos)', type: 'novo', url: 'https://inematds.github.io/fable5back/' },
  { date: '2026-07-01', title: 'Mente, Poder e Máquina — Neurociência, Vieses e Comportamento (6 trilhas, 18 módulos, 108 tópicos)', type: 'novo', url: 'https://inematds.github.io/neurociencia-comportamento/' },
  { date: '2026-06-30', title: 'HealthOS — Coach de Saúde Pessoal com IA (3 trilhas, 12 módulos, 84 tópicos)', type: 'novo', url: 'https://inematds.github.io/healthos/' },
  { date: '2026-06-29', title: 'STORM Research — Pesquisa Multi-Perspectiva Verificada com Claude (3 trilhas, 11 módulos, 66 tópicos)', type: 'novo', url: 'https://inematds.github.io/storm-research/' },
  { date: '2026-06-29', title: 'Segundo Cérebro pro Claude Code — Graphify + Obsidian (3 trilhas, 14 módulos, 84 tópicos)', type: 'novo', url: 'https://inematds.github.io/segundo-cerebro/' },
  { date: '2026-06-29', title: 'Engenharia de Sistemas Operacionais de IA (AIOS) — do zero ao OS vivo (5 trilhas, 21 módulos, 155 tópicos)', type: 'novo', url: 'https://inematds.github.io/oscoach/' },
  { date: '2026-06-29', title: 'IA Local Masterclass — IA na sua máquina: soberania, privacidade e agentes 24/7 (4 trilhas, 20 módulos, 120 tópicos)', type: 'novo', url: 'https://inematds.github.io/local-ai-masterclass/' },
  { date: '2026-06-29', title: 'Alerta IA 2028 — curso + explainer sobre auto-aperfeiçoamento recursivo (RSI) da IA', type: 'novo', url: 'https://inematds.github.io/ia2028alerta/' },
  { date: '2026-06-23', title: '10 Cara Design — Character Design Styles (10 prompts para Nano Banana 2)', type: 'novo', url: 'https://inematds.github.io/10cara-design/' },
  { date: '2026-06-23', title: 'AI Filmmaking — Parte 1 (pensar como diretor antes de gerar)', type: 'novo', url: 'https://inematds.github.io/ai-filmaking-p1/' },
  { date: '2026-06-23', title: 'Anúncios Virais com IA — desconstruir e recriar anúncios que vendem', type: 'novo', url: 'https://inematds.github.io/viralads/' },
  { date: '2026-06-23', title: 'iAmasters OS — sistema operativo agêntico para operadores de IA', type: 'novo', url: 'https://inematds.github.io/iamasters-os/' },
  { date: '2026-06-23', title: 'videoprodutor — orquestrador link → vídeo profissional (3 camadas)', type: 'novo', url: 'https://inematds.github.io/videoprodutor/' },
  { date: '2026-06-23', title: 'mcp-video — servidor MCP de edição de vídeo com guardrails (119 ferramentas)', type: 'novo', url: 'https://inematds.github.io/mcp-video/' },
  { date: '2026-06-25', title: 'inemaupsk — upscaling 4x com 4 modelos ESRGAN, API HTTP e UI web', type: 'novo', url: 'https://inematds.github.io/inemaupsk/' },
  { date: '2026-06-23', title: 'LLMs Orquestradas — Multi-LLM, Fugu Ultra e OpenRouter Fusion (3 trilhas, 6 módulos)', type: 'novo', url: 'https://inematds.github.io/sakanafugu/' },
  { date: '2026-06-22', title: 'Jarvis — Seu Sistema Operacional de IA (6 trilhas, 21 módulos, 126 tópicos)', type: 'novo', url: 'https://inematds.github.io/jarvis/' },
  { date: '2026-06-22', title: 'Grill Me — Extraia o que está na sua cabeça (4 trilhas, INEMA v2)', type: 'novo', url: 'https://inematds.github.io/grillme/' },
  { date: '2026-06-22', title: 'O Mundo Após o Claude — de usuário a maestro (Trilha 1: Fundamentos)', type: 'novo', url: 'https://inematds.github.io/mundo-apos-claude/' },
  { date: '2026-06-22', title: 'Transição para o Claude Code — 5 trilhas, 30 módulos (INEMA v2)', type: 'novo', url: 'https://inematds.github.io/claude-code-curso/' },
  { date: '2026-06-22', title: '33 Viral Hooks — 165 hooks (5 nichos × 33) com imagens', type: 'novo', url: 'https://inematds.github.io/33viralhooks/' },
  { date: '2026-06-21', title: 'INEMA.NCIA — Habilidades Humanas na Era da IA', type: 'novo', url: 'https://inematds.github.io/inemancia2/' },
  { date: '2026-06-21', title: 'Agente Hermes + Ollama — Seu SO de IA 100% Privado', type: 'novo', url: 'https://inematds.github.io/agente-hermes-local/' },
  { date: '2026-06-21', title: 'O Caminho Certo da IA — Qualificação real, sem hype e sem medo', type: 'novo', url: 'https://inematds.github.io/caminho-certo-da-ia/' },
  { date: '2026-06-20', title: 'Vibe Coding na Prática — 4 trilhas, 10 módulos', type: 'novo', url: 'https://inematds.github.io/vibe-coding/' },
  { date: '2026-06-20', title: 'Vibe Coding: Domínio Completo — 6 trilhas, 21 módulos', type: 'novo', url: 'https://inematds.github.io/vibe-coding-completo/' },
  { date: '2026-06-20', title: 'Cérebro INEMA — Segundo Cérebro com 3 Cérebros', type: 'novo', url: 'https://inematds.github.io/cerebro-inema/' },
  { date: '2026-06-19', title: 'Loop Engineering — Sistemas com IA no Loop', type: 'novo', url: 'https://inematds.github.io/loop-engineering/' },
  { date: '2026-06-19', title: 'Loop Agentes v2 — Engenharia de Loops', type: 'novo', url: 'https://inematds.github.io/loop-agentes-v2/' },
  { date: '2026-06-19', title: 'HARNESS — Engenharia Agêntica de Matt Pocock', type: 'novo', url: 'https://inematds.github.io/hardnessai/' },
  { date: '2026-06-18', title: 'CLI Printing Press — Imprima CLIs Perfeitas para Agentes', type: 'novo', url: 'https://github.com/mvanhorn/cli-printing-press' },
  { date: '2026-06-17', title: 'claude-watch — Dê ao Claude a capacidade de assistir vídeo', type: 'novo', url: 'https://inematds.github.io/claude-watch/' },
  { date: '2026-06-17', title: 'Cultura de Inovação — Da Teoria à Prática', type: 'novo', url: 'https://inematds.github.io/cultura-inovacao/' },
  { date: '2026-06-17', title: 'Do Zero ao Deploy — Da Primeira Linha no Terminal ao Assistente IA', type: 'novo', url: 'https://inematds.github.io/do-zero-ao-deploy/' },
  { date: '2026-06-16', title: 'Claude Code Básico — Curso Completo', type: 'novo', url: 'https://inematds.github.io/ccodebasico/' },
  { date: '2026-06-16', title: 'Codex Básico — Curso Completo do Codex CLI', type: 'novo', url: 'https://inematds.github.io/codexbasico/' },
  { date: '2026-06-15', title: 'Integra sua Profissão com IA — 3 Trilhas e as 6 Habilidades', type: 'novo', url: 'https://inematds.github.io/profissionalai/' },
  { date: '2026-06-15', title: 'Arquitetura de Intenção da IA — Curso Completo (Método JARVIS)', type: 'novo', url: 'https://inematds.github.io/arquitetura-de-intencao-da-ia/' },
  { date: '2026-06-15', title: 'Arquitetura de Intenção — Imersão Intensiva (3 dias)', type: 'novo', url: 'https://inematds.github.io/arquitetura-de-intencao/' },
  { date: '2026-06-15', title: 'Fable Lite — Garimpando o Raciocínio dos Modelos', type: 'novo', url: 'https://inematds.github.io/fablelite/' },
  { date: '2026-06-15', title: 'Claude Code na Prática — do Zero ao Produto', type: 'novo', url: 'https://inematds.github.io/claude-code-na-pratica/' },
  { date: '2026-06-15', title: 'AntiGravity — do Zero ao App Publicado com IA', type: 'novo', url: 'https://inematds.github.io/antigravity/' },
  { date: '2026-06-15', title: 'Claude Skills na Prática — Construa Agent Skills do Claude Code', type: 'novo', url: 'https://inematds.github.io/claude-skills/' },
  { date: '2026-06-14', title: 'Prompts Prontos — 13 System Prompts Copiáveis', type: 'novo', url: 'https://inematds.github.io/prompts-prontos/' },
  { date: '2026-06-14', title: 'O Manual Oculto da IA — do fundamento ao cérebro do Fable', type: 'novo', url: 'https://inematds.github.io/manual-oculto-ia/' },
  { date: '2026-06-14', title: 'Fábrica de Estratégia de IA — Vire Consultor de IA', type: 'novo', url: 'https://inematds.github.io/aiestrategia/' },
  { date: '2026-06-14', title: 'AI Strategy Factory — Estratégia de IA Completa para Qualquer Empresa', type: 'novo', url: 'https://inematds.github.io/AI-CONSULT/' },
  { date: '2026-06-13', title: 'Subagentes — Especialistas do Claude Code', type: 'novo', url: 'https://inematds.github.io/subagentes/' },
  { date: '2026-06-11', title: 'Padrões de System Prompts — Anatomia, Catálogo e Evolução', type: 'novo', url: 'https://inematds.github.io/system_prompts_leaks/' },
  { date: '2026-06-11', title: 'videos-cursos-inema — Cursos viram vídeos narrados', type: 'novo', url: 'https://inematds.github.io/videos-cursos-inema/' },
  { date: '2026-06-11', title: 'Diretor de Animação — Imagens + Narração viram Filme', type: 'novo', url: 'https://inematds.github.io/diretor-animacao/' },
  { date: '2026-06-11', title: 'Pirâmide da IA — Engenharia de Conhecimento da IA', type: 'novo', url: 'https://inematds.github.io/aiengenharia/' },
  { date: '2026-06-10', title: 'inemaref — Foto vira história em quadrinhos', type: 'novo', url: 'https://inematds.github.io/inemaref/' },
  { date: '2026-06-09', title: 'PixFlow — Imagens estáticas viram filme', type: 'novo', url: 'https://inematds.github.io/pixflow/' },
  { date: '2026-06-09', title: 'videoprodutor — O Produtor de Vídeo Profissional', type: 'novo', url: 'https://inematds.github.io/skill-videoprodutor/' },
  { date: '2026-06-09', title: 'video-plan-editor — Plano de Edição de Vídeo', type: 'novo', url: 'https://inematds.github.io/skill-video-plan-editor/' },
  { date: '2026-06-09', title: 'MDD — Mestre de Direção Dinâmica', type: 'novo', url: 'https://inematds.github.io/mdd/' },
  { date: '2026-06-08', title: 'AI FILMMAKING — Do Conceito ao Filme Final', type: 'novo', url: 'https://inematds.github.io/aifilmmaking/' },
  { date: '2026-06-07', title: 'Claude Code × Remotion - Motion Graphics com Código', type: 'novo', url: 'https://inematds.github.io/claude-remotion-motion/' },
  { date: '2026-06-06', title: 'Remotion - Vídeo Programático com React', type: 'novo', url: 'https://inematds.github.io/remotion-templates/' },
  { date: '2026-06-04', title: 'mkivideos — Fila de Vídeos com IA', type: 'novo', url: 'https://inematds.github.io/mkivideos/' },
  { date: '2026-06-04', title: 'Claude Code Tier S — os 12 recursos que mudam seu dia', type: 'novo', url: 'https://inematds.github.io/cctop12/' },
  { date: '2026-06-03', title: 'Vídeo Demonstrativo — Walkthroughs de app com Claude Code', type: 'novo', url: 'https://inematds.github.io/skill-video-demonstrativo/' },
  { date: '2026-06-02', title: 'Formação em Automação Estratégica com IA', type: 'novo', url: 'https://inematds.github.io/fae-ai/' },
  { date: '2026-06-01', title: 'AIS-OS — Seu AI Operating System no Claude Code', type: 'novo', url: 'https://inematds.github.io/ais-os/' },
  { date: '2026-06-01', title: 'Criando Agent Skills — Do Catálogo à Sua Primeira Skill', type: 'novo', url: 'https://inematds.github.io/skills-craft/' },
  { date: '2026-06-01', title: 'Claude Code — Do Zero ao Projeto', type: 'novo', url: 'https://inematds.github.io/jccode23/' },
  { date: '2026-06-01', title: 'Skill Design — Arsenal de Skills pra Melhorar Páginas', type: 'novo', url: 'https://inematds.github.io/skill-design/' },
  { date: '2026-06-01', title: 'HyperFrames — Vídeos Explicativos com Claude Code', type: 'novo', url: 'https://inematds.github.io/skill-video-explicativo/' },
  {
    date: '2026-06-01',
    title: 'Formação em IA Incorporada (VLA) — A Escola da Robótica Inteligente',
    type: 'novo',
    url: 'https://inematds.github.io/vla-formacao/',
  },
  {
    date: '2026-06-01',
    title: 'VLA Mastery — Da Teoria aos Robôs que Agem',
    type: 'novo',
    url: 'https://inematds.github.io/vla-mastery/',
  },
  {
    date: '2026-06-01',
    title: 'VLA — Vision Language Action para Robótica',
    type: 'novo',
    url: 'https://inematds.github.io/vla/',
  },
  {
    date: '2026-06-01',
    title: 'Consultor de IA — Do Rótulo ao Resultado',
    type: 'novo',
    url: 'https://inematds.github.io/consultoria2k/',
  },
  {
    date: '2026-06-01',
    title: 'Hermes 21C — Todos os Conceitos do Hermes',
    type: 'novo',
    url: 'https://inematds.github.io/hermes21c/',
  },
  {
    date: '2026-06-01',
    title: 'segROBOT — Requalificação Humana para Ambientes Robotizados',
    type: 'novo',
    url: 'https://inematds.github.io/segrobot/',
  },
  {
    date: '2026-05-30',
    title: 'Dominando o Opus 4.8',
    type: 'novo',
    url: 'https://inematds.github.io/opus48/curso/',
  },
  {
    date: '2026-05-26',
    title: 'Agentic Básico',
    type: 'novo',
    url: 'https://inematds.github.io/agenticbasico/',
  },
  {
    date: '2026-05-26',
    title: 'Understand Anything',
    type: 'novo',
    url: 'https://inematds.github.io/u-any/curso/',
  },
  {
    date: '2026-05-25',
    title: 'OpenHuman Mastery',
    type: 'novo',
    url: 'https://inematds.github.io/openhuman/',
  },
  {
    date: '2026-05-25',
    title: 'Karpathy Guidelines',
    type: 'novo',
    url: 'https://inematds.github.io/akarpathy-skill/curso-pt/',
  },
  {
    date: '2026-05-25',
    title: 'Skills For Real Engineers',
    type: 'novo',
    url: 'https://inematds.github.io/mp-skill/curso-skills/',
  },
  {
    date: '2026-05-25',
    title: 'mkbook — Seu livro em 30 dias com Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/mkbook/',
  },
  {
    date: '2026-05-25',
    title: 'MkBlogs — Publicação Multi-Plataforma',
    type: 'novo',
    url: 'https://inematds.github.io/mkblogs/',
  },
  {
    date: '2026-05-25',
    title: 'AIOS — AI Agent Operating System',
    type: 'novo',
    url: 'https://inematds.github.io/aiosagi/',
  },
  {
    date: '2026-05-25',
    title: 'Hermes Agent — Curso Completo Avançado',
    type: 'novo',
    url: 'https://inematds.github.io/hermesagent/',
  },
  {
    date: '2026-05-24',
    title: 'Profissional 2027 — Implementadores de IA para PMEs',
    type: 'novo',
    url: 'https://inematds.github.io/profissional2027x',
  },
  {
    date: '2026-05-24',
    title: 'PolySkills — Claude Code & Codex lado a lado',
    type: 'novo',
    url: 'https://inematds.github.io/polyskills',
  },
  {
    date: '2026-05-24',
    title: 'Mapa do Cliente — Formação DICA',
    type: 'novo',
    url: 'https://inematds.github.io/mapacliente/',
  },
  {
    date: '2026-05-22',
    title: 'Vendendo AIOS 2026',
    type: 'novo',
    url: 'https://inematds.github.io/vendasaios/',
  },
  {
    date: '2026-05-21',
    title: 'WhatsApp Username & BSUID',
    type: 'novo',
    url: 'https://inematds.github.io/whatsapp-bsuid/',
  },
  {
    date: '2026-05-19',
    title: 'Claude Cowork - Guia Completo',
    type: 'novo',
    url: 'https://inematds.github.io/cccoworkfull/',
  },
  {
    date: '2026-05-18',
    title: 'Ensinando Claude Cowork - Playbook Treinadores',
    type: 'novo',
    url: 'https://inematds.github.io/cccoworkexec/',
  },
  {
    date: '2026-05-18',
    title: 'Claude Cowork - Equipe de Marketing',
    type: 'novo',
    url: 'https://inematds.github.io/cccowork/',
  },
  {
    date: '2026-05-18',
    title: 'Hermes + NotebookLM - Agente AI Definitivo',
    type: 'novo',
    url: 'https://inematds.github.io/hnotebooklm',
  },
  {
    date: '2026-05-18',
    title: 'New Agentic OS - Do Executivo ao Jarvis Multi-Cliente',
    type: 'novo',
    url: 'https://inematds.github.io/newagenticos/',
  },
  {
    date: '2026-05-18',
    title: 'CCXCX - Claude e Codex Tool-Agnostic',
    type: 'novo',
    url: 'https://inematds.github.io/ccxcx',
  },
  {
    date: '2026-05-17',
    title: 'iAmasters OS - Sistema Operativo Agêntico',
    type: 'novo',
    url: 'https://inematds.github.io/curso-iamasters-os/',
  },
  {
    date: '2026-05-17',
    title: 'CAIO - Chief AI Officer 2030',
    type: 'novo',
    url: 'https://inematds.github.io/caio/',
  },
  {
    date: '2026-05-17',
    title: 'Prompt Director - Imagens e Cinema com IA',
    type: 'novo',
    url: 'https://inematds.github.io/promptfilmes/',
  },
  {
    date: '2026-05-17',
    title: 'TRIAD - Automação de IA Multi-Modelo com Hermes e DeepSeek',
    type: 'novo',
    url: 'https://inematds.github.io/triad',
  },
  {
    date: '2026-05-14',
    title: 'Engenharia de Dados com IA',
    type: 'novo',
    url: 'https://inematds.github.io/engdadosai',
  },
  {
    date: '2026-05-14',
    title: 'Skills Premium - Do Iniciante ao Expert',
    type: 'novo',
    url: 'https://inematds.github.io/skills-premium/',
  },
  {
    date: '2026-05-13',
    title: 'Printing Press - CLI para Agentes de IA',
    type: 'novo',
    url: 'https://inematds.github.io/pp-cli/',
  },
  {
    date: '2026-05-12',
    title: 'TimesMarketing 3 - Automação de Conteúdo com IA',
    type: 'novo',
    url: 'https://github.com/inematds/timesmkt3',
  },
  {
    date: '2026-05-12',
    title: '5 Níveis do Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/5niveiscc/',
  },
  {
    date: '2026-05-11',
    title: 'CAIP - Certified AI Professional',
    type: 'novo',
    url: 'https://inematds.github.io/prof2031CAIP',
  },
  {
    date: '2026-05-10',
    title: 'Agentic OS - O Sistema Operacional do Trabalho com IA',
    type: 'novo',
    url: 'https://inematds.github.io/agenticos/',
  },
  {
    date: '2026-05-10',
    title: 'Agente Hermes - Assistente IA Self-Hosted',
    type: 'novo',
    url: 'https://inematds.github.io/agentehermes',
  },
  {
    date: '2026-05-08',
    title: 'Prof2030 - O Profissional do Futuro',
    type: 'novo',
    url: 'https://inematds.github.io/prof2030/',
  },
  {
    date: '2026-05-03',
    title: 'Power Design - Os 20 Princípios',
    type: 'novo',
    url: 'https://inematds.github.io/power-design/',
  },
  {
    date: '2026-05-03',
    title: 'FEC - Formação de Engenharia de Contexto',
    type: 'novo',
    url: 'https://inematds.github.io/FEC/',
  },
  {
    date: '2026-05-03',
    title: 'Multiagentes - Equipes de Agentes na Prática',
    type: 'novo',
    url: 'https://inematds.github.io/multiagentes/',
  },
  {
    date: '2026-05-02',
    title: 'AgenteJAX - Construa seu Agente de IA Pessoal',
    type: 'novo',
    url: 'https://inematds.github.io/agentejax/',
  },
  {
    date: '2026-05-02',
    title: 'Mentes Brilhantes - A Fórmula 1-20-79',
    type: 'novo',
    url: 'https://inematds.github.io/mentesbrilhantes1/',
  },
  {
    date: '2026-05-02',
    title: 'Curso Open Design - Alternativa Open-Source ao Claude Design',
    type: 'novo',
    url: 'https://inematds.github.io/curso-od/',
  },
  {
    date: '2026-05-01',
    title: 'DeepClaudeX - Multi-Modelo 70/20/10',
    type: 'novo',
    url: 'https://inematds.github.io/deepclaudex/',
  },
  {
    date: '2026-05-01',
    title: 'Master Codex - A Fábrica de SaaS com Agentes de IA',
    type: 'novo',
    url: 'https://inematds.github.io/mastercodex/',
  },
  {
    date: '2026-05-01',
    title: 'Ruflo - Orquestração de Agentes Multi-IA',
    type: 'novo',
    url: 'https://inematds.github.io/ruflo/',
  },
  {
    date: '2026-04-30',
    title: 'MakeClaudeX - Engenharia com Claude Code: Do Prompt ao Plugin',
    type: 'novo',
    url: 'https://inematds.github.io/makeclaudex/',
  },
  {
    date: '2026-04-28',
    title: 'iClaudeX - Planejamento Inteligente com Claude + Codex',
    type: 'novo',
    url: 'https://inematds.github.io/iclaudex/',
  },
  {
    date: '2026-04-28',
    title: 'SuperSkills Karpathy - Transforme Skills em Funcionários Digitais',
    type: 'novo',
    url: 'https://inematds.github.io/superskills-karpathy/',
  },
  {
    date: '2026-04-28',
    title: 'Docker OpenClaw - Assistente IA Autônomo e Multi-Canal',
    type: 'novo',
    url: 'https://inematds.github.io/docker-openclaw/',
  },
  {
    date: '2026-04-28',
    title: 'CCOpen - Claude Code de Graça ou por Quase Nada',
    type: 'novo',
    url: 'https://inematds.github.io/ccopen/',
  },
  {
    date: '2026-04-28',
    title: 'INTELECTO Curso - Do Zero ao Expert em IA',
    type: 'novo',
    url: 'https://inematds.github.io/intelecto-curso/',
  },
  {
    date: '2026-04-28',
    title: 'Superpowers - Desenvolvimento com Agentes de IA',
    type: 'novo',
    url: 'https://inematds.github.io/superpowers/',
  },
  {
    date: '2026-04-28',
    title: 'CCFast32 - 32 Hacks do Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/ccfast32/',
  },
  {
    date: '2026-04-25',
    title: 'INTELECTO - Inteligência Pessoal sem Frameworks Inchados',
    type: 'novo',
    url: 'https://inematds.github.io/intelecto',
  },
  {
    date: '2026-04-23',
    title: 'CCMasterMemory - Memory Injection via Hooks',
    type: 'novo',
    url: 'https://inematds.github.io/ccmastermemory/',
  },
  {
    date: '2026-04-21',
    title: 'CCTop - Mestre em Contexto e Tokens',
    type: 'novo',
    url: 'https://inematds.github.io/cctop/',
  },
  {
    date: '2026-04-21',
    title: '6 Chapeus + Anti-Ancora',
    type: 'novo',
    url: 'https://inematds.github.io/6chapeus/',
  },
  {
    date: '2026-04-20',
    title: 'Opus 4.7 - Dominando o Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/opus47/',
  },
  {
    date: '2026-04-20',
    title: 'Claude Design - Zero ao Expert',
    type: 'novo',
    url: 'https://inematds.github.io/claudedesign/',
  },
  {
    date: '2026-04-19',
    title: 'Design + Video com IA (Hyperframes)',
    type: 'novo',
    url: 'https://inematds.github.io/cchyperframes/',
  },
  {
    date: '2026-04-13',
    title: 'DeerFlow 2.0 - Framework de Agentes ByteDance',
    type: 'novo',
    url: 'https://inematds.github.io/deerflow/',
  },
  {
    date: '2026-04-13',
    title: 'Seedance 2.0 Mastery - Video com IA',
    type: 'novo',
    url: 'https://inematds.github.io/seedance2/',
  },
  {
    date: '2026-04-12',
    title: 'IAMed - Medico IA-Native',
    type: 'novo',
    url: 'https://inematds.github.io/IAMed/',
  },
  {
    date: '2026-04-11',
    title: 'FPFilm - Crie Filmes com IA',
    type: 'novo',
    url: 'https://inematds.github.io/fpfilm1/',
  },
  {
    date: '2026-04-09',
    title: '2Cerebro - Segundo Cerebro com LLM + Obsidian',
    type: 'novo',
    url: 'https://inematds.github.io/2cerebro/',
  },
  {
    date: '2026-04-02',
    title: 'Claude Code Deep Dive',
    type: 'novo',
    url: 'https://inematds.github.io/claudecode-manual/',
  },
  {
    date: '2026-04-01',
    title: 'Por Dentro do Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/claudecode-estrutura/',
  },
  {
    date: '2026-03-27',
    title: '8020 - Vendas, Gestão e Estratégia Comercial',
    type: 'novo',
    url: 'https://inematds.github.io/8020',
  },
  {
    date: '2026-03-26',
    title: 'Hack do Algoritmo Meta 2026',
    type: 'novo',
    url: 'https://inematds.github.io/hack7meta',
  },
  {
    date: '2026-03-23',
    title: 'CLI-x - O Terminal como Interface dos Agentes',
    type: 'novo',
    url: 'https://inematds.github.io/CLI-x',
  },
  {
    date: '2026-03-23',
    title: 'CCA-Q1 - Claude Certified Architect Foundations',
    type: 'novo',
    url: 'https://inematds.github.io/cca-q1/',
  },
  {
    date: '2026-03-23',
    title: 'CCA-Q2 - Claude Certified Architect Interativo',
    type: 'novo',
    url: 'https://inematds.github.io/cca-q2',
  },
  {
    date: '2026-03-20',
    title: 'Arquitetura 2030 - Arquitetura de Software com IA',
    type: 'novo',
    url: 'https://inematds.github.io/arqdev2030',
  },
  {
    date: '2026-03-20',
    title: 'DEV2K6 - Engenharia de Software com IA Avançada',
    type: 'novo',
    url: 'https://inematds.github.io/dev2k6/',
  },
  {
    date: '2026-03-19',
    title: 'PHA 2030 - Da Capacitação à Transformação',
    type: 'novo',
    url: 'https://inematds.github.io/pha2030-aula',
  },
  {
    date: '2026-03-19',
    title: 'MiroFish - Ecossistema de Predição Multiagente',
    type: 'novo',
    url: 'https://inematds.github.io/mirofishcurso/',
  },
  {
    date: '2026-03-19',
    title: 'Enxames de Agentes de IA',
    type: 'novo',
    url: 'https://inematds.github.io/enxamesagentes/',
  },
  {
    date: '2026-03-19',
    title: 'Vibe Coding Imersão - Do Zero ao SaaS',
    type: 'novo',
    url: 'https://inematds.github.io/vibecode-imersao/',
  },
  {
    date: '2026-03-09',
    title: '6 Pilares do Claude Code - Completa',
    type: 'novo',
    url: 'https://inematds.github.io/6pilarccfull/',
  },
  {
    date: '2026-03-09',
    title: 'Imersao Vibe Coding',
    type: 'novo',
    url: 'https://inematds.github.io/vb-imersao/',
  },
  {
    date: '2026-03-08',
    title: 'Engenharia Agentic - Workflow',
    type: 'novo',
    url: 'https://inematds.github.io/agentic-workflow/',
  },
  {
    date: '2026-03-07',
    title: '6 Pilares do Claude Code',
    type: 'novo',
    url: 'https://inematds.github.io/6pilarccb/',
  },
  {
    date: '2026-03-03',
    title: 'Agentic Engineering Masterclass',
    type: 'novo',
    url: 'https://inematds.github.io/agentic/',
  },
  {
    date: '2026-03-03',
    title: 'Vibe Coding - Da Ideia ao Produto',
    type: 'novo',
    url: 'https://inematds.github.io/vibecode',
  },
  {
    date: '2026-02-24',
    title: 'NotebookLM - Do Zero ao Avançado',
    type: 'novo',
    url: 'https://inematds.github.io/notebooklm',
  },
  {
    date: '2026-02-04',
    title: 'Skills - Agent Skills Mastery',
    type: 'novo',
    url: 'https://inematds.github.io/skills',
  },
  {
    date: '2026-02-03',
    title: 'FEP2 - Prompt Engineering Masterclass',
    type: 'novo',
    url: 'https://inematds.github.io/FEP2/',
  },
  {
    date: '2026-01-31',
    title: 'CCGuide - Claude Code 2026',
    type: 'novo',
    url: 'https://inematds.github.io/ccguide2026',
  },
  {
    date: '2026-01-21',
    title: 'WebP - Designer 2026',
    type: 'novo',
    url: 'https://inematds.github.io/webp',
  },
  {
    date: '2026-01-21',
    title: 'AIWCF - Vibe Coding',
    type: 'novo',
    url: 'https://inematds.github.io/AIWCF',
  },
  {
    date: '2026-01-16',
    title: 'GIPM - Projetos com IA Governada',
    type: 'novo',
    url: 'https://inematds.github.io/GIPM/',
  },
  {
    date: '2026-01-15',
    title: 'VisionPro - Construção Audiovisual com IA',
    type: 'atualizado',
    url: 'https://inematds.github.io/VisionPro',
  },
  {
    date: '2026-01-14',
    title: 'VisionPro - Construção Audiovisual com IA',
    type: 'novo',
    url: 'https://inematds.github.io/VisionPro',
  },
  {
    date: '2026-01-13',
    title: 'FGMD - Gatilhos Mentais Digitais',
    type: 'novo',
    url: 'https://inematds.github.io/FGMD/',
  },
  {
    date: '2026-01-12',
    title: 'MAKE - Automações',
    type: 'novo',
    url: 'https://inematds.github.io/MAKE/',
  },
  {
    date: '2026-01-10',
    title: 'FEA-IA - Engenharia de Agentes',
    type: 'atualizado',
    url: 'https://inematds.github.io/FEA-IA/',
  },
  {
    date: '2026-01-08',
    title: 'N8Nb - Fundamentos N8N',
    type: 'atualizado',
    url: 'https://inematds.github.io/N8Nb',
  },
  {
    date: '2026-01-05',
    title: 'FEP - Engenharia de Prompts',
    type: 'atualizado',
    url: 'https://inematds.github.io/FEP/',
  },
  {
    date: '2026-01-03',
    title: 'Dashboard Mastery',
    type: 'atualizado',
    url: 'https://inematds.github.io/dash/',
  },
  {
    date: '2025-12-28',
    title: 'Playbook-IA - Formação de Consultoria IA',
    type: 'novo',
    url: 'https://inematds.github.io/Playbook-IA/',
  },
  {
    date: '2025-12-25',
    title: 'SHIA - Super Humanos Inteligência Ampliada',
    type: 'atualizado',
    url: 'https://inematds.github.io/SHIA/',
  },
  {
    date: '2025-12-20',
    title: 'FTH - Treinamento de Humanoides',
    type: 'novo',
    url: 'https://inematds.github.io/FTH/',
  },
  {
    date: '2025-12-18',
    title: 'HG1 - Academia dos Humanoides G1',
    type: 'atualizado',
    url: 'https://inematds.github.io/HG1',
  },
  {
    date: '2025-12-15',
    title: 'ATIA - Oportunidades Digitais com IA',
    type: 'atualizado',
    url: 'https://inematds.github.io/ATIA/',
  },
  {
    date: '2025-12-12',
    title: 'FIA2026',
    type: 'novo',
    url: 'https://inematds.github.io/FIA2026/',
  },
  {
    date: '2025-12-10',
    title: 'BMAD Academy',
    type: 'atualizado',
    url: 'https://inematds.github.io/BMAD-Academy/',
  },
  {
    date: '2025-12-08',
    title: 'SuperProf',
    type: 'novo',
    url: 'https://inematds.github.io/SuperProf/',
  },
  {
    date: '2025-12-05',
    title: 'TDS',
    type: 'atualizado',
    url: 'https://inematds.github.io/TDS/',
  },
  {
    date: '2025-12-01',
    title: 'NanoBanana - SuperCurso Nano Banana',
    type: 'novo',
    url: 'https://inematds.github.io/NanoBanana/',
  },
]
