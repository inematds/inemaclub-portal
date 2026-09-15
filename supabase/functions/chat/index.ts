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
async function callLLM(messages: unknown[], tools: unknown[]) {
  if (AGNES_API_KEY) {
    try {
      return await callAgnes(messages, tools);
    } catch (err) {
      console.error('Agnes failed, falling back to OpenRouter', err);
    }
  }
  return callOpenRouter(messages, tools);
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
      reply: 'Essa conversa já foi longa demais por aqui — se quiser continuar, fala com a gente pelo Telegram ou pelos canais do INEMA.club.',
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

  // Busca fichas relevantes no catálogo (F2) por relevância textual.
  const { data: fichasRelevantes } = await supabase
    .from('catalogo_fichas')
    .select('slug, titulo, resumo, url')
    .textSearch('search_vector', message, { type: 'plain', config: 'portuguese' })
    .limit(5);

  const fichasContexto = (fichasRelevantes ?? [])
    .map(f => `- ${f.titulo}: ${f.resumo} (${f.url})`)
    .join('\n') || '(nenhuma ficha do catálogo bateu com essa pergunta — responda com honestidade que não está registrado)';

  const { data: todosSlugs } = await supabase.from('catalogo_fichas').select('slug');
  const tools = buildTools((todosSlugs ?? []).map(r => r.slug));

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

  let completion;
  try {
    completion = await callLLM(messages, tools);
  } catch (err) {
    console.error('OpenRouter error', err);
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
      );
      replyText = followUp.choices?.[0]?.message?.content?.trim() ?? 'Beleza, vamos lá!';
    } catch {
      replyText = 'Beleza, vamos lá!';
    }
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
