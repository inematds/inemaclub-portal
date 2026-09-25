// Run after replacing a campaign's original image: node scripts/optimize-banners.cjs
// sharp is supplied by Next.js. Originals remain available for future edits.
const fs = require('node:fs');
const sharp = require('sharp');
const sources = ['conviteinemap.png', 'claude-opus55.png', 'oswork.png', 'jev.png', 'rsi.png', 'gestao-agentes-2027.png', 'ia-cultivada.png', 'claude-codex-agnostico.png', 'agi-chegou.png', 'content2video.png', 'webmcp2.png', 'capa-musicavideo-v2.jpg', 'vczero.png', 'inemaagenteshubv.jpg'];
(async () => {
  const rows = [];
  for (const lang of ['pt', 'en', 'es']) {
    for (const source of sources) {
      const input = `public/doc/${lang === 'pt' ? '' : lang + '/'}${source}`;
      const output = input.replace(/\.(png|jpg)$/, '.webp');
      await sharp(input).webp({ quality: 85, effort: 6 }).toFile(output);
      const before = fs.statSync(input).size, after = fs.statSync(output).size;
      if (after >= before) throw new Error(`No size saving: ${output}`);
      const a = await sharp(input).metadata(), b = await sharp(output).metadata();
      if (a.width !== b.width || a.height !== b.height) throw new Error(`Dimensions changed: ${output}`);
      rows.push({ lang, source, before, after });
    }
  }
  console.log(JSON.stringify(rows, null, 2));
})().catch(error => { console.error(error); process.exit(1); });
