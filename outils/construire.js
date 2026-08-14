/* Assemble un jeu en un seul fichier autonome :
   node outils/construire.js            → L'Odyssée
   node outils/construire.js coran      → Iqra'
   node outils/construire.js tout       → les deux

   Pour chaque jeu :
   → dist/<nom>.html           page complète, à double-cliquer ou à héberger
   → dist/<nom>.fragment.html  même contenu sans <html>/<head>/<body> */

const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..');

const JEUX = {
  odyssee: { source: '.',     sortie: 'odyssee' },
  coran:   { source: 'coran', sortie: 'iqra' }
};

function construire(cle) {
  const jeu = JEUX[cle];
  const dossier = path.join(racine, jeu.source);
  const lire = (p) => fs.readFileSync(path.join(dossier, p), 'utf8');

  const html = lire('index.html');
  const titre = (html.match(/<title>([\s\S]*?)<\/title>/) || [, cle])[1];

  // feuilles de style et scripts, dans l'ordre où la page les déclare
  const css = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]
    .map((m) => lire(m[1])).join('\n');
  const js = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]
    .map((m) => lire(m[1])).join('\n');

  const corps = (html.match(/<body>([\s\S]*)<\/body>/) || [, ''])[1]
    .replace(/\s*<script src="[^"]*"><\/script>/g, '')
    .trim();

  const tete = `<title>${titre}</title>\n<style>\n${css}\n</style>`;
  const fragment = `${tete}\n\n${corps}\n\n<script>\n${js}\n</script>\n`;
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
  fs.writeFileSync(path.join(racine, `dist/${jeu.sortie}.html`), page);
  fs.writeFileSync(path.join(racine, `dist/${jeu.sortie}.fragment.html`), fragment);

  const ko = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' ko';
  console.log(`✓ dist/${jeu.sortie}.html`.padEnd(28) + ko(page));
  console.log(`✓ dist/${jeu.sortie}.fragment.html`.padEnd(28) + ko(fragment));
}

const cible = process.argv[2] || 'odyssee';
if (cible === 'tout') Object.keys(JEUX).forEach(construire);
else if (JEUX[cible]) construire(cible);
else {
  console.error(`Jeu inconnu : « ${cible} ». Choix possibles : ${Object.keys(JEUX).join(', ')}, tout.`);
  process.exit(1);
}
