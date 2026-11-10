#!/bin/env -S bun
await Bun.build({
	entrypoints:[...new Bun.Glob('./src/*.mjs').scanSync('.')],
	minify:true,
	outdir:'./dst',
	naming: "[dir]/[name].mjs"
});
// await Bun.write('./dst/_redirects',`\
// / /index.js 301
// `);
await Bun.write('./dst/index.html',`\
<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CodeMirror</title>
<link href="/src/style.css" rel="stylesheet">
</head><body>
<h1>CodeMirror</h1>
<ul>
${await new Bun.Glob('*.mjs').scanSync('./dst').reduce(async(a,x)=>`${await a}<li><a href="./${x}">${x}</a><pre>${await Bun.file(`./src/${x}`).text()}</pre></li>\n`,'')}
</ul>
</body></html>
`)
await Bun.write('./dst/_headers',`\
/*
	Access-Control-Allow-Origin:*
`);
