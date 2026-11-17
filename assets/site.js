/* ═══════════════════════════════════════════════════════════════════
   BICHOM — the script behind the page

   You don't need to edit this file. Words and facts go in settings.js,
   map points in places.js, the words of each part in index.html.

   What it does:
     • draws the menu (five groups and "More") and the footer
     • hides a part that is switched off in settings.js
     • fills the [brackets] from settings.js, and hides a sentence until
       all of its facts are filled in
     • builds the WhatsApp buttons with a message ready to send
     • adds a "Next" link at the end of each part
     • the motion: pictures that crossfade and drift, titles that arrive,
       ink sketches that draw themselves, the map that draws its road
     • adds a "Say the name" button wherever audio/<name>.mp3 exists
     • works out the sunrise and sunset table, and draws the map
     • the keeper's preview: open the page with #setup at the end
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var SITE = window.SITE || {};
var PLACES = (window.PLACES || []).filter(function(p){ return p && isFinite(p.lat) && isFinite(p.lng) && filled(p.name); });

/* The parts of the page, in order, and the menu group each belongs to. */
var PARTS = [
  {id:'home',         label:'Home',                   group:''},
  {id:'bird',         label:'The Bugun bird',         group:'Birds'},
  {id:'birding',      label:'Bird watching',          group:'Birds'},
  {id:'lichini',      label:'The Lichini walk',       group:'Walks'},
  {id:'rhododendron', label:'The rhododendron walk',  group:'Walks'},
  {id:'cave',         label:'The cave',               group:'Walks'},
  {id:'river',        label:'The river',              group:'The river'},
  {id:'sun',          label:'Sunrise and sunset',     group:'Walks'},
  {id:'bamboo',       label:'Bamboo',                 group:'Made here'},
  {id:'fruit',        label:'Fruit, food and juice',  group:'Made here'},
  {id:'nettle',       label:'Nettle cloth',           group:'Made here'},
  {id:'story',        label:'Our story',              group:'More'},
  {id:'visit',        label:'Stay and visit',         group:'Visit'},
  {id:'map',          label:'Map',                    group:'More'}
];
var GROUPS = ['Birds', 'Walks', 'The river', 'Made here', 'Visit', 'More'];

var $  = function(s, el){ return (el || document).querySelector(s); };
var $$ = function(s, el){ return [].slice.call((el || document).querySelectorAll(s)); };
function filled(v){
  if (Array.isArray(v)) return v.some(filled);
  if (v && typeof v === 'object') return Object.keys(v).length > 0;
  return typeof v === 'string' ? v.trim() !== '' : typeof v === 'number';
}
function setting(path){ return path.split('.').reduce(function(o, k){ return o == null ? o : o[k]; }, SITE); }
function digits(s){ return String(s || '').replace(/\D/g, ''); }
function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function addGap(path){ if (gaps.indexOf(path) < 0) gaps.push(path); }
var gaps = [];

var village = filled(SITE.village) ? SITE.village.trim() : 'Bichom';
/* people who ask their phone for less motion get the still version */
var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ── keeper's preview: #setup, or the page opened from your own computer ── */
var SETUP = location.protocol === 'file:' || location.hash === '#setup';
try {
  if (location.hash === '#setup') sessionStorage.setItem('setup', '1');
  if (sessionStorage.getItem('setup') === '1') SETUP = true;
} catch (e) {}
if (SETUP) document.documentElement.classList.add('setup');

function partOpen(p){
  if (p.id === 'home') return true;
  if (p.id === 'map') return PLACES.length > 0 && !(SITE.pages && SITE.pages.map === false);
  return !(SITE.pages && SITE.pages[p.id] === false);
}
function shown(p){ return !!document.getElementById(p.id) && (SETUP || partOpen(p)); }

/* ── parts that are switched off ── */
PARTS.forEach(function(p){
  var sec = document.getElementById(p.id); if (!sec) return;
  if (partOpen(p)) return;
  if (SETUP && p.id !== 'map'){
    var paper = $('.paper', sec);
    if (paper) paper.insertBefore(el('p', 'switched-off', 'Switched off: visitors don’t see this part. To open it, set pages.' + p.id + ': true in settings.js.'), paper.firstChild);
  } else sec.hidden = true;
});

/* ── WhatsApp ── */
var WA = digits(SITE.whatsapp);
var WA_READY = WA.length >= 10 && !/x/i.test(SITE.whatsapp || '');
function numberShown(){
  if (filled(SITE.phoneShown) && !/x/i.test(SITE.phoneShown)) return SITE.phoneShown.trim();
  if (!WA_READY) return '';
  return WA.length === 12 && WA.slice(0, 2) === '91' ? '+91 ' + WA.slice(2, 7) + ' ' + WA.slice(7) : '+' + WA;
}
function waLink(interest){
  var text = 'Hello, I would like to visit ' + village + '.\nDates: \nPeople: \nI am interested in: ' + (interest || '');
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
}

