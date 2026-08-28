#!/bin/bash
# Últimas Novidades do portal: lê o tópico de anúncios do INEMA.VIP no Telegram
# e regenera src/data/novidades.ts, commitando + pushando quando muda.
#
# Roda às 01:30 — DEPOIS do cerebro-vip (00:30, termina ~01:15), porque cada
# novidade linka pra página publicada no cvip.inema.pro. Rodar antes disso faria
# o item esperar um dia inteiro (o gerador segura item sem página) ou apontar
# pra 404 no GitHub Pages.
#
# Instalado no cron via:
#   30 1 * * * /home/nmaldaner/projetos/portal/scripts/gera-novidades.sh >> /home/nmaldaner/projetos/portal/logs/novidades.log 2>&1

set -e
trap '/home/nmaldaner/bin/inema-notify "🚨 portal (01:30): geração das Últimas Novidades FALHOU na linha $LINENO. Ver logs/novidades.log" || true' ERR

# cron não herda env
export PATH="/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin"

PORTAL=/home/nmaldaner/projetos/portal
cd "$PORTAL"
mkdir -p logs

echo ""
echo "═══════ NOVIDADES INEMA.VIP — $(date '+%Y-%m-%d %H:%M:%S') ═══════"

/usr/bin/node scripts/gera-novidades.mjs

if git diff --quiet -- src/data/novidades.ts; then
  echo "novidades.ts sem mudança — sem commit"
  exit 0
fi

# Autor deste repo é sempre NeiMaldaner (ver CLAUDE.md); explícito porque o job
# roda headless e não pode depender do git config local estar correto.
git add src/data/novidades.ts
git -c user.name=NeiMaldaner -c user.email=nei.maldaner2014@gmail.com \
    commit -q -m "chore: últimas novidades do INEMA.VIP ($(date '+%Y-%m-%d'))"
git push -q origin main
echo "push ok — $(git log --oneline -1)"
