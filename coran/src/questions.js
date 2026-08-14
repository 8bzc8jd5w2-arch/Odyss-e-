/* Les 114 questions — autant que de sourates.
   n : niveau (1 = 10-12 ans, 2 = 12-14 ans, 3 = 14-16 ans)
   t : thème · q : question · r : réponses · b : indice de la bonne réponse
   info : ce qu'on apprend une fois qu'on a répondu */

(function (global) {
  'use strict';

  const THEMES = {
    livre:     { nom: 'Le Livre',      desc: 'Comment le Coran est fait' },
    prophetes: { nom: 'Les prophètes', desc: 'Ceux dont le Coran raconte l’histoire' },
    recits:    { nom: 'Les récits',    desc: 'Les grandes histoires' },
    sourates:  { nom: 'Les sourates',  desc: 'Leurs noms, leurs sens' },
    mots:      { nom: 'Les mots',      desc: 'Le vocabulaire à connaître' },
    pratique:  { nom: 'La pratique',   desc: 'Ce que le Coran enseigne' }
  };

  const NIVEAUX = {
    1: { nom: 'Découverte',  age: '10 – 12 ans', desc: 'Les bases, calmement.' },
    2: { nom: 'Explorateur', age: '12 – 14 ans', desc: 'Les récits et les détails.' },
    3: { nom: 'Connaisseur', age: '14 – 16 ans', desc: 'Pour ceux qui lisent déjà beaucoup.' }
  };

  const QUESTIONS = [

    /* ——————————————— NIVEAU 1 · Découverte ——————————————— */

    { n: 1, t: 'livre', q: 'Combien y a-t-il de sourates dans le Coran ?',
      r: ['114', '99', '30', '124'], b: 0,
      info: 'Le Coran compte 114 sourates, de la plus longue (Al-Baqara) à la plus courte (Al-Kawthar).' },

    { n: 1, t: 'livre', q: 'Dans quelle langue le Coran a-t-il été révélé ?',
      r: ['En arabe', 'En hébreu', 'En araméen', 'En persan'], b: 0,
      info: 'Le Coran a été révélé en arabe. Les traductions aident à comprendre, mais on appelle « Coran » le texte arabe lui-même.' },

    { n: 1, t: 'livre', q: 'Quel ange a transmis la révélation au Prophète Muhammad ﷺ ?',
      r: ['Jibril', 'Mika’il', 'Israfil', 'Malik'], b: 0,
      info: 'L’ange Jibril (Gabriel) a transmis la révélation pendant vingt-trois ans.' },

    { n: 1, t: 'livre', q: 'Quelle est la première sourate du Coran ?',
      r: ['Al-Fatiha', 'Al-Baqara', 'Al-Ikhlas', 'An-Nas'], b: 0,
      info: 'Al-Fatiha ouvre le Coran : c’est d’ailleurs ce que son nom veut dire, « l’Ouverture ».' },

    { n: 1, t: 'livre', q: 'Quelle est la dernière sourate du Coran ?',
      r: ['An-Nas', 'Al-Falaq', 'Al-Ikhlas', 'Al-‘Asr'], b: 0,
      info: 'An-Nas (« Les Hommes ») est la 114ᵉ et dernière sourate du mushaf.' },

    { n: 1, t: 'mots', q: 'Comment appelle-t-on un verset du Coran ?',
      r: ['Une ayah', 'Une sourate', 'Un juz’', 'Un hizb'], b: 0,
      info: 'Une ayah, c’est un verset — le mot veut aussi dire « signe ».' },

    { n: 1, t: 'livre', q: 'Combien de versets compte la sourate Al-Fatiha ?',
      r: ['7', '5', '10', '3'], b: 0,
      info: 'Sept versets, récités dans chaque unité de prière. On l’appelle aussi « les sept versets répétés ».' },

    { n: 1, t: 'livre', q: 'En combien de grandes parties égales divise-t-on le Coran pour le lire ?',
      r: ['30 juz’', '12 juz’', '60 juz’', '114 juz’'], b: 0,
      info: 'Trente juz’ : un par jour, cela permet de lire tout le Coran en un mois de Ramadan.' },

    { n: 1, t: 'livre', q: 'Pendant quel mois la révélation du Coran a-t-elle commencé ?',
      r: ['Ramadan', 'Shawwal', 'Muharram', 'Rajab'], b: 0,
      info: 'Le Coran le dit lui-même : « Le mois de Ramadan, durant lequel le Coran a été descendu. »' },

    { n: 1, t: 'livre', q: 'Où le Prophète ﷺ se trouvait-il lors de la première révélation ?',
      r: ['Dans la grotte de Hira', 'Dans la Ka‘ba', 'À la mosquée de Médine', 'Sur le mont Uhud'], b: 0,
      info: 'Il s’y retirait pour méditer, dans une grotte de la montagne près de La Mecque.' },

    { n: 1, t: 'mots', q: 'Comment appelle-t-on l’exemplaire écrit du Coran, celui qu’on tient en main ?',
      r: ['Un mushaf', 'Un hadith', 'Un tafsir', 'Un tajwid'], b: 0,
      info: 'Le mot mushaf vient de « sahifa », le feuillet : c’est le Coran rassemblé en un livre.' },

    { n: 1, t: 'mots', q: 'Que veut dire le mot « Qur’an » ?',
      r: ['La récitation, la lecture', 'La lumière', 'La promesse', 'Le chemin'], b: 0,
      info: 'De la racine « qara’a », lire ou réciter — et le tout premier mot révélé fut justement « Iqra’ », « Lis ! ».' },

    { n: 1, t: 'prophetes', q: 'Quel prophète a construit une arche pour échapper au déluge ?',
      r: ['Nuh', 'Musa', 'Yusuf', 'Idris'], b: 0,
      info: 'Nuh (Noé) appela son peuple pendant des siècles avant que le déluge n’arrive.' },

    { n: 1, t: 'prophetes', q: 'Quel prophète fut jeté dans un puits par ses frères ?',
      r: ['Yusuf', 'Yunus', 'Ya‘qub', 'Ishaq'], b: 0,
      info: 'Yusuf, fils de Ya‘qub. Toute son histoire est racontée dans la sourate qui porte son nom.' },

    { n: 1, t: 'prophetes', q: 'Quel prophète fut avalé par un grand poisson ?',
      r: ['Yunus', 'Yusuf', 'Ilyas', 'Harun'], b: 0,
      info: 'Yunus (Jonas). Dans le ventre du poisson, il invoqua Allah — et fut sauvé.' },

    { n: 1, t: 'prophetes', q: 'Quel prophète Allah a-t-Il sauvé du feu allumé par son peuple ?',
      r: ['Ibrahim', 'Musa', 'Salih', 'Lut'], b: 0,
      info: 'Le Coran rapporte l’ordre donné au feu : « Sois fraîcheur et paix sur Ibrahim. »' },

    { n: 1, t: 'prophetes', q: 'Quel prophète traversa la mer avec son peuple, poursuivi par Pharaon ?',
      r: ['Musa', 'Harun', 'Dawud', 'Sulayman'], b: 0,
      info: 'Musa frappa la mer de son bâton et elle s’ouvrit, chaque partie « comme une immense montagne ».' },

    { n: 1, t: 'prophetes', q: 'Qui est le premier homme, et aussi le premier prophète ?',
      r: ['Adam', 'Nuh', 'Idris', 'Ibrahim'], b: 0,
      info: 'Adam, à qui Allah a enseigné « tous les noms ».' },

    { n: 1, t: 'prophetes', q: 'Quel prophète comprenait le langage des oiseaux et des fourmis ?',
      r: ['Sulayman', 'Dawud', 'Yahya', 'Zakariyya'], b: 0,
      info: 'Sulayman, fils de Dawud. Le Coran rapporte : « On nous a appris le langage des oiseaux. »' },

    { n: 1, t: 'prophetes', q: 'Qui est le dernier des prophètes ?',
      r: ['Muhammad ﷺ', '‘Isa', 'Musa', 'Ibrahim'], b: 0,
      info: 'Le Coran l’appelle « le sceau des prophètes » : aucun prophète ne vient après lui.' },

    { n: 1, t: 'prophetes', q: 'Qui était le frère de Musa, envoyé pour l’aider ?',
      r: ['Harun', 'Yusuf', 'Shu‘ayb', 'Ilyas'], b: 0,
      info: 'Musa avait demandé cette aide lui-même : « Donne-moi un assistant de ma famille, Harun, mon frère. »' },

    { n: 1, t: 'recits', q: 'Quelle est la seule femme dont le Coran cite le nom ?',
      r: ['Maryam', 'Khadija', 'Asiya', 'Hajar'], b: 0,
      info: 'Maryam, la mère de ‘Isa. Elle est aussi la seule à donner son nom à une sourate.' },

    { n: 1, t: 'recits', q: 'Qui a élevé les fondations de la Ka‘ba avec son fils Isma‘il ?',
      r: ['Ibrahim', 'Nuh', 'Adam', 'Musa'], b: 0,
      info: 'Le Coran rapporte leur invocation pendant les travaux : « Notre Seigneur, accepte cela de notre part. »' },

    { n: 1, t: 'recits', q: 'Quel roi puissant s’opposa à Musa et refusa de le croire ?',
      r: ['Pharaon (Fir‘awn)', 'Qarun', 'Haman', 'Nemrod'], b: 0,
      info: 'Pharaon alla jusqu’à se prétendre seigneur — et il fut englouti par la mer qu’il croyait franchir.' },

    { n: 1, t: 'recits', q: 'La sourate Al-Fil raconte l’arrivée d’une armée. Avec quels animaux ?',
      r: ['Des éléphants', 'Des chevaux', 'Des chameaux', 'Des lions'], b: 0,
      info: 'Cette armée voulait détruire la Ka‘ba. « Al-Fil » veut simplement dire « L’Éléphant ».' },

    { n: 1, t: 'recits', q: 'Dans quelle sourate trouve-t-on les jeunes gens endormis dans une caverne ?',
      r: ['Al-Kahf', 'Al-Baqara', 'Maryam', 'An-Naml'], b: 0,
      info: 'Al-Kahf veut dire « La Caverne ». Beaucoup de musulmans la lisent le vendredi.' },

    { n: 1, t: 'sourates', q: 'Que veut dire « Al-Fatiha » ?',
      r: ['L’Ouverture', 'La Lumière', 'Le Secours', 'La Prière'], b: 0,
      info: 'Elle ouvre le Coran, et elle ouvre chaque unité de la prière.' },

    { n: 1, t: 'sourates', q: 'Que veut dire « Al-Baqara » ?',
      r: ['La Vache', 'L’Abeille', 'La Fourmi', 'L’Araignée'], b: 0,
      info: 'Le nom vient de l’histoire de la vache que les Enfants d’Israël devaient sacrifier.' },

    { n: 1, t: 'sourates', q: 'Quelle sourate porte le nom de l’animal qui tisse « la plus fragile des maisons » ?',
      r: ['Al-‘Ankabut', 'An-Nahl', 'An-Naml', 'Al-Fil'], b: 0,
      info: 'Al-‘Ankabut, « L’Araignée » : une image de ce qui paraît solide et ne l’est pas.' },

    { n: 1, t: 'sourates', q: 'La sourate An-Nahl porte le nom de quel insecte ?',
      r: ['L’abeille', 'La fourmi', 'La mouche', 'Le moustique'], b: 0,
      info: '« De leur ventre sort une liqueur aux couleurs variées, dans laquelle il y a une guérison pour les gens. »' },

    { n: 1, t: 'sourates', q: 'Quelle sourate porte le nom de la mère de ‘Isa ?',
      r: ['Maryam', 'Yusuf', 'Luqman', 'Nuh'], b: 0,
      info: 'La sourate 19, Maryam. C’est la seule sourate qui porte le nom d’une femme.' },

    { n: 1, t: 'sourates', q: 'De quoi parle surtout la sourate Al-Ikhlas ?',
      r: ['De l’unicité d’Allah', 'De la prière', 'Du jeûne', 'Des anges'], b: 0,
      info: 'Quatre versets seulement, qui répondent à la question : qui est Allah ?' },

    { n: 1, t: 'pratique', q: 'Combien y a-t-il de piliers de l’islam ?',
      r: ['5', '3', '6', '7'], b: 0,
      info: 'L’attestation de foi, la prière, la zakat, le jeûne de Ramadan et le pèlerinage.' },

    { n: 1, t: 'pratique', q: 'Vers quelle direction les musulmans se tournent-ils pour prier ?',
      r: ['La Ka‘ba, à La Mecque', 'Jérusalem', 'L’est', 'Médine'], b: 0,
      info: 'Cette direction s’appelle la qibla. Le Coran raconte le jour où elle a été fixée vers la Ka‘ba.' },

    { n: 1, t: 'mots', q: 'Comment appelle-t-on une personne qui a mémorisé tout le Coran ?',
      r: ['Un hafiz', 'Un imam', 'Un muezzin', 'Un cadi'], b: 0,
      info: 'De « hifz », la mémorisation. Des enfants de votre âge y parviennent, souvent en plusieurs années.' },

    { n: 1, t: 'pratique', q: 'Par quelle formule commencent presque toutes les sourates ?',
      r: ['Bismillah ar-Rahman ar-Rahim', 'Al-hamdulillah', 'Subhanallah', 'Allahu akbar'], b: 0,
      info: '« Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux. » On l’appelle la Basmala.' },

    { n: 1, t: 'pratique', q: 'Quelles deux sourates récite-t-on ensemble pour demander protection ?',
      r: ['Al-Falaq et An-Nas', 'Al-Ikhlas et Al-Kawthar', 'Al-‘Asr et Al-Fil', 'Al-Fatiha et Al-Baqara'], b: 0,
      info: 'On les appelle « Al-Mu‘awwidhatan », les deux sourates de la protection.' },

    { n: 1, t: 'mots', q: 'Que veut dire « sourate » ?',
      r: ['Un chapitre du Coran', 'Un verset', 'Une prière', 'Une histoire'], b: 0,
      info: 'Le Coran en compte 114, de 3 versets pour la plus courte à 286 pour la plus longue.' },

    { n: 1, t: 'mots', q: 'Le « tajwid », c’est quoi ?',
      r: ['Les règles de la belle récitation', 'L’explication du Coran', 'La calligraphie', 'La mémorisation'], b: 0,
      info: 'Ce sont les règles de prononciation : allonger, marquer, adoucir — pour réciter comme il se doit.' },

    { n: 1, t: 'livre', q: 'Combien de temps a duré la révélation du Coran ?',
      r: ['Environ 23 ans', 'Une seule nuit', 'Environ 5 ans', 'Environ 50 ans'], b: 0,
      info: 'Environ treize ans à La Mecque, puis dix ans à Médine, verset après verset selon les situations.' },

    /* ——————————————— NIVEAU 2 · Explorateur ——————————————— */

    { n: 2, t: 'livre', q: 'Quelle est la plus longue sourate du Coran ?',
      r: ['Al-Baqara', 'Al ‘Imran', 'An-Nisa', 'Al-A‘raf'], b: 0,
      info: 'Al-Baqara compte 286 versets et occupe à elle seule plus de deux juz’.' },

    { n: 2, t: 'livre', q: 'Quelle est la plus courte sourate du Coran ?',
      r: ['Al-Kawthar', 'Al-Ikhlas', 'An-Nasr', 'Al-‘Asr'], b: 0,
      info: 'Al-Kawthar ne compte que trois versets.' },

    { n: 2, t: 'livre', q: 'Quels furent les tout premiers mots révélés ?',
      r: ['« Iqra’ » — Lis !', '« Al-hamdulillah »', '« Ya ayyuha-l-muddaththir »', '« Qul huwa Allahu ahad »'], b: 0,
      info: '« Lis, au nom de ton Seigneur qui a créé. » Le premier ordre de la révélation est un ordre de lire.' },

    { n: 2, t: 'livre', q: 'De quelle sourate viennent les cinq premiers versets révélés ?',
      r: ['Al-‘Alaq', 'Al-Muddaththir', 'Al-Qadr', 'Al-Fatiha'], b: 0,
      info: 'Al-‘Alaq, « L’Adhérence ». Elle est la 96ᵉ dans le mushaf, mais la première dans le temps.' },

    { n: 2, t: 'livre', q: 'Quelle nuit le Coran a-t-il commencé à descendre ?',
      r: ['Laylat al-Qadr', 'Laylat al-Isra’', 'La nuit du vendredi', 'La nuit de ‘Arafat'], b: 0,
      info: 'La Nuit du Destin, dont le Coran dit qu’elle « vaut mieux que mille mois ».' },

    { n: 2, t: 'livre', q: 'Quelle sourate ne commence pas par la Basmala ?',
      r: ['At-Tawba', 'Al-Baqara', 'Yunus', 'Al-Kahf'], b: 0,
      info: 'At-Tawba (« Le Repentir ») est la seule des 114 à ne pas s’ouvrir sur la Basmala.' },

    { n: 2, t: 'prophetes', q: 'Combien de prophètes sont cités par leur nom dans le Coran ?',
      r: ['25', '12', '40', '99'], b: 0,
      info: 'Vingt-cinq sont nommés — mais le Coran précise qu’il y en eut beaucoup d’autres dont il ne raconte pas l’histoire.' },

    { n: 2, t: 'prophetes', q: 'Quel prophète est le plus souvent cité par son nom dans le Coran ?',
      r: ['Musa', 'Ibrahim', '‘Isa', 'Nuh'], b: 0,
      info: 'Musa est nommé plus de cent trente fois : son histoire avec Pharaon revient dans de nombreuses sourates.' },

    { n: 2, t: 'livre', q: 'Quel livre fut donné à Musa ?',
      r: ['La Tawrat', 'L’Injil', 'Le Zabur', 'Les feuillets d’Ibrahim'], b: 0,
      info: 'La Tawrat (la Torah). Le Coran cite quatre révélations : Tawrat, Zabur, Injil et Coran.' },

    { n: 2, t: 'livre', q: 'Quel livre fut donné à ‘Isa ?',
      r: ['L’Injil', 'La Tawrat', 'Le Zabur', 'Le Coran'], b: 0,
      info: 'L’Injil (l’Évangile), confirmé par le Coran comme une révélation d’Allah.' },

    { n: 2, t: 'livre', q: 'Quel livre fut donné à Dawud ?',
      r: ['Le Zabur', 'L’Injil', 'La Tawrat', 'Les feuillets de Musa'], b: 0,
      info: 'Le Zabur (les Psaumes). Le Coran dit que les montagnes et les oiseaux glorifiaient Allah avec Dawud.' },

    { n: 2, t: 'recits', q: 'Qui a vaincu Jalut (Goliath), selon le Coran ?',
      r: ['Dawud', 'Talut', 'Sulayman', 'Musa'], b: 0,
      info: 'Dawud, alors un jeune homme dans l’armée de Talut. Allah lui donna ensuite la royauté et la sagesse.' },

    { n: 2, t: 'sourates', q: 'Quelle sourate raconte une seule et même histoire, du début à la fin ?',
      r: ['Yusuf', 'Al-Baqara', 'An-Nisa', 'Al-Kahf'], b: 0,
      info: 'La sourate Yusuf suit son récit d’un bout à l’autre, du rêve de l’enfance aux retrouvailles en Égypte.' },

    { n: 2, t: 'sourates', q: 'Comment le Coran qualifie-t-il l’histoire de Yusuf ?',
      r: ['« Le plus beau des récits »', '« La grande nouvelle »', '« Le récit véridique »', '« La sagesse »'], b: 0,
      info: '« Nous te racontons le plus beau des récits » — c’est ainsi que la sourate s’ouvre.' },

    { n: 2, t: 'recits', q: 'Quel oiseau apporta à Sulayman des nouvelles du royaume de Saba ?',
      r: ['La huppe (hudhud)', 'Le corbeau', 'L’aigle', 'La colombe'], b: 0,
      info: 'La huppe revient avec cette phrase célèbre : « J’ai appris ce que tu n’as pas appris. »' },

    { n: 2, t: 'recits', q: 'Quel petit animal parle dans la sourate An-Naml ?',
      r: ['Une fourmi', 'Une abeille', 'Un chien', 'Un oiseau'], b: 0,
      info: 'Une fourmi avertit les siennes de rentrer avant que l’armée de Sulayman ne passe — et il l’entend, et il sourit.' },

    { n: 2, t: 'prophetes', q: 'Quel prophète est cité en exemple pour sa patience dans la maladie ?',
      r: ['Ayyub', 'Yunus', 'Ya‘qub', 'Zakariyya'], b: 0,
      info: 'Ayyub (Job) perdit sa santé et ses biens sans se plaindre d’Allah : « Nous l’avons trouvé endurant. »' },

    { n: 2, t: 'prophetes', q: 'À quel peuple le prophète Hud fut-il envoyé ?',
      r: ['‘Ad', 'Thamud', 'Madyan', 'Quraysh'], b: 0,
      info: 'Le peuple de ‘Ad, connu pour sa force et ses constructions — et pour son orgueil.' },

    { n: 2, t: 'recits', q: 'Quel signe fut donné au peuple de Thamud avec le prophète Salih ?',
      r: ['Une chamelle', 'Un bâton', 'Une source', 'Un vent'], b: 0,
      info: 'Une chamelle qu’il leur était interdit de toucher. Ils la tuèrent quand même.' },

    { n: 2, t: 'prophetes', q: 'À quel peuple Shu‘ayb demanda-t-il d’être honnête dans le poids et la mesure ?',
      r: ['Madyan', '‘Ad', 'Thamud', 'Les gens de Saba'], b: 0,
      info: 'Les gens de Madyan trichaient au commerce : « Donnez la pleine mesure et ne soyez pas de ceux qui causent du tort. »' },

    { n: 2, t: 'prophetes', q: 'Quel prophète reçut un fils, Yahya, alors qu’il était devenu très âgé ?',
      r: ['Zakariyya', 'Ibrahim', 'Ya‘qub', 'Ishaq'], b: 0,
      info: 'Zakariyya avait dit : « Mes os se sont affaiblis et ma tête s’est enflammée de vieillesse. » Allah lui donna Yahya.' },

    { n: 2, t: 'recits', q: 'Que dit le Coran de la naissance de ‘Isa ?',
      r: ['Il est né de Maryam sans père', 'Il est né à Médine', 'Il est né dans un palais', 'Il est né en Égypte'], b: 0,
      info: 'Le Coran compare sa création à celle d’Adam : Allah dit « Sois », et cela est.' },

    { n: 2, t: 'recits', q: 'Que fit ‘Isa alors qu’il était encore un nourrisson ?',
      r: ['Il parla depuis son berceau', 'Il marcha', 'Il écrivit', 'Il jeûna'], b: 0,
      info: 'Il parla pour défendre sa mère : « Je suis le serviteur d’Allah. Il m’a donné le Livre. »' },

    { n: 2, t: 'recits', q: 'Combien de temps les gens de la caverne restèrent-ils endormis ?',
      r: ['309 ans', '100 ans', '40 ans', '1 000 ans'], b: 0,
      info: 'Le Coran dit : « Ils demeurèrent trois cents ans, auxquels s’ajoutent neuf. »' },

    { n: 2, t: 'recits', q: 'Qui construisit une barrière pour contenir Ya’juj et Ma’juj ?',
      r: ['Dhul-Qarnayn', 'Sulayman', 'Dhul-Kifl', 'Talut'], b: 0,
      info: 'Il la bâtit en fer et en cuivre fondu, puis dit : « Ceci est une miséricorde de mon Seigneur. »' },

    { n: 2, t: 'recits', q: 'Quel homme très riche fut englouti avec sa maison à cause de son orgueil ?',
      r: ['Qarun', 'Haman', 'Abu Lahab', 'Fir‘awn'], b: 0,
      info: 'Qarun disait que sa fortune venait de son seul savoir. La terre l’engloutit, lui et sa demeure.' },

    { n: 2, t: 'recits', q: 'Qui donne de sages conseils à son fils dans la sourate 31 ?',
      r: ['Luqman', 'Ya‘qub', 'Ibrahim', 'Nuh'], b: 0,
      info: 'Luqman, un sage à qui Allah avait donné la sagesse. La sourate porte son nom.' },

    { n: 2, t: 'recits', q: 'Quel est le tout premier conseil de Luqman à son fils ?',
      r: ['Ne rien associer à Allah', 'Apprendre à lire', 'Travailler dur', 'Voyager'], b: 0,
      info: '« Ô mon fils, ne donne pas d’associé à Allah, car l’association est une injustice énorme. »' },

    { n: 2, t: 'sourates', q: 'Que veut dire « Al-Kahf » ?',
      r: ['La Caverne', 'La Montagne', 'Le Refuge', 'La Nuit'], b: 0,
      info: 'Elle doit son nom aux jeunes gens qui s’y réfugièrent pour protéger leur foi.' },

    { n: 2, t: 'sourates', q: 'Que veut dire « An-Naml » ?',
      r: ['Les Fourmis', 'Les Abeilles', 'Les Oiseaux', 'Les Étoiles'], b: 0,
      info: 'À cause de la fourmi qui avertit les siennes au passage de l’armée de Sulayman.' },

    { n: 2, t: 'sourates', q: 'Que veut dire « Al-Kawthar » ?',
      r: ['L’Abondance', 'La Source amère', 'La Victoire', 'La Lumière'], b: 0,
      info: '« Nous t’avons certes accordé l’Abondance. » C’est aussi le nom d’un fleuve du Paradis.' },

    { n: 2, t: 'sourates', q: 'Quelle sourate appelle-t-on « les sept versets répétés » ?',
      r: ['Al-Fatiha', 'Al-Ikhlas', 'Al-‘Asr', 'An-Nasr'], b: 0,
      info: 'Parce qu’on la répète dans chaque unité de prière, plusieurs fois par jour, toute sa vie.' },

    { n: 2, t: 'livre', q: 'Dans quelle sourate se trouve le verset du Trône (Ayat al-Kursi) ?',
      r: ['Al-Baqara', 'Al ‘Imran', 'Ya-Sin', 'Al-Mulk'], b: 0,
      info: 'C’est le verset 255 de Al-Baqara, l’un des plus connus et des plus mémorisés du Coran.' },

    { n: 2, t: 'livre', q: 'Que sont les sourates « mecquoises » ?',
      r: ['Celles révélées avant l’émigration à Médine', 'Celles qu’on lit à La Mecque', 'Celles révélées pendant le pèlerinage', 'Celles qui citent La Mecque'], b: 0,
      info: 'Elles sont souvent plus courtes et parlent surtout de la foi. Les médinoises abordent davantage la vie en communauté.' },

    { n: 2, t: 'sourates', q: 'Que célèbre la sourate Al-Qadr ?',
      r: ['La Nuit du Destin', 'La bataille de Badr', 'Le pèlerinage', 'La naissance du Prophète ﷺ'], b: 0,
      info: '« La Nuit d’Al-Qadr est meilleure que mille mois. » Elle se cherche dans les dix dernières nuits de Ramadan.' },

    { n: 2, t: 'mots', q: 'Comment appelle-t-on l’explication du sens des versets ?',
      r: ['Le tafsir', 'Le tajwid', 'Le hadith', 'La sira'], b: 0,
      info: 'Le tafsir explique le sens ; le tajwid, lui, concerne la façon de réciter.' },

    { n: 2, t: 'sourates', q: 'Quelle sourate porte le nom du Prophète Muhammad ﷺ ?',
      r: ['La sourate 47, Muhammad', 'Al-Ahzab', 'Al-Fath', 'An-Nasr'], b: 0,
      info: 'Son nom apparaît peu de fois dans le Coran, mais une sourate entière le porte.' },

    { n: 2, t: 'livre', q: 'Quel calife fit établir des exemplaires officiels du Coran envoyés dans les grandes villes ?',
      r: ['‘Uthman ibn ‘Affan', 'Abu Bakr', '‘Umar ibn al-Khattab', '‘Ali ibn Abi Talib'], b: 0,
      info: 'Pour que tous récitent le même texte, où qu’ils soient. Abu Bakr, avant lui, avait fait rassembler le Coran par écrit.' },

    { n: 2, t: 'livre', q: 'Quel compagnon fut chargé de rassembler le Coran par écrit ?',
      r: ['Zayd ibn Thabit', 'Bilal ibn Rabah', 'Salman al-Farisi', 'Anas ibn Malik'], b: 0,
      info: 'Il était l’un des scribes de la révélation, et connaissait le Coran par cœur.' },

    { n: 2, t: 'recits', q: 'Dans la sourate Al-Fil, comment l’armée fut-elle arrêtée ?',
      r: ['Par des oiseaux lançant des pierres', 'Par une tempête de sable', 'Par un tremblement de terre', 'Par une armée adverse'], b: 0,
      info: '« Il envoya sur eux des oiseaux par volées, qui leur lançaient des pierres d’argile. »' },

    { n: 2, t: 'pratique', q: 'Que dit le Coran sur la façon de parler à ses parents ?',
      r: ['Ne pas même leur dire « uff »', 'Ne leur parler qu’en arabe', 'Ne jamais leur poser de question', 'Leur parler à voix basse'], b: 0,
      info: '« Ne leur dis pas “uff”, ne les repousse pas, et adresse-leur des paroles respectueuses. »' },

    /* ——————————————— NIVEAU 3 · Connaisseur ——————————————— */

    { n: 3, t: 'livre', q: 'Combien de versets compte le Coran, environ ?',
      r: ['Plus de 6 000', 'Environ 1 000', 'Environ 3 000', 'Environ 20 000'], b: 0,
      info: 'Un peu plus de six mille — le compte exact varie légèrement selon les écoles de dénombrement.' },

    { n: 3, t: 'livre', q: 'Quelle sourate contient deux fois la Basmala ?',
      r: ['An-Naml', 'Al-Baqara', 'At-Tawba', 'Al-Fatiha'], b: 0,
      info: 'Une au début, comme les autres — et une seconde à l’intérieur, au verset 30.' },

    { n: 3, t: 'recits', q: 'Pourquoi la Basmala apparaît-elle une seconde fois dans An-Naml ?',
      r: ['Elle ouvre la lettre de Sulayman à la reine de Saba', 'Elle marque le milieu du Coran', 'Elle sépare deux récits', 'Elle conclut la sourate'], b: 0,
      info: 'La reine lit : « Elle est de Sulayman, et elle dit : au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux. »' },

    { n: 3, t: 'livre', q: 'Comment appelle-t-on les lettres isolées au début de certaines sourates, comme « Alif, Lam, Mim » ?',
      r: ['Les huruf muqatta‘at', 'Les qira’at', 'Les ahruf', 'Les waqf'], b: 0,
      info: 'Vingt-neuf sourates s’ouvrent ainsi. Leur sens exact fait partie de ce qu’Allah seul connaît avec certitude.' },

    { n: 3, t: 'recits', q: 'Lequel de ces récits ne figure PAS dans la sourate Al-Kahf ?',
      r: ['Yusuf et ses frères', 'Les gens de la caverne', 'L’homme aux deux jardins', 'Dhul-Qarnayn'], b: 0,
      info: 'Al-Kahf enchaîne quatre récits — la caverne, les deux jardins, le voyage de Musa, et Dhul-Qarnayn.' },

    { n: 3, t: 'recits', q: 'Dans la sourate Al-Kahf, qui Musa accompagne-t-il dans un voyage plein de leçons ?',
      r: ['Un serviteur d’Allah à qui une science particulière avait été donnée', 'Son frère Harun', 'Dhul-Qarnayn', 'Un roi de Madyan'], b: 0,
      info: 'Le Coran ne le nomme pas : il dit « un serviteur parmi Nos serviteurs, à qui Nous avions enseigné une science venant de Nous ».' },

    { n: 3, t: 'sourates', q: 'Quel événement la sourate Al-Isra’ évoque-t-elle dès son premier verset ?',
      r: ['Le voyage nocturne du Prophète ﷺ', 'La bataille de Badr', 'La conquête de La Mecque', 'Le pacte de Hudaybiyya'], b: 0,
      info: '« Gloire à Celui qui de nuit fit voyager Son serviteur de la Mosquée sacrée à la Mosquée la plus éloignée. »' },

    { n: 3, t: 'recits', q: 'Dans quelle sourate est racontée la fixation de la qibla vers la Ka‘ba ?',
      r: ['Al-Baqara', 'An-Nisa', 'Al-Ma’ida', 'Al-Anfal'], b: 0,
      info: '« Tourne donc ton visage vers la Mosquée sacrée. » Le changement eut lieu à Médine.' },

    { n: 3, t: 'mots', q: 'Que signifie « wahy » ?',
      r: ['La révélation', 'La prière', 'L’aumône', 'La patience'], b: 0,
      info: 'C’est le mot qui désigne la parole d’Allah descendue sur Ses prophètes.' },

    { n: 3, t: 'sourates', q: 'Laquelle de ces sourates ne porte PAS le nom d’un prophète ?',
      r: ['Al-Hujurat', 'Yunus', 'Ibrahim', 'Nuh'], b: 0,
      info: 'Al-Hujurat veut dire « Les Appartements ». Plusieurs sourates, elles, portent bien un nom de prophète.' },

    { n: 3, t: 'mots', q: 'Que désigne « Al-Mu‘awwidhatan » ?',
      r: ['Al-Falaq et An-Nas', 'Al-Fatiha et Al-Ikhlas', 'Les deux plus longues sourates', 'Les deux sourates médinoises'], b: 0,
      info: 'Littéralement « les deux qui font chercher refuge » : toutes deux commencent par « Dis : je cherche protection… ».' },

    { n: 3, t: 'mots', q: 'Que désigne un « juz’ » ?',
      r: ['Une des trente parties du Coran', 'Un verset', 'Une page', 'Une sourate'], b: 0,
      info: 'Trente juz’ pour tout le Coran — d’où la lecture d’un juz’ par jour pendant Ramadan.' },

    { n: 3, t: 'mots', q: 'Que désigne un « hizb » ?',
      r: ['La moitié d’un juz’', 'Un dixième de sourate', 'Un groupe de versets courts', 'Une page du mushaf'], b: 0,
      info: 'Soixante hizb pour trente juz’. Chaque hizb se divise encore en quarts.' },

    { n: 3, t: 'livre', q: 'Que signale le symbole ۞ en marge du mushaf ?',
      r: ['Un quart de hizb', 'La fin d’une sourate', 'Un verset de prosternation', 'Un arrêt obligatoire'], b: 0,
      info: 'On l’appelle « rub‘ al-hizb ». Il aide à découper la lecture en portions régulières.' },

    { n: 3, t: 'livre', q: 'Que signale le symbole ۩ dans le mushaf ?',
      r: ['Un verset de prosternation', 'La fin d’un juz’', 'Une pause recommandée', 'Un verset abrogé'], b: 0,
      info: 'C’est une sajda de récitation : celui qui lit ou entend ce verset se prosterne.' },

    { n: 3, t: 'mots', q: 'Comment appelle-t-on les différentes manières authentiques de réciter le Coran ?',
      r: ['Les qira’at', 'Les tafsir', 'Les madhahib', 'Les ahadith'], b: 0,
      info: 'Plusieurs lectures transmises de génération en génération, avec de petites différences de prononciation.' },

    { n: 3, t: 'mots', q: 'Que désigne « asbab an-nuzul » ?',
      r: ['Les circonstances de la révélation d’un verset', 'Les règles de récitation', 'Les noms des sourates', 'L’ordre de compilation'], b: 0,
      info: 'Beaucoup de versets répondent à un événement précis : les connaître aide à en comprendre le sens.' },

    { n: 3, t: 'prophetes', q: 'Quel prophète le Coran appelle-t-il « Khalil » — l’ami intime d’Allah ?',
      r: ['Ibrahim', 'Musa', '‘Isa', 'Nuh'], b: 0,
      info: '« Et Allah avait pris Ibrahim pour ami privilégié. »' },

    { n: 3, t: 'prophetes', q: 'Quel prophète est distingué comme celui à qui Allah a parlé directement ?',
      r: ['Musa', 'Ibrahim', 'Dawud', 'Yahya'], b: 0,
      info: '« Et Allah a parlé à Musa, de vive voix. » D’où son surnom : Kalim Allah.' },

    { n: 3, t: 'prophetes', q: 'Quel prophète est appelé « Dhun-Nun » dans le Coran ?',
      r: ['Yunus', 'Ayyub', 'Ilyas', 'Al-Yasa‘'], b: 0,
      info: '« Celui du poisson ». Son invocation dans les ténèbres est restée célèbre.' },

    { n: 3, t: 'sourates', q: 'Quelle sourate porte le nom de la tribu qui gardait la Ka‘ba à La Mecque ?',
      r: ['Quraysh', 'Al-Hujurat', 'Al-Ma‘un', 'At-Takathur'], b: 0,
      info: 'Elle rappelle à Quraysh les bienfaits reçus : la sécurité, et les caravanes d’hiver et d’été.' },

    { n: 3, t: 'sourates', q: 'De qui parle la sourate Al-Masad ?',
      r: ['D’Abu Lahab, oncle hostile du Prophète ﷺ', 'De Pharaon', 'De Qarun', 'D’Abraha'], b: 0,
      info: 'Elle fut révélée alors qu’il était encore vivant — et il ne s’est jamais démenti.' },

    { n: 3, t: 'sourates', q: 'Quelle sourate enseigne à distinguer clairement sa croyance de celle des autres, sans conflit ?',
      r: ['Al-Kafirun', 'An-Nasr', 'Al-Humaza', 'Al-Ma‘un'], b: 0,
      info: 'Elle se termine par : « À vous votre religion, et à moi ma religion. »' },

    { n: 3, t: 'sourates', q: 'Par quoi Allah jure-t-Il au début de la sourate Al-‘Asr ?',
      r: ['Par le Temps', 'Par le Soleil', 'Par la Lune', 'Par la Nuit'], b: 0,
      info: 'Trois versets seulement, et tout y est : le temps qui passe, la foi, les bonnes œuvres, la patience.' },

    { n: 3, t: 'sourates', q: 'Quelle sourate décrit le grand tremblement de terre du Jour dernier ?',
      r: ['Az-Zalzala', 'Al-Qari‘a', 'At-Takwir', 'Al-Infitar'], b: 0,
      info: '« Quiconque fait un poids d’atome de bien le verra, et quiconque fait un poids d’atome de mal le verra. »' },

    { n: 3, t: 'sourates', q: 'Que veut dire « At-Tin » ?',
      r: ['Le Figuier', 'L’Olivier', 'La Vigne', 'Le Palmier'], b: 0,
      info: 'La sourate s’ouvre sur un serment : « Par le figuier et l’olivier. »' },

    { n: 3, t: 'sourates', q: 'Quel verset est répété tout au long de la sourate Ar-Rahman ?',
      r: ['« Lequel donc des bienfaits de votre Seigneur nierez-vous ? »', '« Louange à Allah, Seigneur des mondes »', '« En vérité, avec la difficulté vient la facilité »', '« Dis : Il est Allah, Unique »'], b: 0,
      info: 'La question revient après chaque bienfait cité — la mer, les fruits, le soleil, le Paradis.' },

    { n: 3, t: 'sourates', q: 'Combien de fois ce verset est-il répété dans Ar-Rahman ?',
      r: ['31 fois', '7 fois', '19 fois', '99 fois'], b: 0,
      info: 'Trente et une fois. La sourate est parfois appelée « la parure du Coran ».' },

    { n: 3, t: 'sourates', q: 'Que veut dire « Al-Ma’ida » ?',
      r: ['La Table servie', 'La Récompense', 'La Preuve', 'L’Assemblée'], b: 0,
      info: 'Le nom vient de la table descendue du ciel à la demande des disciples de ‘Isa.' },

    { n: 3, t: 'sourates', q: 'Que veut dire « Al-Anfal » ?',
      r: ['Le Butin', 'Les Alliés', 'Les Bienfaits', 'Les Rangs'], b: 0,
      info: 'La sourate fut révélée après la bataille de Badr et traite du partage de ce qui avait été pris.' },

    { n: 3, t: 'livre', q: 'Quelle sourate compte le plus grand nombre de versets ?',
      r: ['Al-Baqara, 286 versets', 'An-Nisa, 176 versets', 'Ash-Shu‘ara, 227 versets', 'Al ‘Imran, 200 versets'], b: 0,
      info: 'Ash-Shu‘ara en compte davantage que Al ‘Imran, mais Al-Baqara reste la première, en versets comme en longueur.' },

    { n: 3, t: 'pratique', q: 'Que demande le Coran avant de commencer la récitation ?',
      r: ['De chercher protection auprès d’Allah contre Shaytan', 'De se tourner vers l’est', 'De réciter à voix haute', 'De jeûner ce jour-là'], b: 0,
      info: '« Quand tu lis le Coran, demande la protection d’Allah contre le diable banni. »' },

    { n: 3, t: 'pratique', q: 'Selon le Coran, comment faut-il écouter la récitation du Coran ?',
      r: ['En écoutant et en se taisant', 'En répétant à voix haute', 'En se levant', 'En fermant les yeux'], b: 0,
      info: '« Quand on récite le Coran, prêtez-y l’oreille et gardez le silence, afin que vous receviez la miséricorde. »' },

    { n: 3, t: 'livre', q: 'Comment le Coran se décrit-il lui-même vis-à-vis des révélations précédentes ?',
      r: ['Comme les confirmant et les préservant', 'Comme les remplaçant sans lien', 'Comme les ignorant', 'Comme un simple résumé'], b: 0,
      info: '« Confirmant les Livres qui l’ont précédé et prévalant sur eux. »' },

    /* ——— Ce que le Coran demande, au quotidien ——— */

    { n: 1, t: 'pratique', q: 'Que dit la sourate Ad-Duha au sujet de l’orphelin ?',
      r: ['« Ne le maltraite pas »', '« Ne lui parle pas »', '« Laisse-le tranquille »', '« Confie-le à un autre »'], b: 0,
      info: '« Quant à l’orphelin, ne le maltraite pas. Et quant à celui qui demande, ne le repousse pas. »' },

    { n: 1, t: 'pratique', q: 'Comment le Coran demande-t-il de parler aux gens ?',
      r: ['En leur disant de bonnes paroles', 'En parlant fort', 'En parlant le moins possible', 'En parlant seulement aux proches'], b: 0,
      info: '« Et dites aux gens de bonnes paroles. » C’est un ordre donné dans la sourate Al-Baqara.' },

    { n: 2, t: 'pratique', q: 'Selon la sourate Al-Hujurat, que faut-il faire quand une nouvelle douteuse nous parvient ?',
      r: ['La vérifier avant d’agir', 'La transmettre vite', 'L’oublier aussitôt', 'En rire'], b: 0,
      info: '« Si un pervers vous apporte une nouvelle, vérifiez, de peur de causer du tort par ignorance. » Un verset très utile aujourd’hui.' },

    { n: 2, t: 'pratique', q: 'Que blâme la sourate Al-Hujurat entre croyants ?',
      r: ['Se moquer des autres et les surnommer méchamment', 'Voyager loin', 'Poser trop de questions', 'Parler plusieurs langues'], b: 0,
      info: '« Que des gens ne se raillent pas d’autres gens… et ne vous donnez pas de vilains sobriquets. »' },

    { n: 2, t: 'pratique', q: 'Selon le Coran, à quoi le musulman doit-il demander secours dans l’épreuve ?',
      r: ['À la patience et à la prière', 'À la richesse', 'Au silence', 'Au voyage'], b: 0,
      info: '« Cherchez secours dans l’endurance et la salat. » (Al-Baqara)' },

    { n: 3, t: 'pratique', q: 'Que dit la sourate Al-Ma’ida sur celui qui sauve une seule vie ?',
      r: ['C’est comme s’il avait sauvé tous les hommes', 'Il sera récompensé une fois', 'Cela efface une erreur', 'Cela ne concerne que sa famille'], b: 0,
      info: '« Quiconque sauve une vie, c’est comme s’il avait sauvé l’humanité tout entière. »' },

    { n: 3, t: 'pratique', q: 'Selon la sourate Al-Ma’ida, que ne doit jamais provoquer l’inimitié envers un groupe ?',
      r: ['Elle ne doit pas pousser à être injuste', 'Elle ne doit pas être dite à voix haute', 'Elle ne doit pas durer un an', 'Elle ne doit pas être écrite'], b: 0,
      info: '« Que la haine pour un peuple ne vous incite pas à être injustes. Soyez justes : cela est plus proche de la piété. »' },

    { n: 3, t: 'pratique', q: 'Que blâme la sourate Al-Ma‘un chez celui qui « traite de mensonge la Rétribution » ?',
      r: ['Il repousse l’orphelin et néglige sa prière', 'Il voyage trop', 'Il parle trop fort', 'Il dort le jour'], b: 0,
      info: 'La sourate lie la foi aux actes : croire, c’est aussi nourrir le pauvre et ne pas repousser l’orphelin.' },

    { n: 2, t: 'mots', q: 'Comment appelle-t-on le fait de lire le Coran en entier, du début à la fin ?',
      r: ['Une khatma', 'Une sajda', 'Un tafsir', 'Une qira’a'], b: 0,
      info: 'Beaucoup essaient d’en achever une pendant le mois de Ramadan, à raison d’un juz’ par jour.' },

    { n: 2, t: 'mots', q: 'Que désigne le mot « Basmala » ?',
      r: ['La formule « Bismillah ar-Rahman ar-Rahim »', 'Le premier verset d’Al-Fatiha uniquement', 'La fin d’une sourate', 'Le titre d’une sourate'], b: 0,
      info: 'On la prononce avant de lire, de manger, d’écrire — au début de toute chose.' }
  ];

  global.QUESTIONS = QUESTIONS;
  global.THEMES = THEMES;
  global.NIVEAUX = NIVEAUX;
})(window);
