# Deux jeux, un même moteur maison

Deux jeux web en français, sans dépendance, sans build, sans réseau : on ouvre
le fichier `index.html` dans un navigateur et on joue. Chacun sépare ses données
(le récit, les questions) de son moteur, pour qu'on puisse en ajouter sans
toucher au code.

| Jeu | Ouvrir | Quoi |
|---|---|---|
| — | `index.html` | Page d'accueil qui présente les deux jeux |
| **L'Odyssée** | `odyssee/index.html` | Aventure textuelle à choix, 79 scènes, 9 fins |
| **Iqra'** | `coran/index.html` | Quiz sur le Coran pour les 10–16 ans, 125 questions |

```bash
node outils/verifier.js        # cohérence du récit de L'Odyssée
node outils/verifier-coran.js  # cohérence de la banque de questions
node outils/construire.js tout # dist/odyssee.html et dist/iqra.html, autonomes
```

---

# L'Odyssée

Jeu d'aventure textuel à choix, inspiré de l'*Odyssée* d'Homère et de son
adaptation au cinéma sortie cet été.

Vous êtes Ulysse, la nuit où Troie tombe. Ithaque est à dix jours de mer.
Ce sera dix ans.

**Trois valeurs, et elles s'opposent.** La *Vigueur* ouvre les portes par la
force, la *Ruse* les contourne, la *Faveur des dieux* décide de tout le reste —
elle monte quand vous respectez les suppliants, les morts et les serments, elle
s'effondre quand vous pillez un temple ou criez votre nom à un Cyclope aveuglé.
Une faveur basse retire 1 à chaque jet de dé et vous ferme les fins heureuses.

**Un équipage qui se compte.** Vous partez de Troie avec 608 hommes. Chaque
escale en prend. Le chiffre affiché à gauche est la seule chose que le jeu ne
vous pardonne jamais de perdre, et il n'y a aucun moyen de le faire remonter.

**Des jets de dés, pas des devinettes.** Un choix marqué `jet de ruse` ou
`jet de vigueur` se résout en d6 + statistique (± faveur) contre un seuil affiché
après coup. L'échec ne tue presque jamais : il coûte des hommes, des jours, ou
une option future.

**Les conséquences voyagent.** Crier son nom à Polyphème arme Poséidon pour le
reste de la partie. Écouter Circé jusqu'au bout est la seule façon de connaître
la cire des Sirènes et le bon côté du détroit. Épargner les bœufs du Soleil
ouvre une branche entière — rentrer à Ithaque *avec* son équipage — qui change
l'issue du massacre final.

### Ajouter une scène

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
l'état), `note` (ligne ajoutée au journal de bord). Une fin remplace `choix` par
`fin: 'lumineuse' | 'sombre' | 'ambigue' | 'douce'`.

`outils/verifier.js` évalue chaque `txt()`, `entree()` et `cible_conditionnelle()`
sous plusieurs états extrêmes, et refuse une scène orpheline ou une destination
inexistante. À lancer après toute modification du récit.

---

# Iqra'

Quiz sur le Coran pour les 10 à 16 ans. *Iqra'* — « Lis ! » — est le premier mot
révélé.

**Trois niveaux, six thèmes.** Découverte (10–12 ans), Explorateur (12–14),
Connaisseur (14–16) ; Le Livre, Les prophètes, Les récits, Les sourates, Les mots,
La pratique. On peut filtrer par thème ou tout mélanger. Une partie fait dix
questions, tirées au hasard, réponses mélangées à chaque fois.

**On apprend en se trompant.** Chaque réponse déclenche une explication — pas
seulement « faux », mais le verset, le nom, le chiffre exact. L'écran final
reprend les dix questions avec la bonne réponse et son explication, à relire
tranquillement.

