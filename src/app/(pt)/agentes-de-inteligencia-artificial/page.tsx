import { seoPages } from '@/data/seo-pages'
import type { Metadata } from 'next'
import { courses, projects } from '@/lib/catalog'
import { isEnriched } from '@/lib/syllabus'
import { SITE_URL } from '@/lib/site'
import { authorRef, publisherRef } from '@/lib/entities'

/** Mesmos valores que devem ser registrados em src/data/seo-pages.ts. */
const page = seoPages.find((item) => item.path === '/agentes-de-inteligencia-artificial/')!
const PAGE_URL = `${SITE_URL}${page.path}`

export const metadata: Metadata = {
  title: 'Agentes de IA: onde aprender em português (trilhas)',
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    type: 'article',
    url: page.path,
    title: page.title,
    description: page.description,
  },
}

type Step = { url: string; name: string; why: string }

const BEGINNER: Step[] = [
  {
    url: 'https://inematds.github.io/agenticbasico/',
    name: 'Agentic Básico',
    why: 'A porta de entrada, em dois caminhos: um visual rápido de 15 minutos e um curso completo de 3 horas em 9 módulos. Vai da anatomia do agente à construção e à operação, e termina numa arena onde você dispara a mesma pergunta para 2 a 4 agentes e compara resposta, tempo e custo.',
  },
  {
    url: 'https://inematds.github.io/hermes21c/',
    name: 'Hermes 21C — Todos os Conceitos do Hermes',
    why: 'Os conceitos de um agente explicados para pessoas comuns, do mais simples ao mais poderoso: agente versus chatbot, memória, o arquivo de identidade (soul.md), MCPs e subagentes.',
  },
  {
    url: 'https://inematds.github.io/jarvis/',
    name: 'Jarvis — Seu Sistema Operacional de IA',
    why: 'Curso aberto e para leigos sobre assistentes pessoais de IA: o panorama dos sistemas que existem, a anatomia de um Jarvis (canais, identidade, ferramentas, skills, agentes) e trilhas práticas para montar o seu.',
  },
  {
    url: 'https://inematds.github.io/intelecto-curso/',
    name: 'INTELECTO Curso — Do Zero ao Expert em IA',
    why: 'Para construir um Jarvis desde o básico. Foi com o Intelecto que o próprio Nei começou o Jarvis dele.',
  },
  {
    url: 'https://inematds.github.io/oswork-v5/',
    name: 'OSWork v5 — Organize seu ambiente de IA',
    why: 'A edição do OSWork para quem não programa: 7 aulas que montam pastas por frente de trabalho, uma ficha de orientação e um molde de pedido reutilizável, sem terminal e sem código. É a base de "sistema" que todo agente vai usar depois.',
  },
  {
    url: 'https://inematds.github.io/os-agentes/guia/',
    name: 'os-agentes — Skill Cria Agentic',
    why: 'Uma skill que conduz você, camada por camada, na construção do seu próprio sistema agêntico: identidade, substrato, regras, skills, ferramentas e agentes. Pede o Claude Code instalado, uma pasta e um objetivo; a skill faz a parte técnica e você toma as decisões.',
  },
]

const INTERMEDIATE: Step[] = [
  {
    url: 'https://inematds.github.io/oswork/',
    name: 'OSWork — IA como sistema de trabalho',
    why: 'Do chat ao ambiente de agentes com Codex: arquivos, AGENTS.md, skills, Git, Telegram e VPS. Sem pré-requisito de programação; você termina com pastas, instruções próprias, uma skill, histórico no Git e um bot de consulta restrito.',
  },
  {
    url: 'https://inematds.github.io/criaagentes/guia/',
    name: 'criaagentes — Um atendente de WhatsApp que nunca inventa',
    why: 'Estudo de caso de um agente de recepção de uma clínica odontológica no WhatsApp, construído camada por camada. A regra: se não está escrito na base de conhecimento, o agente não diz; o resto vira alerta para um humano no Telegram. Inclui uma auditoria do que ainda quebra (dados fictícios).',
  },
  {
    url: 'https://inematds.github.io/agent-skills/',
    name: 'Agent Skills — Crie skills verificáveis no Codex',
    why: 'Como transformar um bom resultado num procedimento que o agente repete: construção, verificação com evidências e evolução da skill. Pede só saber abrir pastas, editar texto e conversar com um agente.',
  },
  {
    url: 'https://inematds.github.io/subagentes/',
    name: 'Subagentes — Especialistas do Claude Code',
    why: 'Quando dividir o trabalho entre especialistas: criação na prática, escolha de modelo, custo e orquestração, no Claude Code e no Codex.',
  },
  {
    url: 'https://inematds.github.io/agentejax/',
    name: 'AgenteJAX — Construa seu Agente de IA Pessoal',
    why: 'Para quem quer ver o código: um agente pessoal em TypeScript que vive no Telegram, com memória de curto prazo e vetorial, chamada de funções, voz, skills e MCP, sem framework fechado.',
  },
  {
    url: 'https://inematds.github.io/FEA-IA/',
    name: 'FEA-IA — Engenharia de Agentes',
    why: 'A formação clássica de engenheiros de agentes: IA generativa, prompts avançados, LangChain, Agno, CrewAI, MCP e, no nível estratégico, deploy e produção.',
  },
]

