import * as THREE from 'three';

// Kõik mõõdud meetrites. Lastiruum 13,6 × 2,45 × 2,65 m.
export const DECK = { L: 13.6, W: 2.45, H: 2.65 };

export const KANDEVOIME = 24000;      // kg auto kohta
export const LDM_LAIUS = 2.4;         // laadimismeetri standardlaius (valemi jagaja)
export const LDM_MAX = 13.6;          // laadimismeetreid ühes autos

export const MATS = {
  seade:  { color: 0x5b8fb0, rough: 0.55, metal: 0.25, label: 'Seadmed' },
  raske:  { color: 0x6f9e6e, rough: 0.8,  metal: 0.0,  label: 'Rasked alused (22 tk)' },
  alus:   { color: 0xc98b28, rough: 0.75, metal: 0.0,  label: 'Muud kaubaalused' },
  toru:   { color: 0x4f5b63, rough: 0.6,  metal: 0.1,  label: 'Plasttorud' },
  kast:   { color: 0xd9cdb6, rough: 0.9,  metal: 0.0,  label: 'Karbid / kastid' },
};

// ——— Saadetised terminalis ———
// l × w × h meetrites ÜHE tüki kohta; qty = tükke; kg = rea kogukaal.
// ok = üks võimalik õige auto (näidislahenduses) — õigeid jaotusi on rohkem kui üks.
export const SHIPMENTS = [
  { id: 's1',  nimi: '1 alus',        mo: '200 × 165 × 115 cm',    qty: 1,  l: 2.0,  w: 1.65, h: 1.15, kg: 1500,  m: 'alus',  ok: 4 },
  { id: 's2',  nimi: '1 seade',       mo: '7600 × 2450 × 2600 mm', qty: 1,  l: 7.6,  w: 2.45, h: 2.6,  kg: 8050,  m: 'seade', ok: 1 },
  { id: 's3',  nimi: '1 alus',        mo: '0,95 × 0,9 × 0,8 m',    qty: 1,  l: 0.95, w: 0.9,  h: 0.8,  kg: 250,   m: 'alus',  ok: 4 },
  { id: 's4',  nimi: '1 seade',       mo: '1500 × 3000 × 2000 mm', qty: 1,  l: 3.0,  w: 1.5,  h: 2.0,  kg: 1700,  m: 'seade', ok: 3 },
  { id: 's5',  nimi: '3 EUR-alust',   mo: '1,2 × 0,8 m, h 1,2 m',  qty: 3,  l: 1.2,  w: 0.8,  h: 1.2,  kg: 1350,  m: 'alus',  ok: 1 },
  { id: 's6',  nimi: '10 plasttoru',  mo: 'Ø 60 cm, pikkus 6 m',   qty: 10, l: 6.0,  w: 0.6,  h: 0.6,  kg: 2000,  m: 'toru',  ok: 3, tube: true },
  { id: 's7',  nimi: '1 seade',       mo: '4800 × 2200 × 2500 mm', qty: 1,  l: 4.8,  w: 2.2,  h: 2.5,  kg: 10000, m: 'seade', ok: 1 },
  { id: 's8',  nimi: '10 karpi',      mo: '80 × 50 × 20 cm',       qty: 10, l: 0.8,  w: 0.5,  h: 0.2,  kg: 35,    m: 'kast',  ok: 3 },
  { id: 's9',  nimi: '22 alust',      mo: '1200 × 1200 × 1500 mm', qty: 22, l: 1.2,  w: 1.2,  h: 1.5,  kg: 24000, m: 'raske', ok: 2 },
  { id: 's10', nimi: '1 alus',        mo: '900 × 950 × 1200 mm',   qty: 1,  l: 0.9,  w: 0.95, h: 1.2,  kg: 300,   m: 'alus',  ok: 3 },
  { id: 's11', nimi: '4 HEP-alust',   mo: '0,8 × 0,6 m, h 1,5 m',  qty: 4,  l: 0.8,  w: 0.6,  h: 1.5,  kg: 400,   m: 'alus',  ok: 3 },
  { id: 's12', nimi: '2 alust',       mo: '120 × 80 × 55 cm',      qty: 2,  l: 1.2,  w: 0.8,  h: 0.55, kg: 200,   m: 'alus',  ok: 4 },
  { id: 's13', nimi: '1 kast',        mo: '2 × 1,6 × 1,4 m',       qty: 1,  l: 2.0,  w: 1.6,  h: 1.4,  kg: 425,   m: 'kast',  ok: 3 },
  { id: 's14', nimi: '2 seadet',      mo: '1200 × 2500 × 2300 mm', qty: 2,  l: 2.5,  w: 1.2,  h: 2.3,  kg: 2000,  m: 'seade', ok: 3 },
  { id: 's15', nimi: '4 alust',       mo: '105 × 90 × 105 cm',     qty: 4,  l: 1.05, w: 0.9,  h: 1.05, kg: 1364,  m: 'alus',  ok: 4 },
];

