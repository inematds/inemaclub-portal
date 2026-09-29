// Catálogo de todos os vídeos produzidos pelo INEMA, exibido em /videos/.
// Vídeo novo publicado → uma entrada aqui (explicativo em `videosExplicativos`, vertical em `seriesShorts`),
// pôster em public/videos/<id>.jpg (ffmpeg -ss 40 -i <mp4> -frames:v 1 -vf scale=960:-2), atualizar VIDEOS_UPDATED, commit + push.
// Fonte da maioria: ~/projetos/explicavideos (lista de produções no guia) e ~/projetos/output/<id>/.
import { videosVirais, videoViralMp4 } from './videos-virais'

export const VIDEOS_UPDATED = '2026-09-29'

// Vídeos explicativos 16:9 com avatar e voz do Nei; cada card abre o player publicado (capítulos e legendas).
export type VideoExplicativo = {
  id: string
  title: string
  description: string
  meta: string
  playerUrl: string
}

export const videosExplicativos: VideoExplicativo[] = [
  {
    id: 'loop-r',
    title: 'LOOP-R em vídeo',
    description: 'O método em cinco letras, trilha a trilha, com animação explicativa.',
    meta: '5 trilhas · ~17 min cada · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/loop-r/videos/',
  },
  {
    id: 'oswork-v62',
    title: 'OSWork v6.2: vídeo-aulas',
    description: 'Do chat ao seu ambiente de agentes, módulo por módulo.',
    meta: '8 módulos · ~16 min cada · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/oswork-v62/videos/',
  },
  {
    id: 'oswork-completo',
    title: 'OSWork completo',
    description: 'O curso inteiro em um vídeo, com capítulos para pular direto ao ponto.',
    meta: '1 vídeo · 66 min · PT',
    playerUrl: 'https://inematds.github.io/oswork/videos/',
  },
  {
    id: 'oswork-quick',
    title: 'OSWork Quick: as sete aulas',
    description: 'A versão rápida do OSWork: contexto, tarefa e verificação em sete aulas.',
    meta: '7 aulas · ~30 min por idioma · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/oswork-quick/videos/',
  },
  {
    id: 'astra-basico',
    title: 'Astra Básico: controle de tokens',
    description: 'Entenda o consumo, escolha os recursos e confira o resultado.',
    meta: '~17 min · PT, EN, ES',
    playerUrl: 'https://inematds.github.io/astrabasico/guia/',
  },
  {
    id: 'iacultivada',
    title: 'IA Cultivada',
    description: 'Não se programa, se cultiva: por que a sua IA repete o mesmo erro e como ela melhora.',
    meta: '1 vídeo · 10 min · PT',
    playerUrl: 'https://inematds.github.io/iacultivada/videos/',
  },
  {
    id: 'codex-claude',
    title: 'Codex + Claude: um planeja, o outro critica',
    description: 'Os seis níveis do Use Both, quem faz o quê e os cursos e kits abertos do INEMA.',
    meta: 'Completo 6 min · essencial 3 min · reel 9:16 · PT',
    playerUrl: 'https://inematds.github.io/codex-claude-video/videos/',
  },
]

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
    id: 'areas',
    title: '9 áreas de IA, cinco ângulos',
    description: 'Cinco vídeos curtos sobre o mesmo acervo: cada área com curso, projeto e o primeiro passo, sem cobrança.',
    videos: videosVirais.map((v) => ({
      id: `inema-areas-${v.id}`,
      title: v.title,
      description: v.description,
      duration: `${v.angle} · ${v.duration}`,
      mp4: videoViralMp4(v.id),
      poster: `/videos/inema-areas-${v.id}.jpg`,
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
