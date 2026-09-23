import type { Metadata } from 'next'
import { courses, learningTrails } from '@/lib/catalog'
import { seoPages } from '@/data/seo-pages'
import { OFFICIAL_PROFILES, SITE_URL } from '@/lib/site'

const page = seoPages.find((item) => item.path === '/aprender-inteligencia-artificial/')!
const PAGE_URL = `${SITE_URL}${page.path}`

export const metadata: Metadata = {
  title: 'Como aprender Inteligência Artificial do zero (guia prático)',
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    type: 'article',
    url: page.path,
    title: page.title,
    description: page.description,
  },
}

/** Trilha para Iniciantes da home, na mesma ordem. Cada item aponta pra ficha do club quando existe. */
const BEGINNER_STEPS = [
  { url: 'https://inematds.github.io/FEP/', name: 'FEP — Fundamentos de Engenharia de Prompts', why: 'Aprender a conversar com a IA: dar contexto, pedir formato, iterar. É a habilidade que todas as outras usam.' },
  { url: 'https://inematds.github.io/ATIA/', name: 'ATIA — AI Tools in Action', why: 'Ver os prompts funcionando em ferramentas reais e entender o que cada tipo de IA resolve.' },
  { url: 'https://inematds.github.io/FDB/', name: 'FDB — Fundamentos de Banco de Dados', why: 'A base técnica de dados: quase todo projeto com IA lê, guarda ou organiza informação.' },
  { url: 'https://inematds.github.io/VISION/', name: 'Vision — Processamento de Imagens com IA', why: 'Levar a IA para além do texto, trabalhando com imagens.' },
  { url: 'https://inematds.github.io/ccodebasico/', name: 'Claude Code do Zero', why: 'Primeiro agente de código: instalação, comandos, skills e MCP.' },
  { url: 'https://inematds.github.io/codexbasico/', name: 'Codex CLI em 6 trilhas', why: 'O outro grande agente de código, para comparar e escolher o seu fluxo.' },
  { url: 'https://inematds.github.io/do-zero-ao-deploy/', name: 'Do Zero ao Deploy', why: 'Colocar um projeto real no ar, da primeira linha no terminal ao seu assistente de IA.' },
  { url: 'https://inematds.github.io/intelecto-curso/', name: 'INTELECTO — Do Zero ao Expert em IA', why: 'Fechar a base construindo o seu próprio sistema de IA.' },
]

const FAQ = [
  {
    question: 'Preciso saber programar para aprender IA?',
    answer:
      'Não para começar. Prompts, ferramentas prontas e boa parte da automação não exigem código. Programação passa a ajudar quando você chega aos agentes de código (Claude Code, Codex) e quer colocar projetos no ar — e esses agentes justamente reduzem a barreira de programar.',
  },
  {
    question: 'Por onde começar a aprender inteligência artificial?',
    answer:
      'Pela engenharia de prompts: é a habilidade de dar contexto, pedir formato e iterar com a IA, e todas as etapas seguintes dependem dela. Depois, ferramentas na prática, base de dados, agentes de código e, por fim, um projeto real publicado.',
  },
  {
    question: 'Quanto tempo leva para aprender IA?',
    answer:
      'Depende do objetivo. Usar IA no dia a dia com bons resultados é questão de semanas de prática. Construir agentes e sistemas próprios leva meses de projetos. O que acelera é praticar em problemas reais, não acumular cursos.',
  },
  {
    question: 'Os cursos do INEMA são gratuitos?',
    answer:
      'Os cursos listados no catálogo público do INEMA.club podem ser abertos a partir de cada ficha; as condições de acesso aparecem na aplicação de cada curso. A formação contínua, com trilhas completas e a comunidade INEMA.VIP, faz parte do INEMA.PRO.',
  },
  {
    question: 'Qual a diferença entre usar IA e construir com IA?',
    answer:
      'Usar IA é pedir respostas a um assistente. Construir com IA é organizar contexto, ferramentas e regras para que agentes executem tarefas de ponta a ponta. O caminho deste guia leva do primeiro ao segundo.',
  },
]

function findCourse(url: string) {
  return courses.find((course) => course.url === url || course.url === url.replace(/\/$/, ''))
}

