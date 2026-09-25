#!/usr/bin/env node
// Sincroniza o catálogo que o agente de chat consulta (tabela catalogo_fichas,
// Supabase inema-agente) com o que o INEMA tem de verdade hoje.
//
// Antes (até 2026-09-25) o agente só via as 54 fichas escritas à mão em
// ~/projetos/aiv/catalogo, sincronizadas uma vez no lançamento — e respondia
// "não tenho registro" pra Hermes, Agnes, API NVIDIA, avatar... que existem.
//
// Fontes (todas locais, geradas pela cadeia noturna):
//   inemapro-mono/apps/pro/data/catalog.json  → cursos + projetos (links públicos github.io)
//   inemapro-mono/apps/pro/data/wiki.json     → ferramentas, com apelidos (inema.pro, assinante)
//   inemapro-mono/apps/pro/data/cerebro.json  → tópicos do Cérebro (inema.pro, assinante)
//   portal/src/data/novidades.ts              → últimas novidades do feed do Nei
//
// As fichas curadas do aiv (slugs sem prefixo) NÃO são tocadas e têm
// prioridade: item com a mesma URL de uma ficha curada é pulado.
// Linhas geradas usam prefixo (pro-, wiki-, cerebro-, novidade-) — o que sumir
// da fonte é apagado. O navigate_to ignora esses prefixos (chat/index.ts).
//
// Uso: node scripts/sync-agente-catalogo.mjs [--dry]
// Cron: chamado no fim de inemapro-mono/scripts/sync-cerebro.sh (01:30).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const HOME = os.homedir();
const PORTAL = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PRO_DATA = path.join(HOME, 'projetos/inemapro-mono/apps/pro/data');
const DRY = process.argv.includes('--dry');
export const PREFIXOS = ['pro-', 'wiki-', 'cerebro-', 'novidade-'];

function lerEnv(arquivo) {
  const o = {};
  for (const l of fs.readFileSync(arquivo, 'utf8').split('\n')) {
    const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return o;
}

const slugify = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const corta = (s, n) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
};
const hoje = new Date().toISOString().slice(0, 10);

function ficha({ slug, tipo, titulo, resumo, url, atualizado_em }) {
  return {
    slug, tipo, url,
    titulo: corta(titulo, 200),
    resumo: corta(resumo, 600) || corta(titulo, 200),
    publico: [], status: 'ativo', relacionados: [],
    atualizado_em: atualizado_em || hoje,
  };
}