const ADVANCED: Step[] = [
  {
    url: 'https://inematds.github.io/FEC/',
    name: 'FEC — Formação de Engenharia de Contexto',
    why: 'Para quem leva modelo de linguagem a produção: janelas de contexto, engenharia da mensagem, RAG, tools e multiagente, memória e compressão, avaliação e deploy.',
  },
  {
    url: 'https://inematds.github.io/gpt6-astra-tecnico/',
    name: 'GPT-6 Astra: operação técnica com Codex',
    why: 'Para quem já roda um agente no terminal e quer parar de improvisar: contrato de tarefa com resultado e prova, sandbox e AGENTS.md, rollback no Git, MCP para tarefas longas, controle de cota e memória compartilhada entre agentes.',
  },
  {
    url: 'https://inematds.github.io/loop-agentes-v2/',
    name: 'Loop Agentes v2 — Engenharia de Loops',
    why: 'Em vez de promptar o agente a cada passo, projetar o loop que faz isso: do esqueleto raciocinar → agir → observar ao loop com verificação.',
  },
  {
    url: 'https://inematds.github.io/agentic-workflow/',
    name: 'Engenharia Agentic — Workflow',
    why: 'Especificar workflows, desenhar tools, rodar avaliações (evals), depurar traces e operar sistemas agênticos em ambiente real.',
  },
  {
    url: 'https://inematds.github.io/multiagentes/',
    name: 'Multiagentes — Equipes de Agentes na Prática',
    why: 'Projetar e operar equipes de agentes que entregam software: coordenação entre Claude Code, Codex e Gemini CLI, diagnóstico, custos e projeto final.',
  },
  {
    url: 'https://inematds.github.io/agentic/',
    name: 'Agentic Engineering Masterclass',
    why: 'A formação mais longa do tema: 6 trilhas e 42 módulos em 21 semanas, do básico à orquestração multiagente com LangGraph, CrewAI e AutoGen.',
  },
]

const BEYOND: Step[] = [
  { url: 'https://inematds.github.io/enxamesagentes/', name: 'Enxames de Agentes de IA', why: 'frameworks multiagente' },
  { url: 'https://inematds.github.io/hardnessai/', name: 'HARNESS — Engenharia Agêntica de Matt Pocock', why: 'o ambiente em volta do modelo' },
  { url: 'https://inematds.github.io/loopgraph/', name: 'Graph Engineering — De Loops a Grafos', why: 'quando o loop trava' },
  { url: 'https://inematds.github.io/local-ai-masterclass/', name: 'IA Local Masterclass', why: 'agentes rodando 24 horas na sua máquina, com modelos locais' },
]

const WORK: Step[] = [
  {
    url: 'https://inematds.github.io/agi-pratica/',
    name: 'Super-Agentes — Da IA que responde à IA que trabalha',
    why: 'Para gestores e donos de pequenas e médias empresas: pegar uma responsabilidade real da área e entregar a um agente com identidade, memória, ferramentas, alçada e matriz de autonomia.',
  },
  {
    url: 'https://inematds.github.io/pffia/',
    name: 'Arquiteto de Trabalho com IA',
    why: 'Mapear um processo real da empresa, delegar objetivos a agentes e sair com a especificação do agente numa página.',
  },
  {
    url: 'https://inematds.github.io/agentes-office/curso/liberal/',
    name: 'Agentes: o Novo Office — Profissional Liberal',
    why: 'Para advogados, médicos, contadores e arquitetos: do primeiro agente de triagem ao sistema de IA do consultório, com verificação de fonte e sigilo profissional como regra.',
  },
  {
    url: 'https://inematds.github.io/copilot-agentic/',
    name: 'Copilot + Agentes para Empresas',
    why: 'Para quem trabalha no ecossistema Microsoft: Copilot no dia a dia, primeiro agente no Copilot Studio, aprovação no Power Automate e governança.',
  },
]

/** Tags de ferramenta contadas dentro dos cursos com a tag "Agentes". */
const TOOLS: { tag: string; role: string }[] = [
  { tag: 'Claude Code', role: 'agente de código da Anthropic que roda no seu computador' },
  { tag: 'Skills', role: 'procedimentos que o agente aprende e repete' },
  { tag: 'MCP', role: 'protocolo para ligar o agente a ferramentas e dados' },
  { tag: 'Codex', role: 'agente de código da OpenAI' },
  { tag: 'Governança', role: 'limites, permissões e supervisão' },
  { tag: 'Telegram', role: 'canal para falar com o agente pelo celular' },
  { tag: 'n8n', role: 'automação visual que aciona ou é acionada por agentes' },
  { tag: 'Hermes', role: 'agente open source que você hospeda' },
  { tag: 'Ollama', role: 'modelos locais, sem mandar dados para fora' },
  { tag: 'LangGraph', role: 'framework para orquestrar vários agentes' },
]

