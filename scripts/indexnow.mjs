#!/usr/bin/env node
// Envia as URLs dos sitemaps do portal ao IndexNow (Bing, Yandex, Seznam...).
// Uso: node scripts/indexnow.mjs            → todas as URLs dos sitemaps
//      node scripts/indexnow.mjs <url>...   → só as URLs passadas
//      --dry                                → lista sem enviar
// A chave é pública por design: fica servida em /<KEY>.txt (public/).
const HOST = 'www.inema.club'
const KEY = 'e64fc527b62b05dd4138d99659543fbc'
const SITEMAPS = [`https://${HOST}/sitemap.xml`, `https://${HOST}/courses-sitemap.xml`]

const args = process.argv.slice(2)
const dry = args.includes('--dry')
let urls = args.filter(a => a.startsWith('http'))

if (!urls.length) {
  for (const sm of SITEMAPS) {
    const res = await fetch(sm)
    if (!res.ok) { console.error(`sitemap ${sm}: HTTP ${res.status}`); continue }
    const xml = await res.text()
    urls.push(...[...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]))
  }
}
urls = [...new Set(urls)].filter(u => new URL(u).host === HOST)
console.log(`${urls.length} URLs de ${HOST}`)
if (dry) { urls.forEach(u => console.log(u)); process.exit(0) }

// IndexNow aceita até 10.000 URLs por POST.
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000)
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  })
  // 200 = aceito, 202 = aceito (chave ainda em validação), 403 = chave não encontrada no site
  console.log(`lote ${i / 10000 + 1}: HTTP ${res.status} ${res.status >= 300 ? await res.text() : ''}`)
}
