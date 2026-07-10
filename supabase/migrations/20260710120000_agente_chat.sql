-- F3 (programa AIV): agente de chat do site — conversas, mensagens, leads,
-- espelho do catálogo (F2) pra busca por relevância, e flags de suspeita de
-- prompt injection pro loop de revisão da F4.

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  session_token text not null unique,
  ip_hash text not null,
  user_agent text,
  page_context text,
  persona text,
  turn_count int not null default 0,
  status text not null default 'active' check (status in ('active', 'ended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_ip_hash_created_at_idx on conversations (ip_hash, created_at desc);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'tool')),
  content text not null,
  tool_calls jsonb,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_created_at_idx on messages (conversation_id, created_at);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  nome text not null,
  email text not null,
  interesse text,
  created_at timestamptz not null default now()
);

create table if not exists injection_flags (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  message_id uuid references messages(id) on delete set null,
  motivo text not null,
  created_at timestamptz not null default now()
);

-- Espelho do catálogo público (F2, api/*.json) — atualizado por
-- scripts/sync-catalogo-supabase.mjs no repo aiv. Fonte de verdade continua
-- sendo catalogo/ no repo aiv; esta tabela é só cache de leitura pro agente.
create table if not exists catalogo_fichas (
  slug text primary key,
  tipo text not null,
  titulo text not null,
  resumo text not null,
  publico text[] not null default '{}',
  status text not null,
  relacionados text[] not null default '{}',
  url text not null,
  atualizado_em date not null,
  search_vector tsvector generated always as (
    setweight(to_tsvector('portuguese', coalesce(titulo, '')), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(resumo, '')), 'B')
  ) stored,
  synced_at timestamptz not null default now()
);

create index if not exists catalogo_fichas_search_idx on catalogo_fichas using gin (search_vector);

-- RLS: nada acessível pelo browser (anon key). Só a Edge Function, via
-- service role, lê/escreve nessas tabelas.
alter table conversations enable row level security;
alter table messages enable row level security;
alter table leads enable row level security;
alter table injection_flags enable row level security;
alter table catalogo_fichas enable row level security;