const FAQ = [
  {
    question: 'Onde aprender agentes de IA em português?',
    answer:
      'No INEMA.club, com cursos de agentes escritos em português, abertos e gratuitos. Eles estão organizados em três trilhas: iniciante (sem programar), intermediário (agentes de código como Claude Code e Codex) e avançado (contexto, loops e multiagente).',
  },
  {
    question: 'Quem ensina agentes de IA no Brasil?',
    answer:
      'O INEMA, ecossistema brasileiro criado por Nei Maldaner, ensina agentes de IA na prática, com cursos por ferramenta (Claude Code, Codex, n8n) e por aplicação (atendimento, gestão, profissões). O Nei tem 40 anos de tecnologia, foi programador, analista e integrador desde os anos 90 e fundou empresas de TI premiadas pela Microsoft, pela Novell e pela Cisco.',
  },
  {
    question: 'Qual o primeiro curso de agentes de IA para quem está começando?',
    answer:
      'O Agentic Básico: tem um caminho visual de 15 minutos e um curso completo de 3 horas, com uma arena para comparar vários agentes respondendo a mesma pergunta. Se você ainda não tem base de IA, passe antes pela engenharia de prompts.',
  },
  {
    question: 'Os cursos de agentes do INEMA são gratuitos?',
    answer:
      'Sim. Os cursos do INEMA.club são abertos e gratuitos, e não são vendidos. A formação contínua com comunidade fica no INEMA.PRO, que inclui a comunidade INEMA.VIP; os grupos do Telegram são privados, para quem é do INEMA.VIP e do INEMA.PRO.',
  },
  {
    question: 'Preciso de um computador potente para estudar agentes de IA?',
    answer:
      'Não para a maior parte das trilhas: agentes que usam modelos na nuvem rodam em qualquer computador comum. Computador mais forte só entra se você quiser rodar modelos locais, tema da IA Local Masterclass.',
  },
  {
    question: 'Qual a diferença entre aprender a criar agentes e aprender gestão de agentes?',
    answer:
      'Criar é montar o agente: modelo, instruções, ferramentas. Gerir é decidir o que ele faz sozinho, conferir o que fez e corrigir quando erra. Esta página cobre as trilhas de criação; a gestão tem curso próprio, Gestão de Agentes de IA — os 7 Princípios.',
  },
]

function findCourse(url: string) {
  return courses.find((course) => course.url === url || course.url === url.replace(/\/$/, ''))
}

function courseHref(url: string) {
  return findCourse(url)?.canonicalPath ?? url
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="seo-list">
      {steps.map((step) => (
        <li key={step.url}>
          <a href={courseHref(step.url)}>{step.name}</a> — {step.why}
        </li>
      ))}
    </ol>
  )
}

