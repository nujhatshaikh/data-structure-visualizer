// Common helpers
const $ = s => document.querySelector(s);
let speed = 3, busy = false;
const SPEED_NAMES = ['', 'Very Slow', 'Slow', 'Normal', 'Fast', 'Faster', 'Turbo'];
const wait = ms => new Promise(r => setTimeout(r, ms * 3 / speed));
const D = () => wait(700);

$('#speed').oninput = e => { speed = +e.target.value; $('#speedv').textContent = SPEED_NAMES[speed]; };

function log(p, msg, cls) {
  const el = $('#log-' + p);
  const d = document.createElement('div');
  if (cls) d.className = cls;
  d.textContent = '> ' + msg;
  el.appendChild(d);
  el.scrollTop = el.scrollHeight;
}
function num(id) {
  const v = $('#' + id).value;
  if (v === '') return null;
  const n = parseInt(v, 10);
  return isNaN(n) ? null : n;
}
function lockUI(on) {
  document.querySelectorAll('.controls button').forEach(b => b.disabled = on);
}
async function run(fn) {
  if (busy) return;
  busy = true; lockUI(true);
  try { await fn(); } catch (e) { console.error(e); }
  busy = false; lockUI(false);
}

/* Tabs */
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  if (busy) return;
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('on'));
  document.querySelectorAll('.panel').forEach(x => x.classList.remove('on'));
  t.classList.add('on');
  $('#p-' + t.dataset.tab).classList.add('on');
});

/* Generic box renderer (array / queue / stack) */
function mkBoxes(el, items, hl, tags, showIdx = true) {
  el.innerHTML = '';
  items.forEach((v, i) => {
    const d = document.createElement('div');
    d.className = 'cell ' + (hl[i] || '');
    d.innerHTML = `<span>${v}</span>` + (showIdx ? `<small>${i}</small>` : '') + (tags && tags[i] ? `<span class="tag">${tags[i]}</span>` : '');
    el.appendChild(d);
  });
}
