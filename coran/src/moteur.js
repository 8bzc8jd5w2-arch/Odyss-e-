/* Iqra’ — moteur du quiz.
   Sans dépendance : ouvrez index.html dans un navigateur. */

(function (global) {
  'use strict';

  const CLE = 'iqra.progres.v1';
  const LONGUEUR = 10;         // questions par partie
  const POINTS = 10;           // points d'une bonne réponse
  const BONUS_MAX = 10;        // bonus de série maximum

  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const MEDAILLES = [
    { id: 'debut',      nom: 'Premier pas',        cond: 'Terminer une partie' },
    { id: 'serie5',     nom: 'Cinq d’affilée',     cond: 'Enchaîner 5 bonnes réponses' },
    { id: 'sansFaute',  nom: 'Sans faute',         cond: 'Réussir les 10 questions' },
    { id: 'niveaux',    nom: 'Les trois niveaux',  cond: 'Terminer une partie à chaque niveau' },
    { id: 'themes',     nom: 'Les six thèmes',     cond: 'Jouer les six thèmes' },
    { id: 'cent',       nom: 'Cent réponses',      cond: 'Cumuler 100 bonnes réponses' }
  ];

  /* ————— progrès conservé d'une partie à l'autre ————— */

  function progresNeuf() {
    return { parties: 0, justes: 0, repondues: 0, meilleurPct: 0, niveauxFinis: [], themesJoues: [], medailles: [] };
  }

  let P = progresNeuf();

  function lireProgres() {
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) P = Object.assign(progresNeuf(), JSON.parse(brut));
    } catch (e) { /* navigation privée : on joue sans mémoire */ }
  }

  function ecrireProgres() {
    try { localStorage.setItem(CLE, JSON.stringify(P)); } catch (e) { /* idem */ }
  }

  /* ————— partie en cours ————— */

  let J = null;                 // partie ; null tant qu'on est à l'accueil
  let niveau = 1;
  let themesChoisis = [];       // vide = tous les thèmes

  const melanger = (t) => {
    const a = t.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  function piocher() {
    const themesOk = (q) => !themesChoisis.length || themesChoisis.includes(q.t);
    let pool = global.QUESTIONS.filter((q) => q.n === niveau && themesOk(q));
    let elargi = false;
    if (pool.length < LONGUEUR) {
      const complement = global.QUESTIONS.filter((q) => q.n !== niveau && themesOk(q));
      pool = pool.concat(melanger(complement).slice(0, LONGUEUR - pool.length));
      elargi = true;
    }
    return {
      elargi: elargi,
      questions: melanger(pool).slice(0, LONGUEUR).map((q) => {
        const ordre = melanger(q.r.map((texte, i) => ({ texte: texte, juste: i === q.b })));
        return { q: q, ordre: ordre, bonne: ordre.findIndex((o) => o.juste) };
      })
    };
  }

  function commencer() {
    const tirage = piocher();
    J = {
      questions: tirage.questions,
      elargi: tirage.elargi,
      i: 0,
      score: 0,
      serie: 0,
      meilleureSerie: 0,
      reponses: [],       // index choisi par question, -1 tant qu'on n'a pas répondu
      repondu: false
    };
    rendre();
  }

  function repondre(choix) {
    if (!J || J.repondu) return;
    const q = J.questions[J.i];
    const juste = choix === q.bonne;
    J.repondu = true;
    J.reponses.push({ choix: choix, juste: juste });

    if (juste) {
      J.serie += 1;
      J.meilleureSerie = Math.max(J.meilleureSerie, J.serie);
      J.gain = POINTS + Math.min((J.serie - 1) * 2, BONUS_MAX);
      J.score += J.gain;
    } else {
      J.serie = 0;
      J.gain = 0;
    }

    P.repondues += 1;
    if (juste) P.justes += 1;
    ecrireProgres();
    rendre();
  }

  function suivante() {
    if (!J || !J.repondu) return;
    if (J.i + 1 >= J.questions.length) return terminer();
    J.i += 1;
    J.repondu = false;
    rendre();
  }

  function terminer() {
    const justes = J.reponses.filter((r) => r.juste).length;
    const pct = Math.round((justes / J.questions.length) * 100);

    P.parties += 1;
    P.meilleurPct = Math.max(P.meilleurPct, pct);
    if (!P.niveauxFinis.includes(niveau)) P.niveauxFinis.push(niveau);
    const joues = themesChoisis.length ? themesChoisis : Object.keys(global.THEMES);
    joues.forEach((t) => { if (!P.themesJoues.includes(t)) P.themesJoues.push(t); });

    const gagnees = [];
    const donner = (id) => { if (!P.medailles.includes(id)) { P.medailles.push(id); gagnees.push(id); } };
    donner('debut');
    if (J.meilleureSerie >= 5) donner('serie5');
    if (justes === J.questions.length) donner('sansFaute');
    if (P.niveauxFinis.length >= 3) donner('niveaux');
    if (P.themesJoues.length >= Object.keys(global.THEMES).length) donner('themes');
    if (P.justes >= 100) donner('cent');

    ecrireProgres();
    J.fini = true;
    J.bilan = { justes: justes, pct: pct, gagnees: gagnees };
    rendre();
  }

  /* ————— rendu ————— */

  function mention(pct) {
    if (pct === 100) return { t: 'Sans faute. Ma sha Allah.', d: 'Dix sur dix — tu peux passer au niveau au-dessus.' };
    if (pct >= 80) return { t: 'Très bien', d: 'Tu maîtrises presque tout ce niveau.' };
    if (pct >= 60) return { t: 'Bien', d: 'Une bonne base. Relis les réponses manquées ci-dessous.' };
    if (pct >= 40) return { t: 'Continue', d: 'La moitié du chemin. Rejoue le même thème pour l’ancrer.' };
    return { t: 'À revoir tranquillement', d: 'Prends le temps de lire chaque explication : c’est là qu’on apprend.' };
  }

  function vueAccueil() {
    const niveaux = Object.entries(global.NIVEAUX).map(([n, v]) => `
      <button class="niveau" data-niveau="${n}" aria-pressed="${Number(n) === niveau}">
        <span class="pastille"><span>${n}</span></span>
        <span><span class="nom">${esc(v.nom)}</span><span class="desc">${esc(v.desc)}</span></span>
        <span class="age">${esc(v.age)}</span>
      </button>`).join('');

    const themes = Object.entries(global.THEMES).map(([id, v]) => `
      <button class="theme" data-theme="${id}" aria-pressed="${themesChoisis.includes(id)}"
              title="${esc(v.desc)}">${esc(v.nom)}</button>`).join('');

    const dispo = global.QUESTIONS.filter((q) => q.n === niveau &&
      (!themesChoisis.length || themesChoisis.includes(q.t))).length;

    const medailles = MEDAILLES.map((m) => {
      const acquise = P.medailles.includes(m.id);
      return `<div class="medaille${acquise ? ' acquise' : ''}"><i></i><span>${esc(m.nom)}<small>${esc(m.cond)}</small></span></div>`;
    }).join('');

    return `
      <section class="carte ecran">
        <h2>Choisis ton niveau</h2>
        <p class="legende">Dix questions par partie. Après chaque réponse, tu apprends pourquoi.</p>
        <div class="niveaux">${niveaux}</div>

        <p class="titre-rubrique">Thèmes — laisse vide pour tout mélanger</p>
        <div class="themes">${themes}</div>

        <div class="actions">
          <button class="bouton" id="jouer">Commencer</button>
          <span class="legende" style="margin:0">${dispo} question${dispo > 1 ? 's' : ''} à ce niveau${themesChoisis.length ? ' pour ces thèmes' : ''}</span>
        </div>
      </section>

      <section class="carte">
        <p class="titre-rubrique">Ton parcours</p>
        <div class="chiffres-cles">
          <span><b>${P.parties}</b>partie${P.parties > 1 ? 's' : ''}</span>
          <span><b>${P.justes}</b>bonnes réponses</span>
          <span><b>${P.repondues ? Math.round((P.justes / P.repondues) * 100) : 0} %</b>de réussite</span>
          <span><b>${P.meilleurPct} %</b>meilleure partie</span>
        </div>
        <p class="titre-rubrique">Médailles</p>
        <div class="medailles">${medailles}</div>
      </section>`;
  }

  function vueQuiz() {
    const q = J.questions[J.i];
    const pastilles = J.questions.map((_, i) => {
      const r = J.reponses[i];
      const c = r ? (r.juste ? 'juste' : 'faux') : (i === J.i ? 'active' : '');
      return `<i class="${c}"></i>`;
    }).join('');

    const reponses = q.ordre.map((o, i) => {
      let classe = '', marque = String(i + 1);
      if (J.repondu) {
        if (i === q.bonne) { classe = ' bonne'; marque = '✓'; }
        else if (i === J.reponses[J.i].choix) { classe = ' mauvaise'; marque = '✗'; }
        else classe = ' eteinte';
      }
      return `<li><button class="reponse${classe}" data-rep="${i}"${J.repondu ? ' disabled' : ''}>
          <span class="pastille"><span>${marque}</span></span>
          <span>${esc(o.texte)}</span>
        </button></li>`;
    }).join('');

    const retour = J.repondu ? (() => {
      const juste = J.reponses[J.i].juste;
      return `<div class="retour ${juste ? 'ok' : 'ko'}" role="status">
          ${juste ? `<span class="points">+${J.gain}</span>` : ''}
          <p class="verdict">${juste ? 'Bonne réponse.' : 'Ce n’était pas la bonne — celle marquée ✓ était la bonne.'}</p>
          <p class="info">${esc(q.q.info)}</p>
        </div>
        <div class="suite"><button class="bouton" id="suivante">
          ${J.i + 1 >= J.questions.length ? 'Voir le résultat' : 'Question suivante'}
        </button></div>`;
    })() : '';

    return `
      <section class="carte ecran">
        <div class="barre">
          <div class="pastilles" aria-label="Progression">${pastilles}</div>
          <div class="compteurs">
            <span>Score <b>${J.score}</b></span>
            <span class="${J.serie >= 2 ? 'serie-vive' : ''}">Série <b>${J.serie}</b></span>
          </div>
        </div>

        ${J.elargi ? '<p class="avis">Peu de questions pour ce choix : la partie a été complétée avec des questions des autres niveaux.</p>' : ''}

        <p class="etiquette">Question ${J.i + 1} sur ${J.questions.length} · ${esc(global.THEMES[q.q.t].nom)}</p>
        <p class="question">${esc(q.q.q)}</p>
        <ol class="reponses">${reponses}</ol>
        ${retour}
      </section>
      <p class="pied clavier">Touches 1 à 4 pour répondre · Entrée pour continuer</p>`;
  }

  function vueResultat() {
    const b = J.bilan;
    const m = mention(b.pct);

    const revue = J.questions.map((q, i) => {
      const r = J.reponses[i];
      return `<li class="${r.juste ? 'ok' : ''}">
          <p class="q">${i + 1}. ${esc(q.q.q)}</p>
          <p class="bonne-rep">✓ ${esc(q.ordre[q.bonne].texte)}</p>
          ${r.juste ? '' : `<p class="ta-rep">Ta réponse : ${esc(q.ordre[r.choix].texte)}</p>`}
          <p class="info">${esc(q.q.info)}</p>
        </li>`;
    }).join('');

    const nouvelles = b.gagnees.length
      ? `<p class="avis">Nouvelle${b.gagnees.length > 1 ? 's' : ''} médaille${b.gagnees.length > 1 ? 's' : ''} :
         ${b.gagnees.map((id) => esc(MEDAILLES.find((x) => x.id === id).nom)).join(', ')}.</p>`
      : '';

    return `
      <section class="carte ecran">
        <div class="score-bloc">
          <p class="etiquette">${esc(global.NIVEAUX[niveau].nom)}</p>
          <div><span class="chiffre">${b.justes}</span><span class="sur"> / ${J.questions.length}</span></div>
          <p class="mention">${esc(m.t)}</p>
          <p class="detail">${esc(m.d)} · ${J.score} points · meilleure série : ${J.meilleureSerie}</p>
        </div>
      </section>

      <section class="carte">
        ${nouvelles}
        <div class="actions">
          <button class="bouton" id="rejouer">Rejouer dix questions</button>
          <button class="bouton discret" id="accueil">Changer de niveau</button>
        </div>
      </section>

      <section class="carte">
        <p class="titre-rubrique">Toutes les réponses</p>
        <ol class="revue">${revue}</ol>
      </section>`;
  }

  function rendre() {
    let html;
    if (!J) html = vueAccueil();
    else if (J.fini) html = vueResultat();
    else html = vueQuiz();
    $('#app').innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ————— interactions ————— */

  function brancher() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;

      if (b.dataset.niveau) { niveau = Number(b.dataset.niveau); return rendre(); }
      if (b.dataset.theme) {
        const t = b.dataset.theme;
        themesChoisis = themesChoisis.includes(t)
          ? themesChoisis.filter((x) => x !== t)
          : themesChoisis.concat(t);
        return rendre();
      }
      if (b.id === 'jouer' || b.id === 'rejouer') return commencer();
      if (b.id === 'accueil') { J = null; return rendre(); }
      if (b.dataset.rep !== undefined) return repondre(Number(b.dataset.rep));
      if (b.id === 'suivante') return suivante();
      if (b.id === 'btn-recommencer') {
        if (confirm('Effacer ton parcours et tes médailles ?')) {
          P = progresNeuf();
          ecrireProgres();
          J = null;
          rendre();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!J || J.fini) return;
      if (!J.repondu && e.key >= '1' && e.key <= '4') {
        const btn = document.querySelector(`.reponse[data-rep="${Number(e.key) - 1}"]`);
        if (btn) btn.click();
      }
      if (J.repondu && (e.key === 'Enter' || e.key === ' ')) {
        const btn = $('#suivante');
        if (btn) { e.preventDefault(); btn.click(); }
      }
    });
  }

  function demarrer() {
    lireProgres();
    brancher();
    rendre();
  }

  global.Iqra = { etat: () => ({ P: P, J: J, niveau: niveau, themes: themesChoisis }), rendre: rendre };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})(window);
