// Catálogo de todos os vídeos produzidos pelo INEMA, exibido em /videos/.
// Vídeo novo publicado → uma entrada aqui (explicativo em `videosExplicativos`, vertical em `seriesShorts`),
// pôster em public/videos/<id>.jpg (ffmpeg -ss 40 -i <mp4> -frames:v 1 -vf scale=960:-2), atualizar VIDEOS_UPDATED, commit + push.
// Fonte: ~/projetos/explicavideos (lista de produções no guia) e ~/projetos/output/<id>/.
// Só entra vídeo aprovado pelo Nei: os 5 shorts de cards + voz sintética (inema-areas-viral, 28/09) foram reprovados e saíram.

export const VIDEOS_UPDATED = '2026-09-29'

// Vídeos explicativos 16:9 com avatar e voz do Nei; cada card abre o player publicado (capítulos e legendas)
// e lista cada vídeo com link direto do MP4 por idioma (versão final v2 do release).
export type Idioma = 'pt' | 'en' | 'es'
export type VideoItem = { label: string; mp4: Partial<Record<Idioma, string>> }

export type VideoExplicativo = {
  id: string
  title: string
  description: string
  meta: string
  playerUrl: string
  videos: VideoItem[]
}

const rel = (repo: string, tag: string) => `https://github.com/inematds/${repo}/releases/download/${tag}/`
const LOOP_R = rel('loop-r', 'video-v2.0.0')
const OSWORK_V62 = rel('oswork-v62', 'video-v1.0.0')

const loopR: [number, string][] = [
  [1, 'Por que sua empresa não melhora'],
  [2, 'O método'],
  [3, 'Os assistentes do loop'],
  [4, 'Medir de verdade'],
  [5, 'Da tarefa à empresa'],
]

// Idiomas publicados por módulo no release (m3 e m6 ainda sem PT; m6 sem EN).
const osworkV62: [number, Idioma[]][] = [
  [1, ['pt', 'en', 'es']],
  [2, ['pt', 'en', 'es']],
  [3, ['en', 'es']],
  [4, ['pt', 'en', 'es']],
  [5, ['pt', 'en', 'es']],
  [6, ['es']],
  [7, ['pt', 'en', 'es']],
  [8, ['pt', 'en', 'es']],
]

export const videosExplicativos: VideoExplicativo[] = [
  {
    id: 'loop-r',
    title: 'LOOP-R em vídeo',
    description: 'O método em cinco letras, trilha a trilha, com animação explicativa.',
    meta: '15 vídeos · 5 trilhas · ~17 min cada · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/loop-r/videos/',
    videos: loopR.map(([n, nome]) => ({
      label: `Trilha ${n} · ${nome}`,
      mp4: {
        pt: `${LOOP_R}loop-r-t${n}-pt.mp4`,
        en: `${LOOP_R}loop-r-t${n}-en-en.mp4`,
        es: `${LOOP_R}loop-r-t${n}-es-es.mp4`,
      },
    })),
  },
  {
    id: 'oswork-v62',
    title: 'OSWork v6.2: vídeo-aulas',
    description: 'Do chat ao seu ambiente de agentes, módulo por módulo.',
    meta: '21 vídeos · 8 módulos · ~16 min cada · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/oswork-v62/videos/',
    videos: osworkV62.map(([n, idiomas]) => ({
      label: `Módulo ${n}`,
      mp4: Object.fromEntries(idiomas.map((l) => [l, `${OSWORK_V62}oswork-v62-m${n}-${l}-v2.mp4`])),
    })),
  },
  {
    id: 'oswork-completo',
    title: 'OSWork completo',
    description: 'O curso inteiro em um vídeo, com capítulos para pular direto ao ponto.',
    meta: '1 vídeo · 66 min · PT',
    playerUrl: 'https://inematds.github.io/oswork/videos/',
    videos: [{ label: 'Curso completo', mp4: { pt: `${rel('oswork', 'video-v2.0.0')}oswork-completo-pt.mp4` } }],
  },
  {
    id: 'oswork-quick',
    title: 'OSWork Quick: as sete aulas',
    description: 'A versão rápida do OSWork: contexto, tarefa e verificação em sete aulas.',
    meta: '3 vídeos · 7 aulas · ~30 min · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/oswork-quick/videos/',
    videos: [{
      label: 'As sete aulas',
      mp4: Object.fromEntries((['pt', 'en', 'es'] as Idioma[]).map((l) => [l, `${rel('oswork-quick', 'v1.1.0')}oswork-quick-${l}.mp4`])),
    }],
  },
  {
    id: 'astra-basico',
    title: 'Astra Básico: controle de tokens',
    description: 'Entenda o consumo, escolha os recursos e confira o resultado.',
    meta: '3 vídeos · ~17 min · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/astrabasico/guia/',
    videos: [{
      label: 'Controle de tokens, na prática',
      mp4: Object.fromEntries((['pt', 'en', 'es'] as Idioma[]).map((l) => [l, `${rel('astrabasico', 'v1.1.0')}astra-basico-${l}.mp4`])),
    }],
  },
  {
    id: 'iacultivada',
    title: 'IA Cultivada',
    description: 'Não se programa, se cultiva: por que a sua IA repete o mesmo erro e como ela melhora.',
    meta: '1 vídeo · 10 min · PT',
    playerUrl: 'https://inematds.github.io/iacultivada/videos/',
    videos: [{ label: 'IA Cultivada', mp4: { pt: `${rel('iacultivada', 'video-v2.0.0')}iacultivada-pt.mp4` } }],
  },
  {
    id: 'codex-claude',
    title: 'Codex + Claude: um planeja, o outro critica',
    description: 'Os seis níveis do Use Both, quem faz o quê e os cursos e kits abertos do INEMA.',
    meta: '2 vídeos 16:9 + reel · PT',
    playerUrl: 'https://inematds.github.io/codex-claude-video/videos/',
    videos: [
      { label: 'Completo · 6 min', mp4: { pt: `${rel('codex-claude-video', 'video-v2.0.0')}codex-claude-completo-16x9.mp4` } },
      { label: 'Essencial · 3 min', mp4: { pt: `${rel('codex-claude-video', 'video-v2.0.0')}codex-claude-essencial-16x9.mp4` } },
    ],
  },
]

