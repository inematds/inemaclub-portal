// Dados dos cursos e plataformas INEMA
const platformsData = [
    {
        id: 122,
        title: "Dominando o Opus 4.8",
        description: "Raciocínio híbrido, 1M de contexto, controle de esforço e codificação de longo horizonte. 3 trilhas, 21 módulos, 24 exercícios, 30+ prompts. Baseado no relatório oficial com 25 claims validados.",
        icon: "🧠",
        tags: ["Opus", "Claude", "4.8", "Effort", "Workflows", "Coding"],
        url: "https://inematds.github.io/opus48/curso/"
    },
    {
        id: 121,
        title: "Agentic Básico",
        description: "Aprenda agentes de IA em 2 caminhos: Visual Quick (15 min) e Curso Completo (3h, 9 módulos). 5 pilares agênticos + Multi-Agent Arena no browser. Gratuito.",
        icon: "🤖",
        tags: ["Agentes", "IA", "Básico", "Multi-Agent", "Arena", "Gratuito"],
        url: "https://inematds.github.io/agenticbasico/"
    },
    {
        id: 120,
        title: "Understand Anything",
        description: "Análise de código com LLM + dashboards interativos. Static analysis, knowledge graphs, plugins para Claude Code, Cursor e Copilot. 3 trilhas, ~6 horas. Open-source.",
        icon: "🔍",
        tags: ["Análise", "Código", "LLM", "Dashboard", "Claude Code", "IA"],
        url: "https://inematds.github.io/u-any/curso/"
    },
    {
        id: 119,
        title: "OpenHuman Mastery",
        description: "Assistente IA para comunidades. Arquitetura local, multi-canal, memória, skills, contribuição open-source. 6 trilhas, 18 modulos, ~14.5 horas. Rust, React, Tauri v2.",
        icon: "🧬",
        tags: ["OpenHuman", "Assistente", "Comunidade", "Rust", "Tauri", "IA"],
        url: "https://inematds.github.io/openhuman/"
    },
    {
        id: 118,
        title: "Karpathy Guidelines — 4 Princípios para Código Limpo com LLM",
        description: "Baseado nas observações de Andrej Karpathy sobre falhas na programação com LLM. Think Before Coding, Simplicity First, Surgical Changes, Goal-Oriented. 1 trilha, 4 modulos, ~2 horas.",
        icon: "🧠",
        tags: ["Karpathy", "Claude Code", "CLAUDE.md", "Princípios", "LLM", "IA"],
        url: "https://inematds.github.io/akarpathy-skill/curso-pt/"
    },
    {
        id: 117,
        title: "Skills For Real Engineers",
        description: "Skills do Matt Pocock para Claude Code. Anatomia de SKILL.md, triggers, workflow, exemplos práticos (handoffs, code review, debugging). 1 trilha, Fundamentos de Skills.",
        icon: "🛠️",
        tags: ["Skills", "Claude Code", "Matt Pocock", "SKILL.md", "Workflow", "IA"],
        url: "https://inematds.github.io/mp-skill/curso-skills/"
    },
    {
        id: 116,
        title: "mkbook — Seu livro em 30 dias com Claude Code",
        description: "Escreva, publique e lance um livro em 30 dias usando Claude Code. 4 trilhas (Fundamentos, Escrita, Publicação, Lançamento), 16 modulos, ~12 horas. EPUB, PDF, MOBI para Amazon KDP.",
        icon: "📖",
        tags: ["Livro", "Claude Code", "Publicação", "KDP", "EPUB", "IA"],
        url: "https://inematds.github.io/mkbook/"
    },
    {
        id: 115,
        title: "MkBlogs — Publicação Multi-Plataforma",
        description: "Publicação em escala sem SaaS pago. Postiz self-hosted, conexão de redes sociais, blogs, deploy. 6 trilhas, 28 modulos, ~20 horas. Open-source ou construa do zero.",
        icon: "📝",
        tags: ["Publicação", "Blog", "Redes Sociais", "Open-Source", "Deploy", "IA"],
        url: "https://inematds.github.io/mkblogs/"
    },
    {
        id: 114,
        title: "AIOS — AI Agent Operating System",
        description: "Curso completo sobre AIOS (Rutgers AGI Research). Kernel, SDK Cerebrum, scheduler, memória, ferramentas, computer-use e MCP. 2 modulos, 12 topicos, ~1.5 horas.",
        icon: "⚙️",
        tags: ["AIOS", "Agente", "Kernel", "SDK", "MCP", "IA"],
        url: "https://inematds.github.io/aiosagi/"
    },
    {
        id: 113,
        title: "Hermes Agent — Curso Completo Avançado",
        description: "Agente IA open-source da Nous Research. Cria skills, memória persistente, 200+ modelos via OpenRouter. 6 trilhas, 12 modulos, ~11 horas. Docker, VPS, AWS Bedrock.",
        icon: "🤖",
        tags: ["Hermes", "Agente", "Open-Source", "Docker", "OpenRouter", "IA"],
        url: "https://inematds.github.io/hermesagent/"
    },
    {
        id: 112,
        title: "Profissional 2027 — Implementadores de IA para PMEs",
        description: "Formação completa de implementadores de IA para pequenas e médias empresas. Método DPIA (Diagnosticar, Processar, Instruir, Automatizar). 6 trilhas, ~100 horas em 10-12 semanas.",
        icon: "🎯",
        tags: ["Consultoria", "PME", "DPIA", "Implementação", "n8n", "IA"],
        url: "https://inematds.github.io/profissional2027x"
    },
    {
        id: 111,
        title: "PolySkills — Claude Code & Codex lado a lado",
        description: "Da terminologia basica aos fluxos avancados de quem trabalha com os dois agentes em paralelo. 6 trilhas, 10 modulos, ~7.5 horas. Skills cross-runtime, conversao zero-loss, workflow side-by-side.",
        icon: "🔀",
        tags: ["Claude Code", "Codex", "PolySkill", "Cross-Runtime", "Skills", "IA"],
        url: "https://inematds.github.io/polyskills"
    },
    {
        id: 110,
        title: "Mapa do Cliente — Formação DICA",
        description: "Consultor de IA para Pequenos Negócios. Método DICA (Diagnosticar, Implementar, Capacitar, Acompanhar). 6 trilhas, 28 modulos, ~15 horas. Da venda consultiva a escala profissional.",
        icon: "🗺️",
        tags: ["Consultoria", "DICA", "Vendas", "Pequenos Negócios", "IA"],
        url: "https://inematds.github.io/mapacliente/"
    },
    {
        id: 109,
        title: "Vendendo AIOS 2026",
        description: "Como vender Sistemas Operacionais de IA como servico. 6 trilhas (Mentalidade, Oferta, Aquisicao, Escada, Estrutura, Escala), 22 modulos, ~16.5 horas. Da primeira hora cobrada ao SaaS.",
        icon: "💰",
        tags: ["Vendas", "AIOS", "Consultoria", "Negócios", "SaaS", "IA"],
        url: "https://inematds.github.io/vendasaios/"
    },
    {
        id: 108,
        title: "WhatsApp Username & BSUID",
        description: "Privacidade e identidade no WhatsApp. 3 trilhas (Fundamentos, Para Pessoas, Para Empresas), 9 modulos, ~5 horas. Username, BSUID, Cloud API, CRM, compliance.",
        icon: "📱",
        tags: ["WhatsApp", "BSUID", "Username", "Privacidade", "API", "Empresas"],
        url: "https://inematds.github.io/whatsapp-bsuid/"
    },
    {
        id: 107,
        title: "Claude Cowork - Guia Completo",
        description: "Guia completo do Claude Cowork (Projects). 3 trilhas (Fundamentos, Recursos Centrais, Workflows e Operacao), 18 modulos, ~12 horas. Custom instructions, knowledge files, artifacts, modelos, integrações MCP, skills e metricas.",
        icon: "🚗",
        tags: ["Claude", "Cowork", "Projects", "Knowledge", "MCP", "IA"],
        url: "https://inematds.github.io/cccoworkfull/"
    },
    {
        id: 106,
        title: "Ensinando Claude Cowork - Playbook para Treinadores",
        description: "Playbook completo para quem ensina Claude Cowork. 5 trilhas (Enquadramento, Tres Produtos, Pre-producao Demos, Tour Interface, Fechamento), 30 modulos, ~13 horas. Da palestra a consultoria recorrente.",
        icon: "🎤",
        tags: ["Claude Code", "Cowork", "Treinamento", "Workshop", "Consultoria", "IA"],
        url: "https://inematds.github.io/cccoworkexec/"
    },
    {
        id: 105,
        title: "Claude Cowork - Equipe de Marketing de US$ 10.000/mes",
        description: "Monte uma equipe de marketing autonoma com Claude Code. 3 trilhas (Fundamentos, 7 Skills de Marketing, Avancado), 20 modulos, 120+ topicos, ~14 horas. Skills, conectores MCP, tarefas agendadas, sem codigo.",
        icon: "💸",
        tags: ["Claude Code", "Marketing", "Skills", "MCP", "Automacao", "IA"],
        url: "https://inematds.github.io/cccowork/"
    },
    {
        id: 104,
        title: "Hermes + NotebookLM - O Sistema de Agente AI Definitivo",
        description: "Integra Hermes com NotebookLM via Telegram. 3 trilhas (Fundamentos, Pratica, Avancado), 15 modulos, 108+ topicos, ~12 horas. RAG gratis, podcasts, infograficos, n8n, Triad multi-modelo. Custo zero por consulta.",
        icon: "📱",
        tags: ["Hermes", "NotebookLM", "Telegram", "RAG", "Agentes", "IA"],
        url: "https://inematds.github.io/hnotebooklm"
    },
    {
        id: 103,
        title: "New Agentic OS - Do Executivo ao Jarvis Multi-Cliente",
        description: "Disciplina de engenharia agentica completa. 4 trilhas (Executivo, Builder, Multi-usuario, iAmasters OS), 24 modulos, ~25 horas. Vocabulario, ROI, arquitetura multi-usuario, caso real implementado.",
        icon: "🏛️",
        tags: ["Agentes", "Agentic OS", "Multi-Cliente", "Arquitetura", "IA", "Jarvis"],
        url: "https://inematds.github.io/newagenticos/"
    },
    {
        id: 102,
        title: "CCXCX - Claude e Codex Tool-Agnostic AI Coding",
        description: "Domina Claude Code e Codex como ferramentas complementares. 3 trilhas (Fundamentos, Dicas Praticas, Avancado), 11 modulos, ~7 horas. AGENTS.md vs CLAUDE.md, handoff entre agentes, subagentes em paralelo, zero lock-in.",
        icon: "⚡",
        tags: ["Claude Code", "Codex", "Agentes", "Tool-Agnostic", "AGENTS.md", "IA"],
        url: "https://inematds.github.io/ccxcx"
    },
    {
        id: 60,
        title: "2Cerebro - Segundo Cerebro com LLM + Obsidian",
        description: "Construa um sistema de conhecimento persistente onde o LLM funciona como compilador. 3 trilhas (Fundamentos, Implementacao, Avancado), 12 modulos, ~8 horas. Cobre Obsidian vault, ingestao, grafos, RAG e multi-agentes.",
        icon: "🧠",
        tags: ["LLM", "Obsidian", "Knowledge Management", "RAG", "IA", "Produtividade"],
        url: "https://inematds.github.io/2cerebro/"
    },
    {
        id: 68,
        title: "6 Chapeus + Anti-Ancora",
        description: "Curso completo do metodo dos 6 Chapeus de Edward de Bono com fase anti-ancora para quebrar vieses cognitivos. 3 trilhas (Metodo, Pratica, Construcao), 18 modulos, 108 topicos em ~9 horas. Pensamento estruturado em 8 etapas: fatos, beneficios, riscos, alternativas e intuicao.",
        icon: "🎩",
        tags: ["Pensamento", "Decisao", "6 Chapeus", "De Bono", "Metodologia", "Produtividade"],
        url: "https://inematds.github.io/6chapeus/"
    },
    {
        id: 101,
        title: "iAmasters OS - Sistema Operativo Agentico",
        description: "Sistema operativo agentico que converte o Claude Code numa maquina de operacao profissional. 3 trilhas (Fundamentos, Skills Curadas, Operacao), 9 modulos, 54 topicos em ~8 horas. Arquitetura agentica, brand context, operacao multi-cliente.",
        icon: "🦎",
        tags: ["IA", "Agentes", "Claude Code", "Operacao", "Multi-Cliente", "Skills"],
        url: "https://inematds.github.io/curso-iamasters-os/"
    },
    {
        id: 42,
        title: "Agentic Engineering Masterclass",
        description: "Engenharia de Agentic - Masterclass completa com 6 trilhas, 42 módulos e 252+ tópicos em 21 semanas. Do básico à orquestração multi-agente enterprise com LangGraph, CrewAI e AutoGen.",
        icon: "🤖",
        tags: ["IA", "Agentes", "Engenharia", "LLMs", "Multi-Agentes", "Python"],
        url: "https://inematds.github.io/agentic/"
    },
    {
        id: 1,
        title: "AIWCF - Vibe Coding",
        description: "AI Website Creation Framework - Aprenda a criar websites profissionais usando IA com a metodologia Vibe Coding.",
        icon: "✨",
        tags: ["Vibe Coding", "Web", "IA", "Desenvolvimento"],
        url: "https://inematds.github.io/AIWCF"
    },
    {
        id: 100,
        title: "CAIO - Chief AI Officer 2030",
        description: "Profissional de IA 2030. 6 trilhas: A Nova Realidade (IBM study), Os Dois Caminhos (consultor vs AI-native interno), 6 Skills Core, Posicionamento e Marketing Pessoal, Playbooks por Função (Marketing/Finanças/RH/Ops/Vendas/Jurídico) e Plano de 12 Semanas. 36 módulos, 216 tópicos, ~27h.",
        icon: "💼",
        tags: ["Negócios", "Carreira", "Chief AI Officer", "Liderança", "IA", "Estratégia"],
        url: "https://inematds.github.io/caio/"
    },
    {
        id: 99,
        title: "Prompt Director - Imagens e Cinema com IA",
        description: "Domine a linguagem por trás de imagens e vídeos gerados por IA. Gramática fotográfica, Midjourney, Sora 2, Veo 3, Runway Gen-4, Flux, Seedance, Kling, Nano Banana. 4 trilhas: Fundamentos, Técnicas, Avançado e Biblioteca. 19 módulos, 114 tópicos, +80 prompts prontos.",
        icon: "🎬",
        tags: ["Prompt", "Cinema", "Imagens", "Vídeo", "Midjourney", "Sora", "IA"],
        url: "https://inematds.github.io/promptfilmes/"
    },
    {
        id: 98,
        title: "TRIAD - Automação de IA Multi-Modelo com Hermes e DeepSeek",
        description: "Sistema de IA multi-modelo que trabalha 24/7. Claude Opus (condutor), DeepSeek V4 (executor ~100x mais barato), GPT-5.5 (crítico). 4 trilhas: Fundamentos, Implementação Técnica, Avançado e Construção/Escala. OpenRouter, soul.md, Pantheon para times.",
        icon: "🎭",
        tags: ["Agentes", "Multi-Modelo", "Hermes", "OpenRouter", "Automação", "IA"],
        url: "https://inematds.github.io/triad"
    },
    {
        id: 97,
        title: "Engenharia de Dados com IA",
        description: "A base dos sistemas de IA e agentes. 3 trilhas: Fundamentos (stack em camadas, pirâmide de dados), Dicas Técnicas (auditoria 4 eixos, DuckDB, pipelines) e Visão Avançada (Text-to-SQL, data dictionary, enterprise vs PME). 16 módulos, 96 tópicos, ~9h30.",
        icon: "🗄️",
        tags: ["Dados", "Engenharia", "DuckDB", "Pipeline", "SQL", "IA", "Agentes"],
        url: "https://inematds.github.io/engdadosai"
    },
    {
        id: 96,
        title: "Skills Premium - Do Iniciante ao Expert",
        description: "Domine skills no Claude Code do zero ao avançado. 3 trilhas: Fundamentos (6 módulos), Dicas Técnicas (8 módulos) e No Expert (6 módulos). Anatomia de skills, progressive disclosure, auditoria, sub-agentes, prompts canhão e skills auto-iterativas.",
        icon: "⚡",
        tags: ["Skills", "Claude Code", "Agentes", "Sub-agentes", "IA", "Expert"],
        url: "https://inematds.github.io/skills-premium/"
    },
    {
        id: 95,
        title: "Printing Press - CLI para Agentes de IA",
        description: "Por que CLI vence MCP e API para agentes. 35x menos tokens, 100% confiabilidade em tarefas longas. Trilha única: conceitos, instalação, primeiros comandos, criar sua CLI, caso prático com BrasilAPI, integração n8n + Supabase e publicação no library. 7 módulos, 42 tópicos, ~2h.",
        icon: "🖨️",
        tags: ["CLI", "Agentes", "MCP", "Printing Press", "n8n", "Supabase"],
        url: "https://inematds.github.io/pp-cli/"
    },
    {
        id: 94,
        title: "TimesMarketing 3 - Automação de Conteúdo com IA",
        description: "Sistema de automação de conteúdo para marketing digital com agentes de IA coordenados via Telegram. Pipeline de 5 estágios: pesquisa, narrativa, imagens, vídeos e publicação. Bot + orchestrator + workers + UI read-only. Docker, Redis, Remotion, multi-modelo.",
        icon: "📈",
        tags: ["Marketing", "Automação", "Agentes", "Telegram", "Vídeo", "IA", "Docker"],
        url: "https://github.com/inematds/timesmkt3"
    },
    {
        id: 93,
        title: "5 Níveis do Claude Code",
        description: "Em qual nível do Claude você está? Da conversa simples à automação autônoma. 6 trilhas: Entusiasta, Iniciante, Intermediário, Avançado, Arquiteto e Prova Final. 13 módulos, 80+ tópicos, ~6h. Diagnóstico de nível, cheat codes entre cada salto e certificado.",
        icon: "📊",
        tags: ["Claude Code", "Níveis", "Diagnóstico", "Skills", "Hooks", "Automação"],
        url: "https://inematds.github.io/5niveiscc/"
    },
    {
        id: 92,
        title: "CAIP - Certified AI Professional",
        description: "Certificação profissional em IA aplicada. 6 trilhas: Fundamentos, Comando e Engenharia de Contexto, Agentes e Automação, Aplicação Profissional, Projeto Certificador e Especializações. 6 selos independentes, ~58h. Do modo execução ao modo comando.",
        icon: "🎓",
        tags: ["Certificação", "IA", "CAIP", "Profissional", "Agentes", "Automação"],
        url: "https://inematds.github.io/prof2031CAIP"
    },
    {
        id: 91,
        title: "Agentic OS - O Sistema Operacional do Trabalho com IA",
        description: "Claude Code, Codex e agentes como sistema operacional. 6 trilhas: Fundamentos (Software 3.0, Karpathy), Identidade (CLAUDE.md, AGENTS.md), Conhecimento (Silver Platters, MCP, Context Engineering), Trabalhadores (orquestrador, A2A), Automação (hooks, n8n) e Deploy. 36 módulos, 216+ tópicos, ~24h.",
        icon: "⚙️",
        tags: ["Agentic OS", "Claude Code", "MCP", "A2A", "Hooks", "Skills", "Orquestração"],
        url: "https://inematds.github.io/agenticos/"
    },
    {
        id: 90,
        title: "Agente Hermes - Assistente IA Self-Hosted",
        description: "Suba um agente IA na sua própria infra com Docker, Telegram e GitHub. 6 trilhas: Fundamentos, Setup do Zero, 5 Pilares (Memory/Skills/Soul/Crons), Segurança, Hermes vs Mercado e Escala Multi-Agente. Comparações com Claude Code, n8n, LangChain e CrewAI.",
        icon: "🏛️",
        tags: ["Agente IA", "Self-Hosted", "Docker", "Telegram", "Open Source", "Hermes"],
        url: "https://inematds.github.io/agentehermes"
    },
    {
        id: 84,
        title: "AgenteJAX - Construa seu Agente de IA Pessoal",
        description: "Construa um agente de IA pessoal de ponta a ponta em TypeScript. Vive no Telegram, opera 24/7 com autonomia, memória multi-camada, function calling, voz, skills auto-geradas e MCP. 3 trilhas (Fundamentos, Vida do Agente, Produção), 9 módulos, 54 tópicos em ~6 horas. Sem frameworks fechados.",
        icon: "🤖",
        tags: ["Agente IA", "Telegram", "TypeScript", "MCP", "Memória", "Produção", "IA"],
        url: "https://inematds.github.io/agentejax/"
    },
    {
        id: 2,
        title: "ATIA - Oportunidades Digitais com IA",
        description: "Oportunidades Digitais com IA - Explore o mundo da Inteligência Artificial e suas aplicações práticas.",
        icon: "🤖",
        tags: ["IA", "Oportunidades", "Digital"],
        url: "https://inematds.github.io/ATIA/"
    },
    {
        id: 3,
        title: "Automação 2026",
        description: "Automação 2026 - Formação em automação e tecnologias para o futuro.",
        icon: "⚙️",
        tags: ["Automação", "Tecnologia", "2026"],
        url: "https://inematds.github.io/AUTOMACAO2026"
    },
    {
        id: 4,
        title: "BMAD Academy",
        description: "Academia de desenvolvimento com metodologia BMAD - Aprenda boas práticas de desenvolvimento.",
        icon: "🎓",
        tags: ["Desenvolvimento", "Metodologia", "Academia"],
        url: "https://inematds.github.io/BMAD-Academy/"
    },
    {
        id: 37,
        title: "CCGuide - Claude Code 2026",
        description: "O curso mais completo sobre Claude Code em português. Domine a CLI da Anthropic do básico ao avançado com 24 módulos e 144 tópicos práticos.",
        icon: "🖥️",
        tags: ["Claude Code", "CLI", "Anthropic", "IA"],
        url: "https://inematds.github.io/ccguide2026"
    },
    {
        id: 80,
        title: "Ruflo - Orquestração de Agentes Multi-IA",
        description: "Coordene enxames de agentes especializados com Claude Code, AgentDB+HNSW, federation zero-trust e auto-aprendizado SONA. 3 trilhas (Fundamentos, Uso Prático, Avançado), 21 módulos, 126 tópicos, ~45 horas. Deploy em produção com consenso distribuído e 33 plugins nativos.",
        icon: "🤖",
        tags: ["Claude Code", "Multi-agente", "Orquestração", "Zero-trust", "SONA", "AgentDB", "IA"],
        url: "https://inematds.github.io/ruflo/"
    },
    {
        id: 81,
        title: "Master Codex - A Fábrica de SaaS com Agentes de IA",
        description: "Evolua de curioso a operador de fábrica de software com agentes IA. 6 trilhas, 24 módulos, 144 tópicos em ~27 horas. Cobre protocolos de comunicação (AGENTS.md), UI/UX com IA, backend multi-tenant, WhatsApp, orquestração multi-agente paralela e metodologia de micro-SaaS semanal. Projeto-âncora: InboxAI.",
        icon: "⚡",
        tags: ["Claude Code", "SaaS", "Multi-agente", "WhatsApp", "Automação", "Produção", "IA"],
        url: "https://inematds.github.io/mastercodex/"
    },
    {
        id: 85,
        title: "Mentes Brilhantes - A Fórmula 1-20-79",
        description: "1% ideia, 20% produto, 79% venda. Curso gratuito de mentalidade empreendedora com case Cal AI ($100M+). 6 trilhas, 24 módulos, 144+ tópicos. Cobre validação de ideias, MVP, marketing, distribuição, vendas, retenção e escala. 100% gratuito.",
        icon: "💡",
        tags: ["Empreendedorismo", "Vendas", "Marketing", "MVP", "Mindset", "Gratuito"],
        url: "https://inematds.github.io/mentesbrilhantes1/"
    },
    {
        id: 86,
        title: "Multiagentes - Equipes de Agentes na Prática",
        description: "Projete, orquestre e opere squads de agentes IA que entregam software de produção. 5 trilhas, 20 módulos, 120 tópicos em ~16h + 4h de projeto final. Cobre Claude Code, OpenAI Codex, Gemini CLI, coordenação multi-agente, diagnóstico, custos e multi-runtime.",
        icon: "🤖",
        tags: ["Multi-agente", "Claude Code", "Codex", "Gemini", "Orquestração", "Produção", "IA"],
        url: "https://inematds.github.io/multiagentes/"
    },
    {
        id: 79,
        title: "MakeClaudeX - Engenharia com Claude Code: Do Prompt ao Plugin",
        description: "Construa plugins de produção com Claude Code usando o método real do Claudex. 4 trilhas (Fundamentos, Construindo, O Método, Avançado), 24 módulos, 144 tópicos, ~19 horas. Cobre hooks, slash commands, skills, state management YAML/CAS, Git e GitHub API.",
        icon: "🔧",
        tags: ["Claude Code", "Hooks", "Plugins", "Skills", "Engenharia", "YAML", "IA"],
        url: "https://inematds.github.io/makeclaudex/"
    },
    {
        id: 78,
        title: "iClaudeX - Planejamento Inteligente com Claude + Codex",
        description: "Duas IAs discutem o seu plano para você não precisar fazer isso. Claude drafta, Codex critica de múltiplas perspectivas profissionais, iteram até validar — tudo no terminal. Plugin open source para Claude Code com arquitetura de loops iterativos.",
        icon: "🤝",
        tags: ["Claude Code", "Codex", "OpenAI", "Planejamento", "Plugin", "Open Source", "IA"],
        url: "https://inematds.github.io/iclaudex/"
    },
    {
        id: 77,
        title: "SuperSkills Karpathy - Transforme Skills em Funcionários Digitais",
        description: "Método Karpathy para criar skills que funcionam como funcionários digitais reais: contexto, memória, integração de dados e melhoria contínua. 3 trilhas, 9 módulos, 54 tópicos, ~5 horas. Cobre Memory OS, Signal Dashboard e Claude Code.",
        icon: "🧑‍💻",
        tags: ["Claude Code", "Skills", "Karpathy", "Memory OS", "Agentes", "IA", "Produtividade"],
        url: "https://inematds.github.io/superskills-karpathy/"
    },
    {
        id: 76,
        title: "Docker OpenClaw - Assistente IA Autônomo e Multi-Canal",
        description: "Configure um assistente pessoal de IA rodando localmente com Docker, 200+ modelos via OpenRouter, Telegram, WhatsApp, Discord e Slack. 6 trilhas, 24 módulos, 144 tópicos, ~12 horas. Cobre instalação, canais, workspace, uso avançado e segurança.",
        icon: "🦞",
        tags: ["Docker", "OpenClaw", "OpenRouter", "Telegram", "WhatsApp", "Self-hosted", "IA"],
        url: "https://inematds.github.io/docker-openclaw/"
    },
    {
        id: 75,
        title: "CCOpen - Claude Code de Graça ou por Quase Nada",
        description: "Use Claude Code com Ollama (local, gratuito) ou OpenRouter (cloud, quase nada) trocando o motor sem mudar a interface. 5 trilhas, 19 módulos: fundamentos, instalação (Linux/macOS/Windows WSL), Ollama, OpenRouter e prática real.",
        icon: "🆓",
        tags: ["Claude Code", "Ollama", "OpenRouter", "Gratuito", "Local LLM", "vLLM", "IA"],
        url: "https://inematds.github.io/ccopen/"
    },
    {
        id: 74,
        title: "INTELECTO Curso - Do Zero ao Expert em IA",
        description: "Curso completo de construção de assistentes de IA pessoais: 6 trilhas (Fundamentos, Identidade e Canais, Segurança Zero-Trust, Memória e Integrações, Arquiteturas Avançadas, Projeto Final: Seu Jarvis), 18 módulos, ~21 horas.",
        icon: "🤖",
        tags: ["Assistente IA", "Frameworks", "Segurança", "Memória", "Arquitetura", "Agentes", "IA"],
        url: "https://inematds.github.io/intelecto-curso/"
    },
    {
        id: 73,
        title: "Superpowers - Desenvolvimento com Agentes de IA",
        description: "Metodologia completa do brainstorming ao deploy com agentes: TDD, subagentes, debugging sistemático, worktrees, agentes paralelos e criação de skills. 1 trilha, 10 módulos, 42 tópicos, ~5 horas. Intermediate.",
        icon: "⚡",
        tags: ["Claude Code", "Agentes", "TDD", "Metodologia", "Worktrees", "Skills", "IA"],
        url: "https://inematds.github.io/superpowers/"
    },
    {
        id: 72,
        title: "CCFast32 - 32 Hacks do Claude Code",
        description: "Do Iniciante ao Power User: 32 hacks práticos em 3 trilhas (Iniciante, Intermediário, Avançado), 11 módulos. Cobre /init, CLAUDE.md, tokens, plan mode, subagentes paralelos, slash commands, hooks, worktrees, ultrathink, multi-agente e CI/CD.",
        icon: "⚡",
        tags: ["Claude Code", "Hacks", "Power User", "Multi-agente", "Worktrees", "Hooks", "IA"],
        url: "https://inematds.github.io/ccfast32/"
    },
    {
        id: 71,
        title: "INTELECTO - Inteligência Pessoal sem Frameworks Inchados",
        description: "Compare 9 frameworks de IA (OpenClaw, ZeroClaw, NanoClaw, NanoBot, PicoClaw, IronClaw, TinyClaw, Agent Zero), escolha os ingredientes certos para o seu assistente pessoal e entenda os 8 corredores de funcionalidades e 6 padrões de arquitetura.",
        icon: "🧠",
        tags: ["Frameworks", "IA", "Assistente", "Comparativo", "Arquitetura", "Agentes"],
        url: "https://inematds.github.io/intelecto"
    },
    {
        id: 70,
        title: "CCMasterMemory - Memory Injection via Hooks",
        description: "Resolva as limitacoes de memoria do Claude Code com hooks deterministicos. 6 trilhas, 36 modulos, ~24 horas + 6 labs praticos. Cobre hierarquia de 7 niveis de memoria, anatomia de 18 hooks, arquitetura de backend (Markdown, SQLite, vector DB) e memoria multi-agente.",
        icon: "🧠",
        tags: ["Claude Code", "Memory", "Hooks", "Anthropic", "IA", "SQLite"],
        url: "https://inematds.github.io/ccmastermemory/"
    },
    {
        id: 69,
        title: "CCTop - Mestre em Contexto e Tokens",
        description: "Domine o gerenciamento de contexto e tokens no Claude Code. 6 trilhas, 18 modulos, ~108 topicos em ~12 horas. Cobre mecanica de tokens, prompt caching, context rot, handoff inteligente, delegacao sub-agente e orquestracao multi-modelo.",
        icon: "📊",
        tags: ["Claude Code", "Tokens", "Contexto", "Anthropic", "Otimizacao", "IA"],
        url: "https://inematds.github.io/cctop/"
    },
    {
        id: 59,
        title: "Claude Code Deep Dive",
        description: "Mergulho profundo no codigo-fonte do Claude Code. Analise de 1.902 arquivos cobrindo arquitetura core, sistema de tools, inteligencia do agente, infra, conectividade e features nao lancadas. 8 trilhas, 50 aulas, ~25 horas. Nivel avancado.",
        icon: "🔍",
        tags: ["Claude Code", "Anthropic", "Arquitetura", "Source Code", "IA", "Tools"],
        url: "https://inematds.github.io/claudecode-manual/"
    },
    {
        id: 66,
        title: "Claude Design - Zero ao Expert",
        description: "Curso completo de Claude Design, a ferramenta de design da Anthropic. 5 trilhas, ~35 modulos, 200+ topicos. Cobre fundamentos, design systems, context stacking, canvas iteration, prompts prontos e automacao. Substitui Figma, Gamma e Canva numa interface conversacional.",
        icon: "🎨",
        tags: ["Claude Design", "Anthropic", "Design", "No-Code", "UI/UX", "Canva"],
        url: "https://inematds.github.io/claudedesign/"
    },
    {
        id: 83,
        title: "Curso Open Design - Alternativa Open-Source ao Claude Design",
        description: "Alternativa local-first e BYOK ao Claude Design. 3 trilhas (Fundamentos, Exemplos, Avançado), 18 módulos, 100+ tópicos em ~30 horas. Conduzido por 31 skills, 72 design systems e CLI de agente. Cobre prompt stack, pitch decks, landing pages, dashboards, critique loops, ACP e daemon/sidecar.",
        icon: "🎨",
        tags: ["Open Design", "Design", "Skills", "BYOK", "Claude Code", "UI/UX", "IA"],
        url: "https://inematds.github.io/curso-od/"
    },
    {
        id: 5,
        title: "Dashboard Mastery",
        description: "Supercurso de Dashboards Profissionais - Domine a criação de dashboards com Next.js e React.",
        icon: "📊",
        tags: ["Dashboard", "Next.js", "React", "Design"],
        url: "https://inematds.github.io/dash/"
    },
    {
        id: 6,
        title: "DBA-FO",
        description: "Fundamentos DBA Oracle - Formação em administração de banco de dados Oracle.",
        icon: "🗄️",
        tags: ["DBA", "Oracle", "Banco de Dados"],
        url: "https://inematds.github.io/DBA-FO/"
    },
    {
        id: 82,
        title: "DeepClaudeX - Multi-Modelo 70/20/10",
        description: "Orquestre 3 modelos de IA (GPT-5.5, Claude Opus 4.7, DeepSeek V4) com eficiência máxima. 3 trilhas (Conceito, Configuração, Projetos), 18 módulos, 108 tópicos em ~10 horas. Reduza custos mantendo qualidade com distribuição inteligente: 70% DeepSeek, 20% GPT, 10% Claude.",
        icon: "🔀",
        tags: ["Multi-modelo", "Orquestração", "Claude Code", "DeepSeek", "GPT", "Custos", "IA"],
        url: "https://inematds.github.io/deepclaudex/"
    },
    {
        id: 64,
        title: "DeerFlow 2.0 - Framework de Agentes ByteDance",
        description: "Curso completo do framework open-source de agentes da ByteDance. 4 trilhas, 21 modulos com labs praticos. Cobre fundamentos, arquitetura LangGraph, extensao com skills e MCP, plataforma avancada e comparativo com Claude Code.",
        icon: "🦌",
        tags: ["DeerFlow", "ByteDance", "Agentes", "LangGraph", "MCP", "Python"],
        url: "https://inematds.github.io/deerflow/"
    },
    {
        id: 65,
        title: "Design + Video com IA (Hyperframes)",
        description: "Produza materiais visuais profissionais de ponta a ponta com Claude Design e Hyperframes. 3 trilhas, 9 modulos, 54 topicos em ~22 horas. Cobre design, brand systems, motion graphics, pitch decks, videos verticais e promocionais.",
        icon: "🎨",
        tags: ["Design", "Video", "IA", "Hyperframes", "Claude Design", "Motion Graphics"],
        url: "https://inematds.github.io/cchyperframes/"
    },
    {
        id: 7,
        title: "EAI - Games Educativos",
        description: "Games Educativos - Aprenda através de jogos interativos e gamificação.",
        icon: "🎮",
        tags: ["Games", "Educação", "Gamificação"],
        url: "https://inematds.github.io/EAI/"
    },
    {
        id: 43,
        title: "Enxames de Agentes de IA",
        description: "Domine a construção de sistemas multiagentes inteligentes. 4 trilhas, 32 módulos e 220+ tópicos cobrindo fundamentos, frameworks (CrewAI, LangGraph, AutoGen), prática avançada e projetos hands-on.",
        icon: "🐝",
        tags: ["IA", "Agentes", "Multi-Agentes", "CrewAI", "LangGraph", "AutoGen"],
        url: "https://inematds.github.io/enxamesagentes/"
    },
    {
        id: 87,
        title: "FEC - Formação de Engenharia de Contexto",
        description: "Engenharia de Contexto para quem leva LLM a produção. 6 trilhas, 14 módulos, 3 projetos cumulativos. Cobre janelas de contexto, message engineering, RAG, tools e agentes, memória e compressão, avaliação e deploy. Cada módulo com ilustrações e exercícios automatizados.",
        icon: "🧩",
        tags: ["Engenharia de Contexto", "LLM", "RAG", "Agentes", "Memória", "Produção", "IA"],
        url: "https://inematds.github.io/FEC/"
    },
    {
        id: 8,
        title: "FDB - Fundamentos de Banco de Dados",
        description: "Formação em Desenvolvimento de Base - Fundamentos essenciais para desenvolvedores.",
        icon: "💻",
        tags: ["Desenvolvimento", "Fundamentos", "Base"],
        url: "https://inematds.github.io/FDB/"
    },
    {
        id: 9,
        title: "FDF - Designers do Futuro",
        description: "Formação de Designer do Futuro - Desenvolva competências de design para a era digital.",
        icon: "🎨",
        tags: ["Design", "Futuro", "Criatividade"],
        url: "https://inematds.github.io/FDF"
    },
    {
        id: 10,
        title: "FEA-IA - Engenharia de Agentes",
        description: "Formação de Engenheiros de Agentes de IA - Aprenda a criar e gerenciar agentes inteligentes.",
        icon: "🧠",
        tags: ["IA", "Agentes", "Engenharia"],
        url: "https://inematds.github.io/FEA-IA/"
    },
    {
        id: 11,
        title: "FEI - Engenharia da Intenção",
        description: "Formação em Engenharia de Inteligência - Desenvolvimento de soluções inteligentes com IA.",
        icon: "🧪",
        tags: ["IA", "Engenharia", "Inteligência"],
        url: "https://inematds.github.io/FEI/"
    },
    {
        id: 12,
        title: "FEP - Engenharia de Prompts",
        description: "Formação de Engenheiros de Prompts - Domine a arte de criar prompts eficazes para IA.",
        icon: "✍️",
        tags: ["Prompts", "IA", "Engenharia"],
        url: "https://inematds.github.io/FEP/"
    },
    {
        id: 38,
        title: "FEP2 - Prompt Engineering Masterclass",
        description: "Masterclass em Engenharia de Prompts - Domine técnicas profissionais de prompting, desde context windows até meta prompting.",
        icon: "✍️",
        tags: ["Prompts", "IA", "Engenharia", "LLMs"],
        url: "https://inematds.github.io/FEP2/"
    },
    {
        id: 61,
        title: "FPFilm - Crie Filmes com IA",
        description: "Criacao cinematografica com Freepik Spaces. Do roteiro ao export final usando workflows visuais baseados em nodes. 6 trilhas, 34 modulos, 200+ topicos. Cobre fundamentos de cinema, camera, producao e projeto completo.",
        icon: "🎬",
        tags: ["Freepik", "Cinema", "IA", "Video", "Filmes", "Producao"],
        url: "https://inematds.github.io/fpfilm1/"
    },
    {
        id: 13,
        title: "FETD - Engenharia de Treinamentos de Dados",
        description: "Formação em Engenharia de Treinamento de Dados - Especialização em preparação e qualidade de dados para IA.",
        icon: "📊",
        tags: ["Dados", "Engenharia", "Treinamento"],
        url: "https://inematds.github.io/FETD/"
    },
    {
        id: 14,
        title: "FGMD - Gatilhos Mentais Digitais",
        description: "Formação em Gatilhos Mentais no Digital - Domine a comunicação estratégica com os 10 gatilhos mentais fundamentais.",
        icon: "🎯",
        tags: ["Comunicação", "Marketing", "Gatilhos Mentais"],
        url: "https://inematds.github.io/FGMD/"
    },
    {
        id: 15,
        title: "FIA2026",
        description: "Formação em Automações com IA 2026 - Aprenda a criar automações inteligentes com IA.",
        icon: "⚡",
        tags: ["IA", "Automação", "2026"],
        url: "https://inematds.github.io/FIA2026/"
    },
    {
        id: 16,
        title: "FTD - Formação Transformação Digital",
        description: "Formação Técnica Digital - Capacitação técnica para o mundo digital e tecnológico.",
        icon: "⚙️",
        tags: ["Técnico", "Digital", "Tecnologia"],
        url: "https://inematds.github.io/FTD/"
    },
    {
        id: 17,
        title: "FTH - Treinamento de Humanoides",
        description: "Formação para Treinamento de Humanoides - Capacitação em robótica e interação humano-robô.",
        icon: "🤖",
        tags: ["Robótica", "Humanoides", "Treinamento"],
        url: "https://inematds.github.io/FTH/"
    },
    {
        id: 18,
        title: "GitHub",
        description: "Repositórios e projetos INEMA no GitHub - Código aberto e colaboração.",
        icon: "🐙",
        tags: ["GitHub", "Código", "Colaboração"],
        url: "https://inematds.github.io/github/"
    },
    {
        id: 19,
        title: "GIPM - Projetos com IA Governada",
        description: "Método de Projetos com IA Governada - Aprenda a construir projetos onde a IA é um componente controlado, não o decisor.",
        icon: "🏛️",
        tags: ["IA", "Projetos", "Governança", "Arquitetura"],
        url: "https://inematds.github.io/GIPM/"
    },
    {
        id: 20,
        title: "HG1 - Academia dos Humanoides G1",
        description: "Academias dos Humanoides - Formação especializada em robótica humanoide e interação avançada.",
        icon: "🤖",
        tags: ["Humanoides", "Academia", "Robótica"],
        url: "https://inematds.github.io/HG1"
    },
    {
        id: 62,
        title: "IAMed - Medico IA-Native",
        description: "Qualificacao de medicos em IA. 9 trilhas, 54 modulos: entendendo IA, prompt clinico, pesquisa, consultorio, vibe code, segundo cerebro medico. Do fundamento a pratica. 100% gratuito.",
        icon: "🩺",
        tags: ["Medicina", "IA", "Saude", "Pesquisa", "Obsidian", "Vibe Coding"],
        url: "https://inematds.github.io/IAMed/"
    },
    {
        id: 21,
        title: "MAKE - Automações",
        description: "Curso Completo de Automação - Domine automação no-code com Make e IA.",
        icon: "⚡",
        tags: ["Automação", "Make", "No-Code", "IA"],
        url: "https://inematds.github.io/MAKE/"
    },
    {
        id: 22,
        title: "N8Nb - Fundamentos N8N",
        description: "Fundamentos de N8N - Aprenda os fundamentos da automação com N8N.",
        icon: "🔗",
        tags: ["Automação", "N8N", "Fundamentos"],
        url: "https://inematds.github.io/N8Nb"
    },
    {
        id: 23,
        title: "N8Np",
        description: "N8N Avançado - Domine técnicas avançadas de automação com N8N.",
        icon: "⚡",
        tags: ["Automação", "N8N", "Avançado"],
        url: "https://inematds.github.io/N8Np"
    },
    {
        id: 24,
        title: "NanoBanana - SuperCurso Nano Banana",
        description: "SuperCurso Nano Banana - Curso especial de formação acelerada.",
        icon: "🍌",
        tags: ["Curso", "Formação", "Nano"],
        url: "https://inematds.github.io/NanoBanana/"
    },
    {
        id: 40,
        title: "NotebookLM - Do Zero ao Avançado",
        description: "NotebookLM Completo - Domine a ferramenta de IA do Google que transforma documentos em conhecimento acionável, com áudio, mapas mentais e chat inteligente.",
        icon: "📓",
        tags: ["NotebookLM", "Google AI", "Documentos", "IA", "RAG"],
        url: "https://inematds.github.io/notebooklm"
    },
    {
        id: 67,
        title: "Opus 4.7 - Dominando o Claude Code",
        description: "Treinamento pratico para dominar o Opus 4.7 no Claude Code. 4 trilhas, 28 modulos, 180+ topicos em ~20 horas. Cobre transicao do 4.6, orquestracao agentica, fan-out paralelo, framework ICCA, auditoria e migracao para producao.",
        icon: "🧬",
        tags: ["Claude Code", "Opus 4.7", "Anthropic", "Agentic", "IA", "Produtividade"],
        url: "https://inematds.github.io/opus47/"
    },
    {
        id: 25,
        title: "Playbook - Formação Consultor IA - Inglês",
        description: "Playbook de Desenvolvimento - Guia completo de boas práticas e metodologias de desenvolvimento.",
        icon: "📖",
        tags: ["Desenvolvimento", "Guia", "Metodologia"],
        url: "https://inematds.github.io/Playbook/"
    },
    {
        id: 26,
        title: "Playbook-IA - Formação de Consultoria IA",
        description: "Curso de Consultoria em IA - Formação especializada para consultores de Inteligência Artificial.",
        icon: "🎯",
        tags: ["IA", "Consultoria", "Especialização"],
        url: "https://inematds.github.io/Playbook-IA/"
    },
    {
        id: 58,
        title: "Por Dentro do Claude Code",
        description: "A arquitetura revelada do agente de IA mais sofisticado ja construido. Baseado em 512k linhas de TypeScript. 3 trilhas (Fundamentos, Nucleo, Avancado), 12 modulos, 72 topicos em ~6 horas.",
        icon: "🔬",
        tags: ["Claude Code", "Anthropic", "Arquitetura", "TypeScript", "IA", "Agentes"],
        url: "https://inematds.github.io/claudecode-estrutura/"
    },
    {
        id: 27,
        title: "Portal INEMA",
        description: "Portal dos Projetos, Sites e Plataformas do INEMA - Acesso centralizado a todos os recursos.",
        icon: "🌐",
        tags: ["Portal", "Projetos", "Plataformas"],
        url: "https://inematds.github.io/portal/"
    },
    {
        id: 88,
        title: "Power Design - Os 20 Princípios",
        description: "Os 20 princípios de design fundamentais aplicados a slides e apresentações profissionais com Claude Code. 7 seções (Carga Cognitiva, Hierarquia Visual, Gestalt, Tipografia, Cor, Sistemas Espaciais, Alinhamento), 72+ brand systems, referências Tufte/Reynolds/Duarte. Slides que não parecem feitos por IA.",
        icon: "🎨",
        tags: ["Design", "Slides", "Claude Code", "Tipografia", "Gestalt", "Apresentações", "IA"],
        url: "https://inematds.github.io/power-design/"
    },
    {
        id: 89,
        title: "Prof2030 - O Profissional do Futuro",
        description: "O Tripé do Profissional do Futuro: comunicar com a máquina, empreender pela automação e liderar com humanidade. 3 trilhas, 18 módulos, 108 tópicos, ~13h. AI literacy, prompt engineering, n8n, solopreneurs, caráter e legado humano.",
        icon: "🧬",
        tags: ["Neurociência", "Futuro", "IA", "Automação", "Liderança", "Empreendedorismo"],
        url: "https://inematds.github.io/prof2030/"
    },
    {
        id: 28,
        title: "Prompts",
        description: "Formação de Engenheiros de Prompts - Técnicas avançadas de engenharia de prompts para IA.",
        icon: "📝",
        tags: ["Prompts", "Engenharia", "IA"],
        url: "https://inematds.github.io/prompts/"
    },
    {
        id: 29,
        title: "Robot",
        description: "Plataforma Robot - Robótica e automação inteligente.",
        icon: "🤖",
        tags: ["Robótica", "Automação", "Robot"],
        url: "https://inematds.github.io/robot/"
    },
    {
        id: 30,
        title: "SHIA - Super Humanos Inteligência Ampliada",
        description: "Super Humanos Inteligência Ampliada - Formação para potencializar capacidades humanas com IA.",
        icon: "🧬",
        tags: ["IA", "Super Humanos", "Inteligência"],
        url: "https://inematds.github.io/SHIA/"
    },
    {
        id: 63,
        title: "Seedance 2.0 Mastery - Video com IA",
        description: "Curso completo de geracao de video com Seedance 2.0 (ByteDance). 3 trilhas (Iniciante, Aplicado, Tecnico), ~85 aulas. Cobre prompts, cinema, storytelling, reverse engineering e pipeline de producao. Audio nativo, faces reais e image references.",
        icon: "🎥",
        tags: ["Seedance", "Video", "IA", "ByteDance", "Cinema", "Prompts"],
        url: "https://inematds.github.io/seedance2/"
    },
    {
        id: 39,
        title: "Skills - Agent Skills Mastery",
        description: "Domine a criação de Skills para agentes de IA. Aprenda a criar, configurar e distribuir skills para Claude Code, Gemini CLI e outras plataformas.",
        icon: "🧠",
        tags: ["Skills", "IA", "Agentes", "Claude Code", "Gemini"],
        url: "https://inematds.github.io/skills"
    },
    {
        id: 31,
        title: "SuperProf",
        description: "SuperProf - Formação avançada para professores e educadores do futuro.",
        icon: "🎓",
        tags: ["Educação", "Professores", "Formação"],
        url: "https://inematds.github.io/SuperProf/"
    },
    {
        id: 32,
        title: "TDS",
        description: "Transformação Digital Sustentável - Curso completo sobre transformação digital com foco em sustentabilidade.",
        icon: "🌱",
        tags: ["Transformação Digital", "Sustentabilidade", "Inovação"],
        url: "https://inematds.github.io/TDS/"
    },
    {
        id: 33,
        title: "TikTok Shop",
        description: "TikTok Shop - Aprenda a vender e monetizar na plataforma TikTok Shop.",
        icon: "🛒",
        tags: ["TikTok", "E-commerce", "Vendas"],
        url: "https://inematds.github.io/tiktokshop"
    },
    {
        id: 41,
        title: "Vibe Coding - Da Ideia ao Produto",
        description: "Vibe Coding: Da Ideia ao Produto - Aprenda a construir software usando linguagem natural com IA. Método com 4 trilhas para leigos, executivos e técnicos com 31 módulos e 217 tópicos.",
        icon: "⚡",
        tags: ["Vibe Coding", "IA", "Programação", "Low-Code", "Empreendedorismo"],
        url: "https://inematds.github.io/vibecode"
    },
    {
        id: 44,
        title: "Vibe Coding Imersão - Do Zero ao SaaS",
        description: "Imersão intensiva de 3 dias: do zero ao SaaS com IA. 6 trilhas e 36 tópicos cobrindo arquitetura, agentes inteligentes, MCP, multi-bots, billing e deploy em produção.",
        icon: "🚀",
        tags: ["Vibe Coding", "SaaS", "IA", "Agentes", "Imersão"],
        url: "https://inematds.github.io/vibecode-imersao/"
    },
    {
        id: 34,
        title: "VISION",
        description: "Plataforma VISION - Visão computacional e processamento de imagens com IA.",
        icon: "👁️",
        tags: ["Visão", "IA", "Imagens"],
        url: "https://inematds.github.io/VISION/"
    },
    {
        id: 35,
        title: "VisionPro - Construção Audiovisual com IA",
        description: "Método Prático de Construção Audiovisual com IA - Crie conteúdo audiovisual profissional usando IA como colaborador criativo.",
        icon: "🎬",
        tags: ["Audiovisual", "IA", "Filmes", "Curtas", "Cinema"],
        url: "https://inematds.github.io/VisionPro"
    },
    {
        id: 36,
        title: "WebP - Designer 2026",
        description: "Web Presence na Era da IA - Aprenda a linguagem visual que as IAs entendem. Domine princípios de design para orientar IAs generativas.",
        icon: "🎨",
        tags: ["Design", "IA", "Web", "UI/UX", "2026"],
        url: "https://inematds.github.io/webp"
    }
];

