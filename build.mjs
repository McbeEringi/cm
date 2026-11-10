#!/bin/env -S bun

await Bun.build({
	entrypoints:[...new Bun.Glob('./src/*.mjs').scanSync('.')],
	minify:true,
	outdir:'./dst',
	naming:"[dir]/[name].mjs",
	splitting:true
});
await Bun.write('./dst/_redirects',`\
/src/:src https://6ca.me/src/:src 301
`);
await Bun.write('./dst/index.html',`\
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CodeMirror</title>
<meta name="description" content="code editor components">
<link href="/src/style.css" rel="stylesheet">
<link href="/src/shiki.css" rel="stylesheet">
</head><body>
<main>
<h1>CodeMirror</h1>
<a href="https://github.com/McbeEringi/cm">GitHub</a>
<ul>
${(await Promise.all(['index.mjs',...[...await new Bun.Glob('!(index).mjs').scanSync('./dst')].sort()].map(async x=>`<li>
	<a href="./${x}">${x}</a>
	<pre>${await Bun.file(`./src/${x}`).text()}</pre>
</li>`))).join('\n')}
</ul>
</main>
<script type="module">
import{EditorView,setup}from'./index.mjs';
import{javascript}from'./javascript.mjs';

document.querySelectorAll('pre').forEach(x=>x.replaceWith(new EditorView({doc:x.textContent,extensions:[setup,javascript()]}).dom))
</script>
</body></html>
`)
await Bun.write('./dst/_headers',`\
/*
	Access-Control-Allow-Origin:*
`);
