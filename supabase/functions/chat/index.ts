// F3 (programa AIV) — agente de chat do INEMA.club.
// v1 sem streaming (fallback previsto no plano) — o navegador nunca chama a
// API do modelo, só esta função. Cérebro: Claude Haiku via OpenRouter.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { buildSystemPrompt, MAX_MESSAGE_LENGTH, MAX_TURNS_PER_CONVERSATION, RATE_LIMIT_WINDOW_SECONDS, RATE_LIMIT_MAX_MESSAGES } from '../_shared/prompts.ts';
import { buildTools } from '../_shared/tools.ts';
import { checkInjectionSuspicion } from '../_shared/injection-heuristics.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY')!;
const MODEL_ID = Deno.env.get('CHAT_MODEL_ID') ?? 'anthropic/claude-haiku-4.5';

// Cérebro primário: Agnes (custo US$ 0, OpenAI-compatible). Fallback: OpenRouter.
const AGNES_API_KEY = Deno.env.get('AGNES_API_KEY') ?? '';
const AGNES_BASE_URL = Deno.env.get('AGNES_BASE_URL') ?? 'https://apihub.agnes-ai.com/v1';
const AGNES_MODEL = Deno.env.get('AGNES_MODEL') ?? 'agnes-2.0-flash';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Espelha PREFIXOS em portal/scripts/sync-agente-catalogo.mjs.
const PREFIXOS_GERADOS = ['pro-', 'wiki-', 'cerebro-', 'novidade-'];
const RE_VIU_POST = /instagram|insta\b|tik ?tok|reels?\b|youtube|v[ií]deo d[oe]|no v[ií]deo|post(ou|agem)?\b|publica[çc][aã]o|publicou|anunci|lan[çc]ou|falou|mostrou|nova ia|ia nova|novidade|recente/i;
// Palavras que não ajudam a achar nada (a config 'portuguese' já tira artigos
// e preposições; estas são as de pedido/conversa).
const PALAVRAS_VAZIAS = new Set([
  'quero', 'queria', 'gostaria', 'preciso', 'precisava', 'como', 'onde', 'aonde', 'qual', 'quais',
  'tem', 'tenho', 'temos', 'vocês', 'voces', 'você', 'voce', 'sobre', 'algum', 'alguma', 'isso',
  'esse', 'essa', 'aqui', 'site', 'inema', 'favor', 'obrigado', 'obrigada', 'sim', 'não', 'nao',
  'pode', 'posso', 'fazer', 'saber', 'encontro', 'encontrar', 'achar', 'acho', 'mostra', 'mostre',
  'manda', 'mande', 'link', 'ver', 'olá', 'ola', 'oi', 'bom', 'boa', 'dia', 'tarde', 'noite',
]);

type Ficha = { slug: string; tipo: string; titulo: string; resumo: string; url: string; atualizado_em?: string };

// 'onde encontro conteúdos do Hermes' → 'conteúdos:* | hermes:*'. Só letras e
// dígitos entram, então o texto do visitante não injeta operador no tsquery.
function montarConsulta(texto: string): string {
  const termos = [...new Set((texto.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? []))]
    .filter(t => !PALAVRAS_VAZIAS.has(t))
    .slice(0, 10);
  return termos.map(t => (t.length >= 4 ? `${t}:*` : t)).join(' | ');
}

