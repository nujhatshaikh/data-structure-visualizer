// Init
aR(); sR(); qR(); lR(); tR(); gR();
[ 'a', 's', 'q', 'l', 't', 'g' ].forEach(p => log(p, 'Ready - koi operation chalao'));
// sample tree
[50, 30, 70, 20, 40, 60, 80].forEach(v => { const n = mkNode(v); if (!root) root = n; else { let c = root; while (true) { if (v < c.v) { if (!c.l) { c.l = n; break; } c = c.l; } else { if (!c.r) { c.r = n; break; } c = c.r; } } } });
tR();
