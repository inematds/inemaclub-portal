#!/usr/bin/env node
// Gera src/data/novidades.ts a partir do tópico de anúncios do grupo INEMA.VIP
// no Telegram. Roda toda madrugada (01:45), no fim da cadeia noturna: cada
// novidade linka pra uma nota do Cérebro, que só existe depois do ciclo do
// cerebro-vip (00:30 -> termina ~01:15) e do bake do PRO (01:30).
//
// Cadeia completa:
//   23:20  telegramtopicosindex  -> out2/<grupo>/<topico>/{messages.json,content.txt}
//   00:10  inemabuscas           -> out2/<grupo>/<topico>/resumo.md
//   00:30  cerebro-vip           -> content/ + docs/<slug>/<id>.html
//   01:30  inemapro-mono         -> apps/pro/data/cerebro.json (bake da rota /cerebro)
//   01:45  ESTE script           -> portal/src/data/novidades.ts + commit/push
//
// O destino de cada novidade é a rota SAME-ORIGIN https://www.inema.pro/cerebro/
// <slug>/<id>, e não o .html cru do cvip.inema.pro: o cvip responde 307 pra
// inema.pro/ e o assinante perde o destino no meio do login. Por isso o item só
// sai quando a chave já existe no cerebro.json (bake das 01:30).
//
// O tópico 306 do INEMA.VIP já é um feed curado pelo Nei: cada anúncio é um
// bloco fechado por uma linha de "=====". Não tem LLM aqui — título, chamada e
// link já vêm escritos por ele; o parágrafo sai do resumo.md que a cadeia
// das 00:10 gerou. Custo zero.
//
// Três filtros, e só (a curadoria é do Nei, não nossa):
//   1. FONTE DO NEI — mensagem de membro nunca entra no item.
//   2. NÃO É RESPOSTA — bloco em que um membro falou e que não anuncia nada
//      (sem link do Cérebro) é conversa; o que o Nei escreveu ali é resposta.
//   3. TEM O QUE MOSTRAR — sem link e sem parágrafo o card abriria vazio.

import fs from 'node:fs';
import path from 'node:path';

const TTI = '/home/nmaldaner/projetos/telegramtopicosindex';
const MONO = '/home/nmaldaner/projetos/inemapro-mono';
const PORTAL = path.resolve(new URL('..', import.meta.url).pathname);

const GRUPO_VIP = '2405283087';
const TOPICO_FEED = '306';
const DIAS_LOOKBACK = Number(process.env.NOVIDADES_DIAS ?? 3); // janela de blocos considerados; o state evita repetir
const MAX_ITENS = 30; // lista rolante no portal

// Autores que representam o Nei no tópico de anúncios (ele posta como admin
// anônimo -> "Desconhecido", ou pela conta do canal -> "INEMA"). Qualquer autor
// NOMEADO é membro do grupo — ou o próprio bot. Ver AUTORES_NEI no README da
// seção: é o que separa "fonte do Nei" de "conversa no grupo".
const AUTORES_NEI = new Set(['Desconhecido', 'INEMA', null, undefined, '']);
const doNei = (m) => AUTORES_NEI.has(m.author);

const SAIDA = path.join(PORTAL, 'src/data/novidades.ts');
const STATE = path.join(TTI, 'state/novidades-portal.json');

// ---------------------------------------------------------------- utilidades

const lerJSON = (p, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return fallback;
  }
};

