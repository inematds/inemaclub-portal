import type { Metadata } from 'next'
import { courses, projects } from '@/lib/catalog'
import { updatesData, projectUpdatesData } from '@/data/courses'
import { novidadesData } from '@/data/novidades'
import { translatedCatalog } from '@/data/translated-courses'
import { seoPages } from '@/data/seo-pages'
import { SITE_URL } from '@/lib/site'
import { authorRef, publisherRef } from '@/lib/entities'

const PAGE_PATH = '/comunidade-inteligencia-artificial/'
const page = seoPages.find((item) => item.path === PAGE_PATH)!
const PAGE_URL = `${SITE_URL}${page.path}`

export const metadata: Metadata = {
  title: 'Comunidade de inteligência artificial em português',
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    type: 'article',
    url: page.path,
    title: page.title,
    description: page.description,
  },
}

/** Cursos citados no corpo e na lista final. Cada item aponta pra ficha do club quando existe. */
const RELATED_COURSES = [
  'https://inematds.github.io/curso-7pa/',
  'https://inematds.github.io/oswork/',
  'https://inematds.github.io/agent-skills/',
  'https://inematds.github.io/curso-claude-codex/',
  'https://inematds.github.io/FEP/',
  'https://inematds.github.io/intelecto-curso/',
  'https://inematds.github.io/mentesbrilhantes1/',
]

/** Temas com mais cursos no catálogo (contagem por tag, calculada abaixo). */
const TOP_TAGS = ['Agentes', 'Claude Code', 'Skills', 'Automação', 'Vídeo', 'MCP', 'Produtividade', 'Codex', 'Prompts']

const TELEGRAM_EXAMPLES = [
  'INEMA.AGENTES',
  'INEMA.CCODE (Claude Code)',
  'INEMA.CODEX',
  'INEMA.N8N',
  'INEMA.IMAGENS',
  'INEMA.VIDEOS',
  'INEMA.VOZ',
  'INEMA.LLMs',
  'INEMA.Prompts',
  'INEMA.DEV',
]

const FAQ = [
  {
    question: 'A comunidade do INEMA é gratuita?',
    answer:
      'O INEMA.club é aberto e gratuito: cursos, trilhas, projetos e novidades do catálogo, sem cadastro. A comunidade no Telegram, o INEMA.VIP, faz parte da assinatura INEMA.PRO.',
  },
  {
    question: 'Qual a diferença entre INEMA.club, INEMA.PRO e INEMA.VIP?',
    answer:
      'O INEMA.club é o portal aberto. O INEMA.PRO é a assinatura de formação contínua. O INEMA.VIP é a comunidade no Telegram e está incluído no INEMA.PRO; não é um nível à parte.',
  },
  {
    question: 'Existe comunidade de IA no Telegram em português?',
    answer:
      'Sim. O INEMA.VIP funciona no Telegram, em português, com grupos privados por tema (agentes, Claude Code, Codex, n8n, imagens, vídeo, voz, entre outros), para quem é do INEMA.VIP e do INEMA.PRO. A entrada é por inema.vip.',
  },
  {
    question: 'Preciso saber programar para participar?',
    answer:
      'Não. Há cursos e grupos para quem não programa, e o conteúdo para iniciantes começa por engenharia de prompts e uso de ferramentas prontas. Programar ajuda quando você chega aos agentes de código.',
  },
  {
    question: 'A comunidade tem conteúdo em inglês ou espanhol?',
    answer:
      'Sim. Segundo o Nei, o conteúdo do INEMA está disponível em português, espanhol e inglês, e a home do portal existe nos três idiomas. A conversa nos grupos do Telegram é em português.',
  },
]

function findCourse(url: string) {
  return courses.find((course) => course.url === url || course.url === url.replace(/\/$/, ''))
}

