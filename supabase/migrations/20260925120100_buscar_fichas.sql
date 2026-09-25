-- Busca ranqueada do agente. Antes: textSearch 'plain' (TODAS as palavras
-- da mensagem tinham que bater) — "onde encontro conteúdos do Hermes" não
-- achava nada. Agora: termos em OR (a Edge Function monta 'hermes:* | conteud:*'),
-- ordenado por ts_rank_cd, com leve peso pra curso/projeto/ferramenta/fichas
-- curadas sobre tópicos do Cérebro.
create or replace function buscar_fichas(consulta text, n int default 12)
returns table (slug text, tipo text, titulo text, resumo text, url text, atualizado_em date, rank real)
language sql stable
as $$
  select f.slug, f.tipo, f.titulo, f.resumo, f.url, f.atualizado_em,
         (ts_rank_cd(f.search_vector, q) *
          case when f.tipo in ('cerebro', 'novidade') then 1.0 else 1.6 end)::real as rank
  from catalogo_fichas f, to_tsquery('portuguese', consulta) q
  where f.search_vector @@ q
  order by rank desc
  limit n
$$;

revoke execute on function buscar_fichas(text, int) from public, anon, authenticated;
grant execute on function buscar_fichas(text, int) to service_role;
