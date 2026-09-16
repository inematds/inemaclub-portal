# FALHAS — portal

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-16 | traduz-feeds: Groq devolveu 404 (`llama-3.3-70b-versatile` não existe mais), depois 429 (8k TPM) e 400 (JSON inválido em lote) | listar modelos antes de fixar um; backoff no 429; fallback item a item em texto puro | infra |
| 2026-09-15 | lote de banners no Codex parou no 1º: `codex exec` dentro de `while read` engoliu o stdin (a lista de jobs) | `< /dev/null` no comando dentro do loop | prompt |
| 2026-09-15 | `pkill -f "next start"` matou o próprio shell (exit 144) e servers Next de outros projetos | matar por PID listado com `ps`, nunca `pkill -f` com padrão genérico | prompt |
| 2026-09-15 | verificação local do /es/ mostrava PT: servidor `next start` antigo seguia vivo na porta e ISR servia cache | confirmar porta livre antes de subir; `rm -rf .next` antes do build de verificação | infra |