/* ── the menu: five groups, and "More" ── */
function link(p){
  var a = el('a', partOpen(p) ? '' : 'off', p.label);
  a.href = '#' + p.id;
  a.setAttribute('data-to', p.id);
  return a;
}
var navItems = {};   /* group name → its menu element, to mark the part you are reading */
(function header(){
  var top = $('#top'); if (!top) return;
  var bar = el('div', 'bar');
  var brand = el('a', 'brand', village); brand.href = '#home'; bar.appendChild(brand);

  var nav = el('nav', 'nav'); nav.setAttribute('aria-label', 'Parts of the page');
  var sheet = el('nav', 'sheet'); sheet.id = 'sheet'; sheet.hidden = true; sheet.setAttribute('aria-label', 'Parts of the page');
  GROUPS.forEach(function(g){
    var items = PARTS.filter(function(p){ return p.group === g && shown(p); });
    if (!items.length) return;
    if (items.length === 1 && g !== 'More'){
      var a = link(items[0]); a.textContent = g; nav.appendChild(a); navItems[g] = a;
    } else {
      var d = el('details', 'grp'), s = el('summary', '', g), box = el('div');
      d.appendChild(s); items.forEach(function(p){ box.appendChild(link(p)); });
      d.appendChild(box); nav.appendChild(d); navItems[g] = d;
    }
    sheet.appendChild(el('p', '', g));
    items.forEach(function(p){ sheet.appendChild(link(p)); });
  });
  bar.appendChild(nav);

  if (SITE.hindi === true){ var hi = el('a', 'lang', 'हिन्दी'); hi.href = 'hi/'; hi.lang = 'hi'; bar.appendChild(hi); }

  var btn = el('button', 'menu-btn', 'Menu');
  btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'sheet');
  function setSheet(open){ sheet.hidden = !open; btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? 'Close' : 'Menu'; }
  btn.addEventListener('click', function(){ setSheet(sheet.hidden); });
  bar.appendChild(btn);

  top.innerHTML = ''; top.appendChild(bar); top.appendChild(sheet);

  /* close menus after choosing a part */
  top.addEventListener('click', function(e){
    if (!e.target.closest('a')) return;
    setSheet(false);
    $$('.grp', top).forEach(function(d){ d.open = false; });
  });
  document.addEventListener('click', function(e){
    $$('.grp', top).forEach(function(d){ if (!d.contains(e.target)) d.open = false; });
  });
  addEventListener('keydown', function(e){ if (e.key === 'Escape'){ setSheet(false); $$('.grp', top).forEach(function(d){ d.open = false; }); } });
})();

/* ── "Next" at the end of each part ── */
(function(){
  var visible = PARTS.filter(function(p){ var s = document.getElementById(p.id); return s && !s.hidden; });
  visible.forEach(function(p, i){
    var nx = visible[i + 1], paper = $('#' + p.id + ' .paper');
    if (!nx || !paper || $('.next', paper)) return;
    var a = el('a', 'next'); a.href = '#' + nx.id;
    a.appendChild(el('span', '', 'Next'));
    a.appendChild(document.createTextNode(' ' + nx.label));
    paper.appendChild(a);
  });
})();

/* ── fill the [brackets] from settings.js ── */
$$('[data-set]').forEach(function(e){
  var path = e.getAttribute('data-set'), v = setting(path);
  if (filled(v) && typeof v !== 'object'){
    var t = String(v).trim();
    if (e.hasAttribute('data-cap')) t = t.charAt(0).toUpperCase() + t.slice(1);   /* at the start of a sentence */
    e.textContent = t; e.classList.remove('gap');
  } else { e.classList.add('gap'); addGap(path); }
});
/* lists: an array of sentences in settings.js becomes one line each */
$$('[data-list]').forEach(function(list){
  var path = list.getAttribute('data-list'), v = setting(path);
  var items = Array.isArray(v) ? v.filter(filled) : [];
  if (!items.length){ $$('li', list).forEach(function(li){ li.classList.add('gap'); }); addGap(path); return; }
  list.innerHTML = '';
  items.forEach(function(t){ list.appendChild(el('li', '', String(t).trim())); });
});
/* the WhatsApp number, written out in plain text */
$$('[data-number]').forEach(function(e){
  var n = numberShown();
  if (n){ e.textContent = n; e.classList.remove('gap'); }
  else { e.classList.add('gap'); addGap('whatsapp'); }
});
/* dishes, from settings.js */
$$('[data-dishes]').forEach(function(list){
  var path = list.getAttribute('data-dishes');
  var ds = (setting(path) || []).filter(function(d){ return d && filled(d.bugun || d.english); });
  if (!ds.length){ addGap(path); return; }   /* its [bracket] stays, so data-need hides it */
  list.innerHTML = '';
  ds.forEach(function(d){
    var li = el('li');
    if (filled(d.photo)){ var img = el('img'); img.src = 'photos/' + d.photo.trim(); img.alt = (d.bugun || d.english || '').trim(); img.loading = 'lazy'; li.appendChild(img); }
    li.appendChild(el('b', '', (d.bugun || d.english).trim()));
    if (filled(d.bugun) && filled(d.english)) li.appendChild(el('i', '', d.english.trim()));
    if (filled(d.what)) li.appendChild(el('p', '', d.what.trim()));
    if (filled(d.when)) li.appendChild(el('p', '', d.when.trim()));
    if (d.bamboo === true) li.appendChild(el('span', 'tag', 'Cooked in bamboo'));
    list.appendChild(li);
  });
});
/* a sentence or block marked data-need stays hidden until all its facts are in */
$$('[data-need]').forEach(function(box){
  /* a gap inside a smaller data-need belongs to that one, not to this box */
  var missing = box.classList.contains('gap') || $$('.gap', box).some(function(g){ return g.parentNode.closest('[data-need]') === box; });
  if (!missing) return;
  if (SETUP) box.classList.add('was-hidden'); else box.hidden = true;
});
/* data-else: what visitors see while the block just before it is still hidden */
$$('[data-else]').forEach(function(e){
  var prev = e.previousElementSibling;
  e.hidden = !(prev && (prev.hidden || prev.classList.contains('was-hidden')));
});

