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

const STYLE = `
:host { all: initial; }
.wrap { position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
.tab { display: flex; align-items: center; gap: 8px; background: #e0a12c; color: #14110c; border: none; border-radius: 999px; padding: 12px 18px; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 6px 20px rgba(0,0,0,.35); }
.tab:hover { filter: brightness(1.05); }
.panel { display: none; flex-direction: column; width: 340px; max-width: calc(100vw - 40px); height: 460px; max-height: calc(100vh - 100px); background: #14110c; border: 1px solid #2a2620; border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,.5); margin-bottom: 12px; overflow: hidden; }
.panel.open { display: flex; }
.header { background: #1c1812; color: #e0a12c; padding: 12px 14px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2620; }
.close { background: none; border: none; color: #9a9284; cursor: pointer; font-size: 16px; }
.messages { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.msg { max-width: 85%; padding: 8px 12px; border-radius: 10px; font-size: 13.5px; line-height: 1.4; white-space: pre-wrap; }
.msg.user { align-self: flex-end; background: #e0a12c; color: #14110c; }
.msg.assistant { align-self: flex-start; background: #241f18; color: #e8e6df; }
.msg.system { align-self: center; background: transparent; color: #9a9284; font-size: 12px; font-style: italic; }
.inputRow { display: flex; border-top: 1px solid #2a2620; }
.input { flex: 1; background: #1c1812; color: #e8e6df; border: none; padding: 12px; font-size: 13.5px; outline: none; }
.send { background: #e0a12c; color: #14110c; border: none; padding: 0 16px; font-weight: 700; cursor: pointer; }
.send:disabled { opacity: .5; cursor: default; }
.typing { align-self: flex-start; color: #9a9284; font-size: 12px; padding: 4px 12px; }
`;

export function mountAgenteChat() {
  if (!ANON_KEY || document.getElementById('inema-agente-host')) return;

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
    <div class="panel" id="panel">
      <div class="header">
        <span>Me guie pelo site</span>
        <button class="close" id="close" aria-label="Fechar">✕</button>
      </div>
      <div class="messages" id="messages"></div>
      <div class="inputRow">
        <input class="input" id="input" placeholder="Pergunte alguma coisa..." maxlength="2000" />
        <button class="send" id="send">Enviar</button>
      </div>
    </div>
    <button class="tab" id="tab">💬 Me guie pelo site</button>
  `;
  root.appendChild(wrap);

  const panel = root.getElementById('panel')!;
  const tab = root.getElementById('tab')!;
  const closeBtn = root.getElementById('close')!;
  const messagesEl = root.getElementById('messages')!;
  const input = root.getElementById('input') as HTMLInputElement;
  const sendBtn = root.getElementById('send') as HTMLButtonElement;

  const state = loadState();

  function renderMessages() {
    messagesEl.innerHTML = '';
    for (const m of state.messages) {
      const div = document.createElement('div');
      div.className = `msg ${m.role}`;
      div.textContent = m.content;
      messagesEl.appendChild(div);
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setOpen(open: boolean) {
    state.open = open;
    panel.classList.toggle('open', open);
    saveState(state);
  }

  function addSystemNote(text: string) {
    const div = document.createElement('div');
    div.className = 'msg system';
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage(text: string) {
    state.messages.push({ role: 'user', content: text });
    renderMessages();
    saveState(state);

    sendBtn.disabled = true;
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.textContent = 'digitando...';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

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
        }),
      });

      typing.remove();

      if (!res.ok) {
        addSystemNote('Deu ruim aqui do nosso lado — tenta de novo em instantes.');
        return;
      }

      const data: ChatResponse = await res.json();
      state.sessionToken = data.session_token;
      state.messages.push({ role: 'assistant', content: data.reply });
      renderMessages();
      saveState(state);

      if (data.lead_captured) {
        addSystemNote('Contato registrado — alguém do INEMA vai falar com você.');
      }

      if (data.navigate?.rota) {
        addSystemNote(data.navigate.motivo || 'Te levando pra lá...');
        saveState(state);
        setTimeout(() => { window.location.href = data.navigate!.rota; }, 900);
      }
    } catch {
      typing.remove();
      addSystemNote('Sem conexão com o agente agora — tenta de novo em instantes.');
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
  if (state.open) panel.classList.add('open');
}