**Une série qui récompense la régularité.** 10 points par bonne réponse, plus un
bonus qui monte avec la série en cours (jusqu'à +10). Six médailles jalonnent le
parcours, du premier « Premier pas » aux « Cent réponses », conservées d'une
session à l'autre.

**Contenu.** Les questions s'en tiennent à ce qui fait consensus et se vérifie :
structure du Coran (114 sourates, 30 juz', la plus longue, la plus courte),
histoire de la révélation, prophètes et récits coraniques, sens des noms de
sourates, vocabulaire (mushaf, tafsir, tajwid, qira'at, ۞ et ۩), et ce que le
Coran demande au quotidien — les parents, l'orphelin, la vérification d'une
nouvelle avant de la répandre. Les questions de divergence entre écoles juridiques
et les décomptes discutés ont été volontairement écartés.

### Ajouter une question

```js
{ n: 2,                    // niveau : 1, 2 ou 3
  t: 'sourates',           // thème : livre | prophetes | recits | sourates | mots | pratique
  q: 'Que veut dire « Al-Kahf » ?',
  r: ['La Caverne', 'La Montagne', 'Le Refuge', 'La Nuit'],
  b: 0,                    // index de la bonne réponse (les propositions sont mélangées au tirage)
  info: 'Elle doit son nom aux jeunes gens qui s’y réfugièrent pour protéger leur foi.' }
```

`outils/verifier-coran.js` vérifie que chaque question a quatre réponses
distinctes, une bonne réponse valide, un niveau et un thème connus, une
explication non vide, et qu'aucune question n'est posée deux fois. Il affiche
aussi la répartition par niveau et par thème, pour repérer les cases trop
maigres.

---

## Structure

```
index.html               page d'accueil : les deux jeux

odyssee/index.html       L'Odyssée — page de jeu
odyssee/src/histoire.js  le récit : scènes, choix, effets, conditions
odyssee/src/moteur.js    état, jets de dés, rendu, sauvegarde
odyssee/src/style.css    thème parchemin / nuit égéenne

coran/index.html         Iqra' — page de jeu
coran/src/questions.js   la banque de questions
coran/src/moteur.js      tirage, score, séries, médailles, progrès
coran/src/style.css      thème manuscrit : ivoire, lapis et or

outils/verifier.js       contrôle du graphe narratif
outils/verifier-coran.js contrôle de la banque de questions
outils/construire.js     assemblage en fichiers HTML autonomes

partage/affiche.html     affiche A4 à imprimer, avec les QR codes
partage/qr-*.svg / .png  QR codes vers l'accueil et vers chaque jeu
```

---

## Mettre les jeux en ligne

Les deux jeux sont des fichiers statiques : n'importe quel hébergement suffit.
Le plus direct est **GitHub Pages**, à activer dans *Settings → Pages* du dépôt
(source : branche `main`, dossier `/`). Les adresses deviennent alors :

```
https://8bzc8jd5w2-arch.github.io/Odyss-e-/           les deux jeux
https://8bzc8jd5w2-arch.github.io/Odyss-e-/odyssee/   L'Odyssée
https://8bzc8jd5w2-arch.github.io/Odyss-e-/coran/     Iqra'
```

Ce sont ces trois adresses que contiennent les QR codes de `partage/`, vérifiés
en les relisant après génération. Ils ne mèneront nulle part tant que Pages
n'est pas activé ; ils fonctionneront sans qu'il faille les regénérer une fois
que ce sera fait.

**Sans réseau**, `node outils/construire.js tout` produit `dist/odyssee.html` et
`dist/iqra.html` : un fichier chacun, tout compris, à copier sur les postes ou à
envoyer en pièce jointe.

**À savoir avant de diffuser :** la progression (parties, médailles, sauvegarde
de l'aventure) vit dans le navigateur de l'appareil, pas sur un serveur. Sur une
tablette partagée, tout le monde alimente le même compteur ; chaque jeu a un
bouton pour repartir de zéro. En navigation privée, rien n'est conservé et les
jeux fonctionnent quand même.

Les deux jeux se sauvegardent tout seuls dans le navigateur, s'adaptent au thème
clair ou sombre du système, se jouent au clavier (`1`–`9` dans L'Odyssée,
`1`–`4` puis `Entrée` dans Iqra') et respectent `prefers-reduced-motion`.