/* ── WhatsApp buttons: data-wa="what they are asking about" ── */
var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.6 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4.2.5.8 1.8.8 1.9.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.5 0 1z"/></svg>';
$$('[data-wa]').forEach(function(a){
  a.insertAdjacentHTML('afterbegin', WA_ICON);
  if (WA_READY){ a.href = waLink(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; }
  else a.href = '#write';
});
(function waNote(){
  var n = numberShown(); if (!n) return;
  $$('.btns').forEach(function(b){
    if (!$('[data-wa]', b)) return;
    b.parentNode.insertBefore(el('p', 'wa-note', 'WhatsApp: ' + n), b.nextSibling);
  });
})();

/* ── home tiles: hide a tile whose part is switched off ── */
$$('[data-tile]').forEach(function(t){
  var s = document.getElementById(t.getAttribute('data-tile'));
  if (s && s.hidden) t.hidden = true;
});

/* ── "Say the name": audio/<name>.mp3, recorded with the speaker's yes ── */
var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".15"/><path d="M10 7.5l6 4.5-6 4.5z" fill="currentColor"/></svg>';
$$('[data-say]').forEach(function(box){
  if (location.protocol === 'file:' || !window.fetch) return;
  var name = box.getAttribute('data-say'), src = 'audio/' + name + '.mp3';
  fetch(src, {method:'HEAD'}).then(function(r){
    if (!r.ok) return;
    var b = el('button', 'say'); b.type = 'button';
    b.innerHTML = PLAY + 'Say the name';
    b.setAttribute('aria-label', 'Say the name: ' + (box.getAttribute('data-say-label') || name));
    var sound;
    b.addEventListener('click', function(){ sound = sound || new Audio(src); sound.currentTime = 0; sound.play(); });
    box.appendChild(b); box.hidden = false;
  }).catch(function(){});
});

/* ── short clips: videos/<name>.mp4, shown only when the file is there ── */
$$('[data-clip]').forEach(function(fig){
  if (location.protocol === 'file:' || !window.fetch) return;
  var src = 'videos/' + fig.getAttribute('data-clip') + '.mp4';
  fetch(src, {method:'HEAD'}).then(function(r){
    if (!r.ok) return;
    $('video', fig).src = src; fig.hidden = false;
  }).catch(function(){});
});

/* ── sunrise and sunset, month by month (NOAA formula, flat horizon, IST) ── */
function coords(s){
  var m = String(s || '').replace(/\s+/g, '').match(/^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);
  return m ? [+m[1], +m[2]] : null;
}
function sunTimes(lat, lng, month){
  var rad = Math.PI / 180, day = Math.round(30.44 * month + 15);   /* the 15th, near enough */
  var g = 2 * Math.PI / 365 * (day - 1);
  var eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  var dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  var ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec)) / rad;
  var ist = 330;
  return [720 - 4 * (lng + ha) - eqt + ist, 720 - 4 * (lng - ha) - eqt + ist];
}
function clock(min){
  min = Math.round(min);
  var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}
(function sunTable(){
  var body = $('#sunRows'); if (!body) return;
  var spot = coords(setting('sun.morningCoords')), where = $('#sunWhere');
  if (spot){ if (where && filled(setting('sun.morningSpot'))) where.textContent = setting('sun.morningSpot').trim(); }
  else spot = coords(SITE.mapPlace) || [27.311, 92.592];
  /* each month gets a bar of daylight, on a line that runs from 4 in the morning to a quarter to 7 at night */
  var lo = 240, span = 885;
  ['January','February','March','April','May','June','July','August','September','October','November','December'].forEach(function(n, i){
    var t = sunTimes(spot[0], spot[1], i), tr = el('tr'), bar = el('td', 'daybar'), track = el('div', 'track'), day = el('i', 'day');
    var abbr = el('abbr', '', n.slice(0, 3)); abbr.title = n;
    var month = el('td'); month.appendChild(abbr);
    day.style.left = ((t[0] - lo) / span * 100).toFixed(1) + '%';
    day.style.width = ((t[1] - t[0]) / span * 100).toFixed(1) + '%';
    day.style.setProperty('--i', i);
    bar.setAttribute('aria-hidden', 'true'); track.appendChild(day); bar.appendChild(track);
    tr.appendChild(month); tr.appendChild(el('td', '', clock(t[0]))); tr.appendChild(bar); tr.appendChild(el('td', '', clock(t[1])));
    body.appendChild(tr);
  });
})();

/* ── the year, month by month: each row in index.html says which months it fills ── */
$$('[data-year]').forEach(function(box){
  var TONE = {moss: '#4f6333', moss2: '#a9b78e', red: '#b8231b', rust: '#a83f12', river: '#5a6a72', gold: '#d99a2b'};
  (Array.isArray(SITE.seasons) ? SITE.seasons : []).forEach(function(r){
    if (!r || !filled(r.label) || !Array.isArray(r.months)) return;
    var row = el('div', 'year__row', r.label.trim());
    row.setAttribute('data-months', r.months.join(' ')); row.setAttribute('data-tone', r.tone || 'gold');
    box.appendChild(row);
  });
  var head = el('div', 'year__months'); head.setAttribute('aria-hidden', 'true');
  'JFMAMJJASOND'.split('').forEach(function(m){ head.appendChild(el('span', '', m)); });
  box.insertBefore(head, box.firstChild);
  $$('.year__row', box).forEach(function(row){
    var months = (row.getAttribute('data-months') || '').split(/[\s,]+/).map(Number), cells = el('div', 'year__cells'), n = 0;
    cells.setAttribute('aria-hidden', 'true');
    for (var m = 1; m <= 12; m++){
      var c = el('i');
      if (months.indexOf(m) >= 0){ c.className = 'f'; c.style.setProperty('--i', n++); c.style.setProperty('--c', TONE[row.getAttribute('data-tone')] || TONE.moss); }
      cells.appendChild(c);
    }
    row.appendChild(cells);
  });
  box.hidden = false;
});

