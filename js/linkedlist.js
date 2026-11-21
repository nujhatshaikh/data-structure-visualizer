// LINKED LIST
let L = [10, 20, 30], lHL = {};
const MAXL = 9;
function lR() {
  const el = $('#l-view'); el.innerHTML = '';
  const head = document.createElement('span'); head.className = 'lbl'; head.textContent = 'HEAD'; el.appendChild(head);
  if (!L.length) { el.insertAdjacentHTML('beforeend', '<span class="arrow">&rarr;</span><span class="nullb">NULL</span>'); return; }
  L.forEach((v, i) => {
    el.insertAdjacentHTML('beforeend', `<span class="arrow">&rarr;</span><div class="node ${lHL[i] || ''}"><div class="d">${v}</div><div class="p">&bull;</div></div>`);
  });
  el.insertAdjacentHTML('beforeend', '<span class="arrow">&rarr;</span><span class="nullb">NULL</span>');
}
async function lInsert(v, pos) {
  if (L.length >= MAXL) return log('l', 'List full hai (display limit ' + MAXL + ')', 'err');
  log('l', `Insert ${v} at position ${pos}`);
  for (let k = 0; k < pos; k++) { lHL = { [k]: 'active' }; lR(); log('l', `Traverse node ${k}`); await D(); }
  L.splice(pos, 0, v); lHL = { [pos]: 'found' }; lR();
  log('l', 'Node insert ho gaya, pointers update', 'ok');
  await D(); lHL = {}; lR();
}
$('#l-head').onclick = () => run(async () => {
  const v = num('l-val'); if (v === null) return log('l', 'Value daalo', 'err');
  await lInsert(v, 0);
});
$('#l-tail').onclick = () => run(async () => {
  const v = num('l-val'); if (v === null) return log('l', 'Value daalo', 'err');
  await lInsert(v, L.length);
});
$('#l-at').onclick = () => run(async () => {
  const v = num('l-val'), p = num('l-pos');
  if (v === null || p === null) return log('l', 'Value aur position dono daalo', 'err');
  if (p < 0 || p > L.length) return log('l', `Position 0 se ${L.length} ke beech hona chahiye`, 'err');
  await lInsert(v, p);
});
$('#l-del').onclick = () => run(async () => {
  const v = num('l-val'); if (v === null) return log('l', 'Delete ke liye value daalo', 'err');
  log('l', `Delete value ${v}`);
  for (let k = 0; k < L.length; k++) {
    lHL = { [k]: 'active' }; lR(); log('l', `Check node ${k} (${L[k]})`); await D();
    if (L[k] === v) {
      lHL = { [k]: 'danger' }; lR(); await D();
      L.splice(k, 1); lHL = {}; lR(); return log('l', 'Node delete, previous.next update ho gaya', 'ok');
    }
  }
  lHL = {}; lR(); log('l', `${v} list me nahi mila`, 'err');
});
$('#l-sea').onclick = () => run(async () => {
  const v = num('l-val'); if (v === null) return log('l', 'Search ke liye value daalo', 'err');
  for (let k = 0; k < L.length; k++) {
    lHL = { [k]: 'active' }; lR(); log('l', `Check node ${k} (${L[k]})`); await D();
    if (L[k] === v) { lHL = { [k]: 'found' }; lR(); return log('l', `Found at position ${k}`, 'ok'); }
  }
  lHL = {}; lR(); log('l', `${v} nahi mila`, 'err');
});
$('#l-tra').onclick = () => run(async () => {
  log('l', 'Traversal: HEAD se NULL tak');
  for (let k = 0; k < L.length; k++) { lHL = { [k]: 'active' }; lR(); log('l', `Node ${k}: ${L[k]}`); await D(); }
  lHL = {}; lR(); log('l', 'NULL reached', 'ok');
});
$('#l-clr').onclick = () => run(async () => { L = []; lHL = {}; lR(); log('l', 'List clear'); });
