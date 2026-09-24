#!/usr/bin/env node
// Enriquece as fichas /cursos/<slug>/ com dados REAIS da página de cada curso (github.io).
// - Entrada: scripts/cursos-prioritarios.json (URLs de aplicação; só essas são enriquecidas).
// - Fonte pro LLM: meta description, títulos h1–h4, itens de lista e strings de <script> inline
//   (vários cursos montam os módulos em JS). O LLM só COPIA trechos da fonte.
// - Validador: título de módulo tem que existir na fonte; frases precisam de ≥70% das palavras
//   na fonte; números (horas, aulas) têm que aparecer na fonte. Item que falha é descartado.
// - Saída: src/data/courses.syllabus.json, chave = URL da aplicação (o id 204 é duplicado).
// - LLM: OpenRouter openai/gpt-5.4-nano (OPENROUTER_API_KEY em ~/projetos/wifi/.env ou openpcbotv2/.env).
// Uso: node scripts/extrai-syllabus.mjs [--force] [--only <url>]
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const OUT = path.join(ROOT, 'src/data/courses.syllabus.json')
const LIST = path.join(ROOT, 'scripts/cursos-prioritarios.json')
const MODEL = process.env.SYLLABUS_MODEL || 'openai/gpt-5.4-nano'
const TODAY = new Date().toISOString().slice(0, 10)
const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null

function apiKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY
  for (const p of ['projetos/wifi/.env', 'projetos/openpcbotv2/.env']) {
    try {
      const m = fs.readFileSync(path.join(os.homedir(), p), 'utf8').match(/^OPENROUTER_API_KEY=["']?([^"'\n]+)/m)
      if (m) return m[1]
    } catch {}
  }
  throw new Error('OPENROUTER_API_KEY não encontrada')
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

function buildSource(html) {
  const parts = []
  const meta = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i)
  if (meta) parts.push('DESCRIÇÃO: ' + decode(meta[1]))
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)
  if (title) parts.push('TÍTULO: ' + stripTags(title[1]))
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  for (const [, tag, inner] of body.matchAll(/<(h[1-4]|li|p)[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = stripTags(inner)
    if (t.length >= 3 && !t.includes('${')) parts.push((tag.toLowerCase().startsWith('h') ? tag.toUpperCase() + ': ' : '- ') + t)
  }
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join('\n')
  const strings = new Set()
  for (const [, , s] of scripts.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.){4,220})\1/g)) {
    const t = decode(s.replace(/\\n/g, ' ').replace(/\\(.)/g, '$1')).trim()
    if (/[a-zA-ZÀ-ú]{3,}\s+[a-zA-ZÀ-ú]{2,}/.test(t) && !/[{}<>;=]|https?:|\.(js|css|png|svg)\b|^[a-z-]+$/.test(t)) strings.add(t)
  }
  if (strings.size) parts.push('DADOS DA PÁGINA (scripts): ' + [...strings].join(' | '))
  const seen = new Set()
  return parts.filter((p) => (seen.has(p) ? false : seen.add(p))).join('\n').slice(0, 14000)
}

const PROMPT = `Você extrai a ementa de um curso a partir do TEXTO DA PÁGINA dele. Regras:
- EXTRATIVO: copie títulos de módulos/trilhas exatamente como aparecem (pode remover emoji). Frases de "publico", "aprende" e "constroi" devem reusar as palavras da página; não invente nada.
- Não inclua preço, gratuidade, promoções, depoimentos ou números de alunos.
- Se um campo não estiver na página, use [] ou null.
- Português do Brasil.
Responda SOMENTE JSON: {"estrutura":[{"titulo":"","detalhe":""}],"aprende":[""],"publico":[""],"constroi":[""],"pre_requisitos":[""],"carga_horaria":null,"nivel":null}
Limites: estrutura até 12 itens — SÓ as trilhas/módulos/níveis/aulas do conteúdo, na ordem; nunca seções da página como "Como o curso é organizado", "Por que…", "Para quem…", "Monte seu…", "Comece agora", "FAQ", detalhe até 140 caracteres (ou ""), aprende até 6, publico até 4, constroi até 5, pre_requisitos até 4.`

async function llm(source) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      usage: { include: true },
      messages: [{ role: 'system', content: PROMPT }, { role: 'user', content: 'TEXTO DA PÁGINA:\n' + source }],
    }),
  })
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  return { json: JSON.parse(data.choices[0].message.content), cost: data.usage?.cost ?? 0, usage: data.usage }
}

