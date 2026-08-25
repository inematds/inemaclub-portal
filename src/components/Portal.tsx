'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { platformsData, updatesData, projectUpdatesData, type Course } from '@/data/courses'

interface VisitStats {
  total: number
  uniqueLogged: number
  uniqueAnon: number
}

const communityProjects: Array<{
  icon: string
  name: string
  desc: string
  url?: string
  badge?: string
}> = [
  { icon: "🧭", name: "ai-assistant-decision-kit", desc: "Kit de decisão (MIT, Mark Kashef) traduzido para pt-BR: compara assistentes de IA por modelo operacional antes da marca — entrevista, pesquisa datada, teste reversível e piloto de 7 dias.", url: "https://inematds.github.io/ai-assistant-decision-kit/guia/", badge: "Guia" },
  { icon: '🧭', name: 'agenteexecuta', desc: "Skill que decide entre sequência, paralelismo ou fluxo híbrido antes de criar agentes — portão de proporcionalidade, matriz de decisão com limiar…", url: 'https://inematds.github.io/agenteexecuta/guia/', badge: 'Guia' },
  { icon: '🅰️', name: 'agnesfree', desc: "Guia e análise da Agnes AI (Sapiens AI): API multimodal compatível com OpenAI com texto, imagem e vídeo gratuitos — modelos, limites, planos pagos,…", url: 'https://inematds.github.io/agnesfree/guia/', badge: 'Guia' },
  { icon: '📡', name: 'aiv2026', desc: "Playbook de 5 fases para tornar empresas encontráveis e citáveis por IAs públicas (ChatGPT, Claude, Gemini, Perplexity), com o case completo do cliente-zero INEMA.", url: 'https://inematds.github.io/aiv2026/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'analisevideo', desc: "Analise visual e cinematografica de video com Gemini: camera bloco a bloco, luz e paleta, ritmo de montagem, trilha e som, grafismo e um passo a passo de como refazer — arquivado num banco local pesquisavel.", url: 'https://inematds.github.io/analisevideo/guia/', badge: 'Guia' },
  { icon: '🧹', name: 'audit-ablacaocc', desc: "Skill de diagnóstico que audita CLAUDE.md, skills e hooks do Claude Code pelo método de ablação do Boris Cherny: classifica cada instrução, propõe a versão mínima e um plano de teste A/B/C — sem alterar nenhum arquivo.", url: 'https://inematds.github.io/audit-ablacaocc/guia/', badge: 'Guia' },
  { icon: '🎛️', name: 'bench-studio-br', desc: "Bench Studio em português: as mesmas 73 rotas em 5 provedores, com interface bilíngue pt-BR/en, quadro inicial e final como dois seletores nomeados nos modelos que aceitam keyframes, orçamento que se recusa a inventar total quando a unidade não é previsível, e acesso remoto num comando (senha antes da porta, API sempre em loopback).", url: 'https://inematds.github.io/bench-studio-br/guia/', badge: 'Guia' },
  { icon: '🎛️', name: 'bench-studio-en', desc: "Continuação do Bench Studio com 73 rotas de imagem e vídeo em 5 provedores (fal, Kling, Agnes, kie e servidor local) atrás de um contrato só: custo em dólar, crédito ou zero conforme quem cobra, tela de configuração que nunca mostra a chave e senha opcional.", url: 'https://inematds.github.io/bench-studio-en/guia/', badge: 'Guia' },
  { icon: '🎛️', name: 'bench-studio-public', desc: "Edição original, de um provedor só: estúdio criativo local-first para imagem, vídeo, site e PDF, com 37 rotas de modelo curadas, refino de prompt editável antes de gastar, arquivos espelhados em disco e ledger de custo — também via MCP para Claude, Codex e Cursor.", url: 'https://inematds.github.io/bench-studio-public/guia/', badge: 'Guia' },
  { icon: '🌐', name: 'cf-dns', desc: "CLI de um arquivo em Python puro para criar, listar e apagar registros DNS no Cloudflare pela API — inclui o par CNAME + TXT que o Vercel exige para verificar um subdomínio novo.", url: 'https://inematds.github.io/cf-dns/guia/', badge: 'Guia' },
  { icon: '🦷', name: 'criaagentes', desc: "Estudo de caso completo de um OS agêntico para a recepção de uma clínica odontológica no WhatsApp, construído camada por camada com a skill…", url: 'https://inematds.github.io/criaagentes/guia/', badge: 'Guia' },
  { icon: '🧭', name: 'dsh-orchestrator', desc: 'Orquestrador local para executar DSH, Codex CLI e Claude Code com sessões tmux, GitHub CLI e worktrees isolados.', url: 'https://inematds.github.io/dsh-orchestrator/guia/', badge: 'Guia' },
  { icon: '🤖', name: 'inemaccbot', desc: "Bot de Telegram com fila durável em SQLite que roda skills de uma etapa e fluxos de várias fases com estado, portão humano e retomada depois de queda — domínio novo entra sem uma linha de código.", url: 'https://inematds.github.io/inemaccbot/guia/', badge: 'Guia' },
  { icon: '⬇️', name: 'inemadlp', desc: "Downloader pessoal de vídeo e áudio que roda na sua VPS: você cola o link pelo celular, o yt-dlp baixa e devolve o arquivo, que se apaga sozinho depois de 6 horas.", url: 'https://inematds.github.io/inemadlp/guia/', badge: 'Guia' },
  { icon: '🎵', name: 'musicaclone', desc: "CLI que clona ou cria música via Suno (API do Kie): entende o estilo do link, checa se é mesmo música e se a letra está completa, e só gera depois do seu ok — com o custo medido de verdade.", url: 'https://inematds.github.io/musicaclone/guia/', badge: 'Guia' },
  { icon: '🎛️', name: 'maestro-roteador', desc: "Skill de Claude Code que decide qual modelo (haiku/sonnet/opus/fable) e quanto esforço (low→max) cada parte do trabalho merece antes de despachar subagentes ou workflows.", url: 'https://inematds.github.io/maestro-roteador/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'musicavideo', desc: "Uma frase vira música, capa e clipe: o plano das três partes é escrito e aprovado antes de qualquer centavo sair, com portão em cada artefato, decupagem que cobre a faixa inteira e provedores plugáveis — capa e vídeo de graça, só a música custa.", url: 'https://inematds.github.io/musicavideo/guia/', badge: 'Guia' },
  { icon: '⚡', name: 'nvidiaapifree', desc: "Acesso gratuito a 100+ modelos NVIDIA NIM (Llama, DeepSeek, Qwen, Mistral, Vision) via API OpenAI-compatible.", url: 'https://inematds.github.io/nvidiaapifree/guia/', badge: 'Guia' },
  { icon: '🚪', name: 'portaflow', desc: "Máquina de vendas B2B de portas internas no WhatsApp: a IA qualifica o lead, um motor determinístico calcula o orçamento no catálogo real (o modelo nunca inventa preço) e o Pix fecha o pedido.", url: 'https://inematds.github.io/portaflow/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'promoavatar', desc: "Fluxo do inemaccbot que transforma um assunto em um reel de divulgação para cada um dos 12 públicos: o bot escreve os roteiros e PARA, você grava os avatares no HeyGen, ele monta e entrega em cada canal.", url: 'https://inematds.github.io/promoavatar/guia/', badge: 'Guia' },
  { icon: '🎯', name: 'promoavatar3', desc: "Três vídeos por público em vez de um — alcance, autoridade e promocional como funções diferentes (36 alvos), com portão humano antes de qualquer render.", url: 'https://inematds.github.io/promoavatar3/guia/', badge: 'Guia' },
  { icon: '⚔️', name: 'promptwargame', desc: "Prompt reutilizável (EN + PT-BR) que transforma o planejamento de um build de IA num war game: fases com suposição otimista/pessimista, modos de…", url: 'https://inematds.github.io/promptwargame/guia/', badge: 'Guia' },
  { icon: '⛏️', name: 'prospector-agent', desc: "Esteira semi-autônoma que descobre negócios bem avaliados com site ruim, redesenha a página, publica no GitHub Pages e envia a proposta —…", url: 'https://inematds.github.io/prospector-agent/guia/', badge: 'Guia' },
  { icon: '⚙️', name: 'stickshift', desc: "App de menu-bar e CLI para macOS que troca o modelo e o effort do Claude Code ou Codex CLI na pane de terminal focada, digitando os mesmos comandos…", url: 'https://inematds.github.io/stickshift/guia/', badge: 'Guia' },
  { icon: '🖱️', name: 'video-demonstrativo', desc: "Skill (Claude Code) que transforma o link de uma aplicação web num vídeo de demonstração narrado.", url: 'https://inematds.github.io/video-demonstrativo/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'video-explicativo', desc: "Skill (Claude Code) que cria vídeos explicativos completos em PT-BR (HTML→MP4 via HyperFrames) a partir de um assunto: roteiro, narração TTS local,…", url: 'https://inematds.github.io/video-explicativo/guia/', badge: 'Guia' },
  { icon: '🌊', name: 'video-making-of-skill', desc: "Uma foto vira maquete dentro de um rig de efeitos práticos de estúdio e a simulação destrói a maquete em plano único de bastidores — receitas medidas para Kling e Agnes.", url: 'https://inematds.github.io/video-making-of-skill/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'videoanima', desc: "Pipeline que transforma uma história em decupagem cinematográfica, keyframes A/B, clipes e filme vertical narrado — provedor de imagem e de vídeo escolhível por parâmetro.", url: 'https://inematds.github.io/videoanima-skill/guia/', badge: 'Guia' },
  { icon: '🏭', name: 'videoprodutor', desc: "Skill (Claude Code) que orquestra link/fonte → plano + execução de um vídeo profissional (propaganda ou explicativo), ponta a ponta.", url: 'https://inematds.github.io/videoprodutor/guia/', badge: 'Guia' },
  { icon: '🏥', name: 'hosp360', desc: "Hosp360 (CRMHosp): base técnica inicial de um portal de autoatendimento do paciente — Next.js + NestJS + PostgreSQL + Keycloak, pronta para rodar local via Docker Compose.", url: 'https://inematds.github.io/hosp360/guia/', badge: 'Guia' },
  { icon: '🏠', name: 'imob360', desc: "Imob360: sistema completo de gestão imobiliária para pequenas e médias imobiliárias — imóveis, CRM de leads, contratos, visitas e módulos opcionais…", url: 'https://inematds.github.io/imob360/guia/', badge: 'Guia' },
  { icon: '🎞️', name: 'inemafilme', desc: "inemafilme: sistema que transforma um assunto ou roteiro num filme/episódio narrado, motor pixflow (parallax 2.5D determinístico), sem IA de vídeo.", url: 'https://inematds.github.io/inemafilme/guia/', badge: 'Guia' },
  { icon: '🌙', name: 'kimicodecc', desc: "Skill do Claude Code que abre um terminal novo rodando o harness completo em Kimi K3 (Moonshot AI) via OpenRouter, por ~1/3 do custo, sem tocar na sessão atual nem nas configurações globais.", url: 'https://inematds.github.io/kimicodecc/guia/', badge: 'Guia' },
  { icon: '📋', name: 'logfree', desc: "LogFree: API FastAPI + bot Telegram que indica o posto com melhor custo real por km para frotas de última milha.", url: 'https://inematds.github.io/logfree/guia/', badge: 'Guia' },
  { icon: '🧩', name: 'my-inema', desc: "Andaime: plataforma pedagógica com IA socrática.", url: 'https://inematds.github.io/my-inema/guia/', badge: 'Guia' },
  { icon: '🧩', name: 'n8n-maker', desc: "Sete skills que ensinam o Claude Code a desenhar, configurar, validar e depurar workflows do n8n — padrões de arquitetura, configuração de nodes, expressões, Code node em JS/Python e as ferramentas do MCP n8n-mcp.", url: 'https://inematds.github.io/n8n-maker/guia/', badge: 'Guia' },
  { icon: '🔗', name: 'n8n-ps', desc: "Framework de skills que dá ao Claude expertise para construir, validar e implantar workflows n8n em produção, direto no Claude Code.", url: 'https://inematds.github.io/n8n-ps/guia/', badge: 'Guia' },
  { icon: '🖥️', name: 'ODS', desc: "Servidor de IA privado com um comando: inferência local, chat, dashboard, voz, agentes, workflows, RAG e geração de imagem no seu próprio hardware (Linux, Windows, macOS).", url: 'https://inematds.github.io/ODS/guia/', badge: 'Guia' },
  { icon: '👁️', name: 'occio-agentes', desc: "Occio Agentes: plataforma de orquestração de agentes de IA para pequenas e médias empresas brasileiras, inspirada no Accio Work.", url: 'https://inematds.github.io/occio-agentes/guia/', badge: 'Guia' },
  { icon: '🎧', name: 'rAgentic-cs', desc: "Controle Claude Code e Codex remotamente pelo Telegram ou GitHub, com sessões persistentes em Docker, clone de repositórios e comandos versionados no seu próprio codebase.", url: 'https://inematds.github.io/rAgentic-cs/guia/', badge: 'Guia' },
  { icon: '🧠', name: 'skillmanager3x', desc: "Três skills de gestão de sessão para o Claude Code (PT/EN): handoff antes do /clear, checkpoint durante o trabalho e auditoria da memória do projeto.", url: 'https://inematds.github.io/skillmanager3x/guia/', badge: 'Guia' },
  { icon: '📣', name: 'skillmktv4', desc: "SkillMKT v4 empacota 6 skills de marketing (criativos, páginas, reels, lançamento pago, mensageria, design) em arquivos .skill prontos pra instalar e distribuir.", url: 'https://inematds.github.io/skillmktv4/guia/', badge: 'Guia' },
  { icon: '🎞️', name: 'scroll-film-studio', desc: "Skill para criar sites cinematográficos contínuos controlados pelo scroll, com motion em código ou footage gerado.", url: 'https://inematds.github.io/scroll-film-studio/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'scrollcraft', desc: "Plugin do Claude Code (main-design) que constrói páginas scroll-driven premium — scroll vira timeline, gramáticas de página exclusivas por build, e verificação automática de contraste, motion morto e clipes travados.", url: 'https://inematds.github.io/scroll-craft/guia/', badge: 'Guia' },
  { icon: '🏗️', name: 'vsvideo-skill', desc: "Skill que transforma uma foto de interior finalizado em vídeo time-lapse de reforma: gera o 'antes da obra' com GPT Image (mesma câmera e arquitetura) e o vídeo antes→depois com Higgsfield Seedance 2.0 Mini.", url: 'https://inematds.github.io/vsvideo-skill/guia/', badge: 'Guia' },
  { icon: '🎥', name: 'VideosDGX2', desc: "Stack de geração de vídeo com Wan 2.2 + ComfyUI rodando local no NVIDIA DGX Spark, com interface web e fila de jobs.", url: 'https://inematds.github.io/VideosDGX2/guia/', badge: 'Guia' },
  { icon: '🌐', name: 'web-AG01', desc: "Protótipo React/Vite da landing do INEMA.Club: apresentação, diagnóstico de IA (mockado) e planos, rodando 100% em modo demo, sem backend configurado.", url: 'https://inematds.github.io/web-AG01/guia/', badge: 'Guia' },
  { icon: '🌱', name: 'eve', desc: 'Framework filesystem-first para agentes de IA duráveis: instruções, tools, skills, canais e schedules são arquivos numa pasta — o eve compila e roda (fork/estudo do projeto da Vercel)', url: 'https://inematds.github.io/eve/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'videos-agnes', desc: 'Transforma uma história em filme animado narrado via API Agnes AI (imagens, vídeo keyframe A→B e narração local), custo US$ 0 — inclui as skills videos-agnes e imagens-agnes', url: 'https://inematds.github.io/videos-agnes/guia/', badge: 'Guia' },
  { icon: '🎮', name: 'eai.inema.club', desc: 'Plataforma de jogos + educação (arcade, educacional, profissional) em Next.js 16', url: 'https://inematds.github.io/eai-guia/', badge: 'Guia' },
  { icon: '🗣️', name: 'heygenmcp', desc: 'Skills de Claude Code que viram roteiro em vídeo de avatar falante no HeyGen, com custo real medido', url: 'https://inematds.github.io/heygenmcp/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'klingaimcp', desc: 'Kling AI por MCP e CLI: vídeos e imagens por comando, automação de pipeline e dublagem com voz clonada', url: 'https://inematds.github.io/klingaimcp/guia/', badge: 'Guia' },
  { icon: '🐾', name: 'pet360', desc: 'SaaS open source e multi-tenant para clínicas vet, pet shops, hotéis e ONGs', url: 'https://inematds.github.io/pet360/', badge: 'Guia' },
  { icon: '💄', name: 'bela360', desc: 'SaaS de gestão para salões, barbearias e clínicas de estética com WhatsApp', url: 'https://inematds.github.io/bela360/', badge: 'Guia' },
  { icon: '📖', name: 'animabook', desc: 'Plataforma web mobile-first para criar, publicar e ler quadrinhos animados', url: 'https://inematds.github.io/animabook/', badge: 'Guia' },
  { icon: '📕', name: 'book-genesis', desc: 'Criacao de livros com IA', url: 'https://github.com/PhilipStark/book-genesis', badge: 'GitHub' },
  { icon: '🎤', name: 'inemavox', desc: 'Suíte de voz com IA local: dubla, transcreve, corta e baixa vídeos na GPU', url: 'https://inematds.github.io/inemavox/', badge: 'Guia' },
  { icon: '🤖', name: 'inemaccvbot', desc: 'Bot de Telegram que vira fila de vídeos: uma instrução por linha, pesquisa web, transcrição do áudio de origem, narração em texto e entrega na pasta certa', url: 'https://inematds.github.io/inemaccvbot/guia/', badge: 'Guia' },
  { icon: '🔑', name: 'zocomputer-dicas', desc: 'Guia + scripts prontos para acessar o Zo Computer via SSH: por que IP direto não funciona, serviço TCP (túnel), autorizar chave e subir o sshd na porta 22.', url: 'https://inematds.github.io/zocomputer-dicas/guia/', badge: 'Guia' },
  { icon: '🎙️', name: 'dublar pro', desc: 'Pipeline de vídeo com IA: baixa, transcreve, traduz, dubla e corta vídeos', url: 'https://inematds.github.io/dublarv5/', badge: 'Guia' },
  { icon: '🧠', name: 'intelecto', desc: 'Assistente de IA pessoal em Python: Telegram, memória SQLite, OpenRouter/Ollama', url: 'https://inematds.github.io/intelecto-guia/', badge: 'Guia' },
  { icon: '💊', name: 'antidote', desc: 'Assistente de IA pessoal em Python, o antídoto contra frameworks inchados', url: 'https://inematds.github.io/antidote-guia/', badge: 'Guia' },
  { icon: '🛡️', name: 'seg360', desc: 'Marketplace BR de seguros contra calamidades: risco por CEP e cotação online', url: 'https://inematds.github.io/seg360/', badge: 'Guia' },
  { icon: '🏢', name: 'erpsb', desc: 'ERP SaaS mobile-first para MEIs e microempresas: PIX, WhatsApp e dashboard semáforo', url: 'https://inematds.github.io/ERPsb/', badge: 'Guia' },
  { icon: '🇪🇸', name: 'hola', desc: 'Plataforma de espanhol 100% para crianças de 6 a 12 anos, alinhada à BNCC', url: 'https://inematds.github.io/hola/', badge: 'Guia' },
  { icon: '🚚', name: 'rotaX1', desc: 'Entregas de última milha por nicho (vet), com rastreamento em tempo real e PIX', url: 'https://inematds.github.io/RotaX1/', badge: 'Guia' },
  { icon: '🔧', name: 'rf360', desc: 'Marketplace de técnicos de eletrônica com orçamento automático via WhatsApp', url: 'https://inematds.github.io/RF360/', badge: 'Guia' },
  { icon: '🌤️', name: 'aclima', desc: 'Dashboard realtime de chuvas e alertas com dados do INMET e notificações multicanal', url: 'https://inematds.github.io/aclima/', badge: 'Guia' },
  { icon: '📚', name: 'eboo-maker', desc: 'Gera eBooks profissionais em PDF com capa por IA, 3 layouts e Claude Code', url: 'https://inematds.github.io/ebook-maker/', badge: 'Guia' },
  { icon: '⚡', name: 'megaRAG', desc: 'RAG multimodal: converse com PDF, planilhas, imagens, vídeo e áudio', url: 'https://inematds.github.io/MegaRAG/', badge: 'Guia' },
  { icon: '🍔', name: 'Restaurante Brutal', desc: 'Sistema completo para restaurante' },
  { icon: '🏋️', name: 'inema academia', desc: 'Plataforma educacional BNCC (6º-9º ano) com gamificação, painéis e tutor IA', url: 'https://inematds.github.io/inemaacademia/', badge: 'Guia' },
  { icon: '📱', name: 'redessociais', desc: 'Publica e agenda em 6 redes via scripts Node sobre o Postiz self-hosted', url: 'https://inematds.github.io/redessociais/', badge: 'Guia' },
  { icon: '📲', name: 'redessociais2026', desc: 'Publisher próprio (worker TS + Supabase) p/ Instagram e TikTok, mais Chatwoot', url: 'https://inematds.github.io/redessociais2026/', badge: 'Guia' },
  { icon: '🔍', name: 'deepsearchagent', desc: 'Agente de pesquisa profunda em Python com Tavily, reflexão e saída Markdown', url: 'https://inematds.github.io/deepsearchagent/', badge: 'Guia' },
  { icon: '📈', name: 'timesmkt3', desc: 'Fábrica de conteúdo de marketing com agentes de IA orquestrados por bot Telegram', url: 'https://inematds.github.io/timesmkt3/', badge: 'Guia' },
  { icon: '🎥', name: 'aisf', desc: 'Fork do SkyReels V3 com Web UI para gerar episódios de vídeo em batch', url: 'https://inematds.github.io/aisf/', badge: 'Guia' },
  { icon: '🐟', name: 'BettaFish', desc: 'Análise de opinião pública multi-agente (fork BR/LATAM) que vira relatório', url: 'https://inematds.github.io/BettaFish/', badge: 'Guia' },
  { icon: '🌊', name: 'MiroFish', desc: 'Motor de previsão por inteligência de enxame: simula agentes em redes sociais', url: 'https://inematds.github.io/mirofish/', badge: 'Guia' },
  { icon: '🎬', name: 'diretor-animacao', desc: 'Imagens prontas + narração viram filme MP4 pro, sem IA de vídeo (render via pixflow)', url: 'https://inematds.github.io/diretor-animacao-guia/', badge: 'Guia' },
  { icon: '🧪', name: 'intelecto-testes', desc: 'Agente de IA no WhatsApp via Evolution API + OpenRouter, sobe em Docker', url: 'https://inematds.github.io/intelecto-testes/', badge: 'Guia' },
  { icon: '📚', name: 'okf', desc: 'Open Knowledge Format: formato aberto e vendor-neutral que representa conhecimento como markdown + YAML frontmatter, em bundles versionáveis em git, com agente de referência em Python e visualizador de grafo.', url: 'https://inematds.github.io/okf/guia/', badge: 'Guia' },
  { icon: '🎨', name: 'open-design', desc: 'Alternativa open-source ao Claude Design: sua CLI de agente vira o motor de design', url: 'https://inematds.github.io/open-design/', badge: 'Guia' },  { icon: '📺', name: 'yt-pub-livesx', desc: 'Corta lives do YouTube em clips por tópico com IA e republica em outro canal', url: 'https://inematds.github.io/yt-pub-livesx/', badge: 'Guia' },
  { icon: '🎬', name: 'VideosDGX', desc: 'Docker multi-container para 4 Video LLMs (LTX-2, Wan 2.1, MAGI-1, Waver) no DGX Spark', url: 'https://inematds.github.io/VideosDGX/', badge: 'Guia' },
  { icon: '🌌', name: 'skyreelsv3', desc: 'Fork do SkyReels V3 com Web UI: filas de episódios, talking avatar e import em batch', url: 'https://inematds.github.io/skyreelsv3/', badge: 'Guia' },
  { icon: '🖼️', name: 'inemaimg', desc: 'Servidor local multi-modelo de imagens com hot-swap entre Qwen-Edit, FLUX.2 e ERNIE', url: 'https://inematds.github.io/inemaimg/', badge: 'Guia' },
  { icon: '📝', name: 'mkblogs', desc: 'Publicação multi-plataforma open-source com Postiz self-hosted e APIs', url: 'https://inematds.github.io/mkblogs-guia/', badge: 'Guia' },
  { icon: '🧬', name: 'openhuman', desc: 'Assistente de IA agêntico open-source, local-first, com 118+ integrações OAuth', url: 'https://inematds.github.io/openhuman-guia/', badge: 'Guia' },
  { icon: '🪽', name: 'Claude OS', desc: 'Dashboard local do Claude Code + Hermes (Dream, Mission Control e assistente Hermes)', url: 'https://inematds.github.io/claude-hermes-os/', badge: 'Guia' },
  { icon: '🎬', name: 'recursos de vídeo', desc: 'Catálogo-guia dos 44 projetos do ecossistema INEMA para gerar e processar vídeo e imagem, em 7 caminhos — com o guia de cada um e o que já foi medido em produção', url: 'https://inematds.github.io/recursos-video/', badge: 'Guia' },
  { icon: '🧠', name: '3cerebros', desc: 'Motor de memória com 3 cérebros (Projeto/Self/Conhecimento), isolado e embutível por qualquer agente. SQLite FTS5 + política de automação.', url: 'https://inematds.github.io/3cerebros/', badge: 'Guia' },
  { icon: '🤖', name: 'iAmasters OS', desc: 'Sistema operativo agêntico para operadores de IA — engine Sinapsis v4.5, brand context, multi-cliente, memória que evolui.', url: 'https://inematds.github.io/iamasters-os/', badge: 'Guia' },
  { icon: '🧠', name: 'Infinite Brain OS', desc: 'Sistema operacional de conhecimento para negócios com IA: git-backed, plain-text, namespaces com promoção operada, sem lock-in.', url: 'https://inematds.github.io/infinite-brain-os/guia/', badge: 'Guia' },
  { icon: '🎬', name: 'videoprodutor', desc: 'Orquestrador link/assunto → vídeo profissional (3 camadas): planejamento, direção+imagem, voz+render. Preset propaganda e explicativo, 16:9 e 9:16.', url: 'https://inematds.github.io/videoprodutor/', badge: 'Guia' },
  { icon: '🎞️', name: 'mcp-video', desc: 'Servidor MCP de edição de vídeo com guardrails para agentes de IA — 119 ferramentas: FFmpeg, legendas, áudio, efeitos, HyperFrames e validação preflight.', url: 'https://inematds.github.io/mcp-video/', badge: 'Guia' },
  { icon: '🚀', name: 'inemaupsk', desc: 'Servidor de upscaling 4x (super-resolution) com 4 modelos ESRGAN, API HTTP e UI web. Local, rápido, sem limite de chamadas.', url: 'https://inematds.github.io/inemaupsk/', badge: 'Guia' },
  { icon: '🎬', name: 'fontefilm', desc: 'Ferramenta de direção de cinema com IA para filmes em quadrinhos — storyboard, prompts e linguagem visual.', url: 'https://inematds.github.io/fontefilm/', badge: 'Guia' },
  { icon: '🧭', name: 'O Caminho Certo da IA', desc: 'Manifesto de qualificação real em IA: usar IA de verdade e desenvolver o que a IA não substitui, com dados verificados (Gartner, MIT, WEF)', url: 'https://inematds.github.io/caminho-certo-da-ia-guia/', badge: 'Guia' },
  { icon: '🔬', name: 'inemathink', desc: 'Laboratório de pesquisa por trás de O Caminho Certo da IA: deep research verificado, manifesto, curso e gráficos de IA/humanoides 2019-2030', url: 'https://inematds.github.io/inemathink/', badge: 'Guia' },
  { icon: '🧩', name: 'cerebro-inema', desc: 'Segundo cérebro de IA com 3 cérebros (Projeto, Self, Conhecimento) em PT-BR, local e privado: Obsidian + Claude Code', url: 'https://inematds.github.io/cerebro-inema/', badge: 'Guia' },
  { icon: '👁️', name: 'claude-watch', desc: 'Skill /watch: cola uma URL ou arquivo e o Claude baixa, extrai frames por cena, transcreve e emite um report.md (auto-save no Obsidian)', url: 'https://inematds.github.io/claude-watch/', badge: 'Guia' },
  { icon: '🌦️', name: 'clima-skill', desc: 'Skill do Claude que consulta e interpreta clima atual, previsão, qualidade do ar, UV/pólen, condições marítimas, vazão de rios e histórico via Open-Meteo — sem chave de API', url: 'https://inematds.github.io/clima-skill/guia/', badge: 'Guia' },
  { icon: '🎛️', name: 'generator-skill', desc: 'Skill /generate em duas versões — uma que roda modelo local na GPU (custo zero) e outra 100% por API, com portão de custo, livro-caixa e o prompt guardado ao lado de cada arquivo', url: 'https://inematds.github.io/generator-skill/guia/', badge: 'Guia' },
  { icon: '🪐', name: 'gravityclaw', desc: 'Agente Telegram com loop agêntico construído do zero — lean e seguro — com hub de recursos e gerador de prompts por features', url: 'https://inematds.github.io/gravityclaw/', badge: 'Guia' },
  { icon: '💥', name: 'inemaref', desc: 'Fábrica de conteúdo a partir de uma referência real: foto/história → ficha de personagem → página de HQ → motion comic narrado, local e determinístico', url: 'https://inematds.github.io/inemaref/', badge: 'Guia' },
  { icon: '🎥', name: 'mdd', desc: 'Mestre de Direção Dinâmica: transforma qualquer assunto num pacote completo de direção de vídeo pronto pra Seedance, Kling, Runway, Veo ou Luma', url: 'https://inematds.github.io/mdd/', badge: 'Guia' },
  { icon: '📋', name: 'video-plan-editor', desc: 'Skill + pacote Python (vpe) que transforma um assunto ou link num plano de edição de vídeo estruturado e renderer-agnóstico, com render via HyperFrames', url: 'https://inematds.github.io/skill-video-plan-editor/', badge: 'Guia' },
  { icon: '🎬', name: 'VideosAvatar', desc: 'Avatar falante no HeyGen a partir de um roteiro (9:16, 720p, voz PT-BR) entregue no bot do openpcbot — dois caminhos de crédito: API pay-as-you-go (heygen-cli) e assinatura via MCP (heygen-mcp)', url: 'https://inematds.github.io/videosavatar/', badge: 'Guia' },
  { icon: '🏗️', name: 'inema engenharia civil', desc: 'Plataforma de agentes de IA para cálculos de engenharia civil: o agente escolhe o método normativo e o Python calcula, valida (unidades/física/NBR/equilíbrio) e gera o memorial. 18 domínios, com aviso de responsabilidade técnica (ART).', url: 'https://inematds.github.io/inemaengenhariacivil/', badge: 'Guia' },
  { icon: '🧭', name: 'os-agentes', desc: 'Skill /os-agentes que guia uma pessoa não técnica na construção do próprio OS agêntico de 6 camadas, uma de cada vez, com memória entre sessões e auditoria por objetivo. Base do curso AIOS do INEMA.', url: 'https://inematds.github.io/os-agentes/guia/', badge: 'Guia' },
  { icon: '🩺', name: 'Health OS', desc: 'Blueprint de um coach de saúde pessoal com IA no Telegram: Supabase próprio + WHOOP, fundamentado nos seus exames, genética e metas. Não é aconselhamento médico.', url: 'https://inematds.github.io/health-os/', badge: 'Guia' },
  { icon: "🩺", name: "bs-benchmark", desc: "BullshitBench: benchmark que mede se LLMs detectam e apontam premissas absurdas em perguntas técnicas, com visualizador público.", url: "https://inematds.github.io/bs-benchmark/", badge: "Guia" },
  { icon: "🎬", name: "my-inema", desc: "Andaime: plataforma pedagógica com IA socrática (livros ilustrados, tutor de matemática e filmes) para sala de aula.", url: "https://github.com/inematds/my-inema", badge: "GitHub" },
  { icon: "🩺", name: "hosp360", desc: "CRMHosp: base técnica inicial de um módulo de autoatendimento de paciente (portal Next.js + API NestJS), em desenvolvimento.", url: "https://github.com/inematds/hosp360", badge: "GitHub" },
  { icon: "🌐", name: "websitebuilder", desc: "Ferramenta web que gera, em 5 passos, um prompt otimizado para builders de IA (Lovable, Bolt, v0) criarem um site.", url: "https://inematds.github.io/websitebuilder/", badge: "Guia" },
  { icon: "🤖", name: "docker-moltbot", desc: "Setup Docker pronto e reforçado em segurança para rodar o Moltbot, assistente de IA pessoal multi-canal.", url: "https://github.com/inematds/docker-moltbot", badge: "GitHub" },
  { icon: "🤖", name: "agent-browser", desc: "CLI de automação de navegador headless para agentes de IA (Rust com fallback Node.js).", url: "https://github.com/inematds/agent-browser", badge: "GitHub" },
  { icon: "🧩", name: "DocumentosMarcas", desc: "Coleção de skills do Claude Code para gerar e estilizar documentos (DOCX/PDF/XLSX/PPTX) com temas de marcas premium.", url: "https://github.com/inematds/DocumentosMarcas", badge: "GitHub" },
  { icon: "💰", name: "APIPXINTER", desc: "Simulador local da API Pix do Banco Inter, com cobranças, QR Code, webhook e interface web, sem conta real.", url: "https://github.com/inematds/APIPXINTER", badge: "GitHub" },
  { icon: "🧩", name: "formato-curso-v2", desc: "Skill/template para gerar páginas de curso INEMA.CLUB com camada de aprendizagem (progresso, dúvidas, anotações, temas) — self-contained.", url: "https://inematds.github.io/formato-curso-v2/", badge: "Guia" },
  { icon: "🎬", name: "mkvideos", desc: "Factory de vídeos (reels/narrativos) a partir de imagens IA + motion cinematográfico via ffmpeg, com TTS e geração de imagem externos.", url: "https://github.com/inematds/mkvideos", badge: "GitHub" },
  { icon: "🎬", name: "skillmktv4", desc: "Empacota skills de marketing (criativos, páginas, reels, lançamento, mensageria) em arquivos .skill para distribuição.", url: "https://github.com/inematds/skillmktv4", badge: "GitHub" },
  { icon: "🤖", name: "timesmkt2", desc: "ITAGMKT — pipeline de agentes de IA para marketing digital (pesquisa, criação, vídeo, publicação multi-plataforma) via bot Telegram.", url: "https://github.com/inematds/timesmkt2", badge: "GitHub" },
  { icon: "📊", name: "tktk-sync", desc: "Scheduler Python para sync/analyze/publish de conteúdo no TikTok, com dashboard web e configuração via planilha.", url: "https://github.com/inematds/tktk-sync", badge: "GitHub" },
  { icon: "📦", name: "animabooksf", desc: "Plataforma web (Next.js/Vercel) para crianças criarem e lerem histórias interativas com personagens animados e cenários.", url: "https://github.com/inematds/animabooksf", badge: "GitHub" },
  { icon: "🤖", name: "docker-clawdbot", desc: "Setup Docker com hardening de segurança para o Clawdbot (assistente de IA pessoal via Telegram, em migração para Moltbot).", url: "https://github.com/inematds/docker-clawdbot", badge: "GitHub" },
  { icon: "📄", name: "MSFilesAStd", desc: "Scripts Python para gerar documentos Word, Excel, PowerPoint e PDF via LLM ou standalone; roda independente, requer configurar APIs.", url: "https://github.com/inematds/MSFilesAStd", badge: "GitHub" },
  { icon: "📄", name: "ai-strategy-factory", desc: "App Flask que gera pacote de estratégia de IA (15 documentos, diagramas, apresentação) para uma empresa via APIs Perplexity e Gemini.", url: "https://github.com/inematds/ai-strategy-factory", badge: "GitHub" },
  { icon: "🎬", name: "dublar", desc: "Sistema de dublagem automática de vídeos: transcrição (Whisper), tradução e síntese de voz (Bark/Coqui TTS), com sincronização.", url: "https://github.com/inematds/dublar", badge: "GitHub" },
  { icon: "🎬", name: "inemafilme", desc: "Sistema de filme/episódio narrado (contrato historia + roteiro, motor pixflow, sem IA de vídeo).", url: "https://github.com/inematds/inemafilme", badge: "GitHub" },
  { icon: "🎙️", name: "promptprof", desc: "Pipeline de prompts (KairoBoost): transforma intenção em prompt cinematográfico e gera vídeos com imagens e narração TTS.", url: "https://inematds.github.io/promptprof/", badge: "Guia" },
  { icon: "🤖", name: "imkt4", desc: "timesmkt3: pipeline de agentes de IA (bot Telegram) que pesquisa, cria narrativa, gera imagens/vídeos e publica conteúdo de marketing.", url: "https://github.com/inematds/imkt4", badge: "GitHub" },
  { icon: "📦", name: "hyperframes", desc: "Hyperframes Editor (Student Edition): workbench HTML+GSAP com 12 projetos de vídeo prontos para estudar, editar e re-renderizar.", url: "https://github.com/inematds/hyperframes", badge: "GitHub" },
  { icon: "🤖", name: "claw-code", desc: "Reescrita experimental (Python/Rust) de um harness de agente estilo Claude Code, não afiliada à Anthropic.", url: "https://github.com/inematds/claw-code", badge: "GitHub" },
  { icon: "🤖", name: "antidotex", desc: "Antidote: assistente de IA pessoal em Python (~3 mil linhas) via Telegram, roda local/Ollama, sem frameworks pesados nem Docker.", url: "https://inematds.github.io/antidotex/", badge: "Guia" },
  { icon: "🧩", name: "skillx", desc: "Fork do repositório oficial de Skills da Anthropic — coleção de exemplos de skills para Claude (criativos, técnicos, corporativos).", url: "https://inematds.github.io/skillx/", badge: "Guia" },
  { icon: "🤖", name: "nanobot", desc: "Nanobot: assistente de IA pessoal ultra-leve (~4 mil linhas), fork com documentação em PT-BR e guia de instalação/Docker.", url: "https://inematds.github.io/nanobot/", badge: "Guia" },
  { icon: "📦", name: "NCIAFlux", desc: "NeuroFluxo: app web (Next.js) de organização pessoal baseado em neurociência para pessoas com TDAH.", url: "https://github.com/inematds/NCIAFlux", badge: "GitHub" },
  { icon: "🧩", name: "MSFilesA", desc: "Skills do Claude Code para gerar documentos Word, Excel, PowerPoint e PDF automaticamente.", url: "https://github.com/inematds/MSFilesA", badge: "GitHub" },
  { icon: "📦", name: "nm82", desc: "Sistema de gestão de convites, afiliados e códigos promocionais (padrinhos) do INEMA.VIP, em Next.js/Turborepo.", url: "https://github.com/inematds/nm82", badge: "GitHub" },
  { icon: "📦", name: "VideosDGX2", desc: "Stack de geração de vídeo com Wan 2.2 + ComfyUI rodando local no NVIDIA DGX Spark, com interface web e fila de jobs.", url: "https://github.com/inematds/VideosDGX2", badge: "GitHub" },
  { icon: "🌐", name: "imersaovc", desc: "Landing promocional da Imersão Vibe Coding (curso presencial de 3 dias), 4 versões, checkout via Asaas.", url: "https://inematds.github.io/imersaovc/", badge: "Guia" },
  { icon: "🤖", name: "logfree", desc: "App (API FastAPI + bot Telegram) que indica o posto com melhor custo real por km para frotas de última milha.", url: "https://github.com/inematds/logfree", badge: "GitHub" },
  { icon: "🌐", name: "novoprojetovibecode", desc: "Landing page de vendas da comunidade premium INEMA.VIP (transformação de negócios com IA).", url: "https://inematds.github.io/novoprojetovibecode/", badge: "Guia" },
  { icon: "🌐", name: "jonespaella", desc: "Site/landing institucional da Jones BBQ & Paellas, empresa de catering premium (cliente).", url: "https://inematds.github.io/jonespaella/", badge: "Guia" },
  { icon: "🌐", name: "web-AG01", desc: "Plataforma web do INEMA.Club (React/Vite): landing, diagnóstico de IA e planos, rodando em modo demo.", url: "https://github.com/inematds/web-AG01", badge: "GitHub" },
  { icon: "🧩", name: "n8n-ps", desc: "Framework de skills que dá ao Claude expertise para construir, validar e implantar workflows n8n em produção.", url: "https://github.com/inematds/n8n-ps", badge: "GitHub" },
  { icon: "🩺", name: "TAM", desc: "Sistema de telessaúde/telemedicina móvel: prontuário eletrônico, agendamentos e integração com e-SUS/DATASUS.", url: "https://github.com/inematds/TAM", badge: "GitHub" },
  { icon: "🌐", name: "inemapromo", desc: "INEMAPROMO — landpages de divulgação: comunidade inema.club, workshop INTELECTO e versões corrigidas (/impeccable).", url: "https://inematds.github.io/inemapromo/", badge: "Guia" },
  { icon: "🎙️", name: "imkt5", desc: "Plataforma modular multi-tenant de pipelines de mídia (imagem, áudio, vídeo, texto) com fila de jobs e entrada via chat; em desenvolvimento.", url: "https://github.com/inematds/imkt5", badge: "GitHub" },
  { icon: "📊", name: "iccmonit", desc: "TUI em Python que monitora sessões Claude Code ativas em tempo real: cota de uso, métricas por sessão e chat embutido.", url: "https://github.com/inematds/iccmonit", badge: "GitHub" },
  { icon: "📊", name: "iccmonitv2", desc: "Monitor local e seguro para sessões Claude Code, com painel de cota, contexto, processos e serviços.", url: "https://inematds.github.io/iccmonitv2/", badge: "Guia" },
  { icon: "🤖", name: "occio-agentes", desc: "Plataforma de orquestração de agentes de IA para PMEs brasileiras (e-commerce), inspirada no Accio Work; em fase de planejamento.", url: "https://github.com/inematds/occio-agentes", badge: "GitHub" },
  { icon: "🧩", name: "claude-seo", desc: "Skill de SEO para Claude Code: auditoria técnica, on-page, schema markup, sitemap e otimização para busca por IA (GEO).", url: "https://github.com/inematds/claude-seo", badge: "GitHub" },
  { icon: "🎓", name: "profeale", desc: "Profe Ale — MVP de plataforma de ensino (Next.js + Supabase) com jornada de aulas por módulos; em desenvolvimento inicial.", url: "https://github.com/inematds/profeale", badge: "GitHub" },
  { icon: "🎬", name: "DublarV4", desc: "Pipeline de dublagem automática de vídeos com IA: transcrição, tradução e TTS, com interface web e suporte a GPU via Docker.", url: "https://github.com/inematds/DublarV4", badge: "GitHub" },
  { icon: "🏠", name: "imob360", desc: "Imob360 — sistema de gestão imobiliária para pequenas e médias imobiliárias: imóveis, CRM de leads, contratos e visitas.", url: "https://github.com/inematds/imob360", badge: "GitHub" },
  { icon: "🤖", name: "rAgentic-cs", desc: "Sistema para controlar Claude Code/Codex remotamente via Telegram e GitHub, com sessões persistentes em Docker.", url: "https://github.com/inematds/rAgentic-cs", badge: "GitHub" },
  { icon: "📊", name: "token-dashboard", desc: "Dashboard local que analisa custo, uso de tokens e cache das sessões do Claude Code a partir dos logs JSONL.", url: "https://github.com/inematds/token-dashboard", badge: "GitHub" },
  { icon: "🧩", name: "skillmanager3x", desc: "Biblioteca de 3 skills para Claude Code: session-handoff, session-statusline e memory-audit (PT/EN).", url: "https://github.com/inematds/skillmanager3x", badge: "GitHub" },
  { icon: "🎬", name: "yt-pub-lives", desc: "Pipeline que corta lives do YouTube em clipes por tópico (transcrição, IA, FFmpeg) e publica em outro canal.", url: "https://github.com/inematds/yt-pub-lives", badge: "GitHub" },
  { icon: "🤖", name: "timesmkt", desc: "Sistema de agentes de IA via Claude Code que pesquisa, cria textos, gera imagens e vídeos para campanhas de marketing.", url: "https://github.com/inematds/timesmkt", badge: "GitHub" },
  { icon: "📊", name: "FinancialSaaS", desc: "SaaS de consultoria financeira pessoal com dashboard de portfólio, consultor de IA (Gemini) e dados de mercado (Finnhub).", url: "https://github.com/inematds/FinancialSaaS", badge: "GitHub" },
  { icon: "🧩", name: "remotion-skills", desc: "Biblioteca/skill para Claude Code com boas práticas de Remotion, exemplos de animação e gerador de vídeo promocional.", url: "https://github.com/inematds/remotion-skills", badge: "GitHub" },
  { icon: "✍️", name: "udpc", desc: "Prompt estruturado de depuração de código para uso com Claude, com variáveis padronizadas e exemplo preenchido.", url: "https://github.com/inematds/udpc", badge: "GitHub" },
  { icon: "📦", name: "tMusic", desc: "App Next.js de rankings de música (músicas, bandas, DJs, IA) com votação; monorepo com API mock.", url: "https://github.com/inematds/tMusic", badge: "GitHub" },
  { icon: "🧩", name: "pollyskill", desc: "CLI que compila Agent Skills escritas uma vez para formatos otimizados de Claude Code e OpenAI Codex.", url: "https://github.com/inematds/pollyskill", badge: "GitHub" },
  { icon: "⌨️", name: "claudex", desc: "CLI que faz Claude e Codex debaterem um plano em rounds de revisão até chegar num plano de implementação validado.", url: "https://github.com/inematds/claudex", badge: "GitHub" },
  { icon: "🎬", name: "yt-pub-lives2", desc: "Pipeline que corta lives do YouTube em clipes por tópico via IA e publica automaticamente em outro canal.", url: "https://github.com/inematds/yt-pub-lives2", badge: "GitHub" },
  { icon: "📦", name: "3ddrive-explorer", desc: "App web (Drive Explorer) para explorar e baixar modelos 3D do acervo INEMA.", url: "https://inematds.github.io/3ddrive-explorer/", badge: "Guia" },
  { icon: "🩺", name: "mcp-notebooklm", desc: "Plataforma Next.js para publicar conteúdos criados no NotebookLM, hospedada no Vercel.", url: "https://github.com/inematds/mcp-notebooklm", badge: "GitHub" },
  { icon: "🤖", name: "docker-openclaw-ollama", desc: "Setup Docker para rodar o agente OpenClaw com Ollama (LLM local) em VPS.", url: "https://github.com/inematds/docker-openclaw-ollama", badge: "GitHub" },
  { icon: "🌐", name: "sis", desc: "Site de marketing e catálogo de cursos da Sisnema Academy (Next.js, com IA para recomendação de cursos).", url: "https://inematds.github.io/sis/", badge: "Guia" },
  { icon: "📊", name: "dclima", desc: "Dashboard Next.js de monitoramento de clima em tempo real (previsão, histórico, mapa e precisão).", url: "https://github.com/inematds/dclima", badge: "GitHub" },
  { icon: "🤖", name: "TLGrupos", desc: "Sistema de gestão de membros pagos de grupos do Telegram, com controle de vencimento e notificações automáticas.", url: "https://github.com/inematds/TLGrupos", badge: "GitHub" },
  { icon: "🤖", name: "lk_agente_v3", desc: "Agente de voz em português via LiveKit (STT Deepgram, LLM GPT-4o-mini, TTS OpenAI) com ferramentas de hora e clima.", url: "https://github.com/inematds/lk_agente_v3", badge: "GitHub" },
  { icon: "🤖", name: "openpcbot", desc: "Bot pessoal de Telegram que roda o Claude Code CLI local, com multi-agente (Ollama/Codex/OpenRouter) e segundo cérebro.", url: "https://github.com/inematds/openpcbot", badge: "GitHub" },
  { icon: "📦", name: "myqi", desc: "Teste de QI online gratuito e open-source, com matrizes progressivas geradas proceduralmente (estilo Raven/ICAR).", url: "https://github.com/inematds/myqi", badge: "GitHub" },
  { icon: "📊", name: "ccjagenticos", desc: "Claude OS: painel pessoal read-only que agrega uso, custo e memória de ferramentas de IA (Claude, ChatGPT, Pinecone, Obsidian) num dashboard.", url: "https://github.com/inematds/ccjagenticos", badge: "GitHub" },
  { icon: "🎬", name: "inemavox2", desc: "Suite de IA para vídeos: dublagem automática, transcrição, corte de clips e download, sem GPU (via API cloud ou CPU).", url: "https://github.com/inematds/inemavox2", badge: "GitHub" },
  { icon: "🤖", name: "mirofish-pt", desc: "Motor de simulação com swarm de agentes IA que reagem em redes sociais para prever desdobramento de eventos (fork traduzido do MiroFish).", url: "https://github.com/inematds/mirofish-pt", badge: "GitHub" },
  { icon: "🤖", name: "claudebot", desc: "ClaudeClaw: leva o Claude Code CLI para o Telegram, rodando o processo real na máquina do usuário.", url: "https://github.com/inematds/claudebot", badge: "GitHub" },
  { icon: "📦", name: "colebuilder", desc: "Construtor de página link-in-bio (estilo Linktree) full-stack com Next.js 15, React 19 e Neon Postgres.", url: "https://github.com/inematds/colebuilder", badge: "GitHub" },
  { icon: "🤖", name: "docker-moltbot-open", desc: "Setup Docker pronto e seguro para rodar o Moltbot (assistente de IA pessoal multi-canal: Telegram, WhatsApp, Discord).", url: "https://github.com/inematds/docker-moltbot-open", badge: "GitHub" },
  { icon: "💰", name: "bet360", desc: "Plataforma white-label B2B de apostas/iGaming com wallet, KYC e compliance para o mercado brasileiro e LATAM.", url: "https://github.com/inematds/bet360", badge: "GitHub" },
  { icon: "🎓", name: "IAcao", desc: "RPG educacional em Godot para crianças/adolescentes que usa IA (ARIA) como recurso estratégico para ensinar competências do século XXI.", url: "https://github.com/inematds/IAcao", badge: "GitHub" },
  { icon: "🎬", name: "videos-edit-cria", desc: "Forja Reel: meta-skill que entrevista você e gera sua própria skill de edição de reels — corte limpo, motion graphics, B-roll real, legendas e SFX, sem abrir editor de vídeo.", url: "https://inematds.github.io/videos-edit-cria/guia/", badge: "Guia" },
  { icon: "📣", name: "inemapromover", desc: "Fábrica de reels de divulgação do INEMA.club segmentados por público: texto → avatar HeyGen → reel empilhado → publicação automática no canal do público.", url: "https://inematds.github.io/inemapromover/guia/", badge: "Guia" },
  { icon: "📸", name: "produtoshotad", desc: "Pipeline que transforma 1 foto de produto em 5 imagens de anúncio e 5 vídeos curtos (9:16), com 3 workers: Agnes (US$0), HyperFrames (sem IA de vídeo) e Fal.ai/Seedance + ElevenLabs.", url: "https://inematds.github.io/produtoshotad/guia/", badge: "Guia" },
  { icon: "🎞️", name: "fable5skill", desc: "Skill de Claude Code que constrói sites scroll-film (a página inteira é um plano-sequência cinematográfico que se dissolve no conteúdo ao rolar), com 3 lanes: GSAP puro, Higgsfield/Kie.ai/fal e Agnes AI (US$0).", url: "https://inematds.github.io/fable5skill/guia/", badge: "Guia" },
  { icon: "🧪", name: "personal-benchmark", desc: "Transforma o histórico do Claude Code em um benchmark pessoal, repetível e julgado às cegas para comparar modelos e níveis de esforço.", url: "https://inematds.github.io/personal-benchmark/guia/", badge: "Guia" },
  { icon: "💳", name: "saas-pay", desc: "Guia de referência para pagamento Asaas (PIX, cartão à vista, cartão parcelado, boleto) com liberação automática de acesso, mais login sem senha via magic link (Supabase) — código de exemplo pra copiar em qualquer SaaS Next.js.", url: "https://inematds.github.io/saas-pay/guia/", badge: "Guia" },
  { icon: "🏦", name: "nubank-pay", desc: "Análise honesta: o Nubank não tem API/webhook oficial de pagamento. Documenta o BR Code (padrão público do Banco Central), o workaround de comunidade de ler o email de confirmação via Gmail API, e um fallback de comprovante validado por OCR/visão.", url: "https://inematds.github.io/nubank-pay/guia/", badge: "Guia" },
]

type Repo = {
  name: string
  url: string
  description: string
  stars: number
  language: string | null
  pushed_at: string
}

const LANG_ICON: Record<string, string> = {
  TypeScript: '🟦',
  JavaScript: '🟨',
  Python: '🐍',
  HTML: '🌐',
  CSS: '🎨',
  Shell: '🐚',
  Go: '🐹',
  Rust: '🦀',
  Java: '☕',
  Ruby: '💎',
  PHP: '🐘',
  Vue: '💚',
  Svelte: '🧡',
  Dockerfile: '🐳',
}

/**
 * Flag de conteúdo detalhado (cursos, busca, atualizações de cursos/projetos,
 * cards das trilhas Profissional/Vibe/Skills e cards de projetos).
 * Desligado em 2026-08-01: a home passou a mostrar só títulos de trilhas +
 * chamada única de projetos. O código e os dados ficam preservados aqui para
 * reaproveitamento — basta voltar para `true`.
 * Snapshot da versão anterior: /index2.html
 */
const SHOW_DETALHES = false

export default function Portal({ visitStats }: { visitStats: VisitStats }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [updatesExpanded, setUpdatesExpanded] = useState(false)
  const [projectUpdatesExpanded, setProjectUpdatesExpanded] = useState(false)
  const [repos, setRepos] = useState<Repo[]>([])

  // Registra a visita ao montar
  useEffect(() => {
    async function trackVisit() {
      let sid = localStorage.getItem('animabook_sid')
      if (!sid) {
        sid = crypto.randomUUID()
        localStorage.setItem('animabook_sid', sid)
      }
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      const {
        data: { session },
      } = await supabase.auth.getSession()
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

  // Busca repositórios da org (ordenados por estrelas)
  useEffect(() => {
    let cancelled = false
    fetch('/api/repos')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.ok && Array.isArray(data.items)) {
          setRepos(data.items)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // Rastreia cliques em links externos
  function trackClick(url: string, label: string, section: string) {
    const sid = localStorage.getItem('animabook_sid') ?? 'unknown'
    fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid, url, label, section }),
    })
  }

  // Busca unificada: cursos + projetos + repos
  const isSearching = searchTerm.trim() !== ''
  const term = searchTerm.toLowerCase()

  const filteredCourses: Course[] = isSearching
    ? platformsData.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
      )
    : platformsData

  type ContentType = 'Curso' | 'Projeto' | 'Repo'
  type UnifiedResult = {
    key: string
    icon: string
    title: string
    description: string
    url?: string
    type: ContentType
    tags?: string[]
  }

  const unifiedResults: UnifiedResult[] = isSearching
    ? [
        ...filteredCourses.map((p) => ({
          key: `curso-${p.id}`,
          icon: p.icon,
          title: p.title,
          description: p.description,
          url: p.url,
          type: 'Curso' as ContentType,
          tags: p.tags,
        })),
        ...communityProjects
          .filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              p.desc.toLowerCase().includes(term)
          )
          .map((p) => ({
            key: `projeto-${p.name}`,
            icon: p.icon,
            title: p.name,
            description: p.desc,
            url: p.url,
            type: 'Projeto' as ContentType,
          })),
        ...repos
          .filter(
            (r) =>
              r.name.toLowerCase().includes(term) ||
              (r.description ?? '').toLowerCase().includes(term)
          )
          .map((r) => ({
            key: `repo-${r.name}`,
            icon: LANG_ICON[r.language ?? ''] ?? '📦',
            title: r.name,
            description: r.description,
            url: r.url,
            type: 'Repo' as ContentType,
          })),
      ]
    : []

  // Lista de atualizações a exibir
  const visibleUpdates = updatesData.slice(0, updatesExpanded ? 20 : 5)
  const visibleProjectUpdates = projectUpdatesData.slice(0, projectUpdatesExpanded ? 20 : 5)
  const sortedProjects = [...communityProjects].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' })
  )


  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <a
            href="https://inema.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="community-badge"
            onClick={() => trackClick('https://inema.vip', 'Participe da Comunidade', 'header')}
          >
            <img src="/doc/conviteinemap.png" alt="INEMA.VIP" />
            <span>Participe da Comunidade</span>
          </a>
          <a
            href="https://inema.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="community-badge community-badge--pro"
            onClick={() => trackClick('https://inema.pro', 'INEMA.PRO', 'header')}
          >
            <img src="/doc/inema-pro-badge.webp" alt="INEMA.PRO" />
            <span>Assine o INEMA.PRO</span>
          </a>
          <div className="header-content">
            <h1 className="logo">INEMA.CLUB Portal INEMA</h1>
            <p className="tagline">Acesso centralizado aos seus cursos e plataformas</p>
            {/* Chips de visitantes */}
            <div className="visit-chips">
              <span className="visit-chip" title="acessos">
                👁 {visitStats.total}
              </span>
              <span className="visit-chip" title="visitantes únicos">
                👤 {visitStats.uniqueAnon}
              </span>
              {visitStats.uniqueLogged > 0 && (
                <span className="visit-chip" title="logados">
                  🔑 {visitStats.uniqueLogged}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section Nav */}
      <nav className="section-nav">
        <div className="container">
          <div className="section-nav-links">
            <a
              href="https://buscas.inema.club"
              target="_blank"
              rel="noopener noreferrer"
              className="section-nav-link"
              onClick={() => trackClick('https://buscas.inema.club', 'Buscas', 'section-nav')}
            >
              🔍 Buscas
            </a>
            <a href="#trilha-iniciantes" className="section-nav-link">📘 Iniciantes</a>
            <a href="#trilhas" className="section-nav-link">🗺️ Trilhas</a>
            <a href="#comunidade" className="section-nav-link">🚀 Projetos</a>
            <a href="#telegram" className="section-nav-link">💬 Telegram</a>
            <a href="#social" className="section-nav-link">📱 Social</a>
            <a
              href="https://inema.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="section-nav-link"
              onClick={() => trackClick('https://inema.pro', 'INEMA.PRO', 'section-nav')}
            >
              ⭐ INEMA.PRO
            </a>
          </div>
        </div>
      </nav>

      {/* Recruitment Hero */}
      <section className="recruitment-hero">
        <div className="container">
          <div className="recruitment-content">
            <div className="recruitment-image-wrapper">
              <div className="recruitment-image">
                <img
                  src="/doc/inema-hero-aprenda-pratique-evolua.webp"
                  alt="INEMA.CLUB — Aprenda. Pratique. Evolua. O ecossistema para dominar IA na prática."
                />
              </div>
              <p className="recruitment-image-caption">
                <strong>
                  Aprenda. Pratique. Evolua. — uma base sólida de conhecimento em IA, para aplicar
                  no trabalho, nos projetos e na carreira.
                </strong>
              </p>
            </div>
            <div className="recruitment-text">
              <h2>Construa uma base sólida de conhecimento em IA.</h2>
              <p>
                O INEMA Club é um ecossistema de aprendizado prático para quem quer dominar
                inteligência artificial e aplicar IA no trabalho, nos projetos e na carreira. A ideia
                central é simples: aprender, praticar e evoluir com IA de forma contínua.
              </p>
              <p>
                Aqui você encontra cursos práticos diretos ao ponto, projetos reais para colocar a
                mão na massa, trilhas organizadas para cada nível, uma comunidade ativa e a curadoria
                das melhores ferramentas. Tudo voltado a construir uma base sólida de conhecimento —
                que te torna mais produtivo, mais estratégico e mais preparado para o futuro do
                trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evento */}
      <section id="evento-destaque" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <a
            href="https://eventos.inema.pro/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('https://eventos.inema.pro/', 'Evento', 'evento')}
            style={{
              display: 'block',
              overflow: 'hidden',
              border: '1px solid oklch(0.48 0.19 28)',
              borderRadius: '16px',
              background: 'oklch(0.14 0.018 28)',
              boxShadow: '0 20px 60px oklch(0.04 0.02 28 / .55)',
              textDecoration: 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/doc/vczero.png"
              alt="Curso INEMACCBOT com Promoavatar"
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1672 / 941', objectFit: 'cover' }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '22px 26px',
                background: 'oklch(0.15 0.02 28)',
              }}
            >
              <span
                style={{
                  flex: '0 0 auto',
                  display: 'inline-block',
                  background: 'oklch(0.69 0.22 35)',
                  color: 'oklch(0.12 0.02 28)',
                  fontWeight: 800,
                  borderRadius: '10px',
                  padding: '11px 18px',
                  fontSize: '14.5px',
                }}
              >
                Assista o curso →
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Learning Path */}
      <section id="trilha-iniciantes" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>Trilha para Iniciantes</h3>
            <p>Comece sua jornada com os cursos essenciais, nesta ordem recomendada</p>
            <p style={{ maxWidth: '760px', margin: '.6rem auto 0', fontSize: '.95rem', color: 'var(--text-secondary, #94a3b8)' }}>
              Não é uma lista aleatória: é uma progressão. Você começa aprendendo a falar com a IA (FEP),
              vê essas habilidades em ação (ATIA), constrói a base técnica de dados (FDB) e amplia para
              imagens (Vision). Só então entra nas ferramentas de agente de código — Claude Code e Codex —
              que juntam tudo isso na prática, antes de colocar um projeto real no ar (Do Zero ao Deploy) e
              fechar construindo seu próprio sistema de IA (INTELECTO). Pular etapas cria lacunas: os
              cursos mais à frente presumem a base dos anteriores.
            </p>
          </div>
          <div className="learning-path-cards">
            <a
              href="https://inematds.github.io/FEP/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-1"
              onClick={() => trackClick('https://inematds.github.io/FEP/', 'FEP', 'trilha')}
            >
              <div className="path-number">1</div>
              <h4>FEP</h4>
              <p>Fundamentos de Engenharia de Prompts</p>
            </a>
            <a
              href="https://inematds.github.io/ATIA/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-2"
              onClick={() => trackClick('https://inematds.github.io/ATIA/', 'ATIA', 'trilha')}
            >
              <div className="path-number">2</div>
              <h4>ATIA</h4>
              <p>AI Tools in Action</p>
            </a>
            <a
              href="https://inematds.github.io/FDB/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-3"
              onClick={() => trackClick('https://inematds.github.io/FDB/', 'FDB', 'trilha')}
            >
              <div className="path-number">3</div>
              <h4>FDB</h4>
              <p>Fundamentos de Banco de Dados</p>
            </a>
            <a
              href="https://inematds.github.io/VISION/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-4"
              onClick={() => trackClick('https://inematds.github.io/VISION/', 'Vision', 'trilha')}
            >
              <div className="path-number">4</div>
              <h4>Vision</h4>
              <p>Processamento de Imagens com IA</p>
            </a>
            <a
              href="https://inematds.github.io/ccodebasico/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-5"
              onClick={() => trackClick('https://inematds.github.io/ccodebasico/', 'Claude Code Básico', 'trilha')}
            >
              <div className="path-number">5</div>
              <h4>Claude Code Básico</h4>
              <p>Do Zero: Instalação, Comandos, Skills, MCP e Cowork</p>
            </a>
            <a
              href="https://inematds.github.io/codexbasico/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-6"
              onClick={() => trackClick('https://inematds.github.io/codexbasico/', 'Codex Básico', 'trilha')}
            >
              <div className="path-number">6</div>
              <h4>Codex Básico</h4>
              <p>Curso Completo do Codex CLI em 6 Trilhas</p>
            </a>
            <a
              href="https://inematds.github.io/do-zero-ao-deploy/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-7"
              onClick={() => trackClick('https://inematds.github.io/do-zero-ao-deploy/', 'Do Zero ao Deploy', 'trilha')}
            >
              <div className="path-number">7</div>
              <h4>Do Zero ao Deploy</h4>
              <p>Da primeira linha no terminal ao seu assistente IA</p>
            </a>
            <a
              href="https://inematds.github.io/intelecto-curso/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-8"
              onClick={() => trackClick('https://inematds.github.io/intelecto-curso/', 'INTELECTO Curso', 'trilha')}
            >
              <div className="path-number">8</div>
              <h4>INTELECTO Curso</h4>
              <p>Do Zero ao Expert em IA</p>
            </a>
            <a
              href="https://inematds.github.io/cccompletopn/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-1"
              onClick={() => trackClick('https://inematds.github.io/cccompletopn/', 'Claude Code para Pessoas Normais', 'trilha')}
            >
              <div className="path-number">9</div>
              <h4>Claude Code para Pessoas Normais</h4>
              <p>Do zero ao AI Native — segundo cérebro, sub-agentes e automações</p>
            </a>
            <a
              href="https://inematds.github.io/os-agentes/guia/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-2"
              onClick={() => trackClick('https://inematds.github.io/os-agentes/guia/', 'OS Agentes', 'trilha')}
            >
              <div className="path-number">10</div>
              <h4>OS Agentes</h4>
              <p>Construa seu OS agêntico, uma camada por vez</p>
            </a>
            <a
              href="https://inematds.github.io/lives2/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-3"
              onClick={() => trackClick('https://inematds.github.io/lives2/', 'Lives 2026', 'trilha')}
            >
              <div className="path-number">11</div>
              <h4>Lives 2026</h4>
              <p>7 vídeos estratégicos sobre vender serviços de IA</p>
            </a>
            <a
              href="https://inematds.github.io/evai2026/curso-e-live/curso/"
              target="_blank"
              rel="noopener noreferrer"
              className="path-card path-card-4"
              onClick={() => trackClick('https://inematds.github.io/evai2026/curso-e-live/curso/', 'Como Montar um Negócio', 'trilha')}
            >
              <div className="path-number">12</div>
              <h4>Como Montar um Negócio</h4>
              <p>8 aulas sem programar — do primeiro cliente ao contrato</p>
            </a>
          </div>
          <div className="learning-path-footer">
            <p>Após completar esta trilha, explore outros cursos conforme seu interesse abaixo</p>
            <div className="guide-link-btn-wrap">
              <a
                className="guide-link-btn"
                href="/guias/trilha-iniciantes.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('/guias/trilha-iniciantes.html', 'Guia da Trilha para Iniciantes', 'trilha')}
              >
                📖 Veja o guia com a importância de cada curso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trilha Profissional com IA — detalhe preservado, ver SHOW_DETALHES */}
      {SHOW_DETALHES && (
      <section id="trilha-profissional" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>🧭 Trilha Profissional com IA</h3>
            <p>Do espectador ao especialista, em 6 estágios — desperte, lidere, construa, crie e opere com agentes</p>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#34d399', margin: '0 0 .9rem' }}>1 · Despertar — integre a IA na sua profissão</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/mentesbrilhantes1/',  label: 'Mentes Brilhantes',     desc: 'Transforme sua profissão com IA',          n: 1 },
              { href: 'https://inematds.github.io/caminho-certo-da-ia-guia/', label: 'O Caminho Certo da IA', desc: 'Guia de qualificação real em IA',         n: 2 },
              { href: 'https://inematds.github.io/profissionalai/',    label: 'Integra sua Profissão', desc: 'Integre a IA na profissão que você já tem', n: 3 },
              { href: 'https://inematds.github.io/pro-liberal-ia/',    label: 'Liberal com IA',        desc: 'Assistente + prompts + templates pro liberal', n: 4 },
              { href: 'https://inematds.github.io/pha2030-aula/',      label: 'PHA 2030',              desc: 'Potencial Humano Aumentado',              n: 5 },
              { href: 'https://inematds.github.io/profissional2027x/', label: 'Profissional 2027',     desc: 'Implementadores de IA para PMEs',          n: 6 },
              { href: 'https://inematds.github.io/prof2030/',          label: 'Prof2030',              desc: 'O Profissional do Futuro',                n: 7 },
              { href: 'https://inematds.github.io/os-agentes/guia/',   label: 'OS Agentes',            desc: 'Construa seu OS agêntico, uma camada por vez', n: 8 },
              { href: 'https://inematds.github.io/builaios/',   label: 'Construa seu AI OS',    desc: 'Assistente de IA pessoal, sem programar', n: 9 },
              { href: 'https://inematds.github.io/formacaoia/', label: 'Formação IA',           desc: 'Pedir bem já não basta: monte a estrutura em volta da IA', n: 10 },
              { href: 'https://inematds.github.io/wat7d/',      label: 'Seu Funcionário Digital', desc: '7 dias para montar um assistente de IA que trabalha sozinho', n: 11 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/despertar.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/despertar.html', 'Guia — Despertar', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#a78bfa', margin: '1.6rem 0 .9rem' }}>2 · Liderar &amp; Monetizar — consultor, CAIO, certificação</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/neurociencia-comportamento/', label: 'Neurociência & Comportamento', desc: 'Entenda o comportamento humano com IA',      n: 1 },
              { href: 'https://inematds.github.io/pro-liberal-ia/',  label: 'Pro Liberal com IA', desc: 'Do atendimento ao lucro', n: 2 },
              { href: 'https://inematds.github.io/caio/',          label: 'CAIO',             desc: 'Chief AI Officer 2030',                  n: 3 },
              { href: 'https://inematds.github.io/prof2031CAIP/',  label: 'CAIP',             desc: 'Certified AI Professional',              n: 4 },
              { href: 'https://inematds.github.io/consultoria2k/', label: 'Consultor de IA',  desc: 'Do Rótulo ao Resultado',                 n: 5 },
              { href: 'https://inematds.github.io/cultura-inovacao/', label: 'Cultura de Inovação', desc: 'Da Teoria à Prática',                  n: 6 },
              { href: 'https://inematds.github.io/mapacliente/', label: 'Mapa do Cliente', desc: 'Formação DICA — Consultor de IA para Pequenos Negócios', n: 7 },
              { href: 'https://inematds.github.io/profissional2027x', label: 'Profissional 2027', desc: 'Implementadores de IA para PMEs — Método DPIA', n: 8 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/lideranca-monetizacao.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/lideranca-monetizacao.html', 'Guia — Liderar & Monetizar', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#38bdf8', margin: '1.6rem 0 .9rem' }}>3 · Estratégia — automação e estratégia com IA</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/local-ai-masterclass/', label: 'Local AI Masterclass', desc: 'IA local, rápida e sem dependências',        n: 1 },
              { href: 'https://inematds.github.io/storm-research/',       label: 'Storm Research',       desc: 'Pesquisa avançada com IA',                 n: 2 },
              { href: 'https://inematds.github.io/fae-ai/',       label: 'Automação Estratégica', desc: 'Automação Estratégica com IA',           n: 3 },
              { href: 'https://inematds.github.io/aiestrategia/', label: 'Estratégia de IA',      desc: 'Fábrica de Estratégia — Vire Consultor', n: 4 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/estrategia.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/estrategia.html', 'Guia — Estratégia', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#f472b6', margin: '1.6rem 0 .9rem' }}>4 · Vibe Code — do conceito à engenharia com IA</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/vibecode',          label: 'Vibe Coding',      desc: 'Da Ideia ao Produto com IA',    n: 1 },
              { href: 'https://inematds.github.io/vb-imersao/',      label: 'VB Imersao',       desc: 'Do Zero ao SaaS em 3 Dias',    n: 2 },
              { href: 'https://inematds.github.io/skills',            label: 'Skills',           desc: 'Agent Skills Mastery',         n: 3 },
              { href: 'https://inematds.github.io/agentic/',          label: 'Agentic',          desc: 'Engenharia de Agentic',        n: 4 },
              { href: 'https://inematds.github.io/ws2ia/',            label: 'Eng. de Software com IA', desc: 'AI First sem perder o controle: spec, harness, loop e gates', n: 5 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/vibe-code.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/vibe-code.html', 'Guia — Vibe Code', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#fbbf24', margin: '1.6rem 0 .9rem' }}>5 · Filmes &amp; Vídeos — crie conteúdo profissional</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/yt-pub-livesx/',    label: 'YT Pub LivesX', desc: 'Corte lives em clips com IA',        n: 1 },
              { href: 'https://inematds.github.io/skill-video-explicativo/', label: 'HyperFrames', desc: 'Vídeos Explicativos com Claude Code', n: 2 },
              { href: 'https://inematds.github.io/timesmkt3/',        label: 'TimesMkt3',      desc: 'Fábrica de Conteúdo + Vídeos',     n: 3 },
              { href: 'https://inematds.github.io/inemavox/',         label: 'Inemavox',       desc: 'Suíte de Voz e Vídeo com IA',     n: 4 },
              { href: 'https://inematds.github.io/recursos-video/',   label: 'Recursos de Vídeo', desc: 'Catálogo-guia dos 44 projetos de vídeo e imagem do ecossistema', n: 5 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/filmes-videos.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/filmes-videos.html', 'Guia — Filmes & Vídeos', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.82rem', color: '#fb923c', margin: '1.6rem 0 .9rem' }}>6 · Profissionais Experientes — agentes para quem vive da expertise</div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/agentes-office/',                             label: 'Agentes: o Novo Office', desc: 'Formação em agentes de IA por perfil', n: 1 },
              { href: 'https://inematds.github.io/agentes-office/curso/liberal/landing.html', label: 'Curso Liberal',          desc: 'Aula 0 + 8 módulos — o segundo cérebro do liberal', n: 2 },
              { href: 'https://inematds.github.io/segunda-opiniao/landing.html',                label: 'Segunda Opinião',       desc: 'IA para Gestores e Líderes',                        n: 3 },
              { href: 'https://inematds.github.io/evai2026/curso-e-live/curso/',                label: 'Negócio de Serviços de IA', desc: '8 aulas sem programar — do primeiro cliente ao contrato', n: 4 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-profissional')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="guide-link-btn-wrap">
            <a
              className="guide-link-btn"
              href="/guias/trilha-profissional/profissionais-experientes.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('/guias/trilha-profissional/profissionais-experientes.html', 'Guia — Profissionais Experientes', 'trilha-profissional')}
            >
              📖 Guia deste estágio
            </a>
          </div>

          <div className="learning-path-footer">
            <p>Uma jornada do INEMA.CLUB: integre a IA na sua profissão, vire implementador, consultor, especialista em Vibe Code, produtor de conteúdo e profissional experiente operando com agentes</p>
          </div>

          <a
            href="https://inema.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="inemapro-banner inemapro-banner--wide"
            onClick={() => trackClick('https://inema.pro', 'INEMA.PRO — Jornada', 'banner-inemapro')}
          >
            <img src="/doc/inema-pro-banner-jornada.webp" alt="INEMA.PRO — Desenvolva. Construa. Escale." loading="lazy" />
          </a>
        </div>
      </section>
      )}

      {/* Banner */}
      <section style={{ padding: '0 0 2rem' }}>
        <div className="container">
          <a
            href="https://eventos.inema.pro/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('https://eventos.inema.pro/', 'Banner evento', 'evento')}
            style={{
              display: 'block',
              overflow: 'hidden',
              border: '1px solid oklch(0.48 0.19 28)',
              borderRadius: '16px',
              background: 'oklch(0.14 0.018 28)',
              boxShadow: '0 20px 60px oklch(0.04 0.02 28 / .55)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/doc/inemaagenteshubv.jpg"
              alt="Evento INEMA"
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1280 / 720', objectFit: 'cover' }}
            />
          </a>
        </div>
      </section>

      {/* Main — Updates + Search + Cards */}
      <main className="main">
        <div className="container">
          {/* Updates de Cursos */}
          <section className="updates-section">
            <div
              className="updates-header"
              onClick={() => setUpdatesExpanded((v) => !v)}
              style={{ cursor: 'pointer' }}
            >
              <h3>Últimas Atualizações de Cursos</h3>
              <span className="updates-toggle">{updatesExpanded ? 'Ver menos' : 'Ver mais'}</span>
            </div>
            <div className={`updates-list${updatesExpanded ? ' expanded' : ''}`}>
              {visibleUpdates.map((update, i) => (
                <a
                  key={i}
                  className="update-item"
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(update.url, update.title, 'atualizacoes')}
                >
                  <span className="update-date">{formatDate(update.date)}</span>
                  <span className={`update-type ${update.type}`}>{update.type}</span>
                  <span className="update-title">{update.title}</span>
                  <span className="update-arrow">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Updates de Projetos */}
          <section className="updates-section">
            <div
              className="updates-header"
              onClick={() => setProjectUpdatesExpanded((v) => !v)}
              style={{ cursor: 'pointer' }}
            >
              <h3>Últimas Atualizações de Projetos</h3>
              <span className="updates-toggle">{projectUpdatesExpanded ? 'Ver menos' : 'Ver mais'}</span>
            </div>
            <div className={`updates-list${projectUpdatesExpanded ? ' expanded' : ''}`}>
              {visibleProjectUpdates.map((update, i) => (
                <a
                  key={i}
                  className="update-item"
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(update.url, update.title, 'atualizacoes-projetos')}
                >
                  <span className="update-date">{formatDate(update.date)}</span>
                  <span className={`update-type ${update.type}`}>{update.type}</span>
                  <span className="update-title">{update.title}</span>
                  <span className="update-arrow">→</span>
                </a>
              ))}
            </div>
          </section>

          {/* Banner Perfis IA */}
          <section className="perfis-ia-section">
            <a
              href="https://inematds.github.io/agentes-office/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('https://inematds.github.io/agentes-office/', 'Perfis IA — Topo', 'perfis-ia')}
            >
              <img
                src="/doc/perfis-ia-topo.webp"
                alt="Descubra como usar IA para evoluir na sua profissão"
                className="perfis-ia-topo"
                loading="lazy"
              />
            </a>
            <div className="perfis-ia-grid">
              <a
                href="https://inematds.github.io/agentes-office/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inematds.github.io/agentes-office/', 'Perfis IA — Operacional', 'perfis-ia')}
              >
                <img src="/doc/perfis-ia-operacional.webp" alt="Profissional Operacional — mais produtividade com IA" loading="lazy" />
              </a>
              <a
                href="https://inematds.github.io/agentes-office/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inematds.github.io/agentes-office/', 'Perfis IA — Empreendedor', 'perfis-ia')}
              >
                <img src="/doc/perfis-ia-empreendedor.webp" alt="Empreendedor Estratégico com IA" loading="lazy" />
              </a>
              <a
                href="https://inematds.github.io/agentes-office/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inematds.github.io/agentes-office/', 'Perfis IA — Liberal', 'perfis-ia')}
              >
                <img src="/doc/perfis-ia-liberal.webp" alt="Profissional Liberal Experiente com IA" loading="lazy" />
              </a>
              <a
                href="https://inematds.github.io/agentes-office/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inematds.github.io/agentes-office/', 'Perfis IA — Gestor', 'perfis-ia')}
              >
                <img src="/doc/perfis-ia-gestor.webp" alt="Gestor e Líder — lidere melhor com IA" loading="lazy" />
              </a>
            </div>
          </section>

          {/* Search */}
          {SHOW_DETALHES && (
          <section id="cursos" className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar cursos, projetos ou repositórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchTerm('')
              }}
            />
          </section>
          )}

          {/* Cards */}
          {SHOW_DETALHES && (
          <section className="cards-grid">
            {isSearching ? (
              unifiedResults.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <p className="empty-state-text">Nenhum conteúdo encontrado</p>
                </div>
              ) : (
                unifiedResults.map((item) => (
                  <div key={item.key} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="card-icon">{item.icon}</div>
                      <span className={`content-type-badge content-type-badge--${item.type.toLowerCase()}`}>
                        {item.type}
                      </span>
                    </div>
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-description">{item.description}</p>
                    {item.tags && (
                      <div className="card-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    {item.url ? (
                      <a
                        href={item.url}
                        className="card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick(item.url!, item.title, 'busca')}
                      >
                        Acessar →
                      </a>
                    ) : (
                      <span className="card-link" style={{ opacity: 0.4, cursor: 'default' }}>Sem link</span>
                    )}
                  </div>
                ))
              )
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="card">
                  <div className="card-icon">{course.icon}</div>
                  <h2 className="card-title">{course.title}</h2>
                  <p className="card-description">{course.description}</p>
                  <div className="card-tags">
                    {course.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={course.url}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(course.url, course.title, 'cursos')}
                  >
                    Acessar plataforma
                  </a>
                </div>
              ))
            )}
          </section>
          )}
        </div>
      </main>

      {/* Banner INEMA.PRO */}
      <section className="inemapro-banner-section">
        <div className="container">
          <a
            href="https://inema.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="inemapro-banner inemapro-banner--wide"
            onClick={() => trackClick('https://inema.pro', 'INEMA.PRO — Completo', 'banner-inemapro')}
          >
            <img src="/doc/inema-pro-banner-completo.webp" alt="INEMA.PRO — A plataforma para quem quer usar IA para crescer na prática" loading="lazy" />
          </a>
        </div>
      </section>

      {/* Trilha Vibe Code — detalhe preservado, ver SHOW_DETALHES */}
      {SHOW_DETALHES && (
      <section id="trilha-vibe" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>⚡ Trilha Vibe Code</h3>
            <p>Do conceito à engenharia — crie software com IA de ponta a ponta</p>
          </div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/vibecode',          label: 'Vibe Coding',      desc: 'Da Ideia ao Produto com IA',    n: 1 },
              { href: 'https://inematds.github.io/vb-imersao/',      label: 'VB Imersao',       desc: 'Do Zero ao SaaS em 3 Dias',    n: 2 },
              { href: 'https://inematds.github.io/skills',            label: 'Skills',           desc: 'Agent Skills Mastery',         n: 3 },
              { href: 'https://inematds.github.io/agentic/',          label: 'Agentic',          desc: 'Engenharia de Agentic',        n: 4 },
              { href: 'https://inematds.github.io/agentic-workflow/', label: 'Agentic Workflow', desc: 'Workflows Agentic na Prática', n: 5 },
              { href: 'https://inematds.github.io/CLI-x',            label: 'CLI-x',            desc: 'O Terminal como Interface dos Agentes', n: 6 },
              { href: 'https://inematds.github.io/skill-design/',    label: 'Skill Design',     desc: 'Skills pra Melhorar Páginas',  n: 7 },
              { href: 'https://inematds.github.io/skill-video-explicativo/', label: 'HyperFrames', desc: 'Vídeos Explicativos com Claude Code', n: 8 },
              { href: 'https://inematds.github.io/skills-craft/',    label: 'Criando Skills',   desc: 'Do Catálogo à Sua Primeira Skill', n: 9 },
              { href: 'https://inematds.github.io/subagentes/',     label: 'Subagentes',       desc: 'Especialistas do Claude Code', n: 10 },
              { href: 'https://inematds.github.io/fablelite/',       label: 'Fable Lite',       desc: 'Garimpe o Raciocínio dos Modelos', n: 11 },
              { href: 'https://inematds.github.io/vibe-coding-completo/', label: 'Domínio Completo', desc: 'Fundamentos, Técnica, Prompts, Skills, Agentes e Produção', n: 12 },
              { href: 'https://inematds.github.io/vibe-coding/', label: 'Vibe Coding na Prática', desc: 'Do Primeiro Workflow ao App no Ar', n: 13 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-vibe')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="learning-path-footer">
            <p>Trilha completa para dominar o desenvolvimento de software com IA — do vibe ao agente</p>
          </div>
        </div>
      </section>
      )}

      {/* Trilha Skills — detalhe preservado, ver SHOW_DETALHES */}
      {SHOW_DETALHES && (
      <section id="trilha-skills" className="learning-path-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>🧩 Trilha Skills</h3>
            <p>Domine as Agent Skills do Claude Code — do catálogo à sua própria Skill</p>
          </div>
          <div className="learning-path-cards">
            {[
              { href: 'https://inematds.github.io/skills-craft/',           label: 'Criando Skills',          desc: 'Do Catálogo à Sua Primeira Skill',   n: 1 },
              { href: 'https://inematds.github.io/skill-video-explicativo/', label: 'HyperFrames',             desc: 'Vídeos Explicativos com Claude Code', n: 2 },
              { href: 'https://inematds.github.io/akarpathy-skill/curso-pt/', label: 'Karpathy Guidelines',     desc: '4 Princípios pra Código Limpo',      n: 3 },
              { href: 'https://inematds.github.io/polyskills',              label: 'PolySkills',              desc: 'Claude Code & Codex lado a lado',    n: 4 },
              { href: 'https://inematds.github.io/skill-design/',           label: 'Skill Design',            desc: 'Arsenal de Skills pra Páginas',      n: 5 },
              { href: 'https://inematds.github.io/skills',                  label: 'Skills',                  desc: 'Agent Skills Mastery',               n: 6 },
              { href: 'https://inematds.github.io/mp-skill/curso-skills/',  label: 'Skills For Real Engineers', desc: 'Skills pra Engenheiros de Verdade', n: 7 },
              { href: 'https://inematds.github.io/skills-premium/',         label: 'Skills Premium',          desc: 'Do Iniciante ao Expert',             n: 8 },
              { href: 'https://inematds.github.io/superskills-karpathy/',   label: 'SuperSkills Karpathy',    desc: 'Skills como Funcionários Digitais',  n: 9 },
              { href: 'https://inematds.github.io/claude-skills/',          label: 'Claude Skills na Prática', desc: 'Construa Agent Skills do Claude Code', n: 10 },
              { href: 'https://inematds.github.io/claude-watch/',           label: 'claude-watch',            desc: 'Dê ao Claude olhos pra assistir vídeo', n: 11 },
              { href: 'https://inematds.github.io/grillme/',                label: 'Grill Me',                desc: 'Extraia o que está na sua cabeça',     n: 12 },
              { href: 'https://inematds.github.io/videos-edit/',            label: 'videos-edit',             desc: 'Forja Reel — editor de reels com IA',  n: 13 },
              { href: 'https://inematds.github.io/curso-ablacao/',          label: 'Auditoria de Ablação',    desc: 'Enxugue CLAUDE.md, skills e hooks',    n: 14 },
            ].map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                 className={`path-card path-card-${p.n}`}
                 onClick={() => trackClick(p.href, p.label, 'trilha-skills')}>
                <div className="path-number">{p.n}</div>
                <h4>{p.label}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="learning-path-footer">
            <p>Skills transformam o Claude Code em especialistas sob demanda — aprenda a criar e usar as suas</p>
          </div>
        </div>
      </section>
      )}

      {/* Banner */}
      <section className="hero-banner">
        <div className="container">
          <img src="/doc/inemac2.jpg" alt="INEMA.CLUB" className="hero-banner-image" />
        </div>
      </section>

      {/* Trilhas de Aprendizado — só os títulos das trilhas */}
      <section id="trilhas" className="trilhas-section">
        <div className="container">
          <div className="learning-path-header">
            <h3>Trilhas de Aprendizado do INEMA.PRO</h3>
            <p>Escolha seu caminho e avance com foco — o conteúdo completo de cada trilha está no INEMA.PRO</p>
          </div>
          <div className={SHOW_DETALHES ? '' : 'trilhas-titles-grid'}>
          {([
            { title: '🧭 Trilha Profissional com IA', steps: [] },
            { title: '⚡ Trilha Vibe Code', steps: [] },
            { title: '🧩 Trilha Skills', steps: [] },
            { title: '🎯 Arquitetura de IA', steps: [
              { href: 'https://inematds.github.io/arquitetura-de-intencao/', label: 'Arquitetura de Intenção', desc: 'Imersão de 3 dias — do prompt ao sistema' },
              { href: 'https://inematds.github.io/manual-oculto-ia/',        label: 'Manual Oculto',         desc: 'System Prompts como os Labs Fazem — o cérebro do Fable' },
              { href: 'https://inematds.github.io/fablelite/',               label: 'Fable Lite',            desc: 'Garimpando o Raciocínio dos Modelos' },
            ]},
            { title: '⚡ Automação', steps: [
              { href: 'https://inematds.github.io/ssh-basico/', label: 'SSH',    desc: 'Fundamentos SSH e VPS' },
              { href: 'https://inematds.github.io/FIA2026/', label: 'FIA2026',    desc: 'Automações com IA 2026' },
              { href: 'https://inematds.github.io/N8Nb',    label: 'N8Nb',       desc: 'Fundamentos N8N' },
              { href: 'https://inematds.github.io/N8Np',    label: 'N8Np',       desc: 'N8N Avançado' },
              { href: 'https://inematds.github.io/MAKE/',   label: 'MAKE',       desc: 'Automação com Make' },
            ]},
            { title: '✍️ Engenharia de Prompts', steps: [
              { href: 'https://inematds.github.io/FEP/',     label: 'FEP',     desc: 'Fundamentos de Prompts' },
              { href: 'https://inematds.github.io/FEP2/',    label: 'FEP2',    desc: 'Prompt Engineering Masterclass' },
              { href: 'https://inematds.github.io/prompts/', label: 'Prompts', desc: 'Engenharia de Prompts Avançada' },
              { href: 'https://inematds.github.io/FEI/',     label: 'FEI',     desc: 'Engenharia da Intenção' },
              { href: 'https://inematds.github.io/prompts-prontos/', label: 'Prompts Prontos', desc: '13 System Prompts Copiáveis' },
            ]},
            { title: '🎨 Design & Visual', steps: [
              { href: 'https://inematds.github.io/webp',      label: 'WebP',      desc: 'Designer 2026' },
              { href: 'https://inematds.github.io/FDF',       label: 'FDF',       desc: 'Designers do Futuro' },
              { href: 'https://inematds.github.io/dash/',     label: 'Dashboard', desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/VisionPro', label: 'VisionPro', desc: 'Construção Audiovisual com IA' },
            ]},
            { title: '🤖 Robótica & Humanoides', steps: [
              { href: 'https://inematds.github.io/robot/', label: 'Robot', desc: 'Robótica e Automação' },
              { href: 'https://inematds.github.io/FTH/',   label: 'FTH',   desc: 'Treinamento de Humanoides' },
              { href: 'https://inematds.github.io/HG1',    label: 'HG1',   desc: 'Academia dos Humanoides G1' },
              { href: 'https://inematds.github.io/segrobot/', label: 'segROBOT', desc: 'Requalificação Humana p/ Ambientes Robotizados' },
              { href: 'https://inematds.github.io/vla/', label: 'VLA', desc: 'Vision Language Action para Robótica' },
            ]},
            { title: '💼 Consultoria IA & Negócios', steps: [
              { href: 'https://inematds.github.io/ATIA/',        label: 'ATIA',        desc: 'Oportunidades Digitais com IA' },
              { href: 'https://inematds.github.io/FGMD/',        label: 'FGMD',        desc: 'Gatilhos Mentais Digitais' },
              { href: 'https://inematds.github.io/Playbook-IA/', label: 'Playbook-IA', desc: 'Formação de Consultoria IA' },
              { href: 'https://inematds.github.io/tiktokshop',   label: 'TikTok Shop', desc: 'Vendas no TikTok Shop' },
              { href: 'https://inematds.github.io/whatsapp-bsuid/', label: 'WhatsApp BSUID', desc: 'Privacidade e Identidade no WhatsApp' },
              { href: 'https://inematds.github.io/vendasaios/', label: 'Vendendo AIOS', desc: 'Como Vender Sistemas Operacionais de IA' },
              { href: 'https://inematds.github.io/mapacliente/', label: 'Mapa do Cliente', desc: 'Formação DICA — Consultor de IA para Pequenos Negócios' },
              { href: 'https://inematds.github.io/profissional2027x', label: 'Profissional 2027', desc: 'Implementadores de IA para PMEs — Método DPIA' },
              { href: 'https://inematds.github.io/AI-CONSULT/', label: 'AI Strategy Factory', desc: 'Estratégia de IA Completa para Qualquer Empresa' },
              { href: 'https://inematds.github.io/aiestrategia/', label: 'Fábrica de Estratégia de IA', desc: 'Curso — vire consultor de IA construindo a sua própria fábrica' },
              { href: 'https://inematds.github.io/evai2026/curso-e-live/curso/', label: 'Negócio de Serviços de IA', desc: '8 aulas sem programar — do primeiro cliente ao contrato enterprise' },
            ]},
            { title: '📊 Dados & IA', steps: [
              { href: 'https://inematds.github.io/FDB/',       label: 'FDB',        desc: 'Fundamentos de Banco de Dados' },
              { href: 'https://inematds.github.io/DBA-FO/',    label: 'DBA-FO',     desc: 'Fundamentos DBA Oracle' },
              { href: 'https://inematds.github.io/FETD/',      label: 'FETD',       desc: 'Engenharia de Treinamento de Dados' },
              { href: 'https://inematds.github.io/notebooklm', label: 'NotebookLM', desc: 'Do Zero ao Avançado' },
            ]},
            { title: '💻 Desenvolvedor IA', steps: [
              { href: 'https://inematds.github.io/ccguide2026',          label: 'CCGuide',          desc: 'Claude Code 2026' },
              { href: 'https://inematds.github.io/6pilarccb/',           label: '6 Pilares',        desc: '6 Pilares do Claude Code' },
              { href: 'https://inematds.github.io/6pilarccfull/',        label: '6 Pilares Full',   desc: 'Edicao Completa 2026' },
              { href: 'https://inematds.github.io/agentic-workflow/',    label: 'Agentic Workflow', desc: 'Engenharia Agentic Prática' },
              { href: 'https://inematds.github.io/BMAD-Academy/',       label: 'BMAD',             desc: 'BMAD Academy' },
              { href: 'https://inematds.github.io/github/',              label: 'GitHub',           desc: 'Repositórios INEMA' },
              { href: 'https://inematds.github.io/dash/',                label: 'Dashboard',        desc: 'Dashboard Mastery' },
              { href: 'https://inematds.github.io/mkblogs/',              label: 'MkBlogs',          desc: 'Publicação Multi-Plataforma sem SaaS' },
            ]},
            { title: '🌱 Transformação Digital', steps: [
              { href: 'https://inematds.github.io/FTD/',  label: 'FTD',  desc: 'Formação Transformação Digital' },
              { href: 'https://inematds.github.io/TDS/',  label: 'TDS',  desc: 'Transformação Digital Sustentável' },
              { href: 'https://inematds.github.io/SHIA/', label: 'SHIA', desc: 'Super Humanos Inteligência Ampliada' },
              { href: 'https://inematds.github.io/GIPM/', label: 'GIPM', desc: 'Projetos com IA Governada' },
              { href: 'https://inematds.github.io/mentesbrilhantes1/', label: 'Mentes Brilhantes', desc: 'A Fórmula 1-20-79' },
              { href: 'https://inematds.github.io/caio/', label: 'CAIO', desc: 'Chief AI Officer 2030' },
              { href: 'https://inematds.github.io/segunda-opiniao/', label: 'Segunda Opinião', desc: 'IA para Gestores e Líderes' },
            ]},
            { title: '🎬 Vídeos, Filmes e Cinema', steps: [
              { href: 'https://inematds.github.io/idallai/', label: 'Formação Cinema com IA', desc: '9 cursos, 58 aulas — do zero ao mini-filme final' },
              { href: 'https://inematds.github.io/seedance2/',  label: 'Seedance 2.0', desc: 'Video com IA (ByteDance)' },
              { href: 'https://inematds.github.io/VisionPro',   label: 'VisionPro',    desc: 'Construção Audiovisual com IA' },
              { href: 'https://inematds.github.io/fpfilm1/',     label: 'FPFilm',       desc: 'Crie Filmes com IA (Freepik)' },
              { href: 'https://inematds.github.io/VISION/',      label: 'VISION',       desc: 'Visão Computacional com IA' },
              { href: 'https://inematds.github.io/promptfilmes/', label: 'Prompt Director', desc: 'Imagens e Cinema com IA' },
              { href: 'https://inematds.github.io/videos-edit/', label: 'videos-edit', desc: 'Forja Reel — reel pro a partir do bruto, sem editor' },
            ]},
            { title: '🧠 Frameworks & Assistentes', steps: [
              { href: 'https://inematds.github.io/intelecto-curso/',   label: 'INTELECTO Curso', desc: 'Do Zero ao Expert em IA — 6 trilhas, 18 módulos' },
              { href: 'https://inematds.github.io/intelecto',          label: 'INTELECTO',       desc: 'Inteligência Pessoal sem Frameworks Inchados' },
              { href: 'https://inematds.github.io/docker-openclaw/',   label: 'Docker OpenClaw', desc: 'Assistente IA Autônomo e Multi-Canal' },
              { href: 'https://inematds.github.io/deerflow/',          label: 'DeerFlow',        desc: 'Framework de Agentes ByteDance' },
              { href: 'https://inematds.github.io/agentejax/',        label: 'AgenteJAX',      desc: 'Agente de IA Pessoal em TypeScript' },
              { href: 'https://inematds.github.io/ruflo/',               label: 'Ruflo',       desc: 'Orquestração de Agentes Multi-IA' },
              { href: 'https://inematds.github.io/openhuman/',           label: 'OpenHuman',   desc: 'Assistente IA para Comunidades (Rust/Tauri)' },
            ]},
            { title: '🖥️ Claude Code', steps: [
              { href: 'https://inematds.github.io/ccodebasico/',          label: 'CC Básico',        desc: 'Do Zero: Instalação, Comandos, Skills, MCP e Cowork' },
              { href: 'https://inematds.github.io/jccode23/',             label: 'Do Zero ao Projeto', desc: 'Claude Code dos Fundamentos ao Deploy' },
              { href: 'https://inematds.github.io/claude-code-na-pratica/', label: 'Na Prática', desc: 'Do Zero ao Produto: sites, apps e automações' },
              { href: 'https://inematds.github.io/ccguide2026',           label: 'CCGuide',     desc: 'Claude Code 2026 - Completo' },
              { href: 'https://inematds.github.io/6pilarccb/',            label: '6 Pilares',   desc: '6 Pilares do Claude Code' },
              { href: 'https://inematds.github.io/6pilarccfull/',         label: '6 Pilares Full', desc: 'Edição Completa 2026' },
              { href: 'https://inematds.github.io/claudecode-estrutura/', label: 'Por Dentro',  desc: 'Arquitetura do Claude Code' },
              { href: 'https://inematds.github.io/claudecode-manual/',    label: 'Deep Dive',   desc: 'Mergulho no Código-Fonte' },
              { href: 'https://inematds.github.io/CLI-x',                label: 'CLI-x',       desc: 'Terminal como Interface dos Agentes' },
              { href: 'https://inematds.github.io/ccmastermemory/',    label: 'MasterMemory', desc: 'Memory Injection via Hooks' },
              { href: 'https://inematds.github.io/cctop/',             label: 'CCTop',        desc: 'Mestre em Contexto e Tokens' },
              { href: 'https://inematds.github.io/cccache/',           label: 'cccache',      desc: 'Prompt Caching no Claude Code' },
              { href: 'https://inematds.github.io/segundo-cerebro/',   label: 'Segundo Cérebro', desc: 'Memória persistente: Graphify + Obsidian' },
              { href: 'https://inematds.github.io/opus47/',            label: 'Opus 4.7',     desc: 'Dominando o Opus 4.7' },
              { href: 'https://inematds.github.io/opus48/curso/',      label: 'Opus 4.8',     desc: 'Raciocínio Híbrido, Effort Control e Dynamic Workflows' },
              { href: 'https://inematds.github.io/ccfast32/',           label: 'CCFast32',     desc: '32 Hacks do Claude Code' },
              { href: 'https://inematds.github.io/superpowers/',        label: 'Superpowers',  desc: 'Desenvolvimento com Agentes de IA' },
              { href: 'https://inematds.github.io/ccopen/',             label: 'CCOpen',       desc: 'Claude Code de Graça ou por Quase Nada' },
              { href: 'https://inematds.github.io/superskills-karpathy/', label: 'SuperSkills', desc: 'Skills como Funcionários Digitais (Karpathy)' },
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
              { href: 'https://inematds.github.io/manual-oculto-ia/', label: 'Manual Oculto', desc: 'System Prompts como os Labs Fazem — do Fundamento ao Cérebro do Fable' },
            ]},
            { title: '⚙️ Agentic OS', steps: [
              { href: 'https://inematds.github.io/agenticbasico/', label: 'Agentic Básico', desc: 'Fundamentos de Agentes IA — 5 Pilares + Arena' },
              { href: 'https://inematds.github.io/agenticos/',           label: 'Agentic OS',     desc: 'Sistema Operacional do Trabalho com IA' },
              { href: 'https://inematds.github.io/newagenticos/',        label: 'New Agentic OS', desc: 'Do Executivo ao Jarvis Multi-Cliente' },
              { href: 'https://inematds.github.io/curso-iamasters-os/',  label: 'iAmasters OS',   desc: 'Sistema Operativo Agêntico para Operadores de IA' },
              { href: 'https://inematds.github.io/loopgraph/',           label: 'Graph Engineering', desc: 'De loops isolados a grafos de agentes' },
              { href: 'https://inematds.github.io/curso-times-de-ia/',    label: 'Times de IA',       desc: 'Seis times de IA especializados por comando' },
            ]},
            { title: '🧩 Codex', steps: [
              { href: 'https://inematds.github.io/codexbasico/',        label: 'Codex Básico', desc: 'Curso Completo do Codex CLI em 6 Trilhas' },
              { href: 'https://inematds.github.io/iclaudex/',           label: 'iClaudeX',     desc: 'Planejamento com Claude + Codex no Terminal' },
              { href: 'https://inematds.github.io/makeclaudex/',        label: 'MakeClaudeX',  desc: 'Do Prompt ao Plugin de Produção' },
              { href: 'https://inematds.github.io/mastercodex/',        label: 'Master Codex', desc: 'Fábrica de SaaS com Agentes de IA' },
              { href: 'https://inematds.github.io/deepclaudex/',        label: 'DeepClaudeX',  desc: 'Multi-Modelo 70/20/10' },
              { href: 'https://inematds.github.io/ccxcx',              label: 'CCXCX',        desc: 'Claude e Codex Tool-Agnostic' },
              { href: 'https://inematds.github.io/ruflo/',              label: 'Ruflo',        desc: 'Orquestração de Agentes Multi-IA' },
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
              { href: 'https://inematds.github.io/hermes21c/',         label: 'Hermes 21C',      desc: 'Os 21 conceitos do Hermes explicados' },
              { href: 'https://inematds.github.io/agentehermes',       label: 'Agente Hermes',   desc: 'Assistente IA Self-Hosted com Docker' },
              { href: 'https://inematds.github.io/docker-openclaw/',   label: 'Docker OpenClaw', desc: 'Assistente IA Autônomo e Multi-Canal' },
              { href: 'https://inematds.github.io/intelecto-curso/',   label: 'INTELECTO Curso', desc: 'Do Zero ao Expert em IA' },
              { href: 'https://inematds.github.io/intelecto',          label: 'INTELECTO',       desc: 'Inteligência Pessoal sem Frameworks' },
              { href: 'https://inematds.github.io/agentejax/',         label: 'AgenteJAX',       desc: 'Agente de IA Pessoal em TypeScript' },
              { href: 'https://inematds.github.io/triad',              label: 'TRIAD',            desc: 'Automação de IA Multi-Modelo com Hermes e DeepSeek' },
              { href: 'https://inematds.github.io/hnotebooklm',        label: 'Hermes+NotebookLM', desc: 'Agente AI com RAG Grátis via Telegram' },
              { href: 'https://inematds.github.io/hermesagent/',       label: 'Hermes Agent',     desc: 'Curso Completo Avançado — Nous Research' },
              { href: 'https://inematds.github.io/manual-oculto-ia/', label: 'Manual Oculto', desc: 'O Loop Operacional e a Destilação do Cérebro do Fable' },
              { href: 'https://inematds.github.io/mundo-apos-claude/',  label: 'O Mundo Após o Claude', desc: 'De usuário a maestro: construa qualquer coisa e monte seu Jarvis' },
              { href: 'https://inematds.github.io/healthos/',           label: 'HealthOS',         desc: 'Coach de saúde pessoal com IA no Telegram' },
            ]},
            { title: '🗄️ Dados & IA', steps: [
              { href: 'https://inematds.github.io/engdadosai', label: 'Eng. Dados com IA', desc: 'A Base dos Sistemas de IA e Agentes' },
            ]},
          ] as Array<{ title: string; steps: Array<{ href: string; label: string; desc: string }> }>).map((trail) => (
            <div key={trail.title} className="trilha-group">
              <h4 className="trilha-group-title">{trail.title}</h4>
              {SHOW_DETALHES && (
              <div className="learning-path-cards">
                {trail.steps.map((p, i) => (
                  <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                     className={`path-card path-card-${(i % 4) + 1}`}
                     onClick={() => trackClick(p.href, p.label, 'trilhas')}>
                    <div className="path-number">{i + 1}</div>
                    <h4>{p.label}</h4>
                    <p>{p.desc}</p>
                  </a>
                ))}
              </div>
              )}
            </div>
          ))}
          </div>
          <div className="learning-path-footer">
            <div className="guide-link-btn-wrap">
              <a
                className="guide-link-btn"
                href="https://inema.pro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inema.pro', 'Trilhas — INEMA.PRO', 'trilhas')}
              >
                🧭 Acesse as trilhas completas no INEMA.PRO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos — id="projetos" é a âncora canônica (o agente navega pra cá);
          id="comunidade" fica no section por compatibilidade com links antigos */}
      <span id="projetos" />
      <section id="comunidade" className="community-projects-section">
        <div className="container">
          <div className="community-projects-header">
            <h3>Projetos</h3>
            <p>Projetos desenvolvidos pela INEMA — prontos para baixar e usar</p>
          </div>
          <div className="projetos-cta">
            <div className="projetos-cta-number">+400</div>
            <p>projetos prontos para baixar e usar</p>
            <p>Aplicativos, agentes, skills e ferramentas construídos pela comunidade INEMA, com código e guia de uso.</p>
            <div className="guide-link-btn-wrap">
              <a
                className="guide-link-btn"
                href="https://inema.pro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('https://inema.pro', 'Projetos — INEMA.PRO', 'projetos-comunidade')}
              >
                🚀 Ver os projetos no INEMA.PRO
              </a>
            </div>
          </div>
          {SHOW_DETALHES && (
          <div className="community-projects-grid">
            {sortedProjects.map((project) =>
              project.url ? (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="community-project-card community-project-card-linked"
                  onClick={() => trackClick(project.url!, project.name, 'projetos-comunidade')}
                >
                  <span className="community-project-icon">{project.icon}</span>
                  <h4>{project.name}</h4>
                  <p>{project.desc}</p>
                  <span className="community-project-badge">{project.badge ?? 'Link'}</span>
                </a>
              ) : (
                <div key={project.name} className="community-project-card">
                  <span className="community-project-icon">{project.icon}</span>
                  <h4>{project.name}</h4>
                  <p>{project.desc}</p>
                </div>
              )
            )}
          </div>
          )}
        </div>
      </section>

      {/* GitHub Repos — retirado da home, ver SHOW_DETALHES */}
      {SHOW_DETALHES && (
      <section id="github" className="github-section">
        <div className="container">
          <div className="github-header">
            <h3>Repositórios GitHub INEMA</h3>
            <p>Explore nossos projetos open-source e contribua com a comunidade</p>
          </div>
          <div className="github-grid">
            {repos.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Carregando repositórios…</p>
            ) : (
              repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-card"
                  onClick={() => trackClick(repo.url, repo.name, 'github')}
                >
                  <div className="github-card-header">
                    <span className="github-icon">
                      {(repo.language && LANG_ICON[repo.language]) ?? '📦'}
                    </span>
                    <h4>{repo.name}</h4>
                  </div>
                  <p className="github-description">
                    {repo.description || 'Sem descrição'}
                  </p>
                  <div className="github-stats">
                    <span className="github-stars">⭐ {repo.stars}</span>
                    {repo.language && (
                      <span className="github-stars" style={{ marginLeft: '0.75rem' }}>
                        {repo.language}
                      </span>
                    )}
                  </div>
                </a>
              ))
            )}
          </div>
          <div className="github-footer">
            <a
              href="https://github.com/inematds"
              target="_blank"
              rel="noopener noreferrer"
              className="github-view-all"
              onClick={() => trackClick('https://github.com/inematds', 'Ver todos os repositórios', 'github')}
            >
              Ver todos os repositórios no GitHub →
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Hero Banners */}
      <section className="hero-banner">
        <div className="container">
          <img
            src="/doc/inemaclubee.jpg"
            alt="Crie sua equipe. Lidere o futuro."
            className="hero-banner-image"
          />
        </div>
      </section>

      {/* Telegram */}
      <section id="telegram" className="telegram-section">
        <div className="container">
          <div className="telegram-header">
            <h3>Grupos e Canais Telegram</h3>
            <p>Junte-se à nossa comunidade de aprendizado</p>
          </div>
          <div className="telegram-grid">
            {[
              { icon: '💬', name: 'INEMA.VIP - Recepção' },
              { icon: '👥', name: 'INEMA.ADULTO' },
              { icon: '🤖', name: 'INEMA.AGENTES' },
              { icon: '🎭', name: 'INEMA.AVATARES' },
              { icon: '📋', name: 'BMAD - Método' },
              { icon: '💻', name: 'INEMA.CCODE' },
              { icon: '🔧', name: 'INEMA.CODEX' },
              { icon: '💼', name: 'INEMA.CONSULT' },
              { icon: '💰', name: 'INEMA.CPA' },
              { icon: '👨‍💻', name: 'INEMA.DEV' },
              { icon: '🌐', name: 'INEMA.FTD' },
              { icon: '🧠', name: 'INEMA.IA' },
              { icon: '🖼️', name: 'INEMA.IMAGENS' },
              { icon: '🔌', name: 'INEMA.INFRA' },
              { icon: '🔤', name: 'INEMA.LLMs' },
              { icon: '⚙️', name: 'INEMA.Make' },
              { icon: '📢', name: 'INEMA.MKT' },
              { icon: '🎵', name: 'INEMA.MUSICAL' },
              { icon: '🔄', name: 'INEMA.N8N' },
              { icon: '🧬', name: 'INEMA.NCIA' },
              { icon: '✍️', name: 'INEMA.Prompts' },
              { icon: '🌱', name: 'INEMA.TDS' },
              { icon: '⚡', name: 'INEMA.TIA' },
              { icon: '🛠️', name: 'INEMA.TOOLS' },
              { icon: '📹', name: 'INEMA.VIDEOS' },
              { icon: '👁️', name: 'INEMA.VISION' },
              { icon: '🎤', name: 'INEMA.VOZ' },
            ].map((g) => (
              <div key={g.name} className="telegram-btn">
                <span className="telegram-icon">{g.icon}</span>
                <span className="telegram-name">{g.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="container">
          <a
            href="https://inema.vip"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-link"
            onClick={() => trackClick('https://inema.vip', 'INEMA.VIP - Faça seu Cadastro', 'comunidade')}
          >
            <div className="featured-content">
              <div className="featured-logo">
                <img
                  src="/doc/conviteinemap.png"
                  alt="INEMA.VIP - Você foi convidado para a comunidade"
                />
              </div>
              <div className="featured-text">
                <h2 className="featured-title">INEMA.VIP</h2>
                <p className="featured-description">
                  Um espaço de autoaprendizado e transformação com IA e Humanoides
                </p>
              </div>
              <div className="featured-badge">Faça seu Cadastro →</div>
            </div>
          </a>
        </div>
      </section>

      {/* Social */}
      <section id="social" className="social-section">
        <div className="container">
          <div className="social-header">
            <h3>Redes Sociais INEMA</h3>
            <p>Siga-nos nas principais plataformas</p>
          </div>
          <div className="social-platforms">
            {/* TikTok */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">📱</span>
                <h4 className="platform-name">TikTok</h4>
              </div>
              <div className="social-links">
                {['@inema.tds', '@inema.tia', '@inemafuturos', '@inema.tech', '@inema.prompts', '@inema.robot', '@inema.vip'].map(
                  (handle) => (
                    <a
                      key={handle}
                      href={`https://www.tiktok.com/${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn tiktok"
                    >
                      <span>{handle}</span>
                    </a>
                  )
                )}
              </div>
            </div>
            {/* Instagram */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">📷</span>
                <h4 className="platform-name">Instagram</h4>
              </div>
              <div className="social-links">
                {['@inema.tds', '@inema.tia', '@inema.vip'].map((handle) => (
                  <a
                    key={handle}
                    href={`https://www.instagram.com/${handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                  >
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* YouTube */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">🎬</span>
                <h4 className="platform-name">YouTube</h4>
              </div>
              <div className="social-links">
                {['@inematdsx', '@inematia', '@inemaftd', '@inematec'].map((handle) => (
                  <a
                    key={handle}
                    href={`https://www.youtube.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn youtube"
                    onClick={() => trackClick(`https://www.youtube.com/${handle}`, handle, 'social')}
                  >
                    <span>{handle}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Facebook */}
            <div className="social-platform">
              <div className="platform-header">
                <span className="platform-icon">👍</span>
                <h4 className="platform-name">Facebook</h4>
              </div>
              <div className="social-links">
                {[
                  { handle: 'inemafuturos', url: 'https://www.facebook.com/inemafuturos' },
                  { handle: 'inematds', url: 'https://www.facebook.com/inematds' },
                ].map((fb) => (
                  <a
                    key={fb.handle}
                    href={fb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn facebook"
                  >
                    <span>{fb.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Portal INEMA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}
