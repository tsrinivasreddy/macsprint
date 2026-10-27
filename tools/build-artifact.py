"""Builds dist/index.html for publishing as a claude.ai Artifact.

The Artifact host supplies its own <!doctype>/<html>/<head>/<body> skeleton,
so the published page is just: title, metas, stylesheet link, then body content.
styles.css and js/*.js are published alongside it unchanged.
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'index.html').read_text()

title = re.search(r'<title>.*?</title>', src, re.S).group(0)
desc = re.search(r'<meta name="description"[^>]*>', src).group(0)
body = re.search(r'<body>\n?(.*)</body>', src, re.S).group(1)

page = '\n'.join([
    title,
    '<meta name="claude:viewport-fit-sides" content="cover">',
    desc,
    '<link rel="stylesheet" href="styles.css">',
    body.rstrip(),
    '',
])
out = root / 'dist' / 'index.html'
out.parent.mkdir(exist_ok=True)
out.write_text(page)
print('wrote', out.relative_to(root))
