const
bun_dle=async()=>await Bun.build({
	entrypoints:[...new Bun.Glob('./src/*.mjs').scanSync('.')],
	minify:true,
	outdir:'./dst',
	naming:"[dir]/[name].mjs",
	splitting:true
}),
html_tmpl=c=>x=>({...x,html:`\
<!DOCTYPE html>
<html lang="en"><head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>${c.title}</title>
	<meta name="description" content="${c.desc}">
	<link href="/src/style.css" rel="stylesheet">
${x.style.length?`\t<style>${x.style.join('\n')}\t</style>\n`:''}\
</head><body>
${x.html}\
</body></html>
`});
export{bun_dle,html_tmpl};
