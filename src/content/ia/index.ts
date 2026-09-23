import type { IaPage } from './types'
import comoCriarUmAgenteDeIa from './como-criar-um-agente-de-ia'

/** Registro das páginas /ia/<slug>/. Página nova: criar o arquivo e adicionar aqui. */
export const iaPages: IaPage[] = [comoCriarUmAgenteDeIa]

export function findIaPage(slug: string) {
  return iaPages.find((page) => page.slug === slug)
}

export type { IaPage, IaSection } from './types'
