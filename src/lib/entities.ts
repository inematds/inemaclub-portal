import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

// Entidades únicas do site (schema.org). O RootShell publica as duas em toda página;
// as páginas só apontam pra elas por @id — assim autor e organização são o mesmo nó em todo lugar.
export const NEI_ID = `${SITE_URL}/#nei`
export const ORG_ID = `${SITE_URL}/#organization`
export const NEI_URL = `${SITE_URL}/conhecimento/quem-e-nei-maldaner/`

// Perfis da marca INEMA (organização).
export const ORG_PROFILES = [
  'https://github.com/inematds',
  'https://www.youtube.com/@inematdsx',
  'https://www.instagram.com/inema.tds',
  'https://www.tiktok.com/@inema.tds',
  'https://www.facebook.com/inematds',
]

// Perfis pessoais do Nei. LinkedIn fica de fora até ele confirmar qual dos dois é o ativo
// (ver /conhecimento/quem-e-nei-maldaner/, seção "Canais oficiais").
export const PERSON_PROFILES = ['https://github.com/NeiMaldaner']

export const personNode = {
  '@type': 'Person',
  '@id': NEI_ID,
  name: 'Nei Maldaner',
  url: NEI_URL,
  description:
    'Empresário brasileiro, cofundador da Sisnema, que hoje ensina IA prática (agentes, automação, Claude Code, Codex, n8n e Make) no ecossistema INEMA.',
  jobTitle: 'Fundador do INEMA',
  worksFor: { '@id': ORG_ID },
  sameAs: PERSON_PROFILES,
}

export const organizationNode = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: 'INEMA.club',
  alternateName: 'INEMA',
  url: SITE_URL,
  logo: `${SITE_URL}/doc/conviteinemap.png`,
  description: SITE_DESCRIPTION,
  founder: { '@id': NEI_ID },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  sameAs: ORG_PROFILES,
  subOrganization: [
    { '@type': 'Organization', name: 'INEMA.pro', url: 'https://inema.pro/' },
    { '@type': 'Organization', name: 'INEMA.VIP', url: 'https://inema.vip/' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cursos e formações do INEMA',
    url: `${SITE_URL}/cursos/`,
  },
}

export const entityGraph = {
  '@context': 'https://schema.org',
  '@graph': [organizationNode, personNode],
}

// Referência curta pro autor (name/url junto do @id, como o Google recomenda em author).
export const authorRef = { '@type': 'Person', '@id': NEI_ID, name: 'Nei Maldaner', url: NEI_URL }
export const publisherRef = { '@id': ORG_ID }
