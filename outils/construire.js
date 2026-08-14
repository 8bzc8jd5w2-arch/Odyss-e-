/* Assemble le jeu en un seul fichier autonome :
   node outils/construire.js
   → dist/odyssee.html           page complète, à double-cliquer ou à héberger
   → dist/odyssee.fragment.html  même contenu sans <html>/<head>/<body> */

const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..');
const lire = (p) => fs.readFileSync(path.join(racine, p), 'utf8');

const html = lire('index.html');
const css = lire('src/style.css');
const js = lire('src/histoire.js') + '\n' + lire('src/moteur.js');

const titre = (html.match(/<title>([\s\S]*?)<\/title>/) || [, 'L’Odyssée'])[1];
const corps = (html.match(/<body>([\s\S]*)<\/body>/) || [, ''])[1]
  .replace(/\s*<script src="[^"]*"><\/script>/g, '')
  .trim();

const tete = `<title>${titre}</title>
<style>
${css}
</style>`;

const fragment = `${tete}

${corps}

<script>
${js}
</script>
`;

const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${tete}
</head>
<body>
${corps}

<script>
${js}
</script>
</body>
</html>
`;

fs.mkdirSync(path.join(racine, 'dist'), { recursive: true });
fs.writeFileSync(path.join(racine, 'dist/odyssee.html'), page);
fs.writeFileSync(path.join(racine, 'dist/odyssee.fragment.html'), fragment);

const ko = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' ko';
console.log(`✓ dist/odyssee.html          ${ko(page)}`);
console.log(`✓ dist/odyssee.fragment.html ${ko(fragment)}`);
