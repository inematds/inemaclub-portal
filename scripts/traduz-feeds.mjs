#!/usr/bin/env node
// traduz-feeds.mjs — traduz pra EN/ES os textos dos três quadros dinâmicos da home
// (Últimas Novidades, Atualizações de Cursos, Atualizações de Projetos) e grava o cache
// em src/data/feeds-i18n.json, que o Portal.tsx lê em /en/ e /es/.
//
// Fonte: src/data/courses.data.json (updatesData/projectUpdatesData — rode `gen:data` antes)
// e src/data/novidades.ts (gerado). Só traduz o que ainda não está no cache (incremental),
// e só os itens que a home pode mostrar (20 por quadro + todas as novidades).
// Motor (2026-09-28): Codex pela ASSINATURA (`codex exec -m gpt-6-luna`, sessão do `codex login`) primeiro;
// Groq (GROQ_API_KEY nos .env conhecidos) só como reserva, quando o Codex falha. FEEDS_MOTOR=groq força a Groq.
// Falha do motor: avisa e sai com 0 — o cache antigo continua valendo, o resto cai no PT.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import os from 'os';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'src/data/feeds-i18n.json');
const MAX_POR_QUADRO = 20;
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const LANGS = { en: 'English', es: 'Spanish' };
const MOTOR = process.env.FEEDS_MOTOR || 'codex';
const CODEX_MODEL = process.env.FEEDS_CODEX_MODEL || 'gpt-6-luna';
// o cron não tem ~/.npm-global/bin no PATH: acha o codex pelo caminho completo
const CODEX_BIN = process.env.CODEX_BIN || [path.join(os.homedir(), '.npm-global/bin/codex')].find((p) => fs.existsSync(p)) || 'codex';

// Um pedido pelo Codex da assinatura: só leitura, sem sessão salva, pedido pela entrada padrão.
function viaCodex(sistema, usuario) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'feeds-'));
  const out = path.join(dir, 'out.txt');
  try {
    execFileSync(CODEX_BIN, ['exec', '-m', CODEX_MODEL, '--skip-git-repo-check', '--ephemeral', '--sandbox', 'read-only', '-C', dir, '-o', out, '-'],
      { input: `${sistema}\n\nINPUT:\n${usuario}`, stdio: ['pipe', 'ignore', 'pipe'], timeout: 600000,
        env: { ...process.env, PATH: `${path.dirname(CODEX_BIN)}:${process.env.PATH}` } });
    return fs.readFileSync(out, 'utf8').trim().replace(/^```(?:json)?\s*|\s*```$/g, '');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function loadKey() {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  for (const f of ['openpcbotv2/.env', 'wifi/.env']) {
    const p = path.join(process.env.HOME, 'projetos', f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/^GROQ_API_KEY=["']?([^"'\n]+)/m);
    if (m) return m[1].trim();
  }
  return null;
}

function textos() {
  const out = new Set();
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/courses.data.json'), 'utf8'));
  for (const arr of [data.updatesData, data.projectUpdatesData]) {
    for (const u of arr.slice(0, MAX_POR_QUADRO)) out.add(u.title);
  }
  const nov = fs.readFileSync(path.join(ROOT, 'src/data/novidades.ts'), 'utf8');
  const m = nov.match(/novidadesData[^=]*=\s*(\[[\s\S]*?\n\]);/);
  if (m) {
    for (const n of JSON.parse(m[1])) {
      if (n.titulo) out.add(n.titulo);
      if (n.resumo) out.add(n.resumo);
    }
  }
  return [...out].filter((s) => s && s.trim());
}

async function traduzLote(key, lang, itens) {
  const body = {
    model: MODEL,
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          `You translate short Brazilian Portuguese announcement titles about AI courses and software projects into ${LANGS[lang]}. ` +
          'Keep proper names, product names, course names in acronyms (FEP, ATIA, Codex, Claude Code, WebMCP, INEMA, INEMA.PRO, INEMA.VIP), repo slugs, version numbers, emojis and URLs exactly as they are. ' +
          'Translate the rest naturally and concisely, same tone, same punctuation style (keep the " — " separators). ' +
          'Return ONLY a JSON object {"t": ["...", ...]} with the translations in the same order and same count as the input array.',
      },
      { role: 'user', content: JSON.stringify(itens) },
    ],
  };
  if (MOTOR === 'codex') try {
    const txt = viaCodex(body.messages[0].content, body.messages[1].content);
    const parsed = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
    const t = Array.isArray(parsed) ? parsed : parsed.t;
    if (!Array.isArray(t) || t.length !== itens.length) throw new Error(`resposta com ${t?.length} itens, esperado ${itens.length}`);
    return t.map((s) => String(s).trim());
  } catch (e) {
    if (!key) throw e;
    console.warn(`traduz-feeds: Codex falhou (${String(e.message).slice(0, 80)}) — reserva Groq`);
  }
  let json;
  for (let tentativa = 1; ; tentativa++) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
    if (res.status === 429 && tentativa <= 5) {
      // teto de tokens/minuto do plano on_demand (8k TPM): espera e tenta de novo
      await new Promise((r) => setTimeout(r, 20000 * tentativa));
      continue;
    }
    if (!res.ok) throw new Error(`groq ${res.status}: ${(await res.text()).slice(0, 200)}`);
    json = await res.json();
    break;
  }
  const parsed = JSON.parse(json.choices[0].message.content);
  const t = Array.isArray(parsed) ? parsed : parsed.t;
  if (!Array.isArray(t) || t.length !== itens.length) throw new Error(`resposta com ${t?.length} itens, esperado ${itens.length}`);
  return t.map((s) => String(s).trim());
}

