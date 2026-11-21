// QUEUE
let Q = [], qHL = {};
const MAXQ = 8;
function qR() {
  const tags = {};
  if (Q.length) { tags[0] = 'FRONT'; tags[Q.length - 1] = Q.length === 1 ? 'FRONT / REAR' : 'REAR'; }
  mkBoxes($('#q-view'), Q, qHL, tags, true);
}
$('#q-enq').onclick = () => run(async () => {
  const v = num('q-val');
  if (v === null) return log('q', 'Value daalo', 'err');
  if (Q.length >= MAXQ) { $('#q-out').innerHTML = '<b style="color:var(--red)">Queue Overflow!</b>'; return log('q', 'Queue Overflow - queue full hai', 'err'); }
  Q.push(v); qHL = { [Q.length - 1]: 'found' }; qR();
  $('#q-out').textContent = `Enqueue ${v} - rear pointer aage badha`;
  log('q', `enqueue(${v}) - Time: O(1)`, 'ok');
  await D(); qHL = {}; qR();
});
$('#q-deq').onclick = () => run(async () => {
  if (!Q.length) { $('#q-out').innerHTML = '<b style="color:var(--red)">Queue Underflow!</b>'; return log('q', 'Queue Underflow - queue empty hai', 'err'); }
  qHL = { 0: 'danger' }; qR(); await D();
  const v = Q.shift(); qHL = {}; qR();
  $('#q-out').innerHTML = `Dequeued: <b>${v}</b> - front pointer aage badha`;
  log('q', `dequeue() -> ${v} - Time: O(1)`, 'ok');
});
$('#q-peek').onclick = () => run(async () => {
  if (!Q.length) return log('q', 'Queue empty hai', 'err');
  qHL = { 0: 'active' }; qR();
  $('#q-out').innerHTML = `Front element: <b>${Q[0]}</b>`;
  log('q', `peek() -> ${Q[0]}`, 'ok');
  await D(); qHL = {}; qR();
});
$('#q-clr').onclick = () => run(async () => { Q = []; qHL = {}; qR(); $('#q-out').textContent = ''; log('q', 'Queue clear'); });
