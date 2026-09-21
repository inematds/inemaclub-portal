# Peso das imagens da home — 2026-09-21

Inventário dos arquivos únicos referenciados pela home, por idioma. Soma dos arquivos, não medição de transferência inicial nem de Core Web Vitals. WebP qualidade 85, dimensões preservadas; originais mantidos para edição.

| Idioma | Antes (MiB) | Depois (MiB) | Redução |
|---|---:|---:|---:|
| pt | 19.44 | 3.24 | 83.3% |
| en | 19.83 | 3.34 | 83.2% |
| es | 19.99 | 3.36 | 83.2% |

## Banners otimizados (PT)

| Arquivo original | Antes (KiB) | WebP (KiB) |
|---|---:|---:|
| conviteinemap.png | 191 | 18 |
| oswork.png | 1803 | 138 |
| jev.png | 1575 | 96 |
| gestao-agentes-2027.png | 2103 | 210 |
| ia-cultivada.png | 2235 | 238 |
| claude-codex-agnostico.png | 1972 | 198 |
| agi-chegou.png | 2247 | 264 |
| content2video.png | 1882 | 213 |
| webmcp2.png | 1834 | 191 |
| capa-musicavideo-v2.jpg | 350 | 214 |
| vczero.png | 2291 | 218 |
| inemaagenteshubv.jpg | 294 | 196 |

Manutenção: ao substituir um original, executar `node scripts/optimize-banners.cjs` para renovar WebP PT/EN/ES. Os banners abaixo do topo usam loading="lazy"; o hero principal mantém carregamento imediato.
