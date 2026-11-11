import{dirname,relative}from'node:path';

const
bun_dle=async()=>await Bun.build({
	entrypoints:[...new Bun.Glob('./src/*.mjs').scanSync('.')],
	minify:true,
	outdir:'./dst',
	naming:{
		entry:'[name].mjs',
		chunk:'chunk/[hash].mjs'
	},
	splitting:true
}),
html_tmpl=c=>x=>((
	o=Object.entries({
		cf:'https://cm.6ca.me/',
		gh:'https://mcbeeringi.github.io/cm/'
	}).reduce((a,[i,x])=>c.args.includes(i)?x:a,'')
)=>({...x,html:`\
<!DOCTYPE html>
<html prefix="og:http://ogp.me/ns#" lang="en"><head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>${c.title}</title>
	<meta name="description" content="${c.desc}">
	<link rel="icon" type="image/png" href="${relative(dirname(x.path),'img/favicon.png')}">
	<link rel="icon" type="image/svg+xml" href="${relative(dirname(x.path),'img/favicon.svg')}">
	<link rel="apple-touch-icon" href="${relative(dirname(x.path),'img/apple-touch-icon.png')}">
	<meta property="og:type" content="website">
	<meta property="og:title" content="${c.title}">
	<meta property="og:description" content="${c.desc}">
	<meta property="og:url" content="${new URL(x.path,o)}">
	<meta property="og:image" content="${new URL('img/apple-touch-icon.png',o)}">
	<link href="/src/style.css" rel="stylesheet">
${x.style.length?`\t<style>${x.style.join('\n')}\t</style>\n`:''}\
</head><body>
${x.html}\
</body></html>
`}))();
export{bun_dle,html_tmpl};