/* ── the maps: numbered pins and labels, the list underneath ── */
var ROAD = String((window.ROUTES || {}).road || '').trim().split(/\s+/).map(function(t){ var c = t.split(','); return [+c[0], +c[1]]; }).filter(function(c){ return isFinite(c[0]) && isFinite(c[1]); });
function mapsLink(p){ return 'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng; }
function drawMap(box, pts, opts){
  var NS = 'http://www.w3.org/2000/svg';
  var bound = pts.map(function(p){ return [p.lat, p.lng]; });
  if (opts.fitRoute) bound = bound.concat(opts.route);
  var lat0 = bound.reduce(function(s, c){ return s + c[0]; }, 0) / bound.length;
  var k = Math.cos(lat0 * Math.PI / 180);
  var xs = bound.map(function(c){ return c[1] * k; }), ys = bound.map(function(c){ return -c[0]; });
  var minX = Math.min.apply(0, xs), maxX = Math.max.apply(0, xs), minY = Math.min.apply(0, ys), maxY = Math.max.apply(0, ys);
  var dx = Math.max(maxX - minX, 0.004), dy = Math.max(maxY - minY, 0.004);
  var W = 460, H = Math.round(Math.min(440, Math.max(280, W * dy / dx))), pad = 40;
  var s = Math.min((W - 2 * pad) / dx, (H - 2 * pad) / dy);
  var ox = (W - s * (maxX - minX)) / 2, oy = (H - s * (maxY - minY)) / 2;
  function X(lat, lng){ return ox + (lng * k - minX) * s; }
  function Y(lat){ return oy + (-lat - minY) * s; }
  function path(list){ return list.map(function(c, i){ return (i ? 'L' : 'M') + X(c[0], c[1]).toFixed(1) + ' ' + Y(c[0]).toFixed(1); }).join(''); }
  var kmPx = s / 111.32, want = W / 5 / kmPx, steps = [0.25, 0.5, 1, 2, 5, 10, 20], km = steps[0];
  steps.forEach(function(v){ if (v <= want) km = v; });
  var id = 'clip' + Math.random().toString(36).slice(2, 7);
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + opts.label + '. The numbered list is below.">' +
    '<defs><clipPath id="' + id + '"><rect width="' + W + '" height="' + H + '"/></clipPath></defs><g clip-path="url(#' + id + ')">' +
    '<rect width="' + W + '" height="' + H + '" fill="#efe6d4"/><g stroke="#5a6a72" stroke-opacity=".1">';
  for (var gx = 0; gx <= W; gx += 46) svg += '<path d="M' + gx + ' 0V' + H + '"/>';
  for (var gy = 0; gy <= H; gy += 46) svg += '<path d="M0 ' + gy + 'H' + W + '"/>';
  svg += '</g>';
  if (opts.route && opts.route.length){
    var d = path(opts.route);
    svg += '<path class="route" pathLength="1" d="' + d + '" fill="none" stroke="#f8f3ea" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>' +
           '<path class="route" pathLength="1" d="' + d + '" fill="none" stroke="#8a5a3c" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>';
  }
  if (opts.walk && pts.length > 1)
    svg += '<path d="' + path(pts.map(function(p){ return [p.lat, p.lng]; })) + '" class="walkline" fill="none" stroke="#4f6333" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>';
  /* labels: try right, left, above, below; skip one that would overlap */
  var placed = pts.map(function(p){ var x = X(p.lat, p.lng), y = Y(p.lat); return [x - 13, y - 13, x + 13, y + 13]; });
  function free(r){ return r[0] > 2 && r[2] < W - 2 && r[1] > 2 && r[3] < H - 2 && placed.every(function(q){ return r[2] < q[0] || r[0] > q[2] || r[3] < q[1] || r[1] > q[3]; }); }
  var labels = '';
  pts.forEach(function(p, pi){
    var x = X(p.lat, p.lng), y = Y(p.lat), t = p.short || p.name, w = t.length * 6.6 + 4, h = 15;
    var tries = [[x + 17, y - h / 2, 'start'], [x - 17 - w, y - h / 2, 'start'], [x - w / 2, y - 18 - h, 'start'], [x - w / 2, y + 18, 'start']];
    for (var i = 0; i < tries.length; i++){
      var r = [tries[i][0], tries[i][1], tries[i][0] + w, tries[i][1] + h];
      if (free(r)){ placed.push(r); labels += '<text class="lbl" style="--i:' + pi + '" x="' + (r[0] + 2).toFixed(1) + '" y="' + (r[1] + 11.5).toFixed(1) + '" font-family="Source Sans 3,sans-serif" font-size="12.5" font-weight="600" fill="#1e1710">' + t.replace(/</g, '') + '</text>'; break; }
    }
  });
  pts.forEach(function(p, pi){
    var x = X(p.lat, p.lng).toFixed(1), y = Y(p.lat).toFixed(1);
    svg += '<g class="pin" style="--i:' + pi + '" data-n="' + p.n + '" tabindex="0" role="button" aria-label="' + p.n + ': ' + p.name.replace(/"/g, '') + '"><circle cx="' + x + '" cy="' + y + '" r="12" fill="#5a6a72" stroke="#f8f3ea" stroke-width="2.5"/>' +
           '<text x="' + x + '" y="' + y + '" dy=".35em" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-weight="700" font-size="12.5" fill="#fff" pointer-events="none">' + p.n + '</text></g>';
  });
  svg += labels;
  svg += '<g font-family="Source Sans 3,sans-serif" font-size="12" fill="#1e1710">' +
         '<path d="M16 ' + (H - 16) + 'h' + (km * kmPx).toFixed(1) + '" stroke="#1e1710" stroke-width="2.5"/>' +
         '<text x="16" y="' + (H - 24) + '">' + km + ' km</text>' +
         '<path d="M' + (W - 22) + ' 30l-6 13h12z" fill="#1e1710"/><text x="' + (W - 22) + '" y="24" text-anchor="middle" font-weight="700">N</text></g>';
  svg += '</g></svg>';
  box.innerHTML = svg;
  /* draw it when it comes into view */
  var drawing = box.firstChild;
  if (reduce || !('IntersectionObserver' in window)){ drawing.classList.add('draw'); return; }
  var seen = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ drawing.classList.add('draw'); seen.disconnect(); } }, {threshold: 0.35});
  seen.observe(box);
}
function placeList(list, pts){
  list.innerHTML = '';
  pts.forEach(function(p){
    var li = el('li'), body = el('div');
    li.setAttribute('data-n', p.n);
    body.appendChild(el('b', '', filled(p.bugun) ? p.bugun.trim() + ' · ' + p.name.trim() : p.name.trim()));
    if (filled(p.note)) body.appendChild(el('span', '', p.note.trim()));
    var a = el('a', '', 'Open in Google Maps'); a.href = mapsLink(p); a.target = '_blank'; a.rel = 'noopener';
    body.appendChild(a);
    li.appendChild(el('span', 'n', String(p.n))); li.appendChild(body); list.appendChild(li);
  });
}
/* a pin and its line in the list light up together */
function linkUp(box){
  function hot(n, on){ $$('[data-n="' + n + '"]', box).forEach(function(e){ e.classList.toggle('hot', on); }); }
  box.addEventListener('mouseover', function(e){ var t = e.target.closest('[data-n]'); if (t) hot(t.getAttribute('data-n'), true); });
  box.addEventListener('mouseout', function(e){ var t = e.target.closest('[data-n]'); if (t) hot(t.getAttribute('data-n'), false); });
  box.addEventListener('click', function(e){
    var pin = e.target.closest('.pin'); if (!pin) return;
    var n = pin.getAttribute('data-n');
    $$('.hot', box).forEach(function(x){ x.classList.remove('hot'); });
    hot(n, true);
    var li = $('.places li[data-n="' + n + '"]', box);
    if (li) li.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  });
}
$$('[data-map]').forEach(function(box){
  var kind = box.getAttribute('data-map'), pts, opts;
  if (kind === 'walk'){
    pts = PLACES.filter(function(p){ return isFinite(p.walk); }).sort(function(a, b){ return a.walk - b.walk; })
                .map(function(p){ return Object.assign({}, p, {n: p.walk}); });
    opts = {walk: true, label: 'The Lichini walk'};
  } else if (kind === 'road'){
    pts = PLACES.filter(function(p){ return p.map === 'road' || p.map === 'both'; }).map(function(p, i){ return Object.assign({}, p, {n: i + 1}); });
    opts = {route: ROAD, fitRoute: true, label: 'The road in'};
  } else {
    pts = PLACES.filter(function(p){ return !p.map || p.map === 'valley' || p.map === 'both'; }).map(function(p, i){ return Object.assign({}, p, {n: i + 1}); });
    opts = {route: ROAD, label: 'Around Bichom'};
  }
  if (!pts.length) return;
  box.hidden = false;
  drawMap($('.map', box), pts, opts);
  placeList($('.places', box), pts);
  linkUp(box);
});
/* the two maps: tabs */
$$('.maptabs').forEach(function(bar){
  var btns = $$('button', bar);
  function select(b){
    btns.forEach(function(x){
      var on = x === b, panel = document.getElementById(x.getAttribute('aria-controls'));
      x.setAttribute('aria-selected', String(on));
      if (panel) panel.hidden = !on || !$('.map svg', panel);
    });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ select(b); }); });
  select(btns.filter(function(x){ return x.getAttribute('aria-selected') === 'true'; })[0] || btns[0]);
});

