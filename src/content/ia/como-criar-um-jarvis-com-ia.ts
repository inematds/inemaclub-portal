import type { IaPage } from './types'

const page: IaPage = {
  slug: 'como-criar-um-jarvis-com-ia',
  title: 'Como criar um Jarvis com IA: o assistente pessoal que roda na sua máquina',
  metaTitle: 'Como criar um Jarvis com IA: Telegram, memória e Ollama',
  description:
    'Como criar um Jarvis com IA na sua máquina: bot no Telegram, modelo local no Ollama, memória que aprende e agentes com Claude e Codex: o openpcbot v3.',
  keyword: 'como criar um Jarvis com IA',
  answer:
    'Para criar um Jarvis com IA, junte quatro peças: um **canal** para falar com ele (um bot próprio no Telegram), um **modelo** que responde (local no Ollama, com nuvem só quando precisa), uma **memória** que guarda o que você disse e um **controle** do que ele pode fazer e gastar. O openpcbot v3, projeto aberto do INEMA, funciona assim.',
  published: '2026-09-24',
  updated: '2026-09-24',
  sections: [
    {
      heading: 'O que é um Jarvis de IA (e o que muda em relação a um chatbot)',
      paragraphs: [
        'Um "Jarvis" é um assistente pessoal que fica ligado o tempo todo, fala com você por um canal que você já usa, lembra do que você contou ontem e consegue fazer coisas por você: criar lembrete, ler a agenda, rodar uma tarefa no computador. Um chatbot comum só responde e esquece.',
        'Por baixo, um Jarvis é um agente de IA com três coisas a mais: **canal fixo**, **memória de longo prazo** e **rotina própria** (tarefas agendadas, resumo diário, alertas). Se você ainda não montou nenhum agente, comece por [como criar um agente de IA](/ia/como-criar-um-agente-de-ia/): intenção, limites e níveis de autonomia valem igual aqui.',
      ],
    },
    {
      heading: 'As peças de um Jarvis, no exemplo do openpcbot v3',
      paragraphs: [
        'O [openpcbot v3](https://github.com/inematds/openpcbotv3) é o assistente pessoal que o INEMA roda no dia a dia, com código aberto no GitHub. Ele fala por Telegram, terminal e HTTP, e cada mensagem passa pelas mesmas peças:',
      ],
      table: {
        head: ['Peça', 'O que faz no openpcbot v3'],
        rows: [
          ['Canal', 'Telegram (bot próprio criado no BotFather), linha de comando e HTTP local'],
          ['Roteador', 'um modelo pequeno e local (llama3.2) decide se a mensagem é conversa direta ou trabalho de agente'],
          ['Modelo de conversa', 'Qwen (qwen3.8:27b) no Ollama, residente na memória, sem sair da máquina'],
          ['Agentes', 'trabalho com ferramenta (arquivo, terminal, web, agenda) vira um job na fila e roda com o Claude pelo CLI'],
          ['Memória', 'banco SQLite com busca por palavra e por vetor (bge-m3), mais um cofre de fatos que você aprova'],
          ['Controle de gastos', 'toda chamada de modelo passa por um único gateway que registra o uso e respeita um teto de orçamento'],
        ],
      },
    },
    {
      heading: 'Como criar um Jarvis com IA: o passo a passo do openpcbot v3',
      paragraphs: [
        'O caminho abaixo é o do projeto real, na ordem em que o [curso openpcbot v3: seu Jarvis local](/cursos/274-openpcbot-v3-seu-jarvis-local-instalar-usar-e-configurar/) ensina (aberto, 4 trilhas e 48 tópicos). Ele pede Linux com systemd de usuário, Node 20 ou mais novo, o Ollama rodando como serviço e o CLI do Claude instalado.',
        'Um aviso antes de começar: o v3 foi feito para rodar ao lado da versão anterior, o openpcbot v2, e o curso lista o .env do v2 como pré-requisito, porque é de lá que vêm as chaves compartilhadas e o chat permitido. Quem começa do zero precisa preparar isso também, ou partir de um caminho montado do zero, como o Intelecto ou o AgenteJAX (mais abaixo).',
      ],
      ordered: true,
      list: [
        'Crie um bot **só dele** no BotFather do Telegram e guarde o token. Dois programas lendo o mesmo token recebem erro 409 e os dois bots ficam surdos.',
        'Instale as dependências (npm install), copie o .env.exemplo para .env e preencha o token do bot novo. As chaves compartilhadas e o chat permitido vêm do .env do openpcbot v2.',
        'Confira os modelos em config/ollama.yaml: um pequeno para rotear, um geral para conversar, um de embeddings para a memória.',
        'Rode npm run doctor: ele checa variáveis, Ollama, RAM, CLIs e serviço, e marca cada linha como ok, aviso ou erro.',
        'Instale o serviço com bash scripts/instalar-servico.sh: ele compila e sobe uma unit do systemd com teto de 2 GB de memória e reinício automático.',
        'Faça a primeira conversa: /versao, /health e /chatid no Telegram, ou npm run cli sem Telegram.',
      ],
    },
    {
      heading: 'Como falar com o seu Jarvis no Telegram',
      paragraphs: ['No ar, quase tudo se faz por mensagem:'],
      list: [
        '/tarefa add amanhã 9h revisar proposta: cria um lembrete; /tarefa lista mostra as pendentes.',
        '/daily: resumo com tarefas, o que foi feito nas últimas 24 horas e estado da fila.',
        '/memoria buscar, /memoria salvar e /memoria esquecer: consultar e corrigir o que ele lembra.',
        '/usage: o uso de modelos no dia, na semana e no mês, por tier e por agente.',
        '/parar tudo e /retomar: um interruptor que segura qualquer resposta ou agente até você liberar.',
      ],
    },
    {
      heading: 'Como o Jarvis lembra de você',
      paragraphs: [
        'A memória é o que separa um Jarvis de um chatbot, e também onde é mais fácil errar. No openpcbot v3 ela funciona em quatro camadas. No contexto de cada resposta entram no máximo 600 tokens de memória, para o prompt não inchar.',
      ],
      list: [
        '**Toda mensagem sua com mais de 20 caracteres** vira uma memória, marcada como durável ("prefiro", "moro em", "sempre") ou passageira. Pergunta nunca vira fato.',
        '**Importância que decai:** cada memória começa com peso 1,0, sobe 0,1 a cada uso e perde 0,5 % ao dia (durável) ou 2 % ao dia (passageira).',
        '**Consolidação às 4h da manhã,** no modelo local: junta duplicatas, marca contradições (a informação antiga fica registrada, não é apagada) e gera até 3 resumos por chat.',
        '**Cofre curado:** o bot propõe fatos para os arquivos MEMORY.md e USER.md, mas nada entra sem você aprovar com /memoria aprovar.',
      ],
    },
    {
      heading: 'O que roda local e o que vai para a nuvem',
      paragraphs: [
        'Um assistente pessoal com IA local não precisa ser 100 % local. O openpcbot v3 roda na **assinatura do Claude**, no **Codex** e com várias chaves de API, e roda **local com Ollama e Qwen**. O desenho é: local por padrão, nuvem quando a tarefa pede, e só local quando o teto de orçamento é atingido.',
        'Em volta dele há serviços locais que o Jarvis aciona, como o inemavox (transcrever, baixar, dublar e cortar vídeos) e o inemaimg. A parte local pede máquina: o modelo geral fixo na memória ocupa 17 GB de RAM, e na máquina do INEMA a RAM livre caiu de 57 para 35 GB quando ele ficou residente.',
      ],
      table: {
        head: ['Onde roda', 'Com o quê', 'Quando é usado'],
        rows: [
          ['Local', 'Ollama com Qwen (qwen3.8:27b)', 'padrão para conversa, resumo, tradução e memória'],
          ['Nuvem por chave de API', 'OpenRouter (Claude Haiku)', 'raciocínio longo ou Ollama sem RAM livre'],
          ['Assinatura, pelo CLI', 'Claude (e Codex)', 'trabalho de agente com ferramentas'],
        ],
      },
    },
    {
      heading: 'Do Intelecto ao openpcbot v3: como o Nei construiu o próprio Jarvis',
      paragraphs: [
        'O openpcbot v3 não nasceu pronto. Conforme os primeiros Jarvis foram surgindo, o Nei Maldaner estudou esses sistemas e construiu o seu próprio, otimizado e enxuto. Começou pelo Intelecto e evoluiu para um Jarvis pessoal produtivo, que é o openpcbot. No caminho, criou sistemas paralelos para simplificar as próprias tarefas de criação de conteúdo e de testes. "Estamos sempre melhorando", resume.',
        'Construir a própria base em vez de só instalar um sistema pronto é uma escolha. "Se pegar sistemas prontos será apenas um operador, fácil de ser substituído", diz o Nei. Por isso o caminho sugerido é o mesmo que ele fez:',
      ],
      ordered: true,
      list: [
        '**Aprender Jarvis do básico com o Intelecto:** o [INTELECTO Curso — Do Zero ao Expert em IA](/cursos/74-intelecto-curso-do-zero-ao-expert-em-ia/) cobre fundamentos, identidade e canais, segurança, memória e integrações, e termina com um projeto final: o seu Jarvis. São 6 trilhas.',
        '**Ver um Jarvis de produção por dentro:** o curso do openpcbot v3 mostra o assistente que o INEMA usa todo dia, com fila, memória e controle de gastos.',
        '**Ajustar ao seu dia a dia:** trocar modelos, persona, agentes e skills até ele fazer só o que você precisa.',
      ],
    },
    {
      heading: 'O que deu errado construindo o nosso Jarvis',
      paragraphs: ['O projeto registra cada falha real. Três mostram onde um Jarvis caseiro quebra:'],
      list: [
        '**Servidor aberto na rede sem senha.** O HTTP subiu sem token e aberto na rede: qualquer aparelho do mesmo Wi-Fi poderia disparar um agente com permissões. A revisão pegou antes de virar incidente; agora ele escuta só na própria máquina.',
        '**Primeira conversa falhou por uma aspa.** O tempo de permanência do modelo estava como texto "-1" no arquivo de configuração, e o Ollama só aceita -1 como número.',
        '**O botão de interromper não parava o agente.** O comando de interrupção cancelava a resposta direta em andamento, mas não o agente rodando na fila, que é o caso comum. Corrigido na versão 3.2.2.',
      ],
    },
    {
      heading: 'Limitações que o projeto admite',
      list: [
        'A memória guarda a frase inteira, não um fato extraído dela.',
        'WhatsApp ainda não funciona no v3; Slack está desligado.',
        'O modo steer não consegue mudar um agente que já está rodando: a mensagem nova só entra quando ele termina.',
        'Voz no Telegram e ferramentas MCP no caminho local estão planejadas, não prontas.',
      ],
    },
    {
      heading: 'Outros caminhos para montar um Jarvis no INEMA',
      paragraphs: [
        'O catálogo do INEMA tem 5 cursos com a tag Jarvis, incluindo o do openpcbot v3. Além do Intelecto, outros três caminhos:',
      ],
      list: [
        '**Construir o seu do zero, em TypeScript:** o [AgenteJAX](/cursos/84-agentejax-construa-seu-agente-de-ia-pessoal/) monta um agente pessoal no Telegram.',
        '**Entender o conceito antes de programar:** o curso [Jarvis — Seu Sistema Operacional de IA](/cursos/181-jarvis-seu-sistema-operacional-de-ia/) é para leigos.',
        '**Preparar a máquina para rodar modelos locais:** a [IA Local Masterclass](/cursos/187-ia-local-masterclass-ia-na-sua-maquina-soberania-privacidade-e-agentes-24-7/) cobre hardware e Ollama.',
      ],
    },
    {
      heading: 'Por onde começar o seu Jarvis',
      paragraphs: [
        'Para ver o projeto funcionando por dentro, o [guia de uso do openpcbot v3](https://inematds.github.io/openpcbotv3/guia/) mostra a instalação e os comandos. Como criar um Jarvis com IA, no fim, é menos escolher o modelo e mais decidir o que ele pode lembrar, gastar e fazer sem te perguntar.',
      ],
    },
  ],
  faq: [
    {
      question: 'Dá para criar um Jarvis com IA de graça?',
      answer:
        'Dá para rodar a conversa inteira no seu computador, com Ollama e um modelo aberto como o Qwen, sem pagar por chamada. O que pesa é a máquina: o modelo geral do openpcbot v3 ocupa 17 GB de RAM. Agentes com ferramentas usam a assinatura do Claude, o Codex ou chaves de API.',
    },
    {
      question: 'O Jarvis no Telegram lê minhas conversas?',
      answer:
        'Só os chats que você configura: no openpcbot v3 existem chats que ele responde e chats que ele só observa para alimentar a memória; o resto ele ignora.',
    },
    {
      question: 'Qual a diferença entre um Jarvis e o ChatGPT?',
      answer:
        'O ChatGPT é um chat em um site; o Jarvis é seu, fica ligado no seu computador, fala pelo seu Telegram, lembra de você entre conversas e executa tarefas com limites que você define.',
    },
  ],
  relatedCourses: [
    'https://inematds.github.io/intelecto-curso/',
    'https://inematds.github.io/curso-openpcbotv3/',
    'https://inematds.github.io/agentejax/',
    'https://inematds.github.io/jarvis/',
    'https://inematds.github.io/local-ai-masterclass/',
    'https://inematds.github.io/agente-hermes-local/',
  ],
  relatedPages: [
    { path: '/ia/como-criar-um-agente-de-ia/', title: 'Como criar um agente de IA: do processo ao agente funcionando' },
    { path: '/aprender-inteligencia-artificial/', title: 'Como aprender Inteligência Artificial do zero ao avançado' },
  ],
  pillar: { path: '/agentes-de-inteligencia-artificial/', title: 'Agentes de IA' },
}

export default page
