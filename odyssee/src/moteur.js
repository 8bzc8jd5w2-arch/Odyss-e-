/* L'Odyssée — moteur de jeu.
   Sans dépendance, sans build : ouvrez index.html dans un navigateur. */

(function (global) {
  'use strict';

  const CLE = 'odyssee.sauvegarde.v1';
  const MAX_STAT = 10, MIN_STAT = 0;
  const $ = (sel) => document.querySelector(sel);

  /* ————— état ————— */

  function etatNeuf() {
    return {
      scene: global.DEBUT,
      vigueur: 5,
      ruse: 5,
      faveur: 1,
      equipage: 608,
      jours: 0,
      objets: [],
      drapeaux: {},
      journal: [],
      vus: [],
      dernierJet: null,
      force_finale: 0
    };
  }

  let S = etatNeuf();

  /* ————— utilitaires ————— */

  const borne = (v, min, max) => Math.max(min, Math.min(max, v));
  const de6 = () => 1 + Math.floor(Math.random() * 6);

  function appliquer(eff) {
    if (!eff) return;
    if (eff.vigueur) S.vigueur = borne(S.vigueur + eff.vigueur, MIN_STAT, MAX_STAT);
    if (eff.ruse) S.ruse = borne(S.ruse + eff.ruse, MIN_STAT, MAX_STAT);
    if (eff.faveur) S.faveur = borne(S.faveur + eff.faveur, -10, 10);
    if (eff.equipage) S.equipage = Math.max(0, S.equipage + eff.equipage);
    if (eff.jours) S.jours += eff.jours;
    if (eff.objets) eff.objets.forEach((o) => { if (!S.objets.includes(o)) S.objets.push(o); });
    if (eff.retire) S.objets = S.objets.filter((o) => !eff.retire.includes(o));
    if (eff.drapeaux) Object.assign(S.drapeaux, eff.drapeaux);
    if (eff.note) noter(eff.note);
  }

  function noter(texte) {
    S.journal.push({ jour: S.jours, texte: texte });
  }

  function presage() {
    const f = S.faveur;
    if (f >= 6) return { t: 'Les dieux te portent', c: 'bon' };
    if (f >= 2) return { t: 'Le ciel est clément', c: 'bon' };
    if (f >= -1) return { t: 'Les dieux se taisent', c: 'neutre' };
    if (f >= -4) return { t: 'Quelque chose t’en veut', c: 'mauvais' };
    return { t: 'La mer se souvient de ton nom', c: 'mauvais' };
  }

  /* ————— résolution ————— */

  function resoudreTest(test) {
    const base = S[test.stat] || 0;
    const jet = de6();
    let bonus = 0;
    if (S.faveur >= 5) bonus += 1;
    if (S.faveur <= -3) bonus -= 1;
    const total = jet + base + bonus;
    const reussi = total >= test.seuil;
    const nomStat = test.stat === 'ruse' ? 'Ruse' : 'Vigueur';
    S.dernierJet = {
      reussi: reussi,
      texte: `${nomStat} — dé ${jet} + ${base}${bonus ? (bonus > 0 ? ' + 1 (faveur)' : ' − 1 (disgrâce)') : ''} = ${total} contre ${test.seuil} · ${reussi ? 'réussite' : 'échec'}`
    };
    const issue = reussi ? test.reussite : test.echec;
    appliquer(issue.eff);
    return issue.va;
  }

  function choisir(i) {
    const sc = global.HISTOIRE[S.scene];
    const ch = sc.choix[i];
    if (!ch || (ch.si && !ch.si(S))) return;
    S.dernierJet = null;
    appliquer(ch.eff);
    let dest;
    if (ch.test) dest = resoudreTest(ch.test);
    else if (ch.cible_conditionnelle) dest = ch.cible_conditionnelle(S);
    else dest = ch.va;
    aller(dest);
  }

  function aller(id) {
    const sc = global.HISTOIRE[id];
    if (!sc) { console.error('Scène inconnue :', id); return; }
    S.scene = id;
    if (!S.vus.includes(id)) S.vus.push(id);
    if (sc.entree) sc.entree(S);
    S.vigueur = borne(S.vigueur, MIN_STAT, MAX_STAT);
    S.ruse = borne(S.ruse, MIN_STAT, MAX_STAT);
    S.faveur = borne(S.faveur, -10, 10);
    if (sc.titre && !sc.fin) noter('— ' + sc.titre);
    sauver();
    rendre();
  }

  /* ————— rendu ————— */

  function jauge(valeur, max, classe) {
    const n = Math.round((valeur / max) * 10);
    let html = '';
    for (let i = 0; i < 10; i++) html += `<i class="${i < n ? 'plein ' + classe : 'vide'}"></i>`;
    return `<span class="jauge">${html}</span>`;
  }

  function rendreStats() {
    const p = presage();
    const fav = Math.round(((S.faveur + 10) / 20) * 10);
    $('#stats').innerHTML = `
      <div class="stat"><span class="lab">Vigueur</span>${jauge(S.vigueur, MAX_STAT, 'v')}<span class="val">${S.vigueur}</span></div>
      <div class="stat"><span class="lab">Ruse</span>${jauge(S.ruse, MAX_STAT, 'r')}<span class="val">${S.ruse}</span></div>
      <div class="stat"><span class="lab">Faveur</span>${jauge(fav, 10, 'f')}<span class="val">${S.faveur > 0 ? '+' : ''}${S.faveur}</span></div>
      <div class="stat ligne"><span class="lab">Équipage</span><span class="val gros">${S.equipage}</span></div>
      <div class="stat ligne"><span class="lab">Jours depuis Troie</span><span class="val gros">${S.jours}</span></div>
      <div class="presage ${p.c}">${p.t}</div>`;

    $('#objets').innerHTML = S.objets.length
      ? S.objets.map((o) => `<li>${o}</li>`).join('')
      : '<li class="rien">Rien que tes mains</li>';
  }

  function rendreJournal() {
    const j = S.journal.slice().reverse();
    $('#journal').innerHTML = j.length
      ? j.map((e) => `<li${e.texte.startsWith('—') ? ' class="etape"' : ''}><span class="j">j+${e.jour}</span> ${e.texte.replace(/^— /, '')}</li>`).join('')
      : '<li class="rien">Le récit commence.</li>';
  }

  function rendre() {
    const sc = global.HISTOIRE[S.scene];
    rendreStats();
    rendreJournal();

    const texte = typeof sc.txt === 'function' ? sc.txt(S) : sc.txt;
    const paras = texte.split('\n\n').map((p) => `<p>${p.replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>')}</p>`).join('');

    const jet = S.dernierJet
      ? `<div class="jet ${S.dernierJet.reussi ? 'ok' : 'ko'}">${S.dernierJet.texte}</div>`
      : '';

    let choixHtml = '';
    if (sc.fin) {
      const tons = { lumineuse: 'Fin lumineuse', sombre: 'Fin sombre', ambigue: 'Fin ambiguë', douce: 'Fin douce' };
      choixHtml = `<div class="fin-bloc ${sc.fin}">
          <p class="fin-label">${tons[sc.fin] || 'Fin'} · découverte ${S.vus.length} scènes sur ${Object.keys(global.HISTOIRE).length}</p>
          <button class="choix recommencer" data-recommencer>Reprendre la mer depuis Troie</button>
        </div>`;
    } else {
      choixHtml = '<ol class="choix-liste">' + sc.choix.map((c, i) => {
        const dispo = !c.si || c.si(S);
        const marque = c.test ? `<span class="dé">jet de ${c.test.stat}</span>` : '';
        return `<li><button class="choix${dispo ? '' : ' verrou'}" data-i="${i}" ${dispo ? '' : 'disabled'}>
            <span class="num">${i + 1}</span>
            <span class="txt">${c.t}${marque}${dispo ? '' : `<span class="raison">${c.verrou || 'Hors de ta portée.'}</span>`}</span>
          </button></li>`;
      }).join('') + '</ol>';
    }

    $('#scene').innerHTML = `
      <header class="scene-tete">
        <span class="chap">Chant ${sc.chap || '?'}</span>
        <span class="lieu">${sc.lieu || ''}</span>
      </header>
      <h2>${sc.titre}</h2>
      ${jet}
      <div class="corps">${paras}</div>
      ${choixHtml}`;

    $('#scene').scrollTop = 0;
    $('#scene').classList.remove('entree');
    void $('#scene').offsetWidth;
    $('#scene').classList.add('entree');
  }

  /* ————— sauvegarde ————— */

  function sauver() {
    try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) { /* mode privé */ }
  }

  function charger() {
    try {
      const brut = localStorage.getItem(CLE);
      if (!brut) return false;
      const o = JSON.parse(brut);
      if (!o || !global.HISTOIRE[o.scene]) return false;
      S = Object.assign(etatNeuf(), o);
      return true;
    } catch (e) { return false; }
  }

  function recommencer() {
    S = etatNeuf();
    S.vus = [];
    aller(global.DEBUT);
  }

  /* ————— entrées ————— */

  function brancher() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-recommencer')) return recommencer();
      if (b.dataset.i !== undefined) return choisir(Number(b.dataset.i));
      if (b.id === 'btn-recommencer') {
        if (confirm('Tout recommencer depuis le cheval de Troie ?')) recommencer();
      }
      if (b.id === 'btn-panneau') document.body.classList.toggle('panneau-ouvert');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '9') {
        const btn = document.querySelector(`.choix[data-i="${Number(e.key) - 1}"]:not([disabled])`);
        if (btn) btn.click();
      }
      if (e.key === 'Escape') document.body.classList.remove('panneau-ouvert');
    });
  }

  function demarrer() {
    brancher();
    if (charger()) {
      rendre();
      noterReprise();
    } else {
      aller(global.DEBUT);
    }
  }

  function noterReprise() {
    const b = document.createElement('div');
    b.className = 'reprise';
    b.textContent = 'Partie reprise là où tu l’avais laissée.';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 4000);
  }

  global.Odyssee = { demarrer: demarrer, etat: () => S, aller: aller, recommencer: recommencer };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})(window);
