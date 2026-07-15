#!/usr/bin/env node
// gen-courses-data.mjs — extrai os arrays de dados do catálogo (courses.ts + Portal.tsx)
// e grava src/data/courses.data.json. Consumidores externos (inemabuscas/generate_cursos.mjs,
// inemapro-mono gen-catalog.mjs) leem esse JSON — o parse/eval do TS fica confinado aqui,
// no repo dono, rodando junto de quem edita o courses.ts.
// Rode após editar courses.ts/Portal.tsx: `npm run gen:data`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'courses.data.json');

function extractArray(src, name) {
  const re = new RegExp('(?:export\\s+)?const\\s+' + name + '\\b[^=]*=\\s*\\[');
  const m = re.exec(src);
  if (!m) throw new Error(`array ${name} não encontrado`);
  const i = m.index + m[0].length - 1;
  let depth = 0, end = -1;
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { end = j; break; } }
  }
  if (end < 0) throw new Error(`array ${name} não fechado`);
  // eval do literal de array JS — fonte confiável local (o próprio repo)
  // eslint-disable-next-line no-eval
  return eval('(' + src.slice(i, end + 1) + ')');
}

const C = fs.readFileSync(path.join(ROOT, 'src/data/courses.ts'), 'utf8');
const P = fs.readFileSync(path.join(ROOT, 'src/components/Portal.tsx'), 'utf8');

const data = {
  platformsData: extractArray(C, 'platformsData'),
  updatesData: extractArray(C, 'updatesData'),
  projectUpdatesData: extractArray(C, 'projectUpdatesData'),
  communityProjects: extractArray(P, 'communityProjects'),
};

fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(
  `courses.data.json: ${data.platformsData.length} cursos | ${data.updatesData.length} updates | ` +
  `${data.projectUpdatesData.length} projUpdates | ${data.communityProjects.length} projetos`
);
