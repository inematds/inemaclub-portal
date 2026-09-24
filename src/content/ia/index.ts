import type { IaPage } from './types'
import comoCriarUmAgenteDeIa from './como-criar-um-agente-de-ia'
import comoCriarUmJarvisComIa from './como-criar-um-jarvis-com-ia'

/** Registro das páginas /ia/<slug>/. Página nova: criar o arquivo e adicionar aqui. */
export const iaPages: IaPage[] = [comoCriarUmAgenteDeIa, comoCriarUmJarvisComIa]

export function findIaPage(slug: string) {
  return iaPages.find((page) => page.slug === slug)
}

export type { IaPage, IaSection } from './types'
