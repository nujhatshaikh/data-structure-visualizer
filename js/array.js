// ARRAY
let A = [12, 45, 7, 23, 56], aHL = {};
const aR = () => mkBoxes($('#a-view'), A, aHL);
const MAXA = 12;

$('#a-ins').onclick = () => run(async () => {
  const v = num('a-val');
  if (v === null) return log('a', 'Value daalo (number)', 'err');
  const i = num('a-idx') === null ? A.length : num('a-idx');
  if (A.length >= MAXA) return log('a', 'Array full hai (max ' + MAXA + ')', 'err');
  if (i < 0 || i > A.length) return log('a', `Index 0 se ${A.length} ke beech hona chahiye`, 'err');
  log('a', `Insert ${v} at index ${i}`);
  for (let k = A.length - 1; k >= i; k--) {
    aHL = { [k]: 'move' }; aR();
    log('a', `Shift A[${k}] -> A[${k + 1}]`);
    await D();
  }
  A.splice(i, 0, v); aHL = { [i]: 'found' }; aR();
  log('a', 'Inserted - Time: O(n)', 'ok');
  await D(); aHL = {}; aR();
});
$('#a-del').onclick = () => run(async () => {
  if (!A.length) return log('a', 'Array empty hai', 'err');
  const i = num('a-idx') === null ? A.length - 1 : num('a-idx');
  if (i < 0 || i >= A.length) return log('a', `Index 0 se ${A.length - 1} ke beech hona chahiye`, 'err');
  log('a', `Delete A[${i}] = ${A[i]}`);
  aHL = { [i]: 'danger' }; aR(); await D();
  A.splice(i, 1);
  for (let k = i; k < A.length; k++) {
    aHL = { [k]: 'move' }; aR();
    log('a', `Shift left: element ab index ${k} par`);
    await D();
  }
  aHL = {}; aR(); log('a', 'Deleted - Time: O(n)', 'ok');
});
$('#a-sea').onclick = () => run(async () => {
  const v = num('a-val');
  if (v === null) return log('a', 'Search ke liye value daalo', 'err');
  log('a', `Linear search for ${v}`);
  for (let k = 0; k < A.length; k++) {
    aHL = { [k]: 'active' }; aR();
    log('a', `Check A[${k}] = ${A[k]}`);
    await D();
    if (A[k] === v) { aHL = { [k]: 'found' }; aR(); return log('a', `Found at index ${k}`, 'ok'); }
  }
  aHL = {}; aR(); log('a', `${v} nahi mila`, 'err');
});
$('#a-acc').onclick = () => run(async () => {
  const i = num('a-idx');
  if (i === null || i < 0 || i >= A.length) return log('a', 'Valid index daalo', 'err');
  aHL = { [i]: 'found' }; aR();
  log('a', `A[${i}] = ${A[i]} - direct access, Time: O(1)`, 'ok');
  await D(); aHL = {}; aR();
});
$('#a-tra').onclick = () => run(async () => {
  log('a', 'Traversal start');
  for (let k = 0; k < A.length; k++) {
    aHL = { [k]: 'active' }; aR(); log('a', `A[${k}] = ${A[k]}`); await D();
  }
  aHL = {}; aR(); log('a', 'Traversal complete', 'ok');
});
$('#a-rnd').onclick = () => run(async () => {
  A = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10); aHL = {}; aR(); log('a', 'Random array ban gaya');
});
$('#a-clr').onclick = () => run(async () => { A = []; aHL = {}; aR(); log('a', 'Array clear'); });