export const BY_ID = Object.fromEntries(SHIPMENTS.map((s) => [s.id, s]));

/** Mitu iseseisvat tükki saadetises on. Torusid tohib laduda ükshaaval. */
export function tukke(s) { return s.qty; }

/** Ühe toru arvestuslik põrandapind koondarvestuses.
 *  Kümme toru laotakse püramiidi 4+3+2+1. Alumine rida on 4 × 0,6 = 2,4 m,
 *  pikkus 6 m, seega virna jalajälg on 6 × 2,4 = 14,4 m² ehk täpselt 6,00 ldm. */
export const TORU_PIND = 14.4 / 10;

/** Ühe tüki põrandapind, m². Torud arvestatakse virnana, mitte 10 × 3,6 m². */
export function tykiPind(s) { return s.tube ? TORU_PIND : s.l * s.w; }

/** Torude püramiid 4+3+2+1: [kõrgus, nihe laiuses].
 *  Alumine rida 4 toru (0,3 … 2,1 m), iga järgmine rida on ühe toru võrra
 *  kitsam ja nihkes 0,3 m, nii et iga toru toetub kahele alumisele. */
export const TORUD = [
  [0.3, 0.3], [0.3, 0.9], [0.3, 1.5], [0.3, 2.1],
  [0.9, 0.6], [0.9, 1.2], [0.9, 1.8],
  [1.5, 0.9], [1.5, 1.5],
  [2.1, 1.2],
];

/** Ühe tüki TEGELIK põrandapind, m² — kasutatakse käsitsi paigutuses,
 *  kus loeme ainult kihil 0 seisvaid tükke. Torul on see 6 × 0,6 m,
 *  nii et kolm alumist toru annavad kokku virna 6 × 1,8 m jalajälje. */
export function pohjaPind(s) { return s.l * s.w; }

/** Ühe saadetise hõivatud põrandapind, m² (kõik tükid põrandal). */
export function pind(s) {
  return tykiPind(s) * s.qty;
}

/** Laadimismeetrid: põrandapind ÷ 2,4. Virnastamine ldm-i ei vähenda. */
export function ldmOf(shipments) {
  return shipments.reduce((a, s) => a + pind(s), 0) / LDM_LAIUS;
}

export const KOGUKAAL = SHIPMENTS.reduce((a, s) => a + s.kg, 0);      // 53 574 kg
export const KOGU_LDM = ldmOf(SHIPMENTS);                             // ≈ 42,36 ldm
// Väikseim vajalik autode arv tuleb KAALUST: 53 574 / 24 000 → 3.
// Põrandapinda üksi vaadates näib vastus 4 (43,70 ldm / 13,6 = 3,2), aga see
// arvestus eeldab, et kogu kaup seisab põrandal. Virnastatavat kaupa on siin
// piisavalt (karbid, madalad alused, torud), et kolme autoga hakkama saada —
// ja just see ongi ülesande mõte. Seega ldm-i liige siia ei käi.
export const MIN_AUTOSID = Math.ceil(KOGUKAAL / KANDEVOIME);          // 3

