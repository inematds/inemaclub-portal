// Vídeos curtos 9:16 (Reels/Shorts) sobre as 9 áreas do eventos.inema.pro.
// MP4 no release `videos-virais-v1.0.0` do repo público inematds/inemaclub-portal; pôster em public/videos/.
// Fonte do projeto: ~/projetos/output/inema-areas-viral (HyperFrames + voz local).
export type VideoViral = {
  id: string
  title: string
  angle: string
  description: string
  duration: string
}

export const VIDEOS_VIRAIS_RELEASE = 'https://github.com/inematds/inemaclub-portal/releases/download/videos-virais-v1.0.0/'
export const VIDEOS_VIRAIS_UPDATED = '2026-09-28'

export const videosVirais: VideoViral[] = [
  {
    id: 'v1',
    title: 'Isso deveria custar caro',
    angle: 'Provocação',
    description: 'Nove áreas de IA na prática, 31 cursos e 41 projetos. Tudo aberto, em português, inglês e espanhol.',
    duration: '46 s',
  },
  {
    id: 'v2',
    title: '9 áreas de IA em 1 minuto',
    angle: 'Lista',
    description: 'RSI, IA Cultivada, OSWork, Claude → Codex, Codex + Claude, JEV, Gestão de IA, AGI-ready e WebMCP, uma frase para cada.',
    duration: '54 s',
  },
  {
    id: 'v3',
    title: '2027: gerenciar agentes',
    angle: 'Tese',
    description: 'Em 2026 aprendemos a criar agentes. Em 2027 o jogo é gerenciar: as oito frentes da Gestão de IA.',
    duration: '47 s',
  },
  {
    id: 'v4',
    title: 'Por onde começar?',
    angle: 'Caminho por perfil',
    description: 'Tem um site, usa Claude Code ou Codex, é gestor ou está começando do zero: qual área abrir primeiro.',
    duration: '48 s',
  },
  {
    id: 'v5',
    title: 'Zero reais',
    angle: 'Número',
    description: 'Mais de 400 projetos no INEMA.CLUB. Não é amostra grátis de curso pago. É o curso.',
    duration: '40 s',
  },
]

export const videoViralMp4 = (id: string) => `${VIDEOS_VIRAIS_RELEASE}inema-areas-${id}-9x16.mp4`