/* the village in Google Maps, for directions */
$$('[data-village-map]').forEach(function(a){
  var c = coords(SITE.mapPlace);
  a.href = c ? mapsLink({lat: c[0], lng: c[1]}) : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(village + ', Singchung, West Kameng, Arunachal Pradesh');
});
/* the official e-ILP link, once a person has checked it */
$$('[data-permit-link]').forEach(function(a){
  var u = setting('permitLink');
  if (filled(u) && /^https:\/\//.test(u.trim())){ a.href = u.trim(); a.target = '_blank'; a.rel = 'noopener'; }
  else { a.parentNode.replaceChild(document.createTextNode(a.textContent), a); addGap('permitLink'); }
});

/* ── footer: the parts, the number, thanks ── */
(function footer(){
  var f = $('#foot .in'); if (!f) return;
  var ul = el('ul');
  PARTS.forEach(function(p){ var s = document.getElementById(p.id); if (s && !s.hidden){ var li = el('li'); li.appendChild(link(p)); ul.appendChild(li); } });
  f.insertBefore(ul, f.firstChild);
  var n = numberShown();
  if (n){ var pn = el('p', '', 'WhatsApp: '), a = el('a', '', n); a.href = 'https://wa.me/' + WA; a.target = '_blank'; a.rel = 'noopener'; pn.appendChild(a); f.insertBefore(pn, ul.nextSibling); }
  if (filled(SITE.credits)){ var gift = $('.gift', f); f.insertBefore(el('p', '', SITE.credits.trim()), gift ? gift.nextSibling : null); }
})();

/* ── the smooth parts: pictures that crossfade, the bar at the top,
      the tab bar, the side dots, words that rise into place ── */
var openParts = PARTS.filter(function(p){ var s = document.getElementById(p.id); return s && !s.hidden; });
var ICONS = {
  'Birds':     '<path d="M3 14c3.5 0 5-4 9-4 2.6 0 4.2 1.4 5.2 3l3.3.6-3 1.6c-1 3-3.8 4.8-7.5 4.8-3 0-5.2-1.6-7-6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="15.6" cy="12.6" r="1" fill="currentColor"/>',
  'Walks':     '<path d="M2.5 19.5l6.2-11 4.3 7 2.3-3.4 6.2 7.4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  'The river': '<path d="M3 9.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  'Made here': '<path d="M4 10h16l-2.2 9.5H6.2zM8 10l4-6 4 6M7 14h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  'Visit':     '<path d="M4 11.5l8-7 8 7V20h-5.5v-5.5h-5V20H4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
};
function partOf(id){ return PARTS.filter(function(p){ return p.id === id; })[0]; }
var stageLayers = {}, current = null, zTop = 1;

/* the stage */
(function(){
  if (!('IntersectionObserver' in window)) return;
  var stage = el('div', 'stage'); stage.setAttribute('aria-hidden', 'true');
  openParts.forEach(function(p){
    var img = $('#' + p.id + ' .ch__bg img'); if (!img) return;
    var layer = el('div', 'layer'), pic = new Image(); pic.alt = ''; pic.decoding = 'async';
    pic.setAttribute('data-src', img.getAttribute('src'));
    if (img.style.objectPosition) pic.style.objectPosition = img.style.objectPosition;
    layer.appendChild(pic); stage.appendChild(layer); stageLayers[p.id] = layer;
  });
  if (!Object.keys(stageLayers).length) return;
  document.body.insertBefore(stage, document.body.firstChild);
  document.documentElement.classList.add('staged');
  loadLayer(openParts[0].id);
  var near = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) loadLayer(e.target.id); }); }, {rootMargin: '150% 0px'});
  openParts.forEach(function(p){ near.observe(document.getElementById(p.id)); });
})();
function loadLayer(id){ var l = stageLayers[id], pic = l && l.firstChild; if (pic && !pic.src) pic.src = pic.getAttribute('data-src'); }
/* the picture drifts a little as its part scrolls by */
function drift(){
  var l = stageLayers[current], sec = current && document.getElementById(current);
  if (!l || !sec || reduce) return;
  var r = sec.getBoundingClientRect(), p = (r.top + r.height / 2 - innerHeight / 2) / (r.height / 2 + innerHeight / 2);
  l.style.transform = 'translate3d(0,' + (Math.max(-1, Math.min(1, p)) * innerHeight * 0.04).toFixed(1) + 'px,0)';
}
/* the line above the tab of the part you are reading */
function markTab(){
  var bar = $('.tabs'); if (!bar) return;
  var on = $('a.on', bar);
  bar.style.setProperty('--to', on ? '1' : '0');
  if (on) bar.style.setProperty('--tx', (on.offsetLeft + (on.offsetWidth - 28) / 2) + 'px');
}
function showPart(id){
  if (id === current) return;
  var prev = current; current = id;
  var layer = stageLayers[id];
  if (layer){
    loadLayer(id);
    layer.style.zIndex = ++zTop;
    layer.classList.add('on');
    var old = prev && stageLayers[prev];
    if (old && old !== layer) setTimeout(function(){ if (current !== prev) old.classList.remove('on'); }, reduce ? 300 : 1200);
  }
  var part = partOf(id);
  Object.keys(navItems).forEach(function(g){ navItems[g].classList.toggle('on', !!part && part.group === g); });
  $$('.tabs a').forEach(function(a){ a.classList.toggle('on', !!part && a.getAttribute('data-group') === part.group); });
  $$('.dots a').forEach(function(a){ a.classList.toggle('on', a.getAttribute('data-to') === id); });
  markTab(); drift();
}