// ——— Näidislahendus: neli autot, käsitsi laotud ———
export const TRUCKS = [
  {
    id: 1, kg: 19400,
    note: 'Kaks suurgabariidilist seadet järjestikku (7,6 + 4,8 = 12,4 m). Tagumisse 1,2 m ritta mahub kolm EUR-alust kõrvuti (3 × 0,8 = 2,4 m).',
    items: [
      { n: 'seade_7600', sid: 's2', m: 'seade', l: 7.6,  w: 2.45, h: 2.6, x: 0,     z: 0,     y: 0 },
      { n: 'seade_4800', sid: 's7', m: 'seade', l: 4.8,  w: 2.2,  h: 2.5, x: 7.62,  z: 0.125, y: 0 },
      { n: 'eur_1',      sid: 's5', m: 'alus',  l: 1.18, w: 0.79, h: 1.2, x: 12.43, z: 0.01,  y: 0 },
      { n: 'eur_2',      sid: 's5', m: 'alus',  l: 1.18, w: 0.79, h: 1.2, x: 12.43, z: 0.82,  y: 0 },
      { n: 'eur_3',      sid: 's5', m: 'alus',  l: 1.18, w: 0.79, h: 1.2, x: 12.43, z: 1.63,  y: 0 },
    ],
  },
  {
    id: 2, kg: 24000,
    note: '22 rasket alust täidavad auto kaalu järgi lõpuni — 24 t on poolhaagise kandevõime. 11 rida × 2 alust kõrvuti = 13,2 m ja 13,2 ldm.',
    items: Array.from({ length: 22 }, (_, i) => ({
      n: 'raske_alus_' + (i + 1), sid: 's9', m: 'raske', l: 1.18, w: 1.19, h: 1.5,
      x: Math.floor(i / 2) * 1.2 + 0.01, z: (i % 2) * 1.21 + 0.015, y: 0,
    })),
  },
  {
    id: 3, kg: 6860,
    note: '6 m torud eesotsas 1,8 m laiuses virnas; kõrvale jääv 0,63 m riba täidetud HEP-aluste ja karpidega. Taga seadmed ja suur kast.',
    items: [
      { n: 'hep_1', sid: 's11', m: 'alus', l: 0.79, w: 0.59, h: 1.5, x: 0.02, z: 1.83, y: 0 },
      { n: 'hep_2', sid: 's11', m: 'alus', l: 0.79, w: 0.59, h: 1.5, x: 0.82, z: 1.83, y: 0 },
      { n: 'hep_3', sid: 's11', m: 'alus', l: 0.79, w: 0.59, h: 1.5, x: 1.62, z: 1.83, y: 0 },
      { n: 'hep_4', sid: 's11', m: 'alus', l: 0.79, w: 0.59, h: 1.5, x: 2.42, z: 1.83, y: 0 },
      ...Array.from({ length: 10 }, (_, i) => ({
        n: 'karp_' + (i + 1), sid: 's8', m: 'kast', l: 0.78, w: 0.49, h: 0.2,
        x: i % 2 ? 4.15 : 3.3, z: 1.83, y: Math.floor(i / 2) * 0.2,
      })),
      { n: 'seade_3000',  sid: 's4',  m: 'seade', l: 2.98, w: 1.49, h: 2.0, x: 6.03,  z: 0.01, y: 0 },
      { n: 'alus_90x95',  sid: 's10', m: 'alus',  l: 0.89, w: 0.94, h: 1.2, x: 6.03,  z: 1.51, y: 0 },
      { n: 'seade_2500_a', sid: 's14', m: 'seade', l: 2.48, w: 1.19, h: 2.3, x: 9.03, z: 0.01, y: 0 },
      { n: 'seade_2500_b', sid: 's14', m: 'seade', l: 2.48, w: 1.19, h: 2.3, x: 9.03, z: 1.21, y: 0 },
      { n: 'kast_200x160', sid: 's13', m: 'kast',  l: 1.98, w: 1.59, h: 1.4, x: 11.53, z: 0.01, y: 0 },
    ],
    // 10 toru Ø0,6 × 6 m, virnas 3+3+2+2
    tubes: [
      [0.3, 0.3], [0.3, 0.9], [0.3, 1.5],
      [0.9, 0.3], [0.9, 0.9], [0.9, 1.5],
      [1.5, 0.6], [1.5, 1.2],
      [2.1, 0.6], [2.1, 1.2],
    ],
    tubeX: 3.0,
  },
  {
    id: 4, kg: 3314,
    note: 'Ülejäänud alused. Auto jääb poolenisti tühjaks — 42,4 ldm ei jagune nelja auto vahel ühtlaselt, sest üksikud saadetised on suured ja jagamatud.',
    items: [
      { n: 'alus_200x165', sid: 's1',  m: 'alus', l: 1.98, w: 1.64, h: 1.15, x: 0.01, z: 0.01, y: 0 },
      { n: 'alus_95x90',   sid: 's3',  m: 'alus', l: 0.94, w: 0.89, h: 0.8,  x: 2.01, z: 0.01, y: 0 },
      { n: 'alus_105_1', sid: 's15', m: 'alus', l: 1.03, w: 0.89, h: 1.05, x: 3.01, z: 0.01, y: 0 },
      { n: 'alus_105_2', sid: 's15', m: 'alus', l: 1.03, w: 0.89, h: 1.05, x: 3.01, z: 0.91, y: 0 },
      { n: 'alus_105_3', sid: 's15', m: 'alus', l: 1.03, w: 0.89, h: 1.05, x: 4.06, z: 0.01, y: 0 },
      { n: 'alus_105_4', sid: 's15', m: 'alus', l: 1.03, w: 0.89, h: 1.05, x: 4.06, z: 0.91, y: 0 },
      { n: 'alus_120x80_a', sid: 's12', m: 'alus', l: 1.18, w: 0.79, h: 0.55, x: 5.11, z: 0.01, y: 0 },
      { n: 'alus_120x80_b', sid: 's12', m: 'alus', l: 1.18, w: 0.79, h: 0.55, x: 6.31, z: 0.01, y: 0 },
    ],
  },
];

