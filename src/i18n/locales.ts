export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }
export const INTL_LOCALE: Record<Locale, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }
export const LOCALE_LABEL: Record<Locale, string> = { pt: 'PT', en: 'EN', es: 'ES' }

/** Caminho da home em cada idioma. PT fica na raiz; os outros têm prefixo. */
export function localeHome(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
}

/** Catálogo de cursos em cada idioma: /cursos/, /en/cursos/, /es/cursos/. */
export function coursesPath(locale: Locale): string {
  return `${localeHome(locale)}cursos/`
}

/** news.inema.pro tem /en/ e /es/; PT fica na raiz. */
export function newsUrl(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? 'https://news.inema.pro' : `https://news.inema.pro/${locale}/`
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