/* the bar at the top: clear over the first picture, paper after; a progress line */
(function(){
  var top = $('#top'), head = $('#home .ch__head'); if (!top) return;
  var line = el('div', 'progress'); top.appendChild(line);
  if (head && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){ top.classList.toggle('over', es[0].isIntersecting && $('#sheet').hidden); }, {rootMargin: '-60px 0px -85% 0px'}).observe(head);
    $('.menu-btn', top).addEventListener('click', function(){ if (!$('#sheet').hidden) top.classList.remove('over'); });
  }
  var ticking = false;
  function paint(){
    var h = document.documentElement.scrollHeight - innerHeight;
    line.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')';
    drift();
    ticking = false;
  }
  addEventListener('scroll', function(){ if (!ticking){ ticking = true; requestAnimationFrame(paint); } }, {passive: true});
  paint();
})();

/* the tab bar, on phones */
(function(){
  var groups = ['Birds', 'Walks', 'The river', 'Made here', 'Visit'];
  var bar = el('nav', 'tabs'); bar.setAttribute('aria-label', 'Main parts');
  groups.forEach(function(g){
    var first = openParts.filter(function(p){ return p.group === g; })[0]; if (!first) return;
    var a = el('a'); a.href = '#' + first.id; a.setAttribute('data-group', g);
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[g] + '</svg>';
    a.appendChild(el('span', '', g === 'The river' ? 'River' : g));
    bar.appendChild(a);
  });
  if (!bar.children.length) return;
  document.body.appendChild(bar);
  document.body.classList.add('has-tabs');
})();

/* the side dots, on wide screens */
(function(){
  var list = el('ul', 'dots'); list.setAttribute('aria-label', 'Parts of the page');
  openParts.forEach(function(p){
    var li = el('li'), a = el('a'); a.href = '#' + p.id; a.setAttribute('data-to', p.id);
    a.appendChild(el('span', '', p.label)); li.appendChild(a); list.appendChild(li);
  });
  document.body.appendChild(list);
})();

/* follow the scroll: the part in the middle of the screen is the one you are reading */
if ('IntersectionObserver' in window){
  var mid = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) showPart(e.target.id); }); }, {rootMargin: '-50% 0px -50% 0px'});
  openParts.forEach(function(p){ mid.observe(document.getElementById(p.id)); });
}
if (openParts.length) showPart(openParts[0].id);
addEventListener('resize', markTab);

/* swipe rows: buttons and a counter */
$$('.swipe').forEach(function(row){
  var items = row.children.length; if (items < 2) return;
  var bar = el('div', 'swipe-bar'), count = el('span', '', '1 / ' + items + ' · swipe'), btns = el('div');
  var prev = el('button', '', '‹'), next = el('button', '', '›');
  prev.type = next.type = 'button'; prev.setAttribute('aria-label', 'Previous'); next.setAttribute('aria-label', 'Next');
  btns.appendChild(prev); btns.appendChild(next); bar.appendChild(count); bar.appendChild(btns);
  row.parentNode.insertBefore(bar, row.nextSibling);
  function step(){ return row.children[0].getBoundingClientRect().width + 12; }
  function update(){
    var i = Math.round(row.scrollLeft / step());
    count.textContent = (Math.min(items, i + 1)) + ' / ' + items + (i === 0 ? ' · swipe' : '');
    prev.disabled = row.scrollLeft < 4;
    next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
  }
  prev.addEventListener('click', function(){ row.scrollBy({left: -step(), behavior: reduce ? 'auto' : 'smooth'}); });
  next.addEventListener('click', function(){ row.scrollBy({left: step(), behavior: reduce ? 'auto' : 'smooth'}); });
  row.addEventListener('scroll', function(){ requestAnimationFrame(update); }, {passive: true});
  update();
});