async function traduzUm(key, lang, texto) {
  const body = {
    model: MODEL,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content:
          `Translate the user's Brazilian Portuguese text into ${LANGS[lang]}. Keep proper names, product/course names, acronyms, slugs, versions, emojis and URLs unchanged. ` +
          'Reply with the translation only — no quotes, no explanation.',
      },
      { role: 'user', content: texto },
    ],
  };
  if (MOTOR === 'codex') try {
    const out = viaCodex(body.messages[0].content, body.messages[1].content).replace(/^["“]|["”]$/g, '');
    if (!out) throw new Error('vazio');
    return out;
  } catch (e) {
    if (!key) throw e;
    console.warn(`traduz-feeds: Codex falhou (${String(e.message).slice(0, 80)}) — reserva Groq`);
  }
  let json;
  for (let tentativa = 1; ; tentativa++) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
    if (res.status === 429 && tentativa <= 5) {
      await new Promise((r) => setTimeout(r, 20000 * tentativa));
      continue;
    }
    if (!res.ok) throw new Error(`groq ${res.status}`);
    json = await res.json();
    break;
  }
  const out = String(json.choices[0].message.content || '').trim().replace(/^["“]|["”]$/g, '');
  if (!out) throw new Error('vazio');
  return out;
}

async function main() {
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
  const todos = textos();
  const faltam = {};
  for (const lang of Object.keys(LANGS)) {
    faltam[lang] = todos.filter((s) => !cache[s]?.[lang]);
  }
  const total = Object.values(faltam).reduce((a, b) => a + b.length, 0);
  if (total === 0) {
    console.log(`traduz-feeds: cache completo (${todos.length} textos × ${Object.keys(LANGS).length} idiomas)`);
    return;
  }
  // Groq: motor forçado ou reserva do Codex. FEEDS_SEM_RESERVA=1 desliga a reserva (só Codex; falhou, fica em PT).
  const key = MOTOR === 'codex' && process.env.FEEDS_SEM_RESERVA === '1' ? null : loadKey();
  if (MOTOR === 'groq' && !key) {
    console.warn(`traduz-feeds: GROQ_API_KEY não encontrada — ${total} textos ficam em PT até a próxima rodada`);
    return;
  }
  for (const lang of Object.keys(LANGS)) {
    const lista = faltam[lang];
    for (let i = 0; i < lista.length; i += 8) {
      const lote = lista.slice(i, i + 8);
      let tr;
      try {
        tr = await traduzLote(key, lang, lote);
      } catch (e) {
        // Lote inválido (JSON quebrado por algum texto): tenta item a item, em texto puro.
        console.warn(`traduz-feeds: lote ${lang} ${i / 8 + 1} falhou (${e.message.slice(0, 80)}) — item a item`);
        tr = [];
        for (const item of lote) {
          try {
            tr.push(await traduzUm(key, lang, item));
          } catch (e2) {
            console.warn(`traduz-feeds: "${item.slice(0, 50)}…" ficou em PT (${e2.message.slice(0, 60)})`);
            tr.push(null);
          }
        }
      }
      let n = 0;
      lote.forEach((s, k) => {
        if (!tr[k]) return;
        cache[s] = cache[s] || {};
        cache[s][lang] = tr[k];
        n++;
      });
      console.log(`traduz-feeds: ${lang} +${n}`);
    }
  }
  // Poda: só mantém o que ainda é fonte (evita crescer sem limite)
  const vivos = new Set(todos);
  for (const k of Object.keys(cache)) if (!vivos.has(k)) delete cache[k];
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2) + '\n');
  console.log(`traduz-feeds: cache gravado com ${Object.keys(cache).length} textos`);
}

main().catch((e) => {
  console.warn(`traduz-feeds: erro (${e.message}) — cache não alterado`);
  process.exit(0);
});
