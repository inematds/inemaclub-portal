// Heurística simples de suspeita de prompt injection — não bloqueia nada
// (o system prompt já é resistente por desenho), só sinaliza pra revisão
// humana no loop da F4. Falso positivo é aceitável aqui; falso negativo
// só custa uma revisão a menos.
const PATTERNS: Array<{ motivo: string; regex: RegExp }> = [
  { motivo: 'pedido de ignorar instruções', regex: /ignor[ea].{0,20}(instru|regra|prompt)/i },
  { motivo: 'pedido de revelar system prompt', regex: /(revele|mostre|repita|copie).{0,20}(prompt|instru)/i },
  { motivo: 'jailbreak de persona (DAN/sem regras)', regex: /\b(dan|sem regras|sem filtro|modo desenvolvedor|developer mode)\b/i },
  { motivo: 'claim de autoridade suspeito', regex: /(sou|eu sou).{0,15}(nei maldaner|desenvolvedor|admin|equipe (do|da) inema)/i },
  { motivo: 'tag de sistema falsa', regex: /\[?\s*(system|sistema)\s*\]?\s*:/i },
  { motivo: 'pedido de chave/segredo', regex: /(chave|api.?key|token|secret).{0,15}(api|openrouter|anthropic)/i },
  { motivo: 'pedido de base64/encoding de instruções', regex: /base64|rot13|hex encod/i },
];

export function checkInjectionSuspicion(message: string): string | null {
  for (const { motivo, regex } of PATTERNS) {
    if (regex.test(message)) return motivo;
  }
  return null;
}