function mat(key, cache) {
  if (!cache[key]) {
    const d = MATS[key];
    cache[key] = new THREE.MeshStandardMaterial({
      name: key, color: d.color, roughness: d.rough, metalness: d.metal,
    });
  }
  return cache[key];
}

function buildTrailer(truck, cache) {
  const g = new THREE.Group();
  g.name = 'auto_' + truck.id;

  const deckT = 0.12;
  const wood = cache.wood || (cache.wood = new THREE.MeshStandardMaterial({ name: 'deck_wood', color: 0xc9a978, roughness: 0.9 }));
  const alu = cache.alu || (cache.alu = new THREE.MeshStandardMaterial({ name: 'frame_alu', color: 0xa3a8ab, roughness: 0.5, metalness: 0.35 }));
  const rub = cache.rub || (cache.rub = new THREE.MeshStandardMaterial({ name: 'tire_rubber', color: 0x2b2d2e, roughness: 0.95 }));

  const add = (name, geo, m, x, y, z) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };

  add('porand', new THREE.BoxGeometry(DECK.L, deckT, DECK.W), wood, DECK.L / 2, -deckT / 2, DECK.W / 2);
  add('esisein', new THREE.BoxGeometry(0.08, DECK.H, DECK.W), alu, -0.04, DECK.H / 2, DECK.W / 2);

  const postGeo = new THREE.BoxGeometry(0.07, DECK.H, 0.07);
  for (let i = 0; i <= 4; i++) {
    const px = (DECK.L / 4) * i;
    add('post_' + i + '_v', postGeo, alu, Math.min(px, DECK.L - 0.04), DECK.H / 2, 0.035);
    add('post_' + i + '_p', postGeo, alu, Math.min(px, DECK.L - 0.04), DECK.H / 2, DECK.W - 0.035);
  }
  const railGeo = new THREE.BoxGeometry(DECK.L, 0.08, 0.08);
  add('katuseliist_v', railGeo, alu, DECK.L / 2, DECK.H, 0.04);
  add('katuseliist_p', railGeo, alu, DECK.L / 2, DECK.H, DECK.W - 0.04);
  const crossGeo = new THREE.BoxGeometry(0.07, 0.07, DECK.W);
  add('katuse_ristliist_ees', crossGeo, alu, 0.04, DECK.H, DECK.W / 2);
  add('katuse_ristliist_taga', crossGeo, alu, DECK.L - 0.04, DECK.H, DECK.W / 2);

  const wheelGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.3, 24);
  [10.1, 11.4, 12.7].forEach((wx, i) => {
    [-0.05, DECK.W + 0.05].forEach((wz, j) => {
      const w = add('ratas_' + i + '_' + j, wheelGeo, rub, wx, -deckT - 0.52, wz);
      w.rotation.x = Math.PI / 2;
    });
  });
  const legGeo = new THREE.BoxGeometry(0.14, 1.0, 0.14);
  [[3.4, 0.15], [3.4, DECK.W - 0.15]].forEach(([lx, lz], i) => add('tugijalg_' + i, legGeo, alu, lx, -deckT - 0.5, lz));
  add('vedu_king', new THREE.CylinderGeometry(0.45, 0.45, 0.1, 20), alu, 1.6, -deckT - 0.05, DECK.W / 2);

  const edgeMat = cache.edge || (cache.edge = new THREE.LineBasicMaterial({ color: 0x2f3a40, transparent: true, opacity: 0.35 }));

  // Iga veos on oma grupp (kast + servajooned) — nii saab teda tervikuna
  // animeerida ja klõpsuga tuvastada.
  const cargo = [];
  const piece = (name, sid) => {
    const p = new THREE.Group();
    p.name = name;
    const s = BY_ID[sid];
    p.userData = { cargo: true, sid, nimi: s ? s.nimi : name, mo: s ? s.mo : '', kg: s ? s.kg : 0, qty: s ? s.qty : 1 };
    g.add(p);
    cargo.push(p);
    return p;
  };

  for (const it of truck.items || []) {
    const p = piece(it.n, it.sid);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(it.l, it.h, it.w), mat(it.m, cache));
    mesh.name = it.n;
    mesh.position.set(it.x + it.l / 2, it.y + it.h / 2, it.z + it.w / 2);
    mesh.castShadow = true; mesh.receiveShadow = true;
    p.add(mesh);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMat);
    edges.name = it.n + '_servad';
    edges.position.copy(mesh.position);
    p.add(edges);
  }

  const tubeGeo = new THREE.CylinderGeometry(0.3, 0.3, 6.0, 28);
  (truck.tubes || []).forEach(([ty, tz, tx], i) => {
    const p = piece('plasttoru_' + (i + 1), 's6');
    const t = new THREE.Mesh(tubeGeo, mat('toru', cache));
    t.name = 'plasttoru_' + (i + 1);
    t.rotation.z = Math.PI / 2;
    t.position.set(tx != null ? tx : (truck.tubeX != null ? truck.tubeX : 3.0), ty, tz);
    t.castShadow = true; t.receiveShadow = true;
    p.add(t);
  });

  g.userData.cargo = cargo;
  return g;
}

