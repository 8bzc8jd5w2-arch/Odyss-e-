/* Vérifie la cohérence du graphe narratif :
   node outils/verifier.js
   - toutes les destinations existent
   - toute scène est atteignable depuis le début
   - toute scène non finale a au moins un choix, toute fin n'en a aucun */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(racine, 'src/histoire.js'), 'utf8'), sandbox, { filename: 'histoire.js' });

const H = sandbox.window.HISTOIRE;
const DEBUT = sandbox.window.DEBUT;
const erreurs = [];
const ids = Object.keys(H);

/* état factice permettant d'évaluer si(), txt() et cible_conditionnelle() */
function etatTest(over) {
  return Object.assign({
    scene: DEBUT, vigueur: 5, ruse: 5, faveur: 1, equipage: 600, jours: 0,
    objets: [], drapeaux: {}, journal: [], vus: [], force_finale: 0
  }, over || {});
}

/* toutes les combinaisons de drapeaux utiles pour explorer les branches conditionnelles */
const variantes = [
  etatTest(),
  etatTest({ faveur: 8, vigueur: 10, ruse: 10, drapeaux: { colere_poseidon: true, conseils: true, moly: true, hommes_porcs: true, arc_tendu: true, rame: true, promesse: true } }),
  etatTest({ faveur: -8, vigueur: 0, ruse: 0, equipage: 0, drapeaux: { seul: true } }),
  etatTest({ force_finale: 30 }),
  etatTest({ force_finale: 15 })
];

const destinations = new Set([DEBUT]);

for (const id of ids) {
  const sc = H[id];
  if (!sc.titre) erreurs.push(`${id} : pas de titre`);
  if (typeof sc.txt !== 'function') erreurs.push(`${id} : txt doit être une fonction`);

  // le texte doit s'évaluer sans planter, dans toutes les variantes
  for (const s of variantes) {
    try { sc.txt(s); } catch (e) { erreurs.push(`${id} : txt() plante — ${e.message}`); break; }
  }
  if (sc.entree) {
    for (const s of variantes) {
      try { sc.entree(JSON.parse(JSON.stringify(s))); } catch (e) { erreurs.push(`${id} : entree() plante — ${e.message}`); break; }
    }
  }

  if (sc.fin) {
    if (sc.choix) erreurs.push(`${id} : une fin ne doit pas avoir de choix`);
    continue;
  }
  if (!Array.isArray(sc.choix) || !sc.choix.length) { erreurs.push(`${id} : aucun choix`); continue; }

  sc.choix.forEach((c, i) => {
    const ref = `${id} → choix ${i + 1}`;
    if (!c.t) erreurs.push(`${ref} : pas de libellé`);
    const cibles = [];
    if (c.va) cibles.push(c.va);
    if (c.test) {
      if (!c.test.reussite || !c.test.echec) erreurs.push(`${ref} : test incomplet`);
      else cibles.push(c.test.reussite.va, c.test.echec.va);
      if (typeof c.test.seuil !== 'number') erreurs.push(`${ref} : seuil non numérique`);
      if (!['ruse', 'vigueur'].includes(c.test.stat)) erreurs.push(`${ref} : stat inconnue « ${c.test.stat} »`);
    }
    if (c.cible_conditionnelle) {
      for (const s of variantes) {
        try { cibles.push(c.cible_conditionnelle(s)); }
        catch (e) { erreurs.push(`${ref} : cible_conditionnelle plante — ${e.message}`); }
      }
    }
    if (!cibles.length) erreurs.push(`${ref} : aucune destination`);
    if (c.si && !c.verrou) erreurs.push(`${ref} : condition sans texte de verrou`);
    cibles.forEach((t) => {
      if (!H[t]) erreurs.push(`${ref} : destination inconnue « ${t} »`);
      else destinations.add(t);
    });
  });
}

const orphelines = ids.filter((id) => !destinations.has(id));
orphelines.forEach((id) => erreurs.push(`${id} : scène inatteignable`));

const fins = ids.filter((id) => H[id].fin);

if (erreurs.length) {
  console.error('✗ ' + erreurs.length + ' problème(s) :');
  erreurs.forEach((e) => console.error('  · ' + e));
  process.exit(1);
}
console.log(`✓ graphe cohérent — ${ids.length} scènes, ${fins.length} fins, aucune orpheline.`);
