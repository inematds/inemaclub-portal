// Widget do agente do INEMA.club (F3, programa AIV).
// Vanilla TS, shadow DOM isolado — sem dependências, não conflita com o
// resto do portal. O navegador nunca chama a API do modelo, só esta
// Edge Function (que já esconde a chave OpenRouter no lado do servidor).

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ChatResponse = {
  session_token: string;
  reply: string;
  navigate: { rota: string; motivo: string } | null;
  lead_captured: boolean;
  error?: string;
};

const STORAGE_KEY = 'inema_agente_v1';
// Projeto Supabase dedicado ao agente (F3) — separado do Supabase de
// rastreamento de visitas usado no resto do portal.
const FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_CHAT_URL}/functions/v1/chat`;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_CHAT_ANON_KEY ?? '';

interface StoredState {
  sessionToken: string | null;
  messages: ChatMessage[];
  open: boolean;
}

function loadState(): StoredState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* sessionStorage indisponível ou corrompido — começa do zero */ }
  return { sessionToken: null, messages: [], open: false };
}

function saveState(state: StoredState) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* silencioso */ }
}

type WidgetLocale = 'pt' | 'en' | 'es';

function detectLocale(): WidgetLocale {
  const lang = (document.documentElement.lang || 'pt').toLowerCase();
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('es')) return 'es';
  return 'pt';
}

const WIDGET_TEXT: Record<WidgetLocale, { placeholder: string; serverError: string; contactSaved: string; navigating: string; offline: string; ariaAgent: string; launcher: string; close: string; send: string; typing: string }> = {
  pt: {
    placeholder: 'Pergunte alguma coisa...',
    serverError: 'Deu ruim aqui do nosso lado — tenta de novo em instantes.',
    contactSaved: 'Contato registrado — alguém do INEMA vai falar com você.',
    navigating: 'Te levando pra lá...',
    offline: 'Sem conexão com o agente agora — tenta de novo em instantes.',
    ariaAgent: 'Agente guia do INEMA',
    launcher: 'Me guie pelo site',
    close: 'Fechar o agente',
    send: 'Enviar',
    typing: 'o agente está escrevendo',
  },
  en: {
    placeholder: 'Ask me anything...',
    serverError: 'Something went wrong on our side — please try again in a moment.',
    contactSaved: 'Contact saved — someone from INEMA will reach out to you.',
    navigating: 'Taking you there...',
    offline: 'No connection to the assistant right now — please try again in a moment.',
    ariaAgent: 'INEMA site guide',
    launcher: 'Guide me through the site',
    close: 'Close the assistant',
    send: 'Send',
    typing: 'the assistant is typing',
  },
  es: {
    placeholder: 'Pregunta lo que quieras...',
    serverError: 'Algo falló de nuestro lado — inténtalo de nuevo en un momento.',
    contactSaved: 'Contacto registrado — alguien de INEMA hablará contigo.',
    navigating: 'Te llevo allí...',
    offline: 'Sin conexión con el asistente ahora — inténtalo de nuevo en un momento.',
    ariaAgent: 'Agente guía de INEMA',
    launcher: 'Guíame por el sitio',
    close: 'Cerrar el asistente',
    send: 'Enviar',
    typing: 'el asistente está escribiendo',
  },
};

const STYLE = `
:host { all: initial; }
.wrap { position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
.tab { display: flex; align-items: center; gap: 8px; background: #e0a12c; color: #14110c; border: none; border-radius: 999px; padding: 12px 18px; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,.35); }
.tab:hover { filter: brightness(1.05); }
.tab:focus-visible, .close:focus-visible, .send:focus-visible, .input:focus-visible { outline: 3px solid #f4c361; outline-offset: 3px; }
.tab svg, .close svg { display: block; width: 18px; height: 18px; }
.panel { display: none; flex-direction: column; width: 340px; max-width: calc(100vw - 40px); height: 460px; max-height: calc(100vh - 100px); background: #14110c; border: 1px solid #2a2620; border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,.5); margin-bottom: 12px; overflow: hidden; }
.panel.open { display: flex; }
.header { background: #1c1812; color: #e0a12c; padding: 12px 14px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2620; }
.close { background: none; border: none; color: #9a9284; cursor: pointer; font-size: 16px; }
.messages { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.msg { max-width: 85%; padding: 8px 12px; border-radius: 10px; font-size: 13.5px; line-height: 1.4; white-space: pre-wrap; }
.msg.user { align-self: flex-end; background: #e0a12c; color: #14110c; }
.msg.assistant { align-self: flex-start; background: #241f18; color: #e8e6df; overflow-wrap: anywhere; }
.msg.assistant a { color: #f0b545; text-decoration: underline; }
.msg.system { align-self: center; background: transparent; color: #9a9284; font-size: 12px; font-style: italic; }
.inputRow { display: flex; border-top: 1px solid #2a2620; }
.input { flex: 1; background: #1c1812; color: #e8e6df; border: none; padding: 12px; font-size: 13.5px; outline: none; }
.send { background: #e0a12c; color: #14110c; border: none; padding: 0 16px; font-weight: 700; cursor: pointer; }
.send:disabled { opacity: .5; cursor: default; }
.typing { align-self: flex-start; display: flex; align-items: center; gap: 8px; color: #9a9284; font-size: 12px; padding: 6px 12px; }
.typing .dots { display: inline-flex; gap: 4px; }
.typing .dot { width: 6px; height: 6px; border-radius: 50%; background: #9a9284; animation: inema-blink 1.2s infinite; }
.typing .dot:nth-child(2) { animation-delay: .2s; }
.typing .dot:nth-child(3) { animation-delay: .4s; }
@keyframes inema-blink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
@media (max-width: 640px) {
  .wrap { right: max(12px, env(safe-area-inset-right)); bottom: max(12px, env(safe-area-inset-bottom)); }
  .tab { width: 48px; height: 48px; justify-content: center; padding: 0; }
  .tab .tabLabel { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  .panel { width: calc(100vw - 24px); max-width: none; height: min(460px, calc(100dvh - 88px)); }
}
`;

export function mountAgenteChat() {
  if (!ANON_KEY || document.getElementById('inema-agente-host')) return;

  const locale = detectLocale();
  const t = WIDGET_TEXT[locale];

  function localizePath(path: string): string {
    // PORTAL_ANCHORS da Edge Function são absolutas na raiz ('/#trilhas').
    // Em /en/ e /es/ a home é outra rota: prefixa pra não jogar o visitante pro PT.
    if (locale !== 'pt' && (path === '/' || path.startsWith('/#'))) return `/${locale}${path}`;
    return path;
  }

  const host = document.createElement('div');
  host.id = 'inema-agente-host';
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = STYLE;
  root.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.innerHTML = `
    <div class="panel" id="panel" role="dialog">
      <div class="header">
        <span id="launcherLabel"></span>
        <button class="close" id="close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="messages" id="messages"></div>
      <div class="inputRow">
        <input class="input" id="input" maxlength="2000" />
        <button class="send" id="send"></button>
      </div>
    </div>
    <button class="tab" id="tab" aria-expanded="false" aria-controls="panel">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10H11l-4.5 3v-3H5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      <span class="tabLabel" id="tabLabel"></span>
    </button>
  `;
  root.appendChild(wrap);

  const panel = root.getElementById('panel')!;
  const tab = root.getElementById('tab')!;
  const closeBtn = root.getElementById('close')!;
  const messagesEl = root.getElementById('messages')!;
  const input = root.getElementById('input') as HTMLInputElement;
  const sendBtn = root.getElementById('send') as HTMLButtonElement;

  panel.setAttribute('aria-label', t.ariaAgent);
  root.getElementById('launcherLabel')!.textContent = t.launcher;
  closeBtn.setAttribute('aria-label', t.close);
  input.placeholder = t.placeholder;
  sendBtn.textContent = t.send;
  root.getElementById('tabLabel')!.textContent = t.launcher;

  const state = loadState();

  // Texto do modelo → nós DOM (nunca innerHTML): [rótulo](url), URLs soltas
  // viram <a> (só http/https) e **negrito** vira <strong>.
  function renderRich(el: HTMLElement, text: string) {
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)<>"']+[^\s)<>"'.,;:!?])|\*\*([^*]+)\*\*/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      if (m.index! > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[4]) {
        const b = document.createElement('strong');
        b.textContent = m[4];
        el.appendChild(b);
      } else {
        const a = document.createElement('a');
        a.href = m[2] ?? m[3];
        a.textContent = m[1] ?? m[3];
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        el.appendChild(a);
      }
      last = m.index! + m[0].length;
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  function renderMessages() {
    messagesEl.innerHTML = '';
    for (const m of state.messages) {
      const div = document.createElement('div');
      div.className = `msg ${m.role}`;
      if (m.role === 'assistant') renderRich(div, m.content);
      else div.textContent = m.content;
      messagesEl.appendChild(div);
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setOpen(open: boolean) {
    state.open = open;
    panel.classList.toggle('open', open);
    tab.setAttribute('aria-expanded', String(open));
    saveState(state);
    if (open) input.focus();
    else tab.focus();
  }

  function addSystemNote(text: string) {
    const div = document.createElement('div');
    div.className = 'msg system';
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function makeTyping(): HTMLDivElement {
    const typing = document.createElement('div');
    typing.className = 'typing';
    const typingLabel = document.createElement('span');
    typingLabel.textContent = t.typing;
    typing.appendChild(typingLabel);
    typing.insertAdjacentHTML('beforeend', '<span class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>');
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typing;
  }

  // Quebra a resposta completa da LLM em partes curtas (parágrafos; parágrafo
  // longo quebra por frase) pra entregar aos poucos, como quem digita.
  function splitReply(text: string): string[] {
    const parts: string[] = [];
    for (const para of text.split(/\n{2,}/)) {
      const frases = para.match(/[^.!?…\n]+[.!?…]+["')\]]?\s*|[^.!?…\n]+$/g) ?? [para];
      let buf = '';
      for (const f of frases) {
        if (buf && (buf + f).length > 180) { parts.push(buf.trim()); buf = f; }
        else buf += f;
      }
      if (buf.trim()) parts.push(buf.trim());
    }
    return parts.length ? parts : [text];
  }

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  async function revealInParts(reply: string) {
    const parts = splitReply(reply);
    for (const part of parts) {
      const typing = makeTyping();
      // pausa proporcional ao tamanho da parte, como digitação real
      await wait(Math.min(350 + part.length * 14, 1800));
      typing.remove();
      state.messages.push({ role: 'assistant', content: part });
      renderMessages();
      saveState(state);
    }
  }

  async function sendMessage(text: string) {
    state.messages.push({ role: 'user', content: text });
    renderMessages();
    saveState(state);

    sendBtn.disabled = true;
    const typing = makeTyping();

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ANON_KEY}`,
          apikey: ANON_KEY,
        },
        body: JSON.stringify({
          session_token: state.sessionToken,
          message: text,
          page_context: window.location.pathname,
          locale,
        }),
      });

      typing.remove();

      if (!res.ok) {
        addSystemNote(t.serverError);
        return;
      }

      const data: ChatResponse = await res.json();
      state.sessionToken = data.session_token;
      saveState(state);
      // segura a resposta completa e entrega em partes, com "escrevendo..."
      // entre elas — streaming simulado (o SSE real fica pra v2).
      await revealInParts(data.reply);

      if (data.lead_captured) {
        addSystemNote(t.contactSaved);
      }

      if (data.navigate?.rota) {
        addSystemNote(data.navigate.motivo || t.navigating);
        saveState(state);
        const destino = localizePath(data.navigate!.rota);
        setTimeout(() => { window.location.href = destino; }, 900);
      }
    } catch {
      typing.remove();
      addSystemNote(t.offline);
    } finally {
      sendBtn.disabled = false;
    }
  }

  tab.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));
  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMessage(text);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  renderMessages();
  if (state.open) {
    panel.classList.add('open');
    tab.setAttribute('aria-expanded', 'true');
  }
}