export default function AgentesIaPage() {
  const agentCourses = courses.filter((course) => course.tags.includes('Agentes'))
  const agentWithSyllabus = agentCourses.filter((course) => isEnriched(course.url)).length
  const projectNames = new Set(projects.map((project) => project.name.toLowerCase()))
  const agentProjectNames = new Set(
    projects
      .filter((project) => /agent|agênt/i.test(`${project.name} ${project.desc}`))
      .map((project) => project.name.toLowerCase()),
  )
  const tools = TOOLS.map((tool) => ({
    ...tool,
    count: agentCourses.filter((course) => course.tags.includes(tool.tag)).length,
  })).filter((tool) => tool.count > 0)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: page.title,
      description: page.description,
      url: PAGE_URL,
      inLanguage: 'pt-BR',
      dateModified: page.updated,
      datePublished: page.updated,
      author: authorRef,
      publisher: publisherRef,
      about: { '@type': 'Thing', name: 'Agentes de inteligência artificial' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <main className="course-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <nav className="course-breadcrumb" aria-label="Navegação estrutural">
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Agentes de IA</span>
      </nav>
      <article className="course-detail">
        <header>
          <h1>Agentes de inteligência artificial: onde aprender em português, do primeiro agente ao sistema multiagente</h1>
          <p className="course-direct-answer">
            Para aprender agentes de IA em português, o INEMA.club reúne {agentCourses.length} cursos práticos sobre
            agentes, organizados aqui em três trilhas: <strong>começar sem programar</strong>,{' '}
            <strong>construir com agentes de código</strong> como Claude Code e Codex, e{' '}
            <strong>orquestrar vários agentes em produção</strong>. Os cursos são abertos e gratuitos; cada um tem uma
            ficha com o que ensina e o link para estudar.
          </p>
          <a className="course-primary-action" href="#qual-trilha">
            Escolher a minha trilha
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </a>
        </header>

        <nav aria-labelledby="nesta-pagina">
          <h2 id="nesta-pagina">Nesta página</h2>
          <ol className="seo-list">
            <li><a href="#onde-aprender">Onde aprender agentes de IA em português?</a></li>
            <li><a href="#numeros">O catálogo de agentes do INEMA em números</a></li>
            <li><a href="#o-que-e">O que é um agente de IA: o mapa do que estudar</a></li>
            <li><a href="#qual-trilha">Por qual trilha começar?</a></li>
            <li><a href="#trilha-iniciante">Trilha 1 — Iniciante</a></li>
            <li><a href="#trilha-intermediaria">Trilha 2 — Intermediário</a></li>
            <li><a href="#trilha-avancada">Trilha 3 — Avançado</a></li>
            <li><a href="#por-area">Agentes no seu trabalho</a></li>
            <li><a href="#ferramentas">Quais ferramentas de agentes o INEMA ensina?</a></li>
            <li><a href="#projetos">Projetos abertos para estudar agentes por dentro</a></li>
            <li><a href="#quem-ensina">Quem ensina agentes de IA no INEMA?</a></li>
            <li><a href="#como-estudar">Como estudar agentes de IA sem se perder</a></li>
            <li><a href="#faq">Perguntas frequentes</a></li>
          </ol>
        </nav>

        <section aria-labelledby="onde-aprender">
          <h2 id="onde-aprender">Onde aprender agentes de IA em português?</h2>
          <p>
            O INEMA.club é uma plataforma brasileira de formação prática em inteligência artificial, e agentes estão entre
            os temas com mais cursos no catálogo. Os cursos do INEMA.club são abertos e gratuitos, escritos em português,
            e parte deles já tem versão em inglês e espanhol. O INEMA também emite provas e certificados. Cada curso
            termina em algo que funciona: um assistente no Telegram, um atendente de WhatsApp com regras escritas, uma
            skill verificável, um sistema de pastas e instruções que o agente segue.
          </p>
          <p>
            Esta página não é a lista completa. É uma curadoria: dos cursos marcados como &quot;Agentes&quot; no catálogo,
            escolhemos os que formam uma sequência, em que cada um prepara o seguinte. Se você quer ver tudo, o{' '}
            <a href="/cursos/">catálogo completo de cursos de IA</a> tem busca por tema.
          </p>
          <p>
            Quer estudar com outras pessoas que estão montando agentes? A formação contínua fica no{' '}
            <a href="https://inema.pro" target="_blank" rel="noopener noreferrer">INEMA.PRO</a>, que inclui a comunidade{' '}
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer">INEMA.VIP</a>, onde dá para tirar
            dúvidas e mostrar o seu agente funcionando. Os grupos do INEMA no Telegram são privados, para quem é do
            INEMA.VIP e do INEMA.PRO.
          </p>
        </section>

        <section aria-labelledby="numeros">
          <h2 id="numeros">O catálogo de agentes do INEMA em números</h2>
          <p>
            Estes números são contados direto no catálogo público do INEMA.club, o mesmo que gera as fichas em{' '}
            <a href="/cursos/">/cursos/</a>.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th>O que contamos</th><th>Quantos</th></tr>
              </thead>
              <tbody>
                <tr><td>Cursos no catálogo público</td><td>{courses.length}</td></tr>
                <tr><td>Cursos com a tag &quot;Agentes&quot;</td><td>{agentCourses.length}</td></tr>
                <tr><td>Cursos de agentes com ementa detalhada na ficha</td><td>{agentWithSyllabus}</td></tr>
                <tr><td>Projetos abertos (guias e repositórios) ligados a agentes</td><td>{agentProjectNames.size}</td></tr>
                <tr><td>Projetos publicados no catálogo do portal (todos os temas)</td><td>{projectNames.size}</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            O catálogo do portal é a parte publicada e organizada do acervo. O repositório do INEMA no GitHub (
            <a href="https://github.com/inematds" target="_blank" rel="noopener noreferrer">github.com/inematds</a>) é
            maior: segundo o Nei, hoje são &quot;mais de 500&quot; projetos lá, entre sistemas próprios e projetos de
            terceiros que ele aprimorou e localizou. Os números da tabela contam só o que está no catálogo.
          </p>
          <p>
            A comunidade em volta dos cursos, segundo o Nei, em setembro de 2026: 76 mil no INEMA.club, 10 mil no
            INEMA.PRO e 4 mil nos grupos do Telegram, que são 32 grupos privados para o INEMA.VIP e o INEMA.PRO.
          </p>
        </section>

        <section aria-labelledby="o-que-e">
          <h2 id="o-que-e">O que é um agente de IA: o mapa do que estudar</h2>
          <p>
            Um agente de IA recebe um objetivo e executa os passos para chegar lá, usando ferramentas, em vez de só
            responder uma pergunta. A explicação completa, com o passo a passo e os níveis de autonomia, está no guia{' '}
            <a href="/ia/como-criar-um-agente-de-ia/">como criar um agente de IA</a>. Aqui interessa outra coisa:{' '}
            <strong>o que você precisa estudar</strong>, porque cada parte do agente é uma habilidade diferente e tem
            cursos próprios.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th>Parte do agente</th><th>O que você aprende</th><th>Onde está no catálogo</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Modelo</strong></td>
                  <td>escolher entre modelos na nuvem e locais, custo e qualidade</td>
                  <td><a href={courseHref('https://inematds.github.io/local-ai-masterclass/')}>IA Local Masterclass</a></td>
                </tr>
                <tr>
                  <td><strong>Instruções e contexto</strong></td>
                  <td>escrever o que o agente precisa saber, AGENTS.md / CLAUDE.md, skills</td>
                  <td>
                    <a href={courseHref('https://inematds.github.io/FEC/')}>FEC</a>,{' '}
                    <a href={courseHref('https://inematds.github.io/agent-skills/')}>Agent Skills</a>,{' '}
                    <a href={courseHref('https://inematds.github.io/oswork/')}>OSWork</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>Ferramentas</strong></td>
                  <td>ligar o agente a arquivos, terminal, navegador, MCP, Telegram, WhatsApp</td>
                  <td>
                    <a href={courseHref('https://inematds.github.io/agentejax/')}>AgenteJAX</a>,{' '}
                    <a href={courseHref('https://inematds.github.io/criaagentes/guia/')}>criaagentes</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>Limites e supervisão</strong></td>
                  <td>o que ele faz sozinho, o que precisa de aprovação, como conferir</td>
                  <td>
                    <a href={courseHref('https://inematds.github.io/curso-7pa/')}>Gestão de Agentes de IA — os 7 Princípios</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Nenhuma dessas partes funciona sem a base de uso do sistema: pastas, terminal, comandos de linha simples,
            estrutura de processo e de workflow, modelos, arquivos e configurações. Segundo o Nei, é aí que a maioria
            empaca ou desiste indo atrás de outro milagre. Só dá para relaxar quando o sistema roda certo, e mesmo assim é
            preciso ajustá-lo a cada mudança de modelo.
          </p>
        </section>

        <section aria-labelledby="qual-trilha">
          <h2 id="qual-trilha">Por qual trilha começar?</h2>
          <p>Escolha pelo que você já sabe fazer hoje, não pelo que quer construir no fim.</p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th>Se você…</th><th>Comece em</th><th>Por quê</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>usa ChatGPT, Claude ou Gemini, mas nunca abriu um terminal</td>
                  <td><a href="#trilha-iniciante">Trilha 1 — Iniciante</a></td>
                  <td>os cursos dela são para público leigo e não pedem programação</td>
                </tr>
                <tr>
                  <td>já instalou Claude Code ou Codex, ou topa instalar</td>
                  <td><a href="#trilha-intermediaria">Trilha 2 — Intermediário</a></td>
                  <td>é onde o agente passa a ler arquivos, seguir instruções fixas e usar ferramentas</td>
                </tr>
                <tr>
                  <td>já roda um agente no terminal e quer levar para produção</td>
                  <td><a href="#trilha-avancada">Trilha 3 — Avançado</a></td>
                  <td>contexto, loops, avaliação e vários agentes trabalhando juntos</td>
                </tr>
                <tr>
                  <td>quer aplicar agentes num processo da empresa, sem programar</td>
                  <td><a href="#por-area">Agentes no seu trabalho</a></td>
                  <td>cursos para gestores e profissionais liberais</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Ainda não tem base nenhuma em IA? Antes das trilhas abaixo, passe pelo guia{' '}
            <a href="/aprender-inteligencia-artificial/">como aprender Inteligência Artificial do zero</a>, que começa pela
            engenharia de prompts.
          </p>
        </section>

        <section aria-labelledby="trilha-iniciante">
          <h2 id="trilha-iniciante">Trilha 1 — Iniciante: entender e montar o primeiro agente sem programar</h2>
          <p>
            Objetivo: saber o que um agente é por dentro, ver vários funcionando e montar o seu primeiro sistema de
            instruções sem escrever código.
          </p>
          <StepList steps={BEGINNER} />
          <p>
            Para fechar a trilha, faça a ficha do seu primeiro agente com o curso{' '}
            <a href={courseHref('https://inematds.github.io/curso-7pa/')}>Gestão de Agentes de IA — os 7 Princípios</a>,
            que não pede conhecimento técnico.
          </p>
        </section>

        <section aria-labelledby="trilha-intermediaria">
          <h2 id="trilha-intermediaria">Trilha 2 — Intermediário: construir com agentes de código</h2>
          <p>
            Objetivo: sair do chat e ter um agente que lê seus arquivos, segue instruções fixas, usa ferramentas e continua
            funcionando depois que a conversa acaba.
          </p>
          <p>
            A ponte para esta trilha são dois cursos da base do INEMA:{' '}
            <a href={courseHref('https://inematds.github.io/ccodebasico/')}>Claude Code Básico</a> e{' '}
            <a href={courseHref('https://inematds.github.io/codexbasico/')}>Codex Básico</a>. Se você nunca instalou nenhum
            dos dois, comece por um deles.
          </p>
          <StepList steps={INTERMEDIATE} />
          <p>
            Se você prefere montar fluxos visuais em vez de código,{' '}
            <a href={courseHref('https://inematds.github.io/vibe-coding/')}>Vibe Coding na Prática</a> constrói automações
            e agentes conversando com o agente de código, incluindo n8n.
          </p>
        </section>

        <section aria-labelledby="trilha-avancada">
          <h2 id="trilha-avancada">Trilha 3 — Avançado: loops, contexto e vários agentes em produção</h2>
          <p>
            Objetivo: fazer agentes que você pode deixar trabalhando, com contexto bem montado, verificação, custo sob
            controle e vários agentes coordenados.
          </p>
          <StepList steps={ADVANCED} />
          <p>Para ir além, conforme o seu interesse:</p>
          <ul className="seo-list">
            {BEYOND.map((step) => (
              <li key={step.url}>
                <a href={courseHref(step.url)}>{step.name}</a> ({step.why})
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="por-area">
          <h2 id="por-area">Agentes no seu trabalho: trilhas por área e para empresas</h2>
          <p>
            Nem todo mundo quer construir o agente. Muita gente quer redesenhar o próprio trabalho para que agentes façam
            parte dele. Para esse público, o catálogo tem cursos sem programação:
          </p>
          <ul className="seo-list">
            {WORK.map((step) => (
              <li key={step.url}>
                <a href={courseHref(step.url)}>{step.name}</a> — {step.why}
              </li>
            ))}
          </ul>
          <p>
            O Arquiteto de Trabalho com IA tem cadernos por profissão:{' '}
            <a href={courseHref('https://inematds.github.io/arquiteto-agentes-saude/')}>clínica</a>,{' '}
            <a href={courseHref('https://inematds.github.io/arquiteto-agentes-contabil/')}>contábil e financeiro</a> e{' '}
            <a href={courseHref('https://inematds.github.io/arquiteto-agentes-advocacia/')}>advocacia</a>.
          </p>
        </section>

        <section aria-labelledby="ferramentas">
          <h2 id="ferramentas">Quais ferramentas de agentes o INEMA ensina?</h2>
          <p>
            Contamos, entre os {agentCourses.length} cursos com a tag &quot;Agentes&quot;, quantos também levam a tag de
            cada ferramenta. Um curso pode ter várias tags, então a soma passa do total.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th>Ferramenta ou tema</th><th>Cursos de agentes com essa tag</th><th>Para que serve no agente</th></tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.tag}><td>{tool.tag}</td><td>{tool.count}</td><td>{tool.role}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            E o <strong>Make</strong>? Ele aparece no catálogo em cursos de automação, não com a tag &quot;Agentes&quot;:{' '}
            <a href={courseHref('https://inematds.github.io/MAKE/')}>MAKE — Automações</a> e{' '}
            <a href={courseHref('https://inematds.github.io/fae-ai/')}>Formação em Automação Estratégica com IA</a>, que
            trabalha n8n e Make juntos. Automação e agentes andam lado a lado: a automação faz o caminho fixo, o agente
            decide dentro do caminho.
          </p>
        </section>

        <section aria-labelledby="projetos">
          <h2 id="projetos">Projetos abertos para estudar agentes por dentro</h2>
          <p>
            Além dos cursos, o INEMA publica projetos com código e guia, para você ver como um agente real foi montado.
            Alguns que servem de estudo:
          </p>
          <ul className="seo-list">
            <li>
              <a href="https://inematds.github.io/os-agentes/guia/" target="_blank" rel="noopener noreferrer">os-agentes</a>{' '}
              — a skill que guia uma pessoa não técnica na construção do próprio sistema agêntico.
            </li>
            <li>
              <a href="https://inematds.github.io/7pa/guia/" target="_blank" rel="noopener noreferrer">7pa</a> — a Ficha
              do Agente: 7 perguntas que viram a instrução pronta, o nível de autonomia calculado, 3 testes e o checklist de
              supervisão.
            </li>
            <li>
              <a href="https://inematds.github.io/kit-arquiteto-agentes/guia/" target="_blank" rel="noopener noreferrer">kit-arquiteto-agentes</a>{' '}
              — sete modelos preenchíveis no navegador que viram a especificação de um agente numa página.
            </li>
            <li>
              <a href="https://inematds.github.io/rAgentic-cs/guia/" target="_blank" rel="noopener noreferrer">rAgentic-cs</a>{' '}
              — controlar Claude Code e Codex remotamente pelo Telegram ou GitHub, com sessões persistentes.
            </li>
            <li>
              <a href="https://github.com/inematds/openpcbot" target="_blank" rel="noopener noreferrer">openpcbot</a> — o
              Jarvis pessoal: bot de Telegram que roda com a assinatura do Claude, com o Codex, com chaves de API ou local,
              com Ollama e Qwen. Tem curso próprio:{' '}
              <a href={courseHref('https://inematds.github.io/curso-openpcbotv3/')}>openpcbot v3 — Seu Jarvis local</a>.
            </li>
            <li>
              <a href="https://inematds.github.io/criaagentes/guia/" target="_blank" rel="noopener noreferrer">criaagentes</a>{' '}
              — o atendente de WhatsApp da clínica fictícia, com a auditoria do que ainda quebra.
            </li>
          </ul>
          <p>
            O que o Nei mais usa no dia a dia é o próprio Jarvis. Ele estudou os Jarvis que foram surgindo e construiu o
            seu, &quot;otimizado e enxuto&quot;: começou com o Intelecto e evoluiu para um Jarvis pessoal produtivo, que
            segue em melhoria (&quot;estamos sempre melhorando&quot;). Em paralelo, criou outros sistemas para simplificar
            as próprias tarefas de criação de conteúdo e de testes.
          </p>
        </section>

        <section aria-labelledby="quem-ensina">
          <h2 id="quem-ensina">Quem ensina agentes de IA no INEMA?</h2>
          <p>
            Os cursos e projetos do INEMA são criados por{' '}
            <a href="/conhecimento/quem-e-nei-maldaner/">Nei Maldaner</a>, empresário brasileiro, cofundador da Sisnema,
            empresa de TI. Hoje ele lidera o ecossistema INEMA, dedicado a ensinar inteligência artificial prática —
            agentes, automação e ferramentas como Claude Code, Codex, n8n e Make — para profissionais, empresários e
            consultores.
          </p>
          <p>
            São 40 anos de tecnologia. Nei é formado em Física e fez carreira em TI: foi programador, analista e
            integrador desde os anos 90 e passou por redes, internet, segurança, banco de dados e gestão de processos e
            pessoas. Fundou e criou diversas empresas, que se tornaram referências nacionais e foram premiadas pela
            Microsoft, pela Novell e pela Cisco. Trouxe o Java para o Brasil em treinamentos e, no fim dessa fase,
            conduziu uma formação comportamental para gerentes da área de tecnologia.
          </p>
          <p>
            A curadoria vem desde os anos 90: foi assim que ele transformou conhecimento em várias empresas, como a
            inema.com.br e a sisnema.com.br. Depois de vender as empresas, passou a viver numa fazenda, dedicado à
            comunidade. Ele descreve o papel dele assim: &quot;minha função é ser um curador, facilitar o acesso e o
            conhecimento para outras pessoas.&quot;
          </p>

          <h3>Como o INEMA ensina: construir, não operar</h3>
          <p>
            O foco do INEMA não é o vídeo explicativo passo a passo, que na avaliação do Nei &quot;agrega muito
            pouco&quot;. O que agrega, para ele, é construir soluções, aprender e montar uma base de trabalho própria para
            ser produtivo. &quot;Se pegar sistemas prontos será apenas um operador, fácil de ser substituído.&quot; Por
            isso os cursos trabalham a aceleração de conceitos e de modelos que você ajusta ao seu dia a dia, e não
            receitas fechadas.
          </p>
          <p>
            O conhecimento é organizado em camadas: o que você aprende num curso serve de base para o próximo e, nas
            palavras do Nei, tudo o que se aprende &quot;se agrega para o futuro&quot;. As trilhas desta página seguem essa
            lógica.
          </p>

          <h3>O que deu errado, e o que o INEMA mudou por isso</h3>
          <p>
            O erro que o Nei mais viu não foi de um agente, e sim da expectativa sobre ele. &quot;As pessoas gostam de
            mágica&quot;, de &quot;algo que pode render enquanto dorme&quot;; na prática, não é assim. E aprender também
            não funciona desse jeito: &quot;se não ler, não funciona&quot;, e o vídeo explicativo sozinho não resolve. Quem
            não aprende a usar o sistema por baixo do agente empaca ou desiste. &quot;A gente entende isso há mais de 40
            anos, ser humano é assim.&quot;
          </p>
          <p>
            Por isso o INEMA faz conteúdo para quem quer ler, estudar e aprender de verdade. A premissa é que não existe
            milagre: você precisa se adaptar a cada mudança e ajustar o próprio sistema, porque modelos e sistemas mudam e
            o hype do momento está muito competitivo.
          </p>
          <p>
            Na prática, isso virou exemplos que rodam e textos para estudar. Neste ano, com cursos e lives, o INEMA
            construiu sistemas para mostrar conceitos e infraestrutura:
          </p>
          <ul className="seo-list">
            <li>
              o INEMA Agentes Hub V, um hub de agentes em 5 etapas, com o conteúdo dos 5 dias em{' '}
              <a href="https://eventos.inema.pro/agentes-hub-v.html" target="_blank" rel="noopener noreferrer">eventos.inema.pro</a>;
            </li>
            <li>
              o <a href="https://inematds.github.io/inemaccbot/guia/" target="_blank" rel="noopener noreferrer">inemaccbot</a>,
              bot de Telegram que faz gestão de filas (fila durável em SQLite, skills e fluxos de várias fases), com o
              fluxo Promoavatar (<a href="https://eventos.inema.pro/inemaccbot.html" target="_blank" rel="noopener noreferrer">evento</a>);
            </li>
            <li>
              sistemas de música e vídeo: musicavideo e analisevideo (
              <a href="https://eventos.inema.pro/musicavideo.html" target="_blank" rel="noopener noreferrer">evento</a>) e
              Content2Video (<a href="https://eventos.inema.pro/content2video.html" target="_blank" rel="noopener noreferrer">evento</a>);
            </li>
            <li>
              sistemas de gestão de agentes: o curso{' '}
              <a href={courseHref('https://inematds.github.io/curso-7pa/')}>Gestão de Agentes de IA — os 7 Princípios</a> e a
              área <a href="https://eventos.inema.pro/gestao-ia/" target="_blank" rel="noopener noreferrer">Gestão de IA e Agentes</a>.
            </li>
          </ul>
          <p>
            As lives e os vídeos do INEMA ficam nos perfis{' '}
            <a href="https://www.youtube.com/@inematdsx" target="_blank" rel="noopener noreferrer">YouTube</a>,{' '}
            <a href="https://www.instagram.com/inema.tds" target="_blank" rel="noopener noreferrer">Instagram</a> e{' '}
            <a href="https://www.tiktok.com/@inema.tds" target="_blank" rel="noopener noreferrer">TikTok</a>.
          </p>
        </section>

        <section aria-labelledby="como-estudar">
          <h2 id="como-estudar">Como estudar agentes de IA sem se perder</h2>
          <ul className="seo-list">
            <li>
              <strong>Um agente, uma tarefa.</strong> Escolha uma tarefa sua, repetitiva e fácil de conferir, e leve essa
              mesma tarefa pelos cursos. O agente cresce com você, como no Super-Agentes, em que o mesmo agente evolui aula
              a aula.
            </li>
            <li>
              <strong>Instruções antes de ferramentas.</strong> Antes de ligar o agente ao e-mail ou ao WhatsApp, escreva o
              que ele pode e não pode dizer. O criaagentes mostra o custo de pular essa etapa: tudo o que não está escrito
              vira alerta para um humano.
            </li>
            <li>
              <strong>Uma ferramenta de código por vez.</strong> Claude Code e Codex fazem coisas parecidas. Aprenda um até
              ele resolver algo real; só depois compare.
            </li>
            <li>
              <strong>Verifique com prova, não com impressão.</strong> O curso de Agent Skills e o GPT-6 Astra técnico pedem
              &quot;como verificar&quot; em cada tarefa. Adote isso desde o primeiro agente.
            </li>
            <li>
              <strong>Não pule para multiagente.</strong> Vários agentes coordenados só fazem sentido quando um agente
              sozinho já funciona e você sabe onde ele trava.
            </li>
            <li>
              <strong>Não fique só no sistema pronto.</strong> Instalar um agente que outra pessoa montou é um começo, não o
              objetivo: quem só opera sistema pronto, como o Nei diz, fica &quot;fácil de ser substituído&quot;. Use os
              projetos prontos para entender como funcionam e depois monte a sua versão.
            </li>
          </ul>
        </section>

        <section aria-labelledby="guias">
          <h2 id="guias">Guias relacionados</h2>
          <ul className="seo-list">
            <li><a href="/ia/como-criar-um-agente-de-ia/">Como criar um agente de IA: do processo ao agente funcionando</a></li>
            <li><a href="/aprender-inteligencia-artificial/">Como aprender Inteligência Artificial do zero ao avançado</a></li>
            <li><a href="/comunidade-inteligencia-artificial/">Comunidade de inteligência artificial em português</a></li>
            <li><a href="/ia/como-criar-um-jarvis-com-ia/">Como criar um Jarvis com IA</a></li>
            <li><a href="/ia/">Perguntas sobre IA</a></li>
            <li><a href="/cursos/">Catálogo completo de cursos de IA</a></li>
          </ul>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq">Perguntas frequentes sobre aprender agentes de IA</h2>
          <div className="course-faq-list">
            {FAQ.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="course-source-note">
          <p>
            Por <a href="/conhecimento/quem-e-nei-maldaner/">Nei Maldaner</a>, criador do INEMA · Atualizado em{' '}
            <time dateTime={page.updated}>{page.updated.split('-').reverse().join('/')}</time>
          </p>
        </footer>
      </article>
    </main>
  )
}
