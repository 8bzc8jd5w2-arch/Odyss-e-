/* Vérifie la banque de questions du quiz Iqra’ :
   node outils/verifier-coran.js
   - chaque question a 4 réponses distinctes et une bonne réponse valide
   - niveau et thème connus, explication présente
   - pas de question en double
   - chaque niveau, et chaque thème, a de quoi remplir une partie */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const bac = { window: {}, console };
bac.window.window = bac.window;
vm.createContext(bac);
vm.runInContext(fs.readFileSync(path.join(racine, 'coran/src/questions.js'), 'utf8'), bac, { filename: 'questions.js' });

const Q = bac.window.QUESTIONS;
const THEMES = bac.window.THEMES;
const NIVEAUX = bac.window.NIVEAUX;
const LONGUEUR = 10;

const erreurs = [];
const alertes = [];
const vues = new Map();

Q.forEach((q, i) => {
  const ref = `question ${i + 1} (« ${String(q.q).slice(0, 45)}… »)`;

  if (!NIVEAUX[q.n]) erreurs.push(`${ref} : niveau inconnu « ${q.n} »`);
  if (!THEMES[q.t]) erreurs.push(`${ref} : thème inconnu « ${q.t} »`);
  if (!q.q || !q.q.trim()) erreurs.push(`${ref} : énoncé vide`);
  if (!q.info || !q.info.trim()) erreurs.push(`${ref} : pas d’explication`);

  if (!Array.isArray(q.r) || q.r.length !== 4) {
    erreurs.push(`${ref} : ${Array.isArray(q.r) ? q.r.length : 0} réponses au lieu de 4`);
  } else {
    const uniques = new Set(q.r.map((r) => r.trim().toLowerCase()));
    if (uniques.size !== 4) erreurs.push(`${ref} : deux réponses identiques`);
    q.r.forEach((r, j) => { if (!r || !r.trim()) erreurs.push(`${ref} : réponse ${j + 1} vide`); });
    if (typeof q.b !== 'number' || q.b < 0 || q.b >= q.r.length) erreurs.push(`${ref} : bonne réponse hors limites`);
  }

  const cle = String(q.q).trim().toLowerCase();
  if (vues.has(cle)) erreurs.push(`${ref} : déjà posée en position ${vues.get(cle) + 1}`);
  else vues.set(cle, i);

  if (q.info && q.r && q.info.trim() === String(q.r[q.b]).trim()) {
    alertes.push(`${ref} : l’explication ne fait que répéter la réponse`);
  }
});

/* de quoi remplir une partie ? */
Object.keys(NIVEAUX).forEach((n) => {
  const c = Q.filter((q) => q.n === Number(n)).length;
  if (c < LONGUEUR) erreurs.push(`niveau ${n} : ${c} questions, il en faut au moins ${LONGUEUR}`);
});
Object.keys(THEMES).forEach((t) => {
  const c = Q.filter((q) => q.t === t).length;
  if (c < LONGUEUR) alertes.push(`thème « ${THEMES[t].nom} » : ${c} questions — une partie sera complétée par d’autres niveaux`);
});

/* tableau récapitulatif : questions par niveau et par thème */
const cles = Object.keys(THEMES);
const col = (s) => String(s).padStart(10);
console.log('\n' + ' '.repeat(14) + cles.map(col).join('') + col('total'));
Object.keys(NIVEAUX).forEach((n) => {
  const par = cles.map((t) => Q.filter((q) => q.n === Number(n) && q.t === t).length);
  const total = Q.filter((q) => q.n === Number(n)).length;
  console.log(`niveau ${n} ${NIVEAUX[n].nom.slice(0, 4).padEnd(5)}` + par.map(col).join('') + col(total));
});
console.log(' '.repeat(14) + cles.map((t) => col(Q.filter((q) => q.t === t).length)).join('') + col(Q.length));

if (alertes.length) {
  console.log('\n! ' + alertes.length + ' remarque(s) :');
  alertes.forEach((a) => console.log('  · ' + a));
}
if (erreurs.length) {
  console.error('\n✗ ' + erreurs.length + ' problème(s) :');
  erreurs.forEach((e) => console.error('  · ' + e));
  process.exit(1);
}
console.log(`\n✓ banque cohérente — ${Q.length} questions, ${Object.keys(NIVEAUX).length} niveaux, ${Object.keys(THEMES).length} thèmes.`);