// Histórico de atualizações recentes (mais recentes primeiro)
const updatesData = [
    { date: "2026-05-30", title: "Dominando o Opus 4.8", type: "novo", url: "https://inematds.github.io/opus48/curso/" },
    { date: "2026-05-26", title: "Agentic Básico", type: "novo", url: "https://inematds.github.io/agenticbasico/" },
    { date: "2026-05-26", title: "Understand Anything", type: "novo", url: "https://inematds.github.io/u-any/curso/" },
    { date: "2026-05-25", title: "OpenHuman Mastery", type: "novo", url: "https://inematds.github.io/openhuman/" },
    { date: "2026-05-25", title: "Karpathy Guidelines — 4 Princípios para Código Limpo com LLM", type: "novo", url: "https://inematds.github.io/akarpathy-skill/curso-pt/" },
    { date: "2026-05-25", title: "Skills For Real Engineers", type: "novo", url: "https://inematds.github.io/mp-skill/curso-skills/" },
    { date: "2026-05-25", title: "mkbook — Seu livro em 30 dias com Claude Code", type: "novo", url: "https://inematds.github.io/mkbook/" },
    { date: "2026-05-25", title: "MkBlogs — Publicação Multi-Plataforma", type: "novo", url: "https://inematds.github.io/mkblogs/" },
    { date: "2026-05-25", title: "AIOS — AI Agent Operating System", type: "novo", url: "https://inematds.github.io/aiosagi/" },
    { date: "2026-05-25", title: "Hermes Agent — Curso Completo Avançado", type: "novo", url: "https://inematds.github.io/hermesagent/" },
    { date: "2026-05-24", title: "Profissional 2027 — Implementadores de IA para PMEs", type: "novo", url: "https://inematds.github.io/profissional2027x" },
    { date: "2026-05-24", title: "PolySkills — Claude Code & Codex lado a lado", type: "novo", url: "https://inematds.github.io/polyskills" },
    { date: "2026-05-24", title: "Mapa do Cliente — Formação DICA", type: "novo", url: "https://inematds.github.io/mapacliente/" },
    { date: "2026-05-22", title: "Vendendo AIOS 2026", type: "novo", url: "https://inematds.github.io/vendasaios/" },
    { date: "2026-05-21", title: "WhatsApp Username & BSUID", type: "novo", url: "https://inematds.github.io/whatsapp-bsuid/" },
    { date: "2026-04-23", title: "CCMasterMemory - Memory Injection via Hooks", type: "novo", url: "https://inematds.github.io/ccmastermemory/" },
    { date: "2026-04-21", title: "CCTop - Mestre em Contexto e Tokens", type: "novo", url: "https://inematds.github.io/cctop/" },
    { date: "2026-04-21", title: "6 Chapeus + Anti-Ancora", type: "novo", url: "https://inematds.github.io/6chapeus/" },
    { date: "2026-04-20", title: "Opus 4.7 - Dominando o Claude Code", type: "novo", url: "https://inematds.github.io/opus47/" },
    { date: "2026-04-20", title: "Claude Design - Zero ao Expert", type: "novo", url: "https://inematds.github.io/claudedesign/" },
    { date: "2026-04-19", title: "Design + Video com IA (Hyperframes)", type: "novo", url: "https://inematds.github.io/cchyperframes/" },
    { date: "2026-04-13", title: "DeerFlow 2.0 - Framework de Agentes ByteDance", type: "novo", url: "https://inematds.github.io/deerflow/" },
    { date: "2026-04-13", title: "Seedance 2.0 Mastery - Video com IA", type: "novo", url: "https://inematds.github.io/seedance2/" },
    { date: "2026-04-12", title: "IAMed - Medico IA-Native", type: "novo", url: "https://inematds.github.io/IAMed/" },
    { date: "2026-04-11", title: "FPFilm - Crie Filmes com IA", type: "novo", url: "https://inematds.github.io/fpfilm1/" },
    { date: "2026-04-09", title: "2Cerebro - Segundo Cerebro com LLM + Obsidian", type: "novo", url: "https://inematds.github.io/2cerebro/" },
    { date: "2026-04-02", title: "Claude Code Deep Dive", type: "novo", url: "https://inematds.github.io/claudecode-manual/" },
    { date: "2026-04-01", title: "Por Dentro do Claude Code", type: "novo", url: "https://inematds.github.io/claudecode-estrutura/" },
    { date: "2026-03-19", title: "Vibe Coding Imersão - Do Zero ao SaaS", type: "novo", url: "https://inematds.github.io/vibecode-imersao/" },
    { date: "2026-03-19", title: "Enxames de Agentes de IA", type: "novo", url: "https://inematds.github.io/enxamesagentes/" },
    { date: "2026-03-03", title: "Agentic Engineering Masterclass", type: "novo", url: "https://inematds.github.io/agentic/" },
    { date: "2026-03-03", title: "Vibe Coding - Da Ideia ao Produto", type: "novo", url: "https://inematds.github.io/vibecode" },
    { date: "2026-02-24", title: "NotebookLM - Do Zero ao Avançado", type: "novo", url: "https://inematds.github.io/notebooklm" },
    { date: "2026-02-04", title: "Skills - Agent Skills Mastery", type: "novo", url: "https://inematds.github.io/skills" },
    { date: "2026-02-03", title: "FEP2 - Prompt Engineering Masterclass", type: "novo", url: "https://inematds.github.io/FEP2/" },
    { date: "2026-01-31", title: "CCGuide - Claude Code 2026", type: "novo", url: "https://inematds.github.io/ccguide2026" },
    { date: "2026-01-21", title: "WebP - Designer 2026", type: "novo", url: "https://inematds.github.io/webp" },
    { date: "2026-01-21", title: "AIWCF - Vibe Coding", type: "novo", url: "https://inematds.github.io/AIWCF" },
    { date: "2026-01-16", title: "GIPM - Projetos com IA Governada", type: "novo", url: "https://inematds.github.io/GIPM/" },
    { date: "2026-01-15", title: "VisionPro - Construção Audiovisual com IA", type: "atualizado", url: "https://inematds.github.io/VisionPro" },
    { date: "2026-01-14", title: "VisionPro - Construção Audiovisual com IA", type: "novo", url: "https://inematds.github.io/VisionPro" },
    { date: "2026-01-13", title: "FGMD - Gatilhos Mentais Digitais", type: "novo", url: "https://inematds.github.io/FGMD/" },
    { date: "2026-01-12", title: "MAKE - Automações", type: "novo", url: "https://inematds.github.io/MAKE/" },
    { date: "2026-01-10", title: "FEA-IA - Engenharia de Agentes", type: "atualizado", url: "https://inematds.github.io/FEA-IA/" },
    { date: "2026-01-08", title: "N8Nb - Fundamentos N8N", type: "atualizado", url: "https://inematds.github.io/N8Nb" },
    { date: "2026-01-05", title: "FEP - Engenharia de Prompts", type: "atualizado", url: "https://inematds.github.io/FEP/" },
    { date: "2026-01-03", title: "Dashboard Mastery", type: "atualizado", url: "https://inematds.github.io/dash/" },
    { date: "2025-12-28", title: "Playbook-IA - Formação de Consultoria IA", type: "novo", url: "https://inematds.github.io/Playbook-IA/" },
    { date: "2025-12-25", title: "SHIA - Super Humanos Inteligência Ampliada", type: "atualizado", url: "https://inematds.github.io/SHIA/" },
    { date: "2025-12-20", title: "FTH - Treinamento de Humanoides", type: "novo", url: "https://inematds.github.io/FTH/" },
    { date: "2025-12-18", title: "HG1 - Academia dos Humanoides G1", type: "atualizado", url: "https://inematds.github.io/HG1" },
    { date: "2025-12-15", title: "ATIA - Oportunidades Digitais com IA", type: "atualizado", url: "https://inematds.github.io/ATIA/" },
    { date: "2025-12-12", title: "FIA2026", type: "novo", url: "https://inematds.github.io/FIA2026/" },
    { date: "2025-12-10", title: "BMAD Academy", type: "atualizado", url: "https://inematds.github.io/BMAD-Academy/" },
    { date: "2025-12-08", title: "SuperProf", type: "novo", url: "https://inematds.github.io/SuperProf/" },
    { date: "2025-12-05", title: "TDS", type: "atualizado", url: "https://inematds.github.io/TDS/" },
    { date: "2025-12-01", title: "NanoBanana - SuperCurso Nano Banana", type: "novo", url: "https://inematds.github.io/NanoBanana/" }
];