/* ── the title of each part arrives line by line, with a pen stroke under it;
      a few birds cross the sky of the first picture ── */
(function(){
  var heads = $$('.ch__head');
  heads.forEach(function(h){
    var t = $('h1, h2', h);
    if (t) t.insertAdjacentHTML('beforeend', '<svg class="squiggle" viewBox="0 0 120 12" aria-hidden="true"><path pathLength="1" d="M2 8 C 18 2, 30 11, 48 6 S 80 3, 96 7 S 112 5, 118 6"/></svg>');
  });
  if (reduce || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.parentNode.classList.remove('wait'); io.unobserve(e.target); } });
  }, {rootMargin: '0px 0px -8% 0px'});
  heads.forEach(function(h){ var t = $('h1, h2', h); if (!t) return; h.classList.add('wait'); io.observe(t); });

  var sky = $('#home .ch__head');
  if (sky){
    var flock = el('div', 'flock'); flock.setAttribute('aria-hidden', 'true');
    flock.innerHTML = new Array(4).join('<svg viewBox="0 0 28 12"><path d="M1 10 q6.5 -9 13 0 q6.5 -9 13 0"/></svg>');
    sky.appendChild(flock);
    new IntersectionObserver(function(es){ flock.classList.toggle('live', es[0].isIntersecting); }).observe(sky);
  }
})();

/* ── a small ink sketch at the top of each part: it draws itself ──
      Each line is one stroke of the pen. "a:" is the rust pen, "g:" the green one. */
