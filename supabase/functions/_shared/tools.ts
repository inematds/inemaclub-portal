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
            motivo: { type: 'string', description: 'Explicação curta (1 frase) de por que está levando o visitante para essa página, pra narrar durante o tour.' },
          },
          required: ['rota', 'motivo'],
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
