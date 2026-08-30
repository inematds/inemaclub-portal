'use client'

import { useEffect } from 'react'

type ToolInput = Record<string, string | number | string[] | undefined>
type ToolDefinition = {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }
  execute: (input: ToolInput, context: { signal?: AbortSignal }) => Promise<unknown>
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => Promise<unknown> | unknown
    }
  }
}

async function getJson(path: string, params: Record<string, string | number | undefined>, signal?: AbortSignal) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && String(value).trim()) query.set(key, String(value))
  }
  const response = await fetch(`${path}?${query}`, { signal })
  if (!response.ok) throw new Error(`Não foi possível consultar ${path}.`)
  return response.json()
}

const readOnlyAnnotations = { readOnlyHint: true, untrustedContentHint: false }

export default function InemaWebMCP() {
  useEffect(() => {
    const context = document.modelContext
    if (!context?.registerTool) return

    const lifecycle = new AbortController()
    const tools: ToolDefinition[] = [
      {
        name: 'buscar_cursos',
        title: 'Buscar cursos do INEMA',
        description: 'Busca cursos do INEMA por tema, nível e objetivo de aprendizagem.',
        inputSchema: {
          type: 'object',
          properties: {
            tema: { type: 'string', maxLength: 100 },
            nivel: { type: 'string', enum: ['iniciante', 'intermediario', 'avancado'] },
            objetivo: { type: 'string', maxLength: 200 },
            limite: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
          },
          required: ['tema'],
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/courses', {
          tema: String(input.tema ?? ''),
          nivel: input.nivel ? String(input.nivel) : undefined,
          objetivo: input.objetivo ? String(input.objetivo) : undefined,
          limit: Number(input.limite ?? 10),
        }, signal),
      },
      {
        name: 'listar_trilhas',
        title: 'Listar trilhas do INEMA',
        description: 'Lista as trilhas de aprendizagem e os cursos associados disponíveis no INEMA.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: readOnlyAnnotations,
        execute: (_input, { signal }) => getJson('/api/trails', {}, signal),
      },
      {
        name: 'detalhar_curso',
        title: 'Detalhar um curso do INEMA',
        description: 'Retorna descrição, tags, nível, página canônica e aplicação de um curso pelo ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'integer', minimum: 1 } },
          required: ['id'],
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/courses', { id: Number(input.id) }, signal),
      },
      {
        name: 'comparar_cursos',
        title: 'Comparar cursos do INEMA',
        description: 'Retorna até quatro cursos lado a lado para comparação factual.',
        inputSchema: {
          type: 'object',
          properties: {
            ids: { type: 'array', items: { type: 'integer', minimum: 1 }, minItems: 2, maxItems: 4, uniqueItems: true },
          },
          required: ['ids'],
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/courses', {
          ids: Array.isArray(input.ids) ? input.ids.join(',') : '',
          limit: 4,
        }, signal),
      },
      {
        name: 'recomendar_proximo_curso',
        title: 'Recomendar o próximo curso',
        description: 'Encontra opções de curso com base no objetivo e no nível informados, sem substituir a escolha do estudante.',
        inputSchema: {
          type: 'object',
          properties: {
            objetivo: { type: 'string', maxLength: 200 },
            nivel: { type: 'string', enum: ['iniciante', 'intermediario', 'avancado'] },
          },
          required: ['objetivo'],
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/courses', {
          objetivo: String(input.objetivo ?? ''),
          nivel: input.nivel ? String(input.nivel) : undefined,
          limit: 5,
        }, signal),
      },
      {
        name: 'buscar_conhecimento',
        title: 'Buscar na base de conhecimento do INEMA',
        description: 'Busca respostas factuais, cursos, projetos, serviços e perguntas frequentes na base pública do INEMA.',
        inputSchema: {
          type: 'object',
          properties: {
            consulta: { type: 'string', maxLength: 200 },
            tipo: { type: 'string', enum: ['institucional', 'curso', 'projeto', 'faq', 'servico', 'case'] },
          },
          required: ['consulta'],
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/knowledge', {
          q: String(input.consulta ?? ''),
          tipo: input.tipo ? String(input.tipo) : undefined,
        }, signal),
      },
      {
        name: 'listar_projetos',
        title: 'Listar projetos do INEMA',
        description: 'Lista projetos e guias públicos do INEMA, com filtro opcional por tema.',
        inputSchema: {
          type: 'object',
          properties: {
            tema: { type: 'string', maxLength: 100 },
            limite: { type: 'integer', minimum: 1, maximum: 50, default: 20 },
          },
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/projects', {
          q: input.tema ? String(input.tema) : undefined,
          limit: Number(input.limite ?? 20),
        }, signal),
      },
      {
        name: 'consultar_atualizacoes',
        title: 'Consultar atualizações do INEMA',
        description: 'Consulta as atualizações mais recentes de cursos e projetos do INEMA.',
        inputSchema: {
          type: 'object',
          properties: {
            tipo: { type: 'string', enum: ['curso', 'projeto'] },
            limite: { type: 'integer', minimum: 1, maximum: 50, default: 20 },
          },
          additionalProperties: false,
        },
        annotations: readOnlyAnnotations,
        execute: (input, { signal }) => getJson('/api/updates', {
          tipo: input.tipo ? String(input.tipo) : undefined,
          limit: Number(input.limite ?? 20),
        }, signal),
      },
    ]

    void Promise.allSettled(tools.map((tool) => context.registerTool(tool, { signal: lifecycle.signal })))
    return () => lifecycle.abort()
  }, [])

  return null
}

