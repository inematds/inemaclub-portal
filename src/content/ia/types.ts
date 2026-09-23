/**
 * Modelo das páginas /ia/<slug>/ (respostas diretas sobre IA).
 * Texto aceita marcação inline mínima: **negrito** e [texto](url).
 * Plano e checklist de qualidade: repo inematds/inemaseo.
 */
export type IaSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
  ordered?: boolean
  table?: { head: string[]; rows: string[][] }
}

export type IaPage = {
  slug: string
  /** H1 da página */
  title: string
  /** <title> (≤ 60 caracteres antes do " | INEMA.club") */
  metaTitle: string
  /** meta description (140–155 caracteres) */
  description: string
  /** busca principal que a página responde */
  keyword: string
  /** resposta direta no topo — 2 a 4 frases */
  answer: string
  published: string
  updated: string
  sections: IaSection[]
  /** FAQ real (perguntas que as pessoas fazem); vazio = sem FAQPage */
  faq: { question: string; answer: string }[]
  /** URLs das aplicações dos cursos (inematds.github.io/...) — viram links pras fichas do club */
  relatedCourses: string[]
  /** "Leia também": caminhos internos do inema.club */
  relatedPages: { path: string; title: string }[]
  /** pilar pai (breadcrumb + link de volta) */
  pillar: { path: string; title: string }
}