function label(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0f5a5e';
  ctx.font = '700 76px "Source Sans 3", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 68);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ name: 'silt', map: new THREE.CanvasTexture(c), transparent: true, depthTest: false }));
  s.name = 'silt_' + text.toLowerCase().replace(/\s/g, '_');
  s.scale.set(2.4, 0.6, 1);
  return s;
}

// ——— Automaatne pakkimine õpilase enda jaotuse visualiseerimiseks ———
// Kõigepealt põrand (vabade ristkülikute meetod, veoseid tohib keerata 90°),
// seejärel ülejäänu juba laaditud veoste peale — ülesanne lubab virnastada.
function packOnce(shipments, id, scoreIdx, sortIdx) {
  const pieces = [];
  shipments.forEach((s) => {
    // automaatpakkija laob torud ühe 6 × 1,8 × 2,4 m virnana
    if (s.tube) { pieces.push({ s, a: 6.0, b: 1.8, h: 2.4 }); return; }
    for (let i = 0; i < s.qty; i++) pieces.push({ s, a: s.l, b: s.w, h: s.h });
  });
  const tall = (p) => (p.h > 1.45 ? 0 : 1);
  if (sortIdx === 0) pieces.sort((p, q) => tall(p) - tall(q) || (q.a * q.b) - (p.a * p.b) || q.h - p.h);
  else if (sortIdx === 1) pieces.sort((p, q) => (q.a * q.b) - (p.a * p.b) || q.h - p.h);
  else pieces.sort((p, q) => q.h - p.h || (q.a * q.b) - (p.a * p.b));

  const items = [], tubes = [], over = [], rest = [], supports = [];
  let tubeX = 3.0;
  let free = [{ x: 0, z: 0, l: DECK.L, w: DECK.W }];

  const place = (p, X, Z, Y, L, W) => {
    const n = p.s.id + '_' + items.length;
    if (p.s.tube) {
      tubeX = X + 3.0;
      [[0.3, 0.3], [0.3, 0.9], [0.3, 1.5], [0.9, 0.3], [0.9, 0.9], [0.9, 1.5],
       [1.5, 0.6], [1.5, 1.2], [2.1, 0.6], [2.1, 1.2]].forEach(([ty, tz]) => tubes.push([Y + ty, Z + tz]));
      return;
    }
    const it = { n, sid: p.s.id, m: p.s.m, l: L - 0.02, w: W - 0.02, h: p.h, x: X + 0.01, z: Z + 0.01, y: Y };
    items.push(it);
    supports.push({ top: Y + p.h, free: [{ x: it.x, z: it.z, l: it.l, w: it.w }] });
  };

  for (const p of pieces) {
    let best = null;
    for (const r of free) {
      for (const [L, W] of [[p.a, p.b], [p.b, p.a]]) {
        if (L <= r.l + 1e-6 && W <= r.w + 1e-6) {
          const score = scoreIdx === 0 ? (r.l - L) * 100 + (r.w - W) * 10
                      : scoreIdx === 1 ? (r.w - W) * 100 + (r.l - L)
                      : (r.l * r.w - L * W);
          if (!best || score < best.score) best = { r, L, W, score };
        }
      }
    }
    if (!best) { rest.push(p); continue; }
    const { r, L, W } = best;
    place(p, r.x, r.z, 0, L, W);
    const right = { x: r.x + L, z: r.z, l: r.l - L, w: r.w };
    const top = { x: r.x, z: r.z + W, l: L, w: r.w - W };
    free = free.filter((q) => q !== r);
    [right, top].forEach((q) => { if (q.l > 0.05 && q.w > 0.05) free.push(q); });
    free.sort((a, b) => a.l * a.w - b.l * b.w);
  }

  const TOL = 0.22;
  for (const p of rest) {
    let best = null;
    for (const q of supports) {
      if (q.top + p.h > DECK.H + 1e-6) continue;
      for (const r of q.free) {
        for (const [L, W] of [[p.a, p.b], [p.b, p.a]]) {
          if (L > r.l + TOL || W > r.w + TOL) continue;
          const score = q.top * 1000 + (r.w - W) * 10 + (r.l - L);
          if (!best || score < best.score) best = { q, r, L, W, score };
        }
      }
    }
    if (!best) { over.push(p.s); continue; }
    const { q, r, L, W } = best;
    place(p, r.x - 0.01, r.z - 0.01, q.top, L, W);
    q.free = q.free.filter((f) => f !== r);
    const useL = Math.min(L, r.l), useW = Math.min(W, r.w);
    [{ x: r.x + useL, z: r.z, l: r.l - useL, w: r.w },
     { x: r.x, z: r.z + useW, l: useL, w: r.w - useW }]
      .forEach((f) => { if (f.l > 0.05 && f.w > 0.05) q.free.push(f); });
  }

  return { id, items, tubes, tubeX, over };
}

