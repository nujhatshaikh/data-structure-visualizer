// TREE (BST)
let root = null, tHL = {};
const mkNode = v => ({ v, l: null, r: null });
function tOut(arr, title) {
  $('#t-out').innerHTML = title ? `<b>${title}:</b> ` + arr.map(x => `<span class="chip">${x}</span>`).join('') : '';
}
function tR() {
  const svg = $('#t-svg');
  if (!root) { svg.setAttribute('viewBox', '0 0 400 120'); svg.innerHTML = '<text x="200" y="60" text-anchor="middle" fill="#9ba2cc" font-size="14">Tree empty hai - value insert karo</text>'; return; }
  const pos = new Map(); let i = 0;
  (function go(n, d) { if (!n) return; go(n.l, d + 1); pos.set(n, { x: i++, y: d }); go(n.r, d + 1); })(root, 0);
  let maxY = 0; pos.forEach(p => maxY = Math.max(maxY, p.y));
  const GX = 56, GY = 72, W = Math.max(400, i * GX + 40), H = (maxY + 1) * GY + 20;
  const off = (W - (i - 1) * GX) / 2;
  const X = n => off + pos.get(n).x * GX, Y = n => 34 + pos.get(n).y * GY;
  let edges = '', nodes = '';
  pos.forEach((p, n) => {
    [n.l, n.r].forEach(c => { if (c) edges += `<line class="e-l" x1="${X(n)}" y1="${Y(n)}" x2="${X(c)}" y2="${Y(c)}"/>`; });
    nodes += `<g class="n-${tHL[n.v] || ''}"><circle class="n-c" cx="${X(n)}" cy="${Y(n)}" r="21"/><text class="n-t" x="${X(n)}" y="${Y(n)}">${n.v}</text></g>`;
  });
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = edges + nodes;
}
async function tInsert(v) {
  if (!root) { root = mkNode(v); tHL = { [v]: 'found' }; tR(); log('t', `${v} root ban gaya`, 'ok'); await D(); tHL = {}; tR(); return; }
  let cur = root;
  while (true) {
    tHL = { [cur.v]: 'active' }; tR();
    if (v === cur.v) { log('t', `${v} pehle se hai (duplicate allowed nahi)`, 'err'); await D(); tHL = {}; tR(); return; }
    log('t', `${v} ${v < cur.v ? '<' : '>'} ${cur.v} -> ${v < cur.v ? 'left' : 'right'} jao`);
    await D();
    if (v < cur.v) { if (!cur.l) { cur.l = mkNode(v); break; } cur = cur.l; }
    else { if (!cur.r) { cur.r = mkNode(v); break; } cur = cur.r; }
  }
  tHL = { [v]: 'found' }; tR(); log('t', `${v} insert ho gaya`, 'ok'); await D(); tHL = {}; tR();
}
$('#t-ins').onclick = () => run(async () => {
  const v = num('t-val'); if (v === null) return log('t', 'Value daalo', 'err');
  tOut([]); await tInsert(v);
});
$('#t-sea').onclick = () => run(async () => {
  const v = num('t-val'); if (v === null) return log('t', 'Value daalo', 'err');
  tOut([]); let cur = root;
  while (cur) {
    tHL = { [cur.v]: 'active' }; tR(); await D();
    if (cur.v === v) { tHL = { [v]: 'found' }; tR(); return log('t', `${v} mil gaya`, 'ok'); }
    log('t', `${v} ${v < cur.v ? '<' : '>'} ${cur.v} -> ${v < cur.v ? 'left' : 'right'}`);
    cur = v < cur.v ? cur.l : cur.r;
  }
  tHL = {}; tR(); log('t', `${v} tree me nahi hai`, 'err');
});
$('#t-del').onclick = () => run(async () => {
  const v = num('t-val'); if (v === null) return log('t', 'Value daalo', 'err');
  tOut([]);
  let p = null, cur = root;
  while (cur && cur.v !== v) { tHL = { [cur.v]: 'active' }; tR(); await D(); p = cur; cur = v < cur.v ? cur.l : cur.r; }
  if (!cur) { tHL = {}; tR(); return log('t', `${v} nahi mila`, 'err'); }
  tHL = { [cur.v]: 'danger' }; tR(); await D();
  const replace = (old, nw) => { if (!p) root = nw; else if (p.l === old) p.l = nw; else p.r = nw; };
  if (!cur.l || !cur.r) {
    log('t', cur.l || cur.r ? 'Ek child hai - child ko upar le aao' : 'Leaf node - seedha hata do');
    replace(cur, cur.l || cur.r);
  } else {
    log('t', 'Do children hain - inorder successor se replace karo');
    let sp = cur, s = cur.r;
    while (s.l) { tHL = { [s.v]: 'move' }; tR(); await D(); sp = s; s = s.l; }
    tHL = { [s.v]: 'found' }; tR(); await D();
    cur.v = s.v;
    if (sp === cur) sp.r = s.r; else sp.l = s.r;
  }
  tHL = {}; tR(); log('t', `${v} delete ho gaya`, 'ok');
});
async function traverse(type) {
  tHL = {}; tR(); const out = [], name = { in: 'Inorder (L, Root, R)', pre: 'Preorder (Root, L, R)', post: 'Postorder (L, R, Root)' }[type];
  log('t', name + ' start'); tOut(out, name);
  async function visit(n) {
    tHL[n.v] = 'active'; tR(); await D();
    out.push(n.v); tHL[n.v] = 'found'; tR(); tOut(out, name);
  }
  async function go(n) {
    if (!n) return;
    if (type === 'pre') await visit(n);
    await go(n.l);
    if (type === 'in') await visit(n);
    await go(n.r);
    if (type === 'post') await visit(n);
  }
  await go(root);
  log('t', name + ': ' + out.join(', '), 'ok');
}
$('#t-in').onclick = () => run(() => traverse('in'));
$('#t-pre').onclick = () => run(() => traverse('pre'));
$('#t-post').onclick = () => run(() => traverse('post'));
$('#t-rnd').onclick = () => run(async () => {
  root = null; tHL = {}; tOut([]);
  const vals = [...new Set(Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10))];
  vals.forEach(v => { if (!root) root = mkNode(v); else { let c = root; while (true) { if (v < c.v) { if (!c.l) { c.l = mkNode(v); break; } c = c.l; } else { if (!c.r) { c.r = mkNode(v); break; } c = c.r; } } } });
  tR(); log('t', 'Random BST ban gaya: ' + vals.join(', '));
});
$('#t-clr').onclick = () => run(async () => { root = null; tHL = {}; tOut([]); tR(); log('t', 'Tree clear'); });