var SKETCH = {
  home:    ['M2 40 Q20 18 36 34 Q50 14 70 32 Q82 22 94 38', 'a:M74 6 a5 5 0 1 0 .01 0', 'M10 46 V40 L16 34 L22 40 V46', 'M30 46 V39 L37 32 L44 39 V46', 'M52 46 V40 L58 34 L64 40 V46', 'M4 46 H92'],
  bird:    ['M6 40 C30 37 60 38 92 31', 'M34 33 C30 22 43 13 55 19 C64 23 65 33 55 36 C47 38 38 38 34 33 Z', 'M36 25 L27 27 L35.5 29.5', 'a:M44 25 C50 22 57 25 59 31 C53 31 47 29 44 25 Z', 'M60 29 L79 37', 'M46 37 V40.5 M53 37 V40', 'M40.5 21.5 a1.1 1.1 0 1 0 .01 0'],
  birding: ['M25 30 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0', 'M51 30 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0', 'M29 21 L32 8 H40 L43 21', 'M55 21 L58 8 H66 L69 21', 'a:M45 27 H53', 'M31 30 a5 5 0 0 1 5 -5'],
  lichini: ['M14 8 V40', 'M82 8 V40', 'a:M14 11 Q48 34 82 11', 'M14 32 Q48 40 82 32', 'M25 18.5 V34.5 M36 23.5 V36.6 M48 25.5 V37.2 M60 23.5 V36.6 M71 18.5 V34.5', 'g:M4 45 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0'],
  rhododendron: ['a:M48.0 20.0 C42.0 13.0 44.0 5.0 48.0 3.0 C52.0 5.0 54.0 13.0 48.0 20.0', 'a:M48.0 20.0 C52.8 12.1 61.0 11.6 64.2 14.7 C63.5 19.2 56.5 23.5 48.0 20.0', 'a:M48.0 20.0 C57.0 22.1 60.1 29.8 58.0 33.8 C53.6 34.5 47.3 29.2 48.0 20.0', 'a:M48.0 20.0 C48.7 29.2 42.4 34.5 38.0 33.8 C35.9 29.8 39.0 22.1 48.0 20.0', 'a:M48.0 20.0 C39.5 23.5 32.5 19.2 31.8 14.7 C35.0 11.6 43.2 12.1 48.0 20.0', 'M47 19 a1.2 1.2 0 1 0 .01 0', 'g:M40 37 C30 36 20 40 12 46 C24 47 34 44 40 37', 'g:M56 37 C66 36 76 40 84 46 C72 47 62 44 56 37'],
  cave:    ['M4 44 C6 20 24 5 48 5 C72 5 90 20 92 44', 'M24 44 C24 28 34 19 48 19 C62 19 72 28 72 44', 'M2 44 H94', 'a:M42 30 a2.4 2.4 0 1 0 .01 0 M42 35 V43 M42 37.5 L47 35.5', 'M54 32 a2.2 2.2 0 1 0 .01 0 M54 36.5 V43', 'M31 11 V15 M61 9.5 V14 M71 16 V19'],
  river:   ['M28 22 C38 12 56 12 66 22 C56 32 38 32 28 22 Z', 'M66 22 L78 14 V30 Z', 'M37 18.5 a1.1 1.1 0 1 0 .01 0', 'M44 16.5 C47 20 47 24 44 27.5', 'g:M6 40 q7 -5 14 0 t14 0 t14 0 t14 0 t14 0 t14 0', 'g:M13 46 q7 -5 14 0 t14 0 t14 0 t14 0 t14 0'],
  sun:     ['M2 40 Q24 26 44 36 Q64 24 94 40', 'a:M35 31.5 A14 14 0 0 1 61.5 29.5', 'a:M48 6 V13 M29 13 L33.5 18.5 M67 12 L62.5 17.5 M20 25 L27 27 M76 23 L69.5 25.5', 'M2 46 Q30 38 52 44 Q72 38 94 46'],
  bamboo:  ['M22 17 H74 L66 44 H30 Z', 'M19 17 H77', 'a:M31 17 C31 2 65 2 65 17', 'M24.5 26 H71.5 M27.5 35 H68.5', 'M35 17 L39 44 M48 17 V44 M61 17 L57 44'],
  fruit:   ['a:M48 13 C64 13 72 22 72 30 C72 40 62 46 48 46 C34 46 24 40 24 30 C24 22 32 13 48 13 Z', 'M48 15 L40 11 L48 9 L56 11 Z', 'M48 9 V4', 'g:M51 6 C60 0 73 1 80 8 C72 14 60 12 51 6 Z', 'g:M54 6.5 L77 8', 'M84 30 a8 8 0 1 0 .01 0'],
  nettle:  ['g:M48 4 L52 10 L57 9 L58 15 L63 15 L62 21 L67 23 L64 28 L67 32 L62 34 L62 39 L56 38 L53 43 L48 40 L43 43 L40 38 L34 39 L34 34 L29 32 L32 28 L29 23 L34 21 L33 15 L38 15 L39 9 L44 10 Z', 'M48 9 V47', 'M48 19 L57 15 M48 19 L39 15 M48 29 L60 25 M48 29 L36 25', 'a:M70 40 C76 34 82 44 88 38 C90 36 91 33 90 31'],
  story:   ['a:M41 40 C36 30 46 26 46 15 C55 22 61 30 56 40', 'a:M46 40 C44 34 48 32 49.5 27 C52.5 31 54 35 51.5 40', 'M30 45 L66 38 M30 38 L66 45', 'M48 9 C44 6 52 4 48 1', 'M18 31 a3 3 0 1 0 .01 0 M18 37.5 V45 M18 40 L24 38.5', 'M78 31 a3 3 0 1 0 .01 0 M78 37.5 V45 M78 40 L72 38.5'],
  visit:   ['M20 44 V25 L40 10 L60 25 V44', 'a:M35 44 V32 H45 V44', 'M49 28 H56 V35 H49 Z', 'M12 44 H84', 'g:M72 44 V33 M72 13 L64 25 H80 Z M72 21 L62 33 H82 Z'],
  map:     ['a:M48 44 C40 32 36 26 36 20 A12 12 0 1 1 60 20 C60 26 56 32 48 44 Z', 'a:M48 16 a4 4 0 1 0 .01 0', 'M6 40 C16 30 24 44 34 38', 'M62 38 C72 44 80 30 90 40']
};
(function(){
  var rows = [];
  openParts.forEach(function(p, i){
    var paper = $('#' + p.id + ' .paper'), strokes = SKETCH[p.id]; if (!paper || !strokes) return;
    var row = el('div', 'sketch-row'); row.setAttribute('aria-hidden', 'true');
    row.innerHTML = '<svg class="sketch" viewBox="0 0 96 48">' + strokes.map(function(t){
      var m = t.match(/^([ag]):(.*)$/);
      return '<path pathLength="1"' + (m ? ' class="' + m[1] + '"' : '') + ' d="' + (m ? m[2] : t) + '"/>';
    }).join('') + '</svg><i></i><b>' + (i < 9 ? '0' : '') + (i + 1) + '</b>';
    var note = $('.switched-off', paper);
    paper.insertBefore(row, note ? note.nextSibling : paper.firstChild);
    rows.push(row);
  });
  if (reduce || !('IntersectionObserver' in window)){ rows.forEach(function(r){ r.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {rootMargin: '0px 0px -10% 0px', threshold: 0.6});
  rows.forEach(function(r){ io.observe(r); });
})();

/* ── words rise into place, one after another ── */
(function(){
  document.documentElement.classList.add('js');
  var items = $$('.paper > *:not(.next):not(.sketch-row)');
  if (!('IntersectionObserver' in window) || reduce){ items.forEach(function(e){ e.classList.add('in'); }); return; }
  /* what is already on screen stays as it is; the rest rises in */
  items.forEach(function(e){ e.classList.add(e.getBoundingClientRect().top > innerHeight ? 'rv' : 'in'); });
  var io = new IntersectionObserver(function(es){
    var n = 0;
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--d', (n++ * 70) + 'ms');
      e.target.classList.add('in'); io.unobserve(e.target);
    });
  }, {rootMargin: '0px 0px -6% 0px', threshold: 0.01});
  items.forEach(function(e){ if (e.classList.contains('rv')) io.observe(e); });
})();

/* works offline once visited, and can be added to the home screen */
if ('serviceWorker' in navigator && location.protocol === 'https:'){
  addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
}

/* ── the keeper's preview box ── */
(function keeper(){
  if (!SETUP) return;
  if (!WA_READY) addGap('whatsapp');
  var box = el('div', 'keeper'); box.setAttribute('role', 'status');
  var html = '<b>Keeper’s preview</b>';
  if (!window.SITE) html += '<p>settings.js did not load. Keep it in the same folder as index.html.</p>';
  if (gaps.length){
    html += 'Yellow words are still in [brackets]. Visitors don’t see those sentences yet. Fill these in <code>settings.js</code>:<ul>';
    gaps.forEach(function(g){ html += '<li><code>' + g.replace(/</g, '') + '</code></li>'; });
    html += '</ul>';
  } else html += '<p>Nothing missing.</p>';
  html += '<button type="button" data-k="hide">Hide</button><button type="button" data-k="leave">Leave preview</button>';
  box.innerHTML = html;
  box.addEventListener('click', function(e){
    var k = e.target.getAttribute && e.target.getAttribute('data-k');
    if (k === 'hide') box.remove();
    if (k === 'leave'){ try { sessionStorage.removeItem('setup'); } catch (er) {} location.href = location.pathname; }
  });
  document.body.appendChild(box);
})();

})();