export function packTruck(shipments, id) {
  let best = null;
  for (let sortIdx = 0; sortIdx < 3; sortIdx++) {
    for (let scoreIdx = 0; scoreIdx < 3; scoreIdx++) {
      const r = packOnce(shipments, id, scoreIdx, sortIdx);
      const top = Math.max(0, ...r.items.map((i) => i.y + i.h));
      if (!best || r.over.length < best.over.length ||
          (r.over.length === best.over.length && top < best.top)) { r.top = top; best = r; }
    }
  }
  return best;
}

export function buildTrucks(list) {
  const root = assemble(list, {});
  root.name = 'kasitsi_laotud';
  return root;
}

function assemble(list, cache) {
  const root = new THREE.Group();
  const gap = 4.2;
  const total = list.length * DECK.W + (list.length - 1) * gap;
  const cargo = [];
  list.forEach((t, i) => {
    const g = buildTrailer(t, cache);
    if (list.length > 1) {
      const s = label('AUTO ' + t.id);
      s.position.set(-1.9, 1.0, DECK.W / 2);
      g.add(s);
    }
    g.position.set(-DECK.L / 2, 0, -total / 2 + i * (DECK.W + gap));
    root.add(g);
    cargo.push(...g.userData.cargo);
  });
  root.userData.cargo = cargo;
  return root;
}

/** Õpilase enda jaotusest kokku pandud autopark. */
export function buildFleet(assign, fleet) {
  const cache = {};
  const list = Array.from({ length: fleet }, (_, k) => {
    const i = k + 1;
    return packTruck(SHIPMENTS.filter((s) => assign[s.id] === i), i);
  });
  const root = assemble(list, cache);
  root.name = 'opilase_veoplaan';
  return root;
}

/** Näidislahendus. */
export function buildModel(ids) {
  const root = assemble(TRUCKS.filter((t) => ids.includes(t.id)), {});
  root.name = 'terminali_veoplaan';
  return root;
}
