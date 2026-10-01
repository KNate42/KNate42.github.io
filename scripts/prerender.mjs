import { readFile, writeFile } from 'node:fs/promises'

const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))
const file = new URL('../dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('prerender: <!--app-html--> not found in dist/index.html')
await writeFile(file, html.replace('<!--app-html-->', () => render()))
console.log('prerender: dist/index.html is ready')
