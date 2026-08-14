# L’Odyssée

Jeu d’aventure textuel à choix, en français, inspiré de l’*Odyssée* d’Homère et
de son adaptation au cinéma sortie cet été.

Vous êtes Ulysse, la nuit où Troie tombe. Ithaque est à dix jours de mer.
Ce sera dix ans.

**Jouer :** ouvrez `index.html` dans un navigateur. Rien à installer, aucune
dépendance, aucun réseau. La partie se sauvegarde toute seule dans le navigateur.

---

## Ce qui fait le jeu

**Trois valeurs, et elles s’opposent.** La *Vigueur* ouvre les portes par la
force, la *Ruse* les contourne, la *Faveur des dieux* décide de tout le reste —
elle monte quand vous respectez les suppliants, les morts et les serments, elle
s’effondre quand vous pillez un temple ou criez votre nom à un Cyclope aveuglé.
Une faveur basse retire 1 à chaque jet de dé et vous ferme les fins heureuses.

**Un équipage qui se compte.** Vous partez de Troie avec 608 hommes. Chaque
escale en prend. Le chiffre affiché à gauche est la seule chose que le jeu ne
vous pardonne jamais de perdre, et il n’y a aucun moyen de le faire remonter.

**Des jets de dés, pas des devinettes.** Un choix marqué `jet de ruse` ou
`jet de vigueur` se résout en d6 + statistique (± faveur) contre un seuil affiché
après coup. L’échec ne tue presque jamais : il coûte des hommes, des jours, ou
une option future.

**Les conséquences voyagent.** Crier son nom à Polyphème arme Poséidon pour le
reste de la partie. Écouter Circé jusqu’au bout est la seule façon de connaître
la cire des Sirènes et le bon côté du détroit. Épargner les bœufs du Soleil
ouvre une branche entière — rentrer à Ithaque *avec* son équipage — qui change
l’issue du massacre final.

**79 scènes, 9 fins.** De la fin lumineuse (la rame plantée en terre, très loin
de la mer) à celles qu’on ne raconte jamais : le lotus, le figuier de Charybde,
l’immortalité chez Calypso.

## Structure

```
index.html            page de jeu (ouvrir celle-ci)
src/histoire.js       le récit : scènes, choix, effets, conditions
src/moteur.js         moteur : état, jets de dés, rendu, sauvegarde
src/style.css         thème parchemin / nuit égéenne (clair et sombre)
outils/verifier.js    vérifie le graphe narratif
outils/construire.js  assemble tout en un fichier unique dans dist/
```

## Ajouter une scène

Le récit est une simple table d’objets. Une scène :

```js
sirenes: {
  chap: 9, lieu: 'L’île des Sirènes', titre: 'Le chant',
  txt: (s) => `Le vent tombe. La mer devient un miroir de métal…`,
  entree: (s) => { s.drapeaux.passe = true; },   // optionnel
  choix: [
    // choix simple
    { t: 'Cire aux oreilles, et te faire lier au mât',
      si: (s) => s.drapeaux.conseils,            // sinon le choix est verrouillé
      verrou: 'Tu ignores le remède.',           // raison affichée au joueur
      eff: { ruse: 2, faveur: 1, note: 'Tu as entendu le chant.' },
      va: 'sirenes_apres' },

    // choix résolu par un jet de dé
    { t: 'Ramer à l’aveugle',
      test: { stat: 'ruse', seuil: 8,
              reussite: { va: 'sirenes_apres', eff: { ruse: 1 } },
              echec:    { va: 'sirenes_apres', eff: { equipage: -3 } } } },

    // destination calculée à partir de l’état
    { t: 'Mettre le cap sur Ithaque',
      cible_conditionnelle: (s) => s.drapeaux.colere_poseidon ? 'poseidon_dernier' : 'retour_direct' }
  ]
}
```

Effets disponibles : `vigueur`, `ruse`, `faveur`, `equipage`, `jours` (nombres
relatifs), `objets` / `retire` (tableaux), `drapeaux` (objet fusionné dans
l’état), `note` (ligne ajoutée au journal de bord).

Une fin remplace `choix` par `fin: 'lumineuse' | 'sombre' | 'ambigue' | 'douce'`.

## Vérifier et construire

```bash
node outils/verifier.js     # destinations valides, scènes atteignables, textes qui s’évaluent
node outils/construire.js   # dist/odyssee.html — un seul fichier, ~90 ko
```

`verifier.js` évalue chaque `txt()`, `entree()` et `cible_conditionnelle()` sous
plusieurs états extrêmes, et refuse une scène orpheline ou une destination qui
n’existe pas. À lancer après toute modification du récit.

## Commandes clavier

`1`–`9` choisissent une option · `Échap` referme le carnet sur mobile.
