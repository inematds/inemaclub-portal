import type { IaPage } from './types'

const page: IaPage = {
  slug: 'como-criar-um-agente-de-ia',
  title: 'Como criar um agente de IA: do processo ao agente funcionando',
  metaTitle: 'Como criar um agente de IA (passo a passo prático)',
  description:
    'Passo a passo para criar um agente de IA que funciona: escolher a tarefa, dar contexto e ferramentas, definir limites de autonomia, testar e supervisionar.',
  keyword: 'como criar um agente de IA',
  answer:
    'Para criar um agente de IA, comece por **uma tarefa repetitiva e bem definida**, não por uma ferramenta. Escreva a intenção, dê ao agente o contexto e os dados de que ele precisa, defina o que é um resultado bom, limite o que ele pode fazer sozinho e teste com casos reais antes de soltar. O modelo de IA é a parte mais fácil; o que faz o agente funcionar é a gestão em volta dele.',
  published: '2026-09-23',
  updated: '2026-09-23',
  sections: [
    {
      heading: 'O que é um agente de IA (e o que não é)',
      paragraphs: [
        'Um chatbot responde perguntas. Um **agente** recebe um objetivo e executa passos para chegar lá: consulta dados, usa ferramentas (planilha, e-mail, navegador, terminal), decide o próximo passo e entrega um resultado.',
        'Na prática, todo agente é a soma de quatro peças: **um modelo** (Claude, GPT, Gemini, um modelo local), **instruções** (o que fazer e como), **ferramentas** (o que ele consegue acessar e acionar) e **limites** (o que ele não pode fazer sem um humano).',
      ],
    },
    {
      heading: 'Passo a passo: os 7 princípios para criar o agente',
      paragraphs: [
        'No INEMA, todo agente começa por uma ficha com sete perguntas — os [7 Princípios da Gestão de Agentes de IA](https://inematds.github.io/7pa/guia/). Elas valem para qualquer plataforma — Claude Code, Codex, n8n, um GPT personalizado ou um atendente de WhatsApp:',
      ],
      ordered: true,
      list: [
        '**Intenção** — qual problema o agente resolve e para quem? Uma frase. Se não cabe em uma frase, são dois agentes.',
        '**Contexto** — o que um funcionário novo precisaria saber para fazer esse trabalho: regras da empresa, tom, exceções.',
        '**Dados** — de onde vêm as informações (planilha, CRM, documentos) e o que o agente **não** pode ver.',
        '**Critério de sucesso** — como você sabe que a resposta está boa? Escreva 2 ou 3 exemplos de resultado certo.',
        '**Autonomia com limites** — o que ele faz sozinho e o que precisa de aprovação (ver os níveis abaixo).',
        '**Observação** — onde fica registrado o que o agente fez, para você conferir depois.',
        '**Supervisão** — quem revisa, com que frequência, e o que acontece quando ele erra.',
      ],
    },
    {
      heading: 'Quanto de autonomia dar ao agente: níveis N0 a N4',
      paragraphs: [
        'O erro mais comum é dar autonomia demais cedo demais. Comece baixo e suba de nível só depois de ver o agente acertar em casos reais:',
      ],
      table: {
        head: ['Nível', 'O agente…', 'Exemplo'],
        rows: [
          ['N0 — consulta', 'responde perguntas, não age', 'tirar dúvidas sobre um manual interno'],
          ['N1 — recomenda', 'sugere, o humano decide e faz', 'sugerir a resposta para um cliente'],
          ['N2 — prepara', 'deixa pronto, o humano aprova', 'rascunhar o e-mail e aguardar o envio'],
          ['N3 — executa', 'faz sozinho dentro de limites', 'agendar reuniões na agenda livre'],
          ['N4 — gerencia', 'coordena processos e outros agentes', 'triagem completa de um fluxo de pedidos'],
        ],
      },
    },
    {
      heading: 'Onde construir o seu primeiro agente',
      paragraphs: [
        'A plataforma importa menos que a ficha. Escolha pelo tipo de trabalho:',
      ],
      list: [
        '**Sem programar:** GPTs personalizados, Claude Projects ou ferramentas de automação visual como n8n — bons para N0 a N2.',
        '**Com agentes de código:** Claude Code e Codex rodam no seu computador, leem arquivos, executam comandos e seguem instruções fixas (AGENTS.md / CLAUDE.md, skills). É o caminho para agentes N2 a N4.',
        '**Atendimento:** um agente de WhatsApp com base de conhecimento própria, que responde só o que está documentado e passa para um humano no resto.',
      ],
    },
    {
      heading: 'Como testar antes de colocar para trabalhar',
      list: [
        'Separe 10 casos reais, incluindo 3 difíceis ou fora do padrão.',
        'Rode o agente em todos e compare com o critério de sucesso que você escreveu.',
        'Anote cada erro em um diário de falhas e corrija a instrução — não só a resposta.',
        'Só aumente o nível de autonomia quando ele acertar os casos difíceis de forma consistente.',
      ],
    },
    {
      heading: 'Erros comuns ao criar agentes de IA',
      list: [
        'Começar pela ferramenta da moda em vez de pela tarefa.',
        'Instrução vaga ("seja um ótimo assistente") sem exemplos do resultado esperado.',
        'Dar acesso a tudo (e-mail, pagamentos, dados de clientes) logo no primeiro dia.',
        'Não registrar o que o agente fez — sem histórico, não há como melhorar.',
        'Tratar o agente como pronto: agente bom é o que é revisado e ajustado toda semana.',
      ],
    },
  ],
  faq: [
    {
      question: 'Preciso saber programar para criar um agente de IA?',
      answer:
        'Não. Agentes de consulta, recomendação e preparação (N0 a N2) podem ser montados sem código em GPTs personalizados, Claude Projects ou ferramentas visuais. Programar ajuda para agentes que executam tarefas no computador, e agentes de código como Claude Code e Codex reduzem muito essa barreira.',
    },
    {
      question: 'Qual a diferença entre um chatbot e um agente de IA?',
      answer:
        'O chatbot conversa e responde. O agente recebe um objetivo e executa passos usando ferramentas — consulta dados, preenche planilhas, envia mensagens — dentro dos limites que você definiu.',
    },
    {
      question: 'Quanto custa criar um agente de IA?',
      answer:
        'Um primeiro agente pode ser feito com a assinatura de um assistente de IA que você já usa. O custo cresce com o volume de uso (tokens), com integrações pagas e com o tempo de supervisão — que costuma ser o custo esquecido.',
    },
    {
      question: 'Qual o melhor primeiro agente para uma empresa?',
      answer:
        'Uma tarefa repetitiva, de baixo risco e fácil de conferir: triagem de e-mails, resumo de reuniões, rascunho de respostas a clientes ou organização de documentos. Comece no nível N1 ou N2, com um humano aprovando.',
    },
  ],
  relatedCourses: [
    'https://inematds.github.io/FEA-IA/',
    'https://inematds.github.io/agenticbasico/',
    'https://inematds.github.io/agentejax/',
    'https://inematds.github.io/criaagentes/guia/',
    'https://inematds.github.io/FEC/',
    'https://inematds.github.io/skills-craft/',
  ],
  relatedPages: [
    { path: '/aprender-inteligencia-artificial/', title: 'Como aprender Inteligência Artificial do zero ao avançado' },
    { path: '/conhecimento/faq-criar-agentes-de-ia-sem-programar/', title: 'Dá para criar agentes de IA sem programar?' },
  ],
  pillar: { path: '/aprender-inteligencia-artificial/', title: 'Aprender IA' },
}

export default page