/** grupo_id -> slug do cvip (INEMA.LLMS -> inema-llms), lido do MenusGrupos.md */
function mapaGrupos() {
  const md = fs.readFileSync(path.join(TTI, 'MenusGrupos.md'), 'utf8');
  const m = new Map();
  for (const [, label, id] of md.matchAll(/\|\s*(INEMA[.\w]*)\s*\|\s*https:\/\/t\.me\/c\/(\d+)\//g)) {
    m.set(id, { label, slug: label.toLowerCase().replace(/\./g, '-') });
  }
  return m;
}

/** Chaves "<slug>/<id>" já publicadas na rota /cerebro do inema.pro. */
const CEREBRO_TOPICOS = new Set(
  Object.keys(lerJSON(path.join(MONO, 'apps/pro/data/cerebro.json'), { topicos: {} }).topicos)
);

const SEP = /^=+$/;
const URL_RE = /https?:\/\/\S+/g;
const TME_RE = /t\.me\/c\/(\d+)\/(\d+)/;

/** Primeira linha de prosa (não-URL, não-separador) de um texto. */
function linhasProsa(txt) {
  return (txt || '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !SEP.test(l) && !/^https?:\/\//.test(l));
}

/** "- **Resumo curto**: ..." do resumo.md -> parágrafo limpo. */
function paragrafoDoResumo(grupoId, topicoId) {
  const p = path.join(TTI, 'out2', grupoId, topicoId, 'resumo.md');
  if (!fs.existsSync(p)) return '';
  const m = fs.readFileSync(p, 'utf8').match(/\*\*Resumo curto\*\*:\s*(.+)/);
  if (!m) return '';
  return m[1].replace(/\*\*/g, '').trim();
}

// ------------------------------------------------------------------- parsing

/**
 * Quebra as mensagens do tópico em blocos separados pelas linhas de "=====".
 * Só devolve blocos FECHADOS (que têm separador depois) — um bloco ainda aberto
 * pode receber mais mensagens e vira novidade no ciclo seguinte.
 */
function blocosFechados(msgs) {
  const blocos = [];
  let atual = [];
  for (const m of msgs) {
    const t = (m.text || '').trim();
    if (SEP.test(t)) {
      if (atual.length) blocos.push(atual);
      atual = [];
      continue;
    }
    atual.push(m);
  }
  return blocos; // o `atual` residual fica de fora de propósito: bloco aberto
}

function montaItem(bloco, grupos) {
  // Só entra o que o NEI escreveu: mensagem de membro sai fora do item.
  const temMembro = bloco.some((m) => (m.text || '').trim() && !doNei(m));
  const textos = bloco.filter(doNei).map((m) => m.text || '');
  const juntos = textos.join('\n');

  // Bloco onde um membro falou e que não anuncia nada (sem link do Cérebro) é
  // conversa: o que sobra do Nei ali é RESPOSTA dele, não novidade. Fora.
  if (temMembro && !TME_RE.test(juntos)) return null;

  const prosa = [];
  for (const t of textos) for (const l of linhasProsa(t)) if (!prosa.includes(l)) prosa.push(l);

  // Sem nenhuma linha de texto (bloco só de foto) não há o que renderizar.
  if (!prosa.length) return null;

  const titulo = prosa[0];
  const chamada = prosa.slice(1).join(' ').trim();
  const date = bloco[bloco.length - 1].date.slice(0, 10);

  const tme = juntos.match(TME_RE);
  if (tme) {
    const [, gid, tid] = tme;
    const g = grupos.get(gid);
    // Sem nota no bake do /cerebro o item espera o ciclo seguinte (nada de 404).
    if (!g || !CEREBRO_TOPICOS.has(`${g.slug}/${tid}`)) return null;
    return {
      id: `${gid}/${tid}`,
      date,
      titulo,
      resumo: paragrafoDoResumo(gid, tid) || chamada,
      grupo: g.label,
      url: `https://www.inema.pro/cerebro/${g.slug}/${tid}`,
    };
  }

  // Opção (b): bloco sem nota no Cérebro também vira novidade. Se houver um link
  // externo (YouTube, inema.club...) ele é o destino; senão o item é só texto.
  const externo = juntos.match(URL_RE);
  // Sem link e sem parágrafo o card abre vazio — não é novidade, é só um título
  // solto. Fora.
  if (!externo && !chamada) return null;
  return {
    id: `vip/${date}/${titulo.slice(0, 60)}`,
    date,
    titulo,
    resumo: chamada,
    grupo: 'INEMA.VIP',
    url: externo ? externo[0] : '',
  };
}

// --------------------------------------------------------------------- main

function main() {
  const grupos = mapaGrupos();
  const msgs = lerJSON(path.join(TTI, 'out2', GRUPO_VIP, TOPICO_FEED, 'messages.json'), []);
  if (!msgs.length) {
    console.error(`sem messages.json em out2/${GRUPO_VIP}/${TOPICO_FEED}`);
    process.exit(1);
  }
  msgs.sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);

  const corte = new Date(Date.now() - DIAS_LOOKBACK * 864e5).toISOString().slice(0, 10);
  const recentes = msgs.filter((m) => m.date.slice(0, 10) >= corte);

  const state = lerJSON(STATE, { emitidos: [] });
  const vistos = new Set(state.emitidos);

  const novos = [];
  for (const b of blocosFechados(recentes)) {
    const item = montaItem(b, grupos);
    if (item && !vistos.has(item.id)) {
      vistos.add(item.id);
      novos.push(item);
    }
  }

  if (!novos.length) {
    console.log('nenhuma novidade nova — nada a fazer');
    return;
  }

  const anteriores = existentes();
  const lista = [...novos, ...anteriores.filter((a) => !novos.some((n) => n.id === a.id))]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_ITENS);

  fs.writeFileSync(SAIDA, arquivoTS(lista));
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify({ emitidos: [...vistos].slice(-500) }, null, 2));

  console.log(`${novos.length} novidade(s): ${novos.map((n) => n.titulo).join(' | ')}`);
  console.log(`novidades.ts com ${lista.length} itens`);
}

/** Relê os itens já publicados do próprio novidades.ts (bloco JSON). */
function existentes() {
  if (!fs.existsSync(SAIDA)) return [];
  const m = fs.readFileSync(SAIDA, 'utf8').match(/novidadesData: Novidade\[\] = (\[[\s\S]*?\n\]);/);
  return m ? JSON.parse(m[1]) : [];
}

function arquivoTS(lista) {
  return `// GERADO POR scripts/gera-novidades.mjs — NÃO EDITAR À MÃO.
// Fonte: tópico ${TOPICO_FEED} do grupo INEMA.VIP no Telegram, todo dia às 01:45.
// Cada item linka pra rota /cerebro do inema.pro (área do assinante).

export type Novidade = {
  id: string;
  date: string;
  titulo: string;
  resumo: string;
  grupo: string;
  url: string;
};

export const novidadesData: Novidade[] = ${JSON.stringify(lista, null, 2)};
`;
}

main();