export function montarFichas() {
  const out = [];
  const cat = JSON.parse(fs.readFileSync(path.join(PRO_DATA, 'catalog.json'), 'utf8'));

  for (const c of cat.courses ?? []) {
    if (!c.url) continue;
    out.push(ficha({
      slug: `pro-curso-${c.id ?? slugify(c.title)}`, tipo: 'curso', url: c.url,
      titulo: c.title,
      resumo: `${c.desc ?? ''}${c.tags?.length ? ` Temas: ${c.tags.join(', ')}.` : ''}`,
    }));
  }
  for (const p of cat.projects ?? []) {
    if (!p.url) continue;
    out.push(ficha({
      slug: `pro-projeto-${slugify(p.name)}`, tipo: 'projeto', url: p.url,
      titulo: `${p.name} (projeto)`, resumo: p.desc,
    }));
  }

  const wiki = Object.values(JSON.parse(fs.readFileSync(path.join(PRO_DATA, 'wiki.json'), 'utf8')));
  for (const w of wiki) {
    const oQueE = (w.body ?? '').split(/\n## /)[0].replace(/^## O que é\s*/, '');
    out.push(ficha({
      slug: `wiki-${w.slug}`, tipo: 'ferramenta',
      url: `https://www.inema.pro/cerebro/wiki/${w.slug}`,
      titulo: `${w.nome}${w.aliases?.length ? ` (${w.aliases.slice(0, 6).join(', ')})` : ''}`,
      resumo: `[INEMA.PRO] ${oQueE}`,
    }));
  }

  const cer = JSON.parse(fs.readFileSync(path.join(PRO_DATA, 'cerebro.json'), 'utf8'));
  for (const t of Object.values(cer.topicos ?? {})) {
    const assuntos = (t.detalhes ?? []).filter(l => /^\s+- /.test(l)).slice(0, 4)
      .map(l => l.replace(/^\s+- /, '').replace(/\*\*/g, '')).join('; ');
    out.push(ficha({
      slug: `cerebro-${t.grupo_slug}-${t.topico}`, tipo: 'cerebro',
      url: `https://www.inema.pro/cerebro/${t.grupo_slug}/${t.topico}`,
      titulo: `${t.grupo}: ${String(t.titulo ?? '').replace(/…$/, '')}`,
      resumo: `[INEMA.PRO] ${t.resumo ?? ''} ${assuntos}`,
      atualizado_em: /^\d{4}-\d{2}-\d{2}$/.test(t.data ?? '') ? t.data : hoje,
    }));
  }

  const nov = fs.readFileSync(path.join(PORTAL, 'src/data/novidades.ts'), 'utf8');
  const arr = nov.match(/novidadesData: Novidade\[\] = (\[[\s\S]*\]);/);
  for (const n of arr ? JSON.parse(arr[1]) : []) {
    out.push(ficha({
      slug: `novidade-${slugify(n.id)}`, tipo: 'novidade', url: n.url,
      titulo: `Novidade ${n.date}: ${n.titulo}`, resumo: n.resumo, atualizado_em: n.date,
    }));
  }

  // slug único (último vence)
  return [...new Map(out.map(f => [f.slug, f])).values()];
}

async function main() {
  const env = lerEnv(path.join(PORTAL, '.env.local'));
  const URL_ = env.NEXT_PUBLIC_SUPABASE_CHAT_URL;
  const KEY = env.SUPABASE_CHAT_SERVICE_ROLE_KEY;
  if (!URL_ || !KEY) throw new Error('NEXT_PUBLIC_SUPABASE_CHAT_URL / SUPABASE_CHAT_SERVICE_ROLE_KEY ausentes no .env.local');
  const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
  const rest = (q, init = {}) => fetch(`${URL_}/rest/v1/${q}`, { ...init, headers: { ...H, ...init.headers } });

  const r = await rest('catalogo_fichas?select=slug,url&limit=10000');
  if (!r.ok) throw new Error(`leitura catalogo_fichas: ${r.status} ${await r.text()}`);
  const existentes = await r.json();
  const curadas = existentes.filter(f => !PREFIXOS.some(p => f.slug.startsWith(p)));
  const urlsCuradas = new Set(curadas.map(f => f.url.replace(/\/+$/, '')));

  const fichas = montarFichas().filter(f => !urlsCuradas.has(f.url.replace(/\/+$/, '')));
  const novosSlugs = new Set(fichas.map(f => f.slug));
  const apagar = existentes.map(f => f.slug)
    .filter(s => PREFIXOS.some(p => s.startsWith(p)) && !novosSlugs.has(s));

  const porTipo = {};
  for (const f of fichas) porTipo[f.tipo] = (porTipo[f.tipo] ?? 0) + 1;
  console.log(`[sync-agente] curadas=${curadas.length} geradas=${fichas.length}`, porTipo, `apagar=${apagar.length}`);
  if (DRY) return;

  for (let i = 0; i < fichas.length; i += 500) {
    const lote = fichas.slice(i, i + 500).map(f => ({ ...f, synced_at: new Date().toISOString() }));
    const u = await rest('catalogo_fichas?on_conflict=slug', {
      method: 'POST', body: JSON.stringify(lote),
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    });
    if (!u.ok) throw new Error(`upsert lote ${i}: ${u.status} ${await u.text()}`);
  }
  for (let i = 0; i < apagar.length; i += 100) {
    const lista = apagar.slice(i, i + 100).map(s => `"${s}"`).join(',');
    const d = await rest(`catalogo_fichas?slug=in.(${encodeURIComponent(lista)})`, { method: 'DELETE' });
    if (!d.ok) throw new Error(`delete: ${d.status} ${await d.text()}`);
  }
  console.log('[sync-agente] ok');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(e => { console.error('[sync-agente] FALHOU:', e.message); process.exit(1); });
}