function monthYear(date: string) {
  const [year, month] = date.split('-')
  const names = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${names[Number(month) - 1]}/${year}`
}

function updateStats(list: { date: string; type: string }[]) {
  const dates = list.map((item) => item.date).sort()
  return {
    total: list.length,
    created: list.filter((item) => item.type === 'novo').length,
    updated: list.filter((item) => item.type === 'atualizado').length,
    from: dates.length ? monthYear(dates[0]) : '',
    to: dates.length ? monthYear(dates[dates.length - 1]) : '',
  }
}

function CourseLink({ url, fallback }: { url: string; fallback: string }) {
  const course = findCourse(url)
  return <a href={course?.canonicalPath ?? url}>{course?.title ?? fallback}</a>
}

export default function ComunidadeIaPage() {
  const related = RELATED_COURSES.map((url) => findCourse(url)).filter((course) => course !== undefined)
  const tagCounts = TOP_TAGS.map((tag) => ({
    tag,
    count: courses.filter((course) => course.tags.includes(tag)).length,
  })).filter((item) => item.count > 0)
  const courseUpdates = updateStats(updatesData)
  const projectUpdates = updateStats(projectUpdatesData)
  const projectNames = new Set(projects.map((project) => project.name))
  const projectsWithGuide = new Set(projects.filter((project) => project.badge === 'Guia').map((project) => project.name))
  const translatedCourses = Array.from(
    new Map(
      translatedCatalog
        .filter((item) => item.kind === 'curso')
        .map((item) => [item.id, courses.find((course) => course.id === item.id)?.title ?? item.title]),
    ).values(),
  )
  const translatedProjects = new Set(translatedCatalog.filter((item) => item.kind === 'projeto').map((item) => item.id)).size

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
      about: { '@type': 'Thing', name: 'Comunidade de inteligência artificial' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Comunidade de IA', item: PAGE_URL },
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
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Comunidade de IA</span>
      </nav>
      <article className="course-detail">
        <header>
          <h1>Comunidade de inteligência artificial em português: como funciona a do INEMA</h1>
          <p className="course-direct-answer">
            A comunidade de inteligência artificial do INEMA tem duas camadas. O <strong>INEMA.club</strong> é aberto e
            gratuito: cursos, trilhas, projetos com código e as novidades do catálogo, sem login. A{' '}
            <strong>formação contínua</strong> fica no INEMA.PRO, que inclui a comunidade INEMA.VIP no Telegram, onde a
            curadoria diária acontece e as dúvidas são respondidas.
          </p>
          <a className="course-primary-action" href="#como-entrar">
            Ver como entrar
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </a>
        </header>

        <section aria-labelledby="o-que-e">
          <h2 id="o-que-e">O que é a comunidade INEMA?</h2>
          <p>
            O INEMA é um ecossistema brasileiro de aprendizado prático de inteligência artificial criado por{' '}
            <a href="/conhecimento/quem-e-nei-maldaner/">Nei Maldaner</a>. A proposta cabe no lema da casa: aprender,
            praticar e evoluir com IA de forma contínua. Na prática, &quot;comunidade INEMA&quot; quer dizer duas coisas
            diferentes, e vale separar as duas antes de qualquer outra explicação:
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Camada</th><th scope="col">O que é</th><th scope="col">Acesso</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>INEMA.club</strong> (este site)</td>
                  <td>Portal aberto: catálogo de cursos, trilhas por objetivo, vitrine de projetos (o código e os guias ficam públicos no GitHub), registro datado do que entra no catálogo</td>
                  <td>Aberto e gratuito, sem cadastro</td>
                </tr>
                <tr>
                  <td><strong>INEMA.PRO</strong></td>
                  <td>Assinatura de formação contínua: catálogo completo, trilhas guiadas, conteúdo semanal</td>
                  <td>Assinatura em <a href="https://inema.pro" target="_blank" rel="noopener noreferrer">inema.pro</a></td>
                </tr>
                <tr>
                  <td><strong>INEMA.VIP</strong></td>
                  <td>A comunidade no Telegram, com grupos privados por tema e o tópico de curadoria do Nei. Faz parte do INEMA.PRO (não é um nível separado)</td>
                  <td>Entrada por <a href="https://inema.vip" target="_blank" rel="noopener noreferrer">inema.vip</a>, para quem assina o INEMA.PRO</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A divisão é intencional. O que é conhecimento de referência (como aprender, o que cada curso ensina, como um
            projeto foi construído) fica público no INEMA.club, para quem estiver procurando. O que depende de conversa,
            acompanhamento e resposta a dúvida acontece dentro da comunidade, onde as pessoas se conhecem e o assunto
            pode ser aprofundado sem virar vitrine.
          </p>

          <h3>Quem faz a curadoria</h3>
          <p>
            Quem está por trás da comunidade é o Nei Maldaner, e ele descreve assim o próprio papel: &quot;minha função é
            ser um curador, facilitar o acesso e o conhecimento para outras pessoas.&quot; Segundo ele, a curadoria vem
            desde os anos 90, e foi assim que transformou conhecimento em várias empresas, como a inema.com.br e a
            sisnema.com.br, entre outras. Depois de vender as empresas que fundou, passou a viver numa fazenda,
            dedicado à comunidade, para ajudar as pessoas a melhorar o caminho delas.
          </p>
          <p>
            A curadoria dele não fica só no Telegram. Segundo o Nei, ele tem mais de meio milhão de seguidores no{' '}
            <a href="https://www.tiktok.com/@inema.tds" target="_blank" rel="noopener noreferrer">TikTok</a>, 100 mil no{' '}
            <a href="https://www.instagram.com/inema.tds" target="_blank" rel="noopener noreferrer">Instagram</a> e
            &quot;outros tantos&quot; no Facebook, e as lives acontecem no{' '}
            <a href="https://www.youtube.com/@inematdsx" target="_blank" rel="noopener noreferrer">YouTube</a>.
          </p>

          <h3>A filosofia: camadas que se acumulam</h3>
          <p>
            O Nei não aposta em vídeo explicativo passo a passo, que nas palavras dele &quot;agrega muito pouco&quot;. O
            que agrega, segundo ele, é construir soluções, aprender e montar uma base de trabalho própria. O motivo, dito
            por ele: &quot;Se pegar sistemas prontos será apenas um operador, fácil de ser substituído.&quot; Por isso o
            conteúdo do INEMA trabalha a aceleração de conceitos e modelos, que cada pessoa ajusta ao próprio dia a dia.
          </p>
          <p>
            O conhecimento é organizado em camadas: o que você aprende numa etapa serve de base para a próxima e continua
            valendo depois. É por isso que o INEMA fala em formação contínua, e não em curso avulso.
          </p>

          <h3>Onde cada coisa mora</h3>
          <p>
            O ecossistema tem vários endereços, e cada um tem um papel só. Saber isso evita procurar a agenda de eventos
            no catálogo ou um guia no site de notícias:
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Endereço</th><th scope="col">Para que serve</th></tr>
              </thead>
              <tbody>
                <tr><td>inema.club</td><td>Guias para aprender IA, catálogo de cursos com ficha de cada um, perguntas sobre IA respondidas, vitrine de projetos</td></tr>
                <tr><td>inematds.github.io</td><td>A aplicação de cada curso: as aulas, as trilhas, os exercícios e os guias de projeto</td></tr>
                <tr><td>GitHub inematds</td><td>O código dos projetos, para baixar, estudar e adaptar</td></tr>
                <tr><td>news.inema.pro</td><td>Notícias de IA com data, em linguagem simples</td></tr>
                <tr><td>eventos.inema.pro</td><td>Agenda e página de cada evento</td></tr>
                <tr><td>inema.pro</td><td>Assinatura de formação contínua e área do assinante</td></tr>
                <tr><td>inema.vip</td><td>Entrada da comunidade no Telegram, parte do INEMA.PRO</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            A regra por trás da tabela é simples: o que ensina e continua valendo fica no INEMA.club; o que tem data
            (notícia, evento) fica no seu próprio site; e a conversa fica na comunidade.
          </p>
          <p>
            Um detalhe de nome que causa confusão: o INEMA.club não tem relação com o INEMA da Bahia (Instituto do Meio
            Ambiente e Recursos Hídricos). Quando falamos de comunidade de IA, é sempre INEMA.club, INEMA.PRO ou INEMA.VIP.
          </p>
        </section>

        <section aria-labelledby="como-funciona">
          <h2 id="como-funciona">Como a comunidade funciona na prática?</h2>
          <p>
            A comunidade tem uma rotina que se repete todo dia e três saídas públicas que mostram o que está acontecendo
            lá dentro, sem expor quem participa.
          </p>

          <h3>1. Curadoria diária de novidades</h3>
          <p>
            O Nei publica, num tópico fixo de anúncios do INEMA.VIP (dentro dos grupos privados), o que vale a pena
            conhecer: lançamentos de modelos, ferramentas, alertas de segurança, cursos e projetos novos. Toda madrugada,
            um processo automático lê esse tópico e leva as novidades para a seção <strong>Últimas Novidades</strong> da{' '}
            <a href="/">home do INEMA.club</a>, que mostra as {novidadesData.length} mais recentes.
          </p>
          <p>Três regras decidem o que sai do grupo e o que fica:</p>
          <ol className="seo-list">
            <li><strong>Só entra o que o Nei escreveu.</strong> Mensagem de membro nunca vira item público.</li>
            <li><strong>Resposta não é anúncio.</strong> Quando o Nei responde a alguém dentro de uma conversa, essa resposta fica no grupo.</li>
            <li><strong>Tem que ter o que mostrar.</strong> Sem link e sem resumo, o item não é publicado.</li>
          </ol>
          <p>
            Na home aparecem o título, o resumo e o grupo temático de cada novidade. A nota completa, quando existe, fica
            na área de assinante do INEMA.PRO. As novidades das últimas semanas vieram do tópico principal do INEMA.VIP e
            de grupos temáticos como agentes, Codex, LLMs, prompts e desenvolvimento.
          </p>

          <h3>2. Registro do que entra no catálogo</h3>
          <p>
            Separado da curadoria, o INEMA.club mantém um registro com data de cada curso e cada projeto que entra ou é
            atualizado:
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Registro</th><th scope="col">Entradas</th><th scope="col">Período</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cursos (novos e atualizados)</td>
                  <td>{courseUpdates.total} ({courseUpdates.created} novos, {courseUpdates.updated} atualizações)</td>
                  <td>{courseUpdates.from} a {courseUpdates.to}</td>
                </tr>
                <tr>
                  <td>Projetos (novos e atualizados)</td>
                  <td>{projectUpdates.total} ({projectUpdates.created} novos, {projectUpdates.updated} atualizações)</td>
                  <td>{projectUpdates.from} a {projectUpdates.to}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Esse registro também é público em formato de máquina: <a href="/feed.xml">feed RSS de atualizações</a> e{' '}
            <a href="/api/updates">atualizações em JSON</a>. Quem prefere acompanhar pelo leitor de feeds não precisa
            entrar em lugar nenhum.
          </p>

          <h3>3. Projetos da comunidade, com código</h3>
          <p>
            Boa parte do que se discute no grupo vira projeto: um repositório no GitHub da organização{' '}
            <a href="https://github.com/inematds" target="_blank" rel="noopener noreferrer">inematds</a>, quase sempre com
            guia de uso em português. Segundo o Nei, o repositório inematds já passa de 500 projetos, além de muitos
            projetos de terceiros que ele aprimorou e adaptou para o português.
          </p>
          <p>
            O catálogo publicado do INEMA.club é um recorte desse acervo: lista hoje {projectNames.size} projetos, dos quais{' '}
            {projectsWithGuide.size} com guia publicado. Os dois números não se contradizem. Um conta o que está no
            repositório do GitHub. O outro conta só o que já ganhou vitrine no club, com descrição e, na maioria, guia de
            uso. Alguns exemplos do tipo de coisa que aparece:
          </p>
          <ul className="seo-list">
            <li><strong>7PA — Ficha do Agente:</strong> sete perguntas que viram a instrução de um agente de IA, o nível de autonomia calculado (N0–N4), três testes e um checklist de supervisão. É a base da página <a href="/ia/como-criar-um-agente-de-ia/">como criar um agente de IA</a>.</li>
            <li><strong>openpcbotv3:</strong> assistente pessoal no Telegram com fila de tarefas e memória em português.</li>
            <li><strong>webmcp-readiness:</strong> diagnóstico de um site para WebMCP, SEO, GEO e AEO, com evidências.</li>
            <li><strong>rAgentic-cs:</strong> controle do Claude Code e do Codex pelo Telegram ou pelo GitHub, com sessões persistentes.</li>
            <li><strong>Health OS:</strong> o desenho de um coach de saúde pessoal com IA no Telegram, com dados próprios (e o aviso de que não é aconselhamento médico).</li>
          </ul>
        </section>

        <section aria-labelledby="o-que-encontra">
          <h2 id="o-que-encontra">O que você encontra na comunidade INEMA?</h2>

          <h3>Cursos práticos, organizados por objetivo</h3>
          <p>
            O catálogo público tem {courses.length} cursos, organizados em trilhas por objetivo além da Trilha para
            Iniciantes. Os temas com mais cursos mostram onde a comunidade está concentrada:
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Tag no catálogo</th><th scope="col">Cursos com a tag</th></tr>
              </thead>
              <tbody>
                {tagCounts.map((item) => (
                  <tr key={item.tag}><td>{item.tag}</td><td>{item.count}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Quem está começando deve ir pelo{' '}
            <a href="/aprender-inteligencia-artificial/">guia de como aprender inteligência artificial do zero</a>, que dá a
            ordem recomendada. Quem já sabe o que quer pode ir direto ao <a href="/cursos/">catálogo de cursos</a>.
          </p>

          <h3>Eventos e encontros ao vivo</h3>
          <p>
            Os eventos do INEMA ficam em{' '}
            <a href="https://eventos.inema.pro" target="_blank" rel="noopener noreferrer">eventos.inema.pro</a>, cada um com
            a sua página. Entre os que estão em destaque na home hoje: OSWork (IA como sistema de trabalho), JEV
            (decisões de IA na prática), Gestão de Agentes 2027, IA Cultivada, Claude → Codex agnóstico, AGI chegou,
            Content2Video, WebMCP e INEMA MUSICAVIDEO. Quase todo evento tem um curso ou projeto ligado: o evento OSWork
            conversa com o curso{' '}
            <CourseLink url="https://inematds.github.io/oswork/" fallback="OSWork — IA como sistema de trabalho" />, e o de
            gestão de agentes com o curso{' '}
            <CourseLink url="https://inematds.github.io/curso-7pa/" fallback="Gestão de Agentes de IA — os 7 Princípios" />.
          </p>
          <p>
            Além dos eventos, as lives do Nei acontecem no canal{' '}
            <a href="https://www.youtube.com/@inematdsx" target="_blank" rel="noopener noreferrer">@inematdsx no YouTube</a>.
          </p>

          <h3>Notícias de IA em linguagem simples</h3>
          <p>
            Para acompanhar o que muda sem ler inglês técnico, o{' '}
            <a href="https://news.inema.pro" target="_blank" rel="noopener noreferrer">news.inema.pro</a> publica um briefing
            diário de IA em linguagem simples, feito a partir da mesma curadoria do Nei e do catálogo do INEMA. A ideia é
            separar papéis: a notícia tem data e envelhece; o guia (como este) continua valendo.
          </p>

          <h3>Grupos por assunto</h3>
          <p>
            Segundo o Nei, a comunidade tinha, em setembro de 2026, 32 grupos no Telegram, separados por tema. Entre eles
            estão {TELEGRAM_EXAMPLES.join(', ')}. A vantagem de grupos separados é prática: quem só quer falar de
            automação com n8n não precisa ler a discussão de geração de vídeo.
          </p>
          <p>
            Os grupos são <strong>privados</strong>: ficam para quem é do INEMA.VIP e do INEMA.PRO. A home do club mostra só
            os nomes; a entrada é pela assinatura.
          </p>
        </section>

        <section aria-labelledby="em-alta">
          <h2 id="em-alta">Que assuntos estão em alta na comunidade agora?</h2>
          <p>
            O jeito mais honesto de mostrar o que a comunidade discute é olhar o que entrou no catálogo e na curadoria nas
            últimas semanas. Em setembro de 2026, quatro assuntos se repetem:
          </p>
          <ul className="seo-list">
            <li>
              <strong>Gestão de agentes de IA.</strong> O curso dos 7 Princípios ganhou a versão 2 (4 trilhas, 8 módulos,
              48 tópicos), ao lado do LOOP-R (uma empresa que aprende com os próprios agentes) e da ideia de IA Cultivada:
              agente não se programa uma vez, se acompanha e ajusta.
            </li>
            <li>
              <strong>Sair da dependência de um único modelo.</strong> O curso{' '}
              <CourseLink url="https://inematds.github.io/curso-claude-codex/" fallback="Claude → Codex" /> ensina a
              separar o &quot;cérebro&quot; (contexto, instruções, skills) do modelo que roda por baixo, para trocar de
              fornecedor sem recomeçar do zero.
            </li>
            <li>
              <strong>Novos modelos, testados antes de recomendados.</strong> Quando sai um modelo novo, a curadoria traz
              o que mudou e, quando dá, um guia com teste próprio. Exemplos recentes: Claude Opus 5.5 e a família GPT-6
              Astra.
            </li>
            <li>
              <strong>IA aplicada a profissões.</strong> Saíram cadernos curtos de agentes para escritório de advocacia,
              contabilidade e financeiro, e clínicas de saúde. É o tipo de conteúdo que só aparece quando alguém da área
              pergunta &quot;e no meu caso?&quot;.
            </li>
          </ul>
          <p>
            A curadoria também serve de alerta. Quando um repositório popular no GitHub se mostra perigoso (código
            escondido que roda no computador de quem baixa), o aviso vai para o tópico de anúncios e aparece na home. Numa
            área em que todo dia aparece uma ferramenta &quot;gratuita e milagrosa&quot;, esse filtro vale tanto quanto
            qualquer curso.
          </p>
          <p>
            Repare que o mesmo assunto costuma aparecer nas três frentes: um anúncio na curadoria, um curso ou projeto no
            catálogo e, às vezes, um evento em eventos.inema.pro. A migração entre Claude e Codex é um exemplo: há
            novidade, curso e evento sobre o tema. É isso que torna a comunidade útil para quem aprende: a discussão vira
            material que fica.
          </p>
        </section>

        <section aria-labelledby="idiomas">
          <h2 id="idiomas">Em que idiomas a comunidade funciona?</h2>
          <p>
            Segundo o Nei, o conteúdo do INEMA está disponível em português, espanhol e inglês. A conversa nos grupos é em
            português. A home do INEMA.club existe nos três idiomas, e o catálogo traduzido já registrado no club tem{' '}
            {translatedCourses.length} cursos e {translatedProjects} guias de projeto. Os cursos traduzidos hoje são:
          </p>
          <ul className="seo-list">
            {translatedCourses.map((title) => <li key={title}>{title}</li>)}
          </ul>
          <p>
            Os grupos do Telegram, por enquanto, são só em português; nas versões em inglês e espanhol do portal, o aviso
            é que os grupos nesses idiomas vêm depois.
          </p>
        </section>

        <section aria-labelledby="para-quem">
          <h2 id="para-quem">Para quem é a comunidade INEMA?</h2>
          <p>
            O público que o INEMA descreve como seu é formado por profissionais, empresários e pessoas experientes que
            querem transformar conhecimento e processos em projetos executáveis com IA. Na prática, a comunidade serve bem
            para quatro perfis:
          </p>
          <ul className="seo-list">
            <li><strong>Quem está começando e quer companhia.</strong> Tem a Trilha para Iniciantes, cursos que não pedem programação (o curso dos 7 princípios, por exemplo, pede só já ter usado o ChatGPT) e um lugar para perguntar quando trava.</li>
            <li><strong>Profissional que quer usar IA no próprio trabalho.</strong> Advocacia, contabilidade, saúde, vendas, consultoria: há cursos e trilhas por área, e o valor está em ver como outras pessoas da mesma área resolveram o mesmo problema.</li>
            <li><strong>Quem constrói com agentes de código.</strong> Claude Code e Codex são os dois temas com mais conteúdo, e os projetos vêm com código para estudar e adaptar.</li>
            <li><strong>Quem tem mais de 40 anos e chegou à IA agora.</strong> Parte do conteúdo (o news.inema.pro e as edições OSWork v5 e Quick, por exemplo) é escrita para quem não programa e prefere explicação sem jargão.</li>
          </ul>
          <p>
            E para quem ela <strong>não</strong> é: quem procura um curso único e fechado com começo, meio e fim, quem quer
            só receber um sistema pronto para operar, ou quem busca atalho para &quot;ganhar dinheiro com IA&quot;. O INEMA
            ensina por projeto e por prática contínua, e emite provas e certificados; mas o resultado depende de você
            aplicar num problema seu.
          </p>
        </section>

        <section aria-labelledby="sem-se-perder">
          <h2 id="sem-se-perder">Como aprender IA em comunidade sem se perder?</h2>
          <p>
            Aprender em grupo encurta caminho, mas também pode virar ruído: cem mensagens por dia sobre ferramentas que
            você nunca vai usar. Uma rotina que funciona com o que o INEMA oferece:
          </p>
          <ol className="seo-list">
            <li><strong>Escolha uma trilha e um projeto seu.</strong> A comunidade ajuda mais quem chega com um problema concreto (um relatório, um atendimento, uma planilha) do que quem chega &quot;para ver o que tem&quot;.</li>
            <li><strong>Leia a curadoria, não o grupo inteiro.</strong> As Últimas Novidades já são o filtro do Nei. Abra o grupo temático só do assunto em que você está trabalhando.</li>
            <li><strong>Pergunte mostrando o que tentou.</strong> O prompt que você usou, o erro que apareceu, o que esperava. Pergunta com contexto recebe resposta útil; pergunta genérica recebe link genérico.</li>
            <li><strong>Estude um projeto pronto antes de começar o seu.</strong> Quase todo projeto do catálogo tem guia; ler como outra pessoa resolveu economiza a primeira semana.</li>
            <li><strong>Publique o que funcionou.</strong> Um prompt, uma ficha de agente, um repositório. É assim que o acervo cresce, e é assim que você aprende a explicar o que fez.</li>
          </ol>

          <h3>O que dá errado: o milagre que não existe</h3>
          <p>
            O erro mais comum, segundo o Nei, é chegar atrás de mágica: de algo que &quot;pode render enquanto
            dorme&quot;. Na prática não é assim, e aprender também não é. Nas palavras dele: &quot;se não ler, não
            funciona&quot;. Vídeo explicativo sozinho não resolve.
          </p>
          <p>
            O ponto em que as pessoas empacam, diz ele, é o uso do próprio sistema: pastas, terminal, comandos de linha
            simples e a estrutura por trás do trabalho (processo, workflow, modelos, arquivos e configurações). Quem não
            aprende essa base empaca ou, como a maioria, desiste e vai atrás de outro milagre. &quot;A gente entende isso
            há mais de 40 anos, ser humano é assim.&quot;
          </p>
          <p>
            Por isso o conteúdo do INEMA é feito para quem quer ler, estudar e aprender de verdade. Segundo o Nei, só dá
            para relaxar quando o sistema roda correto, e mesmo assim é preciso se adaptar a cada mudança: modelos e
            sistemas mudam, e o hype do momento está muito competitivo.
          </p>
          <p>
            Foi com esse foco, em exemplos práticos e textos para estudar em vez de vídeo explicativo, que saíram os
            trabalhos deste ano apresentados em eventos.inema.pro, entre eles:
          </p>
          <ul className="seo-list">
            <li><strong>INEMA Agentes Hub V:</strong> o conteúdo dos 5 dias do evento.</li>
            <li><strong>inemaccbot:</strong> bot de Telegram com fila de tarefas durável e o Promoavatar.</li>
            <li><strong>Sistemas de música e vídeo:</strong> INEMA MUSICAVIDEO (com análise de vídeo) e Content2Video.</li>
            <li><strong>Gestão de IA e agentes:</strong> o evento Gestão de Agentes, ligado ao curso dos 7 Princípios.</li>
          </ul>
        </section>

        <section aria-labelledby="publico-privado">
          <h2 id="publico-privado">O que é público e o que fica dentro da comunidade?</h2>
          <p>
            Uma regra vale para todo o ecossistema: <strong>nada do que um membro escreve vira conteúdo público</strong>.
            Nem mensagem, nem nome, nem pergunta literal. O que sai para o INEMA.club, o news e as páginas de perguntas é
            sempre texto do próprio Nei: a curadoria dele, as respostas reescritas por ele, os cursos e projetos que ele
            publica.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Fica público</th><th scope="col">Fica dentro da comunidade</th></tr>
              </thead>
              <tbody>
                <tr><td>Cursos, trilhas e fichas no INEMA.club</td><td>Conversas nos grupos privados do Telegram</td></tr>
                <tr><td>Projetos com código e guia no GitHub</td><td>Nomes e mensagens de membros</td></tr>
                <tr><td>Título e resumo das novidades curadas</td><td>A nota completa de cada novidade (área de assinante)</td></tr>
                <tr><td>Registro de lançamentos (RSS/JSON)</td><td>Dúvidas e respostas individuais</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Por isso esta página não traz depoimentos de membros nem prints do grupo; as únicas falas citadas são do
            próprio Nei, e os números da comunidade são sempre agregados.
          </p>
        </section>

        <section aria-labelledby="numeros">
          <h2 id="numeros">A comunidade em números</h2>
          <p>
            Os dados de catálogo vêm do próprio INEMA.club e se atualizam sozinhos; os de pessoas e de grupos foram
            informados pelo Nei, com dados de setembro de 2026.
          </p>
          <div className="seo-table-wrap">
            <table className="seo-table">
              <thead>
                <tr><th scope="col">Indicador</th><th scope="col">Valor</th><th scope="col">Fonte</th></tr>
              </thead>
              <tbody>
                <tr><td>Cursos no catálogo público</td><td>{courses.length}</td><td>catálogo do INEMA.club</td></tr>
                <tr><td>Projetos no catálogo publicado do club</td><td>{projectNames.size} ({projectsWithGuide.size} com guia)</td><td>catálogo do INEMA.club</td></tr>
                <tr><td>Projetos no repositório inematds</td><td>mais de 500</td><td>segundo o Nei</td></tr>
                <tr><td>Cursos com versão em inglês e espanhol</td><td>{translatedCourses.length}</td><td>catálogo traduzido</td></tr>
                <tr><td>Grupos temáticos no Telegram (privados, VIP e PRO)</td><td>32</td><td>segundo o Nei, setembro de 2026</td></tr>
                <tr><td>Pessoas no INEMA.PRO</td><td>cerca de 10 mil</td><td>segundo o Nei, setembro de 2026</td></tr>
                <tr><td>Pessoas nos grupos do Telegram</td><td>cerca de 4 mil</td><td>segundo o Nei, setembro de 2026</td></tr>
                <tr><td>Pessoas no INEMA.club</td><td>cerca de 76 mil</td><td>segundo o Nei, setembro de 2026</td></tr>
                <tr><td>Curadoria do Nei</td><td>desde os anos 90</td><td>segundo o Nei</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="escolher">
          <h2 id="escolher">Como escolher uma comunidade de IA?</h2>
          <p>
            Existem outras comunidades e formações de IA em português, com modelos diferentes (curso fechado, mentoria,
            grupo gratuito, assinatura). Esta página não faz essa comparação: ela descreve só como funciona a comunidade
            do INEMA, para você decidir com a informação na mão.
          </p>
        </section>

        <section aria-labelledby="como-entrar">
          <h2 id="como-entrar">Como entrar na comunidade INEMA?</h2>
          <p>Depende do que você quer agora:</p>
          <ol className="seo-list">
            <li><strong>Só estudar, sem cadastro:</strong> comece pelo <a href="/aprender-inteligencia-artificial/">guia de como aprender IA</a> e pelo <a href="/cursos/">catálogo de cursos</a>. Tudo no INEMA.club é aberto e gratuito.</li>
            <li><strong>Acompanhar as novidades:</strong> a seção Últimas Novidades na home, o news.inema.pro ou o <a href="/feed.xml">feed RSS</a>.</li>
            <li><strong>Participar da comunidade e da formação contínua:</strong> a assinatura é pelo <a href="https://inema.pro" target="_blank" rel="noopener noreferrer">INEMA.PRO</a>, que inclui a comunidade <a href="https://inema.vip" target="_blank" rel="noopener noreferrer">INEMA.VIP</a> no Telegram.</li>
          </ol>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="cursos-relacionados">
            <h2 id="cursos-relacionados">Cursos do INEMA citados nesta página</h2>
            <ul className="seo-list">
              {related.map((course) => (
                <li key={course.canonicalPath}><a href={course.canonicalPath}>{course.title}</a></li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="outros-guias">
          <h2 id="outros-guias">Outros guias do INEMA</h2>
          <ul className="seo-list">
            <li><a href="/aprender-inteligencia-artificial/">Como aprender Inteligência Artificial do zero ao avançado</a></li>
            <li><a href="/agentes-de-inteligencia-artificial/">Agentes de IA: onde aprender em português</a></li>
            <li><a href="/ia/">Perguntas sobre IA: respostas diretas</a></li>
            <li><a href="/ia/como-criar-um-agente-de-ia/">Como criar um agente de IA</a></li>
          </ul>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq">Perguntas frequentes sobre a comunidade INEMA</h2>
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
