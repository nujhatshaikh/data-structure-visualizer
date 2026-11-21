// GRAPH
const GN = { A: [90, 70], B: [290, 45], C: [500, 80], D: [60, 235], E: [270, 200], F: [490, 245], G: [290, 335] };
const DEF_EDGES = [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['C', 'F'], ['D', 'E'], ['E', 'F'], ['E', 'G']];
let GE = DEF_EDGES.map(e => e.slice()), gN = {}, gE = {};
const eKey = (a, b) => [a, b].sort().join('-');
const adj = u => GE.filter(e => e.includes(u)).map(e => e[0] === u ? e[1] : e[0]).sort();
function gR() {
  let s = '';
  GE.forEach(([a, b]) => {
    s += `<line class="e-l ${gE[eKey(a, b)] ? 'e-tree' : ''}" x1="${GN[a][0]}" y1="${GN[a][1]}" x2="${GN[b][0]}" y2="${GN[b][1]}"/>`;
  });
  Object.keys(GN).forEach(k => {
    s += `<g class="n-${gN[k] || ''}"><circle class="n-c" cx="${GN[k][0]}" cy="${GN[k][1]}" r="24"/><text class="n-t" x="${GN[k][0]}" y="${GN[k][1]}">${k}</text></g>`;
  });
  $('#g-svg').innerHTML = s;
}
function gOut(html) { $('#g-out').innerHTML = html; }
const chips = a => a.map(x => `<span class="chip">${x}</span>`).join('') || '-';

['g-start', 'g-from', 'g-to'].forEach(id => {
  Object.keys(GN).forEach(k => $('#' + id).insertAdjacentHTML('beforeend', `<option>${k}</option>`));
});
$('#g-to').selectedIndex = 1;

async function bfs(s) {
  gN = {}; gE = {}; const vis = new Set([s]), q = [s], order = []; gN[s] = 'queued'; gR();
  log('g', `BFS start from ${s}`);
  while (q.length) {
    const u = q.shift(); gN[u] = 'current'; gR();
    gOut(`<b>Queue:</b> ${chips(q)} &nbsp; <b>Visited order:</b> ${chips(order)} &nbsp; <b>Current:</b> ${u}`);
    log('g', `Dequeue ${u}`); await D(); order.push(u);
    for (const w of adj(u)) if (!vis.has(w)) {
      vis.add(w); q.push(w); gN[w] = 'queued'; gE[eKey(u, w)] = 1; gR();
      gOut(`<b>Queue:</b> ${chips(q)} &nbsp; <b>Visited order:</b> ${chips(order)} &nbsp; <b>Current:</b> ${u}`);
      log('g', `Discover ${w} (via ${u}) -> enqueue`); await D();
    }
    gN[u] = 'visited'; gR();
  }
  gOut(`<b>BFS order:</b> ${chips(order)}`); log('g', 'BFS order: ' + order.join(' -> '), 'ok');
}
async function dfs(s) {
  gN = {}; gE = {}; const vis = new Set(), st = [], order = [];
  log('g', `DFS start from ${s}`);
  async function go(u) {
    vis.add(u); st.push(u); gN[u] = 'current'; gR();
    gOut(`<b>Stack:</b> ${chips(st)} &nbsp; <b>Visited order:</b> ${chips(order)} &nbsp; <b>Current:</b> ${u}`);
    log('g', `Visit ${u}`); await D(); order.push(u);
    for (const w of adj(u)) if (!vis.has(w)) {
      gE[eKey(u, w)] = 1; gN[u] = 'queued'; gR(); log('g', `${u} -> ${w} (deep jao)`); await D();
      await go(w);
      gN[u] = 'current'; gR();
      gOut(`<b>Stack:</b> ${chips(st)} &nbsp; <b>Visited order:</b> ${chips(order)} &nbsp; <b>Current:</b> ${u}`);
      log('g', `Backtrack to ${u}`); await D();
    }
    st.pop(); gN[u] = 'visited'; gR();
  }
  await go(s);
  gOut(`<b>DFS order:</b> ${chips(order)}`); log('g', 'DFS order: ' + order.join(' -> '), 'ok');
}
$('#g-bfs').onclick = () => run(() => bfs($('#g-start').value));
$('#g-dfs').onclick = () => run(() => dfs($('#g-start').value));
$('#g-reset').onclick = () => run(async () => { gN = {}; gE = {}; gR(); gOut(''); });
$('#g-add').onclick = () => run(async () => {
  const a = $('#g-from').value, b = $('#g-to').value;
  if (a === b) return log('g', 'Self-loop allowed nahi', 'err');
  if (GE.some(e => eKey(e[0], e[1]) === eKey(a, b))) return log('g', 'Ye edge pehle se hai', 'err');
  GE.push([a, b]); gN = {}; gE = {}; gR(); log('g', `Edge ${a} - ${b} add ho gaya`, 'ok');
});
$('#g-def').onclick = () => run(async () => { GE = DEF_EDGES.map(e => e.slice()); gN = {}; gE = {}; gR(); gOut(''); log('g', 'Default graph restore'); });
