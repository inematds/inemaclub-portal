// Ferramentas do agente — schema fechado, formato OpenAI-compatible
// (OpenRouter normaliza assim mesmo para modelos Claude por trás).
// O modelo NUNCA inventa rota: navigate_to só aceita valores do enum.

// Só âncoras que existem de verdade na home (Portal.tsx). Atualizado em
// 2026-08-01: saíram #cursos, #github e as trilhas Profissional/Vibe/Skills —
// a home passou a mostrar só títulos de trilha e uma chamada de projetos.
const PORTAL_ANCHORS = [
  '/aprender-inteligencia-artificial/',
  '/ia/',
  '/ia/como-criar-um-agente-de-ia/',
  '/ia/como-criar-um-jarvis-com-ia/',
  '/agentes-de-inteligencia-artificial/',
  '/comunidade-inteligencia-artificial/',
  '/#novidades',
  '/#trilha-iniciantes',
  '/#trilhas',
  '/#projetos',
  '/#comunidade',
  '/#telegram',
  '/#social',
];

export function buildTools(conhecimentoSlugs: string[]) {
  const rotas = [
    ...PORTAL_ANCHORS,
    ...conhecimentoSlugs.map(slug => `/conhecimento/${slug}/`),
  ];

  return [
    {
      type: 'function',
      function: {
        name: 'navigate_to',
        description: 'Navega o visitante para uma página real do site durante o tour guiado. Use só quando fizer sentido mostrar a página, não para toda resposta.',
        parameters: {
          type: 'object',
          properties: {
            rota: { type: 'string', enum: rotas, description: 'Rota exata do site para navegar.' },
            motivo: { type: 'string', description: 'Frase curta falando DIRETAMENTE com o visitante (segunda pessoa), que aparece pra ele no chat. Ex.: "Te levo pras novidades — a IA nova que o Nei postou está lá." Nunca escreva em terceira pessoa ("levar o visitante…").' },
          },
          required: ['rota', 'motivo'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'registrar_pedido',
        description: 'Registra na fila de construção do INEMA algo que o visitante quer e que NÃO existe no catálogo (nenhuma ficha resolve). O time usa essa fila para construir o que foi pedido. Chame assim que ficar claro o que a pessoa quer e que não temos — o contato é opcional: ofereça avisar quando ficar pronto e, se a pessoa deixar e-mail ou Telegram, chame de novo com o contato. Não use para perguntas fora do tema IA/automação nem para testes.',
        parameters: {
          type: 'object',
          properties: {
            pedido: { type: 'string', description: 'O que a pessoa quer que exista, em 1–2 frases objetivas (ex.: "sistema que publica vídeos de avatar no TikTok automaticamente para uma loja de cosméticos").' },
            contexto: { type: 'string', description: 'Quem é a pessoa e o nível dela (profissão, negócio, se programa ou não), se ela disse.' },
            nome: { type: 'string' },
            email: { type: 'string' },
            telegram: { type: 'string', description: '@usuario do Telegram, se a pessoa deixar.' },
          },
          required: ['pedido'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'capture_lead',
        description: 'Registra o contato do visitante quando ele demonstra interesse real e concorda em deixar os dados. Só chame depois que a pessoa topar explicitamente.',
        parameters: {
          type: 'object',
          properties: {
            nome: { type: 'string' },
            email: { type: 'string' },
            interesse: { type: 'string', description: 'Resumo curto do que a pessoa procura (curso, imersão, singular, etc.)' },
          },
          required: ['nome', 'email'],
        },
      },
    },
  ];
}
