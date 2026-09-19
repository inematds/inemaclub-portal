# Descoberta do portal — 2026-09-19

- `/sitemap.xml`: gerado por `src/app/sitemap.ts`, com 66 páginas na primeira execução, homes PT/EN/ES e alternates recíprocos.
- `/courses-sitemap.xml`: gerado do catálogo atual; datas vêm dos registros de atualização. XML escapa caracteres reservados.
- `/robots.txt`: anuncia ambos os sitemaps.
- `/llms.txt`: idiomas, sitemaps, catálogos JSON e sites relacionados.
- `/inema.json`: manifesto e nomes das oito ferramentas declaradas no componente WebMCP. APIs permanecem como alternativa de leitura.
- As páginas apontam ao llms.txt e manifesto no HTML.

## Fontes e datas

Homes usam a data mais recente do feed de atualizações; cursos usam o catálogo; artigos WebMCP preservam a data publicada pelo template. `src/data/knowledge-sitemap.json` preserva as páginas da base AIV e datas visíveis conferidas nos HTMLs locais do projeto conhecimento em 2026-09-19. É um snapshot: ao publicar/remover ficha AIV, atualizar esse índice, sem buscar o upstream durante o build. Data ausente fica ausente.

Homes traduzidas não significam que todo curso ou artigo foi traduzido. O sitemap mantém conhecimento e cursos em PT. Novos artigos locais vêm automaticamente de `webMcpKnowledge`.

## Verificação

`npm test` e `npm run build`. Validar `/sitemap.xml`, `/courses-sitemap.xml`, `/robots.txt`, `/llms.txt`, `/inema.json` e as três homes com o servidor local. Publicação somente por git + push.

## Contrato e manutenção

`inema.json` é um manifesto próprio do INEMA, schema 1.0. Descreve identidade, idiomas, acesso, índices e relações. Não é padrão WebMCP nem comprovação de execução. `runtime_verified: false` significa que esta publicação não certifica o runtime das ferramentas.

`llms.txt` orienta a leitura; sitemap lista páginas públicas canônicas. Não colocar APIs, login, parâmetros de busca ou acervo restrito no sitemap. Manter traduções apenas quando a rota existe. Nunca usar o horário do build como atualização do conteúdo.

O catálogo central do ecossistema e a comparação automática de manifestos pelo scanner continuam planejados. Nesta entrega são publicadas as fontes de descoberta que poderão alimentá-los.

## Referências

- [Google: construção de sitemaps e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Proposta llms.txt e descoberta por links](https://llmstxt.org/).
- [Chrome: ferramentas WebMCP registradas](https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools).