const PAGE_SECTIONS = /^(como o curso|por que|para quem|monte seu|comece|pronto pra|perguntas|faq|sobre o curso|links rapidos|comunidade|escolha (sua|a) trilha|o que voce vai|depoimento)/
const STOP = new Set('a o e de da do das dos em no na nos nas um uma para por com como que se ao aos à às seu sua seus suas é the and of to in'.split(' '))
function supported(text, srcNorm, srcWords, threshold = 0.7) {
  const words = norm(text).split(' ').filter((w) => w.length > 2 && !STOP.has(w))
  if (!words.length) return false
  const nums = text.match(/\d+/g) || []
  if (nums.some((n) => !srcNorm.includes(n))) return false
  return words.filter((w) => srcWords.has(w)).length / words.length >= threshold
}

function validate(out, source) {
  const srcNorm = norm(source)
  const srcWords = new Set(srcNorm.split(' '))
  const list = (arr, max) => (Array.isArray(arr) ? arr : []).filter((s) => typeof s === 'string' && s.trim() && supported(s, srcNorm, srcWords)).slice(0, max)
  const structure = (Array.isArray(out.estrutura) ? out.estrutura : [])
    .filter((m) => m && typeof m.titulo === 'string' && norm(m.titulo).length >= 3 && srcNorm.includes(norm(m.titulo)) && !PAGE_SECTIONS.test(norm(m.titulo)))
    .map((m) => ({ title: m.titulo.replace(/^[^\p{L}\p{N}]+/u, '').trim(), detail: typeof m.detalhe === 'string' && m.detalhe && supported(m.detalhe, srcNorm, srcWords) ? m.detalhe.trim() : '' }))
    .slice(0, 12)
  const numOk = (s) => typeof s === 'string' && s.trim() && (s.match(/\d+/g) || []).every((n) => srcNorm.includes(n)) && supported(s, srcNorm, srcWords, 0.5)
  return {
    structure,
    learn: list(out.aprende, 6),
    audience: list(out.publico, 4),
    build: list(out.constroi, 5),
    prerequisites: list(out.pre_requisitos, 4).filter((x) => x.trim().split(/\s+/).length >= 2),
    workload: numOk(out.carga_horaria) ? out.carga_horaria.trim() : null,
    level: numOk(out.nivel) ? out.nivel.trim() : null,
  }
}

const urls = ONLY ? [ONLY] : JSON.parse(fs.readFileSync(LIST, 'utf8'))
const db = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
let totalCost = 0
const report = []
for (const url of urls) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 INEMA-syllabus' }, redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    // O bloco de link de volta (inema-backlink:v1, posto pelo inemaseo) não é conteúdo do curso:
    // sai antes do hash, senão toda ficha "muda" e é re-extraída (o LLM varia a cada rodada).
    const html = (await res.text()).replace(/<!-- inema-backlink:v1[\s\S]*?<!-- \/inema-backlink:v1 -->/g, '')
    const source = buildSource(html)
    const hash = crypto.createHash('sha256').update(source).digest('hex').slice(0, 16)
    if (!FORCE && db[url]?.sourceHash === hash) { report.push([url, 'sem mudança']); continue }
    const { json, cost } = await llm(source)
    totalCost += cost
    const data = validate(json, source)
    const enriched = data.structure.length >= 3
    db[url] = { ...data, enriched, sourceHash: hash, enrichedAt: TODAY, model: MODEL }
    report.push([url, `${enriched ? 'ENRIQUECIDA' : 'insuficiente'} estrutura=${data.structure.length} aprende=${data.learn.length} publico=${data.audience.length} constroi=${data.build.length} (descartados: ${(json.estrutura?.length ?? 0) - data.structure.length} módulos)`])
  } catch (e) {
    report.push([url, 'ERRO ' + e.message])
  }
}
fs.writeFileSync(OUT, JSON.stringify(Object.fromEntries(Object.entries(db).sort()), null, 2) + '\n')
for (const [u, r] of report) console.log(r.padEnd(16).slice(0, 110), '·', u)
console.log(`\ncusto OpenRouter (usage.cost): US$ ${totalCost.toFixed(4)} · enriquecidas: ${Object.values(db).filter((d) => d.enriched).length}/${Object.keys(db).length}`)
