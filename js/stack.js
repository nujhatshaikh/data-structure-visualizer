// STACK
let S = [], sHL = {};
const MAXS = 8;
function sR() {
  const tags = {}; if (S.length) tags[S.length - 1] = '&larr; TOP';
  mkBoxes($('#s-view'), S, sHL, tags, false);
}
$('#s-push').onclick = () => run(async () => {
  const v = num('s-val');
  if (v === null) return log('s', 'Value daalo', 'err');
  if (S.length >= MAXS) { $('#s-out').innerHTML = '<b style="color:var(--red)">Stack Overflow!</b>'; return log('s', 'Stack Overflow - stack full hai', 'err'); }
  S.push(v); sHL = { [S.length - 1]: 'found' }; sR();
  $('#s-out').textContent = `Push ${v} - top ab index ${S.length - 1} par hai`;
  log('s', `push(${v}) - Time: O(1)`, 'ok');
  await D(); sHL = {}; sR();
});
$('#s-pop').onclick = () => run(async () => {
  if (!S.length) { $('#s-out').innerHTML = '<b style="color:var(--red)">Stack Underflow!</b>'; return log('s', 'Stack Underflow - stack empty hai', 'err'); }
  sHL = { [S.length - 1]: 'danger' }; sR(); await D();
  const v = S.pop(); sHL = {}; sR();
  $('#s-out').innerHTML = `Popped: <b>${v}</b>`;
  log('s', `pop() -> ${v} - Time: O(1)`, 'ok');
});
$('#s-peek').onclick = () => run(async () => {
  if (!S.length) return log('s', 'Stack empty hai', 'err');
  sHL = { [S.length - 1]: 'active' }; sR();
  $('#s-out').innerHTML = `Top element: <b>${S[S.length - 1]}</b>`;
  log('s', `peek() -> ${S[S.length - 1]}`, 'ok');
  await D(); sHL = {}; sR();
});
$('#s-clr').onclick = () => run(async () => { S = []; sHL = {}; sR(); $('#s-out').textContent = ''; log('s', 'Stack clear'); });