export default function AprenderIaPage() {
  const steps = BEGINNER_STEPS.map((step) => ({ ...step, course: findCourse(step.url) }))
  const trails = learningTrails.filter((trail) => trail.courses.length > 0)

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
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#nei`,
        name: 'Nei Maldaner',
        url: `${SITE_URL}/conhecimento/quem-e-nei-maldaner/`,
        sameAs: OFFICIAL_PROFILES,
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: { '@type': 'Thing', name: 'Inteligência artificial' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'INEMA.club', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Aprender IA', item: PAGE_URL },
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
        <a href="/">INEMA.club</a><span aria-hidden="true">/</span><span>Aprender IA</span>
      </nav>
      <article className="course-detail">
        <header>
          <h1>Como aprender Inteligência Artificial: do zero ao avançado</h1>
          <p className="course-direct-answer">
            Aprenda IA em cinco etapas, nesta ordem: <strong>1)</strong> converse bem com a IA (engenharia de prompts);{' '}
            <strong>2)</strong> use ferramentas de IA em tarefas reais; <strong>3)</strong> entenda a base de dados;{' '}
            <strong>4)</strong> passe a construir com agentes de código como Claude Code e Codex;{' '}
            <strong>5)</strong> coloque um projeto seu no ar. Pular etapas cria lacunas — cada curso adiante presume a base dos anteriores.
          </p>
          <a className="course-primary-action" href="#por-onde-comecar">
            Ver a ordem recomendada
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
          </a>
        </header>

        <section aria-labelledby="por-onde-comecar">
          <h2 id="por-onde-comecar">Por onde começar: a Trilha para Iniciantes</h2>
          <p>
            Esta é a progressão que o INEMA recomenda para quem está começando. Não é uma lista aleatória: você aprende a
            falar com a IA, vê essas habilidades em ação, ganha base técnica e só então entra nos agentes de código, que
            juntam tudo na prática.
          </p>
          <ol className="seo-list">
            {steps.map((step) => (
              <li key={step.url}>
                <a href={step.course?.canonicalPath ?? step.url}>{step.name}</a> — {step.why}
              </li>
            ))}
          </ol>
          <p>
            Quer entender o papel de cada curso em detalhe? Veja o{' '}
            <a href="/guias/trilha-iniciantes.html">guia da Trilha para Iniciantes</a>.
          </p>
        </section>

        <section aria-labelledby="depois-da-base">
          <h2 id="depois-da-base">Depois da base: escolha uma trilha por objetivo</h2>
          <p>
            Com a base pronta, aprofunde no que tem a ver com o seu trabalho. O catálogo do INEMA tem {courses.length} cursos
            públicos organizados nestas trilhas:
          </p>
          <ul className="related-course-list">
            {trails.map((trail) => (
              <li key={trail.name}>
                <a href={trail.url}>{trail.name}</a> ({trail.courses.length} {trail.courses.length === 1 ? 'curso' : 'cursos'})
              </li>
            ))}
          </ul>
          <p>
            Ou navegue pelo <a href="/cursos/">catálogo completo de cursos de IA</a>.
          </p>
        </section>

        <section aria-labelledby="como-estudar">
          <h2 id="como-estudar">Como estudar IA sem se perder</h2>
          <ul className="seo-list">
            <li>Pratique em um problema seu desde o primeiro dia — um relatório, um atendimento, uma planilha.</li>
            <li>Aprenda uma ferramenta por vez até ela resolver algo real; só então passe para a próxima.</li>
            <li>Guarde o que funcionou: prompts, instruções e erros viram o seu material de consulta.</li>
            <li>Troque o &quot;chat solto&quot; por um sistema: pastas, instruções fixas e memória para os seus agentes.</li>
            <li>Estude em grupo: perguntar e ver o projeto dos outros encurta meses de tentativa e erro.</li>
          </ul>
        </section>

        <section aria-labelledby="erros-comuns">
          <h2 id="erros-comuns">Erros comuns de quem está começando</h2>
          <ul className="seo-list">
            <li>Colecionar cursos e ferramentas sem terminar nenhum projeto.</li>
            <li>Pular os fundamentos de prompt e ir direto para agentes complexos.</li>
            <li>Pedir tudo em uma única mensagem, sem contexto nem exemplo do resultado esperado.</li>
            <li>Confiar na resposta da IA sem conferir — principalmente números, links e código.</li>
          </ul>
        </section>

        <section aria-labelledby="comunidade">
          <h2 id="comunidade">Aprender junto: a comunidade do INEMA</h2>
          <p>
            Aprender IA sozinho é possível, mas lento. No INEMA você tem cursos práticos, projetos com código aberto para
            estudar e uma comunidade para tirar dúvidas e acompanhar as novidades. A formação contínua fica no{' '}
            <a href="https://inema.pro" target="_blank" rel="noopener noreferrer">INEMA.PRO</a>, que inclui a comunidade{' '}
            <a href="https://inema.vip" target="_blank" rel="noopener noreferrer">INEMA.VIP</a>.
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq">Perguntas frequentes sobre aprender IA</h2>
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