export const totalVideosExplicativos = videosExplicativos.reduce(
  (n, p) => n + p.videos.reduce((m, v) => m + Object.keys(v.mp4).length, 0),
  0,
)

// Vídeos verticais 9:16 (Reels/Shorts), tocados direto na página.
export type VideoShort = {
  id: string
  title: string
  description: string
  duration: string
  mp4: string
  poster: string
  link?: { href: string; label: string }
}

export type SerieShorts = {
  id: string
  title: string
  description: string
  videos: VideoShort[]
}

const EVENTOS_SHORTS_RELEASE = 'https://github.com/inematds/eventos-shorts/releases/download/v1.0.0/'

const eventosShorts: [string, string, string, string][] = [
  ['rsi', 'RSI', 'Sua empresa usa IA todo dia e não melhora. Porque essa IA termina ali: responde e esquece.', '40 s'],
  ['ia-cultivada', 'IA Cultivada', 'Seu modelo de IA é o mesmo do concorrente. O que muda é o jardim.', '30 s'],
  ['claude-codex', 'Claude → Codex', 'Você está preso ao seu modelo de IA e nem percebeu. Não migre o seu cérebro.', '31 s'],
  ['codex-claude', 'Codex + Claude', 'Claude ou Codex? Pergunta errada. Um planeja, o outro critica.', '28 s'],
  ['oswork', 'OSWork', 'Toda conversa com a IA começa do zero? Isso não é sistema de trabalho, é chat.', '30 s'],
  ['jev', 'JEV', 'Sua IA decide e você não sabe por quê? Sem critério e sem avaliação, é aposta.', '33 s'],
  ['gestao-ia', 'Gestão de IA', 'Criar agentes ficou fácil. Gerenciar, não. 2027 é o ano de gerenciar agentes.', '28 s'],
  ['agi-ready', 'AGI-ready', 'A IA parou de esperar ordens. Seu trabalho agora é comandar agentes.', '34 s'],
  ['webmcp', 'WebMCP', 'O próximo visitante do seu site pode não ser uma pessoa. Rode o diagnóstico gratuito.', '29 s'],
]

export const seriesShorts: SerieShorts[] = [
  {
    id: 'eventos',
    title: 'As 9 áreas do Eventos INEMA, com o Nei',
    description: 'Um vídeo de 30 segundos por área: o gancho, a tese e o convite para a área completa.',
    videos: eventosShorts.map(([slug, title, description, duration]) => ({
      id: `eventos-${slug}`,
      title,
      description,
      duration,
      mp4: `${EVENTOS_SHORTS_RELEASE}${slug}.mp4`,
      poster: `/videos/eventos-${slug}.jpg`,
      link: { href: `https://eventos.inema.pro/${slug}/`, label: 'Abrir a área' },
    })),
  },
  {
    id: 'reels',
    title: 'Reels',
    description: 'Cortes verticais dos vídeos explicativos.',
    videos: [
      {
        id: 'codex-claude-reel',
        title: 'Codex + Claude: a IA aprova o próprio plano',
        description: 'Você pede um plano para a IA e ela mesma aprova. Um planeja, o outro critica.',
        duration: '1 min 31 s',
        mp4: 'https://github.com/inematds/codex-claude-video/releases/download/video-v2.0.0/codex-claude-reel-9x16.mp4',
        poster: '/videos/codex-claude-reel.jpg',
        link: { href: 'https://inematds.github.io/codex-claude-video/videos/', label: 'Ver o vídeo completo' },
      },
    ],
  },
]

export const totalVideosShorts = seriesShorts.reduce((n, s) => n + s.videos.length, 0)