function formatarFicha(f: Ficha): string {
  return `- [${f.tipo}] ${f.titulo}: ${f.resumo} (${f.url})`;
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function jsonResponse(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

async function callOpenRouter(messages: unknown[], tools: unknown[]) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://inema.club',
      'X-Title': 'INEMA Agente',
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages,
      tools,
      max_tokens: 400,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function callAgnes(messages: unknown[], tools: unknown[]) {
  const res = await fetch(`${AGNES_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AGNES_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: AGNES_MODEL,
      messages,
      tools,
      max_tokens: 400,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    throw new Error(`Agnes ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// Chama o Agnes primeiro (custo US$ 0); em qualquer falha dura (rede/HTTP),
// cai pro OpenRouter. Sem chave do Agnes, vai direto pro OpenRouter.
// Atenção: o fallback só cobre INDISPONIBILIDADE do Agnes, não resposta fraca.
// `erros` coleta as falhas de modelo do turno, que o turno grava em
// `messages` (role 'tool', 'erro_llm: ...') — é o que o radar semanal conta.
async function callLLM(messages: unknown[], tools: unknown[], erros: string[]) {
  if (AGNES_API_KEY) {
    for (let tentativa = 0; tentativa < 2; tentativa++) {
      try {
        return await callAgnes(messages, tools);
      } catch (err) {
        const msg = String((err as Error).message ?? err).slice(0, 300);
        erros.push(msg);
        console.error('Agnes failed', msg);
        // 429 = limite de taxa do Agnes: espera um pouco e tenta de novo.
        if (!msg.startsWith('Agnes 429') || tentativa > 0) break;
        await new Promise(r => setTimeout(r, 2500));
      }
    }
  }
  try {
    return await callOpenRouter(messages, tools);
  } catch (err) {
    erros.push(String((err as Error).message ?? err).slice(0, 300));
    throw err;
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(origin) });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405, origin);
  }

  let body: { session_token?: string; message?: string; page_context?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400, origin);
  }

  const message = (body.message ?? '').trim();
  if (!message) return jsonResponse({ error: 'empty_message' }, 400, origin);
  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: 'message_too_long' }, 400, origin);
  }

  const locale: 'pt' | 'en' | 'es' =
    body.locale === 'en' || body.locale === 'es' ? body.locale : 'pt';

  const forwardedFor = req.headers.get('x-forwarded-for') ?? 'unknown';
  const ip = forwardedFor.split(',')[0].trim();
  const ipHash = await hashIp(ip);

  // Rate limit: mensagens desse IP (em qualquer conversa) na janela.
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString();
  const { count: recentCount } = await supabase
    .from('messages')
    .select('id, conversations!inner(ip_hash)', { count: 'exact', head: true })
    .eq('conversations.ip_hash', ipHash)
    .eq('role', 'user')
    .gte('created_at', windowStart);

  if ((recentCount ?? 0) >= RATE_LIMIT_MAX_MESSAGES) {
    return jsonResponse({ error: 'rate_limited' }, 429, origin);
  }

  // Conversa: recupera por session_token ou cria uma nova.
  let conversation;
  if (body.session_token) {
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_token', body.session_token)
      .maybeSingle();
    conversation = data;
  }
  if (!conversation) {
    const sessionToken = crypto.randomUUID();
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        session_token: sessionToken,
        ip_hash: ipHash,
        page_context: body.page_context ?? null,
        user_agent: (req.headers.get('user-agent') ?? '').slice(0, 256) || null,
      })
      .select()
      .single();
    if (error) return jsonResponse({ error: 'conversation_create_failed' }, 500, origin);
    conversation = data;
  }

  if (conversation.turn_count >= MAX_TURNS_PER_CONVERSATION) {
    return jsonResponse({
      session_token: conversation.session_token,
      reply: 'Essa conversa já foi longa demais por aqui — se quiser continuar, fala com o apoio do INEMA: Telegram @apoioinema (https://t.me/apoioinema) ou e-mail inemavip@gmail.com.',
      navigate: null,
    }, 200, origin);
  }

  const { data: userMessageRow } = await supabase
    .from('messages')
    .insert({ conversation_id: conversation.id, role: 'user', content: message })
    .select('id')
    .single();

  const suspicionMotivo = checkInjectionSuspicion(message);
  if (suspicionMotivo) {
    await supabase.from('injection_flags').insert({
      conversation_id: conversation.id,
      message_id: userMessageRow?.id ?? null,
      motivo: suspicionMotivo,
    });
  }

  // Busca no catálogo inteiro (fichas curadas + cursos/projetos/ferramentas/
  // Cérebro/novidades sincronizados toda noite), termos em OR, ranqueada.
  // Usa as 2 últimas mensagens do visitante: "Sim" / "me mostra" sozinhos
  // não carregam o assunto.
  const { data: ultimasDoVisitante } = await supabase
    .from('messages')
    .select('content')
    .eq('conversation_id', conversation.id)
    .eq('role', 'user')
    .order('created_at', { ascending: false })
    .limit(2);
  const textoBusca = (ultimasDoVisitante ?? []).map(m => m.content).join(' ');
  const consulta = montarConsulta(textoBusca);

  let candidatas: Ficha[] = [];
  if (consulta) {
    const { data, error } = await supabase.rpc('buscar_fichas', { consulta, n: 14 });
    if (error) console.error('buscar_fichas', error);
    candidatas = data ?? [];
  }
  // No máximo 3 tópicos do Cérebro: eles são muitos e abafariam curso/projeto.
  let nCerebro = 0;
  const escolhidas = candidatas.filter(f => {
    if (f.tipo !== 'cerebro') return true;
    return ++nCerebro <= 3;
  }).slice(0, 7);

  // "Vi no Instagram / no vídeo do Nei / a IA nova que ele postou": manda as
  // novidades mais recentes junto, pra achar o item mesmo sem o nome.
  let novidadesContexto = '';
  if (RE_VIU_POST.test(textoBusca)) {
    const { data: recentes } = await supabase
      .from('catalogo_fichas')
      .select('slug, tipo, titulo, resumo, url, atualizado_em')
      .eq('tipo', 'novidade')
      .order('atualizado_em', { ascending: false })
      .limit(8);
    novidadesContexto = (recentes ?? []).map(formatarFicha).join('\n');
  }

  const fichasContexto = [
    escolhidas.map(formatarFicha).join('\n'),
    novidadesContexto && `Novidades recentes publicadas pelo Nei (o visitante pode estar falando de uma delas):\n${novidadesContexto}`,
  ].filter(Boolean).join('\n\n') || '(nenhuma ficha do catálogo bateu com essa pergunta — diga que ainda não temos isso e ofereça registrar o pedido com registrar_pedido)';

  // Só fichas curadas têm página /conhecimento/<slug>/ — as geradas
  // (prefixos pro-, wiki-, cerebro-, novidade-) apontam pra fora.
  // Filtra no banco: o PostgREST corta em 1000 linhas e as geradas são ~3 mil.
  let consultaSlugs = supabase.from('catalogo_fichas').select('slug');
  for (const p of PREFIXOS_GERADOS) consultaSlugs = consultaSlugs.not('slug', 'like', `${p}%`);
  const { data: todosSlugs } = await consultaSlugs;
  const slugsConhecimento = (todosSlugs ?? []).map(r => r.slug);
  const tools = buildTools(slugsConhecimento);

  // Histórico recente (só texto — tool calls não são replayados entre
  // turnos, cada turno decide de novo se precisa de ferramenta).
  const { data: historico } = await supabase
    .from('messages')
    .select('role, content')
    .eq('conversation_id', conversation.id)
    .in('role', ['user', 'assistant'])
    .order('created_at', { ascending: true })
    .limit(20);

  const messages = [
    { role: 'system', content: buildSystemPrompt(fichasContexto, locale) },
    ...(historico ?? []).map(m => ({ role: m.role, content: m.content })),
  ];

  const errosLLM: string[] = [];
  let completion;
  try {
    completion = await callLLM(messages, tools, errosLLM);
  } catch (err) {
    console.error('LLM error', err);
    await supabase.from('messages').insert({
      conversation_id: conversation.id, role: 'tool', content: `erro_llm: ${errosLLM.join(' || ')}`.slice(0, 1000),
    });
    return jsonResponse({ error: 'model_unavailable' }, 502, origin);
  }

  const choice = completion.choices?.[0];
  const toolCalls = choice?.message?.tool_calls ?? [];

  let navigate: { rota: string; motivo: string } | null = null;
  let leadCaptured = false;

  for (const call of toolCalls) {
    let args: Record<string, string> = {};
    try { args = JSON.parse(call.function.arguments); } catch { /* ignora argumento malformado */ }

    if (call.function.name === 'navigate_to' && args.rota) {
      navigate = { rota: args.rota, motivo: args.motivo ?? '' };
    }
    if (call.function.name === 'registrar_pedido' && args.pedido) {
      // Mesmo pedido, segunda chamada só pra somar o contato: atualiza a
      // linha que a conversa já tem em vez de duplicar.
      const campos = {
        pedido: args.pedido.slice(0, 1000),
        contexto: args.contexto?.slice(0, 1000) || null,
        contato_nome: args.nome?.slice(0, 120) || null,
        contato_email: args.email?.slice(0, 200) || null,
        contato_telegram: args.telegram?.slice(0, 120) || null,
      };
      const { data: anterior } = await supabase
        .from('pedidos_construcao')
        .select('id, contexto, contato_nome, contato_email, contato_telegram')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      const temContatoNovo = campos.contato_email || campos.contato_telegram;
      const { error } = anterior && temContatoNovo && !anterior.contato_email && !anterior.contato_telegram
        ? await supabase.from('pedidos_construcao').update({
            ...campos,
            contexto: campos.contexto ?? anterior.contexto,
            contato_nome: campos.contato_nome ?? anterior.contato_nome,
          }).eq('id', anterior.id)
        : await supabase.from('pedidos_construcao').insert({ conversation_id: conversation.id, ...campos });
      if (error) console.error('registrar_pedido', error);
    }
    if (call.function.name === 'capture_lead' && args.nome && args.email) {
      await supabase.from('leads').insert({
        conversation_id: conversation.id,
        nome: args.nome,
        email: args.email,
        interesse: args.interesse ?? null,
      });
      leadCaptured = true;
    }
  }

  let replyText = choice?.message?.content?.trim() ?? '';

  // Se só houve tool_calls sem texto, pede uma frase curta de narração.
  if (!replyText && toolCalls.length > 0) {
    try {
      const followUp = await callLLM(
        [...messages,
          { role: 'assistant', content: null, tool_calls: toolCalls },
          ...toolCalls.map((c: { id: string }) => ({ role: 'tool', tool_call_id: c.id, content: 'ok' })),
        ],
        tools,
        errosLLM,
      );
      replyText = followUp.choices?.[0]?.message?.content?.trim() ?? '';
    } catch { /* cai na narração montada abaixo */ }
    if (!replyText) {
      // Sem segunda resposta do modelo: narra com o que as próprias tools dizem.
      const pediu = toolCalls.some((c: { function: { name: string } }) => c.function.name === 'registrar_pedido');
      replyText = [
        navigate?.motivo,
        pediu && 'Registrei seu pedido na fila de construção do INEMA. Se quiser ser avisado quando ficar pronto, me diga seu e-mail ou @ do Telegram.',
      ].filter(Boolean).join(' ') || 'Beleza, vamos lá!';
    }
  }

  if (errosLLM.length) {
    await supabase.from('messages').insert({
      conversation_id: conversation.id, role: 'tool', content: `erro_llm: ${errosLLM.join(' || ')}`.slice(0, 1000),
    });
  }

  await supabase.from('messages').insert({
    conversation_id: conversation.id,
    role: 'assistant',
    content: replyText,
    tool_calls: toolCalls.length > 0 ? toolCalls : null,
  });

  await supabase
    .from('conversations')
    .update({ turn_count: conversation.turn_count + 1, updated_at: new Date().toISOString() })
    .eq('id', conversation.id);

  return jsonResponse({
    session_token: conversation.session_token,
    reply: replyText,
    navigate,
    lead_captured: leadCaptured,
  }, 200, origin);
});
