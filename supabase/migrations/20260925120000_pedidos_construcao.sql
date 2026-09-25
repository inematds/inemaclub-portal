-- Fila de construção: tudo que o visitante pediu e o INEMA ainda não tem.
-- O agente grava aqui pela tool registrar_pedido (contato é opcional).
-- O digest semanal (inemapro-mono/scripts/radar-pedidos.mjs) lê esta tabela
-- e manda no Telegram pelo bot v3.

create table if not exists pedidos_construcao (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete set null,
  pedido text not null,
  contexto text,
  contato_nome text,
  contato_email text,
  contato_telegram text,
  status text not null default 'novo'
    check (status in ('novo', 'em_analise', 'construindo', 'entregue', 'descartado')),
  entrega_url text,
  created_at timestamptz not null default now()
);

create index if not exists pedidos_construcao_created_at_idx on pedidos_construcao (created_at desc);
create index if not exists pedidos_construcao_status_idx on pedidos_construcao (status);

alter table pedidos_construcao enable row level security;
