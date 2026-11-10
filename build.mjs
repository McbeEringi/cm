#!/bin/env -S bun
import{codeToHtml}from 'shiki';

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
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CodeMirror</title>
<link href="/src/style.css" rel="stylesheet">
<link href="/src/shiki.css" rel="stylesheet">
</head><body>
<h1>CodeMirror</h1>
<ul>
${(await Promise.all(['index.mjs',...[...await new Bun.Glob('!(index).mjs').scanSync('./dst')].sort()].map(async x=>`<li><a href="./${x}">${x}</a>
${await codeToHtml(await Bun.file(`./src/${x}`).text(),{
  lang:'javascript',
	themes:{light:'one-light',dark:'one-dark-pro'},
	defaultColor:false,
})}
</li>`))).join('\n')}
</ul>
</body></html>
`)
await Bun.write('./dst/_headers',`\
/*
	Access-Control-Allow-Origin:*
`);
