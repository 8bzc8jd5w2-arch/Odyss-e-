/* L'Odyssée — le récit.
   Chaque scène : { chap, lieu, titre, txt(s), entree(s), choix[], fin }
   Chaque choix : { t, si(s), verrou, eff, va, test }
   Un test : { stat, seuil, reussite:{va,eff}, echec:{va,eff} } */

(function (global) {
  'use strict';

  const a = (s, o) => s.objets.includes(o);
  const d = (s, f) => !!s.drapeaux[f];

  const H = {

    /* ————————————————— CHANT I — La chute de Troie ————————————————— */

    prologue: {
      chap: 1, lieu: 'Troie', titre: 'Le ventre du cheval',
      txt: () => `Dix ans de guerre tiennent dans ce ventre de bois. Vous êtes vingt-deux, pliés dans le noir, l'odeur de résine et de sueur, à écouter les Troyens danser autour de leur trophée.

Quelqu'un frappe le flanc du cheval. Une voix de femme imite, une à une, les épouses restées au pays. Anticlos ouvre la bouche pour répondre à la sienne.`,
      choix: [
        { t: 'Lui plaquer la main sur la bouche et la tenir', test: { stat: 'ruse', seuil: 8,
            reussite: { va: 'troie_sac', eff: { ruse: 1, note: "Tu as étouffé le cri d'Anticlos dans le cheval." } },
            echec: { va: 'troie_sac', eff: { equipage: -12, faveur: -1, note: 'Un cri a filtré du cheval ; la sortie fut sanglante.' } } } },
        { t: 'Attendre le signal d’Athéna, quoi qu’il arrive', eff: { faveur: 2, vigueur: -1, note: 'Tu as remis ta patience aux mains d’Athéna.' }, va: 'troie_sac' },
        { t: 'Ouvrir la trappe le premier, tant pis pour la ruse', eff: { vigueur: 1, faveur: -1, equipage: -8 }, va: 'troie_sac' }
      ]
    },

    troie_sac: {
      chap: 1, lieu: 'Troie', titre: 'La ville en cendres',
      txt: () => `Au matin, Troie n'est plus qu'une géométrie de flammes. Les tiens remontent la rue des potiers, chargés d'or et d'ivresse. Sur les marches du temple d'Athéna, Ajax de Locride traîne une suppliante par les cheveux, arrachant la statue de son socle.

La déesse, dit-on, regarde. Les déesses regardent toujours.`,
      choix: [
        { t: 'Arracher la fille à Ajax, et rendre la statue au socle', eff: { faveur: 3, vigueur: -1, drapeaux: { pieux: true }, note: 'Tu as protégé une suppliante d’Athéna.' }, va: 'depart' },
        { t: 'Piller le trésor du temple — l’or nourrit les rameurs', eff: { faveur: -3, objets: ['or de Troie'], note: 'Tu as pris l’or du temple.' }, va: 'depart' },
        { t: 'Détourner le regard et presser l’embarquement', eff: { ruse: 1, faveur: -1 }, va: 'depart' }
      ]
    },

    depart: {
      chap: 1, lieu: 'Le rivage', titre: 'Douze navires',
      txt: (s) => `Douze coques noires, ${s.equipage} hommes, et derrière vous une fumée qui monte droit dans le ciel sans vent. Ithaque est à dix jours de mer.

Tu ne le sais pas encore : ce sera dix ans.`,
      choix: [
        { t: 'Sacrifier un taureau aux dieux avant de larguer', eff: { faveur: 2, jours: 1 }, va: 'ismaros' },
        { t: 'Partir sur l’heure, le vent n’attend pas', eff: { ruse: 1 }, va: 'ismaros' }
      ]
    },

    /* ————————————————— CHANT II — Les Cicones ————————————————— */

    ismaros: {
      chap: 2, lieu: 'Ismaros', titre: 'La cité des Cicones',
      txt: () => `Le vent vous jette sur la côte thrace. Ismaros dort, grasse, mal gardée. Tes hommes ont dix ans de faim dans les yeux et ils regardent la ville comme on regarde un fruit.

« Une seule journée, roi », souffle Euryloque.`,
      choix: [
        { t: 'Prendre la ville, puis rembarquer aussitôt', eff: { objets: ['vin de Maron'], drapeaux: { pillage: true } }, va: 'ismaros_suite' },
        { t: 'Épargner Maron, prêtre d’Apollon, et négocier des vivres', test: { stat: 'ruse', seuil: 9,
            reussite: { va: 'ismaros_suite', eff: { objets: ['vin de Maron'], faveur: 2, drapeaux: { maron: true }, note: 'Maron t’a offert douze amphores d’un vin noir et sacré.' } },
            echec: { va: 'ismaros_suite', eff: { jours: 2, drapeaux: { pillage: true }, objets: ['vin de Maron'] } } } },
        { t: 'Interdire le débarquement et remettre à la voile', eff: { faveur: 2, vigueur: -1, drapeaux: { discipline: true }, note: 'Tu as refusé le pillage d’Ismaros.' }, va: 'cap_malee' }
      ]
    },

    ismaros_suite: {
      chap: 2, lieu: 'Ismaros', titre: 'Un jour de trop',
      txt: () => `Ils boivent sur la plage. Ils égorgent les moutons sur la plage. Ils rient sur la plage — et pendant ce temps, les Cicones de l'intérieur descendent des collines, à cheval, nombreux comme des mouches sur du miel.

Neuf fois tu as crié l'ordre de rembarquer. Neuf fois ils ont ri.`,
      entree: (s) => { s.equipage -= 72; },
      choix: [
        { t: 'Tenir la ligne sur le sable pour couvrir les barques', test: { stat: 'vigueur', seuil: 9,
            reussite: { va: 'cap_malee', eff: { vigueur: 1, note: 'Tu as tenu le sable pendant l’embarquement.' } },
            echec: { va: 'cap_malee', eff: { equipage: -18, vigueur: -1 } } } },
        { t: 'Abandonner le butin et courir aux navires', eff: { retire: ['or de Troie'], ruse: 1 }, va: 'cap_malee' }
      ]
    },

    cap_malee: {
      chap: 2, lieu: 'Cap Malée', titre: 'Le souffle de Zeus',
      txt: (s) => `Au cap Malée, le ciel se referme comme une main. Borée arrache les voiles en lambeaux, la mer se dresse plus haut que les mâts. Neuf jours durant, vous êtes une plume.

${d(s, 'pillage') ? 'Les hommes murmurent que c’est le prix d’Ismaros.' : 'Les hommes murmurent que les dieux essaient quelque chose.'}`,
      choix: [
        { t: 'Jeter le butin à la mer en offrande', si: (s) => a(s, 'or de Troie') || a(s, 'vin de Maron'), verrou: 'Tu n’as rien qui vaille d’être offert.',
          eff: { retire: ['or de Troie'], faveur: 3, note: 'Tu as rendu l’or de Troie à la mer.' }, va: 'lotophages' },
        { t: 'Rester à la barre neuf jours et neuf nuits', test: { stat: 'vigueur', seuil: 8,
            reussite: { va: 'lotophages', eff: { vigueur: 1, jours: 9, note: 'Neuf jours à la barre sans dormir.' } },
            echec: { va: 'lotophages', eff: { vigueur: -1, equipage: -6, jours: 9 } } } },
        { t: 'Amener toute toile et prier, à la dérive', eff: { jours: 9, faveur: 1 }, va: 'lotophages' }
      ]
    },

    /* ————————————————— CHANT III — Les Lotophages ————————————————— */

    lotophages: {
      chap: 3, lieu: 'Terre des Lotophages', titre: 'Le fruit qui efface',
      txt: () => `Une côte basse, tiède, sans rochers. Des gens doux vous accueillent et vous tendent un fruit pâle. Les trois éclaireurs que tu envoies ne reviennent pas — non qu'on les retienne : ils ne veulent plus revenir.

Tu les trouves assis, souriants. L'un d'eux te regarde longtemps avant de demander : « Qui es-tu, déjà ? »`,
      choix: [
        { t: 'Les traîner aux navires et les enchaîner sous les bancs', eff: { vigueur: 1, faveur: -1, note: 'Tu as ramené de force les mangeurs de lotus.' }, va: 'cyclope_ile' },
        { t: 'Goûter le fruit, pour comprendre ce qui les tient', va: 'lotus_gout' },
        { t: 'Repartir sans eux, avant que le mal ne gagne', eff: { equipage: -3, ruse: 1 }, va: 'cyclope_ile' }
      ]
    },

    lotus_gout: {
      chap: 3, lieu: 'Terre des Lotophages', titre: 'Miel et cendre',
      txt: () => `Le goût est celui du miel qu'on aurait laissé au soleil. Aussitôt, une paix immense. Troie s'éloigne. Le sang, la mer, les morts — tout devient une histoire arrivée à un autre.

Et derrière, très loin, une petite lumière obstinée : une île de chèvres, une femme à son métier, un enfant qu'on n'a pas vu grandir. Il suffirait de fermer les yeux.`,
      choix: [
        { t: 'Fermer les yeux. Rester. Enfin se reposer.', va: 'fin_oubli' },
        { t: 'Se mordre la langue jusqu’au sang et hurler ton nom', eff: { vigueur: -1, ruse: 2, faveur: 1, note: 'Tu as recraché le lotus en criant ton propre nom.' }, va: 'cyclope_ile' }
      ]
    },

    /* ————————————————— CHANT IV — Le Cyclope ————————————————— */

    cyclope_ile: {
      chap: 4, lieu: 'Île des Cyclopes', titre: 'La grotte aux fromages',
      txt: () => `Une île sans champs, sans lois, sans navires — la terre y donne tout sans qu'on la prie. Sur la falaise, une grotte, des claies de fromages, des agneaux parqués par âge, des seaux de lait rangés.

Quelqu'un vit bien ici. Quelqu'un de très ordonné, et de très grand.`,
      choix: [
        { t: 'Prendre des fromages et rembarquer sur-le-champ', eff: { ruse: 1, drapeaux: { prudent: true }, note: 'Tu as quitté la grotte du Cyclope sans le voir.' }, va: 'eole' },
        { t: 'Attendre l’hôte : les étrangers ont des droits sacrés', eff: { drapeaux: { curiosite: true } }, va: 'cyclope_polypheme' },
        { t: 'Explorer la grotte à fond, en quête d’un présent d’hôte', eff: { objets: ['outre de vin fort'] }, va: 'cyclope_polypheme' }
      ]
    },

    cyclope_polypheme: {
      chap: 4, lieu: 'La grotte', titre: 'Polyphème',
      txt: () => `Il rentre au crépuscule avec son troupeau et referme l'entrée d'un rocher que vingt attelages ne bougeraient pas. Un œil unique, au milieu du front, se pose sur vous.

« Étrangers, qui êtes-vous ? »
Tu invoques Zeus, protecteur des hôtes. Il rit. Puis il saisit deux de tes hommes comme on prend deux chiots, et le bruit qui suit, tu l'entendras toute ta vie.`,
      entree: (s) => { s.equipage -= 2; },
      choix: [
        { t: 'Tirer l’épée et le frapper au foie pendant son sommeil', va: 'cyclope_erreur' },
        { t: 'Lui offrir le vin noir, et te présenter sous un faux nom', si: (s) => a(s, 'outre de vin fort') || a(s, 'vin de Maron'), verrou: 'Tu n’as pas de vin assez fort pour coucher un géant.', va: 'cyclope_vin' },
        { t: 'Attendre, observer, compter les moutons et les heures', eff: { ruse: 1, equipage: -2 }, va: 'cyclope_vin_sans' }
      ]
    },

    cyclope_erreur: {
      chap: 4, lieu: 'La grotte', titre: 'La pierre',
      txt: () => `Ta main est déjà sur la garde quand la pensée te retient : le rocher. Même mort, il vous scelle ici. Vous mourriez à côté de lui, lentement, de faim, dans le noir.

Ton bras tremble au-dessus de son foie. Il y a deux hommes en toi, et ils ne veulent pas la même chose.`,
      choix: [
        { t: 'Rengainer. C’est la décision la plus dure de ta vie, et personne ne la verra jamais.',
          eff: { ruse: 2, equipage: -2, note: 'Tu as renoncé à tuer Polyphème endormi.' }, va: 'cyclope_vin_sans' },
        { t: 'Frapper. Maintenant. Pour les deux qu’il a mangés.', va: 'fin_grotte' }
      ]
    },

    cyclope_vin_sans: {
      chap: 4, lieu: 'La grotte', titre: 'Sans vin',
      txt: () => `Il en prend deux au matin, deux au soir. Il vous reste peu de nuits pour trouver.

Au fond de la grotte, un tronc d'olivier vert, gros comme un mât, que le géant fait sécher pour s'en faire un bâton.`,
      choix: [
        { t: 'Tailler le pieu et l’aveugler à six, sans autre ruse', test: { stat: 'vigueur', seuil: 10,
            reussite: { va: 'cyclope_pieu', eff: { note: 'Vous avez aveuglé le Cyclope à la force des bras.' } },
            echec: { va: 'cyclope_pieu', eff: { equipage: -4, vigueur: -1 } } } },
        { t: 'Le griser au lait fermenté des seaux, et attendre son sommeil', test: { stat: 'ruse', seuil: 9,
            reussite: { va: 'cyclope_nom', eff: { ruse: 1 } },
            echec: { va: 'cyclope_pieu', eff: { equipage: -2 } } } }
      ]
    },

    cyclope_vin: {
      chap: 4, lieu: 'La grotte', titre: 'Le vin noir',
      txt: () => `Tu lui tends l'écuelle pleine. Il boit sans couper d'eau, comme on boit un fleuve. Il en redemande trois fois, et sa voix s'épaissit.

« Donne-moi ton nom, étranger, que je te fasse un présent d'hôte. »`,
      choix: [
        { t: 'Se nommer : Personne. Oûtis.', test: { stat: 'ruse', seuil: 7,
            reussite: { va: 'cyclope_nom', eff: { ruse: 2, note: 'Tu t’es nommé Personne devant Polyphème.' } },
            echec: { va: 'cyclope_pieu', eff: { equipage: -2 } } } },
        { t: 'Se nommer : Ulysse, fils de Laërte, preneur de villes', eff: { faveur: -2, drapeaux: { nom_donne: true }, note: 'Tu as donné ton vrai nom au Cyclope.' }, va: 'cyclope_pieu' }
      ]
    },

    cyclope_nom: {
      chap: 4, lieu: 'La grotte', titre: 'Le présent d’hôte',
      txt: () => `« Alors voici mon présent, Personne : je te mangerai le dernier. »

Il s'écroule en travers de la grotte, la nuque tordue, vomissant du vin et des morceaux d'hommes. Le tronc d'olivier attend, et le feu aussi.`,
      choix: [
        { t: 'Durcir le pieu au feu et le lui plonger dans l’œil', eff: { vigueur: 1 }, va: 'cyclope_pieu' }
      ]
    },

    cyclope_pieu: {
      chap: 4, lieu: 'La grotte', titre: 'L’œil',
      txt: () => `Le bois entre en sifflant, comme une hache trempée dans l'eau. Son hurlement fait sortir tous les Cyclopes de l'île.

« Qui te tue, Polyphème ? »
« PERSONNE ! Personne me tue ! »
Ils s'en retournent, haussant les épaules. Un dieu, sans doute. On n'y peut rien.

Au matin, il ôte le rocher et s'assied dans l'ouverture, les mains grandes ouvertes, tâtant le dos de chaque bête qui sort.`,
      choix: [
        { t: 'Lier les béliers par trois et passer sous leur ventre', eff: { ruse: 1 }, va: 'cyclope_large' },
        { t: 'Forcer le passage en masse, en profitant du troupeau', eff: { equipage: -4, vigueur: 1 }, va: 'cyclope_large' }
      ]
    },

    cyclope_large: {
      chap: 4, lieu: 'Au large', titre: 'Le cri',
      txt: () => `Les rames mordent l'eau. La falaise recule. Tu es vivant, tes hommes sont vivants, et tu es le plus intelligent des hommes — et cette pensée-là te brûle la poitrine comme un charbon.

Sur la falaise, l'aveugle tourne la tête, cherchant un bruit, un nom, quelque chose à maudire.`,
      choix: [
        { t: '« Cyclope ! Si l’on te demande qui t’a crevé l’œil : Ulysse, fils de Laërte, roi d’Ithaque ! »',
          eff: { faveur: -5, ruse: -1, drapeaux: { colere_poseidon: true }, note: 'Tu as crié ton nom au Cyclope. Poséidon t’a entendu.' }, va: 'cyclope_malediction' },
        { t: 'Serrer les dents et laisser ramer les hommes en silence',
          eff: { ruse: 2, faveur: 2, drapeaux: { silence: true }, note: 'Tu as quitté le Cyclope sans lui donner ton nom.' }, va: 'eole' }
      ]
    },

    cyclope_malediction: {
      chap: 4, lieu: 'Au large', titre: 'La prière du Cyclope',
      txt: () => `Il lève les bras vers la mer et parle à son père.

« Poséidon ! Fais qu'il n'atteigne jamais sa maison. Ou, s'il doit la revoir, qu'il y arrive tard et mal, sur un bateau étranger, ayant perdu tous les siens — et qu'il trouve le malheur dans sa propre maison. »

Il arrache le sommet d'une colline et le jette. La mer se creuse. Quelque chose, très en dessous, vient de se réveiller.`,
      choix: [
        { t: 'Ramer', va: 'eole' }
      ]
    },

    /* ————————————————— CHANT V — Éole ————————————————— */

    eole: {
      chap: 5, lieu: 'Île d’Éolie', titre: 'L’outre des vents',
      txt: () => `Une île flottante ceinte de bronze. Éole, gardien des vents, vous héberge un mois entier et écoute Troie jusqu'au dernier détail.

Au départ, il te remet une outre en peau de bœuf, cousue d'un fil d'argent : tous les vents contraires y sont enfermés. Seul Zéphyr reste dehors, pour vous pousser à la maison.`,
      entree: (s) => { s.objets.push('outre des vents'); s.jours += 30; },
      choix: [
        { t: 'Tenir la barre seul, neuf jours, sans fermer l’œil', test: { stat: 'vigueur', seuil: 10,
            reussite: { va: 'ithaque_en_vue', eff: { note: 'Tu as tenu la barre neuf jours sans dormir.' } },
            echec: { va: 'outre_ouverte', eff: { vigueur: -1 } } } },
        { t: 'Confier la barre à Euryloque et dormir enfin', va: 'outre_ouverte' },
        { t: 'Montrer l’outre à tout l’équipage et expliquer ce qu’elle contient', test: { stat: 'ruse', seuil: 9,
            reussite: { va: 'ithaque_en_vue', eff: { ruse: 1, note: 'Tu as dit la vérité sur l’outre — et l’on t’a cru.' } },
            echec: { va: 'outre_ouverte', eff: { faveur: -1 } } } }
      ]
    },

    outre_ouverte: {
      chap: 5, lieu: 'À dix milles d’Ithaque', titre: 'Ce que contient l’outre',
      txt: () => `Le dixième jour, on distingue les feux d'Ithaque. Les gardiens de chèvres. La fumée du palais.

Tu t'endors.

Ils ouvrent l'outre, bien sûr. Ils sont certains qu'elle est pleine d'or et que tu ne partages pas. Les vents sortent d'un seul coup, comme un cri, et vous rejettent à des semaines de là. Tu te réveilles avec ta patrie déjà derrière l'horizon.`,
      entree: (s) => { s.objets = s.objets.filter(o => o !== 'outre des vents'); s.jours += 10; s.drapeaux.outre_perdue = true; },
      choix: [
        { t: 'Envisager de se jeter à la mer', eff: { vigueur: -1, faveur: -1 }, va: 'eole_retour' },
        { t: 'Se couvrir le visage de ton manteau et continuer à vivre', eff: { ruse: 1, note: 'Tu t’es voilé la face et tu as tenu.' }, va: 'eole_retour' }
      ]
    },

    eole_retour: {
      chap: 5, lieu: 'Île d’Éolie', titre: 'La porte close',
      txt: () => `Vous revenez à l'île de bronze. Éole te regarde depuis sa terrasse, et son visage change.

« Va-t'en, le plus vil des vivants. Il m'est interdit d'aider un homme que les dieux haïssent. »

La porte se referme. Six jours de rames plus tard, une côte se lève : hautes falaises, un port trop calme, trop parfait.`,
      eff: { faveur: -1 },
      choix: [
        { t: 'Entrer dans le port avec toute la flotte', va: 'lestrygons_port' },
        { t: 'Mouiller ton navire dehors et n’envoyer que trois éclaireurs', eff: { ruse: 1, drapeaux: { dehors: true } }, va: 'lestrygons_port' }
      ]
    },

    ithaque_en_vue: {
      chap: 5, lieu: 'Au large d’Ithaque', titre: 'Les feux du pays',
      txt: () => `Le dixième jour, tes paupières brûlent mais tiennent. Les feux d'Ithaque apparaissent, si proches qu'on distingue les hommes qui les entretiennent.

Tu as gagné. Tu as ramené douze navires et tes hommes chez eux, et le monde s'apprête à raconter cette histoire-là.`,
      choix: [
        { t: 'Entrer au port', va: 'ithaque_en_vue_suite' }
      ]
    },

    ithaque_en_vue_suite: {
      chap: 5, lieu: 'Au large d’Ithaque', titre: 'Ce qui monte de la mer',
      txt: (s) => d(s, 'colere_poseidon')
        ? `Alors la mer se soulève sans un nuage au ciel. Une lame haute comme une tour prend la flotte par le travers et vous emporte vers le sud, loin, plus loin encore, jusqu'à ce que la terre ne soit plus qu'un souvenir.

Sous la coque, quelque chose de très ancien passe lentement. Tu as crié ton nom, une fois. Une seule fois suffit.`
        : `Le vent tombe d'un coup. Une brume monte, tiède, et quand elle se lève, l'île n'est plus là.

Athéna, dit-on, protège ceux qu'elle aime — mais elle les instruit d'abord. Il te reste des choses à apprendre, et l'on ne rentre pas chez soi tant qu'on ne les sait pas.`,
      choix: [
        { t: 'Reprendre la mer', eff: { jours: 6 }, va: 'lestrygons_port' }
      ]
    },

    /* ————————————————— CHANT VI — Les Lestrygons ————————————————— */

    lestrygons_port: {
      chap: 6, lieu: 'Télépyle', titre: 'Le port des Lestrygons',
      txt: (s) => `Un goulet étroit entre deux falaises, une eau lisse comme de l'huile. Une jeune fille immense puise de l'eau à la fontaine et vous indique aimablement la maison de son père.

Sa mère est haute comme un pic de montagne. Son père appelle. Et de partout, sur les falaises, des milliers d'hommes-montagnes se penchent, avec des rochers dans les mains.

${d(s, 'dehors') ? 'Ton navire, lui, est resté dehors, l’amarre défaite, prêt à fuir.' : 'Les douze navires sont dans le port, serrés comme des poissons dans une nasse.'}`,
      entree: (s) => {
        if (d(s, 'dehors')) { s.equipage = Math.min(s.equipage, 48); s.drapeaux.flotte_perdue = true; }
        else { s.equipage = Math.min(s.equipage, 44); s.drapeaux.flotte_perdue = true; }
      },
      choix: [
        { t: 'Trancher l’amarre à l’épée et hurler l’ordre de nager', test: { stat: 'ruse', seuil: 7,
            reussite: { va: 'lestrygons_apres', eff: { equipage: 6, ruse: 1, note: 'Tu as sauvé quelques nageurs du port de Télépyle.' } },
            echec: { va: 'lestrygons_apres', eff: { equipage: -4 } } } },
        { t: 'Retourner chercher les hommes des autres navires', test: { stat: 'vigueur', seuil: 11,
            reussite: { va: 'lestrygons_apres', eff: { equipage: 8, faveur: 2, vigueur: -1, note: 'Tu es retourné dans le port sous les rochers.' } },
            echec: { va: 'lestrygons_apres', eff: { vigueur: -2, equipage: -6 } } } },
        { t: 'Ramer sans regarder derrière', eff: { ruse: 1, faveur: -1 }, va: 'lestrygons_apres' }
      ]
    },

    lestrygons_apres: {
      chap: 6, lieu: 'Au large', titre: 'Un seul navire',
      txt: (s) => `Onze navires harponnés comme des thons. Il en reste un : le tien. ${s.equipage} hommes, et le silence qui suit ce genre de matin.

Personne ne chante aux rames. Quelques jours plus tard, une île boisée, une fumée droite au milieu des chênes.`,
      choix: [
        { t: 'Tirer au sort qui explorera', eff: { drapeaux: { euryloque: true } }, va: 'circe_ile' },
        { t: 'Y aller toi-même, seul', eff: { vigueur: -1, drapeaux: { seul_circe: true } }, va: 'circe_ile' }
      ]
    },

    /* ————————————————— CHANT VII — Circé ————————————————— */

    circe_ile: {
      chap: 7, lieu: 'Aiaié', titre: 'La maison au milieu des bois',
      txt: (s) => d(s, 'seul_circe')
        ? `Tu montes seul. Une maison de pierre polie dans une clairière ; des loups et des lions viennent te lécher les mains comme des chiens. Une voix de femme chante à l'intérieur, en tissant.`
        : `Euryloque emmène vingt-deux hommes. Il revient seul, muet, la bouche ouverte sans qu'aucun son ne sorte. Quand il parle enfin, il dit : « une femme, une coupe, et ils sont devenus des porcs — mais ils avaient encore leurs yeux d'hommes. »`,
      entree: (s) => { if (!d(s, 'seul_circe')) s.drapeaux.hommes_porcs = true; },
      choix: [
        { t: 'Monter à la maison, l’épée au côté', va: 'circe_hermes' },
        { t: 'Rembarquer et abandonner les hommes changés', si: (s) => d(s, 'hommes_porcs'), verrou: 'Il n’y a personne à abandonner.',
          eff: { faveur: -4, equipage: -22, drapeaux: { sans_conseils: true }, note: 'Tu as abandonné vingt-deux hommes chez Circé.' }, va: 'hades_seuil' }
      ]
    },

    circe_hermes: {
      chap: 7, lieu: 'Aiaié', titre: 'Le moly',
      txt: (s) => s.faveur >= 3
        ? `Sur le sentier, un jeune homme à la première barbe t'arrête. Sandales ailées, sourire oblique : Hermès.

« Tiens. » Il arrache une herbe à racine noire et à fleur de lait. « Le moly. Les dieux la nomment ainsi ; les mortels ne l'arrachent pas. Bois sa coupe sans crainte, puis tire l'épée — et fais-lui jurer le grand serment avant de la suivre au lit. »`
        : `Le sentier est vide. Pas d'aide, pas de dieu, pas de signe. Tu montes vers la maison avec pour seul outil ce que tu as toujours eu : la tête.`,
      entree: (s) => { if (s.faveur >= 3) { s.objets.push('moly'); s.drapeaux.moly = true; } },
      choix: [
        { t: 'Boire la coupe et tirer l’épée dès qu’elle lève sa baguette', si: (s) => d(s, 'moly'), verrou: 'Sans le moly, boire la coupe serait suicidaire.', va: 'circe_pacte' },
        { t: 'Refuser la coupe, et parler — seulement parler', test: { stat: 'ruse', seuil: 11,
            reussite: { va: 'circe_pacte', eff: { ruse: 2, note: 'Tu as désarmé Circé par la parole seule.' } },
            echec: { va: 'circe_echec', eff: {} } } },
        { t: 'Entrer l’épée déjà tirée et la menacer', test: { stat: 'vigueur', seuil: 12,
            reussite: { va: 'circe_pacte', eff: { vigueur: 1, faveur: -1 } },
            echec: { va: 'circe_echec', eff: {} } } }
      ]
    },

    circe_echec: {
      chap: 7, lieu: 'Aiaié', titre: 'La coupe',
      txt: () => `La baguette te touche l'épaule. Le sol se rapproche très vite. Tu as des soies sur le dos, quatre pieds, et un cœur d'homme qui bat dans une poitrine de bête.

Elle te pousse vers l'étable du bout du pied. Un an passe ainsi — un an que tu ne raconteras à personne. Puis, un matin, elle te regarde longuement, et te rend ta forme sans un mot. Peut-être par lassitude. Peut-être par pitié.`,
      entree: (s) => { s.jours += 365; s.vigueur -= 2; s.drapeaux.sans_conseils = true; },
      choix: [
        { t: 'Reprendre la mer sans un mot, sans un conseil', eff: { note: 'Tu as quitté Aiaié sans les conseils de Circé.' }, va: 'hades_seuil' }
      ]
    },

    circe_pacte: {
      chap: 7, lieu: 'Aiaié', titre: 'Le grand serment',
      txt: (s) => `La lame à sa gorge, elle ne tremble pas — elle sourit. « Tu es Ulysse. On me l'avait annoncé. Rengaine, et jurons. »

Elle jure par les dieux de ne te faire aucun mal. ${d(s, 'hommes_porcs') ? 'Elle passe entre les porcs, les enduit d’un onguent : les soies tombent, ils redeviennent des hommes, plus jeunes et plus beaux qu’avant, et ils pleurent tous.' : 'Elle fait dresser des tables, et pour la première fois depuis Troie, tu manges assis.'}

Vous restez un an. Un an entier, et personne ne compte les jours.`,
      entree: (s) => { s.jours += 365; s.vigueur = Math.min(10, s.vigueur + 2); },
      choix: [
        { t: 'Écouter jusqu’au bout tout ce qu’elle sait de la route', eff: { objets: ['conseils de Circé'], drapeaux: { conseils: true }, ruse: 1, note: 'Circé t’a décrit la route : Sirènes, Scylla, Charybde, et les bœufs du Soleil.' }, va: 'circe_route' },
        { t: 'Partir dès que les hommes le réclament, sans rien demander', eff: { drapeaux: { sans_conseils: true } }, va: 'hades_seuil' }
      ]
    },

    circe_route: {
      chap: 7, lieu: 'Aiaié', titre: 'La condition',
      txt: () => `« Tu ne rentreras pas d'ici, dit-elle. Il faut d'abord descendre chez les morts et interroger l'âme de Tirésias le Thébain — le seul là-bas qui ait gardé son esprit entier. »

Aucun vivant n'a jamais fait ce voyage-là de son plein gré.`,
      choix: [
        { t: 'Descendre chez les morts', va: 'hades_seuil' },
        { t: 'Refuser : tenter la route directe malgré tout', eff: { faveur: -2, drapeaux: { sans_tiresias: true }, note: 'Tu as refusé de descendre chez les morts.' }, va: 'sirenes' }
      ]
    },

    /* ————————————————— CHANT VIII — Les Enfers ————————————————— */

    hades_seuil: {
      chap: 8, lieu: 'Au bout de l’Océan', titre: 'Le pays des Kimmériens',
      txt: () => `Une terre où le soleil ne se lève jamais tout à fait : brume, peupliers stériles, deux fleuves qui se jettent dans un troisième. Tu creuses la fosse d'une coudée, tu verses le miel, le vin, l'eau, la farine, puis le sang noir des bêtes.

Ils montent. Des milliers. Jeunes filles, vieillards, guerriers aux armes encore souillées — et ce bruit, ce bruit terrible qu'ils font tous ensemble.`,
      choix: [
        { t: 'Épée nue au-dessus de la fosse : nul ne boit avant Tirésias', eff: { ruse: 1, vigueur: 1 }, va: 'hades_elpenor' },
        { t: 'Les laisser boire — ils ont tellement soif', eff: { faveur: 1, vigueur: -2, jours: 1 }, va: 'hades_elpenor' }
      ]
    },

    hades_elpenor: {
      chap: 8, lieu: 'Les Enfers', titre: 'Elpénor',
      txt: () => `Le premier qui s'avance est le plus jeune de tes hommes. Il s'était endormi ivre sur le toit de Circé et s'était rompu le cou en descendant. Vous êtes partis sans le voir. Vous êtes partis sans l'enterrer.

« Ne me laisse pas sans larmes et sans tombe, roi. Brûle-moi avec mes armes, et plante ma rame sur le tertre. »`,
      choix: [
        { t: 'Le jurer, et tenir', eff: { faveur: 2, drapeaux: { promesse: true }, note: 'Tu as juré à Elpénor une tombe et une rame plantée.' }, va: 'hades_tiresias' },
        { t: 'Détourner les yeux : les vivants d’abord', eff: { faveur: -2 }, va: 'hades_tiresias' }
      ]
    },

    hades_tiresias: {
      chap: 8, lieu: 'Les Enfers', titre: 'Tirésias',
      txt: (s) => `Le devin boit le sang noir et te reconnaît.

« Tu cherches un retour doux comme du miel : un dieu te le rendra amer. ${d(s, 'colere_poseidon') ? 'Poséidon ne te pardonne pas l’œil de son fils.' : 'La mer se souvient de tout, même quand on se tait.'}

Écoute bien. Vous toucherez l'île de Thrinakié, où paissent les bœufs du Soleil. Laisse-les. Si tu les laisses, vous rentrerez tous, mal, mais tous. Si vous y touchez : ton navire périra, tes hommes périront, et toi, tu rentreras tard, seul, sur un bateau étranger — pour trouver le malheur dans ta maison. »`,
      entree: (s) => { s.drapeaux.averti = true; },
      choix: [
        { t: '« Et après ? Après Ithaque ? »', eff: { objets: ['prophétie de la rame'], drapeaux: { rame: true }, note: 'Tirésias t’a parlé du voyage d’après : la rame prise pour une pelle à grain.' }, va: 'hades_anticlee' },
        { t: 'Le laisser redescendre : tu en sais déjà trop', va: 'hades_anticlee' }
      ]
    },

    hades_anticlee: {
      chap: 8, lieu: 'Les Enfers', titre: 'Anticlée',
      txt: () => `Une femme attend derrière lui. Elle était vivante quand tu es parti.

« Ce n'est pas la maladie qui m'a prise, mon enfant. C'est le regret de toi. »

Elle te dit qu'à Ithaque, Pénélope pleure toutes ses nuits, que Télémaque administre encore les domaines, que Laërte dort dans la cendre du verger.

Trois fois tu tends les bras. Trois fois elle passe à travers comme une ombre ou un songe.`,
      choix: [
        { t: 'L’étreindre encore, une quatrième fois', eff: { vigueur: -1, faveur: 1, drapeaux: { deuil: true } }, va: 'hades_achille' },
        { t: 'Lui demander tout ce qu’elle sait d’Ithaque', eff: { ruse: 1, drapeaux: { espoir: true }, note: 'Tu sais que Pénélope t’attend encore.' }, va: 'hades_achille' }
      ]
    },

    hades_achille: {
      chap: 8, lieu: 'Les Enfers', titre: 'Achille',
      txt: () => `Le meilleur des Achéens s'avance, et tu lui dis ce que tout le monde dit : qu'il règne sur les morts, qu'il est honoré comme un dieu, qu'il n'a pas à se plaindre.

« Ne me console pas de la mort, Ulysse. J'aimerais mieux être valet de ferme chez un pauvre sans terre, et vivant, que roi de tous ces morts. »

Derrière lui, Ajax refuse de te parler et s'en va dans le noir, et tu comprends qu'il y a des choses qu'on ne répare pas.`,
      choix: [
        { t: 'Remonter vers la lumière', eff: { faveur: 1, note: 'Tu es revenu vivant du pays des morts.' }, va: 'circe_adieu' }
      ]
    },

    circe_adieu: {
      chap: 8, lieu: 'Aiaié', titre: 'La tombe d’Elpénor',
      txt: (s) => d(s, 'promesse')
        ? `Vous revenez brûler Elpénor sur un bûcher haut, avec ses armes, et vous plantez sa rame droite sur le tertre, face à la mer. Circé vous attend avec du pain et du vin, et rit de vous voir « deux fois morts ».`
        : `Circé vous attend sur la plage. Elle regarde le navire, compte les hommes, et ne dit rien du jeune homme dont personne n'a rapporté les cendres.`,
      choix: [
        { t: 'Écouter ses derniers avertissements', si: (s) => d(s, 'conseils'), verrou: 'Elle ne te doit plus rien.',
          eff: { drapeaux: { cire: true }, note: 'Circé t’a expliqué la cire, le mât, et les deux gouffres.' }, va: 'sirenes' },
        { t: 'Larguer les amarres', va: 'sirenes' }
      ]
    },

    /* ————————————————— CHANT IX — Les Sirènes ————————————————— */

    sirenes: {
      chap: 9, lieu: 'L’île des Sirènes', titre: 'Le chant',
      txt: (s) => `Le vent tombe. La mer devient un miroir de métal. Sur l'île basse, entre les ossements blanchis, elles vous attendent en riant doucement.

${d(s, 'cire') ? 'Circé a été précise : de la cire dans les oreilles des rameurs, et si tu veux entendre — car tu voudras entendre — fais-toi lier au mât, et ordonne qu’on serre les liens si tu supplies.' : 'Personne ne t’a dit comment on passe ici. Tu as ce que tu as : ta tête, et des hommes qui ont déjà trop perdu.'}`,
      choix: [
        { t: 'Cire aux oreilles des hommes, et te faire lier au mât', si: (s) => d(s, 'cire'), verrou: 'Tu ignores le remède.',
          eff: { ruse: 2, faveur: 1, drapeaux: { entendu: true }, note: 'Tu as entendu le chant des Sirènes, lié au mât.' }, va: 'sirenes_apres' },
        { t: 'Boucher les oreilles de tous, toi compris, et ramer aveuglément', test: { stat: 'ruse', seuil: 8,
            reussite: { va: 'sirenes_apres', eff: { ruse: 1 } },
            echec: { va: 'sirenes_apres', eff: { equipage: -3, jours: 2 } } } },
        { t: 'Écouter, libre, debout à la proue', va: 'fin_sirenes' }
      ]
    },

    sirenes_apres: {
      chap: 9, lieu: 'Passé les Sirènes', titre: 'Ce qu’elles savaient',
      txt: (s) => d(s, 'entendu')
        ? `Elles chantaient ton nom. Elles chantaient Troie mieux que tu ne la revois toi-même, et elles promettaient de te dire tout ce qui se passe sur la terre nourricière — le sort de ta femme, ce qu'est devenu ton fils.

Tu as hurlé qu'on te détache. Périmède et Euryloque ont serré les liens, comme tu l'avais ordonné toi-même. Tu ne leur as pas pardonné avant le soir.`
        : `Vous passez sans rien entendre, la mer plate, les visages tournés vers l'avant. Peut-être n'y avait-il rien à entendre. Personne, à bord, n'osera jamais poser la question.`,
      choix: [
        { t: 'Devant : deux rochers, et un bruit d’eau qu’on avale', va: 'scylla' }
      ]
    },

    /* ————————————————— CHANT X — Scylla et Charybde ————————————————— */

    scylla: {
      chap: 10, lieu: 'Le détroit', titre: 'Deux gouffres',
      txt: (s) => `À bâbord, une falaise lisse, une caverne haute dans la brume : là vit Scylla, six cous, six gueules, et une voix de chiot qui vous appelle. À tribord, un figuier sauvage au-dessus d'un tourbillon qui vomit et ravale la mer trois fois par jour : Charybde.

${d(s, 'conseils') ? 'Circé a été formelle : passe du côté de Scylla. Six hommes valent mieux qu’un navire. Et surtout — surtout — ne t’arme pas contre elle.' : 'Personne ne t’a dit quel côté prendre. Les deux côtés sentent la mort.'}`,
      choix: [
        { t: 'Serrer la falaise de Scylla et ramer de toutes ses forces',
          eff: { equipage: -6, note: 'Scylla a pris six hommes. Tu les as vus, en l’air, t’appeler par ton nom.' }, va: 'scylla_apres' },
        { t: 'Passer du côté de Charybde, entre deux respirations du gouffre', test: { stat: 'ruse', seuil: 12,
            reussite: { va: 'scylla_apres', eff: { ruse: 2, faveur: 1, note: 'Tu as franchi Charybde sans perdre un seul homme.' } },
            echec: { va: 'fin_charybde', eff: {} } } },
        { t: 'Prendre l’armure et deux lances, et attendre Scylla de pied ferme',
          eff: { equipage: -6, vigueur: 1, faveur: -2, note: 'Tu t’es armé contre Scylla — contre l’avis de Circé.' }, va: 'scylla_apres' }
      ]
    },

    scylla_apres: {
      chap: 10, lieu: 'Passé le détroit', titre: 'Le pire spectacle',
      txt: (s) => `${s.equipage} hommes. Le navire tient. Personne ne parle jusqu'au soir.

Puis, dans la nuit, un bruit tendre monte de la mer : des mugissements, des bêlements. Une île basse, des prairies grasses, sept troupeaux de cinquante bœufs qui ne vieillissent pas et ne se reproduisent pas.

Thrinakié. Les bœufs du Soleil.`,
      choix: [
        { t: 'Ordonner de passer au large sans toucher terre', va: 'thrinakie_ordre' },
        { t: 'Accoster : les hommes sont à bout', eff: { drapeaux: { accoste: true } }, va: 'thrinakie_serment' }
      ]
    },

    /* ————————————————— CHANT XI — Les bœufs du Soleil ————————————————— */

    thrinakie_ordre: {
      chap: 11, lieu: 'Thrinakié', titre: 'La mutinerie douce',
      txt: (s) => `Euryloque se dresse devant les rameurs. « Tu es de fer, Ulysse. Nous ne le sommes pas. Une nuit à terre, du pain chaud, et nous repartons à l'aube. »

${d(s, 'averti') ? 'Tu leur dis ce que Tirésias a dit. Mot pour mot. Ils écoutent — et ils regardent la terre.' : 'Tu n’as rien à leur opposer qu’un mauvais pressentiment.'}`,
      choix: [
        { t: 'Imposer ta volonté, quitte à sortir l’épée devant tes propres hommes', test: { stat: 'vigueur', seuil: 11,
            reussite: { va: 'thrinakie_evite', eff: { vigueur: 1, drapeaux: { evite: true }, note: 'Tu as forcé l’équipage à passer au large de Thrinakié.' } },
            echec: { va: 'thrinakie_serment', eff: { faveur: -1, drapeaux: { accoste: true } } } } },
        { t: 'Les convaincre : leur promettre Ithaque, jour par jour, mille par mille', test: { stat: 'ruse', seuil: 11,
            reussite: { va: 'thrinakie_evite', eff: { ruse: 1, faveur: 1, drapeaux: { evite: true }, note: 'Tu as convaincu l’équipage d’éviter l’île du Soleil.' } },
            echec: { va: 'thrinakie_serment', eff: { drapeaux: { accoste: true } } } } },
        { t: 'Céder — mais leur faire jurer de ne toucher à aucune bête', eff: { drapeaux: { accoste: true } }, va: 'thrinakie_serment' }
      ]
    },

    thrinakie_serment: {
      chap: 11, lieu: 'Thrinakié', titre: 'Le serment et la faim',
      txt: () => `Ils jurent tous, la main sur le sable, de ne toucher ni bœuf ni brebis du Soleil.

Puis le vent tourne. Notus souffle du sud, sans discontinuer, pendant un mois. Les provisions de Circé s'épuisent. On pêche à l'hameçon tordu, on prend des oiseaux, on a faim, et la faim est un dieu très patient.`,
      entree: (s) => { s.jours += 30; s.vigueur = Math.max(0, s.vigueur - 1); },
      choix: [
        { t: 'Monter seul prier les dieux à l’intérieur des terres', va: 'thrinakie_sommeil' },
        { t: 'Rester au camp, ne pas fermer l’œil, surveiller les troupeaux', test: { stat: 'vigueur', seuil: 12,
            reussite: { va: 'thrinakie_tenu', eff: { vigueur: -1, faveur: 2, drapeaux: { evite: true }, note: 'Tu as veillé sur les bœufs du Soleil jusqu’au retour du vent.' } },
            echec: { va: 'thrinakie_sommeil', eff: {} } } }
      ]
    },

    thrinakie_sommeil: {
      chap: 11, lieu: 'Thrinakié', titre: 'Ce qu’ils ont fait pendant ton sommeil',
      txt: () => `Les dieux versent le sommeil sur tes paupières — cela s'appelle un sommeil, mais c'est une décision prise ailleurs.

Euryloque parle bien. « Toutes les morts sont odieuses, mais mourir de faim est la pire. Mangeons. Et si le Soleil se fâche, je préfère mourir d'un coup en mer que sécher lentement sur ce rocher. »

Tu te réveilles à l'odeur de la graisse brûlée. Les peaux rampent sur le sol. Les broches meuglent.`,
      entree: (s) => { s.drapeaux.boeufs_tues = true; s.faveur -= 4; },
      choix: [
        { t: 'Hurler contre le ciel, puis rembarquer sans rien manger', eff: { faveur: 2, note: 'Tu n’as pas touché aux bœufs du Soleil.' }, va: 'foudre' },
        { t: 'Manger avec eux — un roi partage le sort de ses hommes', eff: { vigueur: 1, faveur: -2 }, va: 'foudre' }
      ]
    },

    foudre: {
      chap: 11, lieu: 'En mer', titre: 'La foudre',
      txt: () => `Six jours de festin, puis le vent tombe et le navire sort du détroit. Une nuée noire s'installe au-dessus du mât, et rien qu'au-dessus du mât.

Zeus frappe. Le navire tourne comme une feuille, le mât brise le crâne du pilote, le soufre remplit la coque. Ils flottent un instant autour de l'épave, noirs comme des corneilles.

Tu lies le mât à la quille avec un cordage de cuir de bœuf, et tu t'assieds dessus.`,
      entree: (s) => { s.equipage = 0; s.drapeaux.seul = true; },
      choix: [
        { t: 'Dériver', va: 'charybde_retour' }
      ]
    },

    charybde_retour: {
      chap: 11, lieu: 'Le détroit', titre: 'Le figuier',
      txt: () => `Le courant te ramène droit sur Charybde, à l'heure où elle avale. Ton radeau disparaît dans le gouffre.

Tu sautes et t'accroches au figuier sauvage au-dessus du vide, suspendu comme une chauve-souris, sans pouvoir monter ni descendre, à attendre — des heures — qu'elle recrache le mât.

Elle le recrache. Tu te laisses tomber dessus.`,
      choix: [
        { t: 'Neuf jours de dérive', eff: { vigueur: -2, ruse: 1, jours: 9 }, va: 'ogygie' }
      ]
    },

    thrinakie_tenu: {
      chap: 11, lieu: 'Thrinakié', titre: 'Le vent revient',
      txt: () => `Trente et un jours. Tu n'as pas dormi plus de deux heures d'affilée, tu as mangé des racines et des coquillages, et tu as tenu tes hommes à distance des troupeaux avec ta seule voix.

Au matin du trente-deuxième, le vent tourne. Le Soleil, là-haut, compte ses bêtes : il n'en manque aucune.`,
      choix: [
        { t: 'Rembarquer', va: 'thrinakie_evite' }
      ]
    },

    thrinakie_evite: {
      chap: 11, lieu: 'En mer', titre: 'La route libre',
      txt: (s) => `Pour la première fois depuis Troie, la mer est simplement de la mer. Le navire tient, ${s.equipage} hommes tiennent les rames, et à l'est, très loin, il y a une île de chèvres et de rochers.

Tirésias avait dit : *si tu les laisses, vous rentrerez tous, mal, mais tous.*`,
      choix: [
        { t: 'Mettre le cap sur Ithaque',
          eff: { note: 'Tu as épargné les bœufs du Soleil.' },
          cible_conditionnelle: (s) => d(s, 'colere_poseidon') ? 'poseidon_dernier' : 'retour_direct' }
      ]
    },

    poseidon_dernier: {
      chap: 11, lieu: 'En mer', titre: 'Ce qui n’oublie pas',
      txt: () => `Vous êtes à trois jours d'Ithaque quand la mer se creuse sans raison. Pas de nuage, pas de vent : juste une houle qui vient d'en bas.

Le navire se disloque en silence, comme s'il avait été démonté par des mains patientes. Tes hommes disparaissent en quelques minutes, sans un cri, aspirés vers le fond.

Tu restes. Toi seul, on te laisse. C'est cela, la malédiction : on ne te tue pas.`,
      entree: (s) => { s.equipage = 0; s.drapeaux.seul = true; },
      choix: [
        { t: 'Neuf jours de dérive', eff: { vigueur: -2, jours: 9 }, va: 'ogygie' }
      ]
    },

    retour_direct: {
      chap: 12, lieu: 'En mer', titre: 'Un vent d’Ithaque',
      txt: () => `Rien ne vient. Ni gouffre, ni foudre, ni dieu en colère. Vous naviguez huit jours pleins, et le neuvième, l'odeur change : thym, chèvre, fumée de bois d'olivier.

Tes hommes pleurent aux rames. Toi, tu regardes le rivage et tu penses à ce qui t'attend derrière : vingt ans, une femme, un fils, et une maison pleine d'inconnus.`,
      entree: (s) => { s.drapeaux.equipage_sauve = true; s.faveur += 2; },
      choix: [
        { t: 'Débarquer avec tes hommes', eff: { note: 'Tu es rentré à Ithaque avec ton équipage.' }, va: 'ithaque_rivage' }
      ]
    },

    /* ————————————————— CHANT XII — Calypso ————————————————— */

    ogygie: {
      chap: 12, lieu: 'Ogygie', titre: 'Le nombril de la mer',
      txt: () => `Une île au milieu de rien. Des aulnes, des peupliers, quatre sources qui courent en sens contraires, une vigne chargée, et une grotte où brûle du cèdre fendu.

Calypso te ramasse sur le sable comme on ramasse un oiseau tombé. Elle te soigne, te nourrit, t'aime — et ne te laisse pas partir.

Sept ans. Le jour, tu t'assieds sur les rochers, tourné vers l'est, et tu pleures ; la nuit, tu dors dans le fond de la grotte, contre son gré à toi, et de gré à elle.`,
      entree: (s) => { s.jours += 2555; s.vigueur = Math.min(10, s.vigueur + 1); },
      choix: [
        { t: '« Reste, et je te fais immortel, et jamais tu ne vieilliras. »', va: 'calypso_offre' },
        { t: 'Continuer à pleurer vers l’est, chaque jour, sans céder', eff: { faveur: 2, drapeaux: { fidele: true }, note: 'Sept ans à refuser l’immortalité.' }, va: 'calypso_depart' }
      ]
    },

    calypso_offre: {
      chap: 12, lieu: 'Ogygie', titre: 'L’immortalité',
      txt: () => `« Regarde-moi bien, dit-elle. Compare. Une mortelle vieillit, et son visage se défait, et un jour elle meurt et te laisse. Moi, jamais. »

Elle a raison. C'est le pire : elle a entièrement raison. Une déesse, une île sans hiver, la fin de la peur.

Et pourtant il y a cette maison de pierre, cette femme qui doit avoir des cheveux gris maintenant, et ce garçon qui avait un an.`,
      choix: [
        { t: 'Accepter. Personne ne t’attend plus, après tout ce temps.', va: 'fin_calypso' },
        { t: '« Je le sais, déesse. Et pourtant je veux rentrer, et voir le jour du retour. »',
          eff: { faveur: 3, ruse: 1, drapeaux: { fidele: true }, note: 'Tu as refusé l’immortalité en face.' }, va: 'calypso_depart' }
      ]
    },

    calypso_depart: {
      chap: 12, lieu: 'Ogygie', titre: 'Le radeau',
      txt: () => `Un matin, elle vient d'elle-même, le visage fermé. Hermès est passé : les dieux ont tranché, en conseil, sans toi.

« Va-t'en donc, puisqu'il le faut. »

Elle te donne une hache de bronze à double tranchant, une doloire polie, des vrilles, de la toile pour les voiles. Vingt arbres tombent. Le cinquième jour, le radeau est fini — et il est bien fait, car tu as toujours été bon de tes mains.`,
      choix: [
        { t: 'Partir en gardant les Pléiades à gauche, comme elle l’a dit', eff: { jours: 18, ruse: 1 }, va: 'tempete_poseidon' }
      ]
    },

    tempete_poseidon: {
      chap: 12, lieu: 'En mer', titre: 'Le dieu revient d’Éthiopie',
      txt: (s) => `Dix-sept jours de mer calme. Le dix-huitième, la terre des Phéaciens apparaît comme un bouclier posé sur la brume.

C'est ce moment-là que Poséidon choisit pour rentrer d'Éthiopie et te voir. ${d(s, 'colere_poseidon') ? '« Le voilà. »' : '« Encore lui. »'} Il rassemble les nuées d'un coup de trident, et quatre vents se jettent sur ton radeau à la fois.

Une lame te chasse par-dessus bord. Tu remontes, tu t'accroches. Alors une femme sort de l'eau : Ino Leucothée, une mortelle devenue déesse. Elle te tend un voile.

« Quitte le radeau. Noue ce voile sous ta poitrine et nage. Et une fois à terre, rejette-le à la mer sans regarder derrière toi. »`,
      choix: [
        { t: 'Se méfier d’un dieu de plus : rester lié au radeau tant qu’il tient', test: { stat: 'ruse', seuil: 10,
            reussite: { va: 'pheaciens_rivage', eff: { ruse: 2, vigueur: -2, jours: 2, note: 'Tu es resté sur le radeau jusqu’au bout — et tu avais raison.' } },
            echec: { va: 'pheaciens_rivage', eff: { vigueur: -3, jours: 3 } } } },
        { t: 'Nouer le voile d’Ino et se jeter à l’eau', eff: { faveur: 2, vigueur: -2, jours: 2, drapeaux: { ino: true }, note: 'Le voile d’Ino t’a porté deux jours et deux nuits.' }, va: 'pheaciens_rivage' }
      ]
    },

    /* ————————————————— CHANT XIII — Les Phéaciens ————————————————— */

    pheaciens_rivage: {
      chap: 13, lieu: 'Schérie', titre: 'Nausicaa',
      txt: () => `Tu t'échoues à l'embouchure d'un fleuve, nu, écorché, la peau gonflée de sel, et tu t'endors sous deux oliviers, enfoui dans les feuilles mortes comme un tison qu'on conserve.

Des voix de jeunes filles te réveillent : elles lavent le linge et jouent à la balle. Toutes s'enfuient, sauf une — la fille du roi, qui reste plantée là et te regarde.

Tu es nu. Tu es effrayant. Et tu as, comme toujours, exactement une chose à jouer : les mots.`,
      choix: [
        { t: 'Rester à distance, une branche à la main, et la supplier de loin comme une déesse',
          eff: { ruse: 2, faveur: 1, drapeaux: { nausicaa: true }, note: 'Nausicaa t’a donné des vêtements et le chemin du palais.' }, va: 'pheaciens_palais' },
        { t: 'Se jeter à ses genoux et les saisir, comme le veut la coutume', eff: { faveur: -1, vigueur: 1 }, va: 'pheaciens_palais' }
      ]
    },

    pheaciens_palais: {
      chap: 13, lieu: 'Le palais d’Alcinoos', titre: 'L’aède aveugle',
      txt: () => `Un palais aux murs de bronze, des chiens d'or et d'argent à la porte, un verger qui donne toute l'année. Tu entres voilé, tu vas droit à la reine Arété et tu t'assieds dans les cendres du foyer.

Au festin, l'aède aveugle chante la querelle d'Ulysse et d'Achille, puis le cheval de bois. Tu ramènes ton manteau sur ton visage pour pleurer sans qu'on te voie. Alcinoos le voit.

« Étranger. Qui es-tu ? Personne n'est sans nom. »`,
      choix: [
        { t: '« Je suis Ulysse, fils de Laërte, dont les ruses occupent tous les hommes. »',
          eff: { faveur: 1, drapeaux: { recit: true }, note: 'Tu as raconté ton histoire aux Phéaciens.' }, va: 'pheaciens_jeux' },
        { t: 'Mentir encore une fois, par vieille habitude', eff: { ruse: 1, faveur: -1 }, va: 'pheaciens_jeux' }
      ]
    },

    pheaciens_jeux: {
      chap: 13, lieu: 'Schérie', titre: 'Le disque',
      txt: () => `Le jeune Euryale te provoque devant tous : « Tu n'as pas l'air d'un athlète. Plutôt d'un marchand qui compte sa cargaison. »

Tu te lèves sans ôter ton manteau, tu prends le disque le plus lourd du tas, et tu le lances.`,
      choix: [
        { t: 'Lancer', test: { stat: 'vigueur', seuil: 7,
            reussite: { va: 'pheaciens_navire', eff: { vigueur: 1, faveur: 1, note: 'Ton disque a dépassé toutes les marques des Phéaciens.' } },
            echec: { va: 'pheaciens_navire', eff: { ruse: 1 } } } },
        { t: 'Répondre par les mots plutôt que par le bras', eff: { ruse: 1 }, va: 'pheaciens_navire' }
      ]
    },

    pheaciens_navire: {
      chap: 13, lieu: 'Schérie', titre: 'Un bateau étranger',
      txt: () => `Alcinoos t'offre un navire, un équipage de jeunes rameurs, et des trépieds de bronze en pagaille. Le navire phéacien file plus vite qu'un faucon.

Tu t'endors sur le pont — d'un sommeil si profond qu'il ressemble à la mort. Ils te déposent endormi sur une plage, avec tes trésors rangés au pied d'un olivier, et repartent.

*Tu rentreras tard, seul, sur un bateau étranger.* Tirésias ne s'était pas trompé d'un mot.`,
      entree: (s) => { s.objets.push('trésors des Phéaciens'); },
      choix: [
        { t: 'Se réveiller', va: 'ithaque_rivage' }
      ]
    },

    /* ————————————————— CHANT XIV — Ithaque ————————————————— */

    ithaque_rivage: {
      chap: 14, lieu: 'Ithaque', titre: 'La terre que tu ne reconnais pas',
      txt: (s) => `Brume. Un port, une grotte des Nymphes, un olivier au long feuillage. Tu ne reconnais rien — et tu frappes le sol de tes poings, persuadé qu'on t'a encore trompé.

Un jeune berger s'approche. Il a des yeux gris et une manière de te regarder qui n'appartient à personne d'humain.

« Tu es bien retors, de ne jamais te lasser des ruses, même sur ta propre terre. Moi, c'est Athéna. Ta maison est pleine de cent huit hommes qui mangent tes bœufs et courtisent ta femme. ${d(s, 'equipage_sauve') ? 'Et tu es arrivé avec un équipage entier : ils te verront venir de loin.' : 'Et tu es seul.'} »`,
      entree: (s) => { s.drapeaux.athena = true; },
      choix: [
        { t: 'Accepter le déguisement : vieux mendiant, peau ridée, yeux troubles',
          eff: { ruse: 2, vigueur: -1, drapeaux: { mendiant: true }, note: 'Athéna t’a changé en mendiant.' }, va: 'eumee' },
        { t: 'Entrer au palais en armes, et que le nom d’Ulysse suffise', eff: { vigueur: 1, faveur: -2, drapeaux: { frontal: true } }, va: 'palais_frontal' },
        { t: 'Demander d’abord des nouvelles de Pénélope et de Télémaque', eff: { drapeaux: { informe: true }, ruse: 1 }, va: 'eumee' }
      ]
    },

    eumee: {
      chap: 14, lieu: 'La cabane du porcher', titre: 'Eumée',
      txt: () => `Le porcher t'accueille, toi le mendiant, avec ce qu'il a : deux porcelets, du vin coupé, une peau de chèvre sur le banc pour que tu ne t'assoies pas à même la terre.

« Tous les mendiants et les errants racontent qu'ils l'ont vu, dit-il. Ils mentent pour un manteau. Moi, je ne le nommerai plus — c'était mon maître, et je l'aimais. »

Il a gardé ses porcs pendant vingt ans sans en voler un seul.`,
      choix: [
        { t: 'Mentir : un vieux Crétois, un naufrage, et « Ulysse est vivant, il rentre cette lune »',
          eff: { ruse: 1, drapeaux: { eumee_fidele: true } }, va: 'telemaque' },
        { t: 'Te révéler tout de suite à lui', eff: { faveur: -1, drapeaux: { eumee_fidele: true, imprudent: true } }, va: 'telemaque' }
      ]
    },

    telemaque: {
      chap: 14, lieu: 'La cabane du porcher', titre: 'Télémaque',
      txt: () => `Un jeune homme pousse la porte : les chiens ne jappent pas, ils rampent sur le ventre. Il a l'âge exact de ton absence.

Quand Eumée sort, la lumière change dans la cabane. Ta peau se retend, tes cheveux redeviennent noirs.

« Tu es un dieu. »
« Je ne suis pas un dieu. Je suis ton père — celui pour qui tu gémis depuis vingt ans. »

Il refuse d'y croire, puis il y croit, et vous pleurez tous les deux plus longtemps que des oiseaux à qui on a pris les petits.`,
      entree: (s) => { s.drapeaux.telemaque = true; },
      choix: [
        { t: 'Préparer le plan : cacher les armes de la grande salle, ne rien dire à personne',
          eff: { ruse: 2, drapeaux: { armes_cachees: true }, note: 'Les armes de la salle seront enlevées avant le soir.' }, va: 'palais_mendiant' },
        { t: 'Lever les fermiers fidèles et attaquer en force au matin',
          eff: { vigueur: 1, faveur: -1, drapeaux: { fermiers: true } }, va: 'palais_mendiant' }
      ]
    },

    palais_frontal: {
      chap: 14, lieu: 'Le palais', titre: 'Le nom ne suffit pas',
      txt: () => `Tu franchis la porte, l'épée haute, et tu cries ton nom.

Cent huit visages se tournent vers toi. Beaucoup rient. Quelques-uns se lèvent, la main sur le bronze. Antinoos, très calme, repose sa coupe : « Il y a eu dix-sept Ulysse depuis trois ans. Tuez celui-là aussi. »

Tu recules dans la cour, tu prends une javeline dans l'épaule, et tu ne t'en sors que par la nuit et par le mur du verger. Athéna, quelque part, soupire.`,
      entree: (s) => { s.vigueur = Math.max(0, s.vigueur - 3); s.faveur -= 1; },
      choix: [
        { t: 'Panser la blessure et accepter, enfin, le déguisement',
          eff: { ruse: 1, drapeaux: { mendiant: true }, note: 'Tu as appris à tes dépens que la force seule ne suffit pas.' }, va: 'eumee' }
      ]
    },

    palais_mendiant: {
      chap: 15, lieu: 'La grande salle', titre: 'Argos, puis Antinoos',
      txt: () => `Sur le fumier, devant la porte, un vieux chien couvert de tiques lève la tête. Il remue la queue, couche les oreilles — et meurt, ayant revu son maître après vingt ans. Tu essuies une larme sans que personne le voie.

À l'intérieur, tu mendies de table en table. La plupart donnent. Antinoos, lui, te jette un tabouret dans le dos.

Tu ne bouges pas. Tu es debout, immobile, comme un rocher.`,
      choix: [
        { t: 'Encaisser en silence et compter, un par un, ceux qui frappent',
          eff: { ruse: 2, faveur: 2, drapeaux: { patience: true }, note: 'Tu as encaissé sans répondre, et retenu chaque visage.' }, va: 'euryclee' },
        { t: 'Répondre, et accepter le pugilat que le mendiant Iros te propose',
          test: { stat: 'vigueur', seuil: 7,
            reussite: { va: 'euryclee', eff: { vigueur: 1, note: 'Tu as couché Iros d’un seul coup, sans le tuer.' } },
            echec: { va: 'euryclee', eff: { vigueur: -1, faveur: -1 } } } },
        { t: 'Tuer Antinoos sur-le-champ', eff: { faveur: -3, vigueur: -1, drapeaux: { premature: true } }, va: 'massacre' }
      ]
    },

    euryclee: {
      chap: 15, lieu: 'La grande salle', titre: 'La cicatrice',
      txt: () => `Pénélope ordonne qu'on lave les pieds de l'étranger. La vieille nourrice apporte la bassine — elle t'a langé, elle t'a porté.

Ses doigts trouvent, au-dessus du genou, la cicatrice blanche du sanglier du Parnasse. Sa main s'ouvre. Le bronze cogne, l'eau se répand.

« Ulysse ! Mon enfant ! »
Et Pénélope, à trois pas, tourne lentement la tête.`,
      choix: [
        { t: 'Lui saisir la gorge et lui souffler de se taire', test: { stat: 'ruse', seuil: 8,
            reussite: { va: 'penelope', eff: { ruse: 1, note: 'Euryclée a gardé le secret.' } },
            echec: { va: 'penelope', eff: { drapeaux: { soupcon: true } } } } },
        { t: 'Laisser faire : que Pénélope sache', eff: { drapeaux: { penelope_sait: true }, faveur: 1 }, va: 'penelope' }
      ]
    },

    penelope: {
      chap: 15, lieu: 'Près du foyer', titre: 'Vingt ans de toile',
      txt: (s) => `Elle s'assied face à toi. Vingt ans qu'elle défait la nuit le linceul qu'elle tisse le jour, pour ne pas choisir un mari. Une servante l'a trahie ; la ruse est finie.

« Étranger, j'ai fait un rêve. Vingt oies mangent mon blé, et un aigle au grand bec leur brise le cou à toutes. Puis l'aigle parle avec une voix d'homme. »

${d(s, 'penelope_sait') ? 'Elle dit cela en te regardant droit dans les yeux, sans ciller une seule fois.' : 'Elle attend ton interprétation comme on attend un verdict.'}`,
      choix: [
        { t: '« C’est ton mari, reine. Il est déjà dans la maison. »',
          eff: { faveur: 1, drapeaux: { avertie: true } }, va: 'penelope_arc' },
        { t: 'Interpréter prudemment, et l’encourager à proposer une épreuve',
          eff: { ruse: 2, drapeaux: { epreuve_suggeree: true }, note: 'Tu as suggéré à Pénélope l’épreuve de l’arc.' }, va: 'penelope_arc' }
      ]
    },

    penelope_arc: {
      chap: 16, lieu: 'La grande salle', titre: 'L’arc d’Iphitos',
      txt: () => `Au matin, elle descend de la chambre haute, l'arc à la main — celui qu'Iphitos lui avait donné, que personne n'a bandé depuis vingt ans.

« Celui qui tendra cet arc et fera passer la flèche à travers les douze haches alignées, je le suivrai. »

Les prétendants essaient l'un après l'autre. Ils graissent le bois, ils le chauffent au feu, ils s'y mettent à deux mains. Rien.

Puis le mendiant demande à essayer, et toute la salle éclate de rire.`,
      choix: [
        { t: 'Prendre l’arc et le bander comme on tend une corde de lyre',
          test: { stat: 'vigueur', seuil: 8,
            reussite: { va: 'massacre', eff: { vigueur: 1, faveur: 2, drapeaux: { arc_tendu: true }, note: 'Tu as bandé l’arc et traversé les douze haches.' } },
            echec: { va: 'arc_second', eff: { vigueur: -1 } } } },
        { t: 'Prendre ton temps : examiner le bois, chercher les vers, faire durer',
          test: { stat: 'ruse', seuil: 8,
            reussite: { va: 'massacre', eff: { ruse: 1, faveur: 2, drapeaux: { arc_tendu: true }, note: 'Tu as pris ton temps, et l’arc a cédé sous tes doigts.' } },
            echec: { va: 'arc_second', eff: {} } } }
      ]
    },

    arc_second: {
      chap: 16, lieu: 'La grande salle', titre: 'Deuxième essai',
      txt: () => `La corde glisse. Un rire monte, énorme, et Antinoos crie qu'on jette le vieux dehors.

Vingt ans de sel, de rames et de faim pèsent d'un coup sur tes épaules. Mais Eumée est près de la porte, Philœtios ferme la cour au verrou, et Télémaque a la main sur son épée.`,
      choix: [
        { t: 'Recommencer. Rien d’autre à faire.',
          test: { stat: 'vigueur', seuil: 6,
            reussite: { va: 'massacre', eff: { vigueur: 1, drapeaux: { arc_tendu: true }, note: 'Au second essai, l’arc a cédé.' } },
            echec: { va: 'massacre', eff: { vigueur: -1, drapeaux: { sans_arc: true } } } } }
      ]
    },

    massacre: {
      chap: 16, lieu: 'La grande salle', titre: 'Les portes sont fermées',
      txt: (s) => `${d(s, 'arc_tendu')
        ? 'La flèche traverse les douze anneaux sans en toucher un. Tu te dépouilles de tes haillons, tu sautes sur le grand seuil et tu verses les flèches à tes pieds.\n\n« Voilà. Ce concours-là est fini. Voyons-en un autre. »'
        : 'Pas d’arc. Pas de flèches. Seulement une salle fermée, une lance ramassée sur un mort, et cent huit hommes entre toi et ta femme.'}

Antinoos porte la coupe à ses lèvres. ${d(s, 'arc_tendu') ? 'La flèche lui traverse la gorge de part en part.' : 'Il te voit venir, et il a le temps de crier.'}

Ils cherchent des armes aux murs : les murs sont nus.`,
      entree: (s) => {
        let f = 0;
        f += Math.round(s.vigueur * 1.2);
        f += Math.round(s.faveur * 0.8);
        if (d(s, 'arc_tendu')) f += 6;
        if (d(s, 'armes_cachees')) f += 5;
        if (d(s, 'telemaque')) f += 3;
        if (d(s, 'eumee_fidele')) f += 2;
        if (d(s, 'fermiers')) f += 3;
        if (d(s, 'equipage_sauve')) f += 6;
        if (d(s, 'patience')) f += 2;
        if (d(s, 'premature')) f -= 8;
        if (d(s, 'sans_arc')) f -= 5;
        s.force_finale = f;
      },
      choix: [
        { t: 'Tenir le seuil et ne laisser sortir personne',
          cible_conditionnelle: (s) => s.force_finale >= 22 ? 'massacre_victoire' : (s.force_finale >= 12 ? 'massacre_juste' : 'fin_mort_palais') },
        { t: 'Épargner l’aède Phémios et le héraut Médon, qui n’ont jamais choisi',
          eff: { faveur: 2, note: 'Tu as épargné l’aède et le héraut.' },
          cible_conditionnelle: (s) => s.force_finale >= 20 ? 'massacre_victoire' : (s.force_finale >= 11 ? 'massacre_juste' : 'fin_mort_palais') }
      ]
    },

    massacre_victoire: {
      chap: 16, lieu: 'La grande salle', titre: 'Comme des poissons sur le sable',
      txt: () => `Cela dure moins longtemps qu'on ne l'imagine. Quand la salle se tait, ils sont couchés les uns sur les autres, dans le sang et la poussière, comme des poissons que les pêcheurs ont versés sur le sable et que le soleil achève.

Euryclée veut pousser le cri de triomphe. Tu l'arrêtes.

« Réjouis-toi dans ton cœur, vieille, mais ne crie pas. Il est impie de triompher sur des morts. »`,
      choix: [
        { t: 'Faire nettoyer la salle et brûler du soufre', eff: { faveur: 1, drapeaux: { victoire_propre: true } }, va: 'lit' }
      ]
    },

    massacre_juste: {
      chap: 16, lieu: 'La grande salle', titre: 'De justesse',
      txt: () => `Mélanthios ouvre le magasin et leur passe douze boucliers avant qu'on ne le pende par les pieds. La salle devient un carnage confus où l'on frappe des ombres.

Une lance t'ouvre le poignet, une autre entre dans l'épaule de Télémaque. Vous tenez le seuil, tous les quatre, jusqu'à ce qu'il n'y ait plus personne debout — et tu ne sais plus, à la fin, si c'est de l'adresse ou de la chance.`,
      entree: (s) => { s.vigueur = Math.max(1, s.vigueur - 2); s.drapeaux.blesse = true; },
      choix: [
        { t: 'S’asseoir contre une colonne et respirer', va: 'lit' }
      ]
    },

    lit: {
      chap: 17, lieu: 'La chambre', titre: 'Le lit d’olivier',
      txt: () => `On la fait descendre. Elle traverse la salle lavée, s'assied en face de toi, à la lumière du feu, et ne dit rien pendant très longtemps.

Télémaque s'emporte : « Mère, tu as un cœur de pierre. »

Alors elle se tourne vers la nourrice, sans te quitter des yeux :
« Euryclée. Sors le lit solide de la chambre nuptiale, et fais-le dresser ici pour lui. »`,
      choix: [
        { t: 'Se mettre en colère : « Qui a déplacé mon lit ? »',
          eff: { drapeaux: { reconnu: true }, faveur: 1, note: 'Tu es tombé dans le piège de Pénélope — la seule ruse que tu ne pouvais pas éviter.' }, va: 'lit_secret' },
        { t: 'Attendre. Ne rien dire. La laisser conduire l’épreuve jusqu’au bout.',
          test: { stat: 'ruse', seuil: 13,
            reussite: { va: 'lit_secret', eff: { ruse: 1, drapeaux: { reconnu: true } } },
            echec: { va: 'lit_secret', eff: { drapeaux: { reconnu: true, froideur: true } } } } }
      ]
    },

    lit_secret: {
      chap: 17, lieu: 'La chambre', titre: 'Le signe',
      txt: () => `« Femme, ce mot m'a blessé. Personne ne peut avoir déplacé ce lit. Un olivier à long feuillage poussait dans la cour ; j'ai bâti la chambre autour de lui, j'ai coupé le tronc au ras des feuilles, je l'ai poli, percé, et j'en ai fait le pied du lit. Il est enraciné dans la terre. À moins qu'on ne l'ait scié. »

Ses genoux se dérobent. Elle traverse la pièce en courant, lui jette les bras autour du cou, et ce qu'elle dit alors, personne ne le rapporte jamais exactement.

« Ne m'en veux pas. J'avais tellement peur qu'un homme vienne me tromper avec des mots. Le monde est plein d'hommes habiles. »

Et toi, l'homme le plus habile du monde, tu n'as rien à répondre.`,
      choix: [
        { t: 'Voir venir le jour', cible_conditionnelle: (s) => s.faveur <= -2 ? 'fin_roi_amer' : (d(s, 'rame') ? 'fin_rame' : 'fin_retour') }
      ]
    },

    /* ————————————————— LES FINS ————————————————— */

    fin_oubli: {
      fin: 'douce', chap: 3, lieu: 'Terre des Lotophages', titre: 'Fin — Le doux oubli',
      txt: () => `Tu restes assis face à la mer, et tu souris.

Un navire attend au large trois jours, puis lève l'ancre sans toi. Quelque part au nord-ouest, une femme continue de tisser un linceul qu'elle défait chaque nuit, pour un homme qui n'existe plus.

Tu es heureux. C'est la seule fin de cette histoire où quelqu'un est vraiment heureux, et c'est pour cela qu'on ne la raconte jamais.`
    },

    fin_grotte: {
      fin: 'sombre', chap: 4, lieu: 'La grotte', titre: 'Fin — Derrière la pierre',
      txt: () => `Le géant meurt, et le rocher reste.

Vous y passez onze jours. À la fin, l'un de vous grave sur la paroi, avec la pointe d'une épée, un mot que personne ne lira jamais.`
    },

    fin_sirenes: {
      fin: 'sombre', chap: 9, lieu: 'L’île des Sirènes', titre: 'Fin — Ce qu’elles savaient de toi',
      txt: () => `Elles ne chantent pas la beauté. Elles chantent le savoir : *nous savons tout ce qui arrive sur la terre nourricière.*

Tu sautes à l'eau avant qu'on puisse te retenir, et tu nages vers la voix qui prononce le nom de ton fils.

Sur l'île, l'herbe est haute et blanche d'os. On dit qu'à la fin, elles disent vraiment tout. On dit que c'est même pour cela qu'on y va.`
    },

    fin_charybde: {
      fin: 'sombre', chap: 10, lieu: 'Le détroit', titre: 'Fin — Le gouffre',
      txt: () => `Le tourbillon aspire trois fois par jour, et il n'existe aucun moment sûr — c'est un mensonge de marin.

Le navire descend d'un coup, la quille en l'air, avec tous ceux qui n'ont pas eu le temps de comprendre. Le fond du gouffre est de sable noir, et il y a beaucoup de bois là-dessous.

À Ithaque, on continuera d'attendre pendant vingt ans, ce qui est plus long qu'une vie.`
    },

    fin_calypso: {
      fin: 'ambigue', chap: 12, lieu: 'Ogygie', titre: 'Fin — L’immortel',
      txt: () => `Tu acceptes.

Les siècles passent sur Ogygie sans laisser de marque. Tu ne vieillis pas, tu ne meurs pas, tu ne rentres pas. Au début, tu comptes encore les années ; ensuite tu arrêtes.

Un jour — mille ans plus tard, peut-être — un aède aveugle chantera l'histoire d'un homme aux mille tours qui revint chez lui. Ce ne sera pas la tienne. Ta version, personne ne la chante : il n'y a pas de retour dedans, et une histoire sans retour n'est pas une odyssée.`
    },

    fin_mort_palais: {
      fin: 'sombre', chap: 16, lieu: 'La grande salle', titre: 'Fin — Sur le seuil',
      txt: () => `Ils sont trop, et tu es trop seul, et tu es rentré trop tard.

Tu meurs sur le seuil de ta propre maison, ce qui est, si l'on y pense, exactement l'endroit où tu voulais aller.

Personne dans la salle ne sait qui il vient de tuer. À l'étage, une femme entend le bruit, se retourne dans son sommeil, et ne se réveille pas.`
    },

    fin_roi_amer: {
      fin: 'ambigue', chap: 17, lieu: 'Ithaque', titre: 'Fin — Roi sans paix',
      txt: (s) => `Tu es rentré. Tu as ta femme, ton fils, ton trône et ton lit enraciné.

Mais les pères des prétendants s'arment dans la campagne, la mer reste fermée pour toi, et il y a des noms que tu ne prononces plus : ${d(s, 'colere_poseidon') ? 'celui du Cyclope, ' : ''}ceux des ${s.equipage === 0 ? 'six cents' : 'centaines d’'}hommes partis avec toi et qui ne sont pas revenus.

Tu es le seul survivant de ta propre histoire. Les nuits, tu descends au rivage et tu regardes l'ouest, et Pénélope, dans la chambre, fait semblant de dormir.`
    },

    fin_rame: {
      fin: 'lumineuse', chap: 17, lieu: 'Ithaque, et au-delà', titre: 'Fin — La rame plantée',
      txt: (s) => `Vous vivez.

Mais un matin, tu prends une rame sur l'épaule et tu marches vers l'intérieur des terres, comme Tirésias l'a ordonné — loin, très loin, jusqu'à un pays d'hommes qui ne connaissent pas la mer, qui ne salent pas leurs aliments, qui n'ont jamais vu de navire.

Là, un passant te demandera pourquoi tu portes une pelle à grain sur l'épaule. Ce jour-là, tu planteras la rame dans la terre, tu sacrifieras à Poséidon un bélier, un taureau et un verrat, et tu rentreras chez toi pour de bon.

Alors la mort te viendra de la mer, très douce, dans une vieillesse heureuse, au milieu de peuples prospères. ${d(s, 'fidele') ? 'Tu auras eu raison de refuser l’immortalité : c’est le fait de finir qui donne au retour sa valeur.' : ''}

*Jours écoulés depuis Troie : ${s.jours}.*`
    },

    fin_retour: {
      fin: 'lumineuse', chap: 17, lieu: 'Ithaque', titre: 'Fin — Le jour du retour',
      txt: (s) => `Athéna retient l'Aurore au bord de l'Océan pour vous laisser la nuit plus longue, et vous parlez jusqu'au matin : elle raconte ses vingt ans, puis toi les tiens — les Cicones, le Cyclope, Circé, les morts, les Sirènes, le gouffre${d(s, 'fidele') ? ', et la déesse qui t’offrait de ne jamais mourir' : ''}.

Au matin, tu montes au verger. Un vieil homme en tunique rapiécée bine un plant, courbé, et ne lève pas la tête. Tu commences par lui mentir, par habitude — puis tu t'arrêtes, et tu lui dis simplement ton nom.

*Jours écoulés depuis Troie : ${s.jours}. Hommes ramenés : ${s.equipage}.*`
    }
  };

  global.HISTOIRE = H;
  global.DEBUT = 'prologue';
})(window);
