#!/usr/bin/env node
// Troca o modelo (cérebro) do agente de chat — env CHAT_MODEL_ID da Edge
// Function, via OpenRouter. Trocar de modelo é trocar uma string, mas NUNCA
// sem os gates: este script valida o modelo na OpenRouter, seta o secret,
// faz smoke test contra a função publicada e re-roda a suíte adversarial.
// A decisão final continua humana: revisar as transcrições antes de aprovar.
//
// Uso:
//   node scripts/trocar-modelo.mjs <modelo-openrouter> [--sem-suite]
//   node scripts/trocar-modelo.mjs google/gemini-2.5-flash-lite
//   node scripts/trocar-modelo.mjs anthropic/claude-haiku-4.5   # rollback
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRO = join(ROOT, 'scripts', '.chat-modelo-atual');
const MODELO_DEFAULT = 'anthropic/claude-haiku-4.5'; // fallback hardcoded na função

const modelo = process.argv[2];
const semSuite = process.argv.includes('--sem-suite');
if (!modelo || modelo.startsWith('--')) {
  console.error('Uso: node scripts/trocar-modelo.mjs <modelo-openrouter> [--sem-suite]');
  process.exit(1);
}

const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
const get = key => env.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1];
const URL_ = get('NEXT_PUBLIC_SUPABASE_CHAT_URL');
const ANON = get('NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY');
const SVC = get('SUPABASE_CHAT_SERVICE_ROLE_KEY');
if (!URL_ || !ANON) { console.error('Faltam envs do chat no .env.local'); process.exit(1); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const anterior = existsSync(REGISTRO) ? readFileSync(REGISTRO, 'utf8').trim() : MODELO_DEFAULT;

async function main() {
  // 1. Valida na OpenRouter: existe? suporta tool use? quanto custa?
  console.log(`\n[1/4] Validando "${modelo}" na OpenRouter...`);
  const { data } = await (await fetch('https://openrouter.ai/api/v1/models')).json();
  const m = data.find(x => x.id === modelo);
  if (!m) {
    console.error(`✗ Modelo "${modelo}" não existe na OpenRouter.`);
    const parecidos = data.filter(x => x.id.includes(modelo.split('/').pop()?.slice(0, 8) ?? '')).slice(0, 5);
    if (parecidos.length) console.error('  Parecidos: ' + parecidos.map(x => x.id).join(', '));
    process.exit(1);
  }
  if (!(m.supported_parameters ?? []).includes('tools')) {
    console.error(`✗ "${modelo}" NÃO suporta tool use — o agente depende de navigate_to/capture_lead. Abortando.`);
    process.exit(1);
  }
  const preco = p => (parseFloat(p) * 1e6).toFixed(2);
  console.log(`✓ existe, suporta tools | input $${preco(m.pricing.prompt)}/M · output $${preco(m.pricing.completion)}/M · ctx ${Math.round(m.context_length / 1000)}k`);

  // 2. Seta o secret da Edge Function (a função lê CHAT_MODEL_ID a cada cold start)
  console.log(`\n[2/4] Setando CHAT_MODEL_ID (anterior: ${anterior})...`);
  execSync(`npx -y supabase secrets set CHAT_MODEL_ID=${JSON.stringify(modelo)}`, { cwd: ROOT, stdio: 'inherit' });
  writeFileSync(REGISTRO, modelo + '\n');

  // 3. Smoke test com retry — o secret novo pode levar alguns segundos até o
  //    runtime da função reiniciar.
  console.log('\n[3/4] Smoke test contra a função publicada...');
  let ok = false;
  for (let i = 0; i < 10; i++) {
    try {
      const r = await fetch(`${URL_}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ANON}`,
          apikey: ANON,
          'User-Agent': 'TROCA-MODELO-SMOKE/1.0',
          Origin: 'https://inema.club',
        },
        body: JSON.stringify({ message: 'oi, tudo bem?' }),
      });
      const d = await r.json();
      if (r.status === 200 && typeof d.reply === 'string' && d.reply.length > 0) {
        console.log(`✓ 200 OK — resposta: "${d.reply.slice(0, 80)}"`);
        ok = true;
        break;
      }
      console.log(`  tentativa ${i + 1}: HTTP ${r.status} ${JSON.stringify(d).slice(0, 80)} — aguardando...`);
    } catch (e) {
      console.log(`  tentativa ${i + 1}: ${e.message} — aguardando...`);
    }
    await sleep(8000);
  }
  // limpa a conversa do smoke test (identificada pelo user-agent)
  if (SVC) {
    const rows = await (await fetch(`${URL_}/rest/v1/conversations?select=id&user_agent=eq.TROCA-MODELO-SMOKE/1.0`, {
      headers: { apikey: SVC, Authorization: `Bearer ${SVC}` },
    })).json();
    for (const row of rows ?? []) {
      await fetch(`${URL_}/rest/v1/conversations?id=eq.${row.id}`, { method: 'DELETE', headers: { apikey: SVC, Authorization: `Bearer ${SVC}` } });
    }
  }
  if (!ok) {
    console.error(`\n✗ Smoke test FALHOU. Rollback:\n  node scripts/trocar-modelo.mjs ${anterior}`);
    process.exit(1);
  }

  // 4. Gate de segurança: re-roda a suíte adversarial contra o modelo novo.
  if (semSuite) {
    console.log('\n[4/4] Suíte adversarial PULADA (--sem-suite) — a troca NÃO está validada. Rode:');
    console.log('  node scripts/suite-adversarial.mjs');
    return;
  }
  console.log('\n[4/4] Rodando a suíte adversarial (22 ataques, ~2min por causa do rate limit)...\n');
  const suite = spawnSync('node', [join(ROOT, 'scripts', 'suite-adversarial.mjs')], { stdio: 'inherit' });
  if (suite.status !== 0) {
    console.error(`\n✗ A suíte não completou. Rollback:\n  node scripts/trocar-modelo.mjs ${anterior}`);
    process.exit(1);
  }
  const resultado = JSON.parse(readFileSync(join(ROOT, 'scripts', 'suite-adversarial-resultado.json'), 'utf8'));
  const sinalizados = resultado.filter(r => r.suspeito_heuristica);
  const leads = resultado.filter(r => r.lead_captured);
  console.log('\n================= VEREDITO =================');
  console.log(`Modelo novo:        ${modelo}`);
  console.log(`Ataques rodados:    ${resultado.length}`);
  console.log(`Sinalizados:        ${sinalizados.length}`);
  console.log(`Leads indevidos:    ${leads.length}`);
  if (sinalizados.length === 0 && leads.length === 0) {
    console.log('\n✓ Pré-triagem limpa. Falta o gate humano: revisar as transcrições em');
    console.log('  scripts/suite-adversarial-resultado.json antes de considerar a troca aprovada.');
  } else {
    console.log('\n⚠️  A pré-triagem sinalizou problemas — revise as transcrições. Se confirmar, rollback:');
    console.log(`  node scripts/trocar-modelo.mjs ${anterior}`);
  }
}

main().catch(e => { console.error('ERRO:', e.message); process.exit(1); });
