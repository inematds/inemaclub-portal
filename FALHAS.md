# FALHAS — portal

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-23 | Sessão paralela commitou (`f278475`) edição ainda em andamento do Portal.tsx de outra sessão; origin ficou minutos com chaves i18n inexistentes | Commitar só arquivos próprios (`git add <arquivos>`, nunca `-A`/`.`) e checar `git status` antes | infra |
| 2026-09-21 | Home referenciava cerca de 20 MiB em imagens, com banners PNG carregados antecipadamente | Servir derivados WebP PT/EN/ES e carregar banners abaixo do topo sob demanda | infra |
| 2026-09-21 | Regeneração removia sanmartindelosandes já presente no catálogo derivado | Repor entrada ausente na fonte communityProjects antes de gerar | infra |
| 2026-09-20 | Push do OSWork encontrou branch remota avançada e conflitos de catálogo | Mesclar novidades das duas sessões e regenerar derivados | infra |
| 2026-09-19 | resolução por regex de conflito consumiu o restante de courses.ts | restaurar a versão remota do índice e reaplicar somente as três alterações Jev antes de gerar e validar | prompt |
| 2026-09-19 | push Jev encontrou atualização JurisFlow concorrente e conflitos nos feeds | rebase preservando ambos os itens e regeneração do JSON antes de republicar | infra |
| 2026-09-19 | plano dizia que sitemap não existia; índice estático não mantinha alternates | gerar sitemap pelas fontes existentes, preservar fichas AIV e corrigir o registro | prompt |
| 2026-09-17 | documentação e teste do Eventos foram escritos no cwd do portal | mover os dois arquivos ao Eventos e restaurar CLAUDE.md do portal, antes limpo, a partir do HEAD; explicitar workdir em cada escrita | prompt |
| 2026-09-16 | traduz-feeds: Groq devolveu 404 (`llama-3.3-70b-versatile` não existe mais), depois 429 (8k TPM) e 400 (JSON inválido em lote) | listar modelos antes de fixar um; backoff no 429; fallback item a item em texto puro | infra |
| 2026-09-15 | lote de banners no Codex parou no 1º: `codex exec` dentro de `while read` engoliu o stdin (a lista de jobs) | `< /dev/null` no comando dentro do loop | prompt |
| 2026-09-15 | `pkill -f "next start"` matou o próprio shell (exit 144) e servers Next de outros projetos | matar por PID listado com `ps`, nunca `pkill -f` com padrão genérico | prompt |
| 2026-09-15 | verificação local do /es/ mostrava PT: servidor `next start` antigo seguia vivo na porta e ISR servia cache | confirmar porta livre antes de subir; `rm -rf .next` antes do build de verificação | infra |
